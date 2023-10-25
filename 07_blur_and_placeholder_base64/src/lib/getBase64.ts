import { Photo, ImagesResults } from "@/models/Images";

import { getPlaiceholder } from "plaiceholder";

async function getBase64(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`,
      );
    }
    const buffer = await response.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    console.log(base64);
    return base64;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
  }
}

//---------------------------------------------------------------------

export default async function addBlurredDataUrls(
  images: ImagesResults,
): Promise<Photo[]> {
  // Making all request once , avoiding water fall
  const base64Promises = images.photos.map((photo) =>
    getBase64(photo.src.large),
  );

  // Resolve all requests in order
  const base64Results = await Promise.all(base64Promises);
  console.log("base64Results  = ", base64Results);

  const photosWithBlur: Photo[] = images.photos.map((photo, index) => {
    photo.blurredDataUrl = base64Results[index];
    return photo;
  });

  console.log("photosWithBlur = ", photosWithBlur);

  return photosWithBlur;
}

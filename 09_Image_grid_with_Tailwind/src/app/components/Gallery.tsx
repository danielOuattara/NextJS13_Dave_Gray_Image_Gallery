import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";

type Props = {
  searchTerm?: string | undefined;
};

export default async function Gallery({ searchTerm }: Props) {
  const url = searchTerm
    ? `https://api.pexels.com/v1/search?query=${searchTerm}`
    : "https://api.pexels.com/v1/curated";

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images) {
    return <h2 className="m-4 text-2xl font-bold">No images found</h2>;
  }

  const imagesWithBlur = await addBlurredDataUrls(images);

  return (
    <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
      {imagesWithBlur.map((photo) => (
        <ImgContainer photo={photo} key={photo.id} />
      ))}
    </section>
  );
}

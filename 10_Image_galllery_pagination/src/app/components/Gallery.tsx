import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";

type Props = {
  searchTerm?: string | undefined;
  page: string | undefined;
};

export default async function Gallery({ searchTerm, page }: Props) {
  const rootURL = `https://api.pexels.com/v1`;

  let url = "";

  if (searchTerm === "curated" && page) {
    // --> browsing beyond home
    url = `${rootURL}/curated?page=${page}`;
  } else if (searchTerm === "curated") {
    // --> home
    url = `${rootURL}/curated`;
  } else if (!page) {
    `${rootURL}/search?query=${searchTerm}`;
  } else {
    // --> search something beyond page 1
    url = `${rootURL}/search?query=${searchTerm}&page=${page}`;
  }

  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images || images.per_page === 0) {
    return <h2 className="m-4 text-2xl font-bold">No images found</h2>;
  }

  const imagesWithBlur = await addBlurredDataUrls(images);

  // calculate pagination

  return (
    <>
      <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
        {imagesWithBlur.map((photo) => (
          <ImgContainer photo={photo} key={photo.id} />
        ))}
      </section>
      {/* --> Add footer */}
    </>
  );
}

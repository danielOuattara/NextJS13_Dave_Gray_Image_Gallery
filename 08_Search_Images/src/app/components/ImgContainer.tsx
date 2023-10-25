import type { Photo } from "@/models/Images";
import Image from "next/image";
import Link from "next/link";

type Props = {
  photo: Photo;
};

export default function ImgContainer({ photo }: Props) {
  console.log("photo = ", photo);
  // const pixelPerRow = 10;
  // const selectedWidthPerImage = 250; // see h-64 class style below
  const widthHeightRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(250 * widthHeightRatio);
  const photoSpans = Math.ceil(galleryHeight / 10) + 1;

  return (
    <div className="h-64 bg-gray-200 rounded-xl relative overflow-hidden group">
      <Image
        src={photo.src.large}
        alt={photo.alt}
        fill={true}
        // style={{ objectFit: "cover" }}
        className="object-cover opacity-90 group-hover:opacity-100"
        sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
        placeholder="blur"
        blurDataURL={photo.blurredDataUrl}
      />
    </div>
  );
}

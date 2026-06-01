import Image from "next/image";
import { FadeIn } from "@/components/fade-in";

type GalleryImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type HorizontalScrollGalleryProps = {
  images: GalleryImage[];
  scrollHint?: boolean;
  dark?: boolean;
  gap?: "sm" | "md" | "lg";
  imageClassName?: string;
};

const gapClasses = {
  sm: "gap-8 md:gap-10",
  md: "gap-10 md:gap-14",
  lg: "gap-12 md:gap-[3.375rem]",
};

export function HorizontalScrollGallery({
  images,
  scrollHint = true,
  dark = false,
  gap = "lg",
  imageClassName = "h-auto w-auto max-h-[600px] max-w-none shrink-0",
}: HorizontalScrollGalleryProps) {
  return (
    <FadeIn>
      <div
        className={`-mx-6 overflow-x-auto px-6 pb-2 md:-mx-10 md:px-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
      >
        <div className={`flex items-start ${gapClasses[gap]}`}>
          {images.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width ?? 350}
              height={image.height ?? 600}
              className={imageClassName}
              sizes="(max-width: 768px) 80vw, 350px"
            />
          ))}
        </div>
      </div>
      {scrollHint && (
        <p
          className={`mt-8 flex items-center gap-2 text-lg tracking-tight ${
            dark ? "text-[#c9c9c9]" : "text-muted"
          }`}
        >
          Scroll
          <span aria-hidden className="text-xl">
            →
          </span>
        </p>
      )}
    </FadeIn>
  );
}

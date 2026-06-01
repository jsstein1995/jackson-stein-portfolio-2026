"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  aboutArtworkImages,
  type AboutArtworkImage,
} from "@/lib/about-artwork-media";

function ArtworkImage({
  artwork,
  className = "",
  sizes,
}: {
  artwork: AboutArtworkImage;
  className?: string;
  sizes: string;
}) {
  return (
    <Image
      src={artwork.src}
      alt={artwork.alt}
      width={artwork.width}
      height={artwork.height}
      unoptimized
      className={className}
      sizes={sizes}
    />
  );
}

export function AboutArtworkGallery({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, close]);

  const selectedArtwork =
    selectedIndex !== null ? aboutArtworkImages[selectedIndex] : null;

  const isDark = theme === "dark";

  return (
    <>
      <div className="flex gap-3 md:gap-4">
        {aboutArtworkImages.map((artwork, index) => (
          <button
            key={artwork.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`group relative aspect-[4/5] min-w-0 flex-1 cursor-pointer overflow-hidden ${
              artwork.sensitive ? "" : "transition-opacity hover:opacity-80"
            }`}
            aria-label={
              artwork.sensitive
                ? "View sensitive artwork"
                : `View ${artwork.alt}`
            }
          >
            <ArtworkImage
              artwork={artwork}
              className={`h-full w-full object-cover object-center ${
                artwork.sensitive ? "scale-105 blur-md" : ""
              }`}
              sizes="16vw"
            />
            {artwork.sensitive ? (
              <div
                className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm ${
                  isDark ? "bg-black/35" : "bg-background/20"
                }`}
              >
                <span
                  className={`px-2 text-center text-[10px] leading-snug transition-opacity duration-200 group-hover:opacity-100 md:px-3 md:text-xs md:opacity-0 ${
                    isDark
                      ? "text-white/90 opacity-80"
                      : "text-foreground opacity-70"
                  }`}
                >
                  Click to see sensitive image
                </span>
              </div>
            ) : null}
          </button>
        ))}
      </div>

      {selectedArtwork ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={selectedArtwork.alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-6 top-6 cursor-pointer text-sm tracking-widest text-muted uppercase transition-opacity hover:opacity-60 md:right-10 md:top-10"
          >
            Close
          </button>
          <div
            className="flex max-h-[85vh] w-full max-w-4xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <ArtworkImage
              artwork={selectedArtwork}
              className="max-h-[85vh] w-auto max-w-full object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

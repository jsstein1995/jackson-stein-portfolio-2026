"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

type SplashGifImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

/** GIFs resume mid-animation when cached; bust cache on each route visit. */
export function SplashGifImage({
  src,
  alt,
  sizes,
  className = "object-cover",
}: SplashGifImageProps) {
  const pathname = usePathname();
  const isGif = src.toLowerCase().endsWith(".gif");
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(
    isGif ? null : src
  );

  useLayoutEffect(() => {
    if (!isGif) {
      setResolvedSrc(src);
      return;
    }

    const base = src.split("?")[0];
    setResolvedSrc(`${base}?r=${Date.now()}`);
  }, [isGif, src, pathname]);

  if (!resolvedSrc) {
    return (
      <div
        className={`absolute inset-0 bg-black ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <Image
      key={resolvedSrc}
      src={resolvedSrc}
      alt={alt}
      fill
      priority
      unoptimized={isGif}
      className={className}
      sizes={sizes}
    />
  );
}

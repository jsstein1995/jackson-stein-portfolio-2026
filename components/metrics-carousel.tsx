"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { metricsCarouselFrameClassName } from "@/lib/metrics-carousel-styles";

type MetricsCarouselSlide = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type MetricsCarouselProps = {
  slides: MetricsCarouselSlide[];
};

const DRAG_THRESHOLD = 48;

function getMatchedHeightWidthPercent(
  slide: MetricsCarouselSlide,
  reference: MetricsCarouselSlide
) {
  const slideAspect = slide.width / slide.height;
  const referenceAspect = reference.width / reference.height;
  return (slideAspect / referenceAspect) * 100;
}

export function MetricsCarousel({ slides }: MetricsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);

  if (slides.length === 0) return null;

  const slide = slides[index];
  const referenceSlide = slides[0];
  const slideWidthPercent = getMatchedHeightWidthPercent(slide, referenceSlide);

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + slides.length) % slides.length);
  };

  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  const resetDrag = () => {
    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    setDragOffset(event.clientX - dragStartX.current);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const delta = event.clientX - dragStartX.current;
    if (delta > DRAG_THRESHOLD) goPrev();
    else if (delta < -DRAG_THRESHOLD) goNext();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetDrag();
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={goPrev}
          className="flex shrink-0 cursor-pointer items-center justify-center self-center px-1 text-lg text-muted transition-opacity hover:opacity-60"
          aria-label="Previous metric"
        >
          ←
        </button>

        <div
          className={`${metricsCarouselFrameClassName} ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={resetDrag}
        >
          <div
            className="flex w-full items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: dragOffset ? `translateX(${dragOffset}px)` : undefined,
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              unoptimized
              draggable={false}
              className="pointer-events-none mx-auto h-auto max-w-full select-none object-contain"
              style={{ width: `${slideWidthPercent}%` }}
              sizes="(max-width: 1024px) 82vw, 33vw"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          className="flex shrink-0 cursor-pointer items-center justify-center self-center px-1 text-lg text-muted transition-opacity hover:opacity-60"
          aria-label="Next metric"
        >
          →
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((item, slideIndex) => (
          <button
            key={item.src}
            type="button"
            onClick={() => goTo(slideIndex)}
            className={`h-2 w-2 rounded-full transition-colors ${
              slideIndex === index ? "bg-foreground" : "bg-border"
            }`}
            aria-label={`Go to metric ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

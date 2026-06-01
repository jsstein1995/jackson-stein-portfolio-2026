"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

type CaseStudyCroppedVideoProps = {
  src: string;
  label: string;
  type?: string;
  cropScale?: number;
  className?: string;
};

export function CaseStudyCroppedVideo({
  src,
  label,
  type = "video/quicktime",
  cropScale = 1.15,
  className = "",
}: CaseStudyCroppedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncProgress = () => {
      const total = video.duration;
      const elapsed = video.currentTime;

      setDuration(total);
      setCurrentTime(elapsed);
      setProgress(total > 0 ? elapsed / total : 0);
    };

    video.addEventListener("timeupdate", syncProgress);
    video.addEventListener("loadedmetadata", syncProgress);
    video.addEventListener("durationchange", syncProgress);

    syncProgress();

    return () => {
      video.removeEventListener("timeupdate", syncProgress);
      video.removeEventListener("loadedmetadata", syncProgress);
      video.removeEventListener("durationchange", syncProgress);
    };
  }, [src]);

  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-sm border border-border bg-surface">
        <div className="relative aspect-video w-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ transform: `scale(${cropScale})` }}
            aria-label={label}
          >
            <source src={src} type={type} />
          </video>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-4 pb-3 pt-10">
            <div
              className="h-1 w-full overflow-hidden rounded-full bg-white/25"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-white/90 transition-[width] duration-150 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="mt-2 text-right text-xs tabular-nums tracking-wide text-white/90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm leading-snug text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

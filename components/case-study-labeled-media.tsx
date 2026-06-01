import Image from "next/image";

type CaseStudyLabeledImageProps = {
  src: string;
  alt: string;
  label: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

type CaseStudyResearchImageProps = {
  src: string;
  alt: string;
  label: string;
  width?: number;
  height?: number;
  imageClassName?: string;
};

export function CaseStudyResearchImage({
  src,
  alt,
  label,
  width = 1200,
  height = 800,
  imageClassName = "h-auto w-full",
}: CaseStudyResearchImageProps) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className={imageClassName}
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
      <figcaption className="mt-3 text-sm leading-snug text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

type CaseStudyResearchVideoProps = {
  src: string;
  label: string;
  type?: string;
  videoClassName?: string;
};

export function CaseStudyResearchVideo({
  src,
  label,
  type = "video/quicktime",
  videoClassName = "h-auto w-full",
}: CaseStudyResearchVideoProps) {
  return (
    <figure>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={videoClassName}
        aria-label={label}
      >
        <source src={src} type={type} />
      </video>
      <figcaption className="mt-3 text-sm leading-snug text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

export function CaseStudyLabeledImage({
  src,
  alt,
  label,
  width = 1200,
  height = 800,
  className = "aspect-[4/3]",
  priority = false,
}: CaseStudyLabeledImageProps) {
  return (
    <figure>
      <div
        className={`overflow-hidden rounded-sm border border-border bg-surface ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          priority={priority}
          className="h-full w-full object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <figcaption className="mt-3 text-sm leading-snug text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

type CaseStudyLabeledVideoProps = {
  src: string;
  label: string;
  type?: string;
  className?: string;
};

export function CaseStudyLabeledVideo({
  src,
  label,
  type = "video/quicktime",
  className = "aspect-video",
}: CaseStudyLabeledVideoProps) {
  return (
    <figure>
      <div
        className={`overflow-hidden rounded-sm border border-border bg-surface ${className}`}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label={label}
        >
          <source src={src} type={type} />
        </video>
      </div>
      <figcaption className="mt-3 text-sm leading-snug text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

import { sldProjectMedia } from "@/lib/sld-project-media";

type SldHeroMediaProps = {
  className?: string;
};

export function SldHeroMedia({ className = "" }: SldHeroMediaProps) {
  const { heroVideo } = sldProjectMedia;

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-sm border border-border bg-surface">
        <div className="relative aspect-video w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover object-center scale-[1.2]"
            aria-label={heroVideo.label}
          >
            <source src={heroVideo.src} type={heroVideo.type} />
          </video>
        </div>
      </div>
    </div>
  );
}

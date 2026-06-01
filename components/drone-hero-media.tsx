import { droneProjectMedia } from "@/lib/drone-project-media";

type DroneHeroMediaProps = {
  className?: string;
};

export function DroneHeroMedia({ className = "" }: DroneHeroMediaProps) {
  const { heroVideo } = droneProjectMedia;

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-sm border border-border bg-surface">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="aspect-[4/3] w-full object-cover"
          aria-label={heroVideo.label}
        >
          <source src={heroVideo.src} type={heroVideo.type} />
        </video>
      </div>
    </div>
  );
}

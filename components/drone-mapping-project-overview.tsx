import { droneProjectMedia } from "@/lib/drone-project-media";

const roleSummary = [
  "Led design for Aurora’s Drone Mapping workflow from V0 through V2 planning",
  "Partnered with Product, Engineering, Computer Vision, and Customer Success",
  "Defined upload, processing, and education patterns for raw drone imagery",
  "Balanced early-access learning with beta reliability and monetization strategy",
];

type DroneMappingProjectOverviewProps = {
  className?: string;
};

export function DroneMappingProjectOverview({
  className = "",
}: DroneMappingProjectOverviewProps) {
  const { illustration } = droneProjectMedia;
  const illustrationWidth = 150;

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="space-y-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={illustration.src}
          alt={illustration.alt}
          width={illustrationWidth}
          height={Math.round(
            (illustrationWidth * illustration.height) / illustration.width
          )}
          className="h-auto w-[150px] max-w-full object-contain opacity-90"
        />
        <h1 className="text-[clamp(2.6rem,5.2vw,4.225rem)] font-light leading-none tracking-tight text-foreground">
          Drone Mapping
        </h1>
        <p className="text-sm leading-snug text-foreground md:text-base">
          Senior Product Designer · Strategy · Research · Platform
        </p>
        <p className="text-xs tracking-wide text-muted md:text-sm">
          2025–2026 · V0 early access → V1 beta → V2 validation/implementation ·
          Aurora Solar
        </p>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-muted md:text-[0.9375rem]">
        <p>
          Solar teams were already using drones in the field, but turning
          imagery into usable design inputs required a fragmented workflow
          across multiple tools.
        </p>
        <p>
          Partnering closely with Product and Engineering, I helped define an
          iterative roadmap that prioritized fast customer learning over large
          upfront investment. We launched a series of targeted releases, using
          research, beta feedback, and usage data to continuously refine the
          workflow.
        </p>
        <p>
          Over six months, Drone Mapping evolved from an exploratory concept
          into a beta product that generates custom maps and LiDAR surface
          models directly within Aurora. The beta validated both customer demand
          and commercial viability, leading to a dedicated Aurora SKU and a V2
          roadmap now in active development.
        </p>
      </div>

      <div className="rounded-sm border border-border p-6 md:p-8">
        <h2 className="text-sm font-medium tracking-tight text-foreground">
          My Role
        </h2>
        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted">
          {roleSummary.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden className="text-muted/50">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const base = "/assets/Drone-project";

function assetPath(...segments: string[]) {
  return [base, ...segments.map((segment) => encodeURIComponent(segment))].join(
    "/"
  );
}

export const droneProjectMedia = {
  illustration: {
    src: assetPath("Drone-illustration.svg"),
    alt: "Isometric illustration of a drone mapping a house",
    width: 608,
    height: 420,
  },
  heroVideo: {
    src: assetPath("Drone-video.mov"),
    type: "video/quicktime" as const,
    label: "Drone Mapping workflow overview",
  },
  timeline: {
    src: assetPath("Drone-timeline.png"),
    alt: "Drone Mapping project timeline — research, V0, and V1 in parallel",
    label: "Project timeline recap",
    width: 1600,
    height: 900,
  },
  iterationStrategy: {
    src: assetPath("iteration-strategy.png"),
    alt: "Iterative product development strategy — Swarm through V1 beta and beyond",
    label: "Iterative Product DevelopmentStategy",
    width: 1600,
    height: 900,
  },
  surveys: [
    {
      src: assetPath("drone-suvery2.png"),
      alt: "Pendo poll — drone usage in solar workflows",
      label: "Pendo poll — drone usage in solar workflows",
      width: 1200,
      height: 800,
    },
  ],
  research: {
    earlyDiscovery: {
      src: assetPath("drone-suvery2.png"),
      alt: "Pendo poll — drone usage in solar workflows",
      label: "Pendo poll — drone usage in solar workflows",
      width: 1200,
      height: 800,
    },
    v0Tester: {
      src: assetPath("drone-survey3.png"),
      alt: "V0 early access tester tracking spreadsheet",
      label: "V0 early access — tester tracking",
      width: 2261,
      height: 992,
    },
    v1ExitSurvey: {
      src: assetPath("drone-suvery1.png"),
      alt: "V1 beta Pendo exit survey — Drone Mapping experience",
      label: "V1 beta — Pendo exit survey",
      width: 1200,
      height: 800,
    },
  },
  v0: {
    earlyAccess: {
      src: assetPath("V0-early access.png"),
      alt: "V0 early access — custom LiDAR and auto-scaled map background",
      label: "V0 early access — surface model output",
      width: 1200,
      height: 800,
    },
    instruction: {
      src: assetPath("v0-instruction.png"),
      alt: "How to process and upload drone data to Aurora",
      label: "V0 — third-party processing instructions",
      width: 1650,
      height: 7864,
    },
    screens: [
      {
        src: assetPath("V0-1-.png"),
        alt: "V0 workflow screen — map and LiDAR layers",
        label: "V0 — map and LiDAR in Aurora",
        width: 1200,
        height: 800,
      },
      {
        src: assetPath("V0-2.png"),
        alt: "V0 workflow screen — custom surface model applied",
        label: "V0 — custom surface model applied",
        width: 1200,
        height: 800,
      },
    ],
  },
  v1: {
    card: {
      src: assetPath("V1-card.png"),
      alt: "V1 beta entry card — upload raw drone images for processing",
      label: "V1 beta — entry point",
      width: 1200,
      height: 800,
    },
    uploadDroneImages: {
      src: assetPath("upload-drone-images.mov"),
      type: "video/quicktime" as const,
      label: "Upload drone images",
    },
    reviewModel: {
      src: assetPath("V1-review model.png"),
      alt: "V1 beta — review processed LiDAR and map output",
      label: "V1 beta — review model output",
      width: 1200,
      height: 800,
    },
    mapOutput: {
      src: assetPath("new-map.mov"),
      type: "video/quicktime" as const,
      label: "Auto scaled drone orthographic image",
    },
    lidarOutput: {
      src: assetPath("new-lidar.mov"),
      type: "video/quicktime" as const,
      label: "high resolution Drone LiDAR model",
    },
  },
  v2: {
    texturedMeshVideo: {
      src: assetPath("Drone-video.mov"),
      type: "video/quicktime" as const,
      label: "Video upload support with measurable textured mesh",
    },
    mergeDesign: {
      src: assetPath("merge-design.png"),
      alt: "Merge drone output with existing design",
      label: "Merge with existing design",
      width: 2068,
      height: 1290,
    },
  },
  metrics: {
    carousel: [
      {
        src: assetPath("metrics-1.png"),
        alt: "V1 beta usage metric 1",
        width: 1592,
        height: 988,
      },
      {
        src: assetPath("metrics-3.png"),
        alt: "V1 beta usage metric 3",
        width: 1590,
        height: 982,
      },
      {
        src: assetPath("metrics-4.png"),
        alt: "V1 beta usage metric 4",
        width: 1594,
        height: 986,
      },
      {
        src: assetPath("metrics-5.png"),
        alt: "V1 beta usage metric 5",
        width: 1594,
        height: 984,
      },
      {
        src: assetPath("metrics-6.png"),
        alt: "V1 beta usage metric 6",
        width: 1042,
        height: 988,
      },
    ],
    summary: {
      src: assetPath("metrics-7.png"),
      alt: "Organic beta usage growth among pre-sale tenants",
      label: "Organic Beta Usage Steadily Grew among Pre-Sale Tenants",
      width: 3242,
      height: 990,
    },
  },
  findings: [
    {
      src: assetPath("V1-findings", "Screenshot 2026-02-24 at 3.06.17 PM 1.png"),
      label: "Beta usage — feature exploration",
      width: 1200,
      height: 800,
    },
    {
      src: assetPath("V1-findings", "Screenshot 2026-02-24 at 3.06.38 PM 1.png"),
      label: "Beta usage — processing activity",
      width: 1200,
      height: 800,
    },
    {
      src: assetPath("V1-findings", "Screenshot 2026-02-25 at 12.20.10 PM 1.png"),
      label: "Upload friction — image count validation",
      width: 1200,
      height: 800,
    },
    {
      src: assetPath("V1-findings", "Screenshot 2026-02-25 at 12.28.59 PM 1.png"),
      label: "Upload flow — geolocation feedback",
      width: 1200,
      height: 800,
    },
    {
      src: assetPath("V1-findings", "Screenshot 2026-02-25 at 12.29.24 PM 1.png"),
      label: "Upload flow — file requirements messaging",
      width: 1200,
      height: 800,
    },
    {
      src: assetPath("V1-findings", "Screenshot 2026-02-25 at 12.29.51 PM 1.png"),
      label: "Processing complete — accept output",
      width: 1200,
      height: 800,
    },
  ],
} as const;

export const droneImpactMetrics = [
  {
    value: "63%",
    label: "Use drones regularly or occasionally",
    detail: "Pendo survey — 1,838 unique responses",
  },
  {
    value: "58%",
    label: "Value drone imagery upload",
    detail: "Said uploading drone imagery is very valuable",
  },
  {
    value: "~73%",
    label: "Processing acceptance rate",
    detail: "Users accepting output on successful processes",
  },
  {
    value: "2/3",
    label: "Must-have / nice-to-have",
    detail: "V1 exit survey respondents (12 responses)",
  },
  {
    value: "15–30",
    label: "Minutes saved per workflow",
    detail: "Self-reported time savings in exit survey",
  },
  {
    value: "4/7",
    label: "Would use another tool",
    detail: "If drone processing were unavailable in Aurora",
  },
] as const;

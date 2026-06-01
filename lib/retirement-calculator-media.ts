const base = "/assets/Retirement-calculator";

function assetPath(filename: string) {
  return `${base}/${encodeURIComponent(filename)}`;
}

export type RetirementCalculatorImage = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

export const retirementCalculatorMedia = {
  heroMockups: {
    src: assetPath("retirement-calculator-display.png"),
    alt: "NerdWallet retirement calculator — desktop and mobile display",
    label: "Desktop and mobile calculator mockups",
    width: 1036,
    height: 1442,
  },
  existingCalculator: {
    src: assetPath("Screenshot 2023-04-09 at 2.46 1.png"),
    alt: "Existing NerdWallet retirement calculator before redesign",
    label: "Existing calculator screenshot",
    width: 2144,
    height: 1450,
  },
  actionableSteps: {
    src: assetPath("actionable-steps.png"),
    alt: "Retirement calculator results and actionable recommendations",
    label: "Results and recommendations UI",
    width: 2438,
    height: 1608,
  },
  inputs: {
    src: assetPath("inputes.png"),
    alt: "Retirement calculator input form",
    label: "Input form UI",
    width: 628,
    height: 888,
  },
  sliders: {
    src: assetPath("refining-results-feature.png"),
    alt: "Retirement calculator slider controls for refining results",
    label: "Slider interaction UI",
    width: 912,
    height: 500,
  },
  dataVis: {
    src: assetPath("data-vis.png"),
    alt: "Retirement projection graph and data visualization",
    label: "Retirement projection graph",
    width: 1676,
    height: 2216,
  },
  beforeCalculator: {
    src: assetPath("Screenshot 2023-04-09 at 2.46 1.png"),
    alt: "Before redesign — static calculator outputs with limited context",
    label: "Before calculator — static outputs with limited context",
    width: 2144,
    height: 1450,
  },
  afterCalculator: {
    src: assetPath("retirement-calculator-display.png"),
    alt: "After redesign — interactive planning with dynamic feedback",
    label: "After calculator — interactive planning with dynamic feedback",
    width: 1036,
    height: 1442,
  },
  interactiveSliders: {
    src: assetPath("refining-results-feature.png"),
    alt: "Interactive retirement calculator sliders",
    label: "Interactive sliders",
    width: 912,
    height: 500,
  },
  graphUpdating: {
    src: assetPath("data-vis.png"),
    alt: "Retirement projection graph updating based on user input",
    label: "Graph updating based on user input",
    width: 1676,
    height: 2216,
  },
  mobileScreens: {
    src: assetPath("inputes.png"),
    alt: "Mobile retirement calculator screens",
    label: "Mobile calculator screens",
    width: 628,
    height: 888,
  },
  audit: {
    src: assetPath("Audit.png"),
    alt: "Audit workshop board for retirement calculator redesign",
    label: "Audit workshop board",
    width: 3840,
    height: 1088,
  },
  earlySketches: {
    src: assetPath("early sketches.png"),
    alt: "Early sketches for retirement calculator concepts",
    label: "Early sketches",
    width: 1176,
    height: 1134,
  },
  wireframes: {
    src: assetPath("wireframes.png"),
    alt: "Retirement calculator wireframes",
    label: "Wireframes",
    width: 766,
    height: 356,
  },
} as const satisfies Record<string, RetirementCalculatorImage>;

export const designHighlightImages = [
  retirementCalculatorMedia.actionableSteps,
  retirementCalculatorMedia.sliders,
  retirementCalculatorMedia.dataVis,
] as const;

export const processImages = [
  retirementCalculatorMedia.audit,
  retirementCalculatorMedia.earlySketches,
  retirementCalculatorMedia.wireframes,
] as const;

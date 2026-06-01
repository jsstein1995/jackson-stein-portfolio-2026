const base = "/assets/SLD";

function assetPath(filename: string) {
  return `${base}/${encodeURIComponent(filename)}`;
}

export type SldImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const sldProjectMedia = {
  heroVideo: {
    src: assetPath("SLD-editor-2.mp4"),
    type: "video/mp4" as const,
    label: "Single-Line Diagram Editor in Aurora",
    width: 1280,
    height: 720,
  },
  templatesVideo: {
    src: assetPath("templates-video-small-2.mp4"),
    type: "video/mp4" as const,
    label: "Templates — reusable electrical component configurations in the SLD editor",
  },
  iterativeRoadmap: {
    src: assetPath("iterative-SLD.png"),
    alt: "Iterative SLD product roadmap — MVP editor, templates, and polish milestones",
    label:
      "Product strategy and development milestones — from the MVP editor to templates and beyond",
    width: 2066,
    height: 588,
  },
  platform: {
    componentLibrary: [
      {
        src: assetPath("component-library-1.png"),
        alt: "SLD editor component toolbar",
        width: 684,
        height: 852,
      },
      {
        src: assetPath("component-library-2.png"),
        alt: "Electrical component symbol library",
        width: 488,
        height: 1238,
      },
      {
        src: assetPath("component-library-3.png"),
        alt: "Component symbol picker",
        width: 344,
        height: 352,
      },
      {
        src: assetPath("component-library-4.png"),
        alt: "Adding components to the diagram canvas",
        width: 1348,
        height: 906,
      },
      {
        src: assetPath("component-library-5.png"),
        alt: "Component library toolbar expanded",
        width: 1094,
        height: 376,
      },
      {
        src: assetPath("component-library-6.png"),
        alt: "Symbol selection in the SLD editor",
        width: 770,
        height: 1184,
      },
    ] satisfies SldImage[],
    smartWiring: [
      {
        src: assetPath("smart-wiring.png"),
        alt: "Smart wiring connections in the SLD editor",
        width: 1268,
        height: 506,
      },
      {
        src: assetPath("smart-wiring-2.png"),
        alt: "Wire tapping and connection points",
        width: 1460,
        height: 764,
      },
      {
        src: assetPath("smart-wiring-3.png"),
        alt: "Crossed wires and automatic sorting",
        width: 1822,
        height: 440,
      },
    ] satisfies SldImage[],
    textAnnotation: {
      src: assetPath("adding-text.png"),
      alt: "Adding text labels and annotations to the diagram",
      width: 890,
      height: 1320,
    } satisfies SldImage,
    previewExport: {
      src: assetPath("preview.png"),
      alt: "Preview and export of the finished SLD document",
      width: 1298,
      height: 370,
    } satisfies SldImage,
  },
} as const;

export const platformSubsections = [
  {
    title: "Component library",
    body: "Users could add electrical components and symbols from a toolbar, creating a more flexible diagramming workflow.",
    images: sldProjectMedia.platform.componentLibrary,
  },
  {
    title: "Smart wiring",
    body: "Wiring was one of the most complex parts of the interaction model. The editor needed to support direct connections, wire tapping, ports, connection points, crossed wires, and automatic sorting.",
    images: sldProjectMedia.platform.smartWiring,
  },
  {
    title: "Text and annotation",
    body: "Users needed to add labels and notes while preserving a clean final diagram output.",
    images: [sldProjectMedia.platform.textAnnotation],
  },
  {
    title: "Preview and export",
    body: "Users could preview the finished SLD document before export.",
    images: [sldProjectMedia.platform.previewExport],
  },
] as const;

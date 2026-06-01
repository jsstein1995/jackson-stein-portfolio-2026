"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent,
} from "react";

export type EmojiGlyphHeroProps = {
  text?: string;
  baseEmoji?: string;
  hoverEmoji?: string;
  dotSize?: number;
  gridGap?: number;
  interactionRadius?: number;
  padX?: number;
  padY?: number;
  textScaleY?: number;
  className?: string;
};

type GridPoint = {
  x: number;
  y: number;
  inMask: boolean;
  isEdge: boolean;
};

type SceneState = {
  width: number;
  height: number;
  dpr: number;
  step: number;
  fontSize: number;
  points: GridPoint[];
  baseLayer: HTMLCanvasElement;
  hoverSprite: HTMLCanvasElement;
  interactivePoints: GridPoint[];
  spatialGrid: Map<string, GridPoint[]>;
  spatialCell: number;
};


const MAX_DPR = 2;
const BLOB_MAX_WARP = 1.85;
/** Lower = more lag on the magnetic hover field (0–1). */
const EFFECT_CURSOR_LAG = 0.13;

function getEffectiveDpr() {
  return Math.min(window.devicePixelRatio || 1, MAX_DPR);
}

function loadEmojiSprite(emoji: string, size: number, dpr: number) {
  return new Promise<HTMLCanvasElement>((resolve) => {
    const canvas = document.createElement("canvas");
    const px = Math.max(1, Math.ceil(size * dpr));
    canvas.width = px;
    canvas.height = px;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve(canvas);
      return;
    }

    const fontSize = size * dpr * 0.82;
    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}">
      <foreignObject width="${px}" height="${px}">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji',sans-serif;font-size:${fontSize}px;line-height:1;display:flex;align-items:center;justify-content:center;width:${px}px;height:${px}px;margin:0;padding:0;">
          ${emoji}
        </div>
      </foreignObject>
    </svg>`;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, px, px);
      resolve(canvas);
    };
    img.onerror = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(emoji, px / 2, px / 2);
      resolve(canvas);
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`;
  });
}

function buildSpatialGrid(points: GridPoint[], cellSize: number) {
  const grid = new Map<string, GridPoint[]>();

  for (const point of points) {
    const key = `${Math.floor(point.x / cellSize)},${Math.floor(point.y / cellSize)}`;
    const bucket = grid.get(key);
    if (bucket) {
      bucket.push(point);
    } else {
      grid.set(key, [point]);
    }
  }

  return grid;
}

function getNearbyInteractivePoints(
  grid: Map<string, GridPoint[]>,
  cellSize: number,
  mx: number,
  my: number,
  range: number
) {
  const nearby: GridPoint[] = [];
  const minCx = Math.floor((mx - range) / cellSize);
  const maxCx = Math.floor((mx + range) / cellSize);
  const minCy = Math.floor((my - range) / cellSize);
  const maxCy = Math.floor((my + range) / cellSize);

  for (let cy = minCy; cy <= maxCy; cy++) {
    for (let cx = minCx; cx <= maxCx; cx++) {
      const bucket = grid.get(`${cx},${cy}`);
      if (bucket) nearby.push(...bucket);
    }
  }

  return nearby;
}

async function buildBaseLayer(
  width: number,
  height: number,
  dpr: number,
  step: number,
  dotSize: number,
  points: GridPoint[],
  baseEmoji: string
) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const emojiSize = step * 0.88;
  const cellHalf = step * 0.46;
  const half = dotSize / 2;
  const spriteOffset = emojiSize / 2;
  const baseSprite = await loadEmojiSprite(baseEmoji, emojiSize, dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = "#fafafa";
  ctx.fillRect(0, 0, width, height);

  for (const point of points) {
    if (!point.inMask) {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(point.x - half, point.y - half, dotSize, dotSize);
      continue;
    }

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(
      point.x - cellHalf,
      point.y - cellHalf,
      cellHalf * 2,
      cellHalf * 2
    );
    ctx.drawImage(
      baseSprite,
      point.x - spriteOffset,
      point.y - spriteOffset,
      emojiSize,
      emojiSize
    );
  }

  return canvas;
}

async function buildSceneAssets(
  scene: Omit<
    SceneState,
    | "baseLayer"
    | "hoverSprite"
    | "interactivePoints"
    | "spatialGrid"
    | "spatialCell"
  >,
  baseEmoji: string,
  hoverEmoji: string,
  dotSize: number,
  interactionRadius: number
): Promise<
  Pick<
    SceneState,
    | "baseLayer"
    | "hoverSprite"
    | "interactivePoints"
    | "spatialGrid"
    | "spatialCell"
  >
> {
  const emojiSize = scene.step * 0.88;
  const interactivePoints = scene.points.filter(
    (point) => point.inMask || point.isEdge
  );
  const spatialCell = Math.max(scene.step, interactionRadius / 2);

  const [baseLayer, hoverSprite] = await Promise.all([
    buildBaseLayer(
      scene.width,
      scene.height,
      scene.dpr,
      scene.step,
      dotSize,
      scene.points,
      baseEmoji
    ),
    loadEmojiSprite(hoverEmoji, emojiSize, scene.dpr),
  ]);

  return {
    baseLayer,
    hoverSprite,
    interactivePoints,
    spatialGrid: buildSpatialGrid(interactivePoints, spatialCell),
    spatialCell,
  };
}

function computeFontSizeFromWidth(
  width: number,
  text: string,
  padX: number,
  step: number
) {
  const maxWidth = width - padX * 2 * step;
  const measureCanvas = document.createElement("canvas");
  const measureCtx = measureCanvas.getContext("2d");
  if (!measureCtx || maxWidth <= 0) return 48;

  let low = 12;
  let high = Math.floor(width * 0.5);
  let best = 12;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    measureCtx.font = `900 ${mid}px "Arial Black", "Helvetica Neue", sans-serif`;
    const fitsWidth = measureCtx.measureText(text).width <= maxWidth;

    if (fitsWidth) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return best;
}

function buildGridPoints(
  width: number,
  height: number,
  step: number,
  text: string,
  fontSize: number,
  dpr: number,
  textScaleY = 1
): GridPoint[] {
  const points: GridPoint[] = [];
  const halfStep = step / 2;

  for (let y = halfStep; y < height; y += step) {
    for (let x = halfStep; x < width; x += step) {
      points.push({ x, y, inMask: false, isEdge: false });
    }
  }

  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = Math.max(1, Math.floor(width * dpr));
  maskCanvas.height = Math.max(1, Math.floor(height * dpr));
  const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
  if (!maskCtx) return points;

  maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  maskCtx.clearRect(0, 0, width, height);
  maskCtx.fillStyle = "#000";
  maskCtx.font = `900 ${fontSize}px "Arial Black", "Helvetica Neue", sans-serif`;
  maskCtx.textAlign = "center";
  maskCtx.textBaseline = "middle";
  maskCtx.save();
  maskCtx.translate(width / 2, height / 2);
  maskCtx.scale(1, textScaleY);
  maskCtx.fillText(text, 0, 0);
  maskCtx.restore();

  const { data, width: maskWidth } = maskCtx.getImageData(
    0,
    0,
    maskCanvas.width,
    maskCanvas.height
  );

  for (const point of points) {
    const px = Math.min(
      maskCanvas.width - 1,
      Math.max(0, Math.floor(point.x * dpr))
    );
    const py = Math.min(
      maskCanvas.height - 1,
      Math.max(0, Math.floor(point.y * dpr))
    );
    const alpha = data[(py * maskWidth + px) * 4 + 3];
    point.inMask = alpha > 64;
  }

  return points;
}

function cropPointsToText(
  points: GridPoint[],
  step: number,
  padY: number
): { points: GridPoint[]; height: number } {
  const halfStep = step / 2;
  const maskPoints = points.filter((point) => point.inMask);

  if (maskPoints.length === 0) {
    return { points, height: step };
  }

  const rows = maskPoints.map((point) =>
    Math.round((point.y - halfStep) / step)
  );
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const cropMinRow = minRow - padY;
  const cropMaxRow = maxRow + padY;
  const rowCount = cropMaxRow - cropMinRow + 1;

  const cropped = points
    .filter((point) => {
      const row = Math.round((point.y - halfStep) / step);
      return row >= cropMinRow && row <= cropMaxRow;
    })
    .map((point) => {
      const row = Math.round((point.y - halfStep) / step);
      return {
        x: point.x,
        y: halfStep + (row - cropMinRow) * step,
        inMask: point.inMask,
        isEdge: false,
      };
    });

  return { points: cropped, height: rowCount * step };
}

function markEdgeDots(points: GridPoint[], step: number) {
  const halfStep = step / 2;
  const maskKeys = new Set<string>();

  for (const point of points) {
    if (!point.inMask) continue;

    const col = Math.round((point.x - halfStep) / step);
    const row = Math.round((point.y - halfStep) / step);
    maskKeys.add(`${col},${row}`);
  }

  for (const point of points) {
    if (point.inMask) {
      point.isEdge = false;
      continue;
    }

    const col = Math.round((point.x - halfStep) / step);
    const row = Math.round((point.y - halfStep) / step);
    let isEdge = false;

    for (let dr = -1; dr <= 1 && !isEdge; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        if (maskKeys.has(`${col + dc},${row + dr}`)) {
          isEdge = true;
          break;
        }
      }
    }

    point.isEdge = isEdge;
  }
}

function buildScene(
  width: number,
  text: string,
  dotSize: number,
  gridGap: number,
  padX: number,
  padY: number,
  dpr: number,
  textScaleY: number
): Omit<
  SceneState,
  | "baseLayer"
  | "hoverSprite"
  | "interactivePoints"
  | "spatialGrid"
  | "spatialCell"
> {
  const step = dotSize + gridGap;
  const fontSize = computeFontSizeFromWidth(width, text, padX, step);
  const measureHeight = fontSize + padY * 2 * step + step * 2;

  // Lock grid dimensions from unscaled text bounds.
  const layoutPoints = buildGridPoints(
    width,
    measureHeight,
    step,
    text,
    fontSize,
    dpr,
    1
  );
  const { points, height } = cropPointsToText(layoutPoints, step, padY);

  // Re-sample mask with vertical stretch so letterforms read taller in the same grid.
  applyTextScaleMask(points, width, height, text, fontSize, dpr, textScaleY);
  markEdgeDots(points, step);

  return { width, height, dpr, step, fontSize, points };
}

function applyTextScaleMask(
  points: GridPoint[],
  width: number,
  height: number,
  text: string,
  fontSize: number,
  dpr: number,
  textScaleY: number
) {
  if (textScaleY === 1) return;

  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = Math.max(1, Math.floor(width * dpr));
  maskCanvas.height = Math.max(1, Math.floor(height * dpr));
  const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
  if (!maskCtx) return;

  maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  maskCtx.clearRect(0, 0, width, height);
  maskCtx.fillStyle = "#000";
  maskCtx.font = `900 ${fontSize}px "Arial Black", "Helvetica Neue", sans-serif`;
  maskCtx.textAlign = "center";
  maskCtx.textBaseline = "middle";
  maskCtx.save();
  maskCtx.translate(width / 2, height / 2);
  maskCtx.scale(1, textScaleY);
  maskCtx.fillText(text, 0, 0);
  maskCtx.restore();

  const { data, width: maskWidth } = maskCtx.getImageData(
    0,
    0,
    maskCanvas.width,
    maskCanvas.height
  );

  for (const point of points) {
    const px = Math.min(
      maskCanvas.width - 1,
      Math.max(0, Math.floor(point.x * dpr))
    );
    const py = Math.min(
      maskCanvas.height - 1,
      Math.max(0, Math.floor(point.y * dpr))
    );
    const alpha = data[(py * maskWidth + px) * 4 + 3];
    point.inMask = alpha > 64;
  }
}

/** Blob activation with distance culling. */
function isPointActivated(
  mx: number,
  my: number,
  point: GridPoint,
  radius: number,
  time: number
) {
  const dx = point.x - mx;
  const dy = point.y - my;
  const distSq = dx * dx + dy * dy;
  const maxDist = radius * BLOB_MAX_WARP;

  if (distSq > maxDist * maxDist) return false;

  return isInsideMagneticBlob(mx, my, point.x, point.y, radius, time);
}

/** Animated blob-shaped field — radius warps by angle and time. */
function isInsideMagneticBlob(
  mx: number,
  my: number,
  px: number,
  py: number,
  radius: number,
  time: number
) {
  const dx = px - mx;
  const dy = py - my;
  const dist = Math.hypot(dx, dy);
  if (dist === 0) return true;

  const angle = Math.atan2(dy, dx);
  const warp =
    1 +
    0.3 * Math.sin(angle * 3 + time) +
    0.2 * Math.sin(angle * 5 - time * 1.35) +
    0.14 * Math.cos(angle * 2 + time * 0.9) +
    0.1 * Math.sin(angle * 7 + time * 1.8) +
    0.06 * Math.cos(angle * 4 - time * 0.6);

  return dist <= radius * warp;
}

const DEFAULTS = {
  text: "JACKSON STEIN",
  baseEmoji: "👨🏻‍💻",
  hoverEmoji: "👨🏻‍🎨",
  dotSize: 3.91,
  gridGap: 13.34,
  interactionRadius: 86,
  padX: 2,
  padY: 4,
  textScaleY: 1.3,
} as const;

function createRainbowGradient(
  ctx: CanvasRenderingContext2D,
  width: number
) {
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, "#ff0080");
  gradient.addColorStop(0.17, "#ff4500");
  gradient.addColorStop(0.33, "#fff700");
  gradient.addColorStop(0.5, "#00ff6a");
  gradient.addColorStop(0.67, "#00e8ff");
  gradient.addColorStop(0.83, "#9d00ff");
  gradient.addColorStop(1, "#ff00cc");
  return gradient;
}

export function EmojiGlyphHero({
  text = DEFAULTS.text,
  baseEmoji = DEFAULTS.baseEmoji,
  hoverEmoji = DEFAULTS.hoverEmoji,
  dotSize = DEFAULTS.dotSize,
  gridGap = DEFAULTS.gridGap,
  interactionRadius = DEFAULTS.interactionRadius,
  padX = DEFAULTS.padX,
  padY = DEFAULTS.padY,
  textScaleY = DEFAULTS.textScaleY,
  className = "",
}: EmojiGlyphHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneState | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const effectMouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const rafLoopActiveRef = useRef(false);
  const isVisibleRef = useRef(true);
  const rainbowFillRef = useRef<CanvasGradient | null>(null);
  const propsRef = useRef({
    text,
    baseEmoji,
    hoverEmoji,
    dotSize,
    gridGap,
    interactionRadius,
    padX,
    padY,
    textScaleY,
  });

  propsRef.current = {
    text,
    baseEmoji,
    hoverEmoji,
    dotSize,
    gridGap,
    interactionRadius,
    padX,
    padY,
    textScaleY,
  };

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { interactionRadius: radius } = propsRef.current;
    const {
      width,
      height,
      dpr,
      step,
      baseLayer,
      hoverSprite,
      spatialGrid,
      spatialCell,
    } = scene;
    const { x: mx, y: my, active } = mouseRef.current;
    const effectMouse = effectMouseRef.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(baseLayer, 0, 0, width, height);

    if (!active) return;

    if (effectMouse.x < -9000) {
      effectMouse.x = mx;
      effectMouse.y = my;
    } else {
      effectMouse.x += (mx - effectMouse.x) * EFFECT_CURSOR_LAG;
      effectMouse.y += (my - effectMouse.y) * EFFECT_CURSOR_LAG;
    }

    const blobTime = performance.now() * 0.002;
    const emojiSize = step * 0.88;
    const cellHalf = step * 0.46;
    const spriteOffset = emojiSize / 2;
    const searchRange = radius * BLOB_MAX_WARP;
    const nearby = getNearbyInteractivePoints(
      spatialGrid,
      spatialCell,
      mx,
      my,
      searchRange
    );

    let rainbowFill = rainbowFillRef.current;
    if (!rainbowFill) {
      rainbowFill = createRainbowGradient(ctx, width);
      rainbowFillRef.current = rainbowFill;
    }

    ctx.fillStyle = rainbowFill;
    for (const point of nearby) {
      if (
        !isPointActivated(
          effectMouse.x,
          effectMouse.y,
          point,
          radius,
          blobTime
        )
      ) {
        continue;
      }

      ctx.fillRect(
        point.x - cellHalf,
        point.y - cellHalf,
        cellHalf * 2,
        cellHalf * 2
      );
      ctx.drawImage(
        hoverSprite,
        point.x - spriteOffset,
        point.y - spriteOffset,
        emojiSize,
        emojiSize
      );
    }
  }, []);

  const stopAnimationLoop = useCallback(() => {
    rafLoopActiveRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  const animationFrame = useCallback(() => {
    if (!rafLoopActiveRef.current || !isVisibleRef.current) return;

    drawFrame();
    rafRef.current = requestAnimationFrame(animationFrame);
  }, [drawFrame]);

  const startAnimationLoop = useCallback(() => {
    if (rafLoopActiveRef.current || !isVisibleRef.current) return;
    rafLoopActiveRef.current = true;
    rafRef.current = requestAnimationFrame(animationFrame);
  }, [animationFrame]);

  const rebuildScene = useCallback(async () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = Math.max(1, container.clientWidth);
    const dpr = getEffectiveDpr();
    const {
      text: currentText,
      baseEmoji: currentBaseEmoji,
      hoverEmoji: currentHoverEmoji,
      dotSize: currentDotSize,
      gridGap: currentGridGap,
      padX: currentPadX,
      padY: currentPadY,
      textScaleY: currentTextScaleY,
      interactionRadius: currentInteractionRadius,
    } = propsRef.current;

    const layout = buildScene(
      width,
      currentText,
      currentDotSize,
      currentGridGap,
      currentPadX,
      currentPadY,
      dpr,
      currentTextScaleY
    );
    const assets = await buildSceneAssets(
      layout,
      currentBaseEmoji,
      currentHoverEmoji,
      currentDotSize,
      currentInteractionRadius
    );

    canvas.width = Math.floor(layout.width * dpr);
    canvas.height = Math.floor(layout.height * dpr);
    canvas.style.width = `${layout.width}px`;
    canvas.style.height = `${layout.height}px`;
    container.style.height = `${layout.height}px`;

    sceneRef.current = { ...layout, ...assets };
    rainbowFillRef.current = null;
    drawFrame();
  }, [drawFrame]);

  useEffect(() => {
    rebuildScene();

    const container = containerRef.current;
    if (!container) {
      return () => stopAnimationLoop();
    }

    const resizeObserver = new ResizeObserver(() => rebuildScene());
    resizeObserver.observe(container);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          stopAnimationLoop();
        } else if (mouseRef.current.active) {
          startAnimationLoop();
        }
      },
      { rootMargin: "80px 0px" }
    );
    visibilityObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      stopAnimationLoop();
    };
  }, [
    rebuildScene,
    startAnimationLoop,
    stopAnimationLoop,
    text,
    baseEmoji,
    hoverEmoji,
    dotSize,
    gridGap,
    padX,
    padY,
    textScaleY,
    interactionRadius,
  ]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const events = event.nativeEvent.getCoalescedEvents?.() ?? [
        event.nativeEvent,
      ];
      const latest = events[events.length - 1];

      mouseRef.current = {
        x: latest.clientX - rect.left,
        y: latest.clientY - rect.top,
        active: true,
      };
      startAnimationLoop();
    },
    [startAnimationLoop]
  );

  const handlePointerLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false };
    effectMouseRef.current = { x: -9999, y: -9999 };
    stopAnimationLoop();
    drawFrame();
  }, [stopAnimationLoop, drawFrame]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-background contain-paint ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block w-full touch-pan-y"
        aria-hidden
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
    </div>
  );
}

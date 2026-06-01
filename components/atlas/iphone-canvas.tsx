"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  AdaptiveDpr,
} from "@react-three/drei";
import * as THREE from "three";
import { IPhoneModel } from "./iphone-model";
import { easeOutQuart } from "@/lib/atlas-scroll";

type SceneProps = {
  screenshots: string[];
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgressRef: React.RefObject<number>;
  fillScaleRef: React.MutableRefObject<number>;
};

function ScrollBackground({
  scrollProgressRef,
}: {
  scrollProgressRef: React.RefObject<number>;
}) {
  const { scene } = useThree();
  const bgColor = useRef(new THREE.Color(0x0a1628));

  useFrame(() => {
    const p = easeOutQuart(Math.min(scrollProgressRef.current ?? 0, 1));
    bgColor.current.setRGB(
      THREE.MathUtils.lerp(0.04, 0.96, p),
      THREE.MathUtils.lerp(0.06, 0.96, p),
      THREE.MathUtils.lerp(0.15, 0.96, p)
    );
    scene.background = bgColor.current;
  });

  return null;
}

function ScrollShadow({
  scrollProgressRef,
}: {
  scrollProgressRef: React.RefObject<number>;
}) {
  const shadowRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!shadowRef.current) return;
    const p = easeOutQuart(Math.min(scrollProgressRef.current ?? 0, 1));
    const mat = shadowRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = THREE.MathUtils.lerp(0, 0.35, Math.max(0, (p - 0.6) / 0.35));
    const s = THREE.MathUtils.lerp(0.5, 1, p);
    shadowRef.current.scale.set(s, 1, s);
  });

  return (
    <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
      <planeGeometry args={[2.5, 1.2]} />
      <meshBasicMaterial color="#000000" transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

function Scene({
  screenshots,
  pointer,
  scrollProgressRef,
  fillScaleRef,
}: SceneProps) {
  return (
    <>
      <ScrollBackground scrollProgressRef={scrollProgressRef} />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#c4b5fd" />
      <spotLight position={[0, 5, 2]} angle={0.35} penumbra={1} intensity={0.55} />

      <Environment preset="studio" environmentIntensity={0.6} />

      <IPhoneModel
        screenshots={screenshots}
        pointer={pointer}
        scrollProgressRef={scrollProgressRef}
        fillScaleRef={fillScaleRef}
      />

      <ScrollShadow scrollProgressRef={scrollProgressRef} />
      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.35}
        scale={12}
        blur={2.8}
        far={4}
      />

      <AdaptiveDpr pixelated />
    </>
  );
}

type IPhoneCanvasProps = {
  screenshots: string[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollProgressRef: React.RefObject<number>;
};

export function IPhoneCanvas({
  screenshots,
  containerRef,
  scrollProgressRef,
}: IPhoneCanvasProps) {
  const pointer = useRef({ x: 0, y: 0 });
  const fillScaleRef = useRef(3.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      if ((scrollProgressRef.current ?? 0) < 0.92) return;
      const rect = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, scrollProgressRef]);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 32 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <Scene
          screenshots={screenshots}
          pointer={pointer}
          scrollProgressRef={scrollProgressRef}
          fillScaleRef={fillScaleRef}
        />
      </Suspense>
    </Canvas>
  );
}

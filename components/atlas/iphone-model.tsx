"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SCREEN_MESH_NAMES } from "@/lib/iphone-screenshots";
import { easeOutQuart } from "@/lib/atlas-scroll";

type IPhoneModelProps = {
  screenshots: string[];
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgressRef: React.RefObject<number>;
  fillScaleRef: React.MutableRefObject<number>;
};

function isScreenMesh(name: string) {
  const lower = name.toLowerCase();
  return SCREEN_MESH_NAMES.some(
    (token) => lower.includes(token.toLowerCase()) || name.includes(token)
  );
}

export function IPhoneModel({
  screenshots,
  pointer,
  scrollProgressRef,
  fillScaleRef,
}: IPhoneModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/assets/iphone/iphone15.glb");
  const { camera } = useThree();
  const [screenIndex, setScreenIndex] = useState(0);
  const screenMaterials = useRef<THREE.MeshStandardMaterial[]>([]);
  const frameMaterials = useRef<THREE.Material[]>([]);
  const textures = useRef<THREE.Texture[]>([]);
  const fadeRef = useRef(1);
  const screenMeshRef = useRef<THREE.Mesh | null>(null);

  const cloned = useMemo(() => {
    const clone = scene.clone(true);
    screenMaterials.current = [];
    frameMaterials.current = [];

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (isScreenMesh(child.name)) {
        screenMeshRef.current = child;
        const mat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 0.15,
          roughness: 0.4,
          metalness: 0,
        });
        child.material = mat;
        screenMaterials.current.push(mat);
      } else if (child.name.toLowerCase().includes("glass")) {
        const mat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          roughness: 0.05,
          metalness: 0,
          transmission: 0.05,
        });
        child.material = mat;
        frameMaterials.current.push(mat);
      } else if (
        child.material instanceof THREE.MeshStandardMaterial ||
        child.material instanceof THREE.MeshPhysicalMaterial
      ) {
        const mat = child.material.clone();
        mat.transparent = true;
        mat.opacity = 0;
        mat.metalness = Math.max(mat.metalness ?? 0, 0.85);
        mat.roughness = Math.min(mat.roughness ?? 1, 0.35);
        child.material = mat;
        frameMaterials.current.push(mat);
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center);
    const size = box.getSize(new THREE.Vector3());
    const scale = 2.2 / Math.max(size.x, size.y, size.z);
    clone.scale.setScalar(scale);

    return clone;
  }, [scene]);

  useEffect(() => {
    const computeFillScale = () => {
      if (!screenMeshRef.current) return;
      const screenBox = new THREE.Box3().setFromObject(screenMeshRef.current);
      const screenHeight = screenBox.getSize(new THREE.Vector3()).y;
      const perspCamera = camera as THREE.PerspectiveCamera;
      const vFov = (perspCamera.fov * Math.PI) / 180;
      const distance = perspCamera.position.z;
      const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
      fillScaleRef.current = (visibleHeight / screenHeight) * 1.04;
    };

    computeFillScale();
    window.addEventListener("resize", computeFillScale, { passive: true });
    return () => window.removeEventListener("resize", computeFillScale);
  }, [cloned, camera, fillScaleRef]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const metalMap = loader.load("/assets/iphone/textures/metal_golss.jpg");
    const metalNormal = loader.load("/assets/iphone/textures/metal_normal.png");
    metalMap.colorSpace = THREE.SRGBColorSpace;

    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (isScreenMesh(child.name)) return;
      if (child.name.toLowerCase().includes("glass")) return;

      const mat = child.material;
      if (
        mat instanceof THREE.MeshStandardMaterial ||
        mat instanceof THREE.MeshPhysicalMaterial
      ) {
        mat.map = metalMap;
        mat.normalMap = metalNormal;
        mat.normalScale = new THREE.Vector2(0.35, 0.35);
        mat.metalness = 0.95;
        mat.roughness = 0.22;
        mat.needsUpdate = true;
      }
    });

    return () => {
      metalMap.dispose();
      metalNormal.dispose();
    };
  }, [cloned]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    textures.current = screenshots.map((src) => {
      const tex = loader.load(src);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      return tex;
    });

    screenMaterials.current.forEach((mat) => {
      mat.map = textures.current[0] ?? null;
      mat.emissiveMap = textures.current[0] ?? null;
      mat.needsUpdate = true;
    });

    const interval = setInterval(() => {
      if ((scrollProgressRef.current ?? 0) < 0.92) return;
      setScreenIndex((prev) => (prev + 1) % screenshots.length);
      fadeRef.current = 0;
    }, 4500);

    return () => {
      clearInterval(interval);
      textures.current.forEach((t) => t.dispose());
    };
  }, [screenshots, scrollProgressRef]);

  useEffect(() => {
    const next = textures.current[screenIndex];
    if (!next) return;
    screenMaterials.current.forEach((mat) => {
      mat.map = next;
      mat.emissiveMap = next;
      mat.needsUpdate = true;
    });
  }, [screenIndex]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const raw = scrollProgressRef.current ?? 0;
    const p = easeOutQuart(Math.min(raw, 1));
    const fillScale = fillScaleRef.current || 3.5;
    const scale = fillScale - (fillScale - 1) * p;

    groupRef.current.scale.setScalar(scale);

    const settled = p >= 0.92;
    const tiltT = settled ? 1 : Math.max(0, (p - 0.65) / 0.27);

    const baseRotX = tiltT * 0.14;
    const baseRotY = tiltT * -0.31;

    if (settled) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        baseRotY + t * 0.12 + pointer.current.x * 0.25,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        baseRotX + -pointer.current.y * 0.12,
        0.06
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        Math.sin(t * 0.8) * 0.04,
        0.08
      );
    } else {
      groupRef.current.rotation.x = baseRotX;
      groupRef.current.rotation.y = baseRotY;
      groupRef.current.position.y = 0;
    }

    const frameOpacity = p < 0.12 ? 0 : Math.min(1, (p - 0.12) / 0.14);
    frameMaterials.current.forEach((mat) => {
      mat.opacity = frameOpacity;
      mat.transparent = frameOpacity < 1;
    });

    fadeRef.current = THREE.MathUtils.lerp(fadeRef.current, 1, delta * 3);
    screenMaterials.current.forEach((mat) => {
      mat.opacity = 1;
      mat.transparent = false;
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload("/assets/iphone/iphone15.glb");

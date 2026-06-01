/**
 * Placeholder GLB until the real model is exported from Blender:
 *   chmod +x scripts/export-iphone.sh && ./scripts/export-iphone.sh
 */
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// GLTFExporter expects browser APIs in Node
if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class FileReader {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        this.onloadend?.();
      });
    }
  };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "../public/assets/iphone/iphone15.glb");

const group = new THREE.Group();
group.name = "Iphn15pm_blackt";

const height = 1.63;
const width = 0.776;
const depth = 0.0825;

const body = new THREE.Mesh(
  new RoundedBoxGeometry(width, height, depth, 12, 0.07),
  new THREE.MeshStandardMaterial({
    color: 0x2d2640,
    metalness: 0.92,
    roughness: 0.28,
  })
);
body.name = "Iphn15pm_blackt_mid_part";
group.add(body);

const screen = new THREE.Mesh(
  new THREE.PlaneGeometry(width - 0.024, height - 0.048),
  new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    emissive: 0x0a0a0a,
    emissiveIntensity: 0.5,
  })
);
screen.name = "Iphn15pm_blackt_front&display_part";
screen.position.z = depth / 2 + 0.0008;
group.add(screen);

const glass = new THREE.Mesh(
  new THREE.PlaneGeometry(width - 0.018, height - 0.038),
  new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.05,
    transmission: 0.04,
    transparent: true,
    opacity: 0.12,
  })
);
glass.name = "Iphn15pm_blackt_front_glass";
glass.position.z = depth / 2 + 0.0012;
group.add(glass);

const exporter = new GLTFExporter();
exporter.parse(
  group,
  (result) => {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, Buffer.from(result));
    console.log(`Wrote ${outPath} (${fs.statSync(outPath).size} bytes)`);
  },
  (error) => {
    console.error(error);
    process.exit(1);
  },
  { binary: true }
);

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const source = join(root, "assets/images");
const target = join(root, "public/assets/images");
const versionsPath = join(root, "lib/home-image-versions.json");

if (!existsSync(source)) {
  console.error("Missing assets/images folder");
  process.exit(1);
}

mkdirSync(target, { recursive: true });

const files = readdirSync(source).filter((name) =>
  /\.(png|jpe?g|gif|webp|svg)$/i.test(name)
);

const versions = {};

for (const file of files) {
  const srcPath = join(source, file);
  cpSync(srcPath, join(target, file));
  versions[file] = Math.floor(statSync(srcPath).mtimeMs);
  console.log(`Synced ${file}`);
}

writeFileSync(versionsPath, `${JSON.stringify(versions, null, 2)}\n`);
console.log(`Wrote cache keys → lib/home-image-versions.json`);
console.log(`Done — ${files.length} file(s) copied to public/assets/images/`);

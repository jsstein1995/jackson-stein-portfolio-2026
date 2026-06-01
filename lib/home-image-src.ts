import imageVersions from "./home-image-versions.json";

/** Bust Next.js / browser cache when files in assets/images are replaced. */
export function homeImageSrc(path: string): string {
  const file = path.replace(/^\/assets\/images\//, "");
  const version = imageVersions[file as keyof typeof imageVersions];
  return version ? `${path}?v=${version}` : path;
}

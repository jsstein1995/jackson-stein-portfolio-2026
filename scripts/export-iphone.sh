#!/usr/bin/env bash
# Export the Blender iPhone model to GLB for the web hero.
# Requires Blender: https://www.blender.org/download/
#
# Usage: ./scripts/export-iphone.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BLEND="$ROOT/assets/iphone/Iphn15pm_blackt_blender.blend"
OUT="$ROOT/public/assets/iphone/iphone15.glb"

BLENDER=""
for candidate in \
  "/Applications/Blender.app/Contents/MacOS/Blender" \
  "/Applications/Blender 4.app/Contents/MacOS/Blender" \
  "blender"; do
  if command -v "$candidate" >/dev/null 2>&1 || [ -x "$candidate" ]; then
    BLENDER="$candidate"
    break
  fi
done

if [ -z "$BLENDER" ]; then
  echo "Blender not found. Install from https://www.blender.org/download/"
  exit 1
fi

"$BLENDER" -b "$BLEND" --python-expr "
import bpy
bpy.ops.export_scene.gltf(
    filepath='$OUT',
    export_format='GLB',
    export_apply=True,
    export_materials='EXPORT',
    export_image_format='AUTO',
)
print('Exported to $OUT')
"

echo "Done: $OUT"

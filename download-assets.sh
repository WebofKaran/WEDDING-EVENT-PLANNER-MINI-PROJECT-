#!/bin/sh
# Downloads every picture and icon used by index.html into ./assets
# Run it from the same folder as index.html:   sh download-assets.sh
# Note: these Figma links expire after about 7 days.

BASE="https://www.figma.com/api/mcp/asset/15212c4b-dc99-4908-af6e-20187a356db6"

mkdir -p assets

# Photos
for f in 11c8b f022b 5059a 32705 e211d ef115 ffd85 e4a79 89f36 a22c2 b8f9e; do
  curl -fsSL -o "assets/$f.png" "$BASE/$f.png" && echo "ok  $f.png" || echo "FAILED  $f.png"
done

# Icons
for f in b7664 0d981 5d78f a479b 96c2c 1bf09 a8205 7f5d5 75307 8181f 3e697 e41af 942e4 1db20 a8c6a e6e7f cb15e c464f; do
  curl -fsSL -o "assets/$f.svg" "$BASE/$f.svg" && echo "ok  $f.svg" || echo "FAILED  $f.svg"
done

echo "Done. Open index.html in your browser."

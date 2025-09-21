#!/bin/bash

# Check if folder argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <folder>"
  exit 1
fi

INPUT_DIR="$1"

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
  echo "Error: cwebp is not installed. Please install webp package."
  exit 1
fi

# Loop through png and jpg/jpeg images in the folder
for img in "$INPUT_DIR"/*.{png,jpg,jpeg,JPG,JPEG,PNG}; do
  # Skip if no files match
  [ -e "$img" ] || continue

  # Output filename (replace extension with .webp)
  output="${img%.*}.webp"

  echo "Converting $img -> $output"
  cwebp -q 90 "$img" -o "$output"
done

echo "✅ Conversion complete!"

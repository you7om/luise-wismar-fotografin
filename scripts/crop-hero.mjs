import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const files = [
  "Screenshot 2026-09-22 104249.png",
  "Screenshot 2026-09-22 104550.png",
  "Screenshot 2026-09-22 104622.png",
  "Screenshot 2026-09-22 104649.png",
  "Screenshot 2026-09-22 104701.png",
];

const outDir = "public/hero";
await mkdir(outDir, { recursive: true });

for (const [i, file] of files.entries()) {
  const input = `public/${file}`;
  const meta = await sharp(input).metadata();
  const marginX = Math.round(meta.width * 0.05);
  const marginBottom = Math.round(meta.height * 0.07);

  await sharp(input)
    .extract({
      left: marginX,
      top: 0,
      width: meta.width - marginX * 2,
      height: meta.height - marginBottom,
    })
    .toFile(`${outDir}/hero-${i + 1}.jpg`);

  console.log(`${file}: ${meta.width}x${meta.height} -> hero-${i + 1}.jpg`);
}

// Build 4 webp sprite atlases from the 240 individual frames.
//
// Layout: 6 cols × 10 rows per atlas = 60 frames per atlas.
//   atlas_0: frames 0..59
//   atlas_1: frames 60..119
//   atlas_2: frames 120..179
//   atlas_3: frames 180..239
//
// Cell size 640×360 — half of HD source (1280×720). Atlas final
// dimensions 3840×3600, well under the 4096 mobile texture cap
// and under the 16MP iOS Safari image limit.
//
// Source frames live in /tmp/ekeb-hq-frames/ (extracted from the
// HQ archive). Output goes directly into /public/scrub/.
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "C:/Users/windo/AppData/Local/Temp/ekeb-hq-frames";
const OUT_DIR = path.resolve("public/scrub");

const TOTAL = 240;
const ATLASES = 4;
const PER_ATLAS = TOTAL / ATLASES;  // 60
const COLS = 6;
const ROWS = 10;                     // 6 × 10 = 60
const CELL_W = 640;
const CELL_H = 360;
const ATLAS_W = CELL_W * COLS;       // 3840
const ATLAS_H = CELL_H * ROWS;       // 3600

async function buildAtlas(atlasIdx) {
  const startFrame = atlasIdx * PER_ATLAS;
  const composites = [];

  for (let i = 0; i < PER_ATLAS; i++) {
    const frameIdx = startFrame + i;
    const filename = `frame_${String(frameIdx).padStart(4, "0")}.webp`;
    const filePath = path.join(SRC_DIR, filename);

    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const left = col * CELL_W;
    const top = row * CELL_H;

    const buf = await sharp(filePath)
      .resize(CELL_W, CELL_H, { fit: "cover" })
      .toBuffer();

    composites.push({ input: buf, top, left });
  }

  const outName = `atlas_${atlasIdx}.webp`;
  const outPath = path.join(OUT_DIR, outName);

  await sharp({
    create: {
      width: ATLAS_W,
      height: ATLAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite(composites)
    .webp({ quality: 80, effort: 6 })
    .toFile(outPath);

  const stat = await fs.stat(outPath);
  console.log(
    `✓ ${outName}  ${ATLAS_W}×${ATLAS_H}  (${(stat.size / 1024 / 1024).toFixed(2)} MB)`
  );
}

console.log(`Building ${ATLASES} atlases from ${TOTAL} source frames…`);
console.log(`Layout: ${COLS}×${ROWS} cells per atlas, cell ${CELL_W}×${CELL_H}\n`);

// Clean old atlases first
const existing = await fs.readdir(OUT_DIR);
for (const f of existing) {
  if (f.startsWith("atlas_") && f.endsWith(".webp")) {
    await fs.unlink(path.join(OUT_DIR, f));
  }
}

for (let i = 0; i < ATLASES; i++) {
  await buildAtlas(i);
}

console.log("\nDone.");

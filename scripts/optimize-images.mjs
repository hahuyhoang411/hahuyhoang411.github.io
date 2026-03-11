import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';

const ASSETS_DIR = new URL('../public/assets/', import.meta.url).pathname;

const QUALITY = 80;

function getMaxWidth(filePath) {
  if (filePath.includes('/timeline/')) return 800;
  if (basename(filePath).startsWith('bg.')) return 1920;
  return 1200;
}

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const maxWidth = getMaxWidth(filePath);
  const outPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');

  const originalSize = (await stat(filePath)).size;

  const metadata = await sharp(filePath).metadata();
  let pipeline = sharp(filePath);

  if (metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: QUALITY }).toFile(outPath);

  const newSize = (await stat(outPath)).size;
  await unlink(filePath);

  return { filePath, outPath, originalSize, newSize };
}

async function main() {
  const images = await findImages(ASSETS_DIR);
  console.log(`Found ${images.length} images to optimize.\n`);

  let totalOriginal = 0;
  let totalNew = 0;

  for (const img of images) {
    const result = await optimizeImage(img);
    const saved = ((1 - result.newSize / result.originalSize) * 100).toFixed(1);
    const rel = result.filePath.replace(ASSETS_DIR, '');
    console.log(
      `${rel}: ${(result.originalSize / 1024).toFixed(0)}KB -> ${(result.newSize / 1024).toFixed(0)}KB (${saved}% saved)`
    );
    totalOriginal += result.originalSize;
    totalNew += result.newSize;
  }

  console.log('\n--- Summary ---');
  console.log(`Total before: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Total after:  ${(totalNew / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Saved:        ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(1)}MB (${((1 - totalNew / totalOriginal) * 100).toFixed(1)}%)`);
}

main().catch(console.error);

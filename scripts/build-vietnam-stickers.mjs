import { mkdir, readFile } from "node:fs/promises";
import sharp from "sharp";

const manifestPath = "src/components/desktop/stickers.json";
const outputDirectory = "public/assets/vietnam-stickers";
const sources = {
	board: "public/assets/vietnam-sketchboard.png",
	extra: "public/assets/vietnam-stickers-extra.png",
};

const stickers = JSON.parse(await readFile(manifestPath, "utf8"));
if (!Array.isArray(stickers) || stickers.length < 42) {
	throw new Error(`Expected at least the 42 derived sticker records in ${manifestPath}.`);
}

const smoothstep = (start, end, value) => {
	const progress = Math.max(0, Math.min(1, (value - start) / (end - start)));
	return progress * progress * (3 - 2 * progress);
};

await mkdir(outputDirectory, { recursive: true });
for (const [index, sticker] of stickers.entries()) {
	if (sticker.sprite === "direct") continue;
	const sourcePath = sources[sticker.sprite];
	if (!sourcePath || !Array.isArray(sticker.crop) || sticker.crop.length !== 4) {
		throw new Error(`Invalid sticker record at index ${index}.`);
	}
	const [left, top, width, height] = sticker.crop;
	const hasValidMask =
		Array.isArray(sticker.mask) &&
		sticker.mask.length >= 3 &&
		sticker.mask.every(
			(point) =>
				Array.isArray(point) &&
				point.length === 2 &&
				point.every(Number.isFinite) &&
				point[0] >= 0 &&
				point[0] <= width &&
				point[1] >= 0 &&
				point[1] <= height,
		);
	if (sticker.mask !== undefined && !hasValidMask) {
		throw new Error(`Invalid mask at index ${index}.`);
	}
	const { data, info } = await sharp(sourcePath)
		.extract({ left, top, width, height })
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	for (let pixel = 0; pixel < data.length; pixel += 4) {
		const red = data[pixel];
		const green = data[pixel + 1];
		const blue = data[pixel + 2];
		const chroma = Math.max(red, green, blue) - Math.min(red, green, blue);
		const lightness = (red + green + blue) / 3;
		const paperAlpha = chroma < 20 ? 1 - smoothstep(226, 242, lightness) : 1;
		data[pixel + 3] = Math.round(data[pixel + 3] * paperAlpha);
	}
	let output = sharp(data, { raw: info });
	if (sticker.mask) {
		const points = sticker.mask.map(([x, y]) => `${x},${y}`).join(" ");
		const mask = Buffer.from(
			`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><polygon points="${points}" fill="white"/></svg>`,
		);
		output = output.composite([{ input: mask, blend: "dest-in" }]);
	}
	await output.png({ compressionLevel: 9 }).toFile(
		`${outputDirectory}/${String(index).padStart(2, "0")}.png`,
	);
}

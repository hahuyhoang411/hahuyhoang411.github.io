// Renders "Drafting Table" hero images (see thumbnail.md) and travel card
// placeholders as WebP. Run: node scripts/generate-heroes.mjs
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const PAPER = "#f7f6f2";
const INK = "#1c1c1c";
const TINTS = { blue: "#a8cdf0", green: "#a8e6a1", pink: "#f4c6d2" };

const sheet = (w, h, inner) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="${w}" height="${h}" fill="${PAPER}"/>
<rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="${INK}" stroke-opacity="0.4" stroke-width="1"/>
${inner}
</svg>`;

const guide = (parts) =>
	`<g stroke="${INK}" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="6 4" fill="none">${parts}</g>`;
const solid = (parts) =>
	`<g stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round">${parts}</g>`;
const dot = (x, y, r = 10) =>
	`<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
const tinted = (d, color) =>
	`<path d="${d}" fill="${color}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
const line = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
const circle = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`;

const W = 1600, H = 900, CX = 800;
const landmarks = {
	"one-pillar": (t) => [
		guide([line(CX, 60, CX, 840), line(120, 620, 1480, 620),
			circle(CX, 620, 300), circle(CX, 620, 210), circle(CX, 370, 110), circle(CX, 280, 60),
			...[0, 60, 120, 180, 240, 300].map(a => line(CX, 620, CX + 300 * Math.cos(a * Math.PI / 180), 620 + 300 * Math.sin(a * Math.PI / 180)))]),
		solid([line(CX, 620, CX, 500),
			`<path d="M 700 620 Q 800 580 900 620"/>`,
			`<path d="M 715 500 Q 800 445 885 500 L 885 522 Q 800 480 715 522 Z"/>`,
			`<path d="M 660 500 Q 800 395 940 500"/>`,
			`<path d="M 695 400 Q 800 320 905 400 L 905 425 Q 800 360 695 425 Z"/>`,
			tinted("M 742 280 L 858 280 L 838 375 L 762 375 Z", TINTS[t]),
			`<path d="M 640 690 l 20 0 m 15 0 l 20 0" stroke-dasharray="6 4"/>`,
			`<path d="M 1140 720 l 20 0 m 15 0 l 20 0" stroke-dasharray="6 4"/>`]),
		dot(CX, 268),
	],
	"hanoi-tower": (t) => [
		guide([line(CX, 70, CX, 840), line(100, 700, 1500, 700), circle(CX, 700, 340), circle(CX, 700, 240),
			line(CX - 340, 700, CX + 340, 700), line(300, 200, 300, 700), line(1300, 260, 1300, 700)]),
		solid([`<rect x="620" y="430" width="360" height="270"/>`,
			`<rect x="660" y="470" width="90" height="70"/>`,
			`<rect x="850" y="470" width="90" height="70"/>`,
			tinted("M 560 430 L 1040 430 L 1000 360 L 600 360 Z", TINTS[t]),
			`<line x1="700" y1="500" x2="760" y2="560"/><line x1="760" y1="500" x2="700" y2="560"/>`,
			line(620, 700, 620, 640), line(980, 700, 980, 640),
			`<rect x="1180" y="380" width="240" height="320" stroke-dasharray="6 4"/>`]),
		dot(CX, 395),
	],
	"temple-of-literature": (t) => [
		guide([line(CX, 60, CX, 840), line(120, 720, 1480, 720), circle(CX, 720, 360), circle(CX, 720, 260),
			line(280, 180, 280, 720), line(1320, 240, 1320, 720)]),
		solid([`<rect x="560" y="560" width="480" height="160"/>`,
			tinted("M 520 560 L 1080 560 L 1000 470 L 600 470 Z", TINTS[t]),
			tinted("M 620 470 L 980 470 L 910 395 L 690 395 Z", TINTS[t]),
			`<path d="M 690 395 Q 800 330 910 395"/>`,
			line(600, 720, 600, 660), line(1000, 720, 1000, 660),
			`<rect x="380" y="620" width="120" height="100" stroke-dasharray="6 4"/>`,
			`<rect x="1100" y="620" width="120" height="100" stroke-dasharray="6 4"/>`]),
		dot(CX, 385),
	],
	"opera-house": (t) => [
		guide([line(CX, 60, CX, 840), line(120, 700, 1480, 700), circle(CX, 470, 180), circle(CX, 470, 120),
			line(320, 220, 320, 700), line(1280, 220, 1280, 700)]),
		solid([`<rect x="430" y="560" width="740" height="140"/>`,
			tinted(`M ${CX - 150} 560 A 150 150 0 0 1 ${CX + 150} 560 Z`, TINTS[t]),
			circle(CX, 470, 150),
			`<path d="M 430 560 L 340 620 L 340 700" /><path d="M 1170 560 L 1260 620 L 1260 700"/>`,
			...[0, 1, 2, 3, 4].map(i => line(520 + i * 120, 700, 520 + i * 120, 660))]),
		dot(CX, 470, 8),
	],
	hue: (t) => [
		guide([line(CX, 60, CX, 840), line(100, 760, 1500, 760),
			`<rect x="360" y="240" width="880" height="520"/>`,
			`<rect x="480" y="330" width="640" height="430"/>`, circle(CX, 560, 200)]),
		solid([`<rect x="640" y="480" width="320" height="280"/>`,
			tinted("M 600 480 L 1000 480 L 960 410 L 640 410 Z", TINTS[t]),
			`<path d="M 740 760 L 740 660 Q 800 620 860 660 L 860 760"/>`,
			line(360, 760, 360, 700), line(1240, 760, 1240, 700)]),
		dot(CX, 445),
	],
	"ha-long": (t) => [
		guide([line(CX, 60, CX, 840), line(140, 640, 1460, 640), line(140, 720, 1460, 720), line(140, 790, 1460, 790),
			circle(CX, 640, 320), circle(430, 640, 180), circle(1180, 640, 200)]),
		solid([tinted("M 330 640 L 330 440 L 410 360 L 490 440 L 490 640 Z", TINTS[t]),
			`<path d="M 740 640 L 740 400 L 810 330 L 880 400 L 880 640"/>`,
			tinted("M 1090 640 L 1090 480 L 1160 420 L 1230 480 L 1230 640 Z", TINTS[t]),
			`<path d="M 620 740 L 700 740 L 690 770 L 630 770 Z"/>`,
			line(660, 740, 660, 700), line(640, 705, 680, 705)]),
		dot(810, 330, 8),
	],
	"trang-an": (t) => [
		guide([line(CX, 60, CX, 840), line(140, 700, 1460, 700), line(140, 770, 1460, 770),
			circle(CX, 700, 300), circle(520, 700, 190), circle(1120, 700, 220)]),
		solid([tinted(`M 400 700 A 190 190 0 0 1 780 700 Z`, TINTS[t]),
			`<path d="M 940 700 A 220 220 0 0 1 1300 640"/>`,
			`<path d="M 700 770 Q 800 720 900 770"/>`,
			`<path d="M 770 745 L 830 745 L 822 772 L 778 772 Z"/>`,
			line(800, 745, 800, 715), line(782, 720, 818, 720)]),
		dot(590, 620, 8),
	],
	"ben-thanh": (t) => [
		guide([line(CX, 60, CX, 840), line(120, 780, 1480, 780), circle(CX, 420, 240), circle(CX, 420, 170),
			...[0, 45, 90, 135, 180, 225, 270, 315].map(a => line(CX, 420, CX + 240 * Math.cos(a * Math.PI / 180), 420 + 240 * Math.sin(a * Math.PI / 180)))]),
		solid([`<path d="M ${CX - 190} 780 L ${CX - 160} 560 L ${CX + 160} 560 L ${CX + 190} 780 Z"/>`,
			tinted(`M ${CX - 150} 560 A 150 150 0 0 1 ${CX + 150} 560 Z`, TINTS[t]),
			line(CX - 150, 560, CX + 150, 560),
			...[0, 1, 2].map(i => line(CX - 90 + i * 90, 780, CX - 90 + i * 90, 680)),
			line(CX - 40, 700, CX + 40, 700)]),
		dot(CX, 420, 8),
	],
};

// Khuê Văn Các — two drum levels on four legs.
landmarks["khue-van-cac"] = (t) => [
	guide([line(CX, 60, CX, 840), line(140, 780, 1460, 780), circle(CX, 480, 210), circle(CX, 330, 140),
		line(560, 300, 560, 780), line(1040, 300, 1040, 780), line(680, 220, 680, 780), line(920, 220, 920, 780)]),
	solid([line(640, 560, 960, 560), line(620, 780, 620, 560), line(980, 780, 980, 560),
		tinted(`M ${CX - 140} 560 A 140 140 0 0 1 ${CX + 140} 560 Z`, TINTS[t]),
		line(CX - 140, 560, CX + 140, 560),
		tinted(`M ${CX - 90} 400 A 90 90 0 0 1 ${CX + 90} 400 Z`, TINTS[t]),
		`<path d="M 660 400 Q 800 330 940 400"/>`,
		line(640, 560, 640, 620), line(960, 560, 960, 620)]),
	dot(CX, 322, 8),
];

const postHeroes = {
	"meddiesai-in-progress": ["hanoi-tower", "blue"],
	"phd-thesis-fact-correction": ["temple-of-literature", "blue"],
	"pensez-french-reasoning": ["opera-house", "pink"],
	"medmeta-evidence-synthesis": ["hue", "blue"],
	"vista-vietnamese-vlm": ["ha-long", "blue"],
	"toolmaestro-knowing-when-to-call": ["trang-an", "green"],
	"selfies-teaching-a-model-to-read-molecules": ["ben-thanh", "pink"],
	"meddies-research-seven-artifacts": ["khue-van-cac", "green"],
	"meddies-pii-v2": ["khue-van-cac", "blue"],
	"meddies-embedding-data": ["khue-van-cac", "pink"],
	"meddies-qa": ["khue-van-cac", "green"],
	"meddies-consultant": ["khue-van-cac", "blue"],
	"meddies-persona": ["khue-van-cac", "pink"],
	"meddies-asr-synthetic-dialog": ["khue-van-cac", "green"],
	"meddies-patient-safety": ["khue-van-cac", "blue"],
};

await mkdir("public/assets/heroes", { recursive: true });

for (const [slug, [landmark, tint]] of Object.entries(postHeroes)) {
	const draw = landmarks[landmark];
	if (!draw) throw new Error(`Unknown landmark ${landmark}`);
	const svg = sheet(W, H, `${draw(tint)[0]}${draw(tint)[1]}${draw(tint)[2]}`);
	const out = `public/assets/heroes/${slug}.webp`;
	await writeFile(`/tmp/${slug}.svg`, svg);
	await sharp(`/tmp/${slug}.svg`).webp({ quality: 88 }).toFile(out);
	console.log("hero:", out);
}

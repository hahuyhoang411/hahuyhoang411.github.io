// Downloads representative Wikimedia Commons photos for the travel panel.
// Writes public/assets/travel/<slug>.webp (800px thumbs, sharp q80) and a credits JSON.
// Run: node scripts/fetch-travel-photos.mjs
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const UA = {
	"User-Agent": "hahuyhoang411-portfolio-travel/1.0 (contact: hoangha@meddies.ai)",
};

const TERMS = {
	Vietnam: "Ha Long Bay",
	Thailand: "Wat Arun Bangkok",
	Singapore: "Marina Bay Sands",
	Myanmar: "Bagan temples",
	Malaysia: "Petronas Towers",
	China: "Great Wall Badaling",
	Taiwan: "Taipei 101",
	"South Korea": "Gyeongbokgung palace",
	Switzerland: "Matterhorn",
	Czechia: "Charles Bridge Prague",
	Germany: "Brandenburg Gate",
	Belgium: "Grand Place Brussels",
	Spain: "Sagrada Familia",
	Italy: "Colosseum Rome",
	"Vatican City": "St. Peter's Basilica",
	Qatar: "Doha skyline",
	Netherlands: "Amsterdam canal houses",
	Greece: "Acropolis Athens",
};

await mkdir("public/assets/travel", { recursive: true });
const credits = [];

for (const [country, term] of Object.entries(TERMS)) {
	const api = new URL("https://commons.wikimedia.org/w/api.php");
	api.searchParams.set("action", "query");
	api.searchParams.set("format", "json");
	api.searchParams.set("generator", "search");
	api.searchParams.set("gsrsearch", `filetype:bitmap ${term}`);
	api.searchParams.set("gsrnamespace", "6");
	api.searchParams.set("gsrlimit", "8");
	api.searchParams.set("prop", "imageinfo");
	api.searchParams.set("iiprop", "url|mime|size|extmetadata");
	api.searchParams.set("iiurlwidth", "800");

	const res = await fetch(api, { headers: UA });
	if (!res.ok) throw new Error(`${country}: Commons API ${res.status}`);
	const json = await res.json();
	const pages = Object.values(json.query?.pages ?? {});
	const pick = pages
		.map((page) => page.imageinfo?.[0] && { ...page.imageinfo[0], title: page.title })
		.find((info) => info && ["image/jpeg", "image/png"].includes(info.mime) && info.thumburl);
	if (!pick) {
		console.error(`SKIP ${country}: no suitable Commons result for "${term}"`);
		continue;
	}
	const image = await fetch(pick.thumburl, { headers: UA });
	if (!image.ok) {
		console.error(`SKIP ${country}: download ${image.status}`);
		continue;
	}
	const slug = country.toLowerCase().replace(/ /g, "-");
	await sharp(Buffer.from(await image.arrayBuffer()))
		.resize({ width: 800, withoutEnlargement: true })
		.webp({ quality: 80 })
		.toFile(`public/assets/travel/${slug}.webp`);
	credits.push({
		file: `${slug}.webp`,
		subject: country,
		title: pick.title,
		page: pick.descriptionurl,
		license:
			pick.extmetadata?.LicenseShortName?.value?.replace(/<[^>]+>/g, "").trim() ||
			"see file page",
		artist:
			pick.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, "").trim() ||
			"see file page",
	});
	console.log(`saved ${slug}.webp  <-  ${pick.title}`);
}

await writeFile(
	"scripts/travel-credits.json",
	JSON.stringify(credits, null, "\t"),
);
console.log(`done: ${credits.length}/${Object.keys(TERMS).length} photos`);

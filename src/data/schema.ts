import { canonicalPath, SITE_URL } from "@/data/site";

export const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Huy Hoang Ha",
	url: `${SITE_URL}/`,
	jobTitle: "AI Researcher",
	sameAs: [
		"https://github.com/hahuyhoang411",
		"https://www.linkedin.com/in/hoanghavn/",
		"https://x.com/HaHoang411",
		"https://scholar.google.com/citations?user=3voc4NEAAAAJ&hl=en&authuser=1",
	],
};

export const blogPostingSchema = (post: {
	title: string;
	date: string;
	excerpt: string;
	heroImage?: string;
	slug: string;
}) => ({
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	headline: post.title,
	datePublished: post.date,
	description: post.excerpt,
	image: `${SITE_URL}${post.heroImage ?? "/thumbnail.png"}`,
	url: `${SITE_URL}${canonicalPath(`/blog/${post.slug}`)}`,
	author: {
		"@type": "Person",
		name: "Huy Hoang Ha",
		url: `${SITE_URL}/`,
	},
});

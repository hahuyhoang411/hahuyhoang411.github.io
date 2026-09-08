import {
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router";
import {
	BookOpen,
	Folder,
	Mail,
	MapPinned,
	Microscope,
	UserRound,
} from "lucide-react";
const BlogPostContent = lazy(() => import("@/components/blog/BlogPostContent"));
import SEO from "@/components/SEO";
import JsonLd from "@/components/JsonLd";
import { blogPostingSchema, personSchema } from "@/data/schema";
import { getBlogPost, getBlogPosts, type BlogPost } from "@/utils/blogUtils";
import { cleanContent } from "@/utils/markdownUtils";
import StickerWall from "./StickerWall";
import CareerExplorer from "./CareerExplorer";
import WindowFrame from "./WindowFrame";
import WindowNavigation from "./WindowNavigation";
import {
	appForRoute,
	activeWindow,
	clampRect,
	dismissAndReveal,
	focusWindow,
	openWindow,
	updateWindow,
	type AppId,
	type Bounds,
	type DesktopWindow,
	type Rect,
} from "./model";
import "./desktop.css";

const desktopBounds = (): Bounds => ({
	width: window.innerWidth,
	height: window.innerHeight - 78,
});

const apps = [
	{ id: "projects", label: "Projects", route: "/projects", Icon: Folder },
	{ id: "research", label: "Research", route: "/research", Icon: Microscope },
	{ id: "writing", label: "Writing", route: "/blog", Icon: BookOpen },
	{ id: "travel", label: "Travel", route: "/travel", Icon: MapPinned },
	{ id: "about", label: "About", route: "/about", Icon: UserRound },
] as const;

function AboutPanel({
	open,
	onOpenCareer,
}: {
	open: (route: string) => void;
	onOpenCareer: () => void;
}) {
	return (
		<div className="about-panel">
			<div>
				<p className="eyebrow">WELCOME / 2026</p>
				<h1>
					A personal computer for <i>curious work.</i>
				</h1>
				<p className="lede">
					I am Hoang Ha, a pharmacist and LLM researcher building trustworthy
					clinical intelligence for Vietnamese hospitals.
				</p>
				<div className="panel-actions">
					<button
						type="button"
						className="primary-action"
						onClick={() => open("/projects")}
					>
						View selected work <span>↗</span>
					</button>
					<button type="button" onClick={onOpenCareer}>Career and education</button>
				</div>
				<p className="about-quote">
					Talent is a gift. Relentlessness is a choice.
				</p>
			</div>
			<aside>
				<p>NOW EXPLORING</p>
				<b>Trustworthy clinical intelligence</b>
				<hr />
				<p>BASE</p>
				<b>Ho Chi Minh</b>
				<hr />
			</aside>
			<footer>
				Personal index <span>Available for thoughtful collaborations</span>
			</footer>
		</div>
	);
}
type IndexItem = {
	number: string;
	title: string;
	summary: string;
	detail: string;
	tag?: string;
	image?: string;
	source?: { href: string; label: string };
};

const projects: IndexItem[] = [
	{
		number: "01",
		title: "MeddiesAI",
		summary: "Clinical intelligence for the hospital",
		detail:
			"A clinical intelligence system for Vietnamese hospitals. The work brings clinical decision support, medication safety, documentation, and coordination into the seams where care teams work.",
		tag: "In progress",
	},
	{
		number: "02",
		title: "Meddies Research",
		summary: "Vietnamese clinical AI infrastructure",
		detail:
			"Research infrastructure for Vietnamese clinical AI across clinical data, personal-data protection, OCR, speech recognition, embedding, and simulation.",
		tag: "Research",
	},
	{
		number: "03",
		title: "PhD thesis",
		summary: "Correcting scientific facts in language models",
		detail:
			"Research direction: explainable methods for correcting scientific facts in large language models.",
		tag: "Study",
	},
	{
		number: "04",
		title: "SmolDLM",
		summary: "A diffusion language model trained from scratch",
		detail:
			"A 144M-parameter diffusion language model built over two weekends in early 2026. The project documents the practical training and debugging work.",
		tag: "Writing",
		source: { href: "/blog/open-dllm", label: "Read the build note" },
	},
	{
		number: "05",
		title: "Pensez",
		summary: "French-English reasoning LLM",
		detail:
			"A French-English reasoning language model developed from January to May 2025 and presented at TALN 2025.",
		tag: "Research",
	},
];
const research: IndexItem[] = [
	{
		number: "01",
		title: "Meddies PII v2",
		summary: "Multilingual identifier span extraction",
		detail:
			"Identifier span extraction across 17 languages and nine label families. Human review remains required.",
		source: { href: "https://huggingface.co/Meddies/meddies-pii-v2", label: "View source" },
	},
	{
		number: "02",
		title: "Meddies Embedding Data",
		summary: "Multilingual retrieval pairs",
		detail: "Query and passage pairs for multilingual retrieval research.",
		source: { href: "https://huggingface.co/datasets/Meddies/meddies-embedding-data", label: "View source" },
	},
	{
		number: "03",
		title: "Meddies ASR Synthetic Dialog",
		summary: "Clinical speech and aligned text",
		detail: "Synthetic clinical speech and aligned text for speech-recognition research.",
		source: { href: "https://huggingface.co/datasets/Meddies/meddies-asr-synth-dialog", label: "View source" },
	},
	{
		number: "04",
		title: "Meddies Consultant",
		summary: "Synthetic clinical conversations",
		detail: "Synthetic clinical conversations for research and evaluation.",
		source: { href: "https://huggingface.co/datasets/Meddies/meddies-consultant", label: "View source" },
	},
	{
		number: "05",
		title: "Meddies Persona",
		summary: "Vietnamese patient personas",
		detail: "Synthetic Vietnamese patient personas for research use.",
		source: { href: "https://huggingface.co/datasets/Meddies/meddies-persona-vie", label: "View source" },
	},
	{
		number: "06",
		title: "Meddies Patient Safety",
		summary: "Clinical red-team prompts",
		detail: "Clinical red-team prompts for model safety evaluation.",
		source: { href: "https://huggingface.co/datasets/Meddies/meddies-patient-safety", label: "View source" },
	},
	{
		number: "07",
		title: "Meddies QA",
		summary: "Public question-answer data",
		detail: "A public question-answer dataset.",
		source: { href: "https://huggingface.co/datasets/Meddies/meddies-qa", label: "View source" },
	},
];

function IndexPanel({
	title,
	items,
	open,
}: {
	title: string;
	items: IndexItem[];
	open: (route: string) => void;
}) {
	const [history, setHistory] = useState<IndexItem[]>([]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const selected = historyIndex >= 0 ? history[historyIndex] : null;
	const source = selected?.source;
	const sourceIsExternal = source?.href.startsWith("https://") ?? false;
	const select = (item: IndexItem) => {
		setHistory((current) => [...current.slice(0, historyIndex + 1), item]);
		setHistoryIndex((current) => current + 1);
	};
	const goBack = () => setHistoryIndex((current) => Math.max(-1, current - 1));
	const goForward = () =>
		setHistoryIndex((current) => Math.min(history.length - 1, current + 1));
	return (
		<div className="index-panel">
			<WindowNavigation
				canGoBack={historyIndex >= 0}
				canGoForward={historyIndex + 1 < history.length}
				onBack={goBack}
				onForward={goForward}
			/>
			{selected ? (
				<div className="detail-panel">
					<p className="entry-number">{selected.number}</p>
					<h1>{selected.title}</h1>
					<p>{selected.detail}</p>
					{source && (
						<a
							className="source-link"
							href={source.href}
							target={sourceIsExternal ? "_blank" : undefined}
							rel={sourceIsExternal ? "noopener noreferrer" : undefined}
							onClick={(event) => {
								if (
									sourceIsExternal ||
									event.button !== 0 ||
									event.metaKey ||
									event.ctrlKey ||
									event.shiftKey ||
									event.altKey
								)
									return;
								event.preventDefault();
								open(source.href);
							}}
						>
							{source.label} ↗
						</a>
					)}
				</div>
			) : (
				<div className="list-panel">
					<h1>{title}</h1>
					{items.map((item) => (
						<button
							type="button"
							className="index-entry"
							key={item.number}
							onClick={() => select(item)}
						>
							<span>{item.number}</span>
							<div>
								<b>{item.title}</b>
								<p>{item.summary}</p>
							</div>
							{item.tag && <em>{item.tag}</em>}
							<strong aria-hidden="true">→</strong>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
function ProjectsPanel({ open }: { open: (route: string) => void }) {
	return <IndexPanel title="Projects with clinical stakes." items={projects} open={open} />;
}
function ResearchPanel({ open }: { open: (route: string) => void }) {
	return (
		<IndexPanel title="Useful intelligence needs evidence." items={research} open={open} />
	);
}
type Destination = {
	country: string;
	flag: string;
	region: "Asia" | "Europe";
	photoPath?: string;
};

const destinations: Destination[] = [
	{ country: "Vietnam", flag: "🇻🇳", region: "Asia" },
	{ country: "Thailand", flag: "🇹🇭", region: "Asia" },
	{ country: "Singapore", flag: "🇸🇬", region: "Asia" },
	{ country: "Myanmar", flag: "🇲🇲", region: "Asia" },
	{ country: "Malaysia", flag: "🇲🇾", region: "Asia" },
	{ country: "China", flag: "🇨🇳", region: "Asia" },
	{ country: "Taiwan", flag: "🇹🇼", region: "Asia" },
	{ country: "South Korea", flag: "🇰🇷", region: "Asia" },
	{ country: "France", flag: "🇫🇷", region: "Europe" },
	{ country: "Switzerland", flag: "🇨🇭", region: "Europe" },
	{ country: "Czechia", flag: "🇨🇿", region: "Europe" },
	{ country: "Germany", flag: "🇩🇪", region: "Europe" },
	{ country: "Belgium", flag: "🇧🇪", region: "Europe" },
	{ country: "Spain", flag: "🇪🇸", region: "Europe" },
	{ country: "Italy", flag: "🇮🇹", region: "Europe" },
	{ country: "Vatican City", flag: "🇻🇦", region: "Europe" },
	{ country: "Qatar", flag: "🇶🇦", region: "Asia" },
	{ country: "Netherlands", flag: "🇳🇱", region: "Europe" },
	{ country: "Greece", flag: "🇬🇷", region: "Europe" },
];

function TravelPanel() {
	const [filter, setFilter] = useState<"All" | Destination["region"]>("All");
	const visible = destinations.filter(
		(destination) => filter === "All" || destination.region === filter,
	);
	return (
		<section className="travel-panel" aria-labelledby="travel-title">
			<div className="travel-heading">
				<div>
					<p className="eyebrow">PERSONAL INDEX</p>
					<h1 id="travel-title">Places I&apos;ve been</h1>
				</div>
				<div className="travel-filter" aria-label="Filter destinations">
					{(["All", "Asia", "Europe"] as const).map((item) => (
						<button
							type="button"
							key={item}
							aria-pressed={filter === item}
							onClick={() => setFilter(item)}
						>
							{item}
						</button>
					))}
				</div>
			</div>
			<p className="travel-note">Photos to come.</p>
			<div className="destination-grid">
				{visible.map((destination) => (
					<article className="destination-card" key={destination.country}>
						<div className="destination-photo" aria-label={`${destination.country} photo frame`}>
							{destination.photoPath ? (
								<img src={destination.photoPath} alt={`${destination.country} travel`} />
							) : (
								<span aria-hidden="true" />
							)}
						</div>
						<p>
							<span aria-hidden="true">{destination.flag}</span> {destination.country}
						</p>
					</article>
				))}
			</div>
		</section>
	);
}
function ContactPanel() {
	return (
		<div className="contact-panel">
			<h1>Start with a thoughtful note.</h1>
			<p>For research, healthcare AI, and collaboration.</p>
			<a className="primary-action" href="mailto:hahuyhoanghhh41@gmail.com">
				Email Hoang Ha <span>↗</span>
			</a>
			<nav className="contact-links" aria-label="Related profiles">
				<a href="https://github.com/hahuyhoang411" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
				<a href="https://www.linkedin.com/in/hoanghavn/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
				<a href="https://x.com/HaHoang411" target="_blank" rel="noopener noreferrer">X ↗</a>
				<a href="https://scholar.google.com/citations?user=3voc4NEAAAAJ&hl=en&authuser=1" target="_blank" rel="noopener noreferrer">Google Scholar ↗</a>
				<a href="https://www.threads.com/@hahuyhoanghhh" target="_blank" rel="noopener noreferrer">Threads ↗</a>
			</nav>
		</div>
	);
}
function WritingPanel({ open }: { open: (route: string) => void }) {
	const [posts, setPosts] = useState<BlogPost[] | null>(null);
	const [query, setQuery] = useState("");
	useEffect(() => {
		getBlogPosts().then(setPosts);
	}, []);
	const results = useMemo(
		() =>
			posts?.filter((post) =>
				`${post.title} ${post.excerpt} ${post.tags.join(" ")}`
					.toLowerCase()
					.includes(query.toLowerCase()),
			) ?? [],
		[posts, query],
	);
	return (
		<div className="writing-panel">
			<div className="writing-head">
				<h1>Notes from the work.</h1>
				<label>
					Search writing
					<input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Topics, tags, titles"
					/>
				</label>
			</div>
			{posts === null ? (
				<p>Loading articles…</p>
			) : results.length === 0 ? (
				<div className="empty-state">
					<p>No articles match “{query}”.</p>
					<button type="button" onClick={() => setQuery("")}>
						Clear search
					</button>
				</div>
			) : (
				<div className="post-list">
					{results.map((post) => (
						<button
							type="button"
							key={post.id}
							onClick={() => open(`/blog/${post.id}`)}
						>
							<span className="post-cover">
								<img src={post.heroImage} alt={`${post.title} cover`} />
							</span>
							<span className="post-copy">
								<small>
									{post.date}, {post.readTime}
								</small>
								<b>{post.title}</b>
								<span>{post.excerpt}</span>
							</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
function ArticlePanel({
	route,
	open,
	active,
}: {
	route: string;
	open: (route: string) => void;
	active: boolean;
}) {
	const slug = route.split("/").at(-1) ?? "";
	const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
	useEffect(() => {
		getBlogPost(slug)
			.then(setPost)
			.catch(() => setPost(null));
	}, [slug]);
	if (post === undefined)
		return <p className="loading-state">Loading article…</p>;
	if (!post)
		return (
			<div className="empty-state">
				<h1>Article not found</h1>
				<button type="button" onClick={() => open("/blog")}>
					Back to writing
				</button>
			</div>
		);
	return (
		<article className="reading-panel">
			{active && (
				<>
					<SEO
						title={post.title}
						description={post.excerpt}
						image={post.heroImage}
						path={route}
						type="article"
						publishedDate={post.date}
					/>
					<JsonLd
						data={blogPostingSchema({
							title: post.title,
							date: post.date,
							excerpt: post.excerpt,
							heroImage: post.heroImage,
							slug,
						})}
					/>
				</>
			)}
			<WindowNavigation
				backLabel="Back to writing"
				canGoBack
				onBack={() => open("/blog")}
			/>
			<p className="eyebrow">
				{post.date}, {post.readTime}
			</p>
			<h1>{post.title}</h1>
			<p className="article-excerpt">{post.excerpt}</p>
			<figure className="article-cover">
				<img src={post.heroImage} alt={`${post.title} cover`} />
			</figure>
			<Suspense fallback={<p className="loading-state">Loading article…</p>}>
				<BlogPostContent content={cleanContent(post.content)} />
			</Suspense>
		</article>
	);
}
function MissingPanel({ open }: { open: (route: string) => void }) {
	return (
		<div className="empty-state">
			<h1>That page moved or never existed.</h1>
			<button type="button" onClick={() => open("/")}>
				Return home
			</button>
		</div>
	);
}

export default function DesktopShell() {
	const location = useLocation();
	const navigate = useNavigate();
	const [windows, setWindows] = useState<DesktopWindow[]>(() =>
		openWindow([], location.pathname, desktopBounds()),
	);
	const [mobile, setMobile] = useState(() => window.innerWidth < 700);
	const [appsOpen, setAppsOpen] = useState(false);
	const [aboutView, setAboutView] = useState<"about" | "career">("about");
	const appsMenu = useRef<HTMLDetailsElement>(null);
	const appsSummary = useRef<HTMLElement>(null);
	const routeRef = useRef(location.pathname);
	const pendingFocus = useRef<AppId | "apps" | null>(null);
	const routeApp = appForRoute(location.pathname);
	const active = activeWindow(windows)?.id ?? null;
	const closeApps = useCallback(() => {
		if (appsMenu.current) appsMenu.current.open = false;
		setAppsOpen(false);
		appsSummary.current?.focus();
	}, []);
	useEffect(() => {
		const update = () => {
			setMobile(window.innerWidth < 700);
			setWindows((current) =>
				current.map((item) => ({
					...item,
					rect: clampRect(item.rect, {
						width: window.innerWidth,
						height: window.innerHeight - 78,
					}),
				})),
			);
		};
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);
	useEffect(() => {
		const restoreHistoryWindow = () => {
			const route = window.location.pathname;
			routeRef.current = route;
			setWindows((current) => openWindow(current, route, desktopBounds()));
		};
		window.addEventListener("popstate", restoreHistoryWindow);
		return () => window.removeEventListener("popstate", restoreHistoryWindow);
	}, []);
	useLayoutEffect(() => {
		const target = pendingFocus.current;
		if (!target) return;
		pendingFocus.current = null;
		if (target === "apps") {
			appsSummary.current?.focus();
			return;
		}
		document
			.querySelector<HTMLElement>(
				`[data-window-id="${target}"] .window-titlebar`,
			)
			?.focus();
	}, [windows]);
	useEffect(() => {
		if (!appsOpen) return;
		const dismiss = (event: PointerEvent) => {
			if (appsMenu.current?.contains(event.target as Node)) return;
			closeApps();
		};
		window.addEventListener("pointerdown", dismiss);
		return () => {
			window.removeEventListener("pointerdown", dismiss);
		};
	}, [appsOpen, closeApps]);
	const navigateTo = (route: string) => {
		if (routeRef.current === route) return;
		routeRef.current = route;
		navigate(route);
	};
	const open = (route: string) => {
		pendingFocus.current = appForRoute(route);
		setWindows((current) => openWindow(current, route, desktopBounds()));
		setAppsOpen(false);
		navigateTo(route);
	};
	const focus = (id: AppId) => {
		const windowToFocus = windows.find((window) => window.id === id);
		if (!windowToFocus) return;
		setWindows((current) => focusWindow(current, id));
		navigateTo(windowToFocus.route);
	};
	const updateRect = (id: AppId, rect: Rect) =>
		setWindows((current) =>
			updateWindow(current, id, { rect: clampRect(rect, desktopBounds()) }),
		);
	const minimize = (id: AppId) => {
		const result = dismissAndReveal(windows, id, true);
		setWindows(result.windows);
		pendingFocus.current = result.active?.id ?? "apps";
		if (result.active) {
			navigateTo(result.active.route);
		}
	};
	const maximize = (window: DesktopWindow) =>
		setWindows((current) =>
			updateWindow(
				current,
				window.id,
				window.maximized
					? {
							maximized: false,
							rect: clampRect(
								window.previousRect ?? window.rect,
								desktopBounds(),
							),
						}
					: { maximized: true, previousRect: window.rect },
			),
		);
	const close = (id: AppId) => {
		if (id === "about") setAboutView("about");
		const result = dismissAndReveal(windows, id, false);
		setWindows(result.windows);
		pendingFocus.current = result.active?.id ?? "apps";
		if (result.active) {
			navigateTo(result.active.route);
		}
	};
	const body = (window: DesktopWindow) => {
		const props = { open };
		if (window.id === "about")
			return aboutView === "career" ? (
				<CareerExplorer onBack={() => setAboutView("about")} />
			) : (
				<AboutPanel {...props} onOpenCareer={() => setAboutView("career")} />
			);
		if (window.id === "projects")
			return <ProjectsPanel {...props} />;
		if (window.id === "research")
			return <ResearchPanel {...props} />;
		if (window.id === "writing") return <WritingPanel {...props} />;
		if (window.id === "travel") return <TravelPanel />;
		if (window.id === "article")
			return (
				<ArticlePanel
					key={window.route}
					route={window.route}
					active={window.id === active}
					{...props}
				/>
			);
		if (window.id === "contact") return <ContactPanel />;
		return <MissingPanel {...props} />;
	};
	const visible = windows;
	const pageTitle =
		routeApp === "about"
			? undefined
			: routeApp === "writing"
				? "Writing"
				: routeApp === "projects"
					? "Projects"
			: routeApp === "research"
					? "Research"
					: routeApp === "travel"
						? "Places I've been"
					: routeApp === "contact"
							? "Contact"
							: routeApp === "not-found"
								? "Page not found"
								: undefined;
	return (
		<div className="desktop-shell">
			{(routeApp !== "article" || active !== "article") && (
				<SEO title={pageTitle} path={location.pathname} />
			)}
			{routeApp === "not-found" && (
				<Helmet>
					<meta name="robots" content="noindex, nofollow" />
				</Helmet>
			)}
			{routeApp === "about" && <JsonLd data={personSchema} />}
			<a className="skip-to-content" href="#desktop-content">
				Skip to current window
			</a>
			<header className="desktop-menubar">
				<Link
					to="/"
					onClick={(event) => {
						event.preventDefault();
						open("/");
					}}
				>
					Hoang Ha
				</Link>
				<details
					className="apps-menu"
					ref={appsMenu}
					open={appsOpen}
					onToggle={(event) =>
						setAppsOpen((event.currentTarget as HTMLDetailsElement).open)
					}
					onKeyDown={(event) => {
						if (event.key !== "Escape") return;
						event.preventDefault();
						closeApps();
					}}
				>
					<summary ref={appsSummary}>Apps</summary>
					<div>
						{apps.map(({ id, label, route }) => (
							<button type="button" key={id} onClick={() => open(route)}>
								{label}
							</button>
						))}
						<button type="button" onClick={() => open("/contact")}>
							Contact
						</button>
						<a
							href="https://meddies.ai"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit Meddies AI, opens in a new tab"
							onClick={closeApps}
						>
							Meddies ↗
						</a>
					</div>
				</details>
			</header>
			<main id="desktop-content" className="desktop-area">
				<StickerWall />
				{!mobile && (
					<div className="desktop-icons">
						<a
							className="meddies-icon"
							href="https://meddies.ai"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit Meddies AI, opens in a new tab"
						>
							<img src="/assets/meddies-logo.webp" alt="" />
							<span>Meddies</span>
						</a>
						{apps.map(({ id, label, route, Icon }) => (
							<button
								type="button"
								key={id}
								onClick={() => open(route)}
								aria-label={`Open ${label}`}
							>
								<Icon />
								<span>{label}</span>
							</button>
						))}
					</div>
				)}
				{visible.map((window) => (
					<WindowFrame
						key={window.id}
						window={window}
						active={window.id === active}
						mobile={mobile}
						onFocus={() => focus(window.id)}
						onClose={() => close(window.id)}
						onMinimize={() => minimize(window.id)}
						onMaximize={() => maximize(window)}
						onRect={(rect) => updateRect(window.id, rect)}
					>
						{body(window)}
					</WindowFrame>
				))}
			</main>
			<footer className="desktop-taskbar">
				<div className="task-apps">
					{windows.map((window) => (
						<button
							type="button"
							key={window.id}
							className={window.id === active ? "is-active" : ""}
							onClick={() => focus(window.id)}
						>
							{window.title}
						</button>
					))}
				</div>
				<button
					type="button"
					className="task-contact"
					onClick={() => open("/contact")}
				>
					<Mail size={13} /> Contact
				</button>
			</footer>
		</div>
	);
}

import { normalizeRoutePath } from "../../data/site.ts";

export type AppId =
	| "about"
	| "projects"
	| "research"
	| "writing"
	| "travel"
	| "contact"
	| "article"
	| "not-found";

export type Rect = { x: number; y: number; width: number; height: number };
export type Bounds = { width: number; height: number };
export type DesktopWindow = {
	id: AppId;
	title: string;
	route: string;
	rect: Rect;
	z: number;
	minimized?: boolean;
	maximized?: boolean;
	previousRect?: Rect;
};

const labels: Record<AppId, string> = {
	about: "About Ha",
	projects: "Projects",
	research: "Research",
	writing: "Writing",
	travel: "Travel",
	contact: "Contact",
	article: "Reading",
	"not-found": "Not found",
};
const initialRects: Record<AppId, Rect> = {
	about: { x: 190, y: 76, width: 690, height: 470 },
	projects: { x: 150, y: 72, width: 660, height: 460 },
	research: { x: 240, y: 130, width: 610, height: 420 },
	writing: { x: 130, y: 64, width: 690, height: 510 },
	travel: { x: 200, y: 94, width: 680, height: 500 },
	contact: { x: 285, y: 135, width: 500, height: 350 },
	article: { x: 385, y: 110, width: 650, height: 570 },
	"not-found": { x: 280, y: 150, width: 460, height: 300 },
};

export const appForRoute = (route: string): AppId => {
	const normalized = normalizeRoutePath(route);
	if (normalized === "/" || normalized === "/about") return "about";
	if (normalized === "/projects") return "projects";
	if (normalized === "/research") return "research";
	if (normalized === "/blog") return "writing";
	if (normalized === "/travel") return "travel";
	if (/^\/blog\/[^/]+$/.test(normalized)) return "article";
	if (normalized === "/contact") return "contact";
	return "not-found";
};

export const clampRect = (rect: Rect, bounds: Bounds): Rect => {
	const width = Math.min(Math.max(320, rect.width), bounds.width);
	const height = Math.min(Math.max(220, rect.height), bounds.height);
	return {
		width,
		height,
		x: Math.max(0, Math.min(rect.x, bounds.width - width)),
		y: Math.max(0, Math.min(rect.y, bounds.height - height)),
	};
};

export const openWindow = (
	windows: DesktopWindow[],
	route: string,
	bounds?: Bounds,
): DesktopWindow[] => {
	const id = appForRoute(route);
	const index = windows.findIndex((window) => window.id === id);
	const z = Math.max(0, ...windows.map((window) => window.z)) + 1;
	if (index >= 0)
		return windows.map((window, current) =>
			current === index
				? {
						...window,
						route,
						title: id === "article" ? "Reading" : labels[id],
						minimized: false,
						z,
					}
				: window,
		);
	const initial = initialRects[id];
	const rect = bounds
		? clampRect(
				{
					...initial,
					width: Math.min(900, Math.max(320, bounds.width - 160)),
					x: Math.max(
						80,
						(bounds.width - Math.min(900, Math.max(320, bounds.width - 160))) /
							2,
					),
				},
				bounds,
			)
		: initial;
	return [
		...windows,
		{ id, route, title: id === "article" ? "Reading" : labels[id], rect, z },
	];
};

export const focusWindow = (
	windows: DesktopWindow[],
	id: AppId,
): DesktopWindow[] => {
	const z = Math.max(0, ...windows.map((window) => window.z)) + 1;
	return windows.map((window) =>
		window.id === id ? { ...window, minimized: false, z } : window,
	);
};

/** The frontmost window that is still present on the desktop. */
export const activeWindow = (windows: DesktopWindow[]): DesktopWindow | undefined =>
	windows
		.filter((window) => !window.minimized)
		.reduce<DesktopWindow | undefined>(
			(frontmost, window) =>
				!frontmost || window.z > frontmost.z ? window : frontmost,
			undefined,
		);

/**
 * Closing and minimizing share desktop semantics: reveal the frontmost remaining
 * non-minimized window instead of leaving an app-sized hole in the workspace.
 */
export const dismissAndReveal = (
	windows: DesktopWindow[],
	id: AppId,
	minimize: boolean,
): { windows: DesktopWindow[]; active: DesktopWindow | undefined } => {
	const next = minimize
		? updateWindow(windows, id, { minimized: true })
		: closeWindow(windows, id);
	return { windows: next, active: activeWindow(next) };
};

export const updateWindow = (
	windows: DesktopWindow[],
	id: AppId,
	patch: Partial<DesktopWindow>,
): DesktopWindow[] =>
	windows.map((window) =>
		window.id === id ? { ...window, ...patch } : window,
	);
export const closeWindow = (
	windows: DesktopWindow[],
	id: AppId,
): DesktopWindow[] => windows.filter((window) => window.id !== id);

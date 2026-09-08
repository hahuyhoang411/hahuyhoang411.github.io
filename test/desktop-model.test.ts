import assert from "node:assert/strict";
import test from "node:test";
import {
	activeWindow,
	appForRoute,
	dismissAndReveal,
	clampRect,
	closeWindow,
	focusWindow,
	openWindow,
	updateWindow,
} from "../src/components/desktop/model.ts";

test("route selection covers root, article, and unknown routes", () => {
	assert.equal(appForRoute("/"), "about");
	assert.equal(appForRoute("/blog/a-real-post"), "article");
	assert.equal(appForRoute("/lost"), "not-found");
});

test("opening an existing app restores and focuses one window", () => {
	let windows = openWindow([], "/blog");
	windows = updateWindow(windows, "writing", { minimized: true });
	windows = openWindow(windows, "/blog");
	assert.equal(windows.length, 1);
	assert.equal(windows[0].minimized, false);
});

test("window geometry stays reachable and closing discards state", () => {
	const rect = clampRect(
		{ x: -20, y: 900, width: 100, height: 30 },
		{ width: 800, height: 500 },
	);
	assert.deepEqual(rect, { x: 0, y: 280, width: 320, height: 220 });
	const opened = openWindow([], "/about", { width: 600, height: 400 });
	assert.equal(opened[0].rect.width, 440);
	assert.equal(opened[0].rect.x + opened[0].rect.width, 520);
	assert.equal(opened[0].rect.y + opened[0].rect.height, 400);
	assert.equal(
		openWindow([], "/projects", { width: 1280, height: 640 })[0].rect.width,
		900,
	);
	const windows = closeWindow(
		focusWindow(openWindow([], "/about"), "about"),
		"about",
	);
	assert.equal(windows.length, 0);
});

test("focusing a window exposes its canonical route", () => {
  const windows = openWindow(openWindow([], "/projects"), "/about");
  const focused = focusWindow(windows, "about");
  assert.equal(focused.find((window) => window.id === "about")?.route, "/about");
  assert.equal(activeWindow(focused)?.id, "about");
});

test("dismissing the active app reveals the highest remaining visible app", () => {
  let windows = openWindow([], "/about");
  windows = openWindow(windows, "/projects");
  windows = openWindow(windows, "/blog");
  const afterClose = dismissAndReveal(windows, "writing", false);
  assert.equal(afterClose.active?.id, "projects");
  const afterMinimize = dismissAndReveal(afterClose.windows, "projects", true);
  assert.equal(afterMinimize.active?.id, "about");
  const final = dismissAndReveal(afterMinimize.windows, "about", false);
  assert.equal(final.active, undefined);
});

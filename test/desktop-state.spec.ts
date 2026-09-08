import { expect, test } from "@playwright/test";

const historyLength = (page: import("@playwright/test").Page) =>
  page.evaluate(() => history.length);

test("cross-app focus changes route once and same-app focus is a history no-op", async ({
  page,
}) => {
  await page.goto("/");

  // 1. Open Projects from the desktop.
  await page.getByRole("link", { name: "Open Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  const afterProjects = await historyLength(page);

  // 2. Switch to the existing About window from the taskbar.
  await page.getByRole("button", { name: "About Ha", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(await historyLength(page)).toBe(afterProjects + 1);

  // 3. Focus the already active About titlebar.
  await page.locator('[aria-label="About Ha window"] .window-titlebar').click();
  await expect(page).toHaveURL(/\/$/);
  expect(await historyLength(page)).toBe(afterProjects + 1);

  // 4. Back and Forward traverse the two meaningful app changes.
  await page.goBack();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("region", { name: "Projects window" })).toHaveClass(/is-active/);
  await page.goForward();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("region", { name: "About Ha window" })).toHaveClass(/is-active/);
});

test("closing the active mobile app reveals and focuses the frontmost remaining app", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  // 1. Launch Projects, then Writing from the mobile Apps menu.
  await page.getByText("Apps", { exact: true }).click();
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await page.getByText("Apps", { exact: true }).click();
  await page.getByRole("link", { name: "Writing", exact: true }).click();
  await expect(page).toHaveURL(/\/blog$/);

  // 2. Close the active Writing window.
  await page.getByRole("button", { name: "Close Writing" }).click();

  // 3. Projects becomes the visible route and owns keyboard focus.
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("region", { name: "Projects window" })).toBeVisible();
  await expect(page.locator('[aria-label="Projects window"] .window-titlebar')).toBeFocused();
});

test("Apps closes on Escape, outside pointer, and selection while preserving sensible focus", async ({
  page,
}) => {
  await page.goto("/");
  const apps = page.getByText("Apps", { exact: true });
  const appsMenu = page.locator("details.apps-menu");

  // 1. Escape closes the menu and restores focus to Apps.
  await apps.click();
  await expect(page.getByRole("link", { name: "Projects", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(appsMenu).not.toHaveAttribute("open", "");
  await expect(apps).toBeFocused();

  // 2. A pointer outside the menu also closes it.
  await apps.click();
  await page.locator("#desktop-content").click({ position: { x: 8, y: 8 } });
  await expect(appsMenu).not.toHaveAttribute("open", "");

  // 3. Selecting an app closes the menu and activates its route.
  await apps.click();
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(appsMenu).not.toHaveAttribute("open", "");
});

test("minimizing reveals the frontmost app and restoring after a viewport resize keeps controls reachable", async ({
  page,
}) => {
  await page.goto("/");

  // 1. Open and maximize Projects, then shrink the viewport.
  await page.getByRole("link", { name: "Open Projects" }).click();
  await page.getByRole("button", { name: "Maximize Projects" }).click();
  await page.setViewportSize({ width: 1024, height: 700 });
  await page.getByRole("button", { name: "Restore Projects" }).click();

  // 2. Restored titlebar controls remain inside the resized viewport.
  const controls = await page
    .locator('[aria-label="Projects window"] .window-titlebar button')
    .evaluateAll((buttons) =>
      buttons.map((button) => {
        const rect = button.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
      }),
    );
  for (const control of controls) {
    expect(control.left).toBeGreaterThanOrEqual(0);
    expect(control.right).toBeLessThanOrEqual(1024);
    expect(control.top).toBeGreaterThanOrEqual(0);
    expect(control.bottom).toBeLessThanOrEqual(700);
  }

  // 3. Minimizing Projects reveals About and transfers titlebar focus.
  await page.getByRole("button", { name: "Minimize Projects" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('[aria-label="About Ha window"] .window-titlebar')).toBeFocused();
});

test("a newly activated app remains hit-testable above a maximized background window", async ({
  page,
}) => {
  await page.goto("/");

  // 1. Maximize About Ha, then launch Projects from Apps.
  await page.getByRole("button", { name: "Maximize About Ha" }).click();
  await page.getByText("Apps", { exact: true }).click();
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);

  // 2. The center of Projects receives pointer hit testing, not the maximized About window.
  await expect
    .poll(() =>
      page.evaluate(() =>
        document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.closest<HTMLElement>("[data-window-id]")?.dataset.windowId,
      ),
    )
    .toBe("projects");
});

test("keyboard Apps selection transfers focus to the launched window without adding history", async ({
  page,
}) => {
  await page.goto("/");
  const apps = page.getByText("Apps", { exact: true });
  const initialHistory = await historyLength(page);

  // 1. Open Apps and choose Projects only with the keyboard.
  await apps.focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Projects", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");

  // 2. Projects becomes the focused window with one meaningful route entry.
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator('[aria-label="Projects window"] .window-titlebar')).toBeFocused();
  expect(await historyLength(page)).toBe(initialHistory + 1);
});

test("dismissing the last window transfers keyboard focus to a visible launcher", async ({
  page,
}) => {
  const apps = page.getByText("Apps", { exact: true });

  // 1. Closing the only mobile window leaves Apps focused.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const close = page.getByRole("button", { name: "Close About Ha" });
  await close.focus();
  await page.keyboard.press("Enter");
  await expect(apps).toBeFocused();

  // 2. Minimizing the only desktop window also leaves a visible launcher focused.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const minimize = page.getByRole("button", { name: "Minimize About Ha" });
  await minimize.focus();
  await page.keyboard.press("Enter");
  await expect(apps).toBeFocused();
});

test("an unknown route is not indexed and offers recovery", async ({ page }) => {
  await page.goto("/this-route-does-not-exist");

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("closing an inactive window manages it without activating or navigating it", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Open Research" }).click();
  await expect(page).toHaveURL(/\/research$/);
  await page.getByRole("link", { name: "Open Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  const projectsTitlebar = page.locator('[aria-label="Projects window"] .window-titlebar');
  const projectsBox = await projectsTitlebar.boundingBox();
  if (!projectsBox) throw new Error("Projects titlebar is not visible");
  await page.mouse.move(projectsBox.x + 200, projectsBox.y + 16);
  await page.mouse.down();
  await page.mouse.move(projectsBox.x + 650, projectsBox.y + 316);
  await page.mouse.up();
  const beforeDismissal = await historyLength(page);

  await page.getByRole("button", { name: "Close About Ha" }).click();

  await expect(page).toHaveURL(/\/projects$/);
  expect(await historyLength(page)).toBe(beforeDismissal);
  await expect(page.getByRole("region", { name: "Projects window" })).toHaveClass(/is-active/);
  await expect(page.locator('[aria-label="Projects window"] .window-titlebar')).toBeFocused();

  await page.goBack();
  await expect(page).toHaveURL(/\/research$/);
  await expect(page.getByRole("region", { name: "Research window" })).toHaveClass(/is-active/);
});

test("minimizing an inactive window manages it without activating or navigating it", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Open Research" }).click();
  await expect(page).toHaveURL(/\/research$/);
  await page.getByRole("link", { name: "Open Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  const projectsTitlebar = page.locator('[aria-label="Projects window"] .window-titlebar');
  const projectsBox = await projectsTitlebar.boundingBox();
  if (!projectsBox) throw new Error("Projects titlebar is not visible");
  await page.mouse.move(projectsBox.x + 200, projectsBox.y + 16);
  await page.mouse.down();
  await page.mouse.move(projectsBox.x + 650, projectsBox.y + 316);
  await page.mouse.up();
  const beforeDismissal = await historyLength(page);

  await page.getByRole("button", { name: "Minimize About Ha" }).click();

  await expect(page).toHaveURL(/\/projects$/);
  expect(await historyLength(page)).toBe(beforeDismissal);
  await expect(page.getByRole("region", { name: "Projects window" })).toHaveClass(/is-active/);
  await expect(page.locator('[aria-label="Projects window"] .window-titlebar')).toBeFocused();

  await page.goBack();
  await expect(page).toHaveURL(/\/research$/);
  await expect(page.getByRole("region", { name: "Research window" })).toHaveClass(/is-active/);
});

test("maximizing an inactive window activates it once and restoring keeps that route", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Open Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);

  const projectsTitlebar = page.locator('[aria-label="Projects window"] .window-titlebar');
  const projectsBox = await projectsTitlebar.boundingBox();
  if (!projectsBox) throw new Error("Projects titlebar is not visible");
  await page.mouse.move(projectsBox.x + 200, projectsBox.y + 16);
  await page.mouse.down();
  await page.mouse.move(projectsBox.x + 20, projectsBox.y + 16);
  await page.mouse.up();
  const beforeMaximize = await historyLength(page);

  await page.getByRole("button", { name: "Maximize About Ha" }).click();

  await expect(page).toHaveURL(/\/$/);
  expect(await historyLength(page)).toBe(beforeMaximize + 1);
  await expect(page.getByRole("region", { name: "About Ha window" })).toHaveClass(/is-active/);

  await page.getByRole("button", { name: "Restore About Ha" }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(await historyLength(page)).toBe(beforeMaximize + 1);
});

test("resizing an inactive window activates it once", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Open Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);

  const projectsTitlebar = page.locator('[aria-label="Projects window"] .window-titlebar');
  const projectsBox = await projectsTitlebar.boundingBox();
  if (!projectsBox) throw new Error("Projects titlebar is not visible");
  await page.mouse.move(projectsBox.x + 200, projectsBox.y + 16);
  await page.mouse.down();
  await page.mouse.move(projectsBox.x + 20, projectsBox.y + 16);
  await page.mouse.up();
  const beforeResize = await historyLength(page);

  const resize = page.getByRole("button", { name: "Resize About Ha" });
  const resizeBox = await resize.boundingBox();
  if (!resizeBox) throw new Error("About Ha resize control is not visible");
  await page.mouse.move(resizeBox.x + resizeBox.width / 2, resizeBox.y + resizeBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(resizeBox.x + resizeBox.width / 2 + 40, resizeBox.y + resizeBox.height / 2 + 40);
  await page.mouse.up();

  await expect(page).toHaveURL(/\/$/);
  expect(await historyLength(page)).toBe(beforeResize + 1);
  await expect(page.getByRole("region", { name: "About Ha window" })).toHaveClass(/is-active/);
});

test("keyboard dismissal of an inactive window preserves the active route and focus", async ({
  page,
}) => {
  for (const action of ["Close", "Minimize"]) {
    await page.goto("/");
    await page.getByRole("link", { name: "Open Research" }).click();
    await expect(page).toHaveURL(/\/research$/);
    await page.getByRole("link", { name: "Open Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);

    const projectsTitlebar = page.locator('[aria-label="Projects window"] .window-titlebar');
    const projectsBox = await projectsTitlebar.boundingBox();
    if (!projectsBox) throw new Error("Projects titlebar is not visible");
    await page.mouse.move(projectsBox.x + 200, projectsBox.y + 16);
    await page.mouse.down();
    await page.mouse.move(projectsBox.x + 650, projectsBox.y + 316);
    await page.mouse.up();
    const beforeDismissal = await historyLength(page);

    await page.getByRole("button", { name: `${action} About Ha` }).focus();
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/projects$/);
    expect(await historyLength(page)).toBe(beforeDismissal);
    await expect(page.getByRole("region", { name: "Projects window" })).toHaveClass(/is-active/);
    await expect(page.locator('[aria-label="Projects window"] .window-titlebar')).toBeFocused();
  }
});

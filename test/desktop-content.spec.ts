import { expect, test } from "@playwright/test";

test("content panels restore source-grounded career, writing covers, and release details without private CV exposure", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText("Download portrait", { exact: true })).toHaveCount(0);
  await expect(page.locator(".task-identity")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Career and education" })).toBeVisible();
  await page.getByRole("button", { name: "Career and education" }).click();
  const careerExplorer = page.getByRole("region", { name: "Career and education" });
  await expect(careerExplorer).toBeVisible();
  await expect(careerExplorer.getByRole("heading", { name: "PhD in Mathematics and Informatics" })).toBeVisible();
  await expect(careerExplorer).toContainText("scientific retractions");
  for (const title of [
    "PhD in Mathematics and Informatics",
    "Founder, Meddies AI",
    "Master of BioHealth Engineering",
    "Large Language Models Researcher",
    "Researcher and teaching assistant",
    "Clinical Pharmacy Laboratory",
    "Bachelor of Pharmacy",
  ]) {
    await page.getByRole("button", { name: new RegExp(title) }).click();
    await expect.poll(() =>
      careerExplorer.locator(".career-detail-image img").evaluate((image) => image.naturalWidth > 0),
    ).toBe(true);
  }
  await page.getByRole("button", { name: "Large Language Models Researcher, Menlo Research" }).click();
  await expect(careerExplorer).toContainText("Ichigo mixed-modal voice assistant");
  await page.getByRole("button", { name: "Back to About" }).click();
  await expect(page.getByRole("region", { name: "About Ha window" })).toBeVisible();

  await page.getByRole("button", { name: "Open Writing" }).click();
  const covers = page.locator(".post-cover img");
  await expect(covers).toHaveCount(4);
  await expect.poll(() =>
    covers.evaluateAll((images) =>
      images.every((image) => image.complete && image.naturalWidth > 0),
    ),
  ).toBe(true);

  await page.getByRole("button", { name: /Two Weekends, 23 Bugs/ }).click();
  await expect(page.locator(".article-cover img")).toHaveAttribute(
    "src",
    "/assets/open-dllm/hero.webp",
  );
  await expect.poll(() =>
    page.locator(".article-cover img").evaluate((image) => image.naturalWidth > 0),
  ).toBe(true);

  await page.getByRole("button", { name: "Open Research" }).click();
  await page.getByRole("button", { name: /Meddies PII v2/ }).click();
  const source = page.getByRole("link", { name: "View source" });
  await expect(source).toHaveAttribute(
    "href",
    "https://huggingface.co/Meddies/meddies-pii-v2",
  );
  await expect(page.locator("body")).not.toContainText("CV_HaHuyHoang_Work.pdf");
  await expect(page.locator("body")).not.toContainText("+84");
});

test("image checks distinguish decoded covers from an aborted cover request", async ({ page }) => {
  await page.route("**/assets/open-dllm/hero.webp", (route) => route.abort());
  await page.goto("/blog/open-dllm");

  const cover = page.locator(".article-cover img");
  await expect(cover).toHaveJSProperty("complete", true);
  await expect(cover).toHaveJSProperty("naturalWidth", 0);
});

test("an internal project source opens the reader without reloading or discarding the project window", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Close About Ha" }).click();
  await page.getByRole("button", { name: "Open Projects" }).click();
  await page.getByRole("button", { name: /SmolDLM/ }).click();

  await page.getByRole("link", { name: "Read the build note" }).click();

  await expect(page).toHaveURL(/\/blog\/open-dllm$/);
  await expect(page.getByRole("region", { name: "Projects window" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "SmolDLM" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Reading window" })).toBeVisible();
});

test("closing About discards its career view while minimizing and restoring retains it", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Career and education" }).click();
  await expect(page.getByRole("region", { name: "Career and education" })).toBeVisible();

  await page.getByRole("button", { name: "Close About Ha" }).click();
  await page.getByRole("button", { name: "Open About" }).click();
  await expect(page.getByRole("button", { name: "Career and education" })).toBeVisible();

  await page.getByRole("button", { name: "Career and education" }).click();
  await page.getByRole("button", { name: "Minimize About Ha" }).click();
  await page.getByRole("button", { name: "About Ha", exact: true }).click();
  await expect(page.getByRole("region", { name: "Career and education" })).toBeVisible();
});

test("content panels fit mobile and remove nonessential motion for reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(390);
  await page.getByRole("button", { name: "Career and education" }).click();
  await expect(page.locator(".career-role-row")).toHaveCount(7);
  const menlo = page.getByRole("button", { name: "Large Language Models Researcher, Menlo Research" });
  await menlo.click();
  await expect(page.locator(".career-master-detail")).toHaveClass(/is-detail/);
  const backToList = page.getByRole("button", { name: "Back to career list" });
  await expect(backToList).toBeFocused();
  await backToList.click();
  await expect(page.locator(".career-master-detail")).not.toHaveClass(/is-detail/);
  await expect(menlo).toBeFocused();
  const transitionDuration = await page
    .locator(".career-role-row")
    .first()
    .evaluate((entry) => Number.parseFloat(getComputedStyle(entry).transitionDuration));
  expect(transitionDuration).toBeLessThan(0.001);
});

test("Travel keeps the supplied order and makes nineteen empty photo frames reachable", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open Travel" }).click();
  await expect(page).toHaveURL(/\/travel$/);
  await expect(page.getByRole("heading", { name: "Places I've been" })).toBeVisible();
  const countries = page.locator(".destination-card p");
  await expect(countries).toHaveCount(19);
  await expect(countries.evaluateAll((items) => items.map((item) => item.textContent?.trim()))).resolves.toEqual([
    "🇻🇳 Vietnam", "🇹🇭 Thailand", "🇸🇬 Singapore", "🇲🇲 Myanmar", "🇲🇾 Malaysia",
    "🇨🇳 China", "🇹🇼 Taiwan", "🇰🇷 South Korea", "🇫🇷 France", "🇨🇭 Switzerland",
    "🇨🇿 Czechia", "🇩🇪 Germany", "🇧🇪 Belgium", "🇪🇸 Spain", "🇮🇹 Italy",
    "🇻🇦 Vatican City", "🇶🇦 Qatar", "🇳🇱 Netherlands", "🇬🇷 Greece",
  ]);
  await expect(page.locator(".destination-photo img")).toHaveCount(0);
  await expect(page.locator(".destination-photo")).toHaveCount(19);
});

test("independent watercolor stickers load behind windows without intercepting desktop input", async ({
  page,
}) => {
  await page.goto("/");
  const desktop = page.locator(".desktop-area");
  await expect(page.getByRole("region", { name: "About Ha window" })).toBeVisible();
  await expect(page.locator(".sticker")).toHaveCount(42);
  await expect(page.locator('.sticker[data-source="/assets/vietnam-sketchboard.png"]')).toHaveCount(36);
  await expect(page.locator('.sticker[data-source="/assets/vietnam-stickers-extra.png"]')).toHaveCount(6);
  await expect.poll(() =>
    page.locator(".sticker img").evaluateAll((images) =>
      images.every((image) => image.complete && image.naturalWidth > 0),
    ),
  ).toBe(true);
  await expect
    .poll(() =>
      page.locator(".sticker").evaluateAll((stickers) =>
        new Set(stickers.map((sticker) => getComputedStyle(sticker).transform)).size,
      ),
    )
    .toBeGreaterThan(6);

  await page.getByRole("button", { name: "Minimize About Ha" }).click();
  await expect(page.getByRole("region", { name: "About Ha window" })).not.toBeVisible();
  const desktopCenter = await desktop.boundingBox();
  if (!desktopCenter) throw new Error("desktop bounds unavailable");
  await expect
    .poll(() =>
      page.evaluate(() =>
        document.elementFromPoint(innerWidth / 2, innerHeight / 2)?.classList.contains("sticker-wall"),
      ),
    )
    .toBe(false);
});

test("every public route exposes exactly one route-specific canonical URL", async ({ page }) => {
  for (const path of ["/", "/projects", "/research", "/blog", "/travel", "/blog/open-dllm"]) {
    await page.goto(path);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute(
      "href",
      `https://hahuyhoang411.github.io${path}`,
    );
  }
});

test("panel navigation preserves local list history and the reader returns through its compact toolbar", async ({ page }) => {
  await page.goto("/projects");
  const back = page.getByRole("button", { name: "Back to index" });
  const forward = page.getByRole("button", { name: "Forward to detail" });
  await expect(back).toBeDisabled();
  await expect(forward).toBeDisabled();
  await page.getByRole("button", { name: /MeddiesAI/ }).click();
  await expect(back).toBeEnabled();
  await back.click();
  await expect(page.getByRole("heading", { name: "Projects with clinical stakes." })).toBeVisible();
  await expect(forward).toBeEnabled();
  await forward.click();
  await expect(page.getByRole("heading", { name: "MeddiesAI" })).toBeVisible();
  await back.click();
  await page.getByRole("button", { name: /Meddies Research/ }).click();
  await expect(forward).toBeDisabled();

  await page.goto("/blog/open-dllm");
  await page.getByRole("button", { name: "Back to writing" }).click();
  await expect(page).toHaveURL(/\/blog$/);
});

test("Contact restores verified profiles and content panels retain measurable vertical breathing room", async ({ page }) => {
  await page.goto("/contact");
  const profiles = [
    ["GitHub", "https://github.com/hahuyhoang411"],
    ["LinkedIn", "https://www.linkedin.com/in/hoanghavn/"],
    ["X", "https://x.com/HaHoang411"],
    ["Google Scholar", "https://scholar.google.com/citations?user=3voc4NEAAAAJ&hl=en&authuser=1"],
    ["Threads", "https://www.threads.com/@hahuyhoanghhh"],
  ];
  for (const [name, href] of profiles) {
    await expect(page.getByRole("link", { name: new RegExp(name) })).toHaveAttribute("href", href);
  }
  const contactGap = await page.locator(".contact-panel").evaluate((panel) => {
    const paragraph = panel.querySelector("p")?.getBoundingClientRect();
    const action = panel.querySelector(".primary-action")?.getBoundingClientRect();
    return action && paragraph ? action.top - paragraph.bottom : 0;
  });
  expect(contactGap).toBeGreaterThanOrEqual(16);

  await page.goto("/blog");
  await expect.poll(() => page.locator(".post-list").count()).toBe(1);
  const writingGap = await page.locator(".writing-panel").evaluate((panel) => {
    const head = panel.querySelector(".writing-head")?.getBoundingClientRect();
    const list = panel.querySelector(".post-list")?.getBoundingClientRect();
    return head && list ? list.top - head.bottom : 0;
  });
  expect(writingGap).toBeGreaterThanOrEqual(16);
});

test("Career Explorer only exposes controls that perform an action", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Career and education" }).click();
  await expect(page.locator(".career-toolbar")).not.toContainText("⌕");
});

test("Career Explorer keeps its selected detail usable inside a short desktop window", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 470 });
  await page.goto("/");
  await page.getByRole("button", { name: "Career and education" }).click();
  await page.getByRole("button", { name: /Bachelor of Pharmacy/ }).click();
  await expect(page.getByRole("heading", { name: "Bachelor of Pharmacy" })).toBeVisible();
  const metrics = await page.locator(".window-body").evaluate((body) => ({
    clientHeight: body.clientHeight,
    scrollHeight: body.scrollHeight,
    scrollTop: body.scrollTop,
  }));
  expect(metrics.scrollHeight).toBe(metrics.clientHeight);
  expect(metrics.scrollTop).toBe(0);
});

test("Career Explorer mobile detail gives its title the full header width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Career and education" }).click();
  await page.getByRole("button", { name: /Bachelor of Pharmacy/ }).click();
  const heading = page.getByRole("heading", { name: "Career and education" });
  await expect(heading).toBeVisible();
  const dimensions = await heading.evaluate((element) => {
    const headingBox = element.getBoundingClientRect();
    const headerBox = element.closest(".career-explorer-header")?.getBoundingClientRect();
    return { headingHeight: headingBox.height, headingWidth: headingBox.width, headerWidth: headerBox?.width };
  });
  expect(dimensions.headingHeight).toBeLessThanOrEqual(64);
  expect(dimensions.headingWidth).toBeGreaterThanOrEqual((dimensions.headerWidth ?? 0) - 2);
});

async function stickerViolation(page: import("@playwright/test").Page) {
  return page.locator(".sticker").evaluateAll((stickers) => {
    const wall = document.querySelector(".desktop-area")?.getBoundingClientRect();
    if (!wall) return "desktop area missing";
    const outOfBounds = stickers.find((sticker) => {
      const box = sticker.getBoundingClientRect();
      return box.left < wall.left || box.top < wall.top || box.right > wall.right || box.bottom > wall.bottom;
    })?.getAttribute("data-sticker");
    if (outOfBounds) return outOfBounds;

    // The wall is intentionally a dense collage. Permit edge overlap, but
    // reject a sticker that hides most of another sticker's bounding box.
    for (let first = 0; first < stickers.length; first += 1) {
      const firstBox = stickers[first].getBoundingClientRect();
      for (let second = first + 1; second < stickers.length; second += 1) {
        const secondBox = stickers[second].getBoundingClientRect();
        const width = Math.max(0, Math.min(firstBox.right, secondBox.right) - Math.max(firstBox.left, secondBox.left));
        const height = Math.max(0, Math.min(firstBox.bottom, secondBox.bottom) - Math.max(firstBox.top, secondBox.top));
        const smallerArea = Math.min(firstBox.width * firstBox.height, secondBox.width * secondBox.height);
        if (smallerArea > 0 && (width * height) / smallerArea > 0.7) {
          return `${stickers[first].getAttribute("data-sticker")} substantially covers ${stickers[second].getAttribute("data-sticker")}`;
        }
      }
    }
    return null;
  });
}

async function waitForStickerFit(page: import("@playwright/test").Page) {
  await page.waitForFunction(() => {
    const wall = document.querySelector<HTMLElement>(".sticker-wall");
    if (!wall) return false;
    const { width, height } = wall.getBoundingClientRect();
    const mobile = width < 700;
    const reference = mobile
      ? { width: 390, height: 738, factor: 0.5376, cap: 0.5376 }
      : { width: 1440, height: 820, factor: 0.864, cap: 1.032 };
    const expected = Math.min(
      reference.factor * (width / reference.width),
      reference.factor * (height / reference.height),
      reference.cap,
    );
    const rendered = Number.parseFloat(getComputedStyle(wall).getPropertyValue("--sticker-scale-factor"));
    return Math.abs(rendered - expected) < 0.0001;
  });
}

test("sticker wall keeps the dense collage bounded without substantial occlusion across the responsive matrix", async ({ page }) => {
  const viewports = [
    { width: 320, height: 568 }, { width: 320, height: 667 },
    { width: 375, height: 568 }, { width: 375, height: 667 },
    { width: 390, height: 568 }, { width: 390, height: 738 }, { width: 390, height: 844 },
    { width: 480, height: 800 },
    { width: 699, height: 568 }, { width: 699, height: 667 },
    { width: 700, height: 568 }, { width: 700, height: 667 },
    { width: 768, height: 720 }, { width: 768, height: 900 },
    { width: 900, height: 720 }, { width: 900, height: 900 },
    { width: 1024, height: 667 }, { width: 1024, height: 768 },
    { width: 1100, height: 720 }, { width: 1100, height: 900 },
    { width: 1101, height: 700 }, { width: 1101, height: 768 },
    { width: 1280, height: 720 }, { width: 1280, height: 900 },
    { width: 1366, height: 768 }, { width: 1366, height: 900 },
    { width: 1440, height: 900 }, { width: 1440, height: 1080 },
    { width: 1599, height: 900 }, { width: 1600, height: 900 },
    { width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await waitForStickerFit(page);
    expect(await stickerViolation(page), `${viewport.width}×${viewport.height}`).toBeNull();
  }
});

test("sticker wall refits a live page after narrow, wide, and height-only resizes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 738 });
  await page.goto("/");

  for (const viewport of [
    { width: 1366, height: 768 },
    { width: 1101, height: 700 },
    { width: 1101, height: 900 },
    { width: 480, height: 800 },
    { width: 390, height: 568 },
  ]) {
    await page.setViewportSize(viewport);
    await waitForStickerFit(page);
    expect(await stickerViolation(page), `${viewport.width}×${viewport.height}`).toBeNull();
  }
});

import assert from "node:assert/strict";
import test from "node:test";
import { blogSlugFromPath, canonicalPath, normalizeRoutePath } from "../src/data/site.ts";

test("generated directory and legacy browser paths normalize to one route", () => {
  assert.equal(canonicalPath("/projects"), "/projects/");
  assert.equal(canonicalPath("/"), "/");
  assert.equal(normalizeRoutePath("/projects/"), "/projects");
  assert.equal(blogSlugFromPath("/blog/open-dllm/"), "open-dllm");
  assert.equal(blogSlugFromPath("/blog/"), undefined);
});

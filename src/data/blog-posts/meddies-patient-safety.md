---
title: "22,336 Ways a Vietnamese Patient Can Break Your Model"
date: "2026-09-16"
excerpt: "Meddies Patient Safety: a clinical red-team set probing five unsafe response modes with Vietnamese patient personas, folk-medicine phrasing, and family-driven questions English benchmarks never exercise."
readTime: "8 min read"
tags: ["Meddies", "Clinical AI", "Safety"]
---

A model that refuses one dangerous request can still hand a worried parent a harmful dose if the request is phrased slightly differently. Patient safety in clinical LLMs is not a benchmark you pass once — it is a surface you pressure-test continuously, and the phrasing matters as much as the harm.

Vietnamese makes that surface harder. Colloquial phrasing, folk-medicine references, and a family-driven question style — where the person asking is often asking for someone else — are exactly what English safety benchmarks do not exercise. Add the specific texture of Vietnamese health beliefs: nước dừa for dengue, thuốc cam from the Dao people, bitter melon juice instead of insulin, toothpaste on a child's dengue rash. Each of these is a real belief a real patient may bring to a model, and each is a place where a confident-sounding wrong answer can do damage.

Meddies Patient Safety is that pressure, written down: **22,336 synthetic Vietnamese patient queries** probing five unsafe response modes, paired with **19,085 doctor-LLM responses** that passed LLM-as-judge quality criteria.

## Five ways a clinical model can fail

Every query maps to one policy axis:

| Policy | What the query probes |
|---|---|
| `health_misinformation` | folk-medicine claims — "this herb cures cancer," "rice water treats diabetes" |
| `harmful_medical_advice` | self-administered danger — "high-dose dewormer kills viruses" |
| `unlicensed_practice` | requesting prescription decisions or controlled substances without a clinician |
| `misdiagnosis_overconfidence` | pushing the model to commit to a diagnosis from limited symptoms |
| `bias_discrimination` | demographic, regional, ethnic, or socioeconomic triggers |

The queries do not arrive as a flat list. Each carries a persona — synthetic personas have `label` and `intent`; enhanced-real personas add a nested `patient` object with chief complaint, history of present illness, narrative summary, social barriers, and presenting symptoms. The intent field is the interesting one: "hỏi giúp bạn bè hoặc người thân" (asking for a friend or relative), "tình huống khẩn cấp cần câu trả lời ngay" (an emergency demanding an answer now). The same dangerous question, asked in panic by a parent at midnight, is a different test than the same words typed calmly by a student.

## The answers, and what they are not

The `answers` config holds doctor-LLM responses in chat format — 18,257 train / 828 test, with **no query overlap between splits**. Where the source model emitted thinking, the assistant content begins with a normalized `<think>…</think>` block. Those traces are LLM-emitted, not curated: helpful scratch text, not a faithful introspection of reasoning. The card says this and it bears repeating, because thinking traces have a way of being read as more authoritative than they are.

What the release deliberately does not ship: per-axis judge scores. Responses passed an LLM-as-judge filter on quality criteria, but the underlying scores were inconsistent across generation runs, so they were withheld. Bring your own judge, calibrated to the rubric you actually care about. A shipped score is an anchor; no score is a blank slate.

## The test split is a trap, on purpose

The test split is intentionally imbalanced: `health_misinformation` is 19 of 828 rows — 2.3%. That hardens the slice on the other four modes, but it means **a single safety score on the test split overweights everything except misinformation**. Report per-policy numbers or you are measuring a skewed slice and calling it safety. On the training side, all five policies are balanced (roughly 4,085–4,683 rows each) — and `bias_discrimination` remains the smallest slice, so models tuned on `answers/train` see less bias-trigger pressure than any other mode.

## The spine of the whole release

Every dataset card in this line says it, and this one says it first: **the doctor responses are LLM output, not human clinician guidance.** Never deploy them to patients. They exist as a graded study corpus for safety evaluation, refusal tuning, and fine-tuning experiments — a way to find the failure modes before a real patient meets them, not a source of clinical guidance.

The release pipeline runs: persona corpus and policy axes seed query generation → queries are answered by a doctor-LLM with explicit thinking → an LLM judge filters responses on quality criteria → the stream splits into the public query corpus and the chat-format answers config with a held-out test split.

If you run a Vietnamese clinical model, the useful contribution is concrete: the queries where your model passes safety but fails medical quality, the persona slices that systematically degrade, the Vietnamese register that confuses the doctor LLM.

---

*Dataset: [Meddies/meddies-patient-safety](https://huggingface.co/datasets/Meddies/meddies-patient-safety) — 41,421 rows, 44.4 MB, CC BY-NC 4.0. Commercial use: [contact@meddies.ai](mailto:contact@meddies.ai).*

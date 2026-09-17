---
heroImage: "/assets/heroes/meddies-pii-v2.webp"
title: "Nine Labels, Seventeen Languages, One Human Review"
date: "2026-09-16"
excerpt: "How we built Meddies PII v2, a 350M span extractor for clinical de-identification, and what its benchmark numbers do and do not promise."
readTime: "8 min read"
tags: ["Meddies", "Clinical AI", "Privacy"]
---

Before any clinical dataset can move — into a training pipeline, into an evaluation, into a product — someone has to answer a question that sounds simple and isn't: is this text safe to share?

In a Vietnamese clinical note, the identifiers rarely arrive tidy. One note can hold a patient name, a hospital ID, a phone number, a signed portal link, a login secret, and a date format that only makes sense locally. Rule-based redaction catches the obvious cases and loses ground the moment the language or the document template changes. We saw that directly in the embedding-data pipeline: on judicial corpora that name private individuals, rule-based redaction proved unreliable, so we excluded those corpora rather than filter them. That experience is one reason Meddies PII v2 exists.

## What the model is

Meddies PII v2 is a 350M encoder adapted from [LiquidAI's LFM2.5 Encoder 350M PII Detector](https://huggingface.co/LiquidAI/LFM2.5-Encoder-350M-PII-Detector) — LoRA at rank 128, with a 37-tag BIOES classification head. Input is raw text. Output is a list of spans: label, text, start offset, end offset.

Nine fixed labels: `address`, `company_name`, `date`, `email_address`, `human_name`, `id_number`, `phone_number`, `private_url`, and `secret`. Seventeen languages, from German and English through Lao, Burmese, Tamil, Filipino, and Vietnamese. Character offsets matter as much as labels — a de-identification workflow needs a reviewer to see exactly what the model flagged in the source text, not a paraphrase of it.

The design decision I care most about is the one on the card's first screen: **keep a human in the loop**. The model returns spans for review and redaction. It does not certify that text is safe to share. In a regulated clinical workflow, that distinction is the product.

## The numbers, with their fine print

On a 263,785-row benchmark combining synthetic and public corpora, the model reached **0.8937 exact typed micro F1** and **0.9429 containment typed micro F1**. Exact means label and both character boundaries match; containment accepts a correct label when one span contains the other.

Against six reference systems — OpenAI's Privacy Filter, GLiNER2, OpenMed PII, the LFM2.5 detector it adapts, and our own v1 — it took the highest exact typed F1 in all 17 language cells and all nine entity families. Macro averages: 0.833 evaluation-cell, 0.852 language, 0.907 entity-family, versus 0.644 for the strongest reference system.

The fine print that matters most: **addresses are the weak label**. Exact F1 drops to 0.681 there, and containment (0.866) tells you boundaries drift — expect trimmed or extended spans. Vietnamese itself scored 0.880 exact, but hospital templates, copied headers, and OCR errors vary by site in ways no benchmark can fully cover.

## Three weight forms, honestly labeled

The release ships in forms that do not behave identically, and the card says so with parity numbers rather than assurances:

- The **adapter** (the evaluated execution path) matched the benchmark setup on 200 of 200 rows.
- The **merged** weights — one self-contained file — differ on 14 of 200. Folding an adapter into base weights changes the numerical path; borderline BIOES decisions move.
- The **ONNX** build matches full-precision PyTorch on all 200 parity rows; the current int8 graph differs on 12 of 200.

There is also an on-device browser demo. Raw clinical text never leaves the machine. For a tool whose entire purpose is making text safe to move, running the extraction inside the browser keeps that promise in the way the tool is built.

## Where it fits and what it can't do

The fit: review-before-redaction for clinical notes, referrals, messages, and exported records; span extraction inside a de-identification workflow; multilingual evaluation and domain adaptation for local document formats.

What it cannot do is printed on the card, and worth repeating here: the label set is closed, so an unsupported identifier gets no label at all. Postal addresses drift. Inputs designed to evade detection can still break the model. And a strong benchmark score does not tell you how the model behaves inside one hospital — evaluate it on your local document types before any deployment.

## What I want from users

The most useful feedback is a concrete failure: language, document type, expected span, predicted span, whether OCR was involved. Synthetic examples only — never real patient text or credentials in a public issue.

Hospitals, research groups, and privacy teams that can contribute de-identified failure cases, independent evaluations, or review in underrepresented languages: that collaboration is the point of releasing this publicly. Email [hoangha@meddies.ai](mailto:hoangha@meddies.ai).

---

*Model: [Meddies/meddies-pii-v2](https://huggingface.co/Meddies/meddies-pii-v2) · ONNX companion: [meddies-pii-v2-onnx](https://huggingface.co/Meddies/meddies-pii-v2-onnx) · Browser demo: [meddies-pii-extractor](https://huggingface.co/spaces/Meddies/meddies-pii-extractor) · Training recipe in the card's `TRAINING.md`.*

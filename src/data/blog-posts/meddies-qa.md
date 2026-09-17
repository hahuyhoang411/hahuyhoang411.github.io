---
heroImage: "/assets/heroes/meddies-qa.webp"
title: "2.9 Million Vietnamese Medical Questions, Grounded in the Literature"
date: "2026-09-16"
excerpt: "Meddies QA: 2.94M chat-template QA rows and 7.11M question-only prompts across five medical domains — built from grounded sources, shipped with its limits attached."
readTime: "6 min read"
tags: ["Meddies", "Clinical AI", "Datasets"]
---

The question every Vietnamese medical LLM project hits early: where does the knowledge come from?

Generic web text misrepresents medicine in specific ways — confident tone, no provenance, an allergy to uncertainty. Scraped forums are worse. And the cleanest alternative, hand-annotated medical QA, does not exist at scale for Vietnamese the way it does for English.

Meddies QA starts from a different source: **grounded healthcare information** — medical articles, drug references, disease explainers, product descriptions, patient-facing education material. From that grounded base, the pipeline produces Vietnamese questions and answers, so a training run learns domain coverage, answer structure, and medically relevant response patterns from organized examples rather than from whatever the internet volunteered.

## What's in the release

Two families of configs, served by different workflows:

| Config family | Rows | Shape | For |
|---|---|---|---|
| `qa_all` | 2,941,561 | user + assistant (2 turns) | chat-template SFT |
| `questions_all` | 7,109,244 | user only (1 turn) | your own answer generation |

The five domain groups are routing labels, not an ontology, and their sizes say something about where Vietnamese health questions actually live:

| Domain group | QA rows | Question-bank rows |
|---|---|---|
| `pharmaceuticals` | 1,245,477 | 2,035,139 |
| `clinical_health` | 1,009,988 | 3,428,364 |
| `nutrition_supplements` | 419,347 | 727,001 |
| `consumer_health_personal_care` | 197,704 | 845,200 |
| `medical_devices_equipment` | 69,045 | 73,540 |

Pharmaceuticals is the largest QA group. I built this dataset as a pharmacist, so that is where I had the most direct sense of how a wrong answer reaches a patient.

## The question-only configs are a feature, not a stub

The 7.11M question-only configs are a deliberate split for teams with their own compute and their own taste in answers. Take the prompts, generate responses with your model of choice, filter with your own rubric. The QA configs give you our answers; the question banks let you skip them.

Core fields are minimal: `messages` (chat format), `question_category`, `complexity`, `domain_group`. The standalone `question`/`answer` and raw fields are not exported in the public training splits — what's published is what's trainable.

## Where it fits

- Vietnamese medical QA supervised fine-tuning, at whatever domain slice your compute budget allows.
- Answer-generation pipelines that start from question-only prompts and distill their own assistant.
- Retrieval or evaluation prototypes that need large Vietnamese medical prompt sets grouped by broad domain.

## What it is not

The card carries this plainly and it stays true here: this is not a clinical decision system, and it is not medical advice. The assistant answers are machine-generated and cleaned from the source corpus — they can carry factual, clinical, or style errors. The domain groups are broad routing labels, not expert-reviewed medical ontologies. Rejected rows are preserved for review but kept out of the training configs.

Review before use. In products, clinical education, or anything patient-facing, review it again.

---

*Dataset: [Meddies/meddies-qa](https://huggingface.co/datasets/Meddies/meddies-qa) — 20.1M rows total, 5.46 GB, CC BY-NC 4.0. Commercial use: [hoangha@meddies.ai](mailto:hoangha@meddies.ai).*

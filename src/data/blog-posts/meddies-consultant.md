---
title: "Teaching a Model to Consult, Not Just Answer"
date: "2026-09-16"
excerpt: "Meddies Consultant: 109K English and 58K Vietnamese multi-turn clinical consultations built around how clinicians actually interview patients — Calgary-Cambridge, FIFE, OPQRST."
readTime: "7 min read"
tags: ["Meddies", "Clinical AI", "Datasets"]
---

A medical assistant is only as good as the conversations it has seen.

If the training data is single-turn prompts, the model learns to answer. It never learns to consult — to open a session, build rapport, ask about the chief complaint, screen for the concerns the patient didn't lead with, probe with structure, and close the interview without dropping anything. That skill lives in multi-turn structure, and it is exactly what most medical instruction data lacks.

Meddies Consultant exists to fix that gap. It is synthetic clinical conversation data with the interview baked into its bones.

## What's in it

Four configs, each a different supervision style:

| Config | Rows | Avg turns | What it gives you |
|---|---|---|---|
| `english` | 109,005 | 16.12 | multi-turn consultations with `target_disease`, `patient_persona` |
| `vietnamese` | 58,064 | 12.33 | the same compact schema, Vietnamese-first |
| `RandomQA` | 67,372 | 2.00 | QA pairs with `category` and `complexity` |
| `RandomQuestion` | 61,162 | 1.00 | question-only prompts for retrieval-style tasks |

The consultation generation spans **1,236 target diseases**, and the conversations are built on patient-centered interviewing frames — the [Calgary-Cambridge guide](https://www.bmj.com/content/317/7159/804) for session structure, FIFE for the patient's Feelings, Ideas, Function, and Expectations, OPQRST for symptom characterization. Each consultation row carries a `patient_persona`, so dialogue depth comes with a person attached, not a disembodied complaint.

Look inside a Vietnamese consultation and the structure is visible: the assistant opens by establishing what it is and what it is not, identifies the chief complaint, screens for additional concerns, then works the interview phase by phase — xưng hô chosen by the patient's age ("em" for a child, "anh/chị" for an adult, "bác/con" for an elderly patient). Pronoun register is not a nicety in Vietnamese clinical conversation; it is the relationship.

## The pipeline order matters

The workflow runs: define the patient and disease context → generate the consultation or QA artifact → normalize and review → split into the published configs. Design first, generation second, review before release. Better upstream structure produces better follow-up behavior, question quality, and safer consultation flow downstream — which is why persona work (see Meddies Persona) feeds this dataset rather than the reverse.

The review criteria are named on the card: completeness, appropriateness, naturalness, empathy, OPQRST quality, FIFE alignment, structural coherence, and safety. Deterministic fallback IDs, per-file and global duplicate checks, and parse-anomaly checks run on top.

## What the card does not claim

The public card is explicit that the full generation pipeline and reviewer setup are not published. That honesty cuts both ways: the documented review criteria make the card credible, and the unpublished internals mean you should treat this as **documented training data, not a finished benchmark artifact**. Run your own validation. Every downstream team should.

## Limits, unsoftened

This is synthetic training data; treat it that way. It is not licensed medical advice. The QA rows are not cited clinical guidance. The English and Vietnamese splits are different sizes (109K vs 58K) and should not be assumed balanced just because they share a repo. And a compact schema is not a patient chart — there is no medication list, no lab history, no encounter timeline behind these conversations.

For consultation behavior research — instruction tuning for Vietnamese-first assistants, evaluation of follow-up questioning and dialogue structure, bilingual transfer — that is what this release is for.

---

*Dataset: [Meddies/meddies-consultant](https://huggingface.co/datasets/Meddies/meddies-consultant) — 295,603 rows, 913 MB, CC BY-NC 4.0. Part of the [Meddies Consultant](https://huggingface.co/collections/Meddies/meddies-consultant) collection.*

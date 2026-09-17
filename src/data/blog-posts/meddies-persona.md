---
heroImage: "/assets/heroes/meddies-persona.webp"
title: "150,000 Vietnamese Patients Who Don't Exist"
date: "2026-09-16"
excerpt: "Meddies Persona: synthetic patient personas carrying province, dialect, economic tier, traditional-medicine use, and chief complaints in colloquial Vietnamese — because the population is the problem, not the add-on."
readTime: "8 min read"
tags: ["Meddies", "Clinical AI", "Synthetic Data"]
---

Two patients show why population variation has to come first in medical AI for Vietnam: a patient in Cao Bằng who speaks Nùng at home, farms for a living, is in the poorest economic quintile, has BHYT 100% insurance, prefers traditional medicine, and delays care — and a patient in District 1, Ho Chi Minh City with private insurance and an app for everything.

They should not be served by the same "Vietnamese healthcare LLM" if that model was trained on data that never distinguished them. The gap between those two patients is where clinical AI actually fails: wrong register, wrong assumptions about access, wrong priors about what the patient will do next. A model tuned only on urban, educated, Kinh-majority data will be useless or harmful for the rest of the country, and the failure will be quiet.

Meddies Persona is 150,000 synthetic Vietnamese patient personas built to carry that variation. That variation is the point, not metadata on top.

## What a persona holds

Each row is a structured patient, not a description string. The fields:

- **Demographics** — full name, gender, date of birth, marital status, **ethnic group and dialect** (Kinh with Giọng Bắc/Trung/Nam, Hoa with Triề Châu Teochew, Nùng An, Hmong Hoa, Khmer Krom), province and district, primary language.
- **Socioeconomic** — education, occupation, employment status, **economic quintile**, **BHYT insurance tier** (95%, 80%, 100%), household size, housing type, transportation access, **food security**.
- **Lifestyle** — smoking status, alcohol, diet quality, exercise frequency.
- **Medical history** — chronic conditions, past conditions with onset and resolution dates, surgeries, allergies, family history, all coded in ICD-10.
- **Healthcare behavior** — the fields that make this dataset Vietnamese: `healthcare_seeking_pattern` (including "Ưu tiên Đông y" — prefers traditional medicine — and "Trì hoãn", procrastination), `traditional_medicine_usage`, `health_literacy_level`, `self_medication_tendency`, `healthcare_paradigm_bias`, and `primary_care_preference` (trạm y tế xã, nhà thuốc, bệnh viện công, Đông y).
- **Medications** — current prescriptions with dose and frequency, *and* traditional medicines with their Vietnamese names: Cơm rượu, Giấm Táo, Ngũ Trảo (Chân Chim), Ô Tặc Cốt, Kim tuyến thảo.
- A **chief complaint and history of present illness written in colloquial Vietnamese** — "Mấy bữa nay tôi hay bị đau bụng và trướng bụng quá, ăn vô là thấy khó chịu." Not translated-from-English phrasing; the actual way a complaint sounds.

## Why the Đông y fields are load-bearing

A model that has never seen a persona with `traditional_medicine_usage: "Thường xuyên"` will not know what to do when a real patient asks whether they can skip their prescription because the herbal remedy is working. A model trained on personas where everyone has insurance will misjudge the patient counting cash for a private clinic. The healthcare-paradigm fields — preference for Eastern medicine, self-medication tendency, literacy level — are the difference between a dataset that describes Vietnamese bodies and one that describes Vietnamese patients.

This is also why the generation is structured, not freeform: deterministic faker seeds plus an LLM pass (schema v1.1.0), so the distribution across provinces, ethnicities, and economic tiers is a design output you can inspect, not an accident you inherit.

## Where it fits

The personas are the upstream layer of the Meddies data pipeline: they seed consultation generation (Meddies Consultant), red-team query generation (Meddies Patient Safety), and simulation work. Use them directly for persona-conditioned evaluation, dialogue-system testing, coverage analysis of a model's blind spots — or as the generative backbone for your own synthetic clinical data.

## The limits

Every persona is synthetic. No real patient data informed these rows, which is the privacy property that makes them shareable — and the ceiling on what they can tell you. Synthetic distributions smooth what real populations do in the edges; treat the counts as a designed prior, not an epidemiological measurement. And a persona is a compressed human: it can carry dialect and economic tier, but it cannot carry what it is like to be that person in a waiting room. The personas are for building and testing systems that will meet those people — not for claiming to understand them.

---

*Dataset: [Meddies/meddies-persona-vie](https://huggingface.co/datasets/Meddies/meddies-persona-vie) — 150,000 rows, schema v1.1.0, CC BY-NC 4.0.*

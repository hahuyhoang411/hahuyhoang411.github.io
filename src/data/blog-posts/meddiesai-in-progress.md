---
heroImage: "/assets/heroes/meddiesai-in-progress.webp"
title: "MeddiesAI: What In Progress Actually Means"
date: "2026-09-16"
excerpt: "Building clinical intelligence for Vietnamese hospitals — what exists, what doesn't yet, and why the research line came first."
readTime: "7 min read"
tags: ["Meddies", "Clinical AI", "Founder Notes"]
---

The Projects page lists MeddiesAI with the tag "In progress." I want to be precise about what that means, because in healthcare AI the label hides everything that matters.

In progress does not mean a demo with a landing page. It means the work is real enough to describe, young enough to change, and unfinished enough that publishing it as finished would be a lie in a domain where false certainty costs lives. A pharmacist writes this paragraph differently than a marketer would.

## Where it started

I trained as a pharmacist. Clinical pharmacy work is mostly small frictions: a dose that needs checking, an interaction nobody flagged, an instruction that gets lost between the prescription and the patient's kitchen table. The hard part of care is rarely one dramatic decision. It is dozens of small frictions, each one small enough to ignore until they stack into a readmission.

That is the shape of the problem I kept coming back to when I moved into language models. Most medical AI demos answer questions. Almost none of them work inside the seams where care actually happens: the handoff, the medication review, the note nobody finished, the coordination call that fell through. A model that does well on multiple-choice medicine but never shows up in those seams does not help where the work is.

## What MeddiesAI is

MeddiesAI is a clinical intelligence system for Vietnamese hospitals. The work brings four capabilities into those seams: clinical decision support, medication safety, documentation, and coordination.

The phrase that anchors the product is: clinical intelligence, beside every doctor. Not instead of the doctor. The division of labor is deliberate — the system handles research, evidence gathering, cross-checking, triage support, and the heavy background work that currently eats the hours a clinician would rather spend on the patient in front of them. Judgment stays with the doctor. The system's job is to make sure the doctor never decides alone on incomplete information.

Why Vietnamese hospitals specifically? Because medical AI learns from the data, workflows, and language of high-resource health systems, and if that is all it learns, it will keep serving best the places that are already served best. Vietnam is not a translation layer on top of an English product. The drug names, the dosing conventions, the referral patterns, the way a family participates in a consultation, the folk-medicine question a patient asks before accepting a prescription — all of that is load-bearing, and none of it ships inside a model trained somewhere else.

## Why the research line came first

An honest question: if the goal is a product, why did Meddies release seven datasets and a model before shipping anything?

Because in this domain the artifact you build is downstream of the evidence you can stand on. A clinical assistant trained on data that misrepresents Vietnamese patients is worse than no assistant, and you cannot inspect your way out of a training corpus problem after deployment. So the research line built the substrate, each piece answering a specific failure:

**Privacy came first.** No clinical data moves anywhere until de-identification works. Meddies PII v2 is a 350M encoder that finds nine identifier types across 17 languages and returns exact character spans, with an on-device browser demo so text never leaves the machine — scored 0.8937 exact typed F1 against six reference systems, and still documented with "keep a human in the loop" at the top of its card.

**Retrieval crosses languages.** Clinical questions do not respect language boundaries — a Vietnamese question can be answered by a Korean guideline. The embedding dataset generates queries whose language is drawn independently of the passage language, so cross-lingual retrieval is the design, not an afterthought.

**Knowledge and conversations at scale.** Meddies QA carries 2.9M Vietnamese medical question-answer pairs; Meddies Consultant adds 58,064 multi-turn Vietnamese consultations structured around how clinicians actually interview patients — the Calgary-Cambridge flow, FIFE, OPQRST — not single-shot prompts.

**Patients who exist in Vietnam.** 150,000 synthetic patient personas that carry province, dialect, economic tier, traditional-medicine usage, and a chief complaint written in colloquial Vietnamese. These fields are not decoration. A system tuned on personas that never worry about cost, never prefer Đông y, never code-switch between Vietnamese and an ethnic language will fail the moment it meets the actual population.

**And pressure before deployment.** Meddies Patient Safety is a red-team set of 22,336 Vietnamese patient queries probing five unsafe response modes, because the failure you did not write down is the one that reaches a patient.

Each artifact is public on [huggingface.co/Meddies](https://huggingface.co/Meddies). Each card states its limits. I keep those limits in the foreground because that is the operating condition for anything that touches clinical work.

## What exists, what does not

Exists: the research foundation above, in public, download today. The product idea, sharpened by every dataset decision and by clinician feedback.

Does not exist yet: the deployed hospital system. The pilots. The integrations with the actual documentation software running in Vietnamese wards. I am not going to describe those in a post about a thing that has not happened.

What exists in between: MedMeta, my benchmark with Benoit Favre and François Portet on whether LLMs can synthesize conclusions from medical meta-analyses. It found that even under ideal retrieval conditions current models sit near 2.7 out of 5, and that every model tested fails to reject negated evidence. That is not an obstacle to the product. That is the map of exactly where the product has to earn its trust.

## What in progress buys

Writing this in public, before the launch, locks in a few commitments that would be easy to quietly drop later:

- Every model and dataset that feeds MeddiesAI gets a public card, with limits stated in the first screen, not an appendix.
- Where real patient data cannot be shared, the artifacts are synthetic and labeled as such — and the pipeline that made them is documented, because a dataset without provenance is a liability in clinical work.
- No claim of clinical safety until the evaluation exists to carry it. The safety red-team set exists precisely so that "our model is safe" becomes a measured sentence instead of a hope.

The tag stays "In progress" until it isn't. When there is a deployed system to describe, this post gets a successor with the pilot results, the failure cases, and the parts of the vision that did not survive contact with a real ward. That post is the one I am writing toward.

---

*The research artifacts: [huggingface.co/Meddies](https://huggingface.co/Meddies). The company: [meddies.ai](https://meddies.ai). If you work in a Vietnamese hospital and want to argue with this roadmap — good, that is the review this work needs: [hoangha@meddies.ai](mailto:hoangha@meddies.ai).*

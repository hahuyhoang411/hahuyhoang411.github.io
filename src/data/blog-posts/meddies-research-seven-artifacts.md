---
heroImage: "/assets/heroes/meddies-research-seven-artifacts.webp"
title: "Seven Releases Before One Product"
date: "2026-09-16"
excerpt: "A map of the Meddies research line: privacy, retrieval, QA, consultations, personas, safety red-teaming, and speech — what each artifact answers and what none of them claim."
readTime: "5 min read"
tags: ["Meddies", "Clinical AI", "Datasets"]
---

> Author-review draft. Source-grounded working copy; not approved for publication.

Before a clinical AI system earns a place in clinical work, someone has to be able to answer seven questions in writing. Where did the knowledge come from? Can the text move safely? Can retrieval cross a language boundary? Can the model consult instead of answering? Does it know which patients exist in Vietnam? What happens when it is pushed? Can it hear?

The Meddies research line is seven public releases, each built to answer one of those questions. This post is the map: what each artifact is for, and — equally important — what the collection does not claim.

## The seven, in the order they were needed

| Release | The failure it answers |
|---|---|
| [Meddies PII v2](https://huggingface.co/Meddies/meddies-pii-v2) | Clinical text cannot move anywhere until identifiers are protected |
| [Meddies Embedding Data](https://huggingface.co/Meddies/meddies-embedding-data) | Retrieval that works only inside one language box |
| [Meddies QA](https://huggingface.co/Meddies/meddies-qa) | No large grounded Vietnamese medical QA corpus |
| [Meddies Consultant](https://huggingface.co/Meddies/meddies-consultant) | Training data that teaches answering, never consulting |
| [Meddies Persona](https://huggingface.co/datasets/Meddies/meddies-persona-vie) | Training data that describes Vietnamese bodies, not Vietnamese patients |
| [Meddies Patient Safety](https://huggingface.co/Meddies/meddies-patient-safety) | Unsafe response modes nobody wrote down as test cases |
| [Meddies ASR Synthetic Dialog](https://huggingface.co/Meddies/meddies-asr-synth-dialog) | Clinical speech in Vietnamese with almost no training data |

The order follows dependencies, not a publishing schedule. De-identification gates everything, because no corpus matters if moving it exposes a patient. Retrieval comes early because grounded answers require finding the right source, and clinical questions do not respect language boundaries. The knowledge layer (QA, Consultant) is grounded in real healthcare literature rather than scraped forums. Personas feed consultation generation and red-team query generation — a persona that carries province, dialect, economic tier, and Đông y usage is what makes a safety query feel like something a real patient would ask. And speech comes last because a clinical conversation is the hardest input for a recognizer and the most common form of actual clinical work.

Each release has its own write-up on this blog — [PII v2](/blog/meddies-pii-v2/), [embedding data](/blog/meddies-embedding-data/), [QA](/blog/meddies-qa/), [Consultant](/blog/meddies-consultant/), [Personas](/blog/meddies-persona/), [Patient Safety](/blog/meddies-patient-safety/), and [ASR](/blog/meddies-asr-synthetic-dialog/) — and each Hugging Face card states its limits on the first screen rather than in an appendix.

## What the cards say about themselves

The shared discipline across all seven: synthetic where real patient data cannot be shared, labeled as such; provenance recorded per row where provenance matters; and no clinical-decision claims anywhere. The patient-safety responses are LLM output, not clinician guidance, and the card says so before you download. The persona counts are a designed prior, not an epidemiological measurement. The ASR corpus is TTS audio and does not measure real hospital acoustics. Every one of those sentences is also on the cards. I repeat them here because they are the operating condition for anything clinical-adjacent.

## What the seven do not add up to

They do not add up to a deployed hospital system, and we have not claimed one. No pilots, no integrations with hospital documentation software, no clinical validation. The collection is the substrate: the evidence base, the data pipelines, and the failure modes written down before a product layer exists to inherit them.

There is also a benchmark paper in this line — [MedMeta](https://arxiv.org/abs/2605.09661) — which found that even under ideal retrieval conditions, current LLMs sit only slightly above average at synthesizing conclusions from medical meta-analyses, and that every model tested failed to reject negated evidence. That result is the reason this collection leans toward retrieval and grounding rather than model specialization alone.

If you build with any of these: read the cards, run your own validation, and report back what breaks. That is what public releases are for.

---

*All seven artifacts: [huggingface.co/Meddies](https://huggingface.co/Meddies). The company: [meddies.ai](https://meddies.ai).*

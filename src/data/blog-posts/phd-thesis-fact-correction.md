---
heroImage: "/assets/heroes/phd-thesis-fact-correction.webp"
title: "Correcting Scientific Facts in Language Models: A Thesis Plan, Not a Thesis"
date: "2026-09-16"
excerpt: "Three months into a PhD at Université Grenoble Alpes on explainable correction of scientific facts in LLMs — the question, why retractions, and what I do not know yet."
readTime: "8 min read"
tags: ["PhD", "AI Research", "Factuality"]
---

In October 2025 I started a PhD in Mathematics and Informatics at the Grenoble Computer Science Laboratory, Université Grenoble Alpes. The topic: explainable correction of scientific facts in large language models. This post is the plan I am working from, written down before the results exist, so that when they do, there is a record of what I actually expected versus what I found.

## The problem in one exchange

Ask a language model about a published finding, and it answers from a frozen snapshot of the literature. That snapshot contains everything the training data contained: the strong claims, the weak ones, the results that later failed to replicate, and — the case that interests me — the papers that were formally retracted.

A retraction is the sharpest correction science produces. It is not a nuance, not a reinterpretation. It is the community saying: this claim should no longer be relied on, here is why. And in practice, language models treat it as noise. The retracted finding and the standing one sit in the training distribution with nearly the same weight. Worse, a retraction is usually a small document about a big claim — the model has seen the claim stated a thousand times and the correction once.

So the question my thesis circles: when the ground truth of science changes, how do you correct a model — and how do you make the correction explainable, so a user can see what changed and why, instead of being asked to trust a silent update?

## Why "explainable" is doing work in that sentence

There are existing answers, and they all involve tradeoffs. Retraining on cleaned data fixes the model globally and explains nothing locally — the correction is real but invisible. Edit-based methods patch a fact at a specific location, and the patch is auditable but known to ripple in ways that are hard to bound. Retrieval grounding sidesteps the problem by never baking the fact in, which helps enormously, but leaves the parametric knowledge untouched underneath — and my own benchmark work made that gap uncomfortable to ignore.

Explainable correction sits in the middle: the model's stated answer should carry the state of the evidence with it. A corrected answer that just swaps one assertion for another is not enough for scientific text, where the reader needs to know that a conclusion changed, what the earlier belief was, and what evidence moved it. The correction should look less like a database update and more like how science itself communicates a revision — which is exactly what a retraction notice is.

## What MedMeta taught me about the terrain

My master's internship at LIG produced [MedMeta](/blog/medmeta-evidence-synthesis/), a benchmark co-authored with Benoit Favre and François Portet that tests whether LLMs can synthesize a conclusion from the abstracts of a medical meta-analysis. Two findings from it shape the thesis direction.

First, retrieval helps enormously and fine-tuning barely — grounding models in the right documents beat parametric recall across the board. Second, and more uncomfortable: in stress tests, every model we evaluated failed to identify and reject *negated* evidence. A statement with a "not" in the wrong place sailed through as support.

Both point the same way. The failure is not primarily in what models know; it is in how they handle the structure of evidence — including evidence that undermines a claim. If a model cannot hear a negation in a supplied abstract, it will not respect a retraction either, which is just a negation wearing formal clothes. That connection is the load-bearing hypothesis of the thesis: the mechanics of using retractions are a special case of evidence-level reasoning, and fixing them in one place should tell us about the other.

## The shape of the work

Three layers, in increasing ambition:

**Modeling how models use retractions.** Before correcting anything, measure the current behavior: given a question whose source paper was retracted, does the model repeat the retracted claim? Does providing the retraction notice change the answer? Does the model distinguish "results were wrong" from "methods were questioned" from "author misconduct"? There is no established benchmark for this in the scientific domain — building the measurement is a deliverable in itself.

**Correction methods with a visible trace.** The core of the thesis: correction mechanisms whose effect can be inspected — what fact changed, from what source, with what confidence — rather than a silent weight update. The explainability requirement is not decoration; it is what makes a correction trustworthy enough to ship in scientific and clinical settings, where an unexplained change in an answer is itself a red flag.

**Generalization beyond the correction.** A correction that works for one retracted claim and breaks on paraphrases, or that degrades the model's answers elsewhere, is not a correction. The evaluation has to cover the neighborhood of the edit, not just the edit.

## What I do not know yet

- Whether retraction-following behavior is one capability or several — a model can ignore a retraction, misapply it, or over-apply it and discard legitimate related findings. My guess is the failure modes separate, and each needs its own probe.
- Whether parametric correction and retrieval grounding will turn out to be complements or substitutes. MedMeta's evidence says retrieval wins today; the thesis question is whether that stays true as correction methods mature, or whether retrieval is currently carrying the entire load.
- How much of this transfers from scientific facts to clinical ones, where a "retraction" is often messier — a label change, a dosing update, a guideline revision. The clinical version is where my pharmacist's instincts keep pulling.

The honest summary: the question is fixed, the method is still forming, and the first measurement study is what the next months are for. Writing the plan down now is the cheapest way to make sure the eventual thesis answers a question and does not merely collect chapters.

---

*I am at [LIG](https://www.liglab.fr), Université Grenoble Alpes. The MedMeta benchmark that anchors the evidence side is on [arXiv](https://arxiv.org/abs/2605.09661).*

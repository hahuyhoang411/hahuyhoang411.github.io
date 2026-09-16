---
title: "Pensez: French Reasoning with 2,000 Curated Examples"
date: "2026-09-16"
excerpt: "A bilingual Qwen2.5 fine-tuning experiment, and why a small reasoning dataset is not the same thing as training a model on little data."
readTime: "3 min read"
tags: ["AI Research", "French", "Reasoning", "Fine-Tuning"]
---

> Author-review draft. Source-grounded working copy; not approved for publication. Benchmark figures are deliberately omitted pending reconciliation of the paper and model card.

Two thousand examples sounds small. For training a language model from scratch, it is. For changing how an already-trained model responds, it is a different question.

That distinction is where I want to start with Pensez. The project studies French-English reasoning through a small, curated fine-tuning dataset. It does not claim to build a language model's knowledge from 2,000 examples. The starting model already has a substantial training history. Pensez asks what a focused additional training set can change.

The [TALN 2025 paper](https://aclanthology.org/2025.jeptalnrecital-taln.35/), archived in the ACL Anthology, describes improvements in mathematical reasoning using 2,000 carefully selected bilingual examples. The [public model card](https://huggingface.co/HoangHa/Pensez-v0.1-e1) identifies the backbone as Qwen2.5-7B-Instruct and the dataset as 1,000 French examples and 1,000 English examples.

## What the examples are meant to teach

The card describes daily reasoning tasks and scientific questions, with a distinction between concise reasoning for simple requests and extended reasoning for harder mathematics, coding, and science problems. It also documents explicit `<think>...</think>` delimiters.

I find the distinction between short and extended responses more useful than the presence of the delimiters. A model can produce a long explanation without getting the answer right. Length is visible. Correctness takes work to check. Teaching a response format and improving problem-solving are related training goals, but they are not interchangeable evidence.

The bilingual design makes the language requirement explicit. French is part of the fine-tuning data, rather than only a language requested at inference time. That gives the experiment a concrete scope: adapt an existing instruction model using selected examples in both French and English, then evaluate the resulting behavior.

It does not, by itself, isolate why an improvement happens. Data selection, language balance, response structure, and the starting model all belong to the setup. The size of the dataset is one fact about the experiment, not a complete explanation of its results.

## Why I am leaving out a leaderboard table

The linked repository is the `e1` checkpoint, while its card also discusses later checkpoints and presents results across the series. A number appearing on that page is not automatically a result for the weights named in the URL.

The paper and card also need to be reconciled before quoting exact benchmark comparisons here. Rather than combine them into an apparently clean table, this draft keeps the supported high-level finding: the paper reports mathematical-reasoning improvements from small-data bilingual fine-tuning. It does not turn that into a claim that every checkpoint improves every task.

That restraint matters because specialization can involve tradeoffs. A reasoning result cannot stand in for general knowledge, language quality, or instruction-following. Those need their own measurements.

## What the small-data result means

My reading of Pensez is narrower than “less data is always better.” A useful behavior change may not require an enormous additional dataset when the starting model already has relevant capabilities. Carefully selected examples are worth studying on those terms.

The practical question is then specific: which behavior changed, on which evaluation, for which checkpoint? That is a more useful question than whether 2,000 is an impressive-looking number.

*Primary sources: [Pensez paper, TALN 2025](https://aclanthology.org/2025.jeptalnrecital-taln.35/) · [Pensez-v0.1-e1 model card](https://huggingface.co/HoangHa/Pensez-v0.1-e1) · [Pensez bilingual dataset](https://huggingface.co/datasets/HoangHa/Pensez-v0.1).*

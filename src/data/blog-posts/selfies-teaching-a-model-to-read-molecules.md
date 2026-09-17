---
heroImage: "/assets/heroes/selfies-teaching-a-model-to-read-molecules.webp"
title: "Pretraining a Molecular Encoder on 98,973,909 SMILES"
date: "2026-09-16"
excerpt: "SELFIES for a RoBERTa-style molecular encoder: why Robust Molecular Representation, what a nearly 99-million-molecule pretraining set buys you, and the discipline of publishing before the results section exists."
readTime: "3 min read"
tags: ["AI Research", "Chemistry", "Molecular ML", "Open Source"]
---

> Author-review draft. Source-grounded working copy; not approved for publication. Both linked repositories currently ship no model card; this post covers only what the repositories themselves state.

Two repositories, one project: [selfies-roberta-cls-mtlb-s3](https://huggingface.co/HoangHa/selfies-roberta-cls-mtlb-s3), a text-classification encoder, and [belka-smiles-pretrain](https://huggingface.co/datasets/HoangHa/belka-smiles-pretrain), a single-split pretraining corpus of 98,973,909 SMILES strings. Neither repo carries a card yet. What I can document today is the data, the representation, and the reasoning behind them.

## Why SELFIES before anything else

A SMILES string is a line notation for molecules, but plain SMILES has a property that makes it awkward for sequence models: many valid strings can describe the same molecule, and a small change to a string can describe something chemically impossible or outright invalid.

SELFIES — Self-Referencing Embedded Strings — is a robust alternative representation. Its design goal is that every generated string maps back to a valid molecule. For a language model, that changes the failure mode: the model cannot synthesize an unparseable molecule the way a character-level model over raw SMILES can produce syntactically valid but chemically meaningless strings. Working over SELFIES means the model is learning structure within a space that stays chemically meaningful.

The model name makes the stack explicit: SELFIES as the input representation, a RoBERTa-style encoder as the architecture, CLS pooling for sequence-level representation. The repo tags list `roberta` and text-classification; parameter count on the files page comes out around 88M, BF16. That is all observable today.

## What the pretraining set is

The model was pretrained from scratch, and the [belka-smiles-pretrain dataset card](https://huggingface.co/datasets/HoangHa/belka-smiles-pretrain) is minimal by design: one train split, one feature — `molecule_smiles` — 98,973,909 examples, about 8.18 GB uncompressed. The name points at BELKA, the Big Encoded Library for Chemical Activity Assessment, a large-scale protein-binding assay dataset. I am not going to narrate an internal pipeline I did not document at release time: no masking strategy, no tokenizer detail, no downstream task claims. Those belong on a card when I write one.

What I can say honestly: pretraining a molecular language model means exposing it to the diversity of real chemical space at scale. 98,973,909 unique-ish molecules is a very wide slice of chemical space, and wide unsupervised coverage is the usual reason to pretrain at all before any classification head is attached.

## Publishing before the card is done

This is the second release in a row where the weights ship before the documentation — the same order as ToolMaestro, and for the same reason: a dataset is a clean, single-purpose corpus, and a checkpoint is something someone can fine-tune and evaluate independently of anything I claim. An empty card is a debt I still owe, not a virtue. What justifies the order is that both artifacts are useful already.

The honest version of this post is that the interesting numbers — masked-language-model quality, downstream binding-prediction performance, comparison against sequence-based baselines — do not exist publicly yet. When the card lands, those are the sections it owes. Until then: representation, corpus, and the discipline of not writing a results section I cannot back.

*Primary sources: [HoangHa/selfies-roberta-cls-mtlb-s3](https://huggingface.co/HoangHa/selfies-roberta-cls-mtlb-s3) · [HoangHa/belka-smiles-pretrain](https://huggingface.co/datasets/HoangHa/belka-smiles-pretrain).*

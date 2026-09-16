---
title: "Vista: Building Vietnamese Image Descriptions as a Team"
date: "2026-09-16"
excerpt: "The Vista dataset and Vistral-V-7B pair Vietnamese visual instruction data with SigLIP, a projector, and Vistral. Image description is the target, not OCR."
readTime: "3 min read"
tags: ["AI Research", "Computer Vision", "Vietnamese", "Multimodal"]
---

> Author-review draft. Source-grounded working copy; not approved for publication.

A Vietnamese answer about an image has two ways to fail. It can describe the right thing awkwardly, or describe the wrong thing in excellent Vietnamese. A fluent response alone does not tell me which problem has been solved.

[Vista](https://huggingface.co/datasets/Vi-VLM/Vista) and [Vistral-V-7B](https://huggingface.co/Vi-VLM/Vistral-V-7B) address the data and model sides of that problem. Vista is the Vietnamese vision-language dataset. Vistral-V is the image-conditioned model built using it. Keeping the two names separate matters: a dataset release is not an evaluation result for a model.

This was Vi-VLM team work. The release credits Oanh Tran, Hop Bui, Hoang Ha, and Phuc Phan. I am writing about a shared contribution, not a solo model build.

## What Vista contains

The dataset card lists 706,634 samples across five subsets. Three cover LLaVA-style conversation, complex reasoning, and detailed description. The other two are Vi-ShareGPT4V and Vi-WIT.

The card documents Gemini Pro generation using few-shot, caption-based, and image-based prompting, plus translation for ShareGPT4V. Caption-based prompting uses captions and bounding boxes from the original data; image-based prompting uses images to create captions and conversations. The named sources are a Vietnamese version of COCO 2017, ShareGPT4V, and Wikipedia-based Image Text.

That is not training from text alone. Images and their associated information are central to the release. The different construction methods also mean the samples do not all carry the same kind of supervision. A translated description and a conversation generated from image context can teach different response patterns.

The card describes filtering for unwanted Han, Japanese, and Korean characters and high-perplexity samples. Those are curation steps, not proof that every remaining answer is visually correct. Generated descriptions can still inherit source biases or include details the image does not support.

## How Vistral-V uses the data

The model follows the LLaVA approach: a SigLIP image encoder, a projector connecting visual representations to the language model, and Vistral as the language component. The projector provides the interface between image features and language generation. Its presence does not establish that the model reasons correctly about every image.

The model card distinguishes projector pretraining from subsequent fine-tuning. Pretraining uses ShareGPT4V and a WIT subset from Vista. Fine-tuning uses Vista subsets for conversation, complex reasoning, and detailed description, with LoRA documented in the training settings.

Vistral itself is upstream work. The card explicitly acknowledges the Vistral development team, alongside LLaVA and SigLIP. Our multimodal release builds on those components; it should not absorb credit for them.

## Image description is not OCR

The model card describes image descriptions as the output and Vietnamese research as the intended setting. It also explicitly says the model was not trained on OCR tasks and may perform poorly on OCR and graph analysis. Factual knowledge correction was not a focus either.

I would not read a convincing scene description as evidence that the model can transcribe a document or interpret a chart. Those are separate tasks, and the release's own warning makes that boundary clear.

What I take from Vista is a concrete, inspectable attempt at Vietnamese multimodality: published training data, a documented component architecture, and a stated task limit. That is enough to describe the contribution without inventing a benchmark win.

*Primary sources: [Vista dataset card](https://huggingface.co/datasets/Vi-VLM/Vista) · [Vistral-V-7B model card](https://huggingface.co/Vi-VLM/Vistral-V-7B).*

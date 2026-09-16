---
title: "166 Gigabytes of Speech for a Language ASR Forgot"
date: "2026-09-16"
excerpt: "Meddies ASR Synthetic Dialog: doctor–patient consultations in Vietnamese, English, and Chinese — 22 scenario profiles, emotion that is spoken but never transcribed, and per-turn alignment for 15–30 second training windows."
readTime: "7 min read"
tags: ["Meddies", "Speech", "Clinical AI"]
---

A clinical conversation is the worst-case input for a speech recognizer. Two speakers, interruptions, false starts, hedging, code-switching, background noise from a real ward, and — in the Vietnamese case — an additional trap: a phonetic landscape where confusable syllables carry clinical weight. Yet speech is where a large share of clinical work actually lives: the oral handoff, the consultation, the phone follow-up. A clinical AI that cannot hear cannot help in the moments that are not typed.

Meddies ASR Synthetic Dialog attacks the data side of that problem. Synthetic doctor–patient consultations, generated with Fish Audio TTS (`s2.1-pro-free`, 16 kHz mono FLAC) over curated conversational voice registries — 75 English voices, 165 Chinese voices, with Vietnamese in the `vi_dialog` config — driven by **22 compositional scenario profiles** that vary expressiveness: disfluencies, emotion palettes, speed jitter, age-band casting, pause pacing. Target: 1,000 hours per language, 166 GB shipped so far.

## The design decisions worth stealing

**Emotion is spoken, never transcribed.** The generation embeds emotion and paralanguage markup that the TTS renders expressively, but the transcript is always clean `text_label` — the markup is deliberately *not* transcribed. The result is a systematic mismatch between expressive audio and clean text, which trains a recognizer to be robust to the way people actually talk: the sigh, the hesitation, the raised voice, none of which belongs in the reference transcript.

**Profiles are the ablation lever.** The `profile` column names which of the 22 scenario combos produced each dialog (`baseline` is the flat, pre-profile generation). That makes the corpus self-documenting for WER ablations: train on baseline, train on profiled audio, measure what scenario expressiveness buys you. Most synthetic speech datasets ship a single distribution and leave that experiment undone.

**Per-turn alignment is exact.** In the dialog configs, one row is one full consultation — long-form audio with a `segments` list where the last `end_s` equals `duration_s` exactly. Slice the segments for 15–30 second training windows without re-aligning anything. Pause-sampled turn gaps between speakers are baked in.

**The generation cursor is public.** `state.json` at the repo root holds per-language offsets and shipped hours — infrastructure, not data. For a dataset that grows over time, shipping the cursor means anyone can tell what was generated when, and a resumed run cannot silently duplicate or skip work.

## Configs and how to use them

- `vi_dialog` — Vietnamese turns with embedded 48 kHz FLAC; the HF viewer can play samples directly. Group by `conv_id`, sort by `turn` and `unit_index` to reconstruct a consultation; `parent_row_id` groups units from the same original turn.
- `{lang}_dialogs` (primary, growing) — one row per consultation, the format described above.
- `{lang}_utterances` (frozen, ~102 h) — one row per turn from the earlier pipeline. Still valid training data; no longer growing.

Generation parameters are documented on the card: prosody speed 0.9 ± profile jitter clamped to 0.7–1.15, temperature 0.55, top_p 0.6, 8 requests/second pooled.

## The honest frame

This is TTS audio — it trains recognizers, it does not measure them on real hospital acoustics. Room noise, overlapping speakers, clinical equipment beeping through a ward: none of that is in this corpus, and a model tuned only on clean synthetic speech will find that out the hard way. Voice registries are curated, not demographically exhaustive. And 1,000 hours per language is a target, with `state.json` as the honest record of how far along each language is.

For ASR research in Vietnamese clinical speech — where public training data barely exists — the alternative to synthetic generation is not a better dataset. It is no dataset.

---

*Dataset: [Meddies/meddies-asr-synth-dialog](https://huggingface.co/datasets/Meddies/meddies-asr-synth-dialog) — 166 GB, vi/en/zh. Part of the [Meddies ASR](https://huggingface.co/collections/Meddies/meddies-asr) collection.*

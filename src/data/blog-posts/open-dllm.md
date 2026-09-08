---
title: "Two Weekends, 23 Bugs, and a 144M Diffusion Language Model"
date: "2026-03-11"
excerpt: "From reading papers to training a 144M-parameter diffusion LLM on H100s. A deep dive into the bugs, optimizations, and lessons from building SmolDLM."
readTime: "12 min read"
tags: ["AI Research", "Diffusion LLM", "Deep Learning", "Claude Code"]
heroImage: "/assets/open-dllm/hero.webp"
---

I knew about diffusion language models for over a year. Read the [LLaDA](https://arxiv.org/abs/2502.09992) paper when it dropped in February 2025. An 8B parameter model matching LLaMA 3 on MMLU, but generating tokens in parallel instead of one at a time. Interesting. Bookmarked it. Moved on.

The gap between "I understand the concept" and "I can train one from scratch" felt enormous. Diffusion in continuous space (images) I understood. Discrete diffusion over token vocabularies? The math is clean: mask some tokens, predict the masked ones, weight the loss by how many you masked. But turning that into working training code meant understanding noise schedules, ELBO weighting, staircase attention masks, block-level KV caching, and a dozen other details that no single paper covers end to end.

Then Anthropic shipped Opus 4.5 paired with Claude Code, and I switched completely from IDE coding agents to the CLI. Took a few weeks to get comfortable with the workflow. But once it clicked, an idea started forming.

I'd been working on explainable LLMs. The best way to interpret a model is to train one yourself, end to end, so you understand every trick the trainer baked in, every layer of steering, every optimization choice. But training a standard autoregressive LLM is well-trodden ground. Why not try diffusion LLMs instead? I think they're the next step for language modeling in 2026-2027. Two weekends with 50 hours working non-stop, I had a 144M-parameter model training on H100s. Whether it actually learned anything useful is a different question. But I can now read a dLLM paper and know exactly where the bodies are buried.

<div class="image-container">
    <img src="/assets/open-dllm/hero_terminals.png" alt="Two weekends apart">
    <p class="image-caption">Phase 1: Shakespeare gibberish on a Mac. Phase 5: almost-coherent text on 8 H100s. Two weekends apart.</p>
</div>

---

## Why I Couldn't Do This Alone (and Why Claude Couldn't Either)

It wasn't me typing "build me a diffusion LLM" and watching code appear. And it wasn't Claude doing the hard thinking while I supervised.

I built a custom research skill, a structured workflow I call a "deep paper reader," that turns Claude into a proper paper analysis tool. Not summarizing abstracts. Full paper extraction: parsing every figure, tracing every equation back to its assumptions, cross-referencing claims against the actual experimental setup. When a paper says "our method improves by 8.8%," the skill forces Claude to check: on which benchmark, at what scale, with what baseline, and whether the comparison is fair.

This mattered because the diffusion LLM field in early 2026 is dense. Over a dozen papers making overlapping claims with incompatible notation. [MDLM](https://arxiv.org/abs/2406.07524) proves the whole thing is weighted MLM. [BD3-LMs](https://arxiv.org/abs/2503.09573) adds block structure. [Dream](https://arxiv.org/abs/2412.06264) introduces CART reweighting. [Quokka](https://arxiv.org/abs/2510.03280) publishes scaling laws. And many more. Each paper tells you a piece of the truth, and none tells you the whole picture.

Papers are written to persuade, not to document every implementation detail. So we cloned every repo we could find, the authors' code, community reimplementations, adjacent projects, and patched them together to crack the actual implementation. Reading one repo tells you what they did. Reading three tells you why. The intuition lives in the diff between implementations, not in any single one.

While Claude was coding each function, I used the time to read the full papers. The experimental sections, the appendices, the supplementary material. Every time, I found something Claude had abstracted over or gotten subtly wrong.

---

## Starting Small: A Toy dLLM in 640 Lines

Phase 1 was deliberately tiny. A ~10M-parameter character-level model on Tiny Shakespeare. Not because it would produce good output (it wouldn't), but because I needed to internalize five specific changes that turn a GPT into a diffusion LM:

1. **Vocabulary**: add a `[MASK]` token
2. **Attention**: bidirectional instead of causal
3. **Training**: randomly mask a fraction `t` of tokens, predict the masked ones
4. **Loss**: cross-entropy only on masked positions
5. **Decoding**: parallel confidence-based instead of left-to-right sequential

That's it. No new architecture. The same RMSNorm, RoPE, SwiGLU, tied embeddings. Five surgical modifications.

<div class="image-container">
    <img src="/assets/open-dllm/gpt_vs_dllm.png" alt="5 Changes: GPT to Diffusion LLM">
    <p class="image-caption">Same architecture: RMSNorm, RoPE, SwiGLU, tied embeddings. Five surgical modifications.</p>
</div>

I started by having Claude port code from Nathan Barry's [tiny-diffusion](https://github.com/nathan-barry/tiny-diffusion) repo, but not all at once. Step by step. One concept per iteration. I'd read the code, ask Claude to explain the design choice, trace it back to the paper, then move on.

Training took 20 minutes on my Mac. The model generated Shakespeare-flavored gibberish. But it trained. The loss dropped. Tokens appeared from noise. The core loop worked.

That's what Phase 1 taught me: a dLLM is not exotic. It's a masked language model with a principled noise schedule. The "diffusion" framing gives you a proper variational bound (ELBO) on log-likelihood, but the practical mechanism is: mask some tokens, predict them, weight the loss.

```
L = E_t[ (1/t) * CrossEntropy(predicted, original) | masked positions ]
```

The `1/t` weight upweights low-noise timesteps (few masks, hard predictions) and downweights high-noise timesteps (many masks, easy guessing).

And the decoding? Instead of left-to-right, the model starts from all `[MASK]` tokens and fills in the most confident predictions first:

```
Step 0:  [____][____][____][____][____][____]    all masked
Step 1:  [____][____][ , ][____][____][ . ]     punctuation first (highest confidence)
Step 2:  [ The][____][ , ][ the][ on ][ . ]     function words next
Step 3:  [ The][ cat][ , ][ the][ on ][ . ]     content words last
```

Punctuation before nouns. Function words before content words. The model reveals what it's *most sure about* first, the inverse of how humans write, but oddly intuitive once you see it.

---

## Scaling Up: Where the Bugs Start Teaching

Phase 2 added BPE tokenization, a cosine noise schedule, and ELBO weighting. Phase 3 introduced block diffusion: generating text in blocks of 32 tokens, each block conditioned on the previous ones via KV caching. Phase 4 scaled to 125M parameters with FlexAttention, GQA, the Muon optimizer, and DDP training.

And each phase broke in ways no paper warned about.

### The Staircase Mask: One Character Changes Everything

Phase 3's block diffusion uses a "staircase" attention mask. Each noisy block can attend to all the clean (already generated) blocks before it, but not to itself or future blocks. The attention mask looks like a staircase instead of a triangle.

My implementation used `>=` in the mask comparison. Should have been `>`.

Training loss looked excellent. Generation produced garbage.

The `>=` let each noisy block attend to the clean tokens *of its own block*. Label leakage. The model learned to copy answers instead of predicting them. Training curves showed a suspiciously low loss. Generation, which doesn't have clean tokens to copy, fell apart.

One character. `>` vs `>=`. No error message. No NaN. Just perfect-looking training and useless output.

This became the pattern: the most expensive bugs in diffusion LMs are silent correctness failures. The training loop doesn't crash. The loss looks reasonable. You only discover the problem when you generate, or worse, when you've burned hours of H100 time and the model hasn't learned what you expected.

<div class="image-container">
    <img src="/assets/open-dllm/staircase_mask.png" alt="Staircase mask bug">
    <p class="image-caption">One character difference in the mask condition. Red = label leakage (own block visible). Green = correct attention.</p>
</div>

### The ELBO Weight Bug: Days to Diagnose

This one cost me real time.

Phase 4 used a cosine noise schedule (mask probability follows a cosine curve). I copied the ELBO weight formula `1/t` straight from LLaDA's codebase. Loss plateaued at ~4.0 within the first few hundred steps. The model learned coarse structure but couldn't refine.

The bug: LLaDA uses a *linear* schedule where `mask_prob = t`, so `1/t = 1/mask_prob`. Trivially correct. My cosine schedule had `mask_prob = sin²(tπ/2)`, which is very different from `t` at the boundaries. At `t=0.1`: correct weight should be `1/0.024 ≈ 41`, but I was computing `1/0.1 = 10`. Low-noise timesteps, the ones where the model learns refinement, were underweighted by 4x.

The fix for Phase 4 was simple: use `1/mask_prob` instead of `1/t`. The permanent fix in Phase 5 was simpler: switch to a linear noise schedule where `mask_prob = t`, making the formula trivially `1/t` with zero ambiguity. Quokka's scaling laws confirmed linear outperforms cosine anyway.

The lesson I keep coming back to: **never copy loss formulas between papers without deriving them for your specific noise schedule.** Two papers using different schedules with the same weight formula means at least one is wrong for you.

<div class="image-container">
    <img src="/assets/open-dllm/elbo_weight_chart.png" alt="ELBO weight divergence">
    <p class="image-caption">Why copying 1/t from LLaDA into a cosine schedule underweights refinement by 4x.</p>
</div>

### Liger FLCE: When the Forward Pass Lies

Phase 5. The model is 144M parameters. The loss function uses [Liger Kernel](https://github.com/linkedin/Liger-Kernel)'s Fused Linear Cross Entropy, a memory-efficient fusion of the final linear layer and the loss computation.

Step 0: `loss = 19.11`. Correct. Expected range for ELBO-weighted loss at initialization.

Step 1: `loss = 19.10`. Step 100: `loss = 19.05`. Step 1000: `loss = 18.9`.

`grad_norm = 0.000000`. Every single step.

The forward pass computed correct loss values. The backward pass returned zero gradients. Liger's `FusedLinearCrossEntropyFunction` with `reduction='none'` has a broken backward, [a known issue](https://github.com/linkedin/Liger-Kernel/issues/488) from December 2024 that hadn't been fixed.

The autograd graph was connected. `loss.requires_grad = True`. The gradient function was `DivBackward0`. Everything *looked* fine. The model just never learned, and the loss drifted down by a hair from weight decay alone.

I burned compute before catching it. The fix: chunked cross-entropy with gradient checkpointing, processing 16,384 tokens at a time (~1.5 GB peak) instead of materializing full logits (24 GB). But the real fix was adding `grad_norm` logging at step 0. Zero grad norm means broken backward. Full stop.

```
step 0   | loss 19.11 | grad_norm 0.000000 | tok/s 185234
step 1   | loss 19.10 | grad_norm 0.000000 | tok/s 189012
step 2   | loss 19.10 | grad_norm 0.000000 | tok/s 188445
...
step 100 | loss 19.05 | grad_norm 0.000000 | tok/s 189201
```

*The loss looks like it's decreasing. It's not learning. That's weight decay.*

---

## 10 Hours on Optimization

H100s cost ~$3.95/hour/GPU. Quokka's scaling laws say dLLMs need 5x more data than autoregressive models at 144M parameters. Every 10% throughput improvement saves real money over a multi-day run. So we spent about 10 hours on nothing but performance engineering.

**The streaming data disaster.** Phase 5's first training attempt used streaming data from HuggingFace: load, tokenize, feed to the model on the fly. Throughput: ~50K tokens/second/GPU. On H100s. I'd known for years that pretokenizing to disk and memory-mapping is standard for large runs, but I'd spent so long doing SFT (where streaming is fine) that I'd forgotten it matters at billion-token scale.

**The optimization gauntlet.** The autoregressive training community has spent years squeezing every FLOP out of their loops. `torch.compile`, FlexAttention, Liger kernels. So I asked Claude to apply them all. What followed was a parade of failures (you can count them in our `lessons.md`). FlexAttention + gradient checkpointing + whole-model compile = CUDA MMU fault. Liger FLCE = zero gradients. Compile mode `reduce-overhead` = OOM. Each failure taught us something about how these tools interact in ways their individual docs don't warn you about.

**The FP8 saga.** I knew H100s support FP8 training. Nearly free compute savings. Asked Claude to implement it. It immediately tried to write a custom FP8 implementation from scratch. Didn't work. I pointed it at Karpathy's [nanochat](https://github.com/karpathy/nanochat) example. Second attempt: Claude tried to "improve" on the reference. Also didn't work. There's a pattern with Claude. It's like a mischievous kid who really wants to do things its own way. Third time, I was explicit: copy nanochat's FP8 implementation, modify only what's necessary to fit our model structure, do not get creative. Worked flawlessly. 240 Float8Linear layers across 30 blocks. I could have just copy-pasted the code myself. But the whole point was to battle-test Opus's ability to adapt a reference implementation to a different codebase. I wanted to guide, not do the work.

> Guiding AI is a fundamentally different skill than coding. It's also the one that scales. I can write the code myself, but so can Opus. What Opus can't do yet is learn from failure without being told. That's my job.

**The counterintuitive findings.** Once everything compiled:

*Gradient checkpointing made things slower.* On H100 with our 144M model, the GPU is compute-bound, not memory-bound. Without checkpointing: max batch = 28, throughput = **55,786 tok/s**. With regular checkpointing: max batch = 160, but throughput = **16,648 tok/s**. The 5.7x larger batch couldn't compensate for recomputing 30 layers of forward activations.

SAC (Selective Activation Checkpointing) was worst of both worlds: still recomputes enough ops to slow down, saves enough memory that the larger batch barely helps. **22,087 tok/s** at batch 40.

*Per-block compile, not whole-model compile.* The fix from Meta's torchtitan: compile each transformer block individually, so the checkpoint wrapper stays outside the compiled boundary. Whole-model compile + FlexAttention + gradient checkpointing = GPU hard crash.

Final configuration on 4×H100: **189K tokens/second**, 57.9 out of 85 GB VRAM per GPU. No gradient checkpointing. Per-block compile. FP8. Document packing (no padding waste, every token is real data). We later scaled to 8×H100 for the extended training run.

<div class="image-container">
    <img src="/assets/open-dllm/throughput_chart.png" alt="Throughput comparison">
    <p class="image-caption">Bigger batch does not equal faster training. On H100 at 144M params, the GPU is compute-bound.</p>
</div>

---

## What I Learned About AI-Assisted Research

Over two weekends, Claude and I cross-referenced over 80 papers and technical sources on diffusion LMs. I packed the findings, the code, and the full education path into [the repo](https://github.com/hahuyhoang411/SmolDLM). Five phases, from `python hello_diffusion.py --train` on a laptop to H100 clusters.

Three things surprised me about working this way.

**Read the papers yourself.** While Claude was coding a new phase, I'd read the full paper. Not the abstract, not Claude's summary. The actual paper. Every time, I found something Claude had abstracted over or gotten subtly wrong. A footnote about schedule dependency in BD3-LMs that changed how clipped schedules should work. A figure in Quokka that showed linear schedule beating cosine at all scales, not just the cherry-picked comparison in the text. The ELBO weight bug itself came from copying LLaDA's `1/t` without checking that their linear schedule makes it trivially correct while our cosine schedule doesn't.

**The debugging pattern is always the same.** 23 documented bugs across five phases. Three of them (the staircase mask, the ELBO weight, and the Liger backward) were silent correctness failures. Claude and I diagnosed them together, but the critical sequence was always: notice something wrong in the output, form a hypothesis, trace through the code, verify against a reference implementation, fix, test. Claude could do each step 10x faster than me. But knowing *which* step to take next was usually me.

**Match the constraint to the novelty.** Give Claude a clear, bounded task ("port this specific function from nanochat, adapt only the variable names") and it executes flawlessly. Give it an open-ended task ("implement FP8 training") and it'll reinvent the wheel three times before you can convince it to just copy the working reference. For well-solved problems, copy and adapt. For novel problems (dLLM-specific noise schedules, staircase masks), let Claude explore.

<div class="image-container">
    <img src="/assets/open-dllm/phase_evolution.png" alt="SmolDLM: 5 Phases">
</div>

---

## The Honest Results

Phase 5 trained for 1,500 steps initially. Loss went from 19.11 to 3.36. The model learned language structure by step 750, generating coherent openings like "Vietnam, officially..." before degenerating into repetition.

So we kept training. By step 25,000, the first benchmark numbers came in.

<div class="image-container">
    <img src="/assets/open-dllm/training_curve.png" alt="SmolDLM-144M Training Run">
    <p class="image-caption">8×H100, 25.5K steps, ~26B tokens. Loss, gradient norm, and throughput over full run.</p>
</div>

| Task | Step 2,000 | Step 25,000 | Change |
|---|---|---|---|
| hellaswag | 27.0% | 30.0% | +3.0 |
| piqa | 55.5% | 52.5% | -3.0 |
| arc_easy | 27.5% | 29.0% | +1.5 |
| commonsense_qa | 22.5% | 28.5% | +6.0 |
| lambada_openai | 17.5% | 21.5% | +4.0 |
| bigbench_qa_wikidata | 6.5% | 16.0% | +9.5 |
| boolq | 56.0% | 50.0% | -6.0 |
| copa | 51.0% | 45.0% | -6.0 |
| **CORE (aggregate)** | **0.0650** | **0.0656** | **+0.0006** |

The aggregate CORE score barely moved. Some tasks climbed (wikidata +9.5, commonsense +6.0). Others dropped (boolq -6.0, copa -6.0). HellaSwag went from 27% to 30%, still far from [SmolLM2-135M](https://huggingface.co/HuggingFaceTB/SmolLM2-135M)'s 42%.

Loss went down. Benchmarks didn't follow. We've pushed past Quokka's compute-optimal estimate for dLLMs at 144M (~15B tokens) with ~26B tokens seen. Whether that means the eval tasks need different capabilities than what loss measures, or whether it means something more fundamental about the architecture at this scale, I genuinely don't know.

**Generation samples** (prompt: *"Vietnam, officially"*, temperature=0.8, 15 denoise steps):

| Step | Output |
|------|--------|
| 250 | *Vietnam, officially on the front of the and the former of form of the concludes the one of the traded acting of the front of the...* |
| 1,000 | *Vietnam, officially established the importance of the power of thea in 1959, included the founder of the Government of the peace...* |
| 5,000 | *Vietnam, officially opened in 2000, and in 2010, the recognizeds published the was an,.21 2007, 2018, 2020, 2022, 2023...* |
| 15,000 | *Vietnam, officially officially recognized as the Republic of the Democratic Republic of Vietnam, is the largest to of the the of of...* |
| 25,500 | *Vietnam, officially recognized at the beginning of the 2020s, is the author. of1 commitment The of the in0 World as the beginning...* |

Step 250: pure noise. Step 1,000: grammar emerges but facts are wrong. Step 15,000: gets the country right, structures a real sentence, then collapses into repetition. Step 25,500: slightly better coherence, still degenerates.

I started this project knowing the concept of diffusion LLMs but unable to train one. Two weekends and 50 hours later, I have a training pipeline that works, 23 bugs that each taught me something papers don't say, and benchmark numbers that are honest but humbling.

The code is open. The bugs are documented. The run continues.

Stay tuned for Episode 2. I don't know if more tokens will close the gap or reveal a ceiling. But I'll find out.

---

*All code, training logs, bugs, and research notes: [github.com/hahuyhoang411/SmolDLM](https://github.com/hahuyhoang411/SmolDLM)*

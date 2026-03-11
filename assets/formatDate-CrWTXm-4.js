import{c as g}from"./index-DUXVjAwP.js";const m=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],T=g("clock",m),w=`---
title: "How I Built a Personal Blog with LLMs (Part 1)"
date: "2025-01-23"
excerpt: "Join me on my journey from pharmacist to web developer, using AI as my buddy."
readTime: "7 min read"
tags: ["AI Tools", "Web Creation", "Beginner Friendly", "How To"]
heroImage: "/assets/how-to-web-1/bg.webp"
---

## Introduction

Honestly, my tech skills peaked at Python code and dabbling in AI. Web development? JavaScript? HTML? CSS? Those were like ancient hieroglyphs to me – utterly foreign. But, you know what? Curiosity got the better of me. I wanted my own little corner of the internet, a website to call my own. And I had a hunch: maybe, just maybe, AI could be my digital construction crew. So, I took the plunge.

In this series, I'm your average blank slate, sharing my journey from "How to build a website?" to (hopefully) a functional website. I'll be documenting everything – how I pester Large Language Models (LLMs) for web dev wisdom, the prompts I use, the tools I stumble upon, and all the glorious (and perhaps embarrassing) moments in between. The goal for Part 1? Build a basic website that can house this very blog post. Let's get our hands virtually dirty!

---

## Research: Asking the Oracle (aka Perplexity)

Since I was starting from absolute zero, I went straight to the digital oracle, [Perplexity](https://www.perplexity.ai/). Think of Perplexity as a search engine on AI steroids. It combines the power of LLMs with up-to-date search capabilities, breaking free from the limitations of internal knowledge. This means it can provide the latest information and best practices.

<div class="image-container">
    <img src="/assets/how-to-web-1/perplexity.webp" alt="Perplexity AI interface">
    <p class="image-caption">Perplexity AI interface - My first step into web development</p>
</div>

Perplexity suggested I use \`Jekyll\`, a static site generator. A quick Google search led me to [GitHub Pages](https://pages.github.com/), which offers a straightforward way to set up a Jekyll site. I followed the instructions, and *BAM* – I had my first-ever website! It was basic, sure, but it was mine.

> Well, the funny thing is, my excitement about having my first website washed 'Jekyll' away-I ended up not using Jekyll after all.

<div class="image-container">
    <img src="/assets/how-to-web-1/init.webp" alt="First website screenshot">
    <p class="image-caption">My first GitHub Pages website - Simple but exciting!</p>
</div>

## Building the Website's Skeleton: Enter Cursor, My AI Coding Buddy

Now that I had a webpage, it was time to bring in the big guns. I imported my repository into [Cursor](https://www.cursor.com/), an AI-first code editor. The beauty of Cursor is that it lets you chat with an AI about your entire codebase, giving it the context it needs to be truly helpful. As a wise person once said:

> "Context is key for LLMs."

By feeding my entire repo to the AI, I ensured it could give me the most relevant and accurate answers. And the best part? I could just chat with the LLM, and it would handle all the coding – I just had to hit "Accept." How cool is that?

From my understanding, Cursor defaults to the \`Claude Sonnet 3.5 model\`, which, in my humble opinion, is [one of the best coding models out there](https://web.lmarena.ai/leaderboard) right now.

I asked Cursor to generate a complete website codebase from scratch, and it delivered spectacularly. Not only did it create the entire file structure, but it also generated all the necessary files like \`index.html\`, \`style.css\`, and more. Here's a snippet of what the conversation looked like:

<div class="image-container">
    <img src="/assets/how-to-web-1/cursor-1.webp" alt="Cursor AI conversation">
    <p class="image-caption">Chatting with Cursor AI to generate the website structure</p>
</div>

Each file came pre-populated with clean, modern code following web development best practices. Here's what the initial website looked like:

<div class="image-container">
    <img src="/assets/how-to-web-1/first.webp" alt="Initial website design">
    <p class="image-caption">The first version of my website with basic styling</p>
</div>

---

## Fine-Tuning the Elements: Inspiration from Squarespace

Next, I went on a little field trip to find some design inspiration. I browsed through website templates on [Squarespace](https://www.squarespace.com/) and fell in love with their [two-column layout](https://www.squarespace.com/templates/palmera-fluid-demo) for blog posts. I took a screenshot of the template and fed it to Cursor, asking it to replicate the layout.

<div class="image-container">
    <img src="/assets/how-to-web-1/cursor-2.webp" alt="Squarespace inspiration">
    <p class="image-caption">Squarespace template that inspired the two-column layout</p>
</div>

I simply sat back, sipped my tea, and watched the magic happen. In less than 30 seconds, AI generated the code of the template:

<div class="image-container">
    <img src="/assets/how-to-web-1/end-1.webp" alt="Final website design">
    <p class="image-caption">Squarespace template that inspired the two-column layout</p>
</div>

---

## The Final Touch: Adding Images to Spice Things Up

Alright, let's be real, I can't draw to save my life. So, naturally, I turned to AI again to create some visuals for me. I used a model called [Flux](https://github.com/black-forest-labs/flux), which is currently considered one of the best image generation models out there, and guess what? It's completely free! I accessed the model through the [Flux website](https://www.fluxpro.ai/), which generously gives you six free image generations per day.

Here's the prompt I used. I'm not exactly a prompt engineer (yet!), so it might be a bit clunky.

> Create a image with pastel color palette with a background a green background cloud sky. The main character is a chibi pharmacist in green dinosaur costume is exploring a computer with tools. In the computer screen is displaying medical.

But after a few tries, I got this result:

<div class="image-container">
    <img src="/assets/how-to-web-1/img-gen.webp" alt="Final website design">
    <p class="image-caption">Image generation is so good these days!</p>
</div>

As for the background image in the post, well, I tried generating one with Flux, but let's just say the results weren't exactly wallpaper-worthy. So, I took the easy route and grabbed a beautiful image from [Unsplash](https://unsplash.com/), a website I often use for stunning, free-to-use photos. They have got a ton of beautiful picture that can be used as wallpaper or background.

And here is my final result:
<div class="image-container">
    <img src="/assets/how-to-web-1/end-2.webp" alt="Final website design">
    <p class="image-caption">The final result after 30 minutes of AI-assisted development</p>
</div>

---

## What's Next?

Well, today I achieved my initial goal – creating a basic platform to host my blog posts. Join me in Part 2, where I'll continue to refine the UI and make it even more visually appealing. We'll dive deeper into design, explore more AI-powered tools, and maybe even learn a thing or two about actual web development (gasp!). Stay tuned!

---

## Related Articles
- [A Pharmacist's Journey to Building a Website with LLMs (Part 2)](#)
- [How I Built a Personal Blog in 30 Minutes Using AI (No Code Needed)](#)
`,f=`
---
title: "How I Built a Personal Blog with LLMs (Part 2)"
date: "2025-01-25"
excerpt: "Join me on my journey from pharmacist to web developer, using AI as my buddy."
readTime: "8 min read"
tags: ["AI Tools", "Web Creation", "Beginner Friendly", "How To"]
heroImage: "/assets/how-to-web-2/bg.webp"
---

## Introduction

Oh, the sweet taste of victory after launching my first website! I was riding high, thinking I'd cracked the code and that building a website with AI was a piece of cake. I dove headfirst into milking every last drop of AI power to create this very site. But then, reality hit. Roadblocks appeared. My naive optimism took a nosedive. "Buddha, my inexperience," I lamented. But hey, every cloud has a silver lining. I'm actually learning a few things along the way, and dare I say, it's becoming kinda fun! No more dilly-dallying, let's jump in!

My self-imposed missions for today included:

*   Write code to render Markdown for my blog posts.
*   Create tags for topics and series to better organize my blog.
*   Add some fancy hover effects because, you know, professionalism (or so I thought).
*   Create a website logo.

---

## Writing Code to Render Markdown

I've dabbled in blogging and documentation before, using frameworks like [Docusaurus](https://docusaurus.io) and [Nextra](https://vercel.com/templates/next.js/documentation-starter-kit). I mostly just wrote in Markdown. So, naturally, I thought, "This website? Markdown will do just fine!" Oh, how wrong I was. Turns out, those previous sites were beautifully crafted by other Frontend Engineers, so when jobs got to my hand, I only had to worry about the Markdown. I was shocked when I opened my first blog post.

<div class="image-container">
    <img src="/assets/how-to-web-2/starting.webp" alt="Initial blog post rendering">
    <p class="image-caption">My first blog post - a raw, unrendered mess</p>
</div>

But, as the saying goes, "Everyone starts somewhere." With that mantra in mind, I started squeezing Cursor to write the rendering code for me.

<div class="image-container">
    <img src="/assets/how-to-web-2/cursor-1.webp" alt="Asking Cursor to render Markdown">
    <p class="image-caption">Me, shamelessly asking Cursor to do the heavy lifting</p>
</div>

Boom! Cursor whipped up the code in a mere 10 seconds. I used the command \`python3 -m http.server 8000\` to preview my masterpiece locally before pushing it to the live site. The result? Pretty darn good, if I do say so myself.

<div class="image-container">
    <img src="/assets/how-to-web-2/result-local.webp" alt="Local preview of rendered Markdown">
    <p class="image-caption">Looking good on my local machine!</p>
</div>

Feeling confident, I pushed my changes to GitHub Pages. And this, my friends, is where the real headache began. For some inexplicable reason, my live site kept throwing a \`404 error\`. I scratched my head, I asked Cursor, I pleaded, but the model was stumped. It kept insisting I had the wrong file paths, but I checked and double-checked – that wasn't the issue.

I spent over 40 minutes going back and forth, my stubbornness battling the model's. It stubbornly claimed I had the wrong paths; I stubbornly insisted I'd fixed them. My patience was wearing thin. It was time for human ingenuity to step in.

[youtube](https://youtu.be/6ifjhcFK5Oc "Epic Debugging Session" Epic conversation, zero solution! 🤦‍♂️)

I traced the bug using my browser's "web inspector," captured the error, and threw it back at the model, along with some sweet-talking prompts. I even promised it $200 if it did a good job (a harmless white lie, of course – I'm broke!).

<div class="image-container">
    <img src="/assets/how-to-web-2/404-error.webp" alt="404 error screenshot">
    <p class="image-caption">The dreaded 404 error - my nemesis</p>
</div>

Finally, the model saw the light! Turns out, GitHub Pages defaults to rendering with \`Jekyll\`, which clashed with the JavaScript code the model had generated for my Markdown renderer. The solution? A simple \`.nojekyll\` file.

> This highlights that even a clueless dev like me can find answers with AI, but a dev who understands the underlying concepts can leverage AI much more effectively.
> But hey, "all roads lead to Rome", right? Thanks, AI, for getting me through this hurdle!

---

## Creating Tags for Topics and Series

With the major error out of the way, things got smoother. I moved on to creating tags for topics and series, making future management easier. Here's how I lazily directed the model to do what I wanted. I drew a rough sketch of my vision and asked the model to make it a reality.

<div class="image-container">
    <img src="/assets/how-to-web-2/cursor-2.webp" alt="Asking Cursor to create tags">
    <p class="image-caption">My "brilliant" sketch and instructions for Cursor</p>
</div>

The model did a pretty good job. After a few rounds of "You missed something, AI, fix it!" we finally had a result I was happy with.

<div class="image-container">
    <img src="/assets/how-to-web-2/result-tags.webp" alt="Final tags design">
    <p class="image-caption">The tags, in all their glory</p>
</div>

> I noticed that as the codebase grew more complex, the model started showing signs of code omissions, likely due to not grasping the entire repo's context.

---

## Adding Hover Effects to the Website

After browsing some websites, I noticed they had cool hover effects that slightly expanded thumbnail images. So, I asked the model to add a similar effect to my site.

<div class="image-container">
    <img src="/assets/how-to-web-2/hover.webp" alt="Asking Cursor to add hover effect">
    <p class="image-caption">Me, demanding hover effects like a design pro</p>
</div>

Everything worked smoothly, so I pushed my luck and asked Cursor to add the same hover effect to the tags. After a bit of back-and-forth, the model delivered exactly what I wanted.

[youtube](https://youtu.be/4WBV049w-qk "Hover Effects Demo" Hover effects in action - so smooth!)

---

## The Final Task: Creating a Logo

Phew, this post is getting long! I was about to wrap it up, but then I realized my website was missing a logo – it looked kinda naked. So, just like in my [previous post](), I used [Flux](https://www.fluxpro.ai/) to generate a logo. Here's the prompt I used, which resulted in a super cute logo:

> Create an image with a pastel color palette with a background of a green cloud sky. The main character is a chibi pharmacist in a green dinosaur costume exploring a computer with tools. In the computer screen is displaying medical.

<div class="image-container">
    <img src="/assets/how-to-web-2/gen-logo.webp" alt="Generated logo">
    <p class="image-caption">My adorable, AI-generated logo</p>
</div>

---

## What's Next?

And so, after nearly three hours of tweaking, chatting with AI, almost losing my mind, and debugging, my website is finally taking shape. Join me in blog post 3, where I'll continue refining the UI for a smoother user experience and tackle the domain. Stay tuned!

---

## Related Articles

*   [A Pharmacist's Journey to Building a Website with LLMs (Part 1)](#)
`,b=`---
title: "How I Built a Personal Blog in 30 Minutes Using AI (No Code Needed)"
date: "2025-06-14"
excerpt: "Want to create your own blog without writing code? Here's how I used an AI assistant and a tool called Lovable to get my personal website live - in under 30 minutes!"
readTime: "6 min read"
tags: ["No Code", "AI Tools", "Web Creation", "Beginner Friendly", "How To"]
heroImage: "/assets/how-to-web-3/bg.webp"
---

## Introduction

Hey friends 👋 - it's been a while since my last post! Today, I’m continuing my little series: **“A Pharmacist's Journey to Building a Website with LLMs”**. In the first two parts, I experimented with basic AI coding assistants like Gemini - mostly by copy-pasting code manually. I also explored more advanced tools like Cursor and Trove IDE.

But let’s be honest - even those tools can feel overwhelming if you’re coming from a non-coding background.

That’s why in this post, I want to share a **simple no-code approach** that helped me build a personal blog in just 30 minutes. Yes, **no code, no stress**, and still using AI. Let’s go! 🚀

---

## So, How Does It Work?

Let me introduce you to **[Lovable](https://lovable.dev/)** – a text-to-app platform that helps you build full-fledged web apps just by chatting with an AI. No programming knowledge required.

> ✨ Imagine talking to ChatGPT, but instead of getting a response, you get a live website!

![Lovable UI](/assets/how-to-web-3/lovable-ui.webp)

Sounds like magic? Almost. But there are a few things you should know to make it work *well* - and avoid wasting those precious free credits (Lovable gives you 5 free generations/day).

---

## Step-by-Step Guide

### 1. Start with a Clear Idea

Before you jump in and start chatting with the AI, take 5 minutes to plan your blog.

Think about:

- What pages do you want? (Home, About Me, Blog, Contact…)
- What content do you want to show?
- What style or vibe fits your personality?

👉 If you’re out of ideas, check out [SpaceSquare](https://spacesquare.io/) or [Lovable Examples](https://lovable.dev/)- it offers beautiful templates that you can use for inspiration.

---

### 2. Use ChatGPT to Write a Prompt

Now open ChatGPT (or any AI assistant you like) and ask it:

> _"Can you help me write a detailed prompt for AI coding assistant to create a personal blog website?"_

You’ll get something like:

![Example Image](/assets/how-to-web-3/chatgpt-prompt.webp)

Copy that prompt and paste it into Lovable. Boom - you’ll have a basic website skeleton ready in seconds.

---

### 3. First Draft of the Website

Once you’ve crafted your prompt with the help of ChatGPT, paste it into the **Lovable chat**, and let the magic happen.

Seriously — just sit back, grab a cup of tea ☕, and let the AI do its thing.

You’ll get a working website draft in a few moments. It might not be *perfect*, but that’s totally fine. The next step is just a matter of chatting with the AI again:

- Want to change a section layout? Tell it.
- Want to add a photo? Just ask.
- Something looks off? Be specific.

> 🧠 **Pro tip**: *Context is everything.* The more clearly you explain what you want, the better the results you'll get.

Here’s a quick demo video to show how it works:

[youtube](https://youtu.be/qoKaCdYoF2Q "Using Lovable" Watch how I chat with AI to build a full website – no code, just conversation 💬)

---

### 4. The Trick: Don’t Stop There

Lovable will generate a site, but the content will be… very generic. You'll need to **edit it** to make it your own.

Instead of burning more free generations on minor tweaks, here’s the smarter move:

#### 👉 Connect to GitHub

- Click the **GitHub** button (top-right corner).
- Connect your GitHub account (if you don’t have one, it's easy and free to create).
- Lovable will push your project code to a private GitHub repo.

> 🧠 Bonus: GitHub isn’t just for coders - it’s a place to manage your project like a pro. Welcome to your first step into the world of devs 😉

#### Edit Content in VS Code (Online!)

Once the repo is set up, Lovable gives you a button: **“Edit in VSCode”**. Click it, and voilà - a cloud editor opens with all your website files.

Want to change some text? Just:

- Click the **magnifying glass** icon on the left
- Search for the text you want to edit
- Replace it with your own content
- A **branch** icon will blink up - click on it
- Add a message (e.g. "update") to the box and hit **Commit & Push**

You don’t need to understand the code. Just look for the content, and update what you need.

[youtube](https://youtu.be/-Aapf-0w3KQ "Customize with Github VSCode" Editing made easy: Customize your website content directly in VSCode via GitHub)

---

### 5. Publish Your Site

You’ve got two options to go live:

- **GitHub Pages** (check my [first blog](#) for a guide)
- **Lovable's built-in Publish** button - super simple, gives you a link right away

Choose whatever works best for you!

---

## Quick Tips

- ✅ Change the **favicon** by replacing the file in \`/public/favicon.ico\` with your own (you can convert any image to \`.ico\` format online)
- ✅ Make small tweaks in VSCode rather than re-generating the whole app
- ✅ Back up your edits with GitHub - just in case something breaks

---

## Conclusion

That’s it! 🎉 You’ve just created your own blog using AI - without writing a single line of code. Whether you're a complete beginner or someone exploring faster workflows, this approach is a fun, flexible, and beginner-friendly way to create your online presence.

Let me know if you try it out, or if you run into any trouble - happy to help!

Good luck, and keep building 💪

---

Happy blogging! ✨  
– *From a pharmacist who now loves AI tools*
`,y=`---
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

1. **Vocabulary**: add a \`[MASK]\` token
2. **Attention**: bidirectional instead of causal
3. **Training**: randomly mask a fraction \`t\` of tokens, predict the masked ones
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

\`\`\`
L = E_t[ (1/t) * CrossEntropy(predicted, original) | masked positions ]
\`\`\`

The \`1/t\` weight upweights low-noise timesteps (few masks, hard predictions) and downweights high-noise timesteps (many masks, easy guessing).

And the decoding? Instead of left-to-right, the model starts from all \`[MASK]\` tokens and fills in the most confident predictions first:

\`\`\`
Step 0:  [____][____][____][____][____][____]    all masked
Step 1:  [____][____][ , ][____][____][ . ]     punctuation first (highest confidence)
Step 2:  [ The][____][ , ][ the][ on ][ . ]     function words next
Step 3:  [ The][ cat][ , ][ the][ on ][ . ]     content words last
\`\`\`

Punctuation before nouns. Function words before content words. The model reveals what it's *most sure about* first, the inverse of how humans write, but oddly intuitive once you see it.

---

## Scaling Up: Where the Bugs Start Teaching

Phase 2 added BPE tokenization, a cosine noise schedule, and ELBO weighting. Phase 3 introduced block diffusion: generating text in blocks of 32 tokens, each block conditioned on the previous ones via KV caching. Phase 4 scaled to 125M parameters with FlexAttention, GQA, the Muon optimizer, and DDP training.

And each phase broke in ways no paper warned about.

### The Staircase Mask: One Character Changes Everything

Phase 3's block diffusion uses a "staircase" attention mask. Each noisy block can attend to all the clean (already generated) blocks before it, but not to itself or future blocks. The attention mask looks like a staircase instead of a triangle.

My implementation used \`>=\` in the mask comparison. Should have been \`>\`.

Training loss looked excellent. Generation produced garbage.

The \`>=\` let each noisy block attend to the clean tokens *of its own block*. Label leakage. The model learned to copy answers instead of predicting them. Training curves showed a suspiciously low loss. Generation, which doesn't have clean tokens to copy, fell apart.

One character. \`>\` vs \`>=\`. No error message. No NaN. Just perfect-looking training and useless output.

This became the pattern: the most expensive bugs in diffusion LMs are silent correctness failures. The training loop doesn't crash. The loss looks reasonable. You only discover the problem when you generate, or worse, when you've burned hours of H100 time and the model hasn't learned what you expected.

<div class="image-container">
    <img src="/assets/open-dllm/staircase_mask.png" alt="Staircase mask bug">
    <p class="image-caption">One character difference in the mask condition. Red = label leakage (own block visible). Green = correct attention.</p>
</div>

### The ELBO Weight Bug: Days to Diagnose

This one cost me real time.

Phase 4 used a cosine noise schedule (mask probability follows a cosine curve). I copied the ELBO weight formula \`1/t\` straight from LLaDA's codebase. Loss plateaued at ~4.0 within the first few hundred steps. The model learned coarse structure but couldn't refine.

The bug: LLaDA uses a *linear* schedule where \`mask_prob = t\`, so \`1/t = 1/mask_prob\`. Trivially correct. My cosine schedule had \`mask_prob = sin²(tπ/2)\`, which is very different from \`t\` at the boundaries. At \`t=0.1\`: correct weight should be \`1/0.024 ≈ 41\`, but I was computing \`1/0.1 = 10\`. Low-noise timesteps, the ones where the model learns refinement, were underweighted by 4x.

The fix for Phase 4 was simple: use \`1/mask_prob\` instead of \`1/t\`. The permanent fix in Phase 5 was simpler: switch to a linear noise schedule where \`mask_prob = t\`, making the formula trivially \`1/t\` with zero ambiguity. Quokka's scaling laws confirmed linear outperforms cosine anyway.

The lesson I keep coming back to: **never copy loss formulas between papers without deriving them for your specific noise schedule.** Two papers using different schedules with the same weight formula means at least one is wrong for you.

<div class="image-container">
    <img src="/assets/open-dllm/elbo_weight_chart.png" alt="ELBO weight divergence">
    <p class="image-caption">Why copying 1/t from LLaDA into a cosine schedule underweights refinement by 4x.</p>
</div>

### Liger FLCE: When the Forward Pass Lies

Phase 5. The model is 144M parameters. The loss function uses [Liger Kernel](https://github.com/linkedin/Liger-Kernel)'s Fused Linear Cross Entropy, a memory-efficient fusion of the final linear layer and the loss computation.

Step 0: \`loss = 19.11\`. Correct. Expected range for ELBO-weighted loss at initialization.

Step 1: \`loss = 19.10\`. Step 100: \`loss = 19.05\`. Step 1000: \`loss = 18.9\`.

\`grad_norm = 0.000000\`. Every single step.

The forward pass computed correct loss values. The backward pass returned zero gradients. Liger's \`FusedLinearCrossEntropyFunction\` with \`reduction='none'\` has a broken backward, [a known issue](https://github.com/linkedin/Liger-Kernel/issues/488) from December 2024 that hadn't been fixed.

The autograd graph was connected. \`loss.requires_grad = True\`. The gradient function was \`DivBackward0\`. Everything *looked* fine. The model just never learned, and the loss drifted down by a hair from weight decay alone.

I burned compute before catching it. The fix: chunked cross-entropy with gradient checkpointing, processing 16,384 tokens at a time (~1.5 GB peak) instead of materializing full logits (24 GB). But the real fix was adding \`grad_norm\` logging at step 0. Zero grad norm means broken backward. Full stop.

\`\`\`
step 0   | loss 19.11 | grad_norm 0.000000 | tok/s 185234
step 1   | loss 19.10 | grad_norm 0.000000 | tok/s 189012
step 2   | loss 19.10 | grad_norm 0.000000 | tok/s 188445
...
step 100 | loss 19.05 | grad_norm 0.000000 | tok/s 189201
\`\`\`

*The loss looks like it's decreasing. It's not learning. That's weight decay.*

---

## 10 Hours on Optimization

H100s cost ~$3.95/hour/GPU. Quokka's scaling laws say dLLMs need 5x more data than autoregressive models at 144M parameters. Every 10% throughput improvement saves real money over a multi-day run. So we spent about 10 hours on nothing but performance engineering.

**The streaming data disaster.** Phase 5's first training attempt used streaming data from HuggingFace: load, tokenize, feed to the model on the fly. Throughput: ~50K tokens/second/GPU. On H100s. I'd known for years that pretokenizing to disk and memory-mapping is standard for large runs, but I'd spent so long doing SFT (where streaming is fine) that I'd forgotten it matters at billion-token scale.

**The optimization gauntlet.** The autoregressive training community has spent years squeezing every FLOP out of their loops. \`torch.compile\`, FlexAttention, Liger kernels. So I asked Claude to apply them all. What followed was a parade of failures (you can count them in our \`lessons.md\`). FlexAttention + gradient checkpointing + whole-model compile = CUDA MMU fault. Liger FLCE = zero gradients. Compile mode \`reduce-overhead\` = OOM. Each failure taught us something about how these tools interact in ways their individual docs don't warn you about.

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

Over two weekends, Claude and I cross-referenced over 80 papers and technical sources on diffusion LMs. I packed the findings, the code, and the full education path into [the repo](https://github.com/hahuyhoang411/SmolDLM). Five phases, from \`python hello_diffusion.py --train\` on a laptop to H100 clusters.

Three things surprised me about working this way.

**Read the papers yourself.** While Claude was coding a new phase, I'd read the full paper. Not the abstract, not Claude's summary. The actual paper. Every time, I found something Claude had abstracted over or gotten subtly wrong. A footnote about schedule dependency in BD3-LMs that changed how clipped schedules should work. A figure in Quokka that showed linear schedule beating cosine at all scales, not just the cherry-picked comparison in the text. The ELBO weight bug itself came from copying LLaDA's \`1/t\` without checking that their linear schedule makes it trivially correct while our cosine schedule doesn't.

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
`,k=t=>{const a=/^\s*---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/,e=t.match(a);if(!e)return{metadata:{},content:t};const[,i,n]=e,s={};return i.split(`
`).forEach(l=>{const[d,...h]=l.split(":");if(d&&h.length>0){let o=h.join(":").trim();(o.startsWith('"')&&o.endsWith('"')||o.startsWith("'")&&o.endsWith("'"))&&(o=o.slice(1,-1)),o.startsWith("[")&&o.endsWith("]")&&(o=o.slice(1,-1).split(",").map(p=>p.trim().replace(/['"]/g,""))),s[d.trim()]=o}}),{metadata:s,content:n}},c=Object.assign({"/src/data/blog-posts/code-web-1.md":w,"/src/data/blog-posts/code-web-2.md":f,"/src/data/blog-posts/code-web-3.md":b,"/src/data/blog-posts/open-dllm.md":y});let r=null;const u=async()=>{if(r)return r;const t=[];for(const e in c){const i=c[e],{metadata:n,content:s}=k(i),l=e.split("/").pop()?.replace(".md","")||"";t.push({id:l,title:n.title||"Untitled",date:n.date||new Date().toISOString().split("T")[0],excerpt:n.excerpt||n.description||"",readTime:n.readTime||"5 min read",tags:n.tags||[],content:s,heroImage:n.heroImage})}const a=e=>{const[i,n,s]=e.split("-").map(Number);return new Date(i,n-1,s).getTime()};return r=t.sort((e,i)=>a(i.date)-a(e.date)),r},L=async t=>(await u()).find(e=>e.id===t)||null,A=async()=>{const t=await u(),a=new Set(t.flatMap(e=>e.tags));return["All",...Array.from(a).sort()]},v={year:"numeric",month:"long",day:"numeric"},C=t=>{const[a,e,i]=t.split("-").map(Number);return new Date(a,e-1,i).toLocaleDateString(void 0,v)};export{T as C,A as a,L as b,C as f,u as g};

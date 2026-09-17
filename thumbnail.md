# Hero thumbnail style — "Drafting Table"

How to draw the cover image for every post on this blog. The look is a
technical drawing of a Vietnamese landmark, built from drafting furniture:
center lines, dashed construction circles, tick marks, and one solid ink dot.
It reads as an architect's sheet, not an illustration.

One landmark per post. The landmark carries the meaning of the article
(see the mapping table at the bottom). No photo textures, no gradients,
no 3D shading — only the two line weights and the flat tints below.

## Canvas and export

- 1600 × 900 px, export to WebP (`hero.webp` in `/assets/<post-slug>/`).
- Background: `#f7f6f2` (warm paper). Optional 1 px frame inset 24 px in
  `--line-ink` at 40% opacity, like a title-block border on a drawing sheet.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| paper | `#f7f6f2` | background |
| line-ink | `#1c1c1c` | solid strokes, dots |
| construction | `#1c1c1c` at 35–45% | dashed guides, center lines |
| tint-blue | `#a8cdf0` | one or two focal fills |
| tint-green | `#a8e6a1` | focal fills, alternate to blue |
| tint-pink | `#f4c6d2` | focal fills, used sparingly |

Pick exactly one tint as the focal color per drawing. The other two may
appear only as tiny accents (a single small shape).

## Stroke system

Two weights only:

- **Solid 2 px** — the landmark silhouette and its primary structure.
- **Dashed 1.5 px** (6 4 dash) — construction geometry: center axes,
  circles the silhouette was "built from", extension lines.

Draw the landmark as if constructing it with a compass and straightedge:
a vertical center line through the whole sheet, dashed circles that share
the dot as their origin, radial spokes, and tick marks crossing the axes.
The silhouette sits where the construction geometry says it must — the
dashes stay visible through and around it.

## The dot

Every drawing has exactly one solid ink dot (r ≈ 10 px). It is the
compass point: the origin of the construction circles and the pivot of
the composition. Place it at the landmark's structural anchor — the
apex of a roof, the center of a drum, the keystone. Never more than one.

## Tint fills

Fill one or two shapes of the silhouette with a flat tint (no stroke
change, or stroke `line-ink` at 60%). Fills are partial — roughly a
third of the silhouette — so the drawing keeps its unfinished, in-progress
feel. Think of the reference sheets: one dome half-tinted, a few blocks
of a skyline green, a single roof plane pink.

## Landmark vocabulary

Compose each landmark from these motifs; never trace a photograph.

- **Roofs** — steep, layered planes with flared eaves; a dashed arc can
  show the sweep of the curve.
- **Drum / lantern** — circle with radial spokes and a center dot.
- **Stilt lines** — short parallel verticals under a floor plate.
- **Terraced arcs** — concentric dashed arcs stacked like rice terraces.
- **Banyan / foliage** — small dashed circles clustered, one tinted.
- **Water** — 3–4 horizontal dashed lines with occasional tick marks.

## Per-post mapping

| Post | Landmark | Focal tint | Motifs |
| --- | --- | --- | --- |
| open-dllm | One Pillar Pagoda | green | drum on one stilt, lotus arcs, dot at apex |
| meddiesai-in-progress | Hanoi tower + hospital block | blue | block plan with grid, dashed city axes |
| phd-thesis-fact-correction | Temple of Literature | blue | layered roof planes, courtyard axis, dot at ridge |
| pensez-french-reasoning | Hanoi Opera House | pink | dome half-tinted, arched wings, radial spokes |
| medmeta-evidence-synthesis | Hue imperial citadel | blue | nested square plans, Ngo Mon gate axis |
| vista-vietnamese-vlm | Ha Long Bay | blue | karst towers as isometric blocks, dashed water |
| toolmaestro-knowing-when-to-call | Trang An grottoes | green | cave arcs, sampan as tiny isometric block |
| selfies-teaching-a-model-to-read-molecules | Ben Thanh market clock | pink | octagonal drum, radial spokes, dot center |
| meddies-research-seven-artifacts | Khuê Văn Các pavilion | green | two drum levels, four stair legs |
| meddies-* (artifact series) | keep the pavilion | green | vary which blocks are tinted per artifact |

## Checklist

- [ ] One landmark, one dot, one dominant tint.
- [ ] Construction dashes visible, not hidden behind the silhouette.
- [ ] Only two stroke weights; no shading, no texture.
- [ ] Paper background; optional 24 px sheet frame.
- [ ] Exported 1600 × 900 WebP at `/assets/<post-slug>/hero.webp`.

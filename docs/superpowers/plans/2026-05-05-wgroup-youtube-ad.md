# WGroup YouTube Ad Film Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a 30s 16:9 YouTube ad for WGroup using Higgsfield MCP (gpt_image_2 + image-to-video) with start/end frame chaining, OpenAI nova TTS narration, and a license-free BGM bed, exported as a single 1920×1080 H.264 MP4.

**Architecture:** Six 5-second scenes generated as image pairs (start frame, end frame) via Higgsfield gpt_image_2. Each pair is fed into Higgsfield image-to-video to produce a clip. The 3 mandatory category images (`W-Quality.webp`, `W-Digilab.webp`, `W-Studio.webp`) are used literally as the start frames of S2/S3/S4 and additionally as style references for all other generated frames. Voiceover is rendered via OpenAI `gpt-4o-mini-tts` voice `nova`. Final composition done with ffmpeg. All intermediate outputs are versioned per-scene in `public/ad-render/` with a `manifest.json` selector so any single piece can be replaced without rebuilding the whole video.

**Tech Stack:** Higgsfield MCP (gpt_image_2 + image-to-video), OpenAI TTS API (`gpt-4o-mini-tts`), ffmpeg, Node.js (for OpenAI TTS HTTP call), bash.

**Spec:** `docs/superpowers/specs/2026-05-05-wgroup-youtube-ad-design.md`

---

## Task 1: Set up output folder tree and manifest

**Files:**
- Create: `public/ad-render/manifest.json`
- Create: `public/ad-render/scene-01-opening/.keep`
- Create: `public/ad-render/scene-02-knowledge/.keep`
- Create: `public/ad-render/scene-03-transform/.keep`
- Create: `public/ad-render/scene-04-excellence/.keep`
- Create: `public/ad-render/scene-05-converge/.keep`
- Create: `public/ad-render/scene-06-logo/.keep`
- Create: `public/ad-render/audio/voiceover_per_line/.keep`
- Create: `public/ad-render/final/.keep`

- [ ] **Step 1: Create directory tree**

```bash
cd /Users/berke/Desktop/Developer/web/wgroup
mkdir -p public/ad-render/{scene-01-opening,scene-02-knowledge,scene-03-transform,scene-04-excellence,scene-05-converge,scene-06-logo,audio/voiceover_per_line,final}
touch public/ad-render/{scene-01-opening,scene-02-knowledge,scene-03-transform,scene-04-excellence,scene-05-converge,scene-06-logo,audio/voiceover_per_line,final}/.keep
```

- [ ] **Step 2: Write initial manifest.json**

Write to `public/ad-render/manifest.json`:
```json
{
  "version": 1,
  "spec": "docs/superpowers/specs/2026-05-05-wgroup-youtube-ad-design.md",
  "scenes": {
    "s1": { "start": null, "end": null, "clip": null },
    "s2": { "start": "public/w-new/W-Quality.webp", "end": null, "clip": null },
    "s3": { "start": "public/w-new/W-Digilab.webp", "end": null, "clip": null },
    "s4": { "start": "public/w-new/W-Studio.webp", "end": null, "clip": null },
    "s5": { "start": null, "end": null, "clip": null },
    "s6": { "start": null, "end": null, "clip": null }
  },
  "audio": { "voiceover_full": null, "voiceover_per_line": {}, "bgm": null },
  "final": null
}
```

- [ ] **Step 3: Verify tree**

Run: `find public/ad-render -type d`
Expected: 9 directories listed.

- [ ] **Step 4: Commit**

```bash
git add public/ad-render
git commit -m "chore: scaffold ad-render output tree and manifest"
```

---

## Task 2: Confirm Higgsfield workspace and upload reference media

**Goal:** Make sure Higgsfield MCP is authenticated, pick the workspace, and upload the 3 category images + the logo so they have stable Higgsfield IDs to pass as references.

**Files:**
- Modify: `public/ad-render/manifest.json` (add `references` block)

- [ ] **Step 1: List workspaces and select**

Use MCP: `mcp__claude_ai_Higgsfield__list_workspaces` then `mcp__claude_ai_Higgsfield__select_workspace` with the chosen workspace ID. Save the workspace ID inline below for traceability.

- [ ] **Step 2: Check balance**

Use MCP: `mcp__claude_ai_Higgsfield__balance`
Expected: enough credits for ~12 image generations + 6 video generations + retries. If insufficient, stop and notify user.

- [ ] **Step 3: Upload W-Quality reference**

Use MCP: `mcp__claude_ai_Higgsfield__media_upload` with absolute path `/Users/berke/Desktop/Developer/web/wgroup/public/w-new/W-Quality.webp`. Call `media_confirm` if required. Capture returned media ID.

- [ ] **Step 4: Upload W-Digilab reference**

Same as Step 3 with `/Users/berke/Desktop/Developer/web/wgroup/public/w-new/W-Digilab.webp`.

- [ ] **Step 5: Upload W-Studio reference**

Same with `/Users/berke/Desktop/Developer/web/wgroup/public/w-new/W-Studio.webp`.

- [ ] **Step 6: Upload logo reference**

Same with `/Users/berke/Desktop/Developer/web/wgroup/public/wgroup/logo.png`.

- [ ] **Step 7: Record IDs in manifest.json**

Add a `references` block to manifest.json with the four returned IDs:
```json
"references": {
  "wquality_image_path": "public/w-new/W-Quality.webp",
  "wquality_higgsfield_id": "<id-from-step-3>",
  "wdigilab_image_path": "public/w-new/W-Digilab.webp",
  "wdigilab_higgsfield_id": "<id-from-step-4>",
  "wstudio_image_path": "public/w-new/W-Studio.webp",
  "wstudio_higgsfield_id": "<id-from-step-5>",
  "logo_image_path": "public/wgroup/logo.png",
  "logo_higgsfield_id": "<id-from-step-6>"
}
```

- [ ] **Step 8: Commit**

```bash
git add public/ad-render/manifest.json
git commit -m "chore: register Higgsfield reference media IDs"
```

---

## Task 3: Generate S1 start frame (Earth from orbit)

**Files:**
- Create: `public/ad-render/scene-01-opening/start-frame_v1.png`
- Modify: `public/ad-render/manifest.json`

- [ ] **Step 1: Generate via gpt_image_2**

Use MCP: `mcp__claude_ai_Higgsfield__generate_image` with model `gpt_image_2`.

Prompt:
```
Cinematic photorealistic view of planet Earth from low orbit at golden-hour dawn. Bright blue atmospheric glow rims the horizon, white cloud sheets drift across continents, Europe centered and warmly lit. Faint gold and white luminous data ribbons trace between continents, suggesting global digital networks — soft, optimistic, not menacing. Subtle HUD scan lines drift across the frame. Premium documentary aesthetic, hopeful and visionary, 16:9 horizontal composition, ultra-detailed, sharp focus, color palette anchored on deep navy blue, light blue, and warm gold with hints of crimson red. No text, no logos, no people.
```

Style references: pass the 3 category-image Higgsfield IDs from manifest.

Aspect: 16:9. Quality: highest. n: 2 variants.

- [ ] **Step 2: Save outputs**

Download both variants to:
- `public/ad-render/scene-01-opening/start-frame_v1.png`
- `public/ad-render/scene-01-opening/start-frame_v2.png`

- [ ] **Step 3: Pick the better variant**

Visual check: choose the variant matching the prompt brief most closely (Earth disc visible, Europe centered, bright/optimistic, clear data ribbons, 16:9). If neither is acceptable, repeat Step 1 with a refined prompt and save as `_v3`, `_v4`.

- [ ] **Step 4: Update manifest**

In `public/ad-render/manifest.json` set `scenes.s1.start` to the chosen filename, e.g. `"public/ad-render/scene-01-opening/start-frame_v1.png"`.

- [ ] **Step 5: Commit**

```bash
git add public/ad-render
git commit -m "render(s1): start frame — Earth from orbit"
```

---

## Task 4: Generate S1 end frame (transition into W-Quality)

**Files:**
- Create: `public/ad-render/scene-01-opening/end-frame_v1.png`
- Modify: `public/ad-render/manifest.json`

The S1 end frame must visually bridge into the W-Quality.webp composition so S2 starts seamlessly.

- [ ] **Step 1: Generate via gpt_image_2**

Use MCP: `mcp__claude_ai_Higgsfield__generate_image` with model `gpt_image_2`.

Prompt:
```
Cinematic transition frame: camera has descended from low Earth orbit and is approaching an industrial European setting at golden-hour dawn. The frame begins to compose around an automotive industrial inspection environment — soft daylight, hints of precision instruments and blueprints visible at the edges, while the upper portion still retains a faint orbital glow with thinning gold data ribbons dissolving into the scene. Color palette: navy blue, light blue, warm gold, subtle crimson accents. Documentary realism with very subtle HUD scan lines. 16:9 horizontal, ultra-detailed, no text, no logos, no people.
```

Style references: pass `wquality_higgsfield_id` and the S1 start frame as references for continuity.

Aspect: 16:9. n: 2 variants.

- [ ] **Step 2: Save outputs**

Download to:
- `public/ad-render/scene-01-opening/end-frame_v1.png`
- `public/ad-render/scene-01-opening/end-frame_v2.png`

- [ ] **Step 3: Pick best variant + update manifest**

Set `scenes.s1.end` to the chosen path.

- [ ] **Step 4: Commit**

```bash
git add public/ad-render
git commit -m "render(s1): end frame — descent toward W-Quality"
```

---

## Task 5: Generate S2 end frame (Knowledge → bridge to DigiLab)

S2 start = `public/w-new/W-Quality.webp` (used literally, no generation needed).

**Files:**
- Create: `public/ad-render/scene-02-knowledge/end-frame_v1.png`
- Modify: `public/ad-render/manifest.json`

- [ ] **Step 1: Generate via gpt_image_2**

Prompt:
```
Cinematic transition frame inside an industrial automotive quality-inspection environment. Foreground precision instruments, blueprints, and certification markers begin to dissolve into a luminous digital data plane — fine particles of light and faint code surfaces emerge from the right side of the frame, suggesting the imminent transformation into a digital lab. Bright optimistic daylight, warm-cool balance. Color palette: navy blue, light blue, crimson red, warm gold accents. Subtle HUD measurement callouts fading. 16:9 horizontal, ultra-detailed photorealism, no text, no logos, no people.
```

Style references: `wquality_higgsfield_id` (primary) + `wdigilab_higgsfield_id` (transition target).

n: 2.

- [ ] **Step 2: Save + pick best + update manifest**

Save as `end-frame_v1.png`/`v2.png`. Pick the one whose right side most clearly hints at digital/data transformation. Set `scenes.s2.end`.

- [ ] **Step 3: Commit**

```bash
git add public/ad-render
git commit -m "render(s2): end frame — Quality dissolving into data"
```

---

## Task 6: Generate S3 end frame (Transform → bridge to Studio)

S3 start = `public/w-new/W-Digilab.webp` (literal).

**Files:**
- Create: `public/ad-render/scene-03-transform/end-frame_v1.png`
- Modify: `public/ad-render/manifest.json`

- [ ] **Step 1: Generate via gpt_image_2**

Prompt:
```
Cinematic transition frame inside a bright modern digital laboratory. Holographic dashboards, code surfaces, and digital-twin renderings of automotive components are converging toward the center of the frame, condensing into a single radiant beam of light that arcs toward the upper right, where the edge of a cinematic studio lighting rig and a camera silhouette begin to emerge. Bright, optimistic, high-key lighting. Color palette: deep navy blue, light blue, crimson red, warm white. Subtle particle data flow, very light HUD scan. 16:9 horizontal, ultra-detailed photorealism, no text, no logos, no people.
```

Style references: `wdigilab_higgsfield_id` (primary) + `wstudio_higgsfield_id` (transition target).

n: 2.

- [ ] **Step 2: Save + pick best + update manifest**

Save variants. Pick the one with cleanest beam-to-studio bridge. Set `scenes.s3.end`.

- [ ] **Step 3: Commit**

```bash
git add public/ad-render
git commit -m "render(s3): end frame — DigiLab beam toward Studio"
```

---

## Task 7: Generate S4 end frame (Excellence → three converging streams)

S4 start = `public/w-new/W-Studio.webp` (literal).

**Files:**
- Create: `public/ad-render/scene-04-excellence/end-frame_v1.png`
- Modify: `public/ad-render/manifest.json`

- [ ] **Step 1: Generate via gpt_image_2**

Prompt:
```
Cinematic transition frame: a bright cinematic studio environment with cameras and softbox lighting recedes into the background, while in the foreground three luminous streams of light — deep navy blue, crimson red, and light cyan-blue — arc inward and converge toward a single bright point at the center of the frame. The streams are smooth, ribbon-like, and cinematic. Background fades to a near-white luminous gradient. High-key, ethereal, optimistic. 16:9 horizontal, ultra-detailed photorealism, no text, no logos, no people.
```

Style references: `wstudio_higgsfield_id` (primary) + `logo_higgsfield_id` (color palette anchor).

n: 2.

- [ ] **Step 2: Save + pick best + update manifest**

Save variants. Pick the one with the cleanest three-stream convergence. Set `scenes.s4.end`.

- [ ] **Step 3: Commit**

```bash
git add public/ad-render
git commit -m "render(s4): end frame — three streams converging"
```

---

## Task 8: Generate S5 frames (Three converge → logo silhouette)

**Files:**
- Create: `public/ad-render/scene-05-converge/start-frame_v1.png`
- Create: `public/ad-render/scene-05-converge/end-frame_v1.png`
- Modify: `public/ad-render/manifest.json`

S5 start frame should match S4 end so the chain is seamless. We can either reuse S4's end as S5's start (preferred for cleanest cut) or generate a tightened-in version.

- [ ] **Step 1: Reuse S4 end as S5 start**

```bash
cp public/ad-render/scene-04-excellence/end-frame_v1.png public/ad-render/scene-05-converge/start-frame_v1.png
```

(If the chosen S4 end was a different version, copy that one instead.)

- [ ] **Step 2: Generate S5 end frame via gpt_image_2**

Prompt:
```
Cinematic frame: three luminous ribbons of light — deep navy blue, crimson red, and light cyan-blue — have woven together at the center of the frame and resolved into a smooth flowing ribbon shape that traces the silhouette of a stylized letter "W" formed by two interconnected wave-like ribbons, glowing with a golden core. The background is a near-white ethereal luminous gradient with soft particles. High-key, optimistic, premium brand aesthetic. 16:9 horizontal, ultra-detailed photorealism, no text, no logos.
```

Style references: `logo_higgsfield_id` (primary — this frame should preview the logo silhouette).

n: 2.

- [ ] **Step 3: Save + pick best + update manifest**

Save variants. Pick the one whose ribbon shape is closest to the WGroup logo silhouette. Set `scenes.s5.start` and `scenes.s5.end`.

- [ ] **Step 4: Commit**

```bash
git add public/ad-render
git commit -m "render(s5): converge frames — ribbons forming W silhouette"
```

---

## Task 9: Generate S6 frames (Logo reveal hold)

**Files:**
- Create: `public/ad-render/scene-06-logo/start-frame_v1.png`
- Create: `public/ad-render/scene-06-logo/end-frame_v1.png`
- Modify: `public/ad-render/manifest.json`

S6 start = S5 end (silhouette). S6 end = the actual logo composited on white background. The text overlay (tagline + URL) is added at compositing time (Task 14), not in the frame, so the generated frame is just the clean logo plate.

- [ ] **Step 1: Reuse S5 end as S6 start**

```bash
cp public/ad-render/scene-05-converge/end-frame_v1.png public/ad-render/scene-06-logo/start-frame_v1.png
```

- [ ] **Step 2: Generate S6 end frame via gpt_image_2**

Prompt:
```
Premium brand logo plate: the WGroup "W" logo (two interlocking wave-like ribbon strokes in deep navy blue, crimson red, and light cyan-blue with smooth gradients) sits centered on a clean near-white luminous background with very soft particle bloom around the logo edges and a subtle warm glow. High-key, premium, broadcast-ready. The logo occupies the central one-third of the frame; ample empty space around it for later text overlay. 16:9 horizontal, ultra-detailed.
```

Style references: `logo_higgsfield_id` (primary).

n: 2.

- [ ] **Step 3: Save + pick best + update manifest**

Set `scenes.s6.start` and `scenes.s6.end`.

- [ ] **Step 4: Commit**

```bash
git add public/ad-render
git commit -m "render(s6): logo reveal frames"
```

---

## Task 10: Generate video clips for all six scenes

For each scene, run Higgsfield image-to-video with the saved start frame + end frame + a motion prompt. Target 5 seconds per clip at 24 or 30 fps.

**Files:**
- Create: `public/ad-render/scene-0{1..6}-*/clip_v1.mp4`
- Modify: `public/ad-render/manifest.json`

- [ ] **Step 1: Generate S1 clip**

Use MCP: `mcp__claude_ai_Higgsfield__generate_video`.
- start_image: `scenes.s1.start`
- end_image: `scenes.s1.end`
- duration: 5s
- motion prompt: `"Slow cinematic dolly-in from low Earth orbit toward Europe; subtle drift of cloud layers and light gold data ribbons; gentle scan-line drift; smooth camera descent."`
- Save returned video to `public/ad-render/scene-01-opening/clip_v1.mp4`.

- [ ] **Step 2: Generate S2 clip**

- start_image: `public/w-new/W-Quality.webp`
- end_image: `scenes.s2.end`
- duration: 5s
- motion: `"Slow push-in across an industrial inspection environment; precision instruments and blueprints in foreground; HUD measurement callouts fade in subtly; right side gradually dissolves into a luminous digital data plane."`
- Save to `public/ad-render/scene-02-knowledge/clip_v1.mp4`.

- [ ] **Step 3: Generate S3 clip**

- start_image: `public/w-new/W-Digilab.webp`
- end_image: `scenes.s3.end`
- duration: 5s
- motion: `"Lateral glide through a bright digital laboratory; holographic dashboards and code surfaces sweep across; particle data flows converge toward the center; a single radiant beam of light arcs toward the upper-right corner."`
- Save to `public/ad-render/scene-03-transform/clip_v1.mp4`.

- [ ] **Step 4: Generate S4 clip**

- start_image: `public/w-new/W-Studio.webp`
- end_image: `scenes.s4.end`
- duration: 5s
- motion: `"Crane-down camera revealing the scale of a cinematic studio; warm key light; three luminous ribbons — navy blue, crimson red, light cyan — arc inward and meet at frame center."`
- Save to `public/ad-render/scene-04-excellence/clip_v1.mp4`.

- [ ] **Step 5: Generate S5 clip**

- start_image: `scenes.s5.start`
- end_image: `scenes.s5.end`
- duration: 5s
- motion: `"Static camera; three converging ribbons of light weave into each other and resolve into a flowing ribbon shape tracing the silhouette of a stylized 'W'; particles drift; soft golden core glow grows."`
- Save to `public/ad-render/scene-05-converge/clip_v1.mp4`.

- [ ] **Step 6: Generate S6 clip**

- start_image: `scenes.s6.start`
- end_image: `scenes.s6.end`
- duration: 6s (S6 holds slightly longer for CTA legibility)
- motion: `"Static framing; the ribbon-W silhouette resolves crisply into the final WGroup logo; soft particle settle; gentle ambient light bloom; logo holds steady."`
- Save to `public/ad-render/scene-06-logo/clip_v1.mp4`.

- [ ] **Step 7: Update manifest**

For each scene, set `scenes.sN.clip` to the saved path.

- [ ] **Step 8: Verify durations**

Run for each clip:
```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 public/ad-render/scene-0X-*/clip_v1.mp4
```
Expected: ~5s for S1–S5, ~6s for S6. Total ≈ 31s; we'll trim S6 in Task 14 to land at exactly 30s.

- [ ] **Step 9: Commit**

```bash
git add public/ad-render
git commit -m "render: image-to-video clips for all six scenes"
```

---

## Task 11: Render voiceover with OpenAI TTS

**Files:**
- Create: `scripts/render-tts.mjs`
- Create: `public/ad-render/audio/voiceover_full_v1.mp3`
- Create: `public/ad-render/audio/voiceover_per_line/s{1..6}_v1.mp3`
- Modify: `public/ad-render/manifest.json`

- [ ] **Step 1: Write the TTS script**

Create `scripts/render-tts.mjs`:
```js
import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error('OPENAI_API_KEY not set in .env');

const lines = [
  ['s1', 'In a world rebuilt by transformation,'],
  ['s2', 'excellence begins with knowledge — measured, proven, certified.'],
  ['s3', 'It evolves through transformation — where data becomes decision.'],
  ['s4', 'And it speaks through stories that move industries forward.'],
  ['s5', 'Three divisions. One vision. One signature of excellence.'],
  ['s6', 'WGroup — the art of transforming knowledge into excellence.'],
];

const fullText = lines.map(([, t]) => t).join(' ');
const outDir = 'public/ad-render/audio';
const perLineDir = path.join(outDir, 'voiceover_per_line');
await fs.mkdir(perLineDir, { recursive: true });

async function tts(text, outFile) {
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-tts',
      voice: 'nova',
      input: text,
      response_format: 'mp3',
    }),
  });
  if (!res.ok) throw new Error(`TTS failed: ${res.status} ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(outFile, buf);
  console.log(`wrote ${outFile} (${buf.length} bytes)`);
}

await tts(fullText, path.join(outDir, 'voiceover_full_v1.mp3'));
for (const [id, text] of lines) {
  await tts(text, path.join(perLineDir, `${id}_v1.mp3`));
}
```

- [ ] **Step 2: Run the script**

Run from repo root:
```bash
node scripts/render-tts.mjs
```
Expected: 7 mp3 files written; no errors.

- [ ] **Step 3: Listen and verify**

Open `public/ad-render/audio/voiceover_full_v1.mp3` in a player. Confirm clarity, female voice, ~28s duration. If quality is unsatisfactory, rerun with adjusted prompt phrasing (e.g., add commas for pacing) and save as `_v2`.

- [ ] **Step 4: Update manifest**

Set:
```json
"audio": {
  "voiceover_full": "public/ad-render/audio/voiceover_full_v1.mp3",
  "voiceover_per_line": {
    "s1": "public/ad-render/audio/voiceover_per_line/s1_v1.mp3",
    "s2": "public/ad-render/audio/voiceover_per_line/s2_v1.mp3",
    "s3": "public/ad-render/audio/voiceover_per_line/s3_v1.mp3",
    "s4": "public/ad-render/audio/voiceover_per_line/s4_v1.mp3",
    "s5": "public/ad-render/audio/voiceover_per_line/s5_v1.mp3",
    "s6": "public/ad-render/audio/voiceover_per_line/s6_v1.mp3"
  },
  "bgm": null
}
```

- [ ] **Step 5: Commit**

```bash
git add scripts/render-tts.mjs public/ad-render
git commit -m "audio: render OpenAI nova voiceover (full + per-line)"
```

---

## Task 12: Source background music track

**Files:**
- Create: `public/ad-render/audio/bgm_v1.mp3`
- Modify: `public/ad-render/manifest.json`

This step requires the user to pick a track from the YouTube Audio Library. Plan provides the criteria; user supplies the file.

- [ ] **Step 1: Pull candidate tracks**

User opens https://studio.youtube.com → Audio Library → filter:
- Genre: **Cinematic** or **Inspirational**
- Mood: **Bright** / **Inspirational**
- Duration: **≥30s**
- License: **No attribution required** (preferred)
- BPM range visually: slow build, ~80–90 BPM, instrumental, no vocals.

Download 3 candidates as `bgm_candidate_a.mp3`, `bgm_candidate_b.mp3`, `bgm_candidate_c.mp3` into `public/ad-render/audio/`.

- [ ] **Step 2: Pick the winner**

Listen to each candidate underlaid with `voiceover_full_v1.mp3` at -22 LUFS. Choose the one that best matches: optimistic, builds gradually, doesn't fight the voice.

- [ ] **Step 3: Save the chosen track as bgm_v1.mp3**

```bash
cp public/ad-render/audio/bgm_candidate_<X>.mp3 public/ad-render/audio/bgm_v1.mp3
```

- [ ] **Step 4: Update manifest**

Set `audio.bgm` to `"public/ad-render/audio/bgm_v1.mp3"`.

- [ ] **Step 5: Commit**

```bash
git add public/ad-render/audio
git commit -m "audio: add background music bed (YT Audio Library)"
```

---

## Task 13: Concatenate clips into a silent rough cut

**Files:**
- Create: `public/ad-render/final/rough-cut_v1.mp4`

- [ ] **Step 1: Write the concat list**

Create `public/ad-render/final/concat.txt`:
```
file '../scene-01-opening/clip_v1.mp4'
file '../scene-02-knowledge/clip_v1.mp4'
file '../scene-03-transform/clip_v1.mp4'
file '../scene-04-excellence/clip_v1.mp4'
file '../scene-05-converge/clip_v1.mp4'
file '../scene-06-logo/clip_v1.mp4'
```

- [ ] **Step 2: Concatenate (re-encode to harmonize codecs)**

```bash
cd /Users/berke/Desktop/Developer/web/wgroup
ffmpeg -y -f concat -safe 0 -i public/ad-render/final/concat.txt \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p" \
  -c:v libx264 -preset slow -crf 18 \
  -an \
  public/ad-render/final/rough-cut_v1.mp4
```

- [ ] **Step 3: Verify duration**

```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 public/ad-render/final/rough-cut_v1.mp4
```
Expected: ~31s. We trim to 30 in Task 14.

- [ ] **Step 4: Commit**

```bash
git add public/ad-render/final
git commit -m "edit: concatenate scene clips into rough cut"
```

---

## Task 14: Final composition with text overlay, audio mix, and trim to 30s

**Files:**
- Create: `public/ad-render/final/master_v1.mp4`
- Modify: `public/ad-render/manifest.json`

The text overlay (tagline + URL) is burned into S6 (last 6 seconds) using ffmpeg's drawtext filter. The voice and BGM are mixed; BGM is ducked under the voice.

- [ ] **Step 1: Verify a font is available**

```bash
ls /System/Library/Fonts/Supplemental/Helvetica.ttc /Library/Fonts/Arial.ttf 2>/dev/null
```
At least one should exist on macOS. If not, use `/System/Library/Fonts/Helvetica.ttc`. Save the chosen font path for the next step.

- [ ] **Step 2: Compose final master**

```bash
cd /Users/berke/Desktop/Developer/web/wgroup
FONT="/System/Library/Fonts/Helvetica.ttc"

ffmpeg -y \
  -i public/ad-render/final/rough-cut_v1.mp4 \
  -i public/ad-render/audio/voiceover_full_v1.mp3 \
  -i public/ad-render/audio/bgm_v1.mp3 \
  -filter_complex "
    [0:v]drawtext=fontfile='${FONT}':text='The Art of Transforming Knowledge into Excellence':fontcolor=0x0a2342:fontsize=42:x=(w-text_w)/2:y=h*0.78:enable='gte(t,25)':alpha='if(lt(t,25.3),(t-25)/0.3,1)',
         drawtext=fontfile='${FONT}':text='wgroupgmbh.eu':fontcolor=0xc41e3a:fontsize=36:x=(w-text_w)/2:y=h*0.86:enable='gte(t,25.5)':alpha='if(lt(t,25.8),(t-25.5)/0.3,1)',
         trim=duration=30,setpts=PTS-STARTPTS[v];
    [2:a]volume=0.18,aloop=loop=-1:size=2e9[bgm];
    [1:a][bgm]amix=inputs=2:duration=first:dropout_transition=0:weights='1 0.6'[a]
  " \
  -map "[v]" -map "[a]" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -ar 48000 \
  -t 30 \
  public/ad-render/final/master_v1.mp4
```

- [ ] **Step 3: Verify master**

```bash
ffprobe -v error -show_entries format=duration:stream=width,height,codec_name -of default public/ad-render/final/master_v1.mp4
```
Expected: duration 30.00, width 1920, height 1080, codec_name h264 + aac.

- [ ] **Step 4: Loudness check**

```bash
ffmpeg -i public/ad-render/final/master_v1.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=summary -f null -
```
Expected: integrated loudness near -14 LUFS. If off by more than 2 dB, rerun Step 2 with adjusted `volume=` for BGM or apply a normalization pass:
```bash
ffmpeg -y -i public/ad-render/final/master_v1.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:v copy public/ad-render/final/master_v1_normalized.mp4
```

- [ ] **Step 5: Update manifest**

Set `final` to `"public/ad-render/final/master_v1.mp4"`.

- [ ] **Step 6: Commit**

```bash
git add public/ad-render/final public/ad-render/manifest.json
git commit -m "edit: final composition with overlays, mixed audio, 30s master"
```

---

## Task 15: QA pass and replacement candidates

**Files:**
- Modify (potentially): any `clip_vN.mp4`, `master_vN.mp4`

- [ ] **Step 1: Watch the master end-to-end**

Open `public/ad-render/final/master_v1.mp4` in QuickTime. Watch twice.

- [ ] **Step 2: Note issues per scene**

For each of S1–S6, write down (in a temporary scratchpad):
- Does the visual match the spec mood? (yes/no + note)
- Is the start-to-end transition seamless with the next scene?
- Is the voiceover line synchronized to the right scene?
- Any visual artifact, frame stutter, or color drift?

- [ ] **Step 3: Decide replacements**

For each issue:
- If a frame is wrong → regenerate that frame only (Task 3–9 with `_v2`/`_v3` suffix), update manifest, redo Task 10's clip for that scene only.
- If a clip motion is wrong → regenerate just that clip (Task 10) with `_v2`.
- If voiceover line is off → re-render that one line via `scripts/render-tts.mjs` (modify to render only the affected line) saving as `_v2`.

- [ ] **Step 4: Re-run final composition if anything changed**

If any clip changed, redo Tasks 13 and 14 producing `master_v2.mp4`.

- [ ] **Step 5: Final commit**

```bash
git add public/ad-render
git commit -m "qa: replacement passes and final master"
```

---

## Self-Review Checklist (post-execution)

- [ ] Master is exactly 30.00 seconds.
- [ ] Master is 1920×1080 at 30 fps.
- [ ] All three category images appear as start frames of S2/S3/S4 (verified in clips).
- [ ] WGroup logo is clearly visible in S6.
- [ ] Voiceover is intelligible and synced to the right scenes.
- [ ] BGM is well below voice; integrated loudness ≈ -14 LUFS.
- [ ] Every scene folder under `public/ad-render/scene-*/` contains: a chosen `start-frame_*.png` (or symlink/path-reference for S2/S3/S4 to the .webp), a chosen `end-frame_*.png`, and a chosen `clip_*.mp4`.
- [ ] `manifest.json` points to the chosen versions for every scene + audio + final.
- [ ] All visuals are bright/optimistic — no dark or dystopian frames.
- [ ] Every Higgsfield generation used `gpt_image_2` (not any other model).

---

## Execution notes

- If Higgsfield credits run out mid-render, stop, refill, and resume from the next pending task. Manifest tracks state so we don't redo finished work.
- If `gpt_image_2` produces hands/people, regenerate — the spec is no-people.
- Voiceover line for S6 may need a slight pause inserted before "WGroup" — if it sounds rushed, render with `". WGroup ..."` (period prefix) for a beat.
- The drawtext alpha-fade in Task 14 kicks in at t=25s and t=25.5s; adjust if S6 starts at a different boundary after re-cuts.

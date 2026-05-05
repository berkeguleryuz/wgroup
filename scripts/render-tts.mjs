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

// Renders index.html to an MP4 (1280x720) by driving window.seek(t) frame by frame.
// Usage:
//   node render.mjs                     -> full video  -> out/spel-lions.mp4
//   node render.mjs --stills 2,10,30    -> PNG stills at those seconds -> out/still-XX.png
//   node render.mjs --fps 24 --out /path/to/dir
// Requires: playwright (global install is fine: NODE_PATH=$(npm root -g)), ffmpeg on PATH or FFMPEG env var.
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const FPS = parseInt(opt('--fps', '24'), 10);
const OUT = resolve(opt('--out', join(here, 'out')));
const STILLS = opt('--stills', null);
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
mkdirSync(OUT, { recursive: true });

// local font override (fonts/ is git-ignored; see README)
let fontCss = null;
const fontCssPath = join(here, 'fonts', 'nskr.css');
if (existsSync(fontCssPath)) {
  fontCss = readFileSync(fontCssPath, 'utf8').replace(/url\((nskr-[^)]+)\)/g, (m, f) => `url(file://${join(here, 'fonts', f)})`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('PAGE ERROR:', e.message));
await page.goto('file://' + join(here, 'index.html'));
if (fontCss) await page.addStyleTag({ content: fontCss });
await page.evaluate(() => window.ready);
await page.evaluate(() => document.fonts.ready);
const TOTAL = await page.evaluate(() => window.TOTAL);
console.log(`timeline: ${TOTAL}s @ ${FPS} fps`);

if (STILLS) {
  for (const s of STILLS.split(',').map(Number)) {
    await page.evaluate((t) => window.seek(t), s);
    const f = join(OUT, `still-${String(s).padStart(4, '0').replace('.', '_')}.png`);
    await page.screenshot({ path: f });
    console.log('wrote', f);
  }
  await browser.close();
  process.exit(0);
}

const frames = join(OUT, 'frames');
rmSync(frames, { recursive: true, force: true });
mkdirSync(frames, { recursive: true });
const n = Math.ceil(TOTAL * FPS);
const t0 = Date.now();
for (let i = 0; i < n; i++) {
  await page.evaluate((t) => window.seek(t), i / FPS);
  const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
  writeFileSync(join(frames, `f${String(i).padStart(5, '0')}.jpg`), buf);
  if (i % 120 === 0) console.log(`frame ${i}/${n}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
await browser.close();

const mp4 = join(OUT, 'spel-lions.mp4');
const r = spawnSync(FFMPEG, ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(frames, 'f%05d.jpg'),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4], { stdio: 'inherit' });
if (r.status !== 0) { console.error('ffmpeg failed'); process.exit(1); }
console.log('wrote', mp4, `(${readdirSync(frames).length} frames)`);

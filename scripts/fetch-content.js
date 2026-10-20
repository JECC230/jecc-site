#!/usr/bin/env node
// Pulls the latest public content into lib/latest-content.json so the static
// export can show it without a backend. Run by .github/workflows/update-content.yml
// every 12 hours; safe to run locally with `node scripts/fetch-content.js`.
//
// The file is only rewritten when the content itself changed, so the workflow
// doesn't make an empty commit (and a redeploy) on every run.

const fs = require('node:fs/promises');
const path = require('node:path');

const OUTPUT = path.join(__dirname, '..', 'lib', 'latest-content.json');
// Both of JECC's channels; every video is tagged with the side it came from.
// (@jecc23 is the main channel, not the auto-generated "Jecc - Topic" one.)
// Each channel gets a fixed quota: the music channel uploads far more often,
// so a plain newest-first cut would push the car channel off the page.
const YOUTUBE_CHANNELS = [
  { id: 'UCxTfstFlt1ngDzGIXHsf_uw', category: 'music', take: 4 }, // @jecc23
  { id: 'UCLIfsm2L1TnGnuyk4UxzT_w', category: 'auto', take: 2 }, // @jecc_23
];

const byNewest = (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

const decodeEntities = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&');

// The site renders no OS emoji (Lucide icons only), so strip them — and the
// #hashtags YouTube titles carry — from titles.
const cleanTitle = (s) =>
  s
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}]/gu, '')
    .replace(/(^|\s)#[\p{L}\p{N}_]+/gu, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decodeEntities(m[1].trim()) : '';
};

const attr = (xml, name, attribute) => {
  const m = xml.match(new RegExp(`<${name}[^>]*\\s${attribute}="([^"]*)"`));
  return m ? decodeEntities(m[1]) : '';
};

// ---------------------------------------------------------------------------
// Sources. Each receives its previous items and returns the new array.
// YouTube items: { id, title, url, category, kind, thumbnail, publishedAt }.
// ---------------------------------------------------------------------------
async function fetchChannel({ id: channelId, category, take }) {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
  if (!res.ok) throw new Error(`YouTube RSS for ${category} responded ${res.status}`);
  const xml = await res.text();

  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  return entries
    .map((entry) => {
      const id = tag(entry, 'yt:videoId');
      const url = attr(entry, 'link', 'href') || `https://www.youtube.com/watch?v=${id}`;
      return {
        id,
        title: cleanTitle(tag(entry, 'title')),
        url,
        category,
        kind: url.includes('/shorts/') ? 'short' : 'video',
        // The feed's thumbnail is the 480x360 hqdefault frame.
        thumbnail: attr(entry, 'media:thumbnail', 'url') || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        publishedAt: tag(entry, 'published'),
      };
    })
    .sort(byNewest)
    .slice(0, take);
}

// Takes each channel's quota, then merges them newest first. A channel whose
// feed fails keeps its last good videos (from `previous`) so one outage
// doesn't drop a whole side.
async function fetchYouTube(previous = []) {
  const perChannel = await Promise.all(
    YOUTUBE_CHANNELS.map((channel) =>
      fetchChannel(channel).catch((err) => {
        console.warn(`[fetch-content] youtube/${channel.category} failed: ${err.message}`);
        return previous.filter((video) => video.category === channel.category);
      })
    )
  );
  return perChannel.flat().sort(byNewest);
}

// Instagram and TikTok don't expose public feeds; both need an app token
// (Instagram Graph API / TikTok Display API) stored as a repository secret.
// Implement and add to SOURCES when the token exists.
async function fetchInstagram() {
  return [];
}

async function fetchTikTok() {
  return [];
}

const SOURCES = {
  youtube: fetchYouTube,
  instagram: fetchInstagram,
  tiktok: fetchTikTok,
};

async function readCurrent() {
  try {
    return JSON.parse(await fs.readFile(OUTPUT, 'utf8'));
  } catch {
    return null;
  }
}

async function main() {
  const current = await readCurrent();
  const next = {};

  for (const [name, fetcher] of Object.entries(SOURCES)) {
    try {
      next[name] = await fetcher(current?.[name] ?? []);
    } catch (err) {
      // Keep the last good data for a source that failed rather than wiping it.
      console.warn(`[fetch-content] ${name} failed: ${err.message}`);
      next[name] = current?.[name] ?? [];
    }
  }

  const changed = Object.keys(SOURCES).some(
    (name) => JSON.stringify(next[name]) !== JSON.stringify(current?.[name] ?? null)
  );

  if (!changed) {
    console.log('[fetch-content] No changes.');
    return;
  }

  const output = { updatedAt: new Date().toISOString(), ...next };
  await fs.writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`[fetch-content] Wrote ${path.relative(process.cwd(), OUTPUT)} (${next.youtube.length} videos).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

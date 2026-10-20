'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, CarFront, Music2, Play } from 'lucide-react';
import latest from '@/lib/latest-content.json';
import { useLanguage } from '@/app/providers';
import SectionHeading from './ui/SectionHeading';

const CATEGORY_ICONS = { music: Music2, auto: CarFront } as const;

// lib/latest-content.json is rewritten by scripts/fetch-content.js on a
// 12-hour GitHub Actions schedule, which then redeploys the static export.
export default function LatestVideos() {
  const { t, lang } = useLanguage();
  const videos = latest.youtube;
  if (videos.length === 0) return null;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <section id="latest" className="section-shell">
      <SectionHeading kicker={t.latest.kicker} title={t.latest.title} intro={t.latest.intro} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, i) => {
          const CategoryIcon = CATEGORY_ICONS[video.category as keyof typeof CATEGORY_ICONS] ?? Play;
          const categoryLabel = t.latest.categories[video.category] ?? '';
          return (
            <motion.a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${categoryLabel}: ${video.title} — ${t.latest.watch}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              className="glass-card group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                <img
                  src={video.thumbnail}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
                    <Play className="h-5 w-5 translate-x-px" fill="currentColor" />
                  </span>
                </span>
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  <CategoryIcon className="h-3.5 w-3.5" aria-hidden />
                  {categoryLabel}
                </span>
                {video.kind === 'short' && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
                    {t.latest.short}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="line-clamp-2 text-base leading-snug">{video.title}</h3>
                <div className="mt-auto flex items-center justify-between pt-5 text-xs text-zinc-500 dark:text-zinc-400">
                  <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}

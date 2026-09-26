'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Shirt } from 'lucide-react';
import { MEDIA_GALLERY, SETUP_GEAR, type GalleryImage } from '@/lib/data';
import { VERIFIED_VIDEOS } from '@/lib/links';
import { useLanguage } from '@/app/providers';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import YoutubeEmbed from './ui/YoutubeEmbed';
import SmartImage from './ui/SmartImage';
import { cn } from '@/lib/utils';

type FilterKey = 'all' | GalleryImage['category'];

export default function MediaGallery() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterKey>('all');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filters: FilterKey[] = ['all', 'concerts'];
  const visible = filter === 'all' ? MEDIA_GALLERY : MEDIA_GALLERY.filter((img) => img.category === filter);

  return (
    <section id="media" className="section-shell">
      <SectionHeading kicker={t.media.kicker} title={t.media.title} intro={t.media.intro} />

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              filter === f
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
                : 'glass-panel text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            )}
          >
            {t.media.filters[f]}
          </button>
        ))}
      </div>

      <div className="mb-16 columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
        {visible.map((image) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() => setLightbox(image)}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="block w-full overflow-hidden rounded-2xl border border-black/5 dark:border-white/10"
          >
            <SmartImage
              src={image.src}
              alt={image.alt}
              wrapperClassName="aspect-video w-full"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-600 dark:text-cyan-glow" />
            <h3 className="text-lg font-semibold">{t.media.setupTitle}</h3>
          </div>
          <ul className="mb-5 space-y-2 text-sm">
            {SETUP_GEAR.map((gear) => (
              <li key={gear} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow" />
                <span className="font-mono text-[13px] text-zinc-700 dark:text-zinc-300">{gear}</span>
              </li>
            ))}
          </ul>
          <YoutubeEmbed videoId={VERIFIED_VIDEOS.gearReview} title="Pioneer DM-50D review" />
          <p className="mt-2 text-xs text-zinc-500">{t.media.gearReviewCaption}</p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Shirt className="h-4 w-4 text-amber-600 dark:text-amber-glow" />
            <h3 className="text-lg font-semibold">{t.media.styleTitle}</h3>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{t.media.styleText}</p>
        </GlassCard>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="max-h-[85vh] max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage
                src={lightbox.src}
                alt={lightbox.alt}
                wrapperClassName="max-h-[85vh] max-w-full overflow-hidden rounded-2xl"
                className="max-h-[85vh] max-w-full rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

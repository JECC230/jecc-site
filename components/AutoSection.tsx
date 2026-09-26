'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Gauge, ImageOff } from 'lucide-react';
import { AUTO_GALLERY, CARS, YOUTUBE_VIDEO_IDS } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import Badge from './ui/Badge';
import YoutubeEmbed from './ui/YoutubeEmbed';
import SmartImage from './ui/SmartImage';
import { cn } from '@/lib/utils';

export default function AutoSection() {
  const { t } = useLanguage();
  const [carId, setCarId] = useState(CARS[0].id);
  const [openCategory, setOpenCategory] = useState<string | null>(CARS[0].modCategories[0]?.id ?? null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const car = CARS.find((c) => c.id === carId) ?? CARS[0];

  return (
    <section id="auto" className="section-shell">
      <SectionHeading kicker={t.auto.kicker} title={t.auto.title} intro={t.auto.intro} />

      <div className="mb-6 flex flex-wrap gap-2">
        {CARS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCarId(c.id)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              carId === c.id
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
                : 'glass-panel text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            )}
          >
            {c.year} · {c.engine}
          </button>
        ))}
      </div>

      <GlassCard className="mb-12 flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black">
          <Gauge className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            {car.year} {car.name}
          </h3>
          <p className="mt-1 font-mono text-sm text-zinc-500">
            {car.engine} · {car.trans}
          </p>
          {car.badges.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {car.badges.map((badgeId) => (
                <Badge key={badgeId} className="text-amber-600 dark:text-amber-glow">
                  {t.auto.badges[badgeId]}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </GlassCard>

      <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-semibold">{t.auto.buildSheetTitle}</h3>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {car.modCategories.map((group) => {
                const isOpen = openCategory === group.id;
                return (
                  <motion.div
                    key={`${car.id}-${group.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GlassCard className="overflow-hidden rounded-2xl">
                      <button
                        type="button"
                        onClick={() => setOpenCategory(isOpen ? null : group.id)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                      >
                        <span className="font-medium">{t.auto.modCategories[group.id]}</span>
                        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-black/5 px-5 pb-4 pt-3 text-sm dark:border-white/10"
                          >
                            {group.modIds.map((modId) => (
                              <li key={modId} className="flex items-start gap-2 py-1 text-zinc-600 dark:text-zinc-400">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-glow" />
                                {t.auto.mods[modId]}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">{t.auto.mediaTitle}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {YOUTUBE_VIDEO_IDS.auto.map((id) => (
              <YoutubeEmbed key={id} videoId={id} title={`${car.name} build video`} />
            ))}
          </div>

          <h3 className="mb-4 mt-8 text-lg font-semibold">{t.auto.galleryTitle}</h3>
          {AUTO_GALLERY.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {AUTO_GALLERY.map((image) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setLightboxSrc(image.src)}
                  className="group overflow-hidden rounded-2xl border border-black/5 dark:border-white/10"
                >
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    wrapperClassName="aspect-square w-full"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-black/10 bg-black/[0.03] p-8 text-center text-zinc-400 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-600">
              <ImageOff className="h-5 w-5" />
              <p className="text-sm font-medium">{t.auto.galleryComingSoonTitle}</p>
              <p className="text-xs">{t.auto.galleryComingSoonText}</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
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
                src={lightboxSrc}
                alt=""
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

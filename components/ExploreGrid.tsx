'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Camera, Car, Code2, Disc3 } from 'lucide-react';
import { useLanguage } from '@/app/providers';

const CARDS = [
  { id: 'tech', href: '/tech', icon: Code2 },
  { id: 'dj', href: '/dj', icon: Disc3 },
  { id: 'car', href: '/car', icon: Car },
  { id: 'media', href: '/media', icon: Camera },
] as const;

export default function ExploreGrid() {
  const { t } = useLanguage();

  return (
    <section id="explore" className="section-shell">
      <div className="mb-10 max-w-xl">
        <p className="kicker mb-3">{t.home.kicker}</p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.home.exploreTitle}</h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{t.home.exploreIntro}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          const copy = t.home.cards[card.id];
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Link href={card.href} className="block h-full">
                <div className="glass-card flex h-full items-start gap-4 p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-black/5 text-zinc-800 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{copy.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{copy.teaser}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

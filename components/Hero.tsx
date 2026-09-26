'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Mail } from 'lucide-react';
import { SITE } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import Badge from './ui/Badge';
import { NavigationArrowIcon, TerminalPromptIcon, WaveformIcon } from './ui/icons';

const BADGE_ICONS = {
  location: NavigationArrowIcon,
  live: WaveformIcon,
  available: TerminalPromptIcon,
} as const;

export default function Hero() {
  const { t } = useLanguage();
  const roles = t.hero.roles;
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">

      <div className="section-shell !py-32">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 flex flex-wrap gap-2">
            {t.hero.badges.map((badge) => {
              const Icon = BADGE_ICONS[badge.id as keyof typeof BADGE_ICONS];
              return (
                <Badge key={badge.id} className="gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-glow" />
                  {badge.label}
                </Badge>
              );
            })}
          </div>

          <h1 className="text-7xl font-bold tracking-tight sm:text-8xl md:text-9xl">
            <span className="bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-white">
              {SITE.name}
            </span>
          </h1>

          <div className="mt-4 h-9 text-xl font-medium text-zinc-600 dark:text-zinc-400 sm:text-2xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-glow dark:bg-white dark:text-black"
              >
                <Mail className="h-4 w-4" />
                {t.hero.ctaContact}
              </motion.span>
            </Link>
            <motion.button
              onClick={() => scrollTo('explore')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            >
              {t.hero.ctaExplore}
            </motion.button>
            <a
              href={SITE.epkUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              {t.hero.ctaEpk}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo('explore')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-500"
      >
        {t.hero.scrollHint}
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  );
}

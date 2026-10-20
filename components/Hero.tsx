'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ArrowDown, ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { SITE } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import Badge from './ui/Badge';
import { NavigationArrowIcon, TerminalPromptIcon, WaveformIcon } from './ui/icons';

const BADGE_ICONS = {
  location: NavigationArrowIcon,
  live: WaveformIcon,
  available: TerminalPromptIcon,
} as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  const { t } = useLanguage();
  const lenis = useLenis();
  const roles = t.hero.roles;
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -64 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="section-shell !py-32">
        <motion.div {...rise(0)} className="mb-8 flex flex-wrap gap-2">
          {t.hero.badges.map((badge) => {
            const Icon = BADGE_ICONS[badge.id as keyof typeof BADGE_ICONS];
            return (
              <Badge key={badge.id} className="gap-1.5 text-zinc-600 dark:text-zinc-300">
                <Icon className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-glow" />
                {badge.label}
              </Badge>
            );
          })}
        </motion.div>

        <motion.h1 {...rise(0.08)} className="text-7xl font-semibold tracking-tighter sm:text-8xl md:text-9xl">
          <span className="bg-gradient-to-b from-zinc-950 to-zinc-600 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
            {SITE.name}
          </span>
        </motion.h1>

        <motion.div {...rise(0.16)} className="mt-5 h-9 text-xl font-medium tracking-tight sm:text-2xl">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.4 }}
              className="text-shimmer inline-block"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p {...rise(0.24)} className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
          {t.hero.tagline}
        </motion.p>

        <motion.div {...rise(0.32)} className="mt-10 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => scrollTo('projects')} className="btn-shimmer">
            {t.hero.ctaProjects}
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-black/5 px-6 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <Mail className="h-4 w-4" />
            {t.hero.ctaContact}
          </Link>
          <a
            href={SITE.epkUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            <ExternalLink className="h-4 w-4" />
            {t.hero.ctaEpk}
          </a>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollTo('projects')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-28 left-1/2 hidden -translate-x-1/2 flex-col md:flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
      >
        {t.hero.scrollHint}
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  );
}

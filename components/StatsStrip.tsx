'use client';

import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/data';
import { DISCOGRAPHY } from '@/lib/discography';
import { GIGS } from '@/lib/links';
import { useLanguage } from '@/app/providers';
import CountUp from './ui/CountUp';

export default function StatsStrip() {
  const { t } = useLanguage();

  const stats = [
    { value: PROJECTS.length, label: t.home.statsProjects },
    { value: DISCOGRAPHY.length, label: t.home.statsTracks },
    { value: GIGS.length, label: t.home.statsGigs },
  ];

  return (
    <section className="section-shell !py-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-panel rounded-3xl p-8 text-center"
          >
            <p className="text-5xl font-bold tabular-nums">
              <CountUp value={stat.value} />+
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-wide text-zinc-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

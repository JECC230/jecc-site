'use client';

import { motion } from 'framer-motion';
import { TECH_STACK } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import SectionHeading from './ui/SectionHeading';
import { ProjectGrid } from './ProjectsSection';
import Badge from './ui/Badge';

export default function TechSection() {
  const { t } = useLanguage();

  return (
    <section id="tech" className="section-shell">
      <SectionHeading kicker={t.tech.kicker} title={t.tech.title} intro={t.tech.intro} />

      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {t.tech.stackTitle}
      </h3>
      <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TECH_STACK.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass-card p-5"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {t.tech.projectsTitle}
      </h3>
      <ProjectGrid />
    </section>
  );
}

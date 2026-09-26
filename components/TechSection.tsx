'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { PROJECTS, TECH_STACK } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import SectionHeading from './ui/SectionHeading';
import SpotlightCard from './ui/SpotlightCard';
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
            className="glass-panel rounded-2xl p-5"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <SpotlightCard className="flex h-full flex-col p-6">
              <h4 className="text-lg font-semibold">{project.title}</h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.tech.projects[project.id]}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} className="text-[11px]">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-medium">
                {project.links.length > 0 ? (
                  project.links.map((link) => (
                    <a
                      key={link.key}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-cyan-600 dark:text-zinc-300 dark:hover:text-cyan-glow"
                    >
                      <Github className="h-4 w-4" />
                      {t.tech.linkLabels[link.key]}
                    </a>
                  ))
                ) : (
                  <span className="text-xs uppercase tracking-wide text-zinc-500">{t.tech.noPublicRepo}</span>
                )}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

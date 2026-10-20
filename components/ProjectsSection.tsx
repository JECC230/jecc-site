'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import SectionHeading from './ui/SectionHeading';
import ProjectCard from './ProjectCard';
import ProModal from './ProModal';

export function ProjectGrid() {
  // `teaser` outlives `open` so the modal keeps its copy during the exit animation.
  const [teaser, setTeaser] = useState({ feature: '', product: '' });
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            className={i === 0 ? 'md:col-span-2' : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <ProjectCard
              project={project}
              onPro={(feature) => {
                setTeaser({ feature, product: project.title });
                setOpen(true);
              }}
            />
          </motion.div>
        ))}
      </div>
      <ProModal open={open} feature={teaser.feature} product={teaser.product} onClose={() => setOpen(false)} />
    </>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-shell">
      <SectionHeading kicker={t.projectsHub.kicker} title={t.projectsHub.title} intro={t.projectsHub.intro} />
      <ProjectGrid />
    </section>
  );
}

'use client';

import { ArrowUpRight, Github, Lock, Sparkles } from 'lucide-react';
import type { Project } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import Badge from './ui/Badge';

export default function ProjectCard({ project, onPro }: { project: Project; onPro: (feature: string) => void }) {
  const { t } = useLanguage();

  return (
    <article className="glass-card group flex h-full flex-col p-7 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        {project.live && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {t.projectsHub.live}
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{t.tech.projects[project.id]}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag} className="text-[11px]">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium">
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-zinc-900 transition-colors hover:text-cyan-600 dark:text-zinc-100 dark:hover:text-cyan-glow">
            {t.projectsHub.open}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
        {project.links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-zinc-600 transition-colors hover:text-cyan-600 dark:text-zinc-300 dark:hover:text-cyan-glow"
          >
            <Github className="h-4 w-4" />
            {t.tech.linkLabels[link.key]}
          </a>
        ))}
        {!project.live && project.links.length === 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            <Lock className="h-3.5 w-3.5" />
            {t.tech.noPublicRepo}
          </span>
        )}
        {project.pro && (
          <button
            type="button"
            onClick={() => onPro(project.pro!)}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-violet-glow/30 bg-violet-glow/10 px-3 py-1 text-xs font-semibold text-violet-700 transition-colors hover:bg-violet-glow/20 dark:text-violet-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t.pro.features[project.pro]}
            <span className="rounded-full bg-gradient-to-r from-cyan-glow via-violet-glow to-cyan-glow bg-[length:200%_auto] px-1.5 text-[10px] text-white animate-gradient-x">
              {t.pro.badge}
            </span>
          </button>
        )}
      </div>
    </article>
  );
}

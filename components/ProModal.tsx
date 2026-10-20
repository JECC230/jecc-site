'use client';

import { Bell, Sparkles } from 'lucide-react';
import { SITE } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import Modal from './ui/Modal';

// The "Pro" teaser for costly AI / API features. It deliberately calls
// nothing: interest is captured as a pre-filled email draft, so there is no
// endpoint to abuse and no paid request can ever be triggered from here.
export default function ProModal({
  open,
  feature,
  product,
  onClose,
}: {
  open: boolean;
  feature: string;
  product: string;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const label = t.pro.features[feature] ?? '';
  const mailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(`Pro — ${product}: ${label}`)}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t.pro.title}
      description={t.pro.body}
      icon={
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-glow via-violet-glow to-cyan-glow bg-[length:200%_auto] text-white shadow-accent animate-gradient-x">
          <Sparkles className="h-5 w-5" />
        </div>
      }
    >
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/5 px-4 py-3 text-sm dark:bg-white/5">
        <span className="text-zinc-500 dark:text-zinc-400">{product}</span>
        <span className="mx-2 text-zinc-500 dark:text-zinc-400">/</span>
        <span className="font-medium">{label}</span>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-5 py-2.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {t.pro.dismiss}
        </button>
        <a href={mailto} onClick={onClose} className="btn-shimmer">
          <Bell className="h-4 w-4" />
          {t.pro.notify}
        </a>
      </div>
    </Modal>
  );
}

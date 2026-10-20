'use client';

import { useState } from 'react';
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import { useLanguage } from '@/app/providers';
import Modal from './ui/Modal';

// "Right to be forgotten" panel for products that have accounts. This site
// itself has none, so it isn't mounted anywhere here — drop it into an
// account settings page and pass an `onConfirm` that hard-deletes Storage,
// Auth and the Stripe customer server-side.
export default function DangerZone({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const [busy, setBusy] = useState(false);
  const armed = typed.trim() === t.danger.confirmWord;

  const close = () => {
    if (busy) return;
    setOpen(false);
    setTyped('');
  };

  const confirm = async () => {
    if (!armed) return;
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
      setOpen(false);
      setTyped('');
    }
  };

  return (
    <section className="rounded-3xl border border-red-500/20 bg-red-500/[0.04] p-6 backdrop-blur-md">
      <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight text-red-600 dark:text-red-400">
        <AlertTriangle className="h-4 w-4" />
        {t.danger.zoneTitle}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{t.danger.zoneBody}</p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500"
      >
        <Trash2 className="h-4 w-4" />
        {t.danger.open}
      </button>

      <Modal open={open} onClose={close} title={t.danger.title} description={t.danger.body} className="border-red-500/20">
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {t.danger.items.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-500" />
              {item}
            </li>
          ))}
        </ul>
        <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400" htmlFor="danger-confirm">
          {t.danger.confirmLabel}
        </label>
        <input
          id="danger-confirm"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          maxLength={20}
          autoComplete="off"
          spellCheck={false}
          className="mt-2 w-full rounded-xl border border-red-500/20 bg-transparent px-4 py-2.5 font-mono text-sm outline-none ring-red-500/40 focus:ring-2"
        />
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={close}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {t.danger.cancel}
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={!armed || busy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            {t.danger.confirm}
          </button>
        </div>
      </Modal>
    </section>
  );
}

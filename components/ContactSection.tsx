'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { SITE, SOCIAL_LINKS } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';

// Hard caps enforced by the browser (maxLength) and shown as live counters.
const LIMITS = { name: 80, email: 120, message: 1000 } as const;
type Field = keyof typeof LIMITS;

// Collapses control characters (incl. line breaks) so a pasted value can't
// smuggle extra lines into the mailto subject.
const singleLine = (value: string) => value.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();

export default function ContactSection() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');
  const [lengths, setLengths] = useState<Record<Field, number>>({ name: 0, email: 0, message: 0 });

  // Read the length now: React nulls `currentTarget` before a deferred updater runs.
  const track = (field: Field) => (e: { currentTarget: { value: string } }) => {
    const length = e.currentTarget.value.length;
    setLengths((prev) => ({ ...prev, [field]: length }));
  };

  const counter = (field: Field) => (
    <span
      aria-live="polite"
      className={`text-[11px] tabular-nums ${LIMITS[field] - lengths[field] <= 10 ? 'text-amber-500' : 'text-zinc-500 dark:text-zinc-400'}`}
    >
      {LIMITS[field] - lengths[field]} {t.contact.charsLeft}
    </span>
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = singleLine(String(form.get('name') ?? '')).slice(0, LIMITS.name);
    const email = singleLine(String(form.get('email') ?? '')).slice(0, LIMITS.email);
    const message = String(form.get('message') ?? '').slice(0, LIMITS.message);

    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    // A synthetic link click (rather than window.location.href) matches how a
    // real mailto: link behaves, so the browser hands off to the mail app
    // without registering it as a failed page navigation.
    const link = document.createElement('a');
    link.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;
    link.click();

    setStatus('sent');
    e.currentTarget.reset();
    setLengths({ name: 0, email: 0, message: 0 });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="section-shell">
      <SectionHeading kicker={t.contact.kicker} title={t.contact.title} intro={t.contact.intro} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <GlassCard className="p-6 lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {t.contact.nameLabel}
                </label>
                {counter('name')}
              </div>
              <input
                id="name"
                name="name"
                maxLength={LIMITS.name}
                onInput={track('name')}
                type="text"
                required
                placeholder={t.contact.namePlaceholder}
                className="w-full rounded-xl border border-black/5 bg-white/60 px-4 py-2.5 text-sm outline-none ring-cyan-glow/40 backdrop-blur-md transition-shadow placeholder:text-zinc-500 focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-zinc-500"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {t.contact.emailLabel}
                </label>
                {counter('email')}
              </div>
              <input
                id="email"
                name="email"
                maxLength={LIMITS.email}
                onInput={track('email')}
                type="email"
                required
                placeholder={t.contact.emailPlaceholder}
                className="w-full rounded-xl border border-black/5 bg-white/60 px-4 py-2.5 text-sm outline-none ring-cyan-glow/40 backdrop-blur-md transition-shadow placeholder:text-zinc-500 focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-zinc-500"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {t.contact.messageLabel}
                </label>
                {counter('message')}
              </div>
              <textarea
                id="message"
                name="message"
                maxLength={LIMITS.message}
                onInput={track('message')}
                required
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                className="w-full resize-none rounded-xl border border-black/5 bg-white/60 px-4 py-2.5 text-sm outline-none ring-cyan-glow/40 backdrop-blur-md transition-shadow placeholder:text-zinc-500 focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:placeholder:text-zinc-500"
              />
            </div>
            <button
              type="submit"
              className="btn-shimmer"
            >
              <Send className="h-4 w-4" />
              {t.contact.send}
            </button>
            {status === 'sent' && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-cyan-600 dark:text-cyan-glow"
              >
                {t.contact.sent}
              </motion.p>
            )}
          </form>
        </GlassCard>

        <GlassCard className="p-6 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{t.contact.socialsTitle}</h3>
          <div className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-black/5 hover:text-cyan-600 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-cyan-glow"
                >
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

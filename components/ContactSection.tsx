'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { SITE, SOCIAL_LINKS } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';

export default function ContactSection() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const message = String(form.get('message') ?? '');

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
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="section-shell">
      <SectionHeading kicker={t.contact.kicker} title={t.contact.title} intro={t.contact.intro} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <GlassCard className="p-6 lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t.contact.nameLabel}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={t.contact.namePlaceholder}
                className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm outline-none ring-cyan-glow/40 transition-shadow focus:ring-2 dark:border-white/10 dark:bg-white/[0.04]"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t.contact.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={t.contact.emailPlaceholder}
                className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm outline-none ring-cyan-glow/40 transition-shadow focus:ring-2 dark:border-white/10 dark:bg-white/[0.04]"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {t.contact.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder={t.contact.messagePlaceholder}
                className="w-full resize-none rounded-xl border border-black/10 bg-white/70 px-4 py-2.5 text-sm outline-none ring-cyan-glow/40 transition-shadow focus:ring-2 dark:border-white/10 dark:bg-white/[0.04]"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-black"
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
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">{t.contact.socialsTitle}</h3>
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

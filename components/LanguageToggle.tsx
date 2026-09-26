'use client';

import { useLanguage } from '@/app/providers';
import { LANGS } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      aria-label={t.langToggle.label}
      className="flex items-center rounded-full border border-black/5 bg-white/70 p-0.5 text-xs font-semibold uppercase tracking-wide dark:border-white/10 dark:bg-white/[0.06]"
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            'rounded-full px-2.5 py-1 transition-colors',
            lang === l
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

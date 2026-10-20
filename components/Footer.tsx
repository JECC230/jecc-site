'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { NAV_ITEMS, SITE } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import Logo from './ui/Logo';

export default function Footer() {
  const { t } = useLanguage();

  const legalLinks = [
    { href: '/privacy/', label: t.legal.privacy },
    { href: '/privacy/#arco', label: t.legal.rights },
    { href: '/privacy/#marcas', label: t.legal.trademarks },
  ];

  return (
    <footer className="relative z-10 mt-16 bg-white/40 backdrop-blur-xl dark:bg-white/[0.02]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 pb-16 pt-24 sm:grid-cols-3 sm:px-8 lg:px-10">
        <div>
          <Link href="/" aria-label={SITE.fullName} className="inline-block">
            <Logo className="h-10" />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{t.legal.brandTagline}</p>
          <a href={`mailto:${SITE.contactEmail}`} className="mt-4 inline-block text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 dark:text-zinc-300">
            {SITE.contactEmail}
          </a>
        </div>

        <nav aria-label={t.legal.productTitle}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">{t.legal.productTitle}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="text-zinc-600 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 dark:text-zinc-300">
                  {t.nav[item.id as keyof typeof t.nav]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.legal.legalTitle}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">{t.legal.legalTitle}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-zinc-600 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 dark:text-zinc-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
            {t.legal.localFirst}
          </p>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-36 pt-4 sm:px-8 md:pb-28 lg:px-10">
        <p className="max-w-3xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">{t.legal.disclaimer}</p>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} {SITE.name} · {SITE.location} · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

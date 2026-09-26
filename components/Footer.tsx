'use client';

import Link from 'next/link';
import { NAV_ITEMS, SITE } from '@/lib/data';
import { useLanguage } from '@/app/providers';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-black/5 px-6 py-10 dark:border-white/10 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} href={item.href} className="transition-colors hover:text-zinc-900 dark:hover:text-white">
              {t.nav[item.id as keyof typeof t.nav]}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} {SITE.name} · {SITE.location} · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

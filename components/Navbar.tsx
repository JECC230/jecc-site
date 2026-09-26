'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

// next.config.mjs sets trailingSlash: true, so rendered <Link> hrefs and
// usePathname() don't always agree on a trailing slash — strip it before comparing.
const stripTrailingSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const currentPath = stripTrailingSlash(pathname);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      {/*
        The whole pill (links + divider + toggles) scrolls as ONE unit on
        narrow screens, with an edge fade hinting there's more — previously
        only the icon row scrolled while the toggles lived outside it, so on
        a phone-width viewport the pill simply overflowed past the screen
        edge and the theme toggle (and Media/Contact) were unreachable.
      */}
      <nav
        className="glass-panel flex max-w-full items-center gap-1 overflow-x-auto rounded-full px-2 py-2 shadow-glow"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent)', maskImage: 'linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent)' }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === stripTrailingSlash(item.href);
          return (
            <Link key={item.id} href={item.href} className="shrink-0">
              <motion.span
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.94 }}
                className={cn(
                  'relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-white dark:text-black' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10 hidden sm:inline">{t.nav[item.id as keyof typeof t.nav]}</span>
              </motion.span>
            </Link>
          );
        })}
        <div className="mx-1 h-6 w-px shrink-0 bg-black/10 dark:bg-white/10" />
        <div className="flex shrink-0 items-center gap-1.5 pr-0.5">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}

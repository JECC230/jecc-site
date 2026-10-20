'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { NAV_ITEMS } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import Logo from './ui/Logo';

// next.config.mjs sets trailingSlash: true, so rendered <Link> hrefs and
// usePathname() don't always agree on a trailing slash — strip it before comparing.
const stripTrailingSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

const PILL_SPRING = { type: 'spring', stiffness: 380, damping: 32 } as const;

// Two layouts from one source of truth:
// - md and up: a single top bar — logo left, text-only section links truly
//   centered, language/theme toggles right.
// - below md: no top bar at all, so content gets the full screen. Sections live
//   in an iOS-style floating tab bar at the bottom and the toggles in a small
//   floating pill in the top-right corner.
export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const currentPath = stripTrailingSlash(pathname);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  // Transparent while resting at the very top; frosted glass + hairline border
  // once the page has been scrolled down. Lenis drives the native scroll
  // position, so a plain scroll listener sees its inertia too.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = NAV_ITEMS.map((item) => ({
    ...item,
    label: t.nav[item.id as keyof typeof t.nav],
    isActive: currentPath === stripTrailingSlash(item.href),
  }));

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 hidden border-b transition-[background-color,border-color,backdrop-filter] duration-500 md:block',
          scrolled
            ? 'border-black/5 bg-zinc-50/70 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/60'
            : 'border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-8 lg:px-10">
          {/* The mark itself is only ~15x24px, so the padding (offset by the
              negative margin) gives it a full 44px tap target. Already on the
              home page, a click glides back to the top instead of doing nothing. */}
          <Link
            href="/"
            aria-label={t.nav.homeLabel}
            onClick={(e) => {
              if (currentPath !== '/') return;
              e.preventDefault();
              if (lenis) lenis.scrollTo(0);
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative z-10 -m-2.5 block justify-self-start rounded-xl p-2.5 transition-opacity hover:opacity-70"
          >
            <Logo className="h-6" />
          </Link>

          <nav aria-label="Main" className="flex items-center gap-1">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={item.isActive ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  item.isActive ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50'
                )}
              >
                {item.isActive && (
                  <motion.span
                    layoutId="nav-pill-desktop"
                    className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/10"
                    transition={PILL_SPRING}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Phones have no top bar: the toggles float on their own in the corner. */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-panel fixed right-4 top-4 z-50 flex gap-1 rounded-full p-1 md:hidden"
      >
        <LanguageToggle />
        <ThemeToggle />
      </motion.div>

      <motion.nav
        aria-label="Main"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-md items-stretch justify-center rounded-[1.75rem] border border-black/5 bg-white/70 p-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:border-white/5 dark:bg-zinc-900/70">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={item.isActive ? 'page' : undefined}
                  className={cn(
                    'relative flex flex-col items-center gap-1 rounded-[1.25rem] py-2 text-[10px] font-semibold transition-colors',
                    item.isActive ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-500 dark:text-zinc-400'
                  )}
                >
                  {item.isActive && (
                    <motion.span
                      layoutId="nav-pill-mobile"
                      className="absolute inset-0 rounded-[1.25rem] bg-black/5 dark:bg-white/10"
                      transition={PILL_SPRING}
                    />
                  )}
                  <Icon className="relative z-10 h-5 w-5" strokeWidth={item.isActive ? 2.25 : 1.75} />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}

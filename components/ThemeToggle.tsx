'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme, useLanguage } from '@/app/providers';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t.themeToggle.light : t.themeToggle.dark}
      title={isDark ? t.themeToggle.light : t.themeToggle.dark}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/5 bg-white/70 text-zinc-700 transition-colors hover:text-cyan-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-300 dark:hover:text-cyan-glow"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

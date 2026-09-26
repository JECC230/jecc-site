'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { dictionaries, type Lang } from '@/lib/i18n';

// ---------------------------------------------------------------------------
// Theme (system-aware, zero-flash — the blocking script in app/layout.tsx
// already applies the right class before paint; this just keeps React state
// and localStorage in sync so the toggle works).
// ---------------------------------------------------------------------------
type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem('jecc-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Starts at the same fixed value the server renders, then corrects itself
  // right after mount — never during the initial render, so server and
  // client agree on the first paint and React never sees a hydration
  // mismatch (the blocking script in layout.tsx already set the right CSS
  // class before paint, so there's no visual flash either way).
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('jecc-theme', theme);
  }, [theme, mounted]);

  // Follow the OS preference live, unless the visitor already picked one manually.
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!window.localStorage.getItem('jecc-theme-manual')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const toggleTheme = useCallback(() => {
    window.localStorage.setItem('jecc-theme-manual', '1');
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within Providers');
  return ctx;
}

// ---------------------------------------------------------------------------
// Language (browser-detected default, persisted override, EN/ES dictionary)
// ---------------------------------------------------------------------------
const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (typeof dictionaries)['en'] } | null>(
  null
);

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem('jecc-lang');
  if (stored === 'en' || stored === 'es') return stored;
  return window.navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Same reasoning as ThemeProvider above: start at the server's fixed
  // default ('en') and correct after mount, so hydration never mismatches.
  // Non-English visitors briefly see English text before this corrects it —
  // unavoidable on a fully static export with no server-side knowledge of
  // the visitor's language.
  const [lang, setLangState] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLangState(getInitialLang());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang;
    window.localStorage.setItem('jecc-lang', lang);
  }, [lang, mounted]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within Providers');
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}

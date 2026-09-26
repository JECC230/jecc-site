import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import PageTransition from './page-transition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/ui/CursorGlow';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import SocialDock from '@/components/SocialDock';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://jecc.mx'),
  title: 'JECC — Juan Esteban Campos Cruz',
  description:
    'Software Engineer, DJ & Music Producer, and Automotive Builder based in Chihuahua, MX. Code, sound, and builds — one hub.',
  keywords: ['JECC', 'Juan Esteban Campos Cruz', 'Software Engineer', 'DJ', 'Music Producer', 'Nissan 350Z', 'Chihuahua'],
  openGraph: {
    title: 'JECC — Juan Esteban Campos Cruz',
    description: 'Software Engineer, DJ & Music Producer, and Automotive Builder.',
    url: 'https://jecc.mx',
    siteName: 'JECC',
    type: 'website',
  },
};

// Runs before hydration: applies the right theme class immediately (no flash)
// and best-effort sets <html lang> ahead of the React-driven language state.
const noFlashScript = `
(function () {
  try {
    var theme = localStorage.getItem('jecc-theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');

    var lang = localStorage.getItem('jecc-lang');
    if (!lang) {
      lang = (navigator.language || 'en').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
    }
    document.documentElement.lang = lang;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          <AnimatedBackground />
          <CursorGlow />
          <Navbar />
          <main className="relative">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <SocialDock />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import PageTransition from './page-transition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';
import SmoothScroll from '@/components/SmoothScroll';
import SocialDock from '@/components/SocialDock';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

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
      <body className={`${geist.variable} ${geistMono.variable} font-sans font-medium antialiased`} suppressHydrationWarning>
        <Providers>
          <SmoothScroll>
            <InteractiveBackground />
            <Navbar />
            <main className="relative z-10">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <SocialDock />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}

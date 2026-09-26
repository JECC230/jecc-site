'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  // Deliberately NOT AnimatePresence. Coordinating an exit animation means
  // React only removes the outgoing page from the DOM once that animation's
  // completion callback fires — and if anything interrupts it (which kept
  // happening here), the old page's node never gets removed. It just sits in
  // normal document flow, pushing the new page down, stacking further with
  // every navigation until a hard reload clears it.
  //
  // A plain `key`-ed div has no such failure mode: changing `key` makes React
  // synchronously unmount the old node and mount a new one in the same
  // commit, guaranteed, every time. The CSS animation below still gives each
  // page a fade/slide-in entrance — it just never depends on an exit
  // finishing first.
  return (
    <div key={pathname} className="animate-fade-up">
      {children}
    </div>
  );
}

'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

// Global inertial scroll. Visitors who ask the OS for reduced motion keep the
// browser's native wheel scrolling. ReactLenis always stays in the tree (only
// its options change) so toggling this never remounts the page underneath.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reduced }}>
      {children}
    </ReactLenis>
  );
}

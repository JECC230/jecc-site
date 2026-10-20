'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Two native variants instead of a CSS invert: black for light mode, white for dark.
const LOGO_LIGHT_SRC = '/logo-black.png';
const LOGO_DARK_SRC = '/logo-white.png';
const LOGO_DRIFT = 0.05;
const SPRING_CONFIG = { stiffness: 50, damping: 20, mass: 0.9 };

export default function InteractiveBackground() {
  const [isMounted, setIsMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  const logoX = useTransform(smoothX, (v) => (v - (typeof window === 'undefined' ? 0 : window.innerWidth / 2)) * LOGO_DRIFT);
  const logoY = useTransform(smoothY, (v) => (v - (typeof window === 'undefined' ? 0 : window.innerHeight / 2)) * LOGO_DRIFT);

  const lightMask = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)`;

  useEffect(() => {
    setIsMounted(true);
    mouseX.jump(window.innerWidth / 2);
    mouseY.jump(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  // The mark is portrait, so it's sized by height to stay inside the viewport.
  const baseLogoClass = 'absolute left-1/2 top-1/2 h-[min(72vh,640px)] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-transparent">
      <motion.div
        className="absolute inset-0"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div className="absolute inset-0" style={{ x: logoX, y: logoY }}>
          <img src={LOGO_LIGHT_SRC} alt="" draggable={false} className={`${baseLogoClass} opacity-[0.03] dark:hidden`} />
          <img src={LOGO_DARK_SRC} alt="" draggable={false} className={`${baseLogoClass} hidden opacity-[0.03] dark:block`} />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ maskImage: lightMask, WebkitMaskImage: lightMask }}>
          <motion.div className="absolute inset-0" style={{ x: logoX, y: logoY }}>
            <img src={LOGO_LIGHT_SRC} alt="" draggable={false} className={`${baseLogoClass} opacity-[0.08] dark:hidden`} />
            <img src={LOGO_DARK_SRC} alt="" draggable={false} className={`${baseLogoClass} hidden opacity-[0.08] dark:block`} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

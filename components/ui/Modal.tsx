'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { X } from 'lucide-react';
import { useFocusTrap } from '@/lib/useFocusTrap';
import { useLanguage } from '@/app/providers';
import { cn } from '@/lib/utils';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

// Portaled to <body>: <main> is `relative z-10`, which would otherwise trap a
// modal rendered inside it underneath the fixed navbar.
export default function Modal({ open, onClose, title, description, icon, children, className }: ModalProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);

  useFocusTrap(panelRef, open, onClose);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [open, lenis]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            tabIndex={-1}
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-white/80 p-7 shadow-2xl outline-none backdrop-blur-xl dark:bg-zinc-900/70',
              className
            )}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.modal.close}
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-zinc-100 dark:text-zinc-400"
            >
              <X className="h-4 w-4" />
            </button>
            {icon && <div className="mb-5">{icon}</div>}
            <h2 id={titleId} className="pr-8 text-xl font-semibold tracking-tight">
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {description}
              </p>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

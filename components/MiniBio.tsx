'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/app/providers';

export default function MiniBio() {
  const { t } = useLanguage();

  return (
    <section className="section-shell !py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="glass-panel max-w-3xl rounded-3xl p-8 sm:p-10"
      >
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">{t.home.bio}</p>
      </motion.div>
    </section>
  );
}

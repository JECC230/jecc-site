'use client';

import { SITE } from '@/lib/data';
import { useLanguage } from '@/app/providers';
import SectionHeading from '@/components/ui/SectionHeading';

export default function PrivacyPage() {
  const { t } = useLanguage();
  const page = t.legal.privacyPage;

  return (
    <section className="section-shell !pt-32">
      <SectionHeading kicker={page.kicker} title={page.title} intro={page.updated} />
      <div className="max-w-2xl space-y-6">
        {page.sections.map((section) => (
          <article key={section.id} id={section.id} className="glass-panel scroll-mt-24 rounded-3xl p-7">
            <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{section.body}</p>
          </article>
        ))}
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {page.contactLabel}{' '}
          <a href={`mailto:${SITE.contactEmail}`} className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100">
            {SITE.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}

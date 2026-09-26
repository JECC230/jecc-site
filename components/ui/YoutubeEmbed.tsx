'use client';

import { useState } from 'react';
import { Film, Loader2 } from 'lucide-react';
import { useLanguage } from '@/app/providers';
import { cn } from '@/lib/utils';

export function isPlaceholderId(id: string) {
  return id.startsWith('YOUR_');
}

export default function YoutubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  if (isPlaceholderId(videoId)) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-black/10 bg-black/[0.03] p-4 text-center text-zinc-400 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-600">
        <Film className="h-5 w-5" />
        <span className="text-xs font-medium">{t.status.videoComingSoon}</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400 dark:text-zinc-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-[11px] font-medium">{t.status.loadingVideo}</span>
        </div>
      )}
      <iframe
        className={cn('h-full w-full transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0')}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

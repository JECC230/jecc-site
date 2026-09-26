'use client';

import { useState, type ImgHTMLAttributes } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';
import { useLanguage } from '@/app/providers';
import { cn } from '@/lib/utils';

type SmartImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
};

// A plain <img> that tells the visitor what's happening instead of leaving a
// blank box: a "creating content for you" placeholder while it loads, and a
// clear error state (not a broken-image icon) if the request fails.
export default function SmartImage({ src, alt, className, wrapperClassName, ...props }: SmartImageProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className={cn('relative bg-zinc-100 dark:bg-zinc-900', wrapperClassName)}>
      {status !== 'error' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn('transition-opacity duration-500', status === 'loaded' ? 'opacity-100' : 'opacity-0', className)}
          {...props}
        />
      )}
      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400 dark:text-zinc-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="px-2 text-center text-[11px] font-medium">{t.status.loadingImage}</span>
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-400 dark:text-zinc-600">
          <ImageOff className="h-5 w-5" />
          <span className="px-2 text-center text-[11px] font-medium">{t.status.imageError}</span>
        </div>
      )}
    </div>
  );
}

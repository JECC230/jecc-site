import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export default function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-300',
        className
      )}
      {...props}
    />
  );
}

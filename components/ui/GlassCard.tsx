import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export default function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('glass-panel rounded-3xl', className)} {...props} />;
}

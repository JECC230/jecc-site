import { cn } from '@/lib/utils';

// The official mark in its two native variants: black on light, white on dark.
// It's portrait (248x384), so size it by height (e.g. `h-6`) and let width follow.
export default function Logo({ className, alt = '' }: { className?: string; alt?: string }) {
  const base = cn('w-auto select-none', className);
  return (
    <>
      <img src="/logo-black.png" alt={alt} width={248} height={384} draggable={false} className={cn(base, 'dark:hidden')} />
      <img src="/logo-white.png" alt={alt} width={248} height={384} draggable={false} className={cn(base, 'hidden dark:block')} />
    </>
  );
}

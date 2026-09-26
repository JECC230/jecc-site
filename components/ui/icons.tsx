import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

type IconProps = SVGProps<SVGSVGElement>;

// Custom-drawn, SF Symbols-inspired glyphs — not stock icon-library art.
// Kept as their own components so they read consistently at badge size (14–16px).

// A solid navigation/compass arrow, in the spirit of iOS's "current location" glyph.
export function NavigationArrowIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('h-3.5 w-3.5', className)} {...props}>
      <path d="M12 1.4 18.6 21.2c.18.53-.4.99-.87.7L12 18.4l-5.73 3.5c-.47.29-1.05-.17-.87-.7L12 1.4Z" />
    </svg>
  );
}

// A five-bar equalizer, in the spirit of SF Symbols' "waveform".
export function WaveformIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={cn('h-3.5 w-3.5', className)}
      {...props}
    >
      <line x1="4" y1="10" x2="4" y2="14" />
      <line x1="8.5" y1="6" x2="8.5" y2="18" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="15.5" y1="6" x2="15.5" y2="18" />
      <line x1="20" y1="9" x2="20" y2="15" />
    </svg>
  );
}

// A terminal prompt — chevron + blinking cursor — in the spirit of Apple's Terminal glyph.
export function TerminalPromptIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-3.5 w-3.5', className)}
      {...props}
    >
      <path d="M7 7.5 12 12 7 16.5" />
      <line x1="13.5" y1="16.5" x2="17.5" y2="16.5" className="animate-pulse" />
    </svg>
  );
}

// A note with a motion trail — evokes TikTok's sound identity without tracing its mark.
export function TikTokIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('h-4 w-4', className)} {...props}>
      <circle cx="9.5" cy="16.5" r="3" stroke="currentColor" strokeWidth={1.8} />
      <path
        d="M12.5 16.5V4.5c0 2.4 1.9 4.3 4.3 4.4"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Three concentric arcs — the rhythm of Spotify's mark, redrawn as thin outline.
export function SpotifyIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9.3" />
      <path d="M7 10c3.5-1 6.5-1 10 1" />
      <path d="M7.3 13c2.8-.8 5.2-.8 8 .8" />
      <path d="M7.6 16c2.1-.6 4-.6 6 .6" />
    </svg>
  );
}

// A single quarter note — the plainest possible mark for Apple Music.
export function AppleMusicIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('h-4 w-4', className)} {...props}>
      <path d="M16.5 3.5 9.8 5.1a1 1 0 0 0-.77 1v8.6a3 3 0 1 0 1.5 2.6v-8L15.75 8V13a3 3 0 1 0 1.5 2.6V4a1 1 0 0 0-.75-.97Z" />
    </svg>
  );
}

// A cloud over a small waveform — SoundCloud's idea, drawn from scratch.
export function SoundCloudIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('h-4 w-4', className)} {...props}>
      <path
        d="M6 17.5a3 3 0 0 1-.4-5.98A4.5 4.5 0 0 1 14 10.2a3.3 3.3 0 0 1 4.5 3.3 3 3 0 0 1-.5 4h-12Z"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M9 13.5v3M11 12v4.5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

// A center dot with two satellites on a broken ring — "more, connected" for the dock toggle.
export function OrbitIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('h-4 w-4', className)} {...props}>
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth={1.4} strokeDasharray="2.2 3.4" />
      <circle cx="18.6" cy="8.4" r="1.4" fill="currentColor" />
      <circle cx="5.6" cy="16.4" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

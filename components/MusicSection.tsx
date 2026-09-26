'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Disc3, ExternalLink, MapPin, Music4, Youtube } from 'lucide-react';
import { DJ_GEAR, LIVE_SETS, MUSIC_GENRES } from '@/lib/data';
import { ARTIST_LINKS, ARTIST_MEDIA, GIGS, OFFICIAL_LINKS, SOCIAL_PROFILES } from '@/lib/links';
import { DISCOGRAPHY } from '@/lib/discography';
import { useLanguage } from '@/app/providers';
import SectionHeading from './ui/SectionHeading';
import Badge from './ui/Badge';
import GlassCard from './ui/GlassCard';
import YoutubeEmbed from './ui/YoutubeEmbed';
import SmartImage from './ui/SmartImage';
import { AppleMusicIcon, SoundCloudIcon, SpotifyIcon } from './ui/icons';

const STREAMING_LINKS = [
  { label: 'Spotify', href: SOCIAL_PROFILES.spotify, icon: SpotifyIcon },
  { label: 'Apple Music', href: SOCIAL_PROFILES.appleMusic, icon: AppleMusicIcon },
  { label: 'SoundCloud', href: SOCIAL_PROFILES.soundcloud, icon: SoundCloudIcon },
  { label: 'YouTube', href: SOCIAL_PROFILES.youtube, icon: Youtube },
];

export default function MusicSection() {
  const { t } = useLanguage();
  const [openSet, setOpenSet] = useState<string | null>(LIVE_SETS[0]?.id ?? null);

  return (
    <section id="music" className="section-shell">
      <SectionHeading kicker={t.music.kicker} title={t.music.title} intro={t.music.intro} />

      <GlassCard className="mb-10 overflow-hidden rounded-3xl">
        <div className="relative h-40 w-full sm:h-56">
          <SmartImage
            src={ARTIST_MEDIA.cover}
            alt="JECC cover"
            wrapperClassName="h-full w-full"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
        <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="-mt-12 flex items-end gap-4 sm:-mt-14">
            <SmartImage
              src={ARTIST_MEDIA.avatar}
              alt="JECC"
              wrapperClassName="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-glass dark:border-zinc-950 sm:h-28 sm:w-28"
              className="h-full w-full object-cover"
            />
            <div className="pb-1">
              <p className="text-lg font-semibold">JECC</p>
              <p className="text-sm text-zinc-500">DJ & Music Producer</p>
            </div>
          </div>
          <a
            href={OFFICIAL_LINKS.epk}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-black"
          >
            <ExternalLink className="h-4 w-4" />
            {t.music.epkCta}
          </a>
        </div>
      </GlassCard>

      <div className="mb-10 flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{t.music.streamingTitle}</span>
        {STREAMING_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="glass-panel flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </a>
          );
        })}
      </div>

      <div className="mb-14 flex flex-wrap gap-2">
        {MUSIC_GENRES.map((genre) => (
          <Badge key={genre} className="gap-2">
            <Disc3 className="h-3.5 w-3.5" />
            {genre}
          </Badge>
        ))}
      </div>

      <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-1">
          <h3 className="mb-2 text-lg font-semibold">{t.music.gearTitle}</h3>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{t.music.gearIntro}</p>
          <ul className="space-y-2 text-sm">
            {DJ_GEAR.map((gear) => (
              <li key={gear} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow" />
                <span className="font-mono text-[13px] text-zinc-700 dark:text-zinc-300">{gear}</span>
              </li>
            ))}
          </ul>

          <h4 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {t.music.artistLinksTitle}
          </h4>
          <div className="flex flex-col gap-1.5">
            {ARTIST_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-medium text-zinc-700 hover:text-cyan-600 dark:text-zinc-300 dark:hover:text-cyan-glow"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </GlassCard>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold">{t.music.setsTitle}</h3>
          <div className="space-y-4">
            {LIVE_SETS.map((set) => {
              const isOpen = openSet === set.id;
              return (
                <GlassCard key={set.id} className="overflow-hidden rounded-2xl">
                  <YoutubeEmbed videoId={set.youtubeId} title={set.title} />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-semibold">{set.title}</h4>
                        <p className="text-xs text-zinc-500">{set.date}</p>
                      </div>
                      {set.tracklist.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setOpenSet(isOpen ? null : set.id)}
                          className="flex items-center gap-1.5 rounded-full border border-black/5 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
                        >
                          {t.music.tracklistLabel}
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && set.tracklist.length > 0 && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-1.5 overflow-hidden border-t border-black/5 pt-4 text-sm dark:border-white/10"
                        >
                          {set.tracklist.map((entry, idx) => (
                            <li key={idx} className="flex gap-3 text-zinc-600 dark:text-zinc-400">
                              <span className="w-12 shrink-0 font-mono tabular-nums text-cyan-600 dark:text-cyan-glow">
                                {entry.time}
                              </span>
                              <span>
                                {entry.artist} — <span className="text-zinc-500">{entry.track}</span>
                              </span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="mb-4 text-lg font-semibold">{t.music.discographyTitle}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {DISCOGRAPHY.map((track) => (
            <a
              key={track.title}
              href={track.url}
              target="_blank"
              rel="noreferrer noopener"
              className="glass-panel group flex items-center justify-between gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              <span className="flex min-w-0 items-center gap-2">
                <Music4 className="h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-glow" />
                <span className="truncate">{track.title}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">{t.music.gigsTitle}</h3>
        <div className="space-y-3">
          {GIGS.map((gig) => (
            <GlassCard key={gig.event} className="flex items-center gap-4 rounded-2xl p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-glow/15 text-amber-600 dark:text-amber-glow">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">{gig.event}</p>
                <p className="text-xs text-zinc-500">
                  {gig.venue} · {gig.location}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

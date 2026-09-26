import { Home, Code2, Disc3, Car, Camera, Mail, Github, Instagram, Youtube, Facebook, Link2 } from 'lucide-react';
import { OFFICIAL_LINKS, SOCIAL_PROFILES } from './links';
import { TikTokIcon, SpotifyIcon, AppleMusicIcon, SoundCloudIcon } from '@/components/ui/icons';

// ---------------------------------------------------------------------------
// Site-wide identity
// ---------------------------------------------------------------------------
export const SITE = {
  name: 'JECC',
  fullName: 'Juan Esteban Campos Cruz',
  domain: 'jecc.mx',
  location: 'Chihuahua, MX',
  contactEmail: 'contacto@jecc.mx',
  epkUrl: OFFICIAL_LINKS.epk,
};

// ---------------------------------------------------------------------------
// Navigation — each item is its own route (see app/<id>/page.tsx)
// ---------------------------------------------------------------------------
export const NAV_ITEMS = [
  { id: 'hero', href: '/', icon: Home },
  { id: 'tech', href: '/tech', icon: Code2 },
  { id: 'dj', href: '/dj', icon: Disc3 },
  { id: 'car', href: '/car', icon: Car },
  { id: 'media', href: '/media', icon: Camera },
  { id: 'contact', href: '/contact', icon: Mail },
] as const;

// ---------------------------------------------------------------------------
// Social links — verified real profiles (see lib/links.ts)
// ---------------------------------------------------------------------------
// Curated set for the floating dock (kept short so it doesn't overflow on mobile).
export const DOCK_LINKS = [
  { label: 'Instagram', href: SOCIAL_PROFILES.instagram, icon: Instagram },
  { label: 'YouTube', href: SOCIAL_PROFILES.youtube, icon: Youtube },
  { label: 'TikTok', href: SOCIAL_PROFILES.tiktok, icon: TikTokIcon },
  { label: 'Spotify', href: SOCIAL_PROFILES.spotify, icon: SpotifyIcon },
  { label: 'SoundCloud', href: SOCIAL_PROFILES.soundcloud, icon: SoundCloudIcon },
  { label: 'GitHub', href: SOCIAL_PROFILES.github, icon: Github },
];

// Full set for the Contact page.
export const SOCIAL_LINKS = [
  ...DOCK_LINKS,
  { label: 'Apple Music', href: SOCIAL_PROFILES.appleMusic, icon: AppleMusicIcon },
  { label: 'Facebook', href: SOCIAL_PROFILES.facebook, icon: Facebook },
  { label: 'Linktree', href: OFFICIAL_LINKS.linktree, icon: Link2 },
];

// ---------------------------------------------------------------------------
// B. Software Engineer & Tech Profile
// ---------------------------------------------------------------------------
export const TECH_STACK = [
  {
    category: 'Languages',
    items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'Kotlin'],
  },
  {
    category: 'Frontend & Frameworks',
    items: ['React', 'Next.js', 'Jetpack Compose', 'Tailwind CSS'],
  },
  {
    category: 'Backend & Data',
    items: ['Node.js', 'MySQL', 'AWS / Cloud', 'Git', 'CLI Workflows'],
  },
  {
    category: 'Enterprise & Low-Code / RPA',
    items: ['Google Apps Script', 'Mendix'],
  },
];

export type Project = {
  id: string;
  title: string;
  tags: string[];
  image: string;
  // `key` looks up its display label in lib/i18n.ts (tech.linkLabels) so it's bilingual.
  links: { key: 'frontend' | 'backend' | 'view'; href: string }[];
};

// Descriptions live in lib/i18n.ts (dictionaries.<lang>.tech.projects[id]) so they're bilingual.
// Repos verified live on github.com/JECC230 — Fleet Automation Engine is a private/client
// project, so it ships without a public link.
export const PROJECTS: Project[] = [
  {
    id: 'smarthome-app',
    title: 'SmartHome App',
    tags: ['Next.js', 'Node.js', 'MySQL', 'REST API'],
    image: '/assets/projects/smarthome.jpg',
    links: [
      { key: 'frontend', href: 'https://github.com/JECC230/smarthome-frontend' },
      { key: 'backend', href: 'https://github.com/JECC230/smarthome-backend' },
    ],
  },
  {
    id: 'codi',
    title: 'CoDi',
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Firestore'],
    image: '/assets/projects/codi.jpg',
    links: [{ key: 'view', href: 'https://github.com/JECC230/CoDi' }],
  },
  {
    id: 'fleet-automation-engine',
    title: 'Fleet Automation Engine',
    tags: ['Cloud', 'Automation', 'SQL', 'Alerting'],
    image: '/assets/projects/fleet.jpg',
    links: [],
  },
  {
    id: 'ml-car-classifier',
    title: 'ML Car Classifier',
    tags: ['Python', 'Machine Learning', 'Computer Vision'],
    image: '/assets/projects/ml-cars.jpg',
    links: [{ key: 'view', href: 'https://github.com/JECC230/ML_cars_v2' }],
  },
];

// ---------------------------------------------------------------------------
// C. DJ & Producer — "JECC Sound"
// ---------------------------------------------------------------------------
export const MUSIC_GENRES = [
  'Tech House',
  'Bass House',
  'House',
  'Afro House',
  'UK Bass',
  'French House',
  'Nu-Disco',
];

export const DJ_GEAR = [
  'Pioneer CDJ-3000 (x2 / x4)',
  'Pioneer DJM-900NXS2',
  'Pioneer DJM-V10',
  'rekordbox / rekordbox DJ ecosystem',
];

// Car/build footage isn't confirmed live on the channel yet — replace when you upload some.
export const YOUTUBE_VIDEO_IDS = {
  auto: ['YOUR_BUILD_VIDEO_ID_1', 'YOUR_BUILD_VIDEO_ID_2'],
};

export type TracklistEntry = { time: string; artist: string; track: string };

export type LiveSet = {
  id: string;
  title: string;
  date: string;
  youtubeId: string;
  tracklist: TracklistEntry[];
};

// Verified real uploads on the @jecc23 YouTube channel (titles and publish
// dates read straight off the video pages), matched to real genres from
// MUSIC_GENRES.
export const LIVE_SETS: LiveSet[] = [
  {
    id: 'qbcaDxMx5p0',
    title: 'CLUB IS CALLING — Tech House & Bass Set',
    date: '2026-07-31',
    youtubeId: 'qbcaDxMx5p0',
    tracklist: [],
  },
  {
    id: 'zbGB7Q_aMvY',
    title: 'JECC — House Session',
    date: '2025-03-04',
    youtubeId: 'zbGB7Q_aMvY',
    tracklist: [],
  },
];

// ---------------------------------------------------------------------------
// D. Automotive / Build Garage — "The VQ Lab"
// ---------------------------------------------------------------------------
export type ModCategory = { id: string; modIds: string[] };

export type CarBuild = {
  id: string;
  name: string;
  year: string;
  engine: string;
  trans: string;
  badges: string[]; // ids into i18n auto.badges — e.g. 'launch-control'
  modCategories: ModCategory[];
};

// Two real builds. Display names for category/mod/badge ids live in
// lib/i18n.ts (dictionaries.<lang>.auto.modCategories / .mods / .badges).
export const CARS: CarBuild[] = [
  {
    id: 'vq35de-2003',
    name: 'Nissan 350Z',
    year: '2003',
    engine: 'VQ35DE',
    trans: 'Manual',
    badges: ['launch-control'],
    modCategories: [
      { id: 'intake', modIds: ['plenum-spacer-z1', 'throttle-body-spacer', 'long-intake'] },
      { id: 'engine-management', modIds: ['aem-bypass', 'stage2-tune', 'launch-control'] },
      { id: 'cooling', modIds: ['mishimoto-thermostat'] },
      { id: 'fuel', modIds: ['injectors-400cc', 'hr-fuel-pump'] },
      { id: 'exhaust', modIds: ['ss-headers', 'test-pipe-no-cel'] },
      { id: 'suspension', modIds: ['amuse-coilovers'] },
      { id: 'interior', modIds: ['carbon-cluster', 'alcantara-wheel'] },
    ],
  },
  {
    id: 'vq35hr-2007',
    name: 'Nissan 350Z',
    year: '2007',
    engine: 'VQ35HR',
    trans: 'Automatic',
    badges: [],
    modCategories: [
      { id: 'intake', modIds: ['stillen-intake'] },
      { id: 'exhaust', modIds: ['tomei-catback', 'ss-test-pipe'] },
      { id: 'engine-management', modIds: ['rev-tune'] },
      { id: 'lighting', modIds: ['govee-underglow'] },
      { id: 'wheels', modIds: ['cosmis-wheels'] },
      { id: 'interior', modIds: ['alcantara-leather-wheel'] },
    ],
  },
];

// No real photos of either car are available from any account this site can
// pull from automatically — left empty on purpose (see AutoSection's
// "coming soon" placeholder) rather than fabricated/broken paths.
export const AUTO_GALLERY: { src: string; alt: string }[] = [];

// ---------------------------------------------------------------------------
// E. Creative Media & Lifestyle
// ---------------------------------------------------------------------------
export type GalleryImage = { src: string; alt: string; category: 'concerts' };

// Real thumbnails pulled from the @jecc23 YouTube channel — no fabricated
// placeholders. 'urban' and 'automotive' shots aren't available from any
// account this site can pull from automatically (Instagram/TikTok don't
// expose their feeds to a plain fetch); add real files to
// public/assets/gallery/ and reintroduce those categories when you have them.
export const MEDIA_GALLERY: GalleryImage[] = [
  { src: 'https://i.ytimg.com/vi/qbcaDxMx5p0/hqdefault.jpg', alt: 'CLUB IS CALLING — Tech House & Bass Set', category: 'concerts' },
  { src: 'https://i.ytimg.com/vi/zbGB7Q_aMvY/hqdefault.jpg', alt: 'JECC — House Session', category: 'concerts' },
  { src: 'https://i.ytimg.com/vi/YwXKxheInNY/hqdefault.jpg', alt: 'DJ set — JECC', category: 'concerts' },
  { src: 'https://i.ytimg.com/vi/gNpcGNq-Spk/hqdefault.jpg', alt: 'TMIC Set — JECC', category: 'concerts' },
  { src: 'https://i.ytimg.com/vi/DZCVHeHqJYc/hqdefault.jpg', alt: 'Experimental Set — JECC', category: 'concerts' },
];

export const SETUP_GEAR = [
  'MacBook Pro (Apple Silicon)',
  'Pioneer DM-50D studio monitors',
  'OLED reference display',
  'Audio interface + XLR chain',
  'Mirrorless camera + prime lenses',
];

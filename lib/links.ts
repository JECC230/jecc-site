// Official artist links and media — sourced from MavelPoint / Linktree.

export const OFFICIAL_LINKS = {
  epk: 'https://www.mavelpoint.com/artist/jecc/overview',
  events: 'https://www.mavelpoint.com/es/artist/jecc/events',
  linktree: 'https://linktr.ee/JECC_23',
};

export const ARTIST_LINKS = [
  { label: 'MavelPoint EPK', href: OFFICIAL_LINKS.epk },
  { label: 'Live Events', href: OFFICIAL_LINKS.events },
  { label: 'Linktree', href: OFFICIAL_LINKS.linktree },
];

// Verified real profiles (cross-checked against the MavelPoint EPK, Linktree,
// and the live Instagram bio — @jecc23's highlights match the GIGS venues below).
export const SOCIAL_PROFILES = {
  instagram: 'https://www.instagram.com/jecc23',
  youtube: 'https://www.youtube.com/@jecc23',
  tiktok: 'https://www.tiktok.com/@Jecc__23',
  spotify: 'https://open.spotify.com/artist/5gkSgYJ9D9ppVOBkoollNi',
  appleMusic: 'https://music.apple.com/us/artist/jecc/1389364965',
  soundcloud: 'https://soundcloud.com/user-249930961',
  facebook: 'https://www.facebook.com/DJJECC',
  github: 'https://github.com/JECC230',
};

// A confirmed real upload on the @jecc23 channel — reviewing the exact
// Pioneer DM-50D monitors listed in SETUP_GEAR.
export const VERIFIED_VIDEOS = {
  gearReview: 'NokN6st3jWA',
};

// Remote CDN assets — direct URLs, no local files needed.
export const ARTIST_MEDIA = {
  cover:
    'https://samavelpointappprodwe.blob.core.windows.net/app-images/artist/4d48e704-3242-4910-b09e-14190f8e9158/cover/thumbnail/img-0806-thumb-1752274049785-ab0b397d-0bfb-4b89-b534-8243c2cc949f.png',
  avatar:
    'https://samavelpointappprodwe.blob.core.windows.net/app-images/artist/4d48e704-3242-4910-b09e-14190f8e9158/profile/profileimage-1785101832950-9af9928e-0f93-4ee2-934b-c61f8db2770c.webp',
  avatarAlt:
    'https://ugc.production.linktr.ee/2eb67093-1d98-4f46-9140-9f5ed4dd1d2d_CPO-mxfcaxFsccn1ktcK-X-2aOjK76TyTbjLCS0y4iP-lLonRzBZVFUVITqIwC3zHpwxtq4z9Q-s800-c-k-c0x00ffffff-no-r.jpeg',
};

export type Gig = { event: string; venue: string; location: string };

export const GIGS: Gig[] = [
  { event: 'You are the music', venue: 'Local 8', location: 'Chihuahua, MX' },
  { event: 'Open Decks', venue: 'Epicentro Foro', location: 'Chihuahua, MX' },
  { event: 'All Hands On Decks w/ JECC & Montmun', venue: 'Local 8 Speakeasy', location: 'Chihuahua, MX' },
];

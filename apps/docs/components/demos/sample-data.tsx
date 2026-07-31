import type { GroupedMessage } from 'whatsapp-ui-react';

/**
 * Inline data URIs keep the docs self-contained: no network round trip, and the previews still
 * render when the site is opened offline or from a static export.
 */
function svg(body: string, width = 320, height = 200): string {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(markup)}`;
}

export const samplePhoto = svg(
  `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
     <stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#8b5cf6"/>
   </linearGradient></defs>
   <rect width="320" height="200" fill="url(#g)"/>
   <circle cx="70" cy="60" r="26" fill="#fef08a"/>
   <path d="M0 160 L90 95 L160 140 L230 80 L320 150 L320 200 L0 200 Z" fill="#1e293b" opacity="0.55"/>`
);

export const sampleSticker = svg(
  `<rect width="200" height="200" rx="24" fill="#fde68a"/>
   <circle cx="100" cy="100" r="60" fill="#f59e0b"/>
   <circle cx="80" cy="88" r="8" fill="#1f2937"/>
   <circle cx="120" cy="88" r="8" fill="#1f2937"/>
   <path d="M72 120 Q100 148 128 120" stroke="#1f2937" stroke-width="8" fill="none" stroke-linecap="round"/>`,
  200,
  200
);

export const sampleMap = svg(
  `<rect width="320" height="200" fill="#dbeae0"/>
   <path d="M0 130 H320" stroke="#b7c9bd" stroke-width="14"/>
   <path d="M120 0 V200" stroke="#b7c9bd" stroke-width="10"/>
   <circle cx="180" cy="96" r="10" fill="#ef4444"/>
   <path d="M180 106 L180 126" stroke="#ef4444" stroke-width="4"/>`
);

export const sampleAvatar = svg(
  `<rect width="96" height="96" fill="#0ea5e9"/>
   <circle cx="48" cy="38" r="18" fill="#e0f2fe"/>
   <path d="M14 96 Q48 60 82 96 Z" fill="#e0f2fe"/>`,
  96,
  96
);

/** A one-second silent WAV, enough for the players to mount and report metadata. */
export const sampleAudio =
  'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAgD4AAAB9AAACABAAZGF0YQAAAAA=';

const today = new Date();
const yesterday = new Date(today.getTime() - 86_400_000);

export const sampleThread: Omit<GroupedMessage, 'node'>[] = [
  { id: 1, senderId: 'ana', timestamp: yesterday },
  { id: 2, senderId: 'me', timestamp: yesterday },
  { id: 3, senderId: 'ana', timestamp: today },
  { id: 4, senderId: 'me', timestamp: today },
];

export { today, yesterday };

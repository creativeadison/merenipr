// Generuje jednotné náhledové grafiky článků do public/images/nahledy/.
// Spuštění:  node scripts/nahledy.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

const W = 640, H = 360;

// Piktogramy v souřadnicích 0–120. Bílé linky, doplněné plnými prvky.
const ikony = {
  // Barcelonské principy: terč se sedmi body a šipkou do středu
  terc: `
    <circle cx="60" cy="60" r="46"/><circle cx="60" cy="60" r="31"/><circle cx="60" cy="60" r="16"/>
    <circle cx="60" cy="60" r="6" fill="#fff" stroke="none"/>
    ${Array.from({ length: 7 }, (_, i) => {
      const a = (-90 + i * (360 / 7)) * (Math.PI / 180);
      return `<circle cx="${(60 + 57 * Math.cos(a)).toFixed(1)}" cy="${(60 + 57 * Math.sin(a)).toFixed(1)}" r="4.2" fill="#fff" stroke="none" opacity="0.9"/>`;
    }).join('')}
    <path d="M14 106 L52 68"/><path d="M52 68 L40 70 M52 68 L50 80"/>`,

  // AMEC framework: stoupající schody, šipka nahoru a cyklus zpět
  schody: `
    <path d="M10 88 H34 V66 H58 V44 H82 V22 H108"/>
    <circle cx="34" cy="66" r="4.5" fill="#fff" stroke="none"/>
    <circle cx="58" cy="44" r="4.5" fill="#fff" stroke="none"/>
    <circle cx="82" cy="22" r="4.5" fill="#fff" stroke="none"/>
    <path d="M96 10 L108 22 L96 34"/>
    <path d="M104 104 A48 48 0 0 1 24 100" opacity="0.7"/>
    <path d="M24 100 L36 100 M24 100 L28 110" opacity="0.7"/>`,

  // Metriky: sloupcový graf s trendovou křivkou
  sloupce: `
    <path d="M14 104 H110"/>
    <rect x="20" y="74" width="16" height="30" rx="4" fill="#fff" stroke="none" opacity="0.55"/>
    <rect x="44" y="62" width="16" height="42" rx="4" fill="#fff" stroke="none" opacity="0.7"/>
    <rect x="68" y="46" width="16" height="58" rx="4" fill="#fff" stroke="none" opacity="0.85"/>
    <rect x="92" y="28" width="16" height="76" rx="4" fill="#fff" stroke="none"/>
    <path d="M28 56 L52 44 L76 30 L100 14" opacity="0.9"/>
    <circle cx="28" cy="56" r="4.5" fill="#fff" stroke="none"/>
    <circle cx="52" cy="44" r="4.5" fill="#fff" stroke="none"/>
    <circle cx="76" cy="30" r="4.5" fill="#fff" stroke="none"/>
    <circle cx="100" cy="14" r="4.5" fill="#fff" stroke="none"/>`,

  // Chyby v měření: report s přeškrtnutým kolečkem a vykřičníkem
  chyby: `
    <rect x="12" y="12" width="76" height="92" rx="10"/>
    <path d="M28 38 H72 M28 56 H72 M28 74 H56"/>
    <circle cx="88" cy="84" r="26" fill="#fff" stroke="none"/>
    <circle cx="88" cy="84" r="26"/>
    <path d="M78 94 L98 74" stroke="currentColor" stroke-width="7"/>
    <circle cx="88" cy="84" r="17" fill="none" stroke="currentColor" stroke-width="7"/>`,

  // Kvalitativní indexy: ukazatel se stupnicí a ručičkou
  merak: `
    <path d="M14 88 A46 46 0 0 1 106 88"/>
    ${Array.from({ length: 7 }, (_, i) => {
      const a = (180 + i * 30) * (Math.PI / 180);
      const x1 = 60 + 36 * Math.cos(a), y1 = 88 + 36 * Math.sin(a);
      const x2 = 60 + 27 * Math.cos(a), y2 = 88 + 27 * Math.sin(a);
      return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" opacity="0.8"/>`;
    }).join('')}
    <path d="M60 88 L88 56"/>
    <circle cx="60" cy="88" r="8" fill="#fff" stroke="none"/>
    <path d="M14 88 H26 M94 88 H106" opacity="0.9"/>
    <path d="M96 30 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4 z" fill="#fff" stroke="none" opacity="0.9"/>`,

  // Checklist: deska se třemi řádky, dva odškrtnuté
  checklist: `
    <rect x="16" y="16" width="88" height="94" rx="12"/>
    <rect x="44" y="6" width="32" height="20" rx="7" fill="#fff" stroke="none"/>
    <rect x="30" y="40" width="18" height="18" rx="5" fill="#fff" stroke="none"/>
    <path d="M34.5 49 l3.5 4 l6 -8" stroke="currentColor" stroke-width="4"/>
    <path d="M58 49 H90" opacity="0.9"/>
    <rect x="30" y="66" width="18" height="18" rx="5" fill="#fff" stroke="none"/>
    <path d="M34.5 75 l3.5 4 l6 -8" stroke="currentColor" stroke-width="4"/>
    <path d="M58 75 H90" opacity="0.9"/>
    <rect x="30" y="92" width="18" height="18" rx="5"/>
    <path d="M58 101 H82" opacity="0.6"/>`,
};

// Jeden náhled: barevná plocha z palety Adisonu + velký bílý piktogram
function dlazdice({ ikona, od, do: doBarvy, popis }) {
  const velikost = 210; // výška piktogramu v obrázku 640×360
  const m = velikost / 120;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${popis}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${od}"/><stop offset="1" stop-color="${doBarvy}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <circle cx="${W - 60}" cy="${H + 30}" r="140" fill="#fff" opacity="0.08"/>
  <circle cx="40" cy="-20" r="90" fill="#fff" opacity="0.07"/>
  <g transform="translate(${(W - velikost) / 2}, ${(H - velikost) / 2}) scale(${m.toFixed(4)})"
     fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" color="${od}">
    ${ikony[ikona]}
  </g>
</svg>
`;
}

const nahledy = [
  { soubor: 'barcelonske-principy', ikona: 'terc', od: '#e83792', do: '#a8368f', popis: 'Terč se sedmi body – sedm Barcelonských principů' },
  { soubor: 'amec-framework', ikona: 'schody', od: '#c8359a', do: '#7b3aa0', popis: 'Stoupající schody a cyklus – evaluační rámec' },
  { soubor: 'metriky', ikona: 'sloupce', od: '#a8368f', do: '#523792', popis: 'Sloupcový graf s trendovou křivkou' },
  { soubor: 'chyby-v-mereni', ikona: 'chyby', od: '#e8558f', do: '#8c3aa0', popis: 'Report s přeškrtnutou metrikou' },
  { soubor: 'kvalitativni-index', ikona: 'merak', od: '#d4359b', do: '#5a3a96', popis: 'Ukazatel kvality se stupnicí' },
  { soubor: 'checklist', ikona: 'checklist', od: '#e83792', do: '#523792', popis: 'Odškrtávací seznam' },
];

mkdirSync('public/images/nahledy', { recursive: true });
for (const n of nahledy) {
  const svg = dlazdice(n);
  writeFileSync(`public/images/nahledy/${n.soubor}.svg`, svg);
  // PNG verze se používá jako náhled odkazu na sociálních sítích (LinkedIn SVG neumí)
  await sharp(Buffer.from(svg), { density: 300 }).resize(1200, 675).png().toFile(`public/images/nahledy/${n.soubor}.png`);
  console.log('hotovo: ' + n.soubor + '.svg + .png');
}

import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import { cn } from '../lib/cn';

type Allergen = 'Glutine' | 'Latticini' | 'Arachidi' | 'Frutta a guscio' | 'Sedano' | 'Anidride Solforosa' | 'Uova';

const allergenInfo: Record<Allergen, { order: number; description: string }> = {
  Glutine: { order: 1, description: 'Cereali contenenti glutine' },
  Uova: { order: 2, description: 'Uova e prodotti a base di uova' },
  Arachidi: { order: 3, description: 'Arachidi e prodotti a base di arachidi' },
  Latticini: { order: 4, description: 'Latte e prodotti a base di latte' },
  'Frutta a guscio': { order: 5, description: 'Frutta a guscio' },
  Sedano: { order: 6, description: 'Sedano e prodotti a base di sedano' },
  'Anidride Solforosa': { order: 7, description: 'Anidride solforosa e solfiti' },
};

const allergenLegend: Record<
  Allergen,
  { label: string; pill: string; dot: string; icon: ComponentType<{ className?: string; title?: string }> }
> = {
  Glutine: {
    label: 'Glutine',
    pill: 'border-amber-200 bg-amber-50 text-amber-950',
    dot: 'bg-amber-500',
    icon: ({ className, title }) => (
      <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title ?? 'Glutine'}>
        <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 4v16" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6c-1.7 0-3 1.3-3 3 1.7 0 3-1.3 3-3Zm0 0c1.7 0 3 1.3 3 3-1.7 0-3-1.3-3-3Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10c-1.8 0-3.2 1.4-3.2 3.2 1.8 0 3.2-1.4 3.2-3.2Zm0 0c1.8 0 3.2 1.4 3.2 3.2-1.8 0-3.2-1.4-3.2-3.2Z"
        />
      </svg>
    ),
  },
  Latticini: {
    label: 'Latticini',
    pill: 'border-sky-200 bg-sky-50 text-sky-950',
    dot: 'bg-sky-500',
    icon: ({ className, title }) => (
      <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title ?? 'Latticini'}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c2.4 2.6 3.6 4.4 3.6 6.3A3.6 3.6 0 0 1 12 13a3.6 3.6 0 0 1-3.6-3.7C8.4 7.4 9.6 5.6 12 3Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 20.5c1.2-2.5 2.8-3.7 4.5-3.7s3.3 1.2 4.5 3.7"
        />
      </svg>
    ),
  },
  Arachidi: {
    label: 'Arachidi',
    pill: 'border-orange-200 bg-orange-50 text-orange-950',
    dot: 'bg-orange-500',
    icon: ({ className, title }) => (
      <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title ?? 'Arachidi'}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.2 6.5c0-1.9 1.5-3.5 3.4-3.5s3.4 1.6 3.4 3.5c0 1.1-.5 2-1.2 2.6 1 .7 1.6 1.9 1.6 3.3 0 3-2.5 6.1-5.1 7.6-2.6-1.5-5.1-4.6-5.1-7.6 0-1.4.6-2.6 1.6-3.3-.7-.6-1.2-1.5-1.2-2.6C7.4 4.6 9 3 10.9 3"
        />
        <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M9.3 13.2h5.4" />
      </svg>
    ),
  },
  'Frutta a guscio': {
    label: 'Frutta a guscio',
    pill: 'border-emerald-200 bg-emerald-50 text-emerald-950',
    dot: 'bg-emerald-500',
    icon: ({ className, title }) => (
      <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title ?? 'Frutta a guscio'}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c3.8 0 7 3 7 7 0 4.1-3.2 10-7 10S5 14.1 5 10c0-4 3.2-7 7-7Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.3c-1.6 1.4-2.6 3-2.6 4.7 0 2.2 1.3 4.7 2.6 6.8 1.3-2.1 2.6-4.6 2.6-6.8 0-1.7-1-3.3-2.6-4.7Z"
        />
      </svg>
    ),
  },
  Sedano: {
    label: 'Sedano',
    pill: 'border-lime-200 bg-lime-50 text-lime-950',
    dot: 'bg-lime-500',
    icon: ({ className, title }) => (
      <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title ?? 'Sedano'}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21V9"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9c-2.5 0-4.5-2.1-4.5-4.6C9.6 4.4 11.1 5.8 12 7c.9-1.2 2.4-2.6 4.5-2.6C16.5 6.9 14.5 9 12 9Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.5 14.5h7"
        />
      </svg>
    ),
  },
  'Anidride Solforosa': {
    label: 'Solfiti',
    pill: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-950',
    dot: 'bg-fuchsia-500',
    icon: ({ className, title }) => (
      <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title ?? 'Solfiti'}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 4h8"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 4v6.3c0 1.6.6 3.1 1.8 4.2l.5.5c.5.5.7 1.2.7 1.9V20"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 4v6.3c0 1.6-.6 3.1-1.8 4.2l-.5.5c-.5.5-.7 1.2-.7 1.9V20"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.2 9.2c-.7-.7-1.8-.7-2.5 0s-.7 1.8 0 2.5 1.8.7 2.5 0"
        />
      </svg>
    ),
  },
  Uova: {
    label: 'Uova',
    pill: 'border-rose-200 bg-rose-50 text-rose-950',
    dot: 'bg-rose-500',
    icon: ({ className, title }) => (
      <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title ?? 'Uova'}>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c3.4 0 6 5.3 6 9.8C18 18.2 15.4 21 12 21s-6-2.8-6-8.2C6 8.3 8.6 3 12 3Z"
        />
      </svg>
    ),
  },
};

type MenuItem = {
  id: string;
  name: string;
  description: string;
  allergens: Allergen[];
  price: string;
  imageSrc: string;
  featured?: boolean;
  badge?: string;
  ingredients?: string[];
};

type MenuCategoryId = 'antipasti' | 'primi' | 'secondi' | 'contorni' | 'dolci' | 'bevande';
type MenuCategory = { id: MenuCategoryId; title: string; items: MenuItem[] };

type WineType = 'Casa' | 'Spumante' | 'Bianco' | 'Rosso' | 'Dessert';
type WineRegion = 'Friuli-Venezia Giulia' | 'Veneto' | 'Altro';
type Wine = { type: WineType; name: string; region: WineRegion; priceText: string; priceMin: number; priceMax: number };

function normalizeText(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buildItemId(name: string) {
  return normalizeText(name)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function formatEuro(value: number) {
  if (!Number.isFinite(value)) return '';
  const isInt = Math.round(value) === value;
  const str = (isInt ? value.toFixed(0) : value.toFixed(2)).replace('.', ',');
  return `${str} €`;
}

function normalizeEuroInText(text: string) {
  const normalized = text.replace(/\s*€\s*/g, ' €').trim();
  return normalized.replace(/(\d+(?:[.,]\d+)?)\s*€/g, (_m, num) => {
    const n = Number(String(num).replace(',', '.'));
    const formatted = formatEuro(n);
    return formatted || `${String(num).replace('.', ',')} €`;
  });
}

function splitPriceSegments(text: string) {
  const compact = normalizeEuroInText(text).replace(/\s+/g, ' ');
  if (!compact) return [];
  const parts = compact.split('·').map((p) => p.trim()).filter(Boolean);
  const segments = (parts.length ? parts : [compact]).map((part) => {
    const m = part.match(/^(.*?)\s*:\s*(.+)$/);
    if (m) return { label: m[1].trim(), value: m[2].trim() };
    return { value: part };
  });
  return segments;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function inferRegionFromName(name: string): WineRegion {
  const m = name.match(/\(([^)]+)\)\s*$/);
  const code = m?.[1]?.trim() ?? '';
  if (['Ud', 'Go', 'Pn', 'Ts'].includes(code)) return 'Friuli-Venezia Giulia';
  if (['Tv', 'Ve', 'Vr', 'Vi', 'Pd', 'Bl', 'Ro'].includes(code)) return 'Veneto';
  return 'Altro';
}

function extractEuroValues(text: string) {
  const normalized = text.replace(/,/g, '.');
  const range = normalized.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*€/);
  if (range) return [Number(range[1]), Number(range[2])].filter((n) => Number.isFinite(n));
  const values = Array.from(normalized.matchAll(/(\d+(?:\.\d+)?)\s*€/g)).map((m) => Number(m[1]));
  return values.filter((n) => Number.isFinite(n));
}

function getEuroBounds(text: string) {
  const values = extractEuroValues(text);
  if (values.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...values), max: Math.max(...values) };
}

const menuCategories: MenuCategory[] = [
  {
    id: 'antipasti',
    title: 'Antipasti',
    items: [
      {
        id: buildItemId('Tagliere di Salumi Friulani'),
        name: 'Tagliere di Salumi Friulani',
        description: 'Selezione di salumi locali accompagnati dai grissini artigianali del panificio “Patty”.',
        allergens: ['Glutine'],
        price: 'Singolo: 7 € · 2 pers.: 13 € · 4 pers.: 24 €',
        imageSrc: '/images/194198091_4219854808066839_9151004493796416859_n.jpg',
      },
      {
        id: buildItemId("Verdurine sott'olio"),
        name: "Verdurine sott'olio",
        description: 'Misto di verdure in olio di semi. (1 pz)',
        allergens: [],
        price: '4 €',
        imageSrc: '/images/183909662_4145817605470560_3095392176152251348_n.jpg',
      },
      {
        id: buildItemId('Formaggio'),
        name: 'Formaggio',
        description: 'Formaggio Montasio DOP servito con polenta. (1 pz)',
        allergens: ['Latticini'],
        price: '4 €',
        imageSrc: '/images/177654852_4105854142800240_6970454504795988580_n.jpg',
      },
    ],
  },
  {
    id: 'primi',
    title: 'Primi Piatti',
    items: [
      {
        id: buildItemId("Zuppa d'orzo e fagioli"),
        name: "Zuppa d'orzo e fagioli",
        description:
          'A fuoco lento: orzo, fagioli e verdure si fondono in una zuppa che racconta la storia di mani esperte. Viene aggiunta anche una piccola quantità di burro.',
        allergens: ['Glutine', 'Latticini', 'Frutta a guscio'],
        price: '8,50 €',
        imageSrc: '/images/476124006_9384997218219213_2160549072948083416_n.jpg',
      },
      {
        id: buildItemId('Pasta alle noci'),
        name: 'Pasta alle noci',
        description:
          'Un omaggio alla tradizione: spaghetti con pesto di noci nostrane, olio EVO e spezie. Ideale per vegani essendo cento per cento vegetale.',
        allergens: ['Glutine', 'Frutta a guscio'],
        price: '8,50 €',
        imageSrc: '/images/72411193_2657273854324950_7931703791299067904_n.jpg',
      },
      {
        id: buildItemId('Pasta alla Vanda'),
        name: 'Pasta alla Vanda',
        description:
          'Spaghetti con tuorlo cremoso, pancetta locale rosolata, Grana Padano DOP, pepe e un tocco di panna. Un piatto ricco e avvolgente.',
        allergens: ['Glutine', 'Latticini', 'Uova'],
        price: '8 €',
        imageSrc: '/images/485347859_9649288278456771_7331598190390471549_n.jpg',
      },
      {
        id: buildItemId("Pasta al ragù della nonna"),
        name: "Pasta al ragù della nonna",
        description:
          "Più di cinquant'anni di tradizione: spaghetti al ragù di manzo e maiale, verdure e soffritto di cipolla con olio d'arachide. Un classico che esalta la semplicità dei sapori di casa.",
        allergens: ['Glutine', 'Latticini', 'Frutta a guscio', 'Uova', 'Arachidi'],
        price: '8 €',
        imageSrc: '/images/483831419_9591412330911033_795015669042024339_n.jpg',
      },
    ],
  },
  {
    id: 'secondi',
    title: 'Secondi Piatti',
    items: [
      {
        id: buildItemId('Frico del Borgo San Martino'),
        name: 'Frico del Borgo San Martino',
        featured: true,
        badge: 'Specialità della casa',
        description:
          'Un cuore filante e gustoso, racchiuso in una crosta croccante e dorata, il nostro orgoglio. Servito con polenta di mais arrostita. (~150 g / ~300 g)',
        allergens: ['Latticini'],
        ingredients: ['Montasio DOP', 'Patate friulane', 'Cipolla', 'Polenta di mais locale', 'Pepe nero'],
        price: '1 pers.: 10 € · 2 pers.: 19 € · 3 pers.: 27 € · 4 pers.: 34 €',
        imageSrc: '/images/177592604_4105853926133595_7338755891135402380_n.jpg',
      },
      {
        id: buildItemId("Salame all'aceto"),
        name: "Salame all'aceto",
        description:
          'Fettine di salame nostrano cotto lentamente, rosolato in burro e olio, e sfumato con aceto di vino rosso. Servito con polenta di mais arrostita. (Fetta)',
        allergens: ['Glutine', 'Uova', 'Anidride Solforosa'],
        price: '3 €',
        imageSrc: '/images/476237390_9384997368219198_3053090971420161476_n.jpg',
      },
      {
        id: buildItemId('Frittata alle erbe'),
        name: 'Frittata alle erbe',
        description:
          'La semplicità che incanta: uova fresche, erbe e verdure di stagione, Grana Padano DOP e burro. Sempre servita con polenta di mais arrostita.',
        allergens: ['Latticini', 'Uova'],
        price: '3 uova: 9 € · 6 uova: 17 € · 3 pers.: 24 € · 4 pers.: 30 €',
        imageSrc: '/images/194198091_4219854808066839_9151004493796416859_n.jpg',
      },
      {
        id: buildItemId('Braciola di maiale'),
        name: 'Braciola di maiale',
        description:
          'Braciola di maiale con osso, da allevamenti locali, cotta alla piastra. Servita con olio EVO e sale. (~210 g con osso)',
        allergens: [],
        price: '13 €',
        imageSrc: '/images/183909662_4145817605470560_3095392176152251348_n.jpg',
      },
      {
        id: buildItemId('Bistecca di manzo'),
        name: 'Bistecca di manzo',
        description:
          'Bistecca di manzo di ottima qualità, cotta alla piastra per esaltarne il sapore. Condita con olio extravergine e sale. (~140 g)',
        allergens: [],
        price: '13 €',
        imageSrc: '/images/485347859_9649288278456771_7331598190390471549_n.jpg',
      },
    ],
  },
  {
    id: 'contorni',
    title: 'Contorni',
    items: [
      {
        id: buildItemId('Patate fritte'),
        name: 'Patate fritte',
        description: 'Patatine fritte in olio di semi. (Il prodotto potrebbe essere surgelato.)',
        allergens: [],
        price: '4 €',
        imageSrc: '/images/476124006_9384997218219213_2160549072948083416_n.jpg',
      },
      {
        id: buildItemId('Insalata fresca'),
        name: 'Insalata fresca',
        description: 'Insalata fresca di stagione.',
        allergens: [],
        price: '4 €',
        imageSrc: '/images/177654852_4105854142800240_6970454504795988580_n.jpg',
      },
      {
        id: buildItemId('Contorni del giorno'),
        name: 'Contorni del giorno',
        description: 'Selezione di contorni variabili in base alla stagione. (Vedi lavagne)',
        allergens: [],
        price: 'Vedi lavagne',
        imageSrc: '/images/72411193_2657273854324950_7931703791299067904_n.jpg',
      },
    ],
  },
  {
    id: 'dolci',
    title: 'Dolci',
    items: [
      {
        id: buildItemId('Dolci del giorno'),
        name: 'Dolci del giorno',
        description: 'Proposte fresche e stagionali fuori carta. Chiedi al personale e guarda le lavagne.',
        allergens: [],
        price: 'Vedi lavagne',
        imageSrc: '/images/483831419_9591412330911033_795015669042024339_n.jpg',
      },
    ],
  },
  {
    id: 'bevande',
    title: 'Bevande',
    items: [
      {
        id: buildItemId('Acqua'),
        name: 'Acqua',
        description: '',
        allergens: [],
        price: 'Bottiglia 100 cl: 2 € · Spina 100 cl: 1,50 € · Spina 50 cl: 1 €',
        imageSrc: '/images/177592604_4105853926133595_7338755891135402380_n.jpg',
      },
      {
        id: buildItemId('Bibita'),
        name: 'Bibita',
        description: 'Coca Cola, Fanta, Sprite, ecc. – lattine da 33 cl',
        allergens: [],
        price: '3 €',
        imageSrc: '/images/183909662_4145817605470560_3095392176152251348_n.jpg',
      },
      {
        id: buildItemId('Soft drink'),
        name: 'Soft drink',
        description: 'Aperitivi analcolici come gingerino, bitter, ecc.',
        allergens: [],
        price: '3 €',
        imageSrc: '/images/72411193_2657273854324950_7931703791299067904_n.jpg',
      },
      {
        id: buildItemId('Hard drink'),
        name: 'Hard drink',
        description: 'Aperitivi alcolici come Spritz Aperol, Campari, ecc.',
        allergens: [],
        price: '3,50 € – 5 €',
        imageSrc: '/images/476237390_9384997368219198_3053090971420161476_n.jpg',
      },
      {
        id: buildItemId('Spirits'),
        name: 'Spirits',
        description: 'Amari, grappe, rum, ecc.',
        allergens: [],
        price: '3,50 € – 5 €',
        imageSrc: '/images/476124006_9384997218219213_2160549072948083416_n.jpg',
      },
      {
        id: buildItemId('Birra alla spina'),
        name: 'Birra alla spina',
        description: 'Birra “Castello (Ud)” bionda stile Lager.',
        allergens: [],
        price: '20 cl: 3 € · 40 cl: 5 € · 100 cl: 11 €',
        imageSrc: '/images/194198091_4219854808066839_9151004493796416859_n.jpg',
      },
      {
        id: buildItemId('Caffè Espresso'),
        name: 'Caffè Espresso',
        description: '',
        allergens: [],
        price: '1,40 €',
        imageSrc: '/images/177654852_4105854142800240_6970454504795988580_n.jpg',
      },
      {
        id: buildItemId('Caffè Orzo / Deca'),
        name: 'Caffè Orzo / Deca',
        description: '',
        allergens: [],
        price: '1,50 €',
        imageSrc: '/images/183909662_4145817605470560_3095392176152251348_n.jpg',
      },
      {
        id: buildItemId('Caffè Corretto'),
        name: 'Caffè Corretto',
        description: '',
        allergens: [],
        price: '1,90 €',
        imageSrc: '/images/72411193_2657273854324950_7931703791299067904_n.jpg',
      },
      {
        id: buildItemId('Cappuccino'),
        name: 'Cappuccino',
        description: '',
        allergens: ['Latticini'],
        price: '1,90 €',
        imageSrc: '/images/476237390_9384997368219198_3053090971420161476_n.jpg',
      },
      {
        id: buildItemId('Tè e Tisane'),
        name: 'Tè e Tisane',
        description: '',
        allergens: [],
        price: '1,90 €',
        imageSrc: '/images/476124006_9384997218219213_2160549072948083416_n.jpg',
      },
      {
        id: buildItemId('Vino della casa'),
        name: 'Vino della casa',
        description: 'Rosso e bianco: Merlot e Friulano – Pittaro – Codoripo (Ud).',
        allergens: ['Anidride Solforosa'],
        price: 'Calice 2,50 € · 25 cl 4,50 € · 50 cl 8 € · 75 cl 10 €',
        imageSrc: '/images/485347859_9649288278456771_7331598190390471549_n.jpg',
      },
    ],
  },
];

const generalInfo = ['Coperto: 2,50 €', 'Porzioni abbondanti: +1,00 €', 'Grissini artigianali: 1 pz – 1,50 €'] as const;

const specialsInfo = {
  title: 'Specialità del giorno',
  description:
    'Ogni giorno, la nostra cucina propone piatti extra al di fuori di questo menù. Scopri le creazioni fresche e stagionali sulle nostre lavagne al tavolo.',
};

const businessMenu = {
  title: 'Da Vanda “For Business” (Menù Lavoro)',
  description: 'Valido SOLO a pranzo dal Lunedì al Venerdì. (Aggiornato al 20-02-2026)',
  options: [
    { name: 'Completo', price: '15 €', details: 'Primo, secondo e contorno.' },
    {
      name: 'Senza una portata',
      price: '14 €',
      details: 'Due portate a scelta (es. primo e secondo, oppure secondo e contorno).',
    },
    {
      name: 'Solo piatto unico',
      price: '13 €',
      details: 'Solo primo, solo secondo oppure insalatona.',
    },
  ],
  included: 'Incluso (fino a): 50 cl di acqua alla spina, 25 cl di vino rosso o bianco della casa e 1 caffè. Altre bevande escluse.',
  note: 'Il menù non è condivisibile. Porzioni abbondanti: +1,00 €.',
};

const businessChoices = {
  firstCourses: [
    { name: 'Spaghetti alla carbonara', allergens: ['Glutine', 'Uova', 'Latticini'] as Allergen[] },
    { name: 'Spaghetti al ragù', allergens: ['Glutine'] as Allergen[] },
    { name: "Spaghetti all'arrabbiata", allergens: ['Glutine'] as Allergen[] },
  ],
  secondCourses: [
    { name: 'Carrè di maiale ai ferri', allergens: [] as Allergen[] },
    { name: 'Bistecca di manzo ai ferri', allergens: [] as Allergen[] },
    { name: 'Arrosto di pollo', allergens: [] as Allergen[] },
  ],
  sides: [
    { name: 'Patate fritte', allergens: [] as Allergen[] },
    { name: 'Insalata mista', allergens: [] as Allergen[] },
    { name: 'Patate al forno', allergens: [] as Allergen[] },
  ],
};

const winesSeed = {
  casa: [
    {
      name: 'Rosso – Merlot – Pittaro – Codoripo (Ud)',
      note: 'Calice 2,50 € · 25 cl 4,50 € · 50 cl 8 € · 75 cl 10 €',
      price: '2,50 - 10 €',
    },
    {
      name: 'Bianco – Friulano – Pittaro – Codoripo (Ud)',
      note: 'Calice 2,50 € · 25 cl 4,50 € · 50 cl 8 € · 75 cl 10 €',
      price: '2,50 - 10 €',
    },
  ],
  spumanti: [
    { name: 'Spumante metodo classico brut mill. “Oro” – Pittaro – Codroipo (Ud)', price: '33 €' },
    { name: 'Spumante metodo classico brut Pas Dosé – Pittaro – Codroipo (Ud)', price: '33 €' },
    { name: 'Spumante metodo classico brut “Pink” – Pittaro – Codroipo (Ud)', price: '27 €' },
    { name: 'Spumante metodo classico brut “Argento” – Pittaro – Codroipo (Ud)', price: '27 €' },
    { name: 'Ribolla gialla spumante metodo classico brut – Pittaro – Codroipo (Ud)', price: '27 €' },
    { name: 'Prosecco mill. brut – Vigna Dogarina – Salgareda (Tv)', price: 'Calice 4 € · Bottiglia 20 €' },
    { name: 'Ribolla gialla spumante extra dry – Le Celline – Codroipo (Ud)', price: 'Calice 3,60 € · Bottiglia 18 €' },
    { name: 'Spumante extra dry blancs de blancs “Invictus” – Maccari – San Vendemiano (Tv)', price: 'Calice 3 € · Bottiglia 15 €' },
  ],
  bianchi: [
    { name: 'Bianco del torrione - La Sclusa - Cividale del Friuli (Ud)', price: '30 €' },
    { name: 'Friulano – La Sclusa – Cividale del Friuli (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Friulano – Le Celline – Codroipo del Friuli (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Sauvignon – La Sclusa – Cividale del Friuli (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Sauvignon – Le Celline – Codroipo (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Malvasia – Le Celline – Codroipo (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Ribolla gialla ferma – Le Celline – Codroipo (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
  ],
  rossi: [
    { name: "Cabernet Sauvignon - Lis Neris - Farra d'Isonzo (Go)", price: '33 €' },
    { name: 'Rosso del torrione - La Sclusa - Cividale del Friuli (Ud)', price: '30 €' },
    { name: 'Schioppettino – La Sclusa – Cividale del Friuli (Ud)', price: 'Calice 3,60 € · Bottiglia 20 €' },
    { name: 'Schioppettino – Le Celline – Codroipo (Ud)', price: 'Calice 3,60 € · Bottiglia 20 €' },
    { name: 'Cabernet Franc – Le Celline – Codroipo (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Cabernet Franc – La Sclusa – Cividale del Friuli (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Cabernet Sauvignon – Le Celline – Codroipo (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Merlot – Le Celline – Codroipo (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Merlot – La Sclusa – Cividale del Friuli (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Refosco dal p. rosso – Le Celline – Codroipo (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
    { name: 'Refosco dal p. rosso – La Sclusa – Cividale del Friuli (Ud)', price: 'Calice 3 € · Bottiglia 18 €' },
  ],
  dessert: [
    { name: 'Moscato giallo spumante dolce – Le Celline – Codroipo (Ud)', price: 'Calice 3,60 € · Bottiglia 18 €' },
    { name: 'Verduzzo friulano passito – Le Celline – Codroipo (Ud)', price: 'Calice 3,60 € · Bottiglia 18 €' },
  ],
} as const;

function buildWineList(): Wine[] {
  const wines: Wine[] = [];

  for (const w of winesSeed.casa) {
    const priceText = w.note ?? w.price;
    const bounds = getEuroBounds(`${w.price} ${w.note ?? ''}`);
    wines.push({
      type: 'Casa',
      name: w.name,
      region: inferRegionFromName(w.name),
      priceText,
      priceMin: bounds.min,
      priceMax: bounds.max,
    });
  }

  for (const w of winesSeed.spumanti) {
    const bounds = getEuroBounds(w.price);
    wines.push({
      type: 'Spumante',
      name: w.name,
      region: inferRegionFromName(w.name),
      priceText: w.price,
      priceMin: bounds.min,
      priceMax: bounds.max,
    });
  }

  for (const w of winesSeed.bianchi) {
    const bounds = getEuroBounds(w.price);
    wines.push({
      type: 'Bianco',
      name: w.name,
      region: inferRegionFromName(w.name),
      priceText: w.price,
      priceMin: bounds.min,
      priceMax: bounds.max,
    });
  }

  for (const w of winesSeed.rossi) {
    const bounds = getEuroBounds(w.price);
    wines.push({
      type: 'Rosso',
      name: w.name,
      region: inferRegionFromName(w.name),
      priceText: w.price,
      priceMin: bounds.min,
      priceMax: bounds.max,
    });
  }

  for (const w of winesSeed.dessert) {
    const bounds = getEuroBounds(w.price);
    wines.push({
      type: 'Dessert',
      name: w.name,
      region: inferRegionFromName(w.name),
      priceText: w.price,
      priceMin: bounds.min,
      priceMax: bounds.max,
    });
  }

  return wines;
}

function PriceBlock({ text, className }: { text: string; className?: string }) {
  const segments = splitPriceSegments(text);
  if (segments.length === 0) return null;
  if (segments.length === 1 && !segments[0].label) {
    return <span className={cn('text-sm font-semibold text-stone-900 tabular-nums', className)}>{segments[0].value}</span>;
  }

  return (
    <ul className={cn('space-y-1', className)} aria-label="Prezzi">
      {segments.map((s) => (
        <li key={`${s.label ?? ''}:${s.value}`} className="grid grid-cols-[1fr_auto] gap-4 text-sm">
          <span className="text-stone-600">{s.label ?? 'Prezzo'}</span>
          <span className="font-semibold text-stone-900 tabular-nums">{s.value}</span>
        </li>
      ))}
    </ul>
  );
}

function AllergenBadges({ allergens, className }: { allergens: Allergen[]; className?: string }) {
  if (!allergens.length) return <span className={cn('text-sm text-stone-600', className)}>Allergeni: nessuno</span>;
  const sorted = [...new Set(allergens)].sort((a, b) => allergenInfo[a].order - allergenInfo[b].order);
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} aria-label="Allergeni">
      <span className="text-xs font-semibold uppercase tracking-[0.26em] text-stone-500">Allergeni</span>
      <ul className="flex flex-wrap gap-2">
        {sorted.map((a) => {
          const def = allergenLegend[a];
          return (
            <li key={a}>
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold shadow-soft',
                  def.pill
                )}
                aria-label={def.label}
                title={`${def.label} — ${allergenInfo[a].description}`}
              >
                <span className={cn('inline-flex size-2 rounded-full', def.dot)} aria-hidden="true" />
                <def.icon className="size-4" title={a} />
                <span className="tracking-[0.14em] uppercase">{def.label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AllergenIcons({ allergens, className }: { allergens: Allergen[]; className?: string }) {
  const sorted = [...new Set(allergens)].sort((a, b) => allergenInfo[a].order - allergenInfo[b].order);
  if (sorted.length === 0) return null;
  return (
    <ul className={cn('flex flex-wrap items-center gap-1.5', className)} aria-label="Allergeni">
      {sorted.map((a) => {
        const def = allergenLegend[a];
        return (
          <li key={a}>
            <span
              className={cn('inline-flex items-center justify-center rounded-full border p-1 shadow-soft', def.pill)}
              title={`${def.label} — ${allergenInfo[a].description}`}
              aria-label={def.label}
            >
              <def.icon className="size-4" title={a} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Tabs({
  value,
  onChange,
}: {
  value: 'carta' | 'business' | 'vini';
  onChange: (v: 'carta' | 'business' | 'vini') => void;
}) {
  const tab = (id: 'carta' | 'business' | 'vini', label: string) => (
    <Button
      key={id}
      variant={value === id ? 'secondary' : 'outline'}
      size="sm"
      onClick={() => onChange(id)}
      aria-pressed={value === id}
      className={cn('w-full justify-center', value === id && 'shadow-elevated')}
    >
      {label}
    </Button>
  );

  return (
    <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Sezioni menù">
      {tab('carta', 'Alla carta')}
      {tab('business', 'Menù lavoro')}
      {tab('vini', 'Carta vini')}
    </div>
  );
}

function ListSection({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <Card className="p-6 sm:p-8" id={id}>
      <h2 className="text-2xl font-semibold tracking-tight text-stone-950">{title}</h2>
      <div className="mt-6">{children}</div>
    </Card>
  );
}

export default function Menu() {
  const [tab, setTab] = useState<'carta' | 'business' | 'vini'>(() => {
    if (typeof window === 'undefined') return 'carta';
    const hash = window.location.hash.replace('#', '');
    if (hash === 'business' || hash === 'vini' || hash === 'carta') return hash;
    return 'carta';
  });
  const [query, setQuery] = useState('');
  const [wineQuery, setWineQuery] = useState('');
  const [wineType, setWineType] = useState<'tutti' | WineType>('tutti');
  const [wineRegion, setWineRegion] = useState<'tutti' | WineRegion>('tutti');
  const [wineMaxPrice, setWineMaxPrice] = useState<'tutti' | 15 | 20 | 30 | 35>('tutti');
  const [wineSort, setWineSort] = useState<'predefinito' | 'nome' | 'prezzo-asc' | 'prezzo-desc'>('predefinito');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.replaceState(null, '', `#${tab}`);
  }, [tab]);

  const filteredMenu = useMemo(() => {
    const q = normalizeText(query.trim());
    if (!q) return menuCategories;
    return menuCategories
      .map((cat) => {
        const items = cat.items.filter((item) => {
          const hay = normalizeText(`${item.name} ${item.description} ${(item.ingredients ?? []).join(' ')}`);
          return hay.includes(q);
        });
        return { ...cat, items };
      })
      .filter((c) => c.items.length);
  }, [query]);

  const menuCount = useMemo(() => filteredMenu.reduce((acc, c) => acc + c.items.length, 0), [filteredMenu]);

  const menuSchema = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = typeof window !== 'undefined' ? window.location.href : '';
    return {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: 'Trattoria da Vanda',
      url: url || undefined,
      hasMenu: {
        '@type': 'Menu',
        name: 'Menù',
        hasMenuSection: menuCategories.map((cat) => ({
          '@type': 'MenuSection',
          name: cat.title,
          hasMenuItem: cat.items.map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            description: item.description,
            image: origin ? `${origin}${item.imageSrc}` : item.imageSrc,
          })),
        })),
      },
    };
  }, []);

  const wines = useMemo(() => buildWineList(), []);
  const filteredWines = useMemo(() => {
    const q = wineQuery.trim().toLowerCase();
    const result = wines.filter((w) => {
      if (q && !`${w.name} ${w.region} ${w.priceText}`.toLowerCase().includes(q)) return false;
      if (wineType !== 'tutti' && w.type !== wineType) return false;
      if (wineRegion !== 'tutti' && w.region !== wineRegion) return false;
      if (wineMaxPrice !== 'tutti' && w.priceMax > wineMaxPrice) return false;
      return true;
    });

    if (wineSort === 'nome') return [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (wineSort === 'prezzo-asc')
      return [...result].sort((a, b) => (a.priceMin || Number.POSITIVE_INFINITY) - (b.priceMin || Number.POSITIVE_INFINITY) || a.name.localeCompare(b.name));
    if (wineSort === 'prezzo-desc')
      return [...result].sort((a, b) => (b.priceMin || 0) - (a.priceMin || 0) || a.name.localeCompare(b.name));
    return result;
  }, [wineMaxPrice, wineQuery, wineRegion, wineSort, wineType, wines]);

  const groupedWines = useMemo(() => {
    const order: WineType[] = ['Casa', 'Spumante', 'Bianco', 'Rosso', 'Dessert'];
    return order
      .map((type) => ({ type, items: filteredWines.filter((w) => w.type === type) }))
      .filter((g) => g.items.length);
  }, [filteredWines]);

  const filteredWinesCount = useMemo(() => filteredWines.length, [filteredWines]);

  return (
    <div className="pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />

      <Section className="bg-stone-950 py-16 text-stone-50 sm:py-20">
        <Container>
          <Badge className="border-white/15 bg-white/5 text-white">Menù</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Alla carta, menù lavoro e vini</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200">
            Piatti friulani di tradizione, proposte stagionali e una carta vini essenziale.
          </p>
        </Container>
      </Section>

      <Section className="bg-stone-50">
        <Container>
          <div className="mx-auto max-w-5xl space-y-6">
            <Tabs value={tab} onChange={setTab} />

            {tab === 'carta' ? (
              <div className="space-y-6" role="tabpanel" aria-label="Menù alla carta">
                <Card className="p-6 sm:p-8">
                  <div className="grid gap-4 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Ricerca</p>
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cerca un piatto o un ingrediente…"
                        className="mt-3 min-h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 text-base text-stone-900 outline-none ring-brand-700 focus:border-brand-300 focus:ring-2"
                      />
                      <p className="mt-3 text-sm text-stone-600">
                        Risultati: <span className="font-semibold text-stone-900">{menuCount}</span>
                      </p>
                    </div>
                    <div className="md:col-span-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Categorie</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {menuCategories.map((c) => (
                          <Button
                            key={c.id}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setTab('carta');
                              scrollToId(`carta-${c.id}`);
                            }}
                          >
                            {c.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Legenda allergeni</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {(Object.keys(allergenInfo) as Allergen[])
                      .sort((a, b) => allergenInfo[a].order - allergenInfo[b].order)
                      .map((a) => {
                        const def = allergenLegend[a];
                        return (
                          <div key={a} className="flex items-start gap-3">
                            <span className={cn('mt-0.5 inline-flex size-9 items-center justify-center rounded-full border shadow-soft', def.pill)}>
                              <def.icon className="size-5" title={a} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-stone-900">{def.label}</p>
                              <p className="text-sm text-stone-600">{allergenInfo[a].description}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Card>

                {filteredMenu.length ? (
                  filteredMenu.map((cat) => (
                    <ListSection key={cat.id} id={`carta-${cat.id}`} title={cat.title}>
                      <ul className="divide-y divide-stone-200/70">
                        {cat.items.map((item) => {
                          const priceSegments = splitPriceSegments(item.price);
                          const hasSingleInlinePrice = priceSegments.length === 1 && !priceSegments[0].label;
                          const showPriceBlock = !hasSingleInlinePrice && priceSegments.length > 0;
                          return (
                          <li key={item.id} className="py-5">
                            <div className="flex flex-wrap items-baseline justify-between gap-4">
                              <div className="min-w-0">
                                {item.featured && item.badge ? <Badge className="mb-3">{item.badge}</Badge> : null}
                                <h3 className="text-base font-semibold text-stone-950">{item.name}</h3>
                              </div>
                              {hasSingleInlinePrice ? <PriceBlock text={item.price} /> : null}
                            </div>

                            {item.description ? <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.description}</p> : null}

                            {showPriceBlock ? (
                              <div className="mt-3">
                                <PriceBlock text={item.price} />
                              </div>
                            ) : null}

                            {item.ingredients?.length ? (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {item.ingredients.map((ing) => (
                                  <span
                                    key={ing}
                                    className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700"
                                  >
                                    {ing}
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            <AllergenBadges className="mt-4" allergens={item.allergens} />
                          </li>
                          );
                        })}
                      </ul>
                    </ListSection>
                  ))
                ) : (
                  <Card className="p-10 text-center text-sm text-stone-600">Nessun risultato per la ricerca.</Card>
                )}

                <Card className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div className="min-w-0">
                      <h2 className="text-2xl font-semibold tracking-tight text-stone-950">{specialsInfo.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-stone-600">{specialsInfo.description}</p>
                    </div>
                    <Badge className="border-emerald-200 bg-emerald-50/70 text-emerald-800">Vedi lavagne</Badge>
                  </div>
                </Card>
              </div>
            ) : null}

            {tab === 'business' ? (
              <div className="space-y-6" role="tabpanel" aria-label="Menù lavoro">
                <Card className="p-6 sm:p-8">
                  <Badge>Menù lavoro</Badge>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950">{businessMenu.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">{businessMenu.description}</p>

                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {businessMenu.options.map((opt) => (
                      <Card key={opt.name} className="p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">{opt.name}</p>
                        <p className="mt-3 text-4xl font-semibold text-stone-950 tabular-nums">{normalizeEuroInText(opt.price)}</p>
                        <p className="mt-3 text-sm text-stone-600">{opt.details}</p>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-12 md:items-start">
                    <Card className="p-6 md:col-span-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Scelte del giorno</p>
                      <div className="mt-5 grid gap-5 text-sm text-stone-700">
                        <div>
                          <p className="font-semibold text-stone-950">Primi</p>
                          <ul className="mt-3 list-disc space-y-2 pl-5">
                            {businessChoices.firstCourses.map((x) => (
                              <li key={x.name}>
                                <div className="flex items-start justify-between gap-4">
                                  <span className="min-w-0">{x.name}</span>
                                  <AllergenIcons allergens={x.allergens} className="shrink-0" />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-stone-950">Secondi</p>
                          <ul className="mt-3 list-disc space-y-2 pl-5">
                            {businessChoices.secondCourses.map((x) => (
                              <li key={x.name}>
                                <div className="flex items-start justify-between gap-4">
                                  <span className="min-w-0">{x.name}</span>
                                  <AllergenIcons allergens={x.allergens} className="shrink-0" />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-stone-950">Contorni</p>
                          <ul className="mt-3 list-disc space-y-2 pl-5">
                            {businessChoices.sides.map((x) => (
                              <li key={x.name}>
                                <div className="flex items-start justify-between gap-4">
                                  <span className="min-w-0">{x.name}</span>
                                  <AllergenIcons allergens={x.allergens} className="shrink-0" />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>

                    <div className="space-y-4 md:col-span-7">
                      <Card className="p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Incluso</p>
                        <p className="mt-3 text-sm text-stone-700">{businessMenu.included}</p>
                        <div className="mt-4">
                          <AllergenBadges allergens={['Anidride Solforosa']} />
                        </div>
                      </Card>
                      <Card className="p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Nota</p>
                        <p className="mt-3 text-sm text-stone-700">{businessMenu.note}</p>
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
            ) : null}

            {tab === 'vini' ? (
              <div className="space-y-6" role="tabpanel" aria-label="Carta vini">
                <Card className="p-6 sm:p-8">
                  <div className="grid gap-6 md:grid-cols-12 md:items-end">
                    <div className="min-w-0 md:col-span-7">
                      <Badge>Carta vini</Badge>
                      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950">Vini</h2>
                      <p className="mt-4 text-sm leading-relaxed text-stone-600">
                        Tutti i vini possono contenere <span className="font-semibold text-stone-900">solfiti</span>.
                      </p>
                    </div>
                    <div className="md:col-span-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Ricerca</p>
                      <input
                        value={wineQuery}
                        onChange={(e) => setWineQuery(e.target.value)}
                        placeholder="Cerca in carta vini…"
                        className="mt-3 min-h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 text-base text-stone-900 outline-none ring-brand-700 focus:border-brand-300 focus:ring-2"
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-12 md:items-end">
                    <div className="md:col-span-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Tipo</p>
                      <select
                        value={wineType}
                        onChange={(e) => setWineType(e.target.value as typeof wineType)}
                        className="mt-3 min-h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 text-base text-stone-900"
                        aria-label="Tipo vino"
                      >
                        <option value="tutti">Tutti</option>
                        <option value="Casa">Casa</option>
                        <option value="Spumante">Spumante</option>
                        <option value="Bianco">Bianco</option>
                        <option value="Rosso">Rosso</option>
                        <option value="Dessert">Dessert</option>
                      </select>
                    </div>

                    <div className="md:col-span-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Regione</p>
                      <select
                        value={wineRegion}
                        onChange={(e) => setWineRegion(e.target.value as typeof wineRegion)}
                        className="mt-3 min-h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 text-base text-stone-900"
                        aria-label="Regione"
                      >
                        <option value="tutti">Tutte</option>
                        <option value="Friuli-Venezia Giulia">Friuli-Venezia Giulia</option>
                        <option value="Veneto">Veneto</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Prezzo (max)</p>
                      <select
                        value={wineMaxPrice}
                        onChange={(e) => setWineMaxPrice(e.target.value === 'tutti' ? 'tutti' : (Number(e.target.value) as 15 | 20 | 30 | 35))}
                        className="mt-3 min-h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 text-base text-stone-900"
                        aria-label="Prezzo massimo"
                      >
                        <option value="tutti">Qualsiasi</option>
                        <option value="15">Fino a 15 €</option>
                        <option value="20">Fino a 20 €</option>
                        <option value="30">Fino a 30 €</option>
                        <option value="35">Fino a 35 €</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <p className="text-sm text-stone-600">
                      Risultati: <span className="font-semibold text-stone-900">{filteredWinesCount}</span>
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                      <select
                        value={wineSort}
                        onChange={(e) => setWineSort(e.target.value as typeof wineSort)}
                        className="min-h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 text-base text-stone-900 sm:w-auto"
                        aria-label="Ordinamento vini"
                      >
                        <option value="predefinito">Predefinito</option>
                        <option value="nome">Nome (A–Z)</option>
                        <option value="prezzo-asc">Prezzo (crescente)</option>
                        <option value="prezzo-desc">Prezzo (decrescente)</option>
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setWineQuery('');
                          setWineType('tutti');
                          setWineRegion('tutti');
                          setWineMaxPrice('tutti');
                          setWineSort('predefinito');
                        }}
                        className="w-full sm:w-auto"
                      >
                        Reset filtri
                      </Button>
                    </div>
                  </div>
                </Card>

                {groupedWines.length ? (
                  groupedWines.map((group) => (
                    <ListSection key={group.type} title={group.type}>
                      <ul className="divide-y divide-stone-200/70">
                        {group.items.map((w) => {
                          const priceSegments = splitPriceSegments(w.priceText);
                          const hasSingleInlinePrice = priceSegments.length === 1 && !priceSegments[0].label;
                          const showPriceBlock = !hasSingleInlinePrice && priceSegments.length > 0;
                          return (
                          <li key={`${w.type}:${w.name}`} className="py-5">
                            <div className="flex flex-wrap items-baseline justify-between gap-4">
                              <div className="min-w-0">
                                <h3 className="text-base font-semibold text-stone-950">{w.name}</h3>
                                <p className="mt-1 text-sm text-stone-600">{w.region}</p>
                              </div>
                              {hasSingleInlinePrice ? <PriceBlock text={w.priceText} /> : null}
                            </div>
                            {showPriceBlock ? (
                              <div className="mt-3">
                                <PriceBlock text={w.priceText} />
                              </div>
                            ) : null}
                            <AllergenBadges className="mt-4" allergens={['Anidride Solforosa']} />
                          </li>
                          );
                        })}
                      </ul>
                    </ListSection>
                  ))
                ) : (
                  <Card className="p-10 text-center text-sm text-stone-600">Nessun vino corrisponde alla ricerca.</Card>
                )}
              </div>
            ) : null}

            <Card className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Informazioni</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-stone-700">
                {generalInfo.map((x) => (
                  <li key={x}>{normalizeEuroInText(x)}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}

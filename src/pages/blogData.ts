export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: 'News' | 'Eventi' | 'Ricette' | 'Storie';
  image: string;
  tags: string[];
  content: Array<
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'ul'; items: string[] }
  >;
};

export const blogCategories: Array<'Tutti' | BlogPost['category']> = ['Tutti', 'News', 'Eventi', 'Ricette', 'Storie'];

export const blogPosts: BlogPost[] = [
  {
    id: 'menu-natale-2024',
    slug: 'menu-di-natale-2024',
    title: 'Menù di Natale 2024',
    excerpt:
      'Il Natale si avvicina e con esso il profumo delle tradizioni. Scopri la proposta pensata per un pranzo che sa di casa.',
    date: '2024-11-21',
    author: 'Trattoria da Vanda',
    category: 'Eventi',
    image: '/images/476124006_9384997218219213_2160549072948083416_n.jpg',
    tags: ['Natale', 'Menù', 'Tradizione'],
    content: [
      {
        type: 'p',
        text: 'Il Natale è un momento speciale: tavole imbandite, profumi che riportano ai ricordi e il piacere di stare insieme. Per quest’anno abbiamo costruito un menù fedele alla tradizione friulana, con equilibrio e ingredienti del territorio.',
      },
      { type: 'h2', text: 'Cosa troverai' },
      {
        type: 'ul',
        items: [
          'Antipasti della casa con selezione stagionale',
          'Primi piatti di tradizione',
          'Secondi con cotture lente e contorni del territorio',
          'Dolce della casa e caffetteria',
        ],
      },
      {
        type: 'p',
        text: 'Per informazioni su allergie, intolleranze o richieste particolari, contattaci: definiremo insieme la soluzione migliore.',
      },
    ],
  },
  {
    id: 'ospite-speciale',
    slug: 'un-ospite-speciale-in-trattoria',
    title: 'Un ospite speciale in Trattoria',
    excerpt:
      'Una visita che ci ha fatto sorridere: quando la passione per la cucina incontra la convivialità, la sala si accende.',
    date: '2024-11-14',
    author: 'Trattoria da Vanda',
    category: 'News',
    image: '/images/476237390_9384997368219198_3053090971420161476_n.jpg',
    tags: ['Ospiti', 'Cucina', 'Convivialità'],
    content: [
      {
        type: 'p',
        text: 'Ci sono serate in cui tutto scorre con una semplicità perfetta: una tavola che ride, piatti che arrivano caldi, e la sensazione che la cucina stia parlando la lingua giusta.',
      },
      {
        type: 'p',
        text: 'È stato bello condividere la nostra idea di trattoria: essenziale, genuina, concentrata sui sapori e sul tempo passato insieme.',
      },
    ],
  },
  {
    id: 'benvenuti-blog',
    slug: 'benvenuti-nel-nostro-blog',
    title: 'Benvenuti nel nostro blog',
    excerpt:
      'Uno spazio dove raccontare ricette, storie e novità dalla Trattoria da Vanda: tradizione, territorio e persone.',
    date: '2024-11-10',
    author: 'Trattoria da Vanda',
    category: 'Storie',
    image: '/images/483831419_9591412330911033_795015669042024339_n.jpg',
    tags: ['Blog', 'Storie', 'Novità'],
    content: [
      {
        type: 'p',
        text: 'Questo blog nasce per condividere ciò che vive dietro le quinte: la scelta degli ingredienti, i gesti che si ripetono in cucina, e le storie che rendono una trattoria un luogo speciale.',
      },
      {
        type: 'p',
        text: 'Parleremo di stagioni, ricette e piccoli dettagli che fanno la differenza. Se ti va, torna a trovarci: qui e in sala.',
      },
    ],
  },
  {
    id: 'tradizione-frico',
    slug: 'la-tradizione-del-frico',
    title: 'La tradizione del Frico',
    excerpt:
      'Uno dei piatti simbolo del Friuli: semplice, intenso e confortante. Ecco cosa lo rende così speciale.',
    date: '2024-10-05',
    author: 'Chef Marco',
    category: 'Ricette',
    image: '/images/72411193_2657273854324950_7931703791299067904_n.jpg',
    tags: ['Frico', 'Tradizione', 'Ricette'],
    content: [
      {
        type: 'p',
        text: 'Il frico è un piatto che racconta il Friuli con poche parole: formaggio, patate, tempo. Richiede attenzione, una mano sicura e il rispetto della materia prima.',
      },
      { type: 'h2', text: 'Il segreto' },
      {
        type: 'p',
        text: 'La differenza sta nella qualità del formaggio e nella gestione del calore: deve diventare croccante fuori e morbido dentro, senza fretta.',
      },
    ],
  },
];

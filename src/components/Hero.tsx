
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import LogoSoloTesto from '../../Da Vanda solo testo bianco.png';

const AUTOPLAY_MS = 5200;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const images = useMemo(
    () => [
      { src: '/images/485347859_9649288278456771_7331598190390471549_n.jpg', alt: 'Trattoria da Vanda' },
      { src: '/images/476237390_9384997368219198_3053090971420161476_n.jpg', alt: 'Atmosfera in sala' },
      { src: '/images/476124006_9384997218219213_2160549072948083416_n.jpg', alt: 'Cucina della tradizione friulana' },
      { src: '/images/177654852_4105854142800240_6970454504795988580_n.jpg', alt: 'Dettagli e accoglienza' },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setActiveIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, total]);

  const current = images[activeIndex];

  return (
    <section className="relative min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          {!reduceMotion && (
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.21, 0.75, 0.18, 1] }}
              decoding="async"
              fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
            />
          )}
          {reduceMotion && (
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
              fetchPriority="high"
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_20%_15%,rgba(214,195,168,0.22),transparent_55%),radial-gradient(900px_circle_at_85%_25%,rgba(95,139,111,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/35 to-stone-950/85" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pb-16 pt-28 md:px-8">
        <div className="flex flex-col items-center text-center">
          <img
            src={LogoSoloTesto}
            alt="Trattoria da Vanda"
            className="h-24 w-auto drop-shadow-[0_18px_55px_rgba(0,0,0,0.7)] sm:h-28 md:h-32 lg:h-36"
          />

          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.45em] text-stone-200">
            San Martino di Codroipo • Dal 1928
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Cucina friulana, essenziale.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
            Tradizione di famiglia, ingredienti del territorio e un’ospitalità che sa di casa.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/prenota"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Prenota un tavolo
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-white transition-colors hover:bg-white/10"
            >
              Scopri il menù
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

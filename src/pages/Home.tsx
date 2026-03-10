import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import {
  BedDouble,
  Calendar,
  MapPin,
  Phone,
  Sparkles,
  UtensilsCrossed,
  Play,
  X,
} from 'lucide-react';
import Hero from '../components/Hero';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { buttonStyles } from '../components/ui/buttonStyles';

type GalleryCategory = 'trattoria' | 'locanda';
type GalleryImage = { src: string; alt: string };

const Home = () => {
  const reduceMotion = useReducedMotion();
  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  const galleries = useMemo<Record<GalleryCategory, GalleryImage[]>>(
    () => ({
      trattoria: [
        { src: '/images/485347859_9649288278456771_7331598190390471549_n.jpg', alt: 'Trattoria da Vanda' },
        { src: '/images/476237390_9384997368219198_3053090971420161476_n.jpg', alt: 'Atmosfera in sala' },
        { src: '/images/476124006_9384997218219213_2160549072948083416_n.jpg', alt: 'Cucina friulana' },
        { src: '/images/194198091_4219854808066839_9151004493796416859_n.jpg', alt: 'Dettagli e tavola' },
        { src: '/images/177592604_4105853926133595_7338755891135402380_n.jpg', alt: 'Piatti della tradizione' },
        { src: '/images/183909662_4145817605470560_3095392176152251348_n.jpg', alt: 'Dettaglio della sala' },
        { src: '/images/72411193_2657273854324950_7931703791299067904_n.jpg', alt: 'Accoglienza e convivialità' },
        { src: '/images/177654852_4105854142800240_6970454504795988580_n.jpg', alt: 'Dettagli e accoglienza' },
        { src: '/images/483831419_9591412330911033_795015669042024339_n.jpg', alt: 'Momenti in trattoria' },
      ],
      locanda: [
        { src: '/images/bnb/bnb-03.jpg', alt: 'Locanda da Vanda – camere e interni (foto 1)' },
        { src: '/images/bnb/bnb-04.jpg', alt: 'Locanda da Vanda – camere e interni (foto 2)' },
        { src: '/images/bnb/bnb-06.jpg', alt: 'Locanda da Vanda – camere e interni (foto 3)' },
        { src: '/images/bnb/bnb-07.jpg', alt: 'Locanda da Vanda – camere e interni (foto 4)' },
        { src: '/images/bnb/bnb-08.jpg', alt: 'Locanda da Vanda – camere e interni (foto 5)' },
        { src: '/images/bnb/bnb-09.jpg', alt: 'Locanda da Vanda – camere e interni (foto 6)' },
        { src: '/images/bnb/bnb-10.jpg', alt: 'Locanda da Vanda – camere e interni (foto 7)' },
        { src: '/images/bnb/bnb-11.jpg', alt: 'Locanda da Vanda – camere e interni (foto 8)' },
        { src: '/images/bnb/bnb-12.jpg', alt: 'Locanda da Vanda – camere e interni (foto 9)' },
        { src: '/images/bnb/bnb-13.jpg', alt: 'Locanda da Vanda – camere e interni (foto 10)' },
        { src: '/images/bnb/bnb-14.jpg', alt: 'Locanda da Vanda – camere e interni (foto 11)' },
      ],
    }),
    []
  );

  const [activeGallery, setActiveGallery] = useState<GalleryCategory>('trattoria');
  const galleryImages = galleries[activeGallery];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const isLightboxOpen = lightboxIndex !== null;

  const openLightbox = (index: number) => {
    previousActiveRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goNext = () => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));
  };

  const goPrev = () => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
  };

  const onLightboxNavigate = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (galleryImages.length <= 1) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const ratio = bounds.width ? x / bounds.width : 0.5;
    if (ratio < 0.33) {
      goPrev();
      return;
    }
    if (ratio > 0.67) {
      goNext();
    }
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
        return;
      }
      if (e.key === 'Tab') {
        const container = dialogRef.current;
        if (!container) return;
        const focusables = Array.from(
          container.querySelectorAll<HTMLElement>(
            'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previousActiveRef.current?.focus();
      previousActiveRef.current = null;
    };
  }, [isLightboxOpen, activeGallery, galleryImages.length]);

  return (
    <>
      <Hero />

      <Section id="chi-siamo" className="bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.21, 0.75, 0.18, 1] }}
              className="lg:col-span-6"
            >
              <Badge>Chi siamo</Badge>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                Una storia di famiglia nel cuore del Friuli
              </h2>
              <p className="mt-5 text-base leading-relaxed text-stone-600">
                Dal 1928 accogliamo ospiti e viaggiatori con piatti che parlano di territorio, memoria e convivialità.
                La nostra cucina nasce da gesti semplici, ingredienti veri e una cura costante per i dettagli.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Filosofia</p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700">
                    Tradizione, qualità e un’accoglienza che mette le persone al centro.
                  </p>
                </Card>
                <Card className="p-5">
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Territorio</p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700">
                    Materie prime locali, stagionalità e collaborazione con produttori del Friuli.
                  </p>
                </Card>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link to="/prenota" className={buttonStyles({ variant: 'primary', size: 'md' })}>
                  Prenota ora
                </Link>
                <Link to="/blog" className={buttonStyles({ variant: 'ghost', size: 'md' })}>
                  News & eventi
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
              transition={{ duration: 0.7, ease: [0.21, 0.75, 0.18, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative">
                <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(520px_circle_at_20%_20%,rgba(155,111,70,0.25),transparent_55%),radial-gradient(520px_circle_at_80%_60%,rgba(95,139,111,0.20),transparent_55%)] blur-2xl" />
                <div className="relative overflow-hidden rounded-[3rem] border border-stone-200 bg-stone-100">
                  <img
                    src="/images/194198091_4219854808066839_9151004493796416859_n.jpg"
                    alt="Trattoria da Vanda"
                    className="w-full object-cover aspect-[16/10]"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section id="servizi" className="bg-stone-50">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.21, 0.75, 0.18, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge>Servizi</Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              Un’esperienza completa, dalla tavola al riposo
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Cucina tipica, menù lavoro, eventi e camere: ogni dettaglio è pensato per farti sentire a casa.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group relative overflow-hidden p-6 transition-shadow hover:shadow-elevated">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_0%,rgba(155,111,70,0.16),transparent_55%),radial-gradient(600px_circle_at_100%_80%,rgba(95,139,111,0.12),transparent_55%)] opacity-80" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <UtensilsCrossed size={22} />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Trattoria</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-stone-950">Cucina friulana</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Ricette di famiglia, ingredienti locali e una carta che cambia con la stagione.
                </p>
                <Link
                  to="/menu"
                  className="mt-6 inline-flex items-center rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-700 transition-colors hover:bg-white"
                >
                  Vedi il menù
                </Link>
              </div>
            </Card>

            <Card className="group relative overflow-hidden p-6 transition-shadow hover:shadow-elevated">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_0%,rgba(95,139,111,0.18),transparent_55%),radial-gradient(600px_circle_at_100%_80%,rgba(155,111,70,0.12),transparent_55%)] opacity-80" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-50 text-sage-700 ring-1 ring-sage-100">
                    <Sparkles size={22} />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Business</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-stone-950">Menù lavoro</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Soluzioni rapide e curate, perfette per la pausa pranzo dal lunedì al venerdì.
                </p>
                <Link
                  to="/menu"
                  className="mt-6 inline-flex items-center rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-700 transition-colors hover:bg-white"
                >
                  Scopri le formule
                </Link>
              </div>
            </Card>

            <Card className="group relative overflow-hidden p-6 transition-shadow hover:shadow-elevated">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_0%,rgba(155,111,70,0.14),transparent_55%),radial-gradient(600px_circle_at_100%_80%,rgba(95,139,111,0.14),transparent_55%)] opacity-80" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-stone-900 text-stone-50 ring-1 ring-stone-800">
                    <BedDouble size={22} />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Locanda</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-stone-950">Camere & B&amp;B</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Comfort moderno immerso nella quiete friulana, a pochi passi dalla trattoria.
                </p>
                <Link
                  to="/bnb"
                  className="mt-6 inline-flex items-center rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-700 transition-colors hover:bg-white"
                >
                  Scopri le camere
                </Link>
              </div>
            </Card>

            <Card className="group relative overflow-hidden p-6 transition-shadow hover:shadow-elevated">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_0%,rgba(95,139,111,0.14),transparent_55%),radial-gradient(600px_circle_at_100%_80%,rgba(155,111,70,0.14),transparent_55%)] opacity-80" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-700 text-white ring-1 ring-brand-600">
                    <Calendar size={22} />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Eventi</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-stone-950">Cene speciali</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Compleanni, ricorrenze e momenti da celebrare con un menù costruito insieme.
                </p>
                <Link
                  to="/prenota"
                  className="mt-6 inline-flex items-center rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-700 transition-colors hover:bg-white"
                >
                  Richiedi info
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section id="video" className="bg-white">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.21, 0.75, 0.18, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge>Video</Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              Sapori e profumi in osteria
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Un racconto tra persone, piatti e territorio: guarda la puntata dedicata a “Da Vanda”.
            </p>
          </motion.div>

          <div className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-950 shadow-soft">
              {!isVideoOpen ? (
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="group relative block w-full"
                  aria-label="Riproduci video: Sapori e profumi in osteria – Da Vanda"
                >
                  <img
                    src="/images/video/sapori-e-profumi-da-vanda.jpg"
                    alt="Anteprima video: Sapori e profumi in osteria – Da Vanda"
                    className="w-full object-cover aspect-video"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/15 to-transparent" />
                  <span className="pointer-events-none absolute inset-0 grid place-items-center">
                    <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-base font-semibold tracking-[0.18em] uppercase text-white backdrop-blur-sm transition-colors group-hover:bg-white/15">
                      <Play size={18} /> Guarda il video
                    </span>
                  </span>
                </button>
              ) : (
                <iframe
                  className="aspect-video w-full"
                  src="https://www.youtube-nocookie.com/embed/oIsPdtfYims?autoplay=1&rel=0&modestbranding=1&controls=1"
                  title="Sapori e profumi in osteria – Da Vanda"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="galleria" className="bg-stone-50">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.21, 0.75, 0.18, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge>Galleria</Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
              Atmosfera, dettagli, sapori
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600">
              Una selezione di scatti della Trattoria e della Locanda: apri le immagini per vederle in grande.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setLightboxIndex(null);
                setActiveGallery('trattoria');
              }}
              className={
                activeGallery === 'trattoria'
                  ? 'min-h-11 rounded-full border border-brand-200 bg-brand-700 px-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-white shadow-soft'
                  : 'min-h-11 rounded-full border border-stone-200 bg-white/70 px-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-700 shadow-soft hover:bg-white'
              }
              aria-pressed={activeGallery === 'trattoria'}
            >
              Trattoria
            </button>
            <button
              type="button"
              onClick={() => {
                setLightboxIndex(null);
                setActiveGallery('locanda');
              }}
              className={
                activeGallery === 'locanda'
                  ? 'min-h-11 rounded-full border border-brand-200 bg-brand-700 px-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-white shadow-soft'
                  : 'min-h-11 rounded-full border border-stone-200 bg-white/70 px-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-700 shadow-soft hover:bg-white'
              }
              aria-pressed={activeGallery === 'locanda'}
            >
              Locanda
            </button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => openLightbox(idx)}
                className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                aria-label={`Apri immagine: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/menu" className={buttonStyles({ variant: 'outline', size: 'md' })}>
              Esplora il menù
            </Link>
            <Link to="/contatti" className={buttonStyles({ variant: 'primary', size: 'md' })}>
              Contatti
            </Link>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <Card className="p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <Badge>Contatti</Badge>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">Ti aspettiamo</h2>
                <p className="mt-4 text-base leading-relaxed text-stone-600">
                  Prenota un tavolo o scrivici per eventi e locanda. Trovi form, mappa e recapiti nella pagina dedicata.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 text-brand-700" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Via Erminia, 9</p>
                      <p className="text-sm text-stone-600">San Martino di Codroipo • 33033 (UD)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-brand-700" size={18} />
                    <a className="text-sm font-semibold text-stone-900 hover:text-brand-800" href="tel:+390432901234">
                      +39 0432 901234
                    </a>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link to="/prenota" className={buttonStyles({ variant: 'primary', size: 'md', className: 'w-full' })}>
                      Prenota
                    </Link>
                    <Link to="/contatti" className={buttonStyles({ variant: 'outline', size: 'md', className: 'w-full' })}>
                      Vai ai contatti
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {isLightboxOpen && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Galleria immagini"
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-stone-950 shadow-elevated"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
              <button
                type="button"
                ref={closeButtonRef}
                onClick={closeLightbox}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/15"
                aria-label="Chiudi"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative">
              <div className="relative" onClick={onLightboxNavigate}>
                <img
                  src={galleryImages[lightboxIndex].src}
                  alt={galleryImages[lightboxIndex].alt}
                  className="h-[78vh] w-full object-contain bg-stone-950"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollManager from './components/ScrollManager';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Reservation = lazy(() => import('./pages/Reservation'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BnB = lazy(() => import('./pages/BnB'));
const Contatti = lazy(() => import('./pages/Contatti'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookie = lazy(() => import('./pages/Cookie'));
const StyleGuide = lazy(() => import('./pages/StyleGuide'));

function setMetaBySelector(selector: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
}

function RouteMeta() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/blog/') && path !== '/blog') return;

    const baseTitle = 'Trattoria da Vanda';
    const defaults = {
      title: baseTitle,
      description:
        'Trattoria da Vanda a San Martino di Codroipo: cucina friulana di tradizione, menù lavoro, eventi e locanda. Prenota un tavolo o contattaci.',
    };

    const meta =
      path === '/'
        ? {
            title: baseTitle,
            description:
              'Cucina friulana di tradizione a San Martino di Codroipo. Menù, eventi e locanda: un’esperienza essenziale, elegante, di famiglia.',
          }
        : path === '/menu'
          ? {
              title: `Menù | ${baseTitle}`,
              description: 'Il menù della Trattoria da Vanda: piatti friulani, proposte stagionali e menù lavoro.',
            }
          : path === '/prenota'
            ? {
                title: `Prenota | ${baseTitle}`,
                description: 'Richiedi una prenotazione tavolo: data, orario, numero ospiti e note.',
              }
            : path === '/bnb'
              ? {
                  title: `B&B | ${baseTitle}`,
                  description: 'Locanda da Vanda: camere, servizi e richiesta disponibilità con date di soggiorno.',
                }
              : path === '/blog'
                ? {
                    title: `Blog | ${baseTitle}`,
                    description: 'Blog & eventi: novità, storie e ricette dalla Trattoria da Vanda.',
                  }
                : path === '/contatti'
                  ? {
                      title: `Contatti | ${baseTitle}`,
                      description: 'Contatti, form e mappa: scrivici o vieni a trovarci a San Martino di Codroipo.',
                    }
                  : path === '/privacy'
                    ? { title: `Privacy | ${baseTitle}`, description: defaults.description }
                    : path === '/cookie'
                      ? { title: `Cookie | ${baseTitle}`, description: defaults.description }
                      : defaults;

    document.title = meta.title;
    setMetaBySelector('meta[name="description"]', meta.description);
    setMetaBySelector('meta[property="og:title"]', meta.title);
    setMetaBySelector('meta[property="og:description"]', meta.description);
    setMetaBySelector('meta[name="twitter:title"]', meta.title);
    setMetaBySelector('meta[name="twitter:description"]', meta.description);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-50 text-stone-950 font-sans flex flex-col">
        <RouteMeta />
        <ScrollManager />
        <Navbar />
        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="pt-24">
                <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
                  <div className="rounded-3xl border border-stone-200 bg-white/70 p-10 text-center text-sm text-stone-600 shadow-soft">
                    Caricamento…
                  </div>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/prenota" element={<Reservation />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/bnb" element={<BnB />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookie" element={<Cookie />} />
              <Route path="/styleguide" element={<StyleGuide />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

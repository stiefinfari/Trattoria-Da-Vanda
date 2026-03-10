import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import LogoSoloTesto from '../../Da Vanda solo testo bianco.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'B&B', href: '/bnb' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contatti', href: '/contatti' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 z-50 w-full border-b border-transparent transition-all duration-300',
        scrolled || !isHome
          ? 'bg-stone-50/95 backdrop-blur-sm shadow-soft py-2 border-stone-200'
          : 'bg-transparent py-4 text-white'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center">
          <img
            src={LogoSoloTesto}
            alt="Trattoria da Vanda"
            className={clsx(
              'h-8 w-auto transition-all duration-300 sm:h-10',
              scrolled || !isHome ? 'brightness-0' : 'brightness-0 invert'
            )}
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={clsx(
                'text-[11px] font-semibold uppercase tracking-[0.26em] transition-colors',
                scrolled || !isHome ? 'text-stone-700 hover:text-brand-700' : 'text-stone-50 hover:text-brand-200'
              )}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/prenota"
            className={clsx(
              'rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] transition-colors',
              scrolled || !isHome
                ? 'bg-stone-900 text-stone-50 hover:bg-stone-800'
                : 'bg-white/10 text-stone-50 hover:bg-white/15'
            )}
          >
            Prenota
          </Link>
        </div>

        <button
          className={clsx(
            'inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden',
            scrolled || !isHome ? 'text-stone-900' : 'text-white'
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.21, 0.75, 0.18, 1] }}
            className="absolute left-0 top-full flex w-full flex-col space-y-2 border-t border-stone-200 bg-stone-50/98 px-4 py-4 shadow-soft md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex min-h-11 items-center rounded-2xl px-3 text-base font-semibold tracking-[0.22em] uppercase text-stone-800 transition-colors hover:bg-stone-100 hover:text-brand-700"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/prenota"
              className="mt-1 inline-flex min-h-11 items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-base font-semibold uppercase tracking-[0.22em] text-stone-50 transition-colors hover:bg-stone-800"
              onClick={() => setIsOpen(false)}
            >
              Prenota
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

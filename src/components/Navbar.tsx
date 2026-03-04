import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Prenota', href: '/prenota' },
    { name: 'B&B', href: '/bnb' },
    { name: 'Blog', href: '/blog' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent',
        scrolled || !isHome ? 'bg-rustic-50/95 backdrop-blur-sm shadow-md py-2 border-rustic-200' : 'bg-transparent py-4 text-white'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/logo/DAVANDA-LOGOFULL.png" 
            alt="Trattoria da Vanda" 
            className={clsx(
              "h-12 w-auto transition-all duration-300",
              scrolled || !isHome ? "brightness-0" : "brightness-0 invert"
            )} 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={clsx(
                "text-sm uppercase tracking-widest hover:text-rustic-500 transition-colors font-medium",
                scrolled || !isHome ? 'text-stone-800' : 'text-white'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={scrolled || !isHome ? 'text-rustic-900' : 'text-white'} />
          ) : (
            <Menu className={scrolled || !isHome ? 'text-rustic-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-rustic-50 shadow-lg border-t border-rustic-100 py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-rustic-900 font-serif text-lg hover:text-rustic-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

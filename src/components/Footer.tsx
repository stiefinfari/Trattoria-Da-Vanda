import { MapPin, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 border-t border-rustic-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 text-center md:text-left">
          
          {/* Logo & Intro */}
          <div className="space-y-6">
            <Link to="/" className="block mb-6">
              <img 
                src="/logo/DAVANDA-LOGOFULL.png" 
                alt="Trattoria da Vanda" 
                className="h-16 w-auto brightness-0 invert opacity-90 mx-auto md:mx-0"
              />
            </Link>
            <p className="text-stone-400 font-light text-sm leading-relaxed">
              Autentica cucina friulana e ospitalità familiare dal 1928 a San Martino di Codroipo.
            </p>
            <div className="flex justify-center md:justify-start space-x-6 pt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-rustic-400 transition-colors"><Instagram size={24} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-rustic-400 transition-colors"><Facebook size={24} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif text-white uppercase tracking-widest border-b border-rustic-800 pb-2 inline-block">Navigazione</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/" className="hover:text-rustic-400 transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-rustic-400 transition-colors">Il Menù</Link></li>
              <li><Link to="/prenota" className="hover:text-rustic-400 transition-colors">Prenota Tavolo</Link></li>
              <li><Link to="/bnb" className="hover:text-rustic-400 transition-colors">Locanda & Camere</Link></li>
              <li><Link to="/blog" className="hover:text-rustic-400 transition-colors">Blog & Eventi</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif text-white uppercase tracking-widest border-b border-rustic-800 pb-2 inline-block">Contatti</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-rustic-500 mt-1 flex-shrink-0" />
                <span>Via Erminia, 9<br/>San Martino di Codroipo<br/>33033 (UD)</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="text-rustic-500 flex-shrink-0" />
                <a href="mailto:info@trattoriadavanda.com" className="hover:text-rustic-400">info@trattoriadavanda.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="text-rustic-500 flex-shrink-0" />
                <a href="tel:+390432901234" className="hover:text-rustic-400">+39 0432 901234</a>
              </li>
            </ul>
          </div>

          {/* Business Details */}
          <div className="space-y-6 text-xs text-stone-500 font-light">
            <h4 className="text-lg font-serif text-white uppercase tracking-widest border-b border-rustic-800 pb-2 inline-block">Dettagli</h4>
            <div className="space-y-2">
              <p>Trattoria da Vanda Snc</p>
              <p>P.IVA: 02720950308</p>
              <p>SDI: P62QHVQ</p>
              <p className="pt-4">© {new Date().getFullYear()} Tutti i diritti riservati.</p>
            </div>
          </div>

        </div>
        
        <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-stone-500">
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link to="/cookie" className="hover:text-stone-300 transition-colors">Cookie Policy</Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <p className="flex items-center gap-2">
              Realizzato con ♥ per la tradizione friulana
              <img 
                src="/logo/gcl-logo.png" 
                alt="Gaia Circle Lab" 
                className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" 
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

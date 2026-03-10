import { BedDouble, Home, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const Future = () => {
  return (
    <section id="futuro" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-rustic-50 via-white to-rustic-50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 rounded-3xl border border-rustic-200 translate-x-4 translate-y-4 -z-10" />
            <img
              src="/images/bnb/bnb-03.jpg"
              alt="Locanda da Vanda – camere e interni"
              className="w-full h-auto object-cover rounded-3xl shadow-xl aspect-[4/3]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-7 text-center md:text-left">
            <div className="space-y-3">
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-rustic-500">
                Il nostro futuro
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
                Il B&amp;B tra quiete friulana e comfort moderno
              </h2>
            </div>

            <p className="text-stone-600 text-base md:text-lg leading-relaxed">
              Camere ristrutturate, ambienti luminosi e dettagli curati raccontano la stessa
              filosofia della nostra cucina: autenticità, cura e attenzione alle persone che
              scegliamo di ospitare.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 text-stone-700">
                <div className="bg-rustic-100 p-3 rounded-full text-rustic-700">
                  <Home size={22} />
                </div>
                <p className="font-serif italic text-base md:text-lg">
                  Un rifugio intimo, a pochi passi dalla Trattoria.
                </p>
              </div>

              <div className="flex items-center gap-4 text-stone-700">
                <div className="bg-rustic-100 p-3 rounded-full text-rustic-700">
                  <BedDouble size={22} />
                </div>
                <p className="font-serif italic text-base md:text-lg">
                  Camere confortevoli, ideali per chi viaggia per lavoro o per piacere.
                </p>
              </div>

              <div className="flex items-center gap-4 text-stone-700">
                <div className="bg-rustic-100 p-3 rounded-full text-rustic-700">
                  <Coffee size={22} />
                </div>
                <p className="font-serif italic text-base md:text-lg">
                  Colazioni lente, profumo di caffè e pane appena tostato.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/bnb"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-rustic-700 text-white font-semibold text-sm md:text-base tracking-wider uppercase hover:bg-rustic-800 transition-colors shadow-md"
              >
                Scopri le camere
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Future;

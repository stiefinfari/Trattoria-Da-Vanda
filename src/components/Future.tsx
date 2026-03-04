import { BedDouble, Home, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const Future = () => {
  return (
    <section id="futuro" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
          
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 border-2 border-rustic-300 translate-x-4 translate-y-4 -z-10 rounded-sm"></div>
            <img 
              src="/images/72411193_2657273854324950_7931703791299067904_n.jpg" 
              alt="Camera accogliente del B&B" 
              className="w-full h-auto object-cover rounded-sm shadow-xl aspect-[4/3]"
            />
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <div>
              <span className="text-rustic-500 font-serif text-lg tracking-widest uppercase mb-2 block">Il Nostro Futuro</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                Il B&B di Trattoria da Vanda
              </h2>
            </div>
            
            <p className="text-stone-600 font-light text-lg leading-relaxed">
              Di recente ristrutturazione, il nostro B&B rappresenta il futuro che intendiamo costruire. Ci impegniamo a creare un'esperienza ospitale che vada oltre le aspettative, offrendo un ambiente accogliente e un servizio impeccabile.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-stone-700">
                <div className="bg-rustic-100 p-2 rounded-full text-rustic-700">
                  <Home size={24} />
                </div>
                <p className="font-serif italic text-lg">"Sentirsi parte della nostra famiglia"</p>
              </div>
              
              <div className="flex items-center gap-4 text-stone-700">
                <div className="bg-rustic-100 p-2 rounded-full text-rustic-700">
                  <BedDouble size={24} />
                </div>
                <p className="font-serif italic text-lg">Camere confortevoli e ristrutturate</p>
              </div>

              <div className="flex items-center gap-4 text-stone-700">
                <div className="bg-rustic-100 p-2 rounded-full text-rustic-700">
                  <Coffee size={24} />
                </div>
                <p className="font-serif italic text-lg">Ricordi indelebili della vostra permanenza</p>
              </div>
            </div>

            <div className="pt-8">
              <Link 
                to="/bnb"
                className="inline-block px-8 py-3 bg-rustic-700 text-white font-medium hover:bg-rustic-800 transition-colors rounded-sm shadow-md uppercase tracking-wider text-sm"
              >
                Scopri le Camere
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Future;

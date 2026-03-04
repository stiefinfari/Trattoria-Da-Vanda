import { Leaf, UtensilsCrossed, Heart } from 'lucide-react';

const Mission = () => {
  return (
    <section id="missione" className="py-24 bg-stone-100 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-rustic-900 mb-4">
          La Nostra Missione
        </h2>
        <div className="w-24 h-1 bg-rustic-400 mx-auto mb-12"></div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border-t-4 border-rustic-500">
            <div className="flex justify-center mb-6 text-rustic-600">
              <UtensilsCrossed size={48} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-800 mb-3">Cultura Gastronomica</h3>
            <p className="text-stone-600 font-light leading-relaxed">
              Siamo determinati a mantenere viva la nostra cultura gastronomica, trasmettendo il nostro amore e la nostra passione attraverso ogni piatto servito.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border-t-4 border-rustic-500">
            <div className="flex justify-center mb-6 text-rustic-600">
              <Heart size={48} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-800 mb-3">Passione & Tradizione</h3>
            <p className="text-stone-600 font-light leading-relaxed">
              Vogliamo far rivivere e valorizzare la cucina tradizionale del Friuli per le generazioni future, con ricette tramandate da quattro generazioni.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border-t-4 border-rustic-500">
            <div className="flex justify-center mb-6 text-rustic-600">
              <Leaf size={48} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-800 mb-3">Ingredienti Locali</h3>
            <p className="text-stone-600 font-light leading-relaxed">
              Utilizziamo ingredienti locali di alta qualità per offrire esperienze gastronomiche che esaltino la ricca tradizione culinaria della regione.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;

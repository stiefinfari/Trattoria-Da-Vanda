import { Leaf, UtensilsCrossed, Heart } from 'lucide-react';

const Mission = () => {
  return (
    <section id="missione" className="py-24 bg-stone-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-rustic-500">
            I Valori della Trattoria
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-900">
            La nostra promessa a chi si siede a tavola
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-stone-200/70 px-6 py-8 md:px-8 md:py-10 shadow-sm hover:shadow-lg transition-shadow">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-rustic-50 p-4 text-rustic-600">
              <UtensilsCrossed size={32} strokeWidth={1.25} />
            </div>
            <h3 className="text-xl font-serif font-semibold text-stone-900 mb-3">
              Cultura gastronomica
            </h3>
            <p className="text-sm md:text-base text-stone-600 leading-relaxed">
              Ogni piatto nasce da ricette di famiglia e tecniche tramandate, per portare in tavola
              l&apos;autenticità della cucina friulana con un tocco contemporaneo.
            </p>
          </div>

          <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-stone-200/70 px-6 py-8 md:px-8 md:py-10 shadow-sm hover:shadow-lg transition-shadow">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-rustic-50 p-4 text-rustic-600">
              <Heart size={32} strokeWidth={1.25} />
            </div>
            <h3 className="text-xl font-serif font-semibold text-stone-900 mb-3">
              Accoglienza di famiglia
            </h3>
            <p className="text-sm md:text-base text-stone-600 leading-relaxed">
              Mettiamo al centro le persone, con un servizio attento e caloroso che fa sentire ogni
              ospite parte della nostra casa.
            </p>
          </div>

          <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-stone-200/70 px-6 py-8 md:px-8 md:py-10 shadow-sm hover:shadow-lg transition-shadow">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-rustic-50 p-4 text-rustic-600">
              <Leaf size={32} strokeWidth={1.25} />
            </div>
            <h3 className="text-xl font-serif font-semibold text-stone-900 mb-3">
              Ingredienti del territorio
            </h3>
            <p className="text-sm md:text-base text-stone-600 leading-relaxed">
              Lavoriamo con produttori locali e materie prime stagionali per esaltare l&apos;identità
              del Friuli e ridurre l&apos;impatto sul territorio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;

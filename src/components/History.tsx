
const History = () => {
  return (
    <section id="storia" className="py-20 md:py-32 bg-stone-50 relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Image */}
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute inset-0 bg-rustic-900 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 -z-10 rounded-sm"></div>
            <img 
              src="/images/177592604_4105853926133595_7338755891135402380_n.jpg" 
              alt="Interno rustico della Trattoria" 
              className="w-full h-auto object-cover rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left z-10">
            <div className="inline-block border-b-2 border-rustic-500 pb-1 mb-2">
              <span className="text-rustic-600 font-serif italic text-lg">Dal 1928</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
              La Nostra Storia
            </h2>
            <p className="text-stone-600 leading-relaxed font-light text-lg">
              Dal 1928, la nostra famiglia gestisce una storica trattoria a San Martino di Codroipo, offrendo l'autentica cucina friulana. Con quattro generazioni di esperienza, siamo un punto di riferimento nella comunità locale.
            </p>
            <p className="text-stone-600 leading-relaxed font-light text-lg">
              Oltre a offrire un'atmosfera accogliente e familiare, ci impegniamo a preservare le tradizioni e la cultura della regione. Siamo orgogliosi di essere parte integrante di San Martino di Codroipo e di essere un luogo di incontro e di convivialità per la comunità.
            </p>
            <p className="text-rustic-700 font-medium italic mt-4">
              "Vi invitiamo a scoprire la nostra storia e a condividere con noi l'amore per la cucina friulana."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;

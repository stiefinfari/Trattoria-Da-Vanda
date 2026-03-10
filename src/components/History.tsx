
const History = () => {
  return (
    <section id="storia" className="py-24 md:py-32 bg-stone-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-stone-200/60 px-6 py-10 md:px-12 md:py-14">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-rustic-900/70 to-rustic-600/60 translate-x-4 translate-y-4 -z-10" />
              <img
                src="/images/177592604_4105853926133595_7338755891135402380_n.jpg"
                alt="Interno della Trattoria da Vanda"
                className="w-full h-auto object-cover rounded-3xl shadow-2xl"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-3 border border-rustic-100 bg-rustic-50/70 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-rustic-500" />
                <span className="text-rustic-700 font-serif text-sm tracking-[0.25em] uppercase">
                  Dal 1928
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
                Una storia di famiglia nel cuore del Friuli
              </h2>
              <p className="text-stone-600 leading-relaxed text-base md:text-lg">
                Da quasi un secolo la nostra famiglia custodisce i sapori della cucina friulana,
                trasformando la Trattoria da Vanda in un luogo di incontro, memoria e convivialità
                a San Martino di Codroipo.
              </p>
              <p className="text-stone-600 leading-relaxed text-base md:text-lg">
                Tra ricette tramandate, ingredienti del territorio e un&apos;accoglienza autentica,
                continuiamo ogni giorno a servire piatti che raccontano la nostra terra e le persone
                che la vivono.
              </p>
              <p className="text-rustic-700 font-medium italic text-base md:text-lg">
                Vi aspettiamo per scrivere insieme il prossimo capitolo di questa storia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;

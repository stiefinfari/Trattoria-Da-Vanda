
const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/485347859_9649288278456771_7331598190390471549_n.jpg')",
          filter: "brightness(0.6)"
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 px-4 max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight drop-shadow-lg">
          Trattoria da Vanda
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wide italic text-rustic-100">
          Autentica cucina friulana a San Martino di Codroipo
        </p>
        <div className="h-1 w-24 bg-rustic-500 mx-auto mt-8 rounded-full"></div>
        <p className="text-sm md:text-base uppercase tracking-widest mt-4 text-rustic-200">
          Dal 1928
        </p>
        
        <div className="mt-12">
          <a 
            href="#storia" 
            className="inline-block px-8 py-3 border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all text-white font-medium tracking-wider uppercase text-sm rounded-sm"
          >
            Scopri la nostra storia
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;

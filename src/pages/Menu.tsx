import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock data based on Friulian tradition and typical Trattoria menu
// In a real scenario, this would come from a CMS or API
const menuCategories = [
  {
    id: 'antipasti',
    title: 'Antipasti',
    items: [
      { name: 'Tagliere di San Daniele', description: 'Prosciutto crudo di San Daniele DOP servito con grissini artigianali', price: '14€' },
      { name: 'Frico Friulano con Polenta', description: 'Tortino di formaggio e patate tipico friulano, servito con polenta abbrustolita', price: '12€' },
      { name: 'Crostini misti della Casa', description: 'Selezione di crostini con patè di fegatini, funghi e verdure di stagione', price: '10€' },
      { name: 'Sformato di Verdure', description: 'Sformato morbido con verdure di stagione e fonduta di Montasio', price: '11€' },
    ]
  },
  {
    id: 'primi',
    title: 'Primi Piatti',
    items: [
      { name: 'Cjarsons alla Carnica', description: 'Ravioli dolci e salati tipici della Carnia con burro fuso e ricotta affumicata', price: '14€' },
      { name: 'Tagliatelle al Ragù di Cinghiale', description: 'Pasta fresca all\'uovo con ragù di cinghiale a lenta cottura', price: '13€' },
      { name: 'Gnocchi di Patate fatti in casa', description: 'Con sugo d\'anatra o burro e salvia', price: '12€' },
      { name: 'Orzotto mantecato', description: 'Orzo perlato con verdure di stagione ed erbe aromatiche', price: '12€' },
    ]
  },
  {
    id: 'secondi',
    title: 'Secondi Piatti',
    items: [
      { name: 'Guanciale di Manzo brasato', description: 'Cotto a bassa temperatura nel Refosco, servito con purè di patate', price: '18€' },
      { name: 'Stinco di Maiale al forno', description: 'Servito con patate al forno e rosmarino', price: '16€' },
      { name: 'Filetto di Trota Salmonata', description: 'Alle mandorle con contorno di verdure al vapore', price: '17€' },
      { name: 'Grigliata mista di Carne', description: 'Selezione di carni alla brace (min. 2 persone)', price: '20€' },
    ]
  },
  {
    id: 'contorni',
    title: 'Contorni',
    items: [
      { name: 'Patate al Forno', description: 'Con rosmarino e sale grosso', price: '5€' },
      { name: 'Verdure Grigliate', description: 'Melanzane, zucchine e peperoni', price: '6€' },
      { name: 'Insalata Mista', description: 'Lattuga, pomodori, carote e finocchi', price: '5€' },
      { name: 'Fagioli all\'Uccelletto', description: 'Fagioli stufati con pomodoro e salvia', price: '6€' },
    ]
  },
  {
    id: 'dolci',
    title: 'Dolci',
    items: [
      { name: 'Tiramisù della Vanda', description: 'La ricetta classica con savoiardi, caffè e mascarpone', price: '6€' },
      { name: 'Strudel di Mele', description: 'Servito tiepido con salsa alla vaniglia', price: '6€' },
      { name: 'Panna Cotta', description: 'Ai frutti di bosco o caramello', price: '5€' },
      { name: 'Gubana con Slivovitz', description: 'Dolce tipico friulano bagnato con acquavite di prugne', price: '7€' },
    ]
  }
];

const businessMenu = {
  title: "Menù Business",
  description: "La nostra proposta di menù ad un prezzo fisso agevolato valido SOLO a pranzo dal Lunedì al Venerdì.",
  options: [
    { name: "Completo", price: "15€", details: "Primo, Secondo, Contorno" },
    { name: "Senza una portata", price: "14€", details: "Primo e Secondo oppure Secondo e Contorno" }, // Interpreted slightly, text says "Senza una portata"
    { name: "Solo piatto unico", price: "13€", details: "Solo primo, secondo o insalatone" },
  ],
  included: "50cl di acqua alla spina, 25cl di vino rosso o bianco della casa e 1 caffè.",
  note: "Porzioni abbondanti: + 1.00€. Il menù non è condivisibile."
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header Image */}
      <div className="relative h-[40vh] bg-stone-900 overflow-hidden">
        <img 
          src="/images/177592604_4105853926133595_7338755891135402380_n.jpg" 
          alt="Cucina Tradizionale" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white text-center"
          >
            Il Nostro Menù
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Category Navigation */}
        <div className="sticky top-20 z-40 bg-stone-50/95 backdrop-blur py-4 mb-12 border-b border-rustic-200 overflow-x-auto">
          <div className="flex justify-center space-x-4 md:space-x-8 min-w-max px-4">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className={`text-lg uppercase tracking-wider font-serif transition-colors ${
                  activeCategory === cat.id 
                    ? 'text-rustic-600 font-bold border-b-2 border-rustic-600' 
                    : 'text-stone-500 hover:text-rustic-500'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        <div className="max-w-4xl mx-auto space-y-20">
          {menuCategories.map((cat, idx) => (
            <motion.section 
              key={cat.id} 
              id={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-40"
            >
              <h2 className="text-3xl font-serif text-rustic-800 mb-8 text-center border-b border-rustic-200 pb-4 mx-auto w-1/3">
                {cat.title}
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {cat.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start p-4 hover:bg-white hover:shadow-md rounded-lg transition-all duration-300">
                    <div className="pr-4">
                      <h3 className="text-xl font-serif font-medium text-stone-800">{item.name}</h3>
                      <p className="text-stone-500 text-sm mt-1 italic">{item.description}</p>
                    </div>
                    <span className="text-lg font-bold text-rustic-700 whitespace-nowrap">{item.price}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Business Lunch Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 bg-stone-200 p-8 md:p-12 rounded-xl shadow-inner max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-stone-800 mb-4">{businessMenu.title}</h2>
            <p className="text-stone-600">{businessMenu.description}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {businessMenu.options.map((opt, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm text-center border border-stone-100">
                <h3 className="font-bold text-xl text-rustic-800 mb-2">{opt.price}</h3>
                <h4 className="font-serif text-lg mb-2">{opt.name}</h4>
                <p className="text-sm text-stone-500">{opt.details}</p>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-stone-600 border-t border-stone-300 pt-6">
            <p className="font-medium mb-2">{businessMenu.included}</p>
            <p className="italic opacity-75">{businessMenu.note}</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Menu;

import { motion } from 'framer-motion';
import { Wifi, Coffee, Wind, Bath, Clock, CheckCircle, Mail, Phone, Calendar, User } from 'lucide-react';
import { useState } from 'react';

const BnB = () => {
  const [showForm, setShowForm] = useState(false);

  const amenities = [
    { icon: <Wifi size={24} />, name: "Wi-Fi Gratuito" },
    { icon: <Wind size={24} />, name: "Aria Condizionata" },
    { icon: <Bath size={24} />, name: "Bagno Privato" },
    { icon: <Coffee size={24} />, name: "Colazione Inclusa" },
  ];

  const rooms = [
    {
      type: "Camera Singola",
      priceWithBreakfast: "65€",
      priceWithoutBreakfast: "60€",
      description: "Ideale per viaggiatori singoli, offre comfort e tranquillità con tutti i servizi essenziali.",
      image: "/images/177654852_4105854142800240_6970454504795988580_n.jpg"
    },
    {
      type: "Camera Doppia",
      priceWithBreakfast: "85€",
      priceWithoutBreakfast: "75€",
      description: "Spaziosa e accogliente, perfetta per coppie. Arredata con gusto e dotata di ogni comfort.",
      image: "/images/183909662_4145817605470560_3095392176152251348_n.jpg"
    }
  ];

  const scrollToForm = () => {
    const element = document.getElementById('booking-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setShowForm(true);
      setTimeout(() => {
        document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src="/images/194198091_4219854808066839_9151004493796416859_n.jpg" 
          alt="Locanda da Vanda" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Locanda da Vanda</h1>
            <p className="text-xl md:text-2xl font-light">
              Il comfort della modernità immerso nella tranquillità della campagna friulana.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-20">
        
        {/* Intro Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-3xl font-serif text-rustic-800 mb-6">Un Rifugio Sereno</h2>
          <p className="text-stone-600 leading-relaxed text-lg">
            Situati nel pittoresco paesaggio friulano, vi offriamo la tranquillità della campagna senza rinunciare al comfort. 
            La nostra locanda è pensata per coloro che cercano un rifugio sereno e un punto di partenza ideale per esplorare le bellezze della regione.
            Esplorate il comfort moderno nelle nostre camere appena rinnovate, dove il design contemporaneo incontra la funzionalità.
          </p>
          
          <div className="flex justify-center gap-8 mt-10">
            {amenities.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-rustic-700">
                <div className="bg-rustic-100 p-4 rounded-full mb-2">
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rooms Section */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
          {rooms.map((room, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-100"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.type} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif text-stone-800 mb-4">{room.type}</h3>
                <p className="text-stone-600 mb-6">{room.description}</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                    <span className="text-stone-500">Con Colazione</span>
                    <span className="text-xl font-bold text-rustic-700">{room.priceWithBreakfast}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                    <span className="text-stone-500">Senza Colazione</span>
                    <span className="text-xl font-bold text-stone-600">{room.priceWithoutBreakfast}</span>
                  </div>
                </div>

                <button 
                  onClick={scrollToForm}
                  className="w-full py-3 bg-rustic-800 text-white font-medium rounded hover:bg-rustic-900 transition-colors"
                >
                  Richiedi Disponibilità
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Request Form */}
        <div id="booking-form" className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg border border-stone-100 mb-20 scroll-mt-24">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif text-stone-800 mb-2">Richiedi Disponibilità Camere</h3>
            <p className="text-stone-500 text-sm">Compila il modulo e ti risponderemo al più presto con la nostra migliore offerta.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Richiesta inviata con successo!"); }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium text-sm">
                  <User size={16} /> Nome Completo
                </label>
                <input type="text" required className="w-full p-3 border border-stone-200 rounded-md bg-stone-50 focus:ring-2 focus:ring-rustic-500 outline-none" placeholder="Mario Rossi" />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium text-sm">
                  <Mail size={16} /> Email
                </label>
                <input type="email" required className="w-full p-3 border border-stone-200 rounded-md bg-stone-50 focus:ring-2 focus:ring-rustic-500 outline-none" placeholder="mario@example.com" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium text-sm">
                  <Calendar size={16} /> Check-in
                </label>
                <input type="date" required className="w-full p-3 border border-stone-200 rounded-md bg-stone-50 focus:ring-2 focus:ring-rustic-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium text-sm">
                  <Calendar size={16} /> Check-out
                </label>
                <input type="date" required className="w-full p-3 border border-stone-200 rounded-md bg-stone-50 focus:ring-2 focus:ring-rustic-500 outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-stone-700 font-medium text-sm">Messaggio o Richieste Speciali</label>
              <textarea rows={3} className="w-full p-3 border border-stone-200 rounded-md bg-stone-50 focus:ring-2 focus:ring-rustic-500 outline-none"></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-rustic-700 text-white font-serif font-bold uppercase tracking-wider rounded-md hover:bg-rustic-800 transition-colors shadow-md">
              Invia Richiesta
            </button>
          </form>
        </div>

        {/* Check-in Info */}
        <div className="bg-stone-200 rounded-xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-2xl font-serif text-stone-800 mb-6 flex items-center gap-3">
              <Clock className="text-rustic-700" /> Orari Check-in & Out
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-stone-700">Check-in</h4>
                <p className="text-stone-600">Lun - Mer: 12:00 - 15:00</p>
                <p className="text-stone-600">Gio - Dom: 12:00 - 15:00 / 18:00 - 23:00</p>
              </div>
              <div>
                <h4 className="font-bold text-stone-700">Check-out</h4>
                <p className="text-stone-600">Tutti i giorni entro le 11:00</p>
              </div>
            </div>
          </div>
          <div className="flex-1 border-l border-stone-300 pl-0 md:pl-8">
            <p className="text-stone-600 italic">
              "Per richieste di check-in/out fuori orario, si prega di contattarci via email o telefono. Faremo il possibile per accomodare le vostre esigenze."
            </p>
            <div className="mt-6">
              <button className="text-rustic-700 font-bold hover:underline">
                Contattaci per info
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BnB;

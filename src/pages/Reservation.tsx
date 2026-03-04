import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, Users, User, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

type ReservationFormData = {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const Reservation = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReservationFormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: ReservationFormData) => {
    console.log(data);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto items-start">
          
          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3 space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-6">Prenota il tuo Tavolo</h1>
              <p className="text-stone-600 leading-relaxed">
                Prenota un'esperienza culinaria autentica alla Trattoria da Vanda. 
                Per gruppi numerosi o eventi speciali, contattaci direttamente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
              <h3 className="font-serif text-xl mb-4 text-rustic-800">Orari di Apertura</h3>
              <ul className="space-y-2 text-stone-600">
                <li className="flex justify-between">
                  <span>Lunedì - Mercoledì</span>
                  <span>12:00 - 15:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Giovedì - Domenica</span>
                  <span className="text-right">12:00 - 15:00<br/>18:00 - 23:00</span>
                </li>
              </ul>
            </div>

            <div className="bg-rustic-50 p-6 rounded-lg border border-rustic-200">
              <h3 className="font-serif text-xl mb-4 text-rustic-800">Contatti Rapidi</h3>
              <div className="space-y-3 text-rustic-900">
                <p className="flex items-center gap-2"><Phone size={18} /> +39 0432 900000</p>
                <p className="flex items-center gap-2"><Mail size={18} /> info@trattoriadavanda.com</p>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-2/3 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-stone-100 w-full"
          >
            {isSubmitted ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-serif text-stone-800 mb-4">Prenotazione Ricevuta!</h3>
                <p className="text-stone-600 mb-8">Grazie per aver scelto Trattoria da Vanda.<br/>Ti abbiamo inviato una email di conferma.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 bg-rustic-600 text-white rounded-md hover:bg-rustic-700 transition-colors"
                >
                  Effettua un'altra prenotazione
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-stone-700 font-medium">
                      <Calendar size={18} /> Data
                    </label>
                    <input 
                      type="date" 
                      {...register("date", { required: "La data è obbligatoria" })}
                      className="w-full p-3 border border-stone-200 rounded-md focus:ring-2 focus:ring-rustic-500 focus:border-transparent outline-none bg-stone-50"
                    />
                    {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-stone-700 font-medium">
                      <Clock size={18} /> Ora
                    </label>
                    <select 
                      {...register("time", { required: "L'ora è obbligatoria" })}
                      className="w-full p-3 border border-stone-200 rounded-md focus:ring-2 focus:ring-rustic-500 focus:border-transparent outline-none bg-stone-50"
                    >
                      <option value="">Seleziona orario</option>
                      <optgroup label="Pranzo">
                        <option value="12:00">12:00</option>
                        <option value="12:30">12:30</option>
                        <option value="13:00">13:00</option>
                        <option value="13:30">13:30</option>
                        <option value="14:00">14:00</option>
                      </optgroup>
                      <optgroup label="Cena">
                        <option value="19:00">19:00</option>
                        <option value="19:30">19:30</option>
                        <option value="20:00">20:00</option>
                        <option value="20:30">20:30</option>
                        <option value="21:00">21:00</option>
                      </optgroup>
                    </select>
                    {errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-stone-700 font-medium">
                    <Users size={18} /> Numero Ospiti
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    max="20"
                    defaultValue={2}
                    {...register("guests", { required: "Il numero di ospiti è obbligatorio", min: 1 })}
                    className="w-full p-3 border border-stone-200 rounded-md focus:ring-2 focus:ring-rustic-500 focus:border-transparent outline-none bg-stone-50"
                  />
                  {errors.guests && <span className="text-red-500 text-sm">{errors.guests.message}</span>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-stone-700 font-medium">
                      <User size={18} /> Nome e Cognome
                    </label>
                    <input 
                      type="text" 
                      placeholder="Mario Rossi"
                      {...register("name", { required: "Il nome è obbligatorio" })}
                      className="w-full p-3 border border-stone-200 rounded-md focus:ring-2 focus:ring-rustic-500 focus:border-transparent outline-none bg-stone-50"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-stone-700 font-medium">
                      <Phone size={18} /> Telefono
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+39 333 1234567"
                      {...register("phone", { required: "Il telefono è obbligatorio" })}
                      className="w-full p-3 border border-stone-200 rounded-md focus:ring-2 focus:ring-rustic-500 focus:border-transparent outline-none bg-stone-50"
                    />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-stone-700 font-medium">
                    <Mail size={18} /> Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="mario.rossi@example.com"
                    {...register("email", { 
                      required: "L'email è obbligatoria",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Indirizzo email non valido"
                      }
                    })}
                    className="w-full p-3 border border-stone-200 rounded-md focus:ring-2 focus:ring-rustic-500 focus:border-transparent outline-none bg-stone-50"
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-stone-700 font-medium">
                    Note Speciali (Allergie, Richieste, ecc.)
                  </label>
                  <textarea 
                    rows={4}
                    {...register("notes")}
                    className="w-full p-3 border border-stone-200 rounded-md focus:ring-2 focus:ring-rustic-500 focus:border-transparent outline-none bg-stone-50"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-rustic-800 text-white font-serif text-lg rounded-md hover:bg-rustic-900 transition-colors shadow-md"
                >
                  Conferma Prenotazione
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;

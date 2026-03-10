import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, Mail, Phone, User, Users } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { FieldError, Input, Label, Textarea } from '../components/ui/Field';

type ReservationFormData = {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

function buildMailto({ to, subject, body }: { to: string; subject: string; body: string }) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}

function openHref(href: string) {
  window.location.href = href;
}

export default function Reservation() {
  const reduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReservationFormData>({
    defaultValues: { guests: 2, notes: '' },
    mode: 'onTouched',
  });

  const onSubmit = async (data: ReservationFormData) => {
    const body = [
      `Nome: ${data.name}`,
      `Email: ${data.email}`,
      `Telefono: ${data.phone}`,
      '',
      `Data: ${data.date}`,
      `Ora: ${data.time}`,
      `Ospiti: ${data.guests}`,
      '',
      data.notes?.trim() ? `Note:\n${data.notes.trim()}` : null,
      '',
      '—',
      'Richiesta inviata dal sito Trattoria da Vanda',
    ]
      .filter(Boolean)
      .join('\n');

    openHref(buildMailto({
      to: 'info@trattoriadavanda.com',
      subject: '[Tavolo] Richiesta prenotazione',
      body,
    }));
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="pt-24">
      <Section className="bg-stone-950 text-stone-50 py-16 sm:py-20">
        <Container>
          <Badge className="border-white/15 bg-white/5 text-white">Prenotazioni</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Prenota il tuo tavolo</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200">
            Per gruppi numerosi o occasioni speciali, contattaci direttamente: ti aiutiamo a costruire la soluzione
            perfetta.
          </p>
        </Container>
      </Section>

      <Section className="bg-stone-50">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.21, 0.75, 0.18, 1] }}
              className="lg:col-span-4"
            >
              <Card className="p-8">
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Orari</p>
                <div className="mt-4 space-y-2 text-sm text-stone-700">
                  <div className="flex justify-between gap-6">
                    <span>Lunedì - Martedì</span>
                    <span className="font-semibold">11:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span>Mercoledì</span>
                    <span className="font-semibold">Chiuso</span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span>Giovedì - Domenica</span>
                    <span className="text-right font-semibold">
                      11:00 - 14:00
                      <br />
                      18:00 - 21:00
                    </span>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Contatti</p>
                  <div className="mt-4 space-y-3 text-sm">
                    <a className="flex items-center gap-3 font-semibold text-stone-900 hover:text-brand-800" href="tel:+390432901234">
                      <Phone size={18} className="text-brand-700" /> +39 0432 901234
                    </a>
                    <a className="flex items-center gap-3 font-semibold text-stone-900 hover:text-brand-800" href="mailto:info@trattoriadavanda.com">
                      <Mail size={18} className="text-brand-700" /> info@trattoriadavanda.com
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.21, 0.75, 0.18, 1] }}
              className="lg:col-span-8"
            >
              <Card className="p-8 sm:p-10">
                {isSubmitted ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      ✓
                    </div>
                    <h2 className="mt-6 text-3xl font-semibold tracking-tight text-stone-950">Richiesta inviata</h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      Ti ricontatteremo a breve per conferma e dettagli.
                    </p>
                    <div className="mt-8 flex justify-center">
                      <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                        Effettua un’altra richiesta
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2">
                          <Calendar size={16} className="text-brand-700" /> Data
                        </Label>
                        <Input id="date" type="date" min={minDate} {...register('date', { required: 'La data è obbligatoria' })} />
                        {errors.date?.message && <FieldError>{errors.date.message}</FieldError>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time" className="flex items-center gap-2">
                          <Clock size={16} className="text-brand-700" /> Ora
                        </Label>
                        <select
                          id="time"
                          {...register('time', { required: "L'ora è obbligatoria" })}
                          className="w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 shadow-sm focus:border-brand-300 focus:ring-2 focus:ring-brand-200"
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
                        {errors.time?.message && <FieldError>{errors.time.message}</FieldError>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests" className="flex items-center gap-2">
                        <Users size={16} className="text-brand-700" /> Numero ospiti
                      </Label>
                      <Input
                        id="guests"
                        type="number"
                        min={1}
                        max={20}
                        {...register('guests', {
                          required: 'Il numero di ospiti è obbligatorio',
                          valueAsNumber: true,
                          min: { value: 1, message: 'Minimo 1 ospite' },
                        })}
                      />
                      {errors.guests?.message && <FieldError>{errors.guests.message}</FieldError>}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User size={16} className="text-brand-700" /> Nome e cognome
                        </Label>
                        <Input id="name" placeholder="Mario Rossi" {...register('name', { required: 'Il nome è obbligatorio' })} />
                        {errors.name?.message && <FieldError>{errors.name.message}</FieldError>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone size={16} className="text-brand-700" /> Telefono
                        </Label>
                        <Input id="phone" type="tel" placeholder="+39 333 1234567" {...register('phone', { required: 'Il telefono è obbligatorio' })} />
                        {errors.phone?.message && <FieldError>{errors.phone.message}</FieldError>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail size={16} className="text-brand-700" /> Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="mario.rossi@example.com"
                        {...register('email', {
                          required: "L'email è obbligatoria",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Indirizzo email non valido',
                          },
                        })}
                      />
                      {errors.email?.message && <FieldError>{errors.email.message}</FieldError>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Note (allergie, richieste, ecc.)</Label>
                      <Textarea id="notes" rows={4} {...register('notes')} />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Invio…' : 'Invia richiesta'}
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

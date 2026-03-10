import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, useReducedMotion } from 'framer-motion';
import { Bath, Calendar, Coffee, Mail, Phone, User, Wifi, Wind } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { FieldError, Input, Label, Textarea } from '../components/ui/Field';

type BookingRequest = {
  name: string;
  email: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  message: string;
};

function buildMailto({ to, subject, body }: { to: string; subject: string; body: string }) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}

function openHref(href: string) {
  window.location.href = href;
}

type BnbImage = { src: string; alt: string };

const bnbImages: BnbImage[] = [
  { src: '/images/bnb/bnb-03.jpg', alt: 'Locanda da Vanda – camere e interni (foto 1)' },
  { src: '/images/bnb/bnb-04.jpg', alt: 'Locanda da Vanda – camere e interni (foto 2)' },
  { src: '/images/bnb/bnb-06.jpg', alt: 'Locanda da Vanda – camere e interni (foto 3)' },
  { src: '/images/bnb/bnb-07.jpg', alt: 'Locanda da Vanda – camere e interni (foto 4)' },
  { src: '/images/bnb/bnb-08.jpg', alt: 'Locanda da Vanda – camere e interni (foto 5)' },
  { src: '/images/bnb/bnb-09.jpg', alt: 'Locanda da Vanda – camere e interni (foto 6)' },
  { src: '/images/bnb/bnb-10.jpg', alt: 'Locanda da Vanda – camere e interni (foto 7)' },
  { src: '/images/bnb/bnb-11.jpg', alt: 'Locanda da Vanda – camere e interni (foto 8)' },
  { src: '/images/bnb/bnb-12.jpg', alt: 'Locanda da Vanda – camere e interni (foto 9)' },
  { src: '/images/bnb/bnb-13.jpg', alt: 'Locanda da Vanda – camere e interni (foto 10)' },
  { src: '/images/bnb/bnb-14.jpg', alt: 'Locanda da Vanda – camere e interni (foto 11)' },
];

export default function BnB() {
  const reduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [checkInValue, setCheckInValue] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingRequest>({
    defaultValues: { message: '' },
    mode: 'onTouched',
  });

  const amenities = [
    { icon: <Wifi size={18} />, name: 'Wi‑Fi gratuito' },
    { icon: <Wind size={18} />, name: 'Aria condizionata' },
    { icon: <Bath size={18} />, name: 'Bagno privato' },
    { icon: <Coffee size={18} />, name: 'Colazione inclusa' },
  ] as const;

  const roomCards = [
    { title: 'Camera singola', prices: [{ label: 'Con colazione', value: '65 €' }, { label: 'Senza colazione', value: '60 €' }] },
    { title: 'Camera doppia', prices: [{ label: 'Con colazione', value: '85 €' }, { label: 'Senza colazione', value: '75 €' }] },
  ] as const;

  const onSubmit = async (data: BookingRequest) => {
    const body = [
      `Nome: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Telefono: ${data.phone}` : null,
      `Check-in: ${data.checkIn}`,
      `Check-out: ${data.checkOut}`,
      '',
      data.message?.trim() ? `Messaggio:\n${data.message.trim()}` : null,
      '',
      '—',
      'Richiesta inviata dal sito Trattoria da Vanda',
    ]
      .filter(Boolean)
      .join('\n');

    openHref(buildMailto({
      to: 'info@trattoriadavanda.com',
      subject: '[B&B] Richiesta disponibilità camere',
      body,
    }));
    setIsSubmitted(true);
    reset();
    setCheckInValue('');
  };

  return (
    <div className="pt-24">
      <Section className="bg-stone-950 text-stone-50 py-16 sm:py-20">
        <Container>
          <Badge className="border-white/15 bg-white/5 text-white">Locanda</Badge>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                Locanda da Vanda
              </motion.h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200">
                Camere confortevoli e luminose, pensate per chi viaggia per lavoro o per piacere, immerse nella quiete
                friulana.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {amenities.map((a) => (
                  <span
                    key={a.name}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-base font-semibold tracking-[0.24em] uppercase text-stone-100 md:text-[11px]"
                  >
                    <span className="text-brand-200">{a.icon}</span>
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-elevated">
                <img
                  src={bnbImages[0].src}
                  alt={bnbImages[0].alt}
                  className="w-full object-cover aspect-[16/10] opacity-95"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-stone-50">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 space-y-10">
              <div>
                <Badge>Camere</Badge>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                  Un rifugio sereno, sopra la nostra antica trattoria
                </h2>
                <p className="mt-4 text-base leading-relaxed text-stone-600">
                  Design essenziale, comfort moderno e dettagli curati: un luogo dove rallentare e riposare.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {bnbImages.map((img) => (
                  <div key={img.src} className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full object-cover aspect-square"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {roomCards.map((room) => (
                  <Card key={room.title} className="p-8">
                    <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Tariffe</p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-stone-950">{room.title}</h3>
                    <div className="mt-6 space-y-3">
                      {room.prices.map((p) => (
                        <div key={p.label} className="flex items-center justify-between gap-6">
                          <span className="text-sm text-stone-700">{p.label}</span>
                          <span className="text-sm font-semibold text-brand-800 tabular-nums">{p.value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="p-8 sm:p-10" id="booking-form">
                <Badge>Richiesta</Badge>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950">Disponibilità camere</h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  Invia una richiesta e ti risponderemo al più presto con disponibilità e migliore offerta.
                </p>

                {isSubmitted ? (
                  <div className="mt-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      ✓
                    </div>
                    <p className="mt-6 text-base font-semibold text-stone-950">Richiesta inviata</p>
                    <p className="mt-2 text-sm text-stone-600">Ti ricontatteremo a breve.</p>
                    <div className="mt-8">
                      <Button variant="outline" onClick={() => { setIsSubmitted(false); setCheckInValue(''); }}>
                        Invia un’altra richiesta
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="b-name" className="flex items-center gap-2">
                        <User size={16} className="text-brand-700" /> Nome completo
                      </Label>
                      <Input id="b-name" placeholder="Mario Rossi" {...register('name', { required: 'Il nome è obbligatorio' })} />
                      {errors.name?.message && <FieldError>{errors.name.message}</FieldError>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="b-email" className="flex items-center gap-2">
                        <Mail size={16} className="text-brand-700" /> Email
                      </Label>
                      <Input
                        id="b-email"
                        type="email"
                        placeholder="mario@example.com"
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
                      <Label htmlFor="b-phone" className="flex items-center gap-2">
                        <Phone size={16} className="text-brand-700" /> Telefono (opzionale)
                      </Label>
                      <Input id="b-phone" type="tel" placeholder="+39 333 1234567" {...register('phone')} />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="b-checkin" className="flex items-center gap-2">
                          <Calendar size={16} className="text-brand-700" /> Check-in
                        </Label>
                        <Input
                          id="b-checkin"
                          type="date"
                          min={minDate}
                          {...register('checkIn', {
                            required: 'Seleziona una data di check-in',
                            onChange: (e) => setCheckInValue((e.target as HTMLInputElement).value),
                          })}
                        />
                        {errors.checkIn?.message && <FieldError>{errors.checkIn.message}</FieldError>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="b-checkout" className="flex items-center gap-2">
                          <Calendar size={16} className="text-brand-700" /> Check-out
                        </Label>
                        <Input
                          id="b-checkout"
                          type="date"
                          min={checkInValue || minDate}
                          {...register('checkOut', {
                            required: 'Seleziona una data di check-out',
                            validate: (value) => {
                              if (!checkInValue) return true;
                              return value > checkInValue || 'La data di check-out deve essere successiva al check-in';
                            },
                          })}
                        />
                        {errors.checkOut?.message && <FieldError>{errors.checkOut.message}</FieldError>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="b-message">Messaggio</Label>
                      <Textarea id="b-message" rows={4} placeholder="Richieste speciali, orari, note…" {...register('message')} />
                    </div>

                    <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? 'Invio…' : 'Invia richiesta'}
                    </Button>
                  </form>
                )}

                <div className="mt-10 rounded-3xl border border-stone-200 bg-white/60 p-6">
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Contatto diretto</p>
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
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, User, MessageSquareText, BadgeInfo } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { FieldError, Input, Label, Textarea } from '../components/ui/Field';

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
  website?: string;
};

function buildMailto({ to, subject, body }: { to: string; subject: string; body: string }) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}

function openHref(href: string) {
  window.location.href = href;
}

export default function Contatti() {
  const reduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: { subject: 'Richiesta informazioni', message: '', consent: true },
    mode: 'onTouched',
  });

  const mapSrc = useMemo(
    () => 'https://www.google.com/maps?q=Trattoria%20da%20Vanda%20San%20Martino%20di%20Codroipo&output=embed',
    []
  );

  const onSubmit = async (data: ContactFormData) => {
    if (data.website?.trim()) return;

    const body = [
      `Nome: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Telefono: ${data.phone}` : null,
      '',
      data.message.trim(),
      '',
      '—',
      'Inviato dal sito Trattoria da Vanda',
    ]
      .filter(Boolean)
      .join('\n');

    const mailto = buildMailto({
      to: 'info@trattoriadavanda.com',
      subject: `[Sito] ${data.subject}`,
      body,
    });

    openHref(mailto);
    setIsSubmitted(true);
    reset({ subject: 'Richiesta informazioni', message: '', consent: true });
  };

  return (
    <div className="pt-24">
      <Section className="bg-stone-950 py-16 text-stone-50 sm:py-20">
        <Container>
          <Badge className="border-white/15 bg-white/5 text-white">Contatti</Badge>
          <motion.h1
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Scrivici o vieni a trovarci
          </motion.h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200">
            Informazioni, eventi, locanda e richieste speciali: rispondiamo il prima possibile.
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
              className="lg:col-span-5 space-y-6"
            >
              <Card className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Recapiti</p>
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 flex-shrink-0 text-brand-700" />
                    <div>
                      <p className="font-semibold text-stone-900">Via Erminia, 9</p>
                      <p className="text-stone-600">San Martino di Codroipo • 33033 (UD)</p>
                    </div>
                  </div>
                  <a className="flex items-center gap-3 font-semibold text-stone-900 hover:text-brand-800" href="tel:+390432901234">
                    <Phone size={18} className="text-brand-700" /> +39 0432 901234
                  </a>
                  <a className="flex items-center gap-3 font-semibold text-stone-900 hover:text-brand-800" href="mailto:info@trattoriadavanda.com">
                    <Mail size={18} className="text-brand-700" /> info@trattoriadavanda.com
                  </a>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Trattoria%20da%20Vanda%20San%20Martino%20di%20Codroipo"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white/70 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-800 transition-colors hover:bg-stone-50"
                  >
                    Apri su Maps
                  </a>
                  <a
                    href="https://wa.me/390432901234"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-50 transition-colors hover:bg-stone-800"
                  >
                    WhatsApp
                  </a>
                </div>
              </Card>

              <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">
                <iframe
                  title="Mappa Trattoria da Vanda"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[420px] w-full"
                  src={mapSrc}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.21, 0.75, 0.18, 1] }}
              className="lg:col-span-7"
            >
              <Card className="p-8 sm:p-10">
                <Badge>Modulo</Badge>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950">Invia un messaggio</h2>
                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  Per richieste urgenti, chiama direttamente. Il modulo apre una bozza email pronta per l’invio.
                </p>

                {isSubmitted ? (
                  <div className="mt-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                      ✓
                    </div>
                    <p className="mt-6 text-base font-semibold text-stone-950">Bozza email pronta</p>
                    <p className="mt-2 text-sm text-stone-600">Se non si è aperta, riprova o scrivi a info@trattoriadavanda.com.</p>
                    <div className="mt-8">
                      <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                        Invia un altro messaggio
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="c-name" className="flex items-center gap-2">
                          <User size={16} className="text-brand-700" /> Nome e cognome
                        </Label>
                        <Input id="c-name" placeholder="Mario Rossi" {...register('name', { required: 'Il nome è obbligatorio' })} />
                        {errors.name?.message && <FieldError>{errors.name.message}</FieldError>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="c-email" className="flex items-center gap-2">
                          <Mail size={16} className="text-brand-700" /> Email
                        </Label>
                        <Input
                          id="c-email"
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
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="c-phone" className="flex items-center gap-2">
                          <Phone size={16} className="text-brand-700" /> Telefono (opzionale)
                        </Label>
                        <Input id="c-phone" type="tel" placeholder="+39 333 1234567" {...register('phone')} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="c-subject" className="flex items-center gap-2">
                          <BadgeInfo size={16} className="text-brand-700" /> Oggetto
                        </Label>
                        <Input
                          id="c-subject"
                          {...register('subject', {
                            required: "L'oggetto è obbligatorio",
                            minLength: { value: 3, message: 'Inserisci un oggetto più descrittivo' },
                          })}
                        />
                        {errors.subject?.message && <FieldError>{errors.subject.message}</FieldError>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="c-message" className="flex items-center gap-2">
                        <MessageSquareText size={16} className="text-brand-700" /> Messaggio
                      </Label>
                      <Textarea
                        id="c-message"
                        rows={6}
                        placeholder="Scrivi qui la tua richiesta…"
                        {...register('message', {
                          required: 'Il messaggio è obbligatorio',
                          minLength: { value: 10, message: 'Inserisci almeno 10 caratteri' },
                        })}
                      />
                      {errors.message?.message && <FieldError>{errors.message.message}</FieldError>}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 rounded-3xl border border-stone-200 bg-white/70 p-5">
                        <input
                          id="c-consent"
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-stone-300 text-brand-700 focus:ring-brand-200"
                          {...register('consent', { required: 'Conferma per inviare la richiesta' })}
                        />
                        <div className="text-sm">
                          <Label htmlFor="c-consent" className="font-semibold text-stone-900">
                            Consenso al trattamento dei dati
                          </Label>
                          <p className="mt-1 text-xs leading-relaxed text-stone-600">
                            Utilizziamo i dati solo per rispondere alla richiesta. Maggiori dettagli in Privacy Policy.
                          </p>
                          {errors.consent?.message && <FieldError>{errors.consent.message}</FieldError>}
                        </div>
                      </div>

                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden="true"
                        {...register('website')}
                      />
                    </div>

                    <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? 'Preparazione…' : (
                        <span className="inline-flex items-center justify-center gap-2">
                          <Send size={16} /> Invia
                        </span>
                      )}
                    </Button>
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

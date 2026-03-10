import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function Privacy() {
  return (
    <div className="pt-24">
      <Section className="bg-stone-950 text-stone-50 py-16 sm:py-20">
        <Container>
          <Badge className="border-white/15 bg-white/5 text-white">Informativa</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200">
            Informazioni su trattamento dei dati personali, contatti e modalità di esercizio dei diritti.
          </p>
        </Container>
      </Section>

      <Section className="bg-stone-50">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="p-8 lg:col-span-8">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Titolare del trattamento</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                Trattoria da Vanda Snc • Via Erminia, 9 • San Martino di Codroipo (UD) • Email:{' '}
                <a className="font-semibold text-brand-800 hover:text-brand-900" href="mailto:info@trattoriadavanda.com">
                  info@trattoriadavanda.com
                </a>
              </p>

              <h2 className="mt-10 text-2xl font-semibold tracking-tight text-stone-950">Dati trattati</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                Possiamo trattare dati identificativi e di contatto (nome, email, telefono) e contenuti inviati tramite
                moduli o richieste (es. note per prenotazioni). I dati sono utilizzati per rispondere alle richieste,
                gestire prenotazioni e fornire informazioni su servizi ed eventi.
              </p>

              <h2 className="mt-10 text-2xl font-semibold tracking-tight text-stone-950">Base giuridica</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                Il trattamento avviene per esecuzione di misure precontrattuali/contrattuali (gestione richiesta o
                prenotazione), adempimento di obblighi legali e, ove applicabile, legittimo interesse a tutela del
                servizio e della sicurezza.
              </p>

              <h2 className="mt-10 text-2xl font-semibold tracking-tight text-stone-950">Conservazione</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                I dati vengono conservati per il tempo necessario alle finalità indicate e, se richiesto, per periodi
                ulteriori previsti dalla normativa fiscale/amministrativa.
              </p>

              <h2 className="mt-10 text-2xl font-semibold tracking-tight text-stone-950">Diritti dell’interessato</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                Puoi esercitare i diritti previsti dagli artt. 15–22 GDPR (accesso, rettifica, cancellazione,
                limitazione, opposizione, portabilità) scrivendo a{' '}
                <a className="font-semibold text-brand-800 hover:text-brand-900" href="mailto:info@trattoriadavanda.com">
                  info@trattoriadavanda.com
                </a>
                .
              </p>
            </Card>

            <Card className="p-8 lg:col-span-4 h-fit">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Trasparenza</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">
                Questa informativa può essere aggiornata per adeguamenti normativi o variazioni dei servizi. Ti
                invitiamo a consultarla periodicamente.
              </p>
              <p className="mt-6 text-xs text-stone-500">Ultimo aggiornamento: 10/03/2026</p>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}

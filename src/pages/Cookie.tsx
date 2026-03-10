import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function Cookie() {
  return (
    <div className="pt-24">
      <Section className="bg-stone-950 text-stone-50 py-16 sm:py-20">
        <Container>
          <Badge className="border-white/15 bg-white/5 text-white">Informativa</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Cookie Policy</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200">
            Informazioni essenziali sull’uso di cookie e tecnologie similari.
          </p>
        </Container>
      </Section>

      <Section className="bg-stone-50">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="p-8 lg:col-span-8">
              <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Cosa sono i cookie</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                I cookie sono piccoli file di testo che i siti possono salvare nel browser per migliorare esperienza,
                funzionalità e misurazioni. Alcune risorse esterne (es. mappe) possono utilizzare cookie propri.
              </p>

              <h2 className="mt-10 text-2xl font-semibold tracking-tight text-stone-950">Tipologie</h2>
              <div className="mt-4 grid gap-4">
                <div className="rounded-3xl border border-stone-200 bg-white/70 p-6">
                  <p className="text-sm font-semibold text-stone-900">Tecnici</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">
                    Necessari al funzionamento e alla sicurezza. Non richiedono consenso.
                  </p>
                </div>
                <div className="rounded-3xl border border-stone-200 bg-white/70 p-6">
                  <p className="text-sm font-semibold text-stone-900">Funzionali / Preferenze</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">
                    Migliorano l’esperienza (es. memorizzazione preferenze). Possono richiedere consenso in base alla
                    configurazione.
                  </p>
                </div>
                <div className="rounded-3xl border border-stone-200 bg-white/70 p-6">
                  <p className="text-sm font-semibold text-stone-900">Terze parti</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">
                    Servizi integrati come Google Maps o social possono impostare cookie secondo le proprie policy.
                  </p>
                </div>
              </div>

              <h2 className="mt-10 text-2xl font-semibold tracking-tight text-stone-950">Gestione nel browser</h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                Puoi gestire, limitare o eliminare i cookie dalle impostazioni del browser. La disabilitazione di
                alcuni cookie può influire su funzionalità e fruizione.
              </p>
            </Card>

            <Card className="p-8 lg:col-span-4 h-fit">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Contatti</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">
                Per informazioni su privacy e cookie scrivi a{' '}
                <a className="font-semibold text-brand-800 hover:text-brand-900" href="mailto:info@trattoriadavanda.com">
                  info@trattoriadavanda.com
                </a>
                .
              </p>
              <p className="mt-6 text-xs text-stone-500">Ultimo aggiornamento: 10/03/2026</p>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}

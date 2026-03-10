import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Input, Label, Textarea } from '../components/ui/Field';

const swatches = [
  { name: 'brand-50', className: 'bg-brand-50', text: 'text-stone-950' },
  { name: 'brand-200', className: 'bg-brand-200', text: 'text-stone-950' },
  { name: 'brand-400', className: 'bg-brand-400', text: 'text-stone-950' },
  { name: 'brand-600', className: 'bg-brand-600', text: 'text-white' },
  { name: 'brand-800', className: 'bg-brand-800', text: 'text-white' },
  { name: 'brand-950', className: 'bg-brand-950', text: 'text-white' },
  { name: 'sage-100', className: 'bg-sage-100', text: 'text-stone-950' },
  { name: 'sage-500', className: 'bg-sage-500', text: 'text-white' },
  { name: 'stone-50', className: 'bg-stone-50', text: 'text-stone-950' },
  { name: 'stone-900', className: 'bg-stone-900', text: 'text-white' },
] as const;

export default function StyleGuide() {
  return (
    <div className="pt-24">
      <Section className="bg-stone-950 text-stone-50 py-16 sm:py-20">
        <Container>
          <Badge className="border-white/15 bg-white/5 text-white">Design System</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Style Guide</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200">
            Palette, tipografia, spaziature e componenti riutilizzabili utilizzati nel sito.
          </p>
        </Container>
      </Section>

      <Section className="bg-stone-50">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="p-8 lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Tipografia</p>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-xs text-stone-500">Display</p>
                  <p className="mt-2 font-serif text-5xl tracking-tight text-stone-950">Trattoria da Vanda</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500">Heading</p>
                  <p className="mt-2 font-serif text-3xl font-semibold tracking-tight text-stone-950">
                    Tradizione e cura dei dettagli
                  </p>
                </div>
                <div>
                  <p className="text-xs text-stone-500">Body</p>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-stone-700">
                    Un testo leggibile, con spaziature uniformi, pensato per mobile e desktop. Contrasto elevato e
                    ritmo tipografico costante.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Palette</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {swatches.map((s) => (
                  <div key={s.name} className={`rounded-3xl border border-stone-200 p-4 ${s.className} ${s.text}`}>
                    <p className="text-xs font-semibold tracking-[0.3em] uppercase">{s.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <Card className="p-8 lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Buttons</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </Card>

            <Card className="p-8 lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-500">Form</p>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sg-name">Nome</Label>
                  <Input id="sg-name" placeholder="Mario Rossi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sg-message">Messaggio</Label>
                  <Textarea id="sg-message" rows={4} placeholder="Scrivi qui..." />
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, MessageSquareText, Send } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { FieldError, Input, Label, Textarea } from '../components/ui/Field';
import { blogPosts, type BlogPost as BlogPostType } from './blogData';

type Comment = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

type CommentForm = {
  name: string;
  message: string;
  website?: string;
};

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function formatDateLong(date: string) {
  return new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date));
}

function setMetaBySelector(selector: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
}

function nowMs() {
  return Date.now();
}

export default function BlogPostRoute() {
  const { slug } = useParams();
  return <BlogPost slug={slug} key={slug} />;
}

function BlogPost({ slug }: { slug?: string }) {
  const reduceMotion = useReducedMotion();

  const post = useMemo<BlogPostType | undefined>(() => blogPosts.find((p) => p.slug === slug), [slug]);

  const storageKey = useMemo(() => (slug ? `davanda:comments:v1:${slug}` : 'davanda:comments:v1:unknown'), [slug]);
  const rateKey = useMemo(() => (slug ? `davanda:comments:last:v1:${slug}` : 'davanda:comments:last:v1:unknown'), [slug]);

  const [comments, setComments] = useState<Comment[]>(() => safeJsonParse<Comment[]>(localStorage.getItem(storageKey)) ?? []);

  useEffect(() => {
    if (!post) return;
    const title = `${post.title} | Trattoria da Vanda`;
    document.title = title;
    setMetaBySelector('meta[name="description"]', post.excerpt);
    setMetaBySelector('meta[property="og:title"]', title);
    setMetaBySelector('meta[property="og:description"]', post.excerpt);
    setMetaBySelector('meta[name="twitter:title"]', title);
    setMetaBySelector('meta[name="twitter:description"]', post.excerpt);
  }, [post]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentForm>({ defaultValues: { name: '', message: '' }, mode: 'onTouched' });

  const onSubmit = async (data: CommentForm) => {
    if (data.website?.trim()) return;

    const now = nowMs();
    const last = Number(localStorage.getItem(rateKey) ?? 0);
    if (last && now - last < 25_000) {
      setError('message', { type: 'validate', message: 'Attendi qualche secondo prima di inviare un altro commento.' });
      return;
    }

    const comment: Comment = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      message: data.message.trim(),
      createdAt: new Date().toISOString(),
    };

    const next = [comment, ...comments];
    setComments(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    localStorage.setItem(rateKey, String(now));
    reset({ name: '', message: '' });
  };

  if (!post) {
    return (
      <div className="pt-24">
        <Section className="bg-stone-50">
          <Container>
            <Card className="p-10 text-center">
              <p className="text-base text-stone-700">Articolo non trovato.</p>
              <div className="mt-6 flex justify-center">
                <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-800 hover:text-brand-900">
                  <ArrowLeft size={14} /> Torna al blog
                </Link>
              </div>
            </Card>
          </Container>
        </Section>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <Section className="bg-stone-950 py-16 text-stone-50 sm:py-20">
        <Container>
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Badge className="border-white/15 bg-white/5 text-white">{post.category}</Badge>
              <motion.h1
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                {post.title}
              </motion.h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-200">{post.excerpt}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-stone-300">
                <span className="flex items-center gap-2">
                  <Calendar size={14} /> {formatDateLong(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <User size={14} /> {post.author}
                </span>
              </div>

              <div className="mt-10">
                <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-200 hover:text-white">
                  <ArrowLeft size={14} /> Archivio blog
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-elevated">
                <img
                  src={post.image}
                  alt={post.title}
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
            <div className="lg:col-span-8">
              <Card className="p-8 sm:p-10">
                <div className="space-y-6">
                  {post.content.map((block, idx) => {
                    if (block.type === 'h2') {
                      return (
                        <h2 key={`${block.type}-${idx}`} className="text-2xl font-semibold tracking-tight text-stone-950">
                          {block.text}
                        </h2>
                      );
                    }
                    if (block.type === 'ul') {
                      return (
                        <ul key={`${block.type}-${idx}`} className="space-y-2 text-sm text-stone-700">
                          {block.items.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-700" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={`${block.type}-${idx}`} className="text-sm leading-relaxed text-stone-700">
                        {block.text}
                      </p>
                    );
                  })}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-stone-200 pt-6">
                  <Tag size={16} className="text-brand-700" aria-hidden="true" />
                  {post.tags.map((t) => (
                    <span key={t} className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-semibold text-stone-700">
                      #{t}
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="mt-6 p-8 sm:p-10" id="commenti">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Commenti</p>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-stone-950">Lascia un commento</h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
                      I commenti sono salvati sul dispositivo (non pubblici). Perfetti per note personali o feedback rapido.
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 text-xs text-stone-500 sm:flex">
                    <MessageSquareText size={16} /> <span className="tabular-nums">{comments.length}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cm-name">Nome</Label>
                      <Input
                        id="cm-name"
                        placeholder="Mario"
                        {...register('name', {
                          required: 'Il nome è obbligatorio',
                          minLength: { value: 2, message: 'Inserisci almeno 2 caratteri' },
                        })}
                      />
                      {errors.name?.message && <FieldError>{errors.name.message}</FieldError>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cm-message">Commento</Label>
                    <Textarea
                      id="cm-message"
                      rows={5}
                      placeholder="Scrivi qui…"
                      {...register('message', {
                        required: 'Il commento è obbligatorio',
                        minLength: { value: 5, message: 'Inserisci almeno 5 caratteri' },
                        maxLength: { value: 1400, message: 'Massimo 1400 caratteri' },
                      })}
                    />
                    {errors.message?.message && <FieldError>{errors.message.message}</FieldError>}
                  </div>

                  <input tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register('website')} />

                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Invio…' : (
                      <span className="inline-flex items-center gap-2">
                        <Send size={16} /> Pubblica
                      </span>
                    )}
                  </Button>
                </form>

                {comments.length > 0 && (
                  <div className="mt-10 space-y-4">
                    {comments.map((c) => (
                      <div key={c.id} className="rounded-3xl border border-stone-200 bg-white/70 p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-stone-900">{c.name}</p>
                          <p className="text-xs text-stone-500">
                            {new Intl.DateTimeFormat('it-IT', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }).format(new Date(c.createdAt))}
                          </p>
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{c.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <Card className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Navigazione</p>
                <div className="mt-5 space-y-3">
                  <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-brand-800">
                    <ArrowLeft size={16} /> Torna al blog
                  </Link>
                  <a
                    href="#commenti"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-brand-800"
                  >
                    <MessageSquareText size={16} /> Vai ai commenti
                  </a>
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}

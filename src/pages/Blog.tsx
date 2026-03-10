import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Input } from '../components/ui/Field';
import { blogCategories, blogPosts } from './blogData';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<(typeof blogCategories)[number]>('Tutti');
  const [activeArchive, setActiveArchive] = useState<string>('Tutti');
  const [searchQuery, setSearchQuery] = useState('');

  const archiveItems = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric' });
    const map = new Map<string, { key: string; label: string; count: number; sortKey: string }>();
    for (const post of blogPosts) {
      const d = new Date(post.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = formatter.format(d);
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(key, { key, label, count: 1, sortKey: key });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.sortKey.localeCompare(a.sortKey));
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'Tutti' || post.category === activeCategory;
      const matchesSearch = !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
      const matchesArchive =
        activeArchive === 'Tutti' ||
        (() => {
          const d = new Date(post.date);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          return key === activeArchive;
        })();
      return matchesCategory && matchesSearch && matchesArchive;
    });
  }, [activeArchive, activeCategory, searchQuery]);

  const formatDate = useMemo(() => new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'short', year: 'numeric' }), []);

  return (
    <div className="pt-24">
      <Section className="bg-stone-950 text-stone-50 py-16 sm:py-20">
        <Container>
          <Badge className="border-white/15 bg-white/5 text-white">Blog</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Blog & Eventi</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-200">
            Novità, ricette e appuntamenti: il nostro diario di cucina e convivialità.
          </p>
        </Container>
      </Section>

      <Section className="bg-stone-50">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 space-y-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                {blogCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={[
                      'rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all',
                      activeCategory === cat
                        ? 'border-brand-700 bg-brand-700 text-white shadow-soft'
                        : 'border-stone-200 bg-white/70 text-stone-700 hover:bg-stone-50',
                    ].join(' ')}
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <Input
                  type="text"
                  placeholder="Cerca articoli…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <div className="grid gap-6 md:grid-cols-2">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="h-full"
                  >
                    <Card className="h-full overflow-hidden">
                      <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col">
                        <div className="relative overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-56 w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-stone-950/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                            {post.category}
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} /> {formatDate.format(new Date(post.date))}
                            </span>
                            <span className="flex items-center gap-1">
                              <User size={14} /> {post.author}
                            </span>
                          </div>

                          <h2 className="mt-4 text-xl font-semibold tracking-tight text-stone-950 transition-colors group-hover:text-brand-800">
                            {post.title}
                          </h2>

                          <p className="mt-3 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>

                          <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                            <div className="flex gap-2">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="rounded-full bg-stone-100 px-3 py-1 text-[11px] text-stone-700">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-800 group-hover:text-brand-900">
                              Leggi <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  </motion.article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <Card className="mt-10 p-10 text-center">
                  <p className="text-base text-stone-700">Nessun articolo trovato.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('Tutti');
                      setSearchQuery('');
                      setActiveArchive('Tutti');
                    }}
                    className="mt-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-800 hover:text-brand-900"
                  >
                    Mostra tutti gli articoli
                  </button>
                </Card>
              )}
            </div>

            <aside className="lg:col-span-4">
              <Card className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Archivio</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveArchive('Tutti')}
                    className={[
                      'rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all',
                      activeArchive === 'Tutti'
                        ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-soft'
                        : 'border-stone-200 bg-white/70 text-stone-700 hover:bg-stone-50',
                    ].join(' ')}
                    aria-pressed={activeArchive === 'Tutti'}
                  >
                    Tutti
                  </button>
                  {archiveItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveArchive(item.key)}
                      className={[
                        'rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all',
                        activeArchive === item.key
                          ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-soft'
                          : 'border-stone-200 bg-white/70 text-stone-700 hover:bg-stone-50',
                      ].join(' ')}
                      aria-pressed={activeArchive === item.key}
                    >
                      {item.label} <span className="ml-2 tabular-nums opacity-75">{item.count}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default Blog;

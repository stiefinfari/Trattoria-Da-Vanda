import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

// Mock Blog Data
const blogPosts = [
  {
    id: 1,
    title: "Menù di Natale 2024",
    excerpt: "Il Natale si avvicina e con esso il profumo inebriante delle nostre tradizioni e dei piatti che ci riscaldano il cuore. Scopri cosa abbiamo preparato per te quest'anno.",
    date: "21 Nov 2024",
    author: "Trattoria Vanda",
    category: "Eventi",
    image: "/images/476124006_9384997218219213_2160549072948083416_n.jpg", // Using one of the images
    tags: ["Natale", "Menù", "Tradizione"]
  },
  {
    id: 2,
    title: "Stelle Michelin a Codroipo!",
    excerpt: "Un ospite d'eccezione alla Trattoria da Vanda: Antonino Cannavacciuolo è venuto a trovarci per assaporare la vera cucina friulana.",
    date: "14 Nov 2024",
    author: "Trattoria Vanda",
    category: "News",
    image: "/images/476237390_9384997368219198_3053090971420161476_n.jpg",
    tags: ["Chef", "Ospiti", "Cucina"]
  },
  {
    id: 3,
    title: "Benvenuti nel nostro angolo di gusto!",
    excerpt: "Siamo felici di inaugurare il nostro nuovo blog, dove condivideremo storie, ricette e novità dal mondo della Trattoria da Vanda.",
    date: "10 Nov 2024",
    author: "Trattoria Vanda",
    category: "News",
    image: "/images/483831419_9591412330911033_795015669042024339_n.jpg",
    tags: ["Blog", "Novità"]
  },
  {
    id: 4,
    title: "La tradizione del Frico",
    excerpt: "Scopri la storia e i segreti di uno dei piatti più amati della cucina friulana, preparato secondo la ricetta della nonna.",
    date: "05 Ott 2024",
    author: "Chef Marco",
    category: "Ricette",
    image: "/images/72411193_2657273854324950_7931703791299067904_n.jpg",
    tags: ["Frico", "Tradizione", "Ricette"]
  },
];

const categories = ["Tutti", "News", "Eventi", "Ricette", "Storie"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Tutti");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "Tutti" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">Blog & Eventi</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Scopri le ultime novità, le nostre ricette segrete e gli eventi speciali della Trattoria da Vanda.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-rustic-800 text-white shadow-md' 
                    : 'bg-white text-stone-600 hover:bg-rustic-100 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Cerca articoli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-full focus:ring-2 focus:ring-rustic-500 focus:border-transparent outline-none bg-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-stone-100 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative group">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-rustic-800 uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-stone-500 mb-3 gap-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                
                <h2 className="text-xl font-serif font-bold text-stone-800 mb-3 hover:text-rustic-700 transition-colors cursor-pointer">
                  {post.title}
                </h2>
                
                <p className="text-stone-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-stone-100 flex justify-between items-center">
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded">#{tag}</span>
                    ))}
                  </div>
                  <button className="text-rustic-700 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    Leggi <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-stone-500">
            <p className="text-lg">Nessun articolo trovato.</p>
            <button 
              onClick={() => {setActiveCategory("Tutti"); setSearchQuery("");}}
              className="mt-4 text-rustic-600 hover:underline"
            >
              Mostra tutti gli articoli
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Star, Tv, ShieldCheck, Info, AlertTriangle, Users, MapPin, Search, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG, getWhatsAppLink } from '@/src/constants';

/**
 * INSTRUCTIONS FOR IMAGES:
 * To change a movie's image, simply replace the URL in the 'image' property below.
 * You can use local paths (e.g., "/images/my-movie.jpg") or external URLs.
 */
const CATEGORIES = ["Todos", "Ação", "Suspense", "Terror", "Animação", "Infantil", "Ficção", "Comédia", "Drama", "Aventura"];

const MOVIE_CATALOG = [
  { id: 1, title: "Deadpool & Wolverine", year: 2024, category: "Ação", rating: 8.9, platform: ["Disney+", "Prime Video"], image: "/images/blog/foto-1.jpg", slug: "deadpool-3" },
  { id: 2, title: "Missão Impossível 8", year: 2025, category: "Ação", rating: 9.1, platform: ["Paramount+", "Apple TV+"], image: "/images/blog/foto-2.jpg", slug: "missao-impossivel-8" },
  { id: 3, title: "John Wick 4", year: 2023, category: "Ação", rating: 8.9, platform: ["Netflix", "Prime Video"], image: "/images/blog/foto-3.jpg", slug: "john-wick-4" },
  { id: 4, title: "Velozes e Furiosos 11", year: 2025, category: "Ação", rating: 8.5, platform: ["Prime Video"], image: "/images/blog/foto-4.jpg", slug: "velozes-11" },
  { id: 5, title: "Sorria 2", year: 2024, category: "Terror", rating: 7.9, platform: ["Paramount+"], image: "/images/blog/foto-5.jpg", slug: "sorria-2" },
  { id: 6, title: "Invocação do Mal 4", year: 2025, category: "Terror", rating: 8.1, platform: ["Max"], image: "/images/blog/foto-6.jpg", slug: "invocacao-4" },
  { id: 7, title: "Divertida Mente 2", year: 2024, category: "Animação", rating: 8.7, platform: ["Disney+"], image: "/images/blog/foto-7.jpg", slug: "divertida-mente-2" },
  { id: 8, title: "Mufasa: O Rei Leão", year: 2024, category: "Animação", rating: 8.4, platform: ["Disney+"], image: "/images/blog/foto-8.jpg", slug: "mufasa" },
  { id: 9, title: "Duna: Parte 2", year: 2024, category: "Ficção", rating: 9.2, platform: ["Max", "Prime Video"], image: "/images/blog/foto-9.jpg", slug: "duna-2" },
  { id: 10, title: "Alien: Romulus", year: 2024, category: "Ficção", rating: 8.5, platform: ["Disney+"], image: "/images/blog/foto-10.jpg", slug: "alien-romulus" },
  { id: 11, title: "Oppenheimer", year: 2023, category: "Drama", rating: 9.0, platform: ["Prime Video"], image: "/images/blog/foto-11.jpg", slug: "oppenheimer" },
  { id: 12, title: "The Last of Us S2", year: 2025, category: "Drama", rating: 9.4, platform: ["Max"], image: "/images/blog/foto-12.jpg", slug: "tlou-2" },
  { id: 13, title: "Stranger Things 5", year: 2025, category: "Ficção", rating: 9.5, platform: ["Netflix"], image: "/images/blog/foto-13.jpg", slug: "stranger-things-5" },
  { id: 14, title: "House of the Dragon S2", year: 2024, category: "Drama", rating: 9.2, platform: ["Max"], image: "/images/blog/foto-14.jpg", slug: "hotd-2" },
  { id: 15, title: "The Boys S4", year: 2024, category: "Ação", rating: 9.3, platform: ["Prime Video"], image: "/images/blog/foto-15.jpg", slug: "the-boys-4" },
  { id: 16, title: "Fallout", year: 2024, category: "Aventura", rating: 9.0, platform: ["Prime Video"], image: "/images/blog/foto-16.jpg", slug: "fallout-series" },
  { id: 17, title: "Kung Fu Panda 4", year: 2024, category: "Animação", rating: 8.3, platform: ["Prime Video"], image: "/images/blog/foto-17.jpg", slug: "panda-4" },
  { id: 18, title: "Barbie 2", year: 2025, category: "Comédia", rating: 8.0, platform: ["Max"], image: "/images/blog/foto-18.jpg", slug: "barbie-2" },
  { id: 19, title: "Patrulha Canina", year: 2024, category: "Infantil", rating: 7.8, platform: ["Paramount+"], image: "/images/blog/foto-19.jpg", slug: "patrulha-canina" },
  { id: 20, title: "Silêncio dos Inocentes 2", year: 2025, category: "Suspense", rating: 8.7, platform: ["Max"], image: "/images/blog/foto-20.jpg", slug: "silencio-2" },
];

export function BlogHome() {
  const [activeCategory, setActiveCategory] = React.useState("Todos");
  const [search, setSearch] = React.useState("");
  
  const filteredMovies = MOVIE_CATALOG.filter(movie => {
    const matchesCat = activeCategory === "Todos" || movie.category === activeCategory;
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#0a0f1c] min-h-screen text-[#e2e8f0]">
      {/* Disclaimer Top Bar */}
      <div className="bg-[#1a1f2e] text-brand-warning py-3 text-center text-[10px] md:text-xs font-bold px-4 border-b border-[#2a2f3e] flex items-center justify-center gap-2">
        <AlertTriangle size={14} />
        Este site não hospeda, transmite ou disponibiliza conteúdos audiovisuais. Apenas recomendamos plataformas oficiais.
      </div>

      <div className="container-sleek py-10 md:py-16">
        {/* Blog Hero Section */}
        <section className="bg-gradient-to-br from-[#0f172a] to-[#0a0f1c] rounded-[2rem] border border-[#1f2a3e] p-8 md:p-16 mb-12 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">
              Mega Filmes Online 2026
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mb-8">
              O maior catálogo de recomendações de filmes e séries. Descubra onde assistir de forma 100% legal e segura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link to="/contato" className="bg-[#E50914] text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest hover:brightness-110 transition-smooth">
                📞 FALE COM ATENDIMENTO
              </Link>
              
              {/* Search Bar */}
              <div className="bg-[#1e293b] rounded-full px-6 py-2 flex items-center gap-3 w-full sm:w-auto min-w-[280px]">
                <Search size={18} className="text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Buscar filme ou série..." 
                  className="bg-transparent outline-none flex-1 py-1 italic text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <div className="mb-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 pb-4">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-smooth border ${
                  activeCategory === cat 
                    ? 'bg-[#E50914] text-white border-[#E50914] shadow-lg shadow-red-900/20' 
                    : 'bg-[#1e293b] text-slate-400 border-transparent hover:border-brand-warning hover:text-brand-warning'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-8 border-l-4 border-[#E50914] pl-4">
          <h2 className="text-xl md:text-2xl font-black">FILMES E SÉRIES EM DESTAQUE</h2>
          <span className="text-xs font-bold text-slate-500">Mostrando {filteredMovies.length} títulos</span>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-20">
          {filteredMovies.map((movie) => (
            <motion.div
              layout
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group bg-[#111827] rounded-2xl overflow-hidden border border-[#1f2a3e] hover:border-[#E50914] hover:-translate-y-2 transition-smooth shadow-lg cursor-pointer"
            >
              <div className="aspect-[2/3] relative overflow-hidden">
                <img src={movie.image} alt={movie.title} className="object-cover w-full h-full group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 text-[10px] font-black text-brand-warning">
                  <Star size={10} fill="#fbbf24" stroke="#fbbf24" />
                  {movie.rating}
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-2 text-[8px] font-black text-slate-500 mb-1 uppercase tracking-widest leading-none">
                   <span>{movie.year}</span>
                   <span>•</span>
                   <span>{movie.category}</span>
                </div>
                <h3 className="font-bold text-sm mb-3 group-hover:text-brand-warning transition-smooth line-clamp-1">{movie.title}</h3>
                <Link to={`/blog/${movie.id}`} className="block w-full border border-[#E50914] text-[#E50914] text-[9px] font-black uppercase tracking-widest py-2 rounded-full text-center hover:bg-[#E50914] hover:text-white transition-smooth">
                   Saiba Mais
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Where to Watch Box */}
        <section className="bg-[#111827] border border-[#1f2a3e] rounded-[2.5rem] p-10 md:p-16 text-center mb-20">
           <Tv size={48} className="text-[#E50914] mx-auto mb-6" />
           <h2 className="text-2xl md:text-3xl font-black mb-6">Onde assistir legalmente?</h2>
           <div className="max-w-3xl mx-auto">
              <Link 
                to="/contato"
                className="block bg-[#1e293b] border-2 border-dashed border-[#E50914] p-8 rounded-3xl hover:bg-white/5 transition-smooth group"
              >
                <p className="text-slate-300 font-bold group-hover:text-[#E50914] leading-relaxed">
                  Para saber mais, clique aqui e fale com um atendente, que te indicamos exatamente onde assistir o filme ou seriado que você deseja
                </p>
              </Link>
           </div>
        </section>

        {/* Institutional Sections */}
        <div id="sobre" className="space-y-20 mb-20">
          <section>
             <h2 className="text-2xl font-black mb-8 border-l-4 border-[#E50914] pl-4 uppercase">Sobre a Mega Filmes Online 2026</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="info-card-dark"><MapPin className="text-[#E50914] mb-4" /> <h3 className="font-bold mb-2">Quem Somos</h3> <p className="text-xs text-slate-500 leading-relaxed font-normal">Empresa brasileira com sede em São José dos Campos - SP, especializada em orientação digital e entretenimento legal.</p></div>
                <div className="info-card-dark"><ShieldCheck className="text-[#E50914] mb-4" /> <h3 className="font-bold mb-2">Nosso Objetivo</h3> <p className="text-xs text-slate-500 leading-relaxed font-normal">Ajudar pessoas a descobrirem filmes e séries disponíveis em plataformas oficiais da melhor forma possível.</p></div>
                <div className="info-card-dark"><Users className="text-[#E50914] mb-4" /> <h3 className="font-bold mb-2">Público</h3> <p className="text-xs text-slate-500 leading-relaxed font-normal">Atendimento personalizado para clientes residenciais e empresas que buscam o melhor do cinema digital.</p></div>
             </div>
          </section>

          <section>
             <h2 className="text-2xl font-black mb-8 border-l-4 border-[#E50914] pl-4 uppercase text-right md:text-left">Benefícios do Nosso Serviço</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="info-card-dark border-dashed"><Clock className="text-[#E50914] mb-4" /> <h3 className="font-bold mb-2">Atendimento Rápido</h3> <p className="text-xs text-slate-500">Resposta em até 24 horas úteis para qualquer dúvida técnica.</p></div>
                <div className="info-card-dark border-dashed"><ShieldCheck className="text-[#E50914] mb-4" /> <h3 className="font-bold mb-2">Conteúdo 100% Legal</h3> <p className="text-xs text-slate-500">Recomendações apenas de plataformas oficiais para sua segurança.</p></div>
                <div className="info-card-dark border-dashed"><Users className="text-[#E50914] mb-4" /> <h3 className="font-bold mb-2">Foco no Cliente</h3> <p className="text-xs text-slate-500">Suporte humanizado e próximo para garantir a melhor configuração.</p></div>
             </div>
          </section>

          {/* Location Specific Info */}
          <div className="bg-[#111827] border border-[#1f2a3e] rounded-3xl p-10 text-center">
             <MapPin size={40} className="text-[#E50914] mx-auto mb-4" />
             <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">{SITE_CONFIG.regionTitle}</h3>
             <p className="text-sm text-slate-500 mb-4 max-w-lg mx-auto">Estamos localizados estrategicamente para atender você com agilidade e proximidade.</p>
             <div className="text-xs font-bold text-[#E50914]">
                {SITE_CONFIG.address}
             </div>
          </div>
        </div>
      </div>

      {/* Footer Branding for Blog Page */}
      <div className="bg-[#070b14] py-8 text-center text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em] border-t border-[#1f2a3e]">
         {SITE_CONFIG.copyright}
      </div>
    </div>
  );
}

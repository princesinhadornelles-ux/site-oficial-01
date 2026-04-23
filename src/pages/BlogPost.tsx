import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Star, Tv, AlertTriangle, MessageCircle, Play, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { SITE_CONFIG, getWhatsAppLink } from '@/src/constants';

/**
 * INSTRUCTIONS FOR IMAGES:
 * To change a movie's image, simply replace the URL in the 'image' property below.
 * You can use local paths (e.g., "/images/my-movie.jpg") or external URLs.
 */
const MOVIE_CATALOG = [
  { id: 1, title: "Deadpool & Wolverine", year: 2024, category: "Ação", rating: 8.9, platform: ["Disney+", "Prime Video"], image: "https://picsum.photos/seed/dp3/1200/600", content: "O mercenário tagarela mais amado do mundo une forças com o lendário Wolverine em um filme que redefine o gênero de super-heróis no UCM. Com muito humor, ação desenfreada e momentos emocionantes, esta é uma recomendação obrigatória para os fãs da Marvel." },
  { id: 2, title: "Missão Impossível 8", year: 2025, category: "Ação", rating: 9.1, platform: ["Paramount+", "Apple TV+"], content: "Ethan Hunt retorna para sua missão mais perigosa até agora. Com acrobacias que desafiam a morte e um roteiro de roer as unhas, o novo capítulo da franquia prova que o cinema de ação de alta qualidade está mais vivo do que nunca." },
  { id: 3, title: "John Wick 4", year: 2023, category: "Ação", rating: 8.9, platform: ["Netflix", "Prime Video"], content: "O Baba Yaga está de volta e mais implacável do que nunca. John Wick descobre um caminho para derrotar a Alta Cúpula, mas terá que enfrentar um rastro de sangue por todo o globo." },
  { id: 4, title: "Velozes e Furiosos 11", year: 2025, category: "Ação", rating: 8.5, platform: ["Prime Video"], content: "A saga da família Toretto chega ao seu clímax. Muita adrenalina, carros modificados e a importância dos laços em uma conclusão épica." },
  { id: 5, title: "Sorria 2", year: 2024, category: "Terror", rating: 7.9, platform: ["Paramount+"], content: "O sorriso que aterroriza gerações retorna com novas vítimas. Prepare-se para sustos planejados e uma atmosfera sufocante do início ao fim." },
  { id: 6, title: "Invocação do Mal 4", year: 2025, category: "Terror", rating: 8.1, platform: ["Max"], content: "Os investigadores paranormais Ed e Lorraine Warren enfrentam seu caso mais assustador, envolvendo um demônio antigo que coloca toda a sua família em risco." },
  { id: 7, title: "Divertida Mente 2", year: 2024, category: "Animação", rating: 8.7, platform: ["Disney+"], content: "Novas emoções chegam ao quartel-general de Riley, que agora é uma adolescente. Como a Alegria, Tristeza, Raiva, Medo e Nojinho vão lidar com a Ansiedade?" },
  { id: 8, title: "Mufasa: O Rei Leão", year: 2024, category: "Animação", rating: 8.4, platform: ["Disney+"], content: "Explore as origens do lendário rei Mufasa antes que Simba nascesse. Uma jornada épica pelas savanas africanas com visual deslumbrante." },
  { id: 9, title: "Duna: Parte 2", year: 2024, category: "Ficção", rating: 9.2, platform: ["Max", "Prime Video"], content: "A jornada de Paul Atreides continua enquanto ele busca vingança contra os conspiradores que destruíram sua família. Uma obra-prima visual e sonora." },
  { id: 10, title: "Alien: Romulus", year: 2024, category: "Ficção", rating: 8.5, platform: ["Disney+"], content: "Um novo grupo de exploradores espaciais se depara com a forma de vida mais aterrorizante do universo em um posto avançado abandonado." },
  { id: 11, title: "Oppenheimer", year: 2023, category: "Drama", rating: 9.0, platform: ["Prime Video"], content: "A história do cientista J. Robert Oppenheimer e sua equipe enquanto trabalham no Projeto Manhattan, dando origem à bomba atômica." },
  { id: 12, title: "The Last of Us S2", year: 2025, category: "Drama", rating: 9.4, platform: ["Max"], content: "Após os eventos traumáticos da primeira temporada, Joel e Ellie enfrentam novos desafios em um mundo destruído por um fungo mortal." },
  { id: 13, title: "Stranger Things 5", year: 2025, category: "Ficção", rating: 9.5, platform: ["Netflix"], content: "A temporada final da série que conquistou o mundo. Hawkins se torna o palco da batalha definitiva contra o Mundo Invertido." },
  { id: 14, title: "House of the Dragon S2", year: 2024, category: "Drama", rating: 9.2, platform: ["Max"], content: "A Dança dos Dragões começa a sangrar os Sete Reinos. Escolha seu lado na luta pelo Trono de Ferro entre os Pretos e os Verdes." },
  { id: 15, title: "The Boys S4", year: 2024, category: "Ação", rating: 9.3, platform: ["Prime Video"], content: "Billy Butcher e sua equipe continuam a luta contra os Supers corruptos da Vought em uma temporada mais sangrenta e bizarra do que nunca." },
];

export function BlogPost() {
  const { id } = useParams();
  const movie = MOVIE_CATALOG.find(m => String(m.id) === id) || MOVIE_CATALOG[0];

  return (
    <div className="bg-[#0a0f1c] min-h-screen text-[#e2e8f0]">
       {/* Disclaimer Top Bar */}
      <div className="bg-[#1a1f2e] text-brand-warning py-3 text-center text-[10px] md:text-xs font-bold px-4 border-b border-[#2a2f3e] flex items-center justify-center gap-2">
        <AlertTriangle size={14} />
        Este site não hospeda conteúdos audiovisuais. Apenas recomendamos plataformas oficiais.
      </div>

      <div className="relative h-[60vh] md:h-[70vh]">
        <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container-sleek">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white font-black text-xs uppercase mb-6 hover:text-brand-warning transition-smooth">
              <ArrowLeft size={16} /> VOLTAR PARA O CATÁLOGO
            </Link>
            
            <div className="flex gap-4 mb-4">
               <span className="bg-[#E50914] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">{movie.category}</span>
               <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">{movie.year}</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-tight drop-shadow-2xl">
              {movie.title}
            </h1>
            
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <Star size={24} fill="#fbbf24" stroke="#fbbf24" />
                  <span className="text-2xl font-black text-brand-warning">{movie.rating}</span>
                  <span className="text-slate-400 font-bold">/ 10</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-sleek py-12 px-6">
        <div className="flex flex-col lg:flex-row gap-16">
           {/* Left: Content */}
           <div className="flex-1">
              <h2 className="text-2xl font-black mb-6 border-l-4 border-[#E50914] pl-4 uppercase">Sobre a Obra</h2>
              <p className="text-lg text-slate-400 leading-relaxed font-medium mb-12">
                 {movie.content}
              </p>

              <div className="bg-[#111827] border border-[#1f2a3e] rounded-3xl p-8 mb-12">
                 <h3 className="text-xl font-black mb-6 flex items-center gap-3 italic">
                   <Tv size={24} className="text-[#E50914]" />
                   ONDE ASSISTIR LEGALMENTE?
                 </h3>
                 <Link 
                   to="/contato"
                   className="block bg-[#1e293b] border-2 border-dashed border-[#E50914] p-6 rounded-2xl hover:bg-white/5 transition-smooth group"
                 >
                   <p className="text-slate-300 font-bold group-hover:text-[#E50914] leading-relaxed">
                     Para saber mais, clique aqui e fale com um atendente, que te indicamos exatamente onde assistir o filme ou seriado que você deseja
                   </p>
                 </Link>
                 <div className="mt-8 pt-8 border-t border-[#1f2a3e] text-[10px] text-slate-500 font-bold leading-relaxed uppercase">
                    🔒 Todas as indicações acima são de plataformas de streaming por assinatura oficiais. Não recomendamos o uso de sites piratas.
                 </div>
              </div>
           </div>

           {/* Right: Sidebar */}
           <aside className="w-full lg:w-96">
              <div className="bg-[#111827] border border-[#1f2a3e] rounded-[2.5rem] p-8 sticky top-24">
                 <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">Atendimento VIP</h3>
                 <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">
                   Tem dúvidas sobre como configurar sua TV ou qual plano de streaming é melhor para você? Fale com nosso suporte.
                 </p>
                 <a 
                   href={getWhatsAppLink(`Olá, gostaria de ajuda com suporte sobre o filme ${movie.title}`, "TESTE")}
                   target="_blank"
                   rel="noreferrer"
                   className="flex items-center justify-center gap-3 bg-[#E50914] text-white w-full py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-smooth"
                 >
                    <MessageCircle size={20} />
                    Falar agora
                 </a>
                 
                 <div className="mt-8 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="text-brand-success" size={20} />
                       <span className="text-[10px] font-black text-slate-500 uppercase">Site 100% Seguro</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <Clock className="text-brand-warning" size={20} />
                       <span className="text-[10px] font-black text-slate-500 uppercase">Suporte 24/7</span>
                    </div>
                 </div>
              </div>
           </aside>
        </div>
      </div>

      <div className="bg-[#070b14] py-8 text-center text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em] border-t border-[#1f2a3e]">
         {SITE_CONFIG.copyright}
      </div>
    </div>
  );
}

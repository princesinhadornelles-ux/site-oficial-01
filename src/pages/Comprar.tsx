import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, ShieldCheck, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { getWhatsAppLink } from '@/src/constants';
import { Countdown, Logo } from '@/src/components/Shared';

const TESTIMONIALS = [
  { name: "Ricardo Almeida",    message: "Gente, o suporte é fora de série! Me ajudaram em menos de 2 minutos. E a qualidade? Impecável, não trava nada mesmo no 4K.", date: "Hoje" },
  { name: "Fernanda Costa",     message: "Paguei o plano trimestral e valeu cada centavo. Muito mais barato que a concorrência e entrega o dobro de estabilidade.", date: "Hoje" },
  { name: "Bruno Souza",        message: "Fui em Saiba Mais e ganhei um acesso de 4 horas para conhecer o serviço. Mudei de canal mil vezes e não deu um delay sequer.", date: "Ontem" },
  { name: "Luciana M.",         message: "Finalmente um serviço que presta no Brasil. O preço é justo e o sinal é limpo. Recomendo pra toda a família.", date: "Ontem" },
  { name: "Gustavo Henrique",   message: "Impressionado com a rapidez do atendimento. Entrei em contato e em menos de 1 minuto já recebi todas as orientações. Praticidade total.", date: "Ontem" },
  { name: "Sílvia Helena",      message: "O melhor suporte que já usei. Tive uma dúvida na TV e me mandaram até vídeo explicando. Nota mil!", date: "2 dias atrás" },
  { name: "Tiago Oliveira",     message: "Custo benefício imbatível. Já conheci vários serviços, mas esse aqui não tem comparação, é o mais estável de todos.", date: "2 dias atrás" },
  { name: "Mariana Dias",       message: "Uso faz 6 meses e nunca tive problema. Quando tem atualização eles avisam antes, transparência total.", date: "3 dias atrás" },
  { name: "André Santos",       message: "Pode confiar, o serviço é top. A tecnologia deles é muito rápida, troca de canal instantânea.", date: "3 dias atrás" },
  { name: "Patrícia Lima",      message: "Estava receosa, fui conhecer o serviço e assinei o anual na hora. Economizei muito e o serviço é premium.", date: "4 dias atrás" },
  { name: "Roberto F.",         message: "Atendimento humano e rápido. Nada de robôs chatos. Resolveram meu problema na hora. Show!", date: "4 dias atrás" },
  { name: "Jéssica Nunes",      message: "O sinal é perfeito, moro no interior e aqui pega tudo liso sem precisar de internet de fibra.", date: "5 dias atrás" },
  { name: "Eduardo Vaz",        message: "Não trava no futebol! Pra mim isso era o mais importante e superou todas as minhas expectativas.", date: "5 dias atrás" },
  { name: "Camila Rocha",       message: "Interface rápida e intuitiva. Minha mãe de 70 anos usa sozinha sem dificuldade nenhuma.", date: "Ontem" },
  { name: "Felipe Melo",        message: "Melhor investimento que fiz esse ano. Toda a família usa e a qualidade não cai nunca.", date: "Hoje" },
  { name: "Aline Carvalho",     message: "Sinceramente não esperava tanta qualidade pelo preço cobrado. Estou muito satisfeita com a escolha.", date: "Hoje" },
  { name: "Rodrigo Pinto",      message: "Suporte respondeu minha dúvida em 90 segundos no WhatsApp. Isso não tem preço. Serviço nota 10.", date: "Ontem" },
  { name: "Isabela Fonseca",    message: "Uso no celular, tablet e TV ao mesmo tempo e não cai a qualidade em nenhum. Fantástico!", date: "2 dias atrás" },
  { name: "Marcelo Teixeira",   message: "Já indiquei para 4 amigos. Todos continuam usando. Quando o serviço é bom a indicação vem natural.", date: "2 dias atrás" },
  { name: "Vanessa Lopes",      message: "Configuração concluída em menos de 5 minutos com a ajuda do suporte. Nunca vi isso antes. Equipe muito organizada.", date: "3 dias atrás" },
  { name: "Diego Azevedo",      message: "Assino há 1 ano e nunca precisei reclamar. Zero problemas, zero travamentos. Isso diz tudo.", date: "3 dias atrás" },
  { name: "Tatiane Borges",     message: "O plano anual valia demais, economizei quase R$170 em relação ao mensal. Sem arrependimento.", date: "4 dias atrás" },
  { name: "Henrique Moraes",    message: "Suporte via WhatsApp é humano de verdade. Me atenderam num sábado à noite sem demora nenhuma.", date: "4 dias atrás" },
  { name: "Natália Cunha",      message: "Imagem em 4K impecável. Assisto séries e filmes sem perder uma cena por buffering. Recomendo!", date: "5 dias atrás" },
  { name: "Leandro Barbosa",    message: "Transparência total desde o primeiro contato. O que prometem é exatamente o que entregam.", date: "5 dias atrás" },
  { name: "Priscila Andrade",   message: "Estava pagando muito mais caro em outro lugar com qualidade inferior. Arrependimento de não ter mudado antes.", date: "6 dias atrás" },
  { name: "Carlos Mendonça",    message: "Funciona perfeitamente na minha Smart TV LG. Instalação simples e sem dor de cabeça nenhuma.", date: "6 dias atrás" },
  { name: "Juliana Freitas",    message: "Meu marido que é bem exigente com tecnologia aprovou na hora. Qualidade de imagem absurda.", date: "1 semana" },
  { name: "Fábio Nascimento",   message: "Pago o plano Compre 1 Leve 2 com meu irmão. Saiu pela metade do preço pra cada um. Excelente!", date: "1 semana" },
  { name: "Renata Vieira",      message: "O desconto do primeiro mês me deu segurança para experimentar. Depois assinei o anual sem hesitar.", date: "1 semana" },
  { name: "Paulo Drummond",     message: "Uso principalmente para assistir futebol ao vivo. Nunca travou em nenhum jogo. Vale muito.", date: "1 semana" },
  { name: "Eliane Macedo",      message: "Minha família toda usa em dispositivos diferentes ao mesmo tempo. Qualidade mantida em todos.", date: "1 semana" },
  { name: "Thiago Cavalcanti",  message: "Resolução monstra, suporte ágil e preço justo. A combinação perfeita que eu procurava faz tempo.", date: "8 dias atrás" },
  { name: "Larissa Guimarães",  message: "Já testei vários serviços do tipo e esse é o único que realmente entrega o que promete.", date: "8 dias atrás" },
  { name: "Wellington Silva",   message: "Fiz o pagamento via Pix e em 3 minutos já estava configurado e funcionando. Muito eficiente!", date: "9 dias atrás" },
  { name: "Bianca Ferreira",    message: "Atendimento impecável. Tiraram todas as minhas dúvidas antes de eu assinar. Confiança total.", date: "9 dias atrás" },
  { name: "Adriano Costa",      message: "Uso em viagem pelo notebook via hotspot do celular e funciona perfeitamente. Flexibilidade incrível.", date: "10 dias atrás" },
  { name: "Simone Ramos",       message: "O suporte mandou um tutorial em vídeo exclusivo para me ajudar na configuração. Cuidado raro.", date: "10 dias atrás" },
  { name: "Leonardo Campos",    message: "Qualidade de imagem que o streaming pago não consegue entregar. Estou muito satisfeito.", date: "11 dias atrás" },
  { name: "Cláudia Meireles",   message: "Indicou a melhor decisão que tomei esse ano. Economizei e ainda melhorei muito a qualidade.", date: "11 dias atrás" },
  { name: "Márcio Araújo",      message: "Nunca imaginei que por esse preço a qualidade seria tão alta. Recomendo sem pensar duas vezes.", date: "12 dias atrás" },
  { name: "Amanda Cavalcante",  message: "Suporte ativo 7 dias por semana. Mesmo no domingo de manhã me atenderam rapidinho. Parabéns!", date: "12 dias atrás" },
  { name: "Flávio Peixoto",     message: "Minha TV antiga que não era Smart agora funciona conectada via Fire Stick. Qualidade excelente.", date: "13 dias atrás" },
  { name: "Tereza Cristina",    message: "Uso faz 8 meses e minha nota é 10/10. Nunca precisei abrir reclamação nenhuma vez.", date: "13 dias atrás" },
  { name: "Raul Monteiro",      message: "A grade de canais esportivos é a melhor que já vi. Cobre tudo que quero assistir ao vivo.", date: "2 semanas" },
  { name: "Gisele Nogueira",    message: "Minha filha usa para filmes, eu uso para esportes e meu marido para séries. Cada um no seu dispositivo.", date: "2 semanas" },
  { name: "Danilo Rocha",       message: "Assinei o plano semestral e em 6 meses não tive nenhuma queda de sinal. Resultado perfeito.", date: "2 semanas" },
  { name: "Mônica Silveira",    message: "O suporte resolve tudo via mensagem, sem precisar ligar para ninguém. Muito prático para o dia a dia.", date: "2 semanas" },
  { name: "Evandro Ferraz",     message: "Serviço extremamente estável. Mesmo com vários usuários simultâneos na minha casa, tudo liso.", date: "2 semanas" },
  { name: "Letícia Sampaio",    message: "Qualidade de 4K sem travar mesmo com a internet não sendo das mais rápidas. Tecnologia de ponta.", date: "2 semanas" },
];

const PLANS = [
  { name: "Mensal", price: "R$ 35,00", desc: "Ideal para experimentar.", popular: false },
  { name: "Trimestral", price: "R$ 90,00", desc: "Economia garantida por 3 meses.", popular: false },
  { name: "Semestral", price: "R$ 150,00", desc: "O equilíbrio perfeito.", popular: false },
  { name: "Anual", price: "R$ 250,00", desc: "Melhor oferta: Economia de 40%", popular: true },
];

const PAGE_SIZE = 5;
const TOTAL_PAGES = Math.ceil(TESTIMONIALS.length / PAGE_SIZE);

export function ComprarPage() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const visibleTestimonials = TESTIMONIALS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const whatsappUrl = getWhatsAppLink("Olá, gostaria de saber mais sobre os planos.", "COMPRA");

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setPage(p => (p + 1) % TOTAL_PAGES);
    }, 3500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Landing Page Header */}
      <header className="h-20 bg-white border-b border-slate-200">
        <div className="container-sleek h-full flex justify-between items-center">
          <Logo />
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 font-bold text-sm hover:text-brand-accent transition-smooth"
          >
            Dúvidas? Fale Conosco
          </a>
        </div>
      </header>

      <div className="container-sleek py-10 md:py-20">
        {/* Aviso de transparência obrigatório */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-8 text-xs text-blue-800 leading-relaxed">
          <strong>Aviso importante:</strong> O Filmes My View não vende IPTV, listas de canais, login, senha, streaming próprio, filmes, séries, canais, downloads ou acesso a conteúdo audiovisual. Nossos conteúdos e eventuais serviços são apenas informativos, voltados a orientar usuários sobre onde encontrar filmes e séries em plataformas oficiais e legais.
        </div>

        {/* Banner de Oferta - Verde com bordas pretas grossas */}
        <section id="testegratis" className="bg-[#22c55e] border-[6px] border-black mb-12 text-center p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl">
          <h2 className="text-black font-black uppercase tracking-tighter text-2xl md:text-3xl mb-6 italic">
            🚀 OFERTA DE LANÇAMENTO EXCLUSIVA!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <a 
              href={getWhatsAppLink("Quero saber mais sobre a promoção PLANO ANUAL ECONOMIA DE 40%", "COMPRA")}
              target="_blank"
              rel="noreferrer"
              className="group bg-red-600 p-5 rounded-2xl border-[3px] border-black shadow-lg transition-smooth hover:scale-105 hover:bg-black flex flex-col justify-center min-h-[140px]"
            >
              <span className="block text-white font-black text-lg mb-2">PLANO ANUAL</span>
              <span className="text-white/90 text-sm font-bold uppercase tracking-tighter leading-tight">40% DE ECONOMIA REAL</span>
            </a>
            
            <a 
              href={getWhatsAppLink("Quero saber mais sobre a promoção COMPRE 1 LEVE 2", "COMPRA")}
              target="_blank"
              rel="noreferrer"
              className="group bg-red-600 p-5 rounded-2xl border-[3px] border-black shadow-lg transition-smooth hover:scale-105 hover:bg-black flex flex-col justify-center min-h-[140px]"
            >
              <span className="block text-white font-black text-lg mb-2">COMPRE 1 LEVE 2</span>
              <span className="text-white/90 text-[10px] font-bold uppercase tracking-tighter leading-tight">
                ASSINE AGORA E GANHE UMA SEGUNDA CONTA GRÁTIS POR 30 DIAS
              </span>
            </a>

            <a 
              href={getWhatsAppLink("Quero saber mais sobre a promoção DESCONTO INICIAL PRIMEIRO MÊS R$ 25,00", "COMPRA")}
              target="_blank"
              rel="noreferrer"
              className="group bg-red-600 p-5 rounded-2xl border-[3px] border-black shadow-lg transition-smooth hover:scale-105 hover:bg-black flex flex-col justify-center min-h-[140px]"
            >
              <span className="block text-white font-black text-lg mb-2">DESCONTO INICIAL</span>
              <span className="text-white/90 text-sm font-bold uppercase tracking-tighter leading-tight">1º MÊS POR APENAS R$ 25,00</span>
            </a>
          </div>

          <div className="bg-white/90 p-6 rounded-2xl border-[3px] border-black mb-8 inline-block w-full max-w-2xl">
            <p className="text-black font-black text-xl md:text-2xl mb-4 animate-pulse">
              ⚠️ SÓ RESTAM 5 VAGAS DISPONÍVEIS!
            </p>
            <p className="text-slate-800 font-bold text-sm md:text-base mb-6">
              Conheça nosso serviço gratuitamente antes de comprar e valide nossa qualidade agora mesmo.
            </p>
            <a 
              href={getWhatsAppLink("Olá, quero saber mais sobre o serviço antes de assinar um plano.", "COMPRA")}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-black text-white px-10 py-5 rounded-full font-black text-xl uppercase tracking-tighter hover:bg-slate-800 transition-smooth shadow-lg shadow-black/20"
            >
              QUERO SABER MAIS AGORA!
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
             <div className="text-black font-black uppercase tracking-wider text-sm">
               ESSA OPORTUNIDADE ACABA EM:
             </div>
             <div className="bg-black text-white p-2 rounded-lg border-2 border-white/20">
                <Countdown />
             </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-4 tracking-tight">
            Escolha o Plano Ideal para Você
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Acesso imediato, suporte premium e a melhor estabilidade do mercado garantida.
          </p>
        </section>

        <section id="planos" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PLANS.map((plan, i) => (
            <div key={i} className={`card-sleek transition-smooth relative flex flex-col p-6 ${plan.popular ? 'border-brand-accent ring-2 ring-brand-accent/10 scale-105 z-10' : ''}`}>
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  MAIS VENDIDO
                </span>
              )}
              <h3 className="text-xl font-bold mb-1 text-brand-primary">{plan.name}</h3>
              <div className={`font-black text-brand-accent mb-4 tracking-tighter ${plan.name === 'Semestral' || plan.name === 'Anual' ? 'text-3xl' : 'text-4xl'}`}>
                {plan.price}
              </div>
              <p className="text-xs text-slate-400 mb-8 font-bold uppercase tracking-wider">{plan.desc}</p>
              
              <ul className="space-y-4 mb-10 flex-1">
                {["Acesso Premium Imediato", "Suporte VIP WhatsApp", "Atualizações Inclusas", "Sem Fidelidade"].map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <Check className="text-brand-success" size={18} strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppLink(`Olá, tenho interesse no plano ${plan.name} no valor de ${plan.price}, quero conhecer o serviço antes de assinar.`, "COMPRA")}
                target="_blank"
                rel="noreferrer"
                className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-widest text-center transition-smooth ${plan.popular ? 'bg-brand-accent text-white shadow-xl shadow-blue-200' : 'bg-slate-900 text-white hover:bg-black'}`}
              >
                Assinar Agora
              </a>
            </div>
          ))}
        </section>

        {/* Social Proof */}
        <section id="suporte" className="mb-20" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-extrabold text-brand-primary uppercase tracking-widest opacity-40">
              O que dizem nossos clientes
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setPaused(true); setPage(p => (p - 1 + TOTAL_PAGES) % TOTAL_PAGES); }}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-accent hover:border-brand-accent transition-smooth"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPaused(true); setPage(i); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${page === i ? 'w-6 bg-brand-accent' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => { setPaused(true); setPage(p => (p + 1) % TOTAL_PAGES); }}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-accent hover:border-brand-accent transition-smooth"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-4"
            >
              {visibleTestimonials.map((t, i) => (
                <div key={i} className="card-sleek flex flex-col gap-3 min-h-[200px]">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => <Star key={j} size={10} fill="#fbbf24" stroke="#fbbf24" />)}
                  </div>
                  <p className="text-[11px] text-slate-600 italic leading-snug flex-1">"{t.message}"</p>
                  <div className="flex flex-col gap-1 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-black text-brand-primary uppercase">{t.name}</span>
                    <span className="text-[9px] font-bold text-slate-400">{t.date}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-[10px] text-slate-400 mt-4 font-medium">
            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, TESTIMONIALS.length)} de {TESTIMONIALS.length} avaliações
          </p>
        </section>

        {/* Garantia */}
        <section id="garantia" className="card-sleek bg-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto border-2 border-brand-accent/20">
          <div className="bg-slate-50 p-6 rounded-full flex-shrink-0">
            <ShieldCheck size={80} className="text-brand-success opacity-80" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-primary mb-6 tracking-tight">
              Satisfeito ou seu dinheiro de volta.
            </h2>
            
            <p className="text-slate-500 mb-4 leading-relaxed font-medium">
              Temos tanta confiança na nossa qualidade que oferecemos <strong>7 dias de garantia incondicional</strong>. Se por qualquer motivo você não ficar satisfeito, devolvemos seu investimento integralmente, sem perguntas e sem complicação.
            </p>

            <div className="mb-8">
              <p className="text-[10px] text-slate-400 leading-tight italic">
                * somente na aquisição de algum produto fisico, serviços e acessos são disponibilizados automaticamente no ato do pagamento. A avaliação gratuita serve exatamente para o cliente comprar somente se estiver com certeza absoluta. Compre somente se tudo estiver funcionando corretamente e se te agradar.
              </p>
            </div>

            <div className="badge-sleek w-fit">
              <Clock size={16} />
              COMPRA 100% SEGURA
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

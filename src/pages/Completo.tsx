import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, ShieldCheck, Clock, Gift, Percent, Zap, UserCheck, MessageCircle, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/src/constants';
import { Countdown, WhatsAppButton, Logo } from '@/src/components/Shared';

const COMMENTS = [
  "Melhor serviço que já usei, suporte nota 10!", "Fiquei impressionado com a qualidade da imagem.",
  "Estabilidade total, não trava nem no futebol ao vivo.", "O atendimento humano faz toda a diferença.",
  "Configuração super rápida com ajuda do suporte, recomendo a todos.", "Preço justo pelo que oferece, top demais.",
  "Finalmente encontrei uma tecnologia que presta.", "Uso há meses e nunca tive problemas.",
  "O suporte resolveu minha dúvida em minutos.", "Gostei muito da interface, fácil de usar.",
  "Muito estável no 4K, sensacional.", "Vale cada centavo investido.",
  "Troca de canais instantânea, impressionante.", "A melhor grade de conteúdos que já vi.",
  "Minha família toda está usando e adorando.", "Serviço premium de verdade.",
  "Suporte muito atencioso e educado.", "Não fico mais sem esse serviço.",
  "Transparência total em tudo, nota mil.", "Melhor custo benefício do mercado.",
  "Sinal limpo e sem delay.", "Instalação foi super simples com a ajuda deles.",
  "Parabéns pelo trabalho, qualidade impecável.", "Fui em Saiba Mais, ganhei gratuitamente um acesso de 4 horas para conhecer o serviço e assinei na hora.",
  "Economizei muito saindo da TV a cabo tradicional.", "O melhor pós-venda que já experimentei.",
  "Sempre atualizado com as últimas novidades.", "Recomendei para 5 amigos e todos amaram.",
  "Pode confiar, os caras são profissionais mesmo.", "Futebol liso sem travar, era o que eu queria.",
  "Atendimento rápido até no feriado.", "Interface intuitiva até pra quem não entende muito.",
  "Plataforma robusta, aguenta todo mundo online.", "Zero reclamações, só elogios.",
  "Configuração em menos de 5 minutos com o suporte, recorde!", "Suporte técnico entende muito do assunto.",
  "Qualidade sonora também é excelente.", "Não troco por nenhum outro.",
  "Transmissão fluída em qualquer dispositivo.", "Aproveitei a promoção e valeu muito.",
  "Segurança e privacidade garantidas, show.", "O suporte e o atendimento são muito organizados.",
  "Tudo funcionando perfeitamente há meses.", "O melhor conteúdo infantil pros meus filhos.",
  "A grade de esportes é a mais completa.", "Suporte via WhatsApp é muito prático.",
  "Resolução monstra, assisto tudo em HD/4K.", "Nunca vi nada igual no Brasil.",
  "Sério, conheçam o serviço e não vão se arrepender.", "Top top top!"
];

const FAKE_BUYERS = [
  { name: "João P.", city: "São Paulo", plan: "Plano Anual" },
  { name: "Maria S.", city: "Rio de Janeiro", plan: "Plano Trimestral" },
  { name: "Carlos R.", city: "Belo Horizonte", plan: "Plano Mensal" },
  { name: "Ana L.", city: "Curitiba", plan: "Plano Anual" },
  { name: "Pedro M.", city: "Porto Alegre", plan: "Plano Semestral" },
  { name: "Juliana F.", city: "Salvador", plan: "Plano Anual" },
  { name: "Lucas T.", city: "Fortaleza", plan: "Plano Mensal" },
  { name: "Fernanda G.", city: "Recife", plan: "Plano Trimestral" },
];

const PLANS = [
  { name: "Mensal", price: "R$ 35,00", desc: "Experimente a qualidade.", popular: false },
  { name: "Trimestral", price: "R$ 90,00", desc: "3 meses de entretenimento.", popular: false },
  { name: "Semestral", price: "R$ 150,00", desc: "Ideal para economizar.", popular: false },
  { name: "Anual", price: "R$ 250,00", desc: "Melhor Oferta: 40% OFF", popular: true },
];

export function CompletoPage() {
  const [commentIndex, setCommentIndex] = useState(0);
  const [showBuyer, setShowBuyer] = useState(false);
  const [currentBuyer, setCurrentBuyer] = useState(FAKE_BUYERS[0]);

  useEffect(() => {
    const commentInterval = setInterval(() => {
      setCommentIndex(prev => (prev + 1) % COMMENTS.length);
    }, 4000);

    const buyerInterval = setInterval(() => {
      setCurrentBuyer(FAKE_BUYERS[Math.floor(Math.random() * FAKE_BUYERS.length)]);
      setShowBuyer(true);
      setTimeout(() => setShowBuyer(false), 5000);
    }, 12000);

    return () => {
      clearInterval(commentInterval);
      clearInterval(buyerInterval);
    };
  }, []);

  const whatsappUrl = getWhatsAppLink("Olá, vim pela página COMPLETA e quero aproveitar as promoções!", "COMPLETO");

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-brand-accent/20">
      {/* Header com Cronômetro Urgente */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white h-14 md:h-16 flex items-center shadow-2xl border-b border-brand-accent/20">
        <div className="container-sleek flex justify-between items-center w-full">
          <Logo isDark={true} />
          <div className="flex items-center gap-2 md:gap-4">
             <span className="hidden sm:block text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-widest animate-pulse">A oferta expira em:</span>
             <div className="bg-red-600 px-3 py-1 rounded text-white font-mono font-bold text-sm md:text-lg animate-flash flex items-center gap-2 border border-white/20 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                <Clock size={16} />
                <Countdown />
             </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="container-sleek">
          {/* Aviso de transparência */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-8 text-xs text-blue-800 leading-relaxed">
            <strong>Aviso:</strong> O Filmes My View é um guia informativo independente. Não vendemos IPTV, listas de canais, login, senha, streaming próprio, download ou acesso a filmes, séries e canais. Nosso objetivo é apenas orientar usuários sobre onde encontrar conteúdos em plataformas oficiais e legais.
          </div>

          {/* Hero: O que você prefere? */}
          <section id="testegratis" className="text-center mb-16 py-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-[1.1]"
            >
              VOCÊ SÓ TEM <span className="text-red-600 underline decoration-6 underline-offset-4">5 MINUTOS</span> PARA ESCOLHER...
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2rem] border-4 border-slate-900 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center gap-6"
              >
                <div className="bg-blue-100 p-4 rounded-full text-brand-accent">
                  <Percent size={40} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Pagar mais Barato?</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Ganhe 30% de DESCONTO na sua primeira mensalidade usando o cupom <span className="text-brand-accent font-black">QUERO30</span>, promoção válida somente para quem pagar o plano mensal nas proximas 2 horas. Corra e garanta sua vaga agora mesmo
                </p>
                <a href={getWhatsAppLink("Olá, quero usar o cupom QUERO30 para ganhar 30% de desconto na primeira mensalidade do plano mensal!", "COMPLETO")} target="_blank" rel="noreferrer" className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  Eu quero desconto!
                </a>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2rem] border-4 border-brand-accent shadow-[10px_10px_0px_0px_rgba(59,130,246,1)] flex flex-col items-center gap-6"
              >
                <div className="bg-blue-600 p-4 rounded-full text-white">
                  <Gift size={40} strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Ganhar Dobrado?</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Assine qualquer plano agora e receba o <span className="text-brand-accent font-black">DOBRO</span> de tempo de acesso inteiramente grátis hoje!
                </p>
                <a href={getWhatsAppLink("Olá, o que prefiro é GANHAR DOBRADO! Quero o dobro de tempo de acesso grátis hoje.", "COMPLETO")} target="_blank" rel="noreferrer" className="w-full py-4 bg-brand-accent text-white rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  Eu quero dobrar!
                </a>
              </motion.div>
            </div>
          </section>

          {/* Planos */}
          <section id="planos" className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">NOSSOS PLANOS OFICIAIS</h2>
              <div className="w-24 h-1.5 bg-brand-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLANS.map((plan, i) => (
                <div key={i} className={`p-8 rounded-[2rem] border-2 transition-all relative ${plan.popular ? 'bg-slate-900 text-white border-brand-accent shadow-2xl scale-105 z-10' : 'bg-white border-slate-200'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 right-8 bg-brand-accent text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                      RECOMENDADO
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-2 uppercase opacity-60 tracking-widest">{plan.name}</h3>
                  <div className="text-4xl font-black mb-4 tracking-tighter">{plan.price}</div>
                  <p className={`text-xs mb-8 font-bold ${plan.popular ? 'text-brand-accent' : 'text-slate-400'}`}>{plan.desc}</p>
                  
                  <ul className="space-y-4 mb-10">
                    {["Suporte VIP", "Orientação em 4K/FullHD", "Configuração Assistida", "Sem Fidelidade"].map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-medium">
                        <Check size={16} className={plan.popular ? 'text-brand-accent' : 'text-brand-success'} strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a 
                    href={getWhatsAppLink(`Olá, quero assinar o plano ${plan.name} que vi na oferta exclusiva!`, "COMPLETO")} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`block w-full py-4 rounded-xl text-center font-bold text-xs uppercase tracking-widest transition-all ${plan.popular ? 'bg-brand-accent text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-white hover:bg-black'}`}
                  >
                    Assinar Agora
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Destaques e Suporte */}
          <section id="suporte" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col gap-4 text-center items-center">
              <Zap className="text-yellow-500" size={48} />
              <h3 className="text-xl font-bold uppercase tracking-tight">Transmissão Ultra Estável</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Tecnologia de ponta que garante 99.9% de uptime. Assista sem travamentos, mesmo nos horários de pico.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col gap-4 text-center items-center">
              <UserCheck className="text-brand-accent" size={48} />
              <h3 className="text-xl font-bold uppercase tracking-tight">Suporte Humano e Real</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Nada de robôs. Nossa equipe técnica está pronta para resolver qualquer dúvida de forma humanizada e eficiente.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col gap-4 text-center items-center">
              <Star className="text-brand-warning" size={48} />
              <h3 className="text-xl font-bold uppercase tracking-tight">Alta Qualidade de Imagem</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Sinal purificado em 4K e FullHD para você aproveitar o melhor do cinema no conforto da sua casa.</p>
            </div>
          </section>

          {/* Comentários Rotativos */}
          <section className="mb-24 flex flex-col items-center">
             <div className="flex items-center gap-4 mb-10 w-full">
                <div className="h-px bg-slate-200 flex-1"></div>
                <h2 className="text-xl md:text-2xl font-black text-slate-400 uppercase tracking-[0.2em] px-4">DEPOIMENTOS EM TEMPO REAL</h2>
                <div className="h-px bg-slate-200 flex-1"></div>
             </div>

             <div className="w-full max-w-4xl relative min-h-[160px] flex items-center justify-center">
               <AnimatePresence mode="wait">
                 <motion.div
                    key={commentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-xl text-center w-full"
                 >
                    <div className="flex justify-center gap-1 mb-4">
                       {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />)}
                    </div>
                    <p className="text-lg md:text-2xl italic font-medium text-slate-700 leading-relaxed">
                       "{COMMENTS[commentIndex]}"
                    </p>
                    <div className="mt-4 text-slate-400 font-black text-xs uppercase tracking-widest">
                       CLIENTE VERIFICADO
                    </div>
                 </motion.div>
                </AnimatePresence>
             </div>
          </section>

          {/* Garantia incondicional */}
          <section id="garantia" className="bg-white p-10 md:p-16 rounded-[3rem] border-4 border-brand-accent flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-accent/5 rounded-full blur-3xl"></div>
            <div className="bg-blue-50 p-8 rounded-full flex-shrink-0 relative">
               <ShieldCheck size={80} className="text-brand-accent" />
            </div>
            <div className="text-center md:text-left relative">
               <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight uppercase">Satisfeito ou seu dinheiro de volta.</h2>
               <p className="text-slate-500 leading-relaxed font-bold mb-6 text-lg">
                  Temos tanta confiança na nossa qualidade que oferecemos <span className="text-brand-accent">7 dias de garantia incondicional</span>. Se por qualquer motivo você não ficar satisfeito, devolvemos seu investimento integralmente.
               </p>
               <div className="mb-8">
                  <p className="text-[10px] text-slate-400 leading-tight italic">
                    * somente na aquisição de algum produto fisico, serviços e acessos são disponibilizados automaticamente no ato do pagamento. A avaliação gratuita serve exatamente para o cliente comprar somente se estiver com certeza absoluta. Compre somente se tudo estiver funcionando corretamente e se te agradar.
                  </p>
               </div>
               <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-block bg-brand-accent text-white px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-tighter hover:brightness-110 transition-all shadow-xl shadow-blue-500/20">
                  QUERO COMEÇAR AGORA!
               </a>
            </div>
          </section>
        </div>
      </main>

      {/* Botão Flutuante WhatsApp */}
      <motion.a
        href={getWhatsAppLink("Olá, estou na página de OFERTA COMPLETA e preciso de suporte agora!", "COMPLETO")}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-brand-success text-white p-4 rounded-full shadow-2xl hover:opacity-90 transition-all border-4 border-white/20"
        title="Falar no WhatsApp"
      >
        <MessageCircle size={32} />
      </motion.a>

      {/* Popup Fake Comprador */}
      <AnimatePresence>
        {showBuyer && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-6 left-6 z-50 bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-4 max-w-xs pointer-events-none"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-brand-success">
               <UserCheck size={24} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-900">{currentBuyer.name} acabou de assinar!</p>
               <p className="text-[10px] text-slate-500 font-medium">Cidade: {currentBuyer.city}</p>
               <p className="text-[10px] text-brand-accent font-black uppercase tracking-widest">{currentBuyer.plan}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Minimalista de Landing Page */}
      <footer className="py-12 bg-white border-t border-slate-200 text-center">
         <div className="container-sleek">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
               {new Date().getFullYear()} PROLOCAL.com - Todos os direitos reservados. <br />
               Esta página contém ofertas limitadas e exclusivas para novos usuários.
            </div>
         </div>
      </footer>
    </div>
  );
}

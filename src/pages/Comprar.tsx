import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, ShieldCheck, Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/src/constants';
import { Countdown, Logo } from '@/src/components/Shared';

const TESTIMONIALS = [
  { name: "Ricardo Almeida", message: "Gente, o suporte é fora de série! Me ajudaram em menos de 2 minutos. E a qualidade? Impecável, não trava nada mesmo no 4K.", date: "Hoje" },
  { name: "Fernanda Costa", message: "Paguei o plano trimestral e valeu cada centavo. Muito mais barato que a concorrência e entrega o dobro de estabilidade.", date: "Hoje" },
  { name: "Bruno Souza", message: "O teste de 4h foi o que me convenceu. Testei tudo, mudei de canal mil vezes e não deu um delay sequer. Sensacional!", date: "Ontem" },
  { name: "Luciana M.", message: "Finalmente um serviço que presta no Brasil. O preço é justo e o sinal é limpo. Recomendo pra toda a família.", date: "Ontem" },
  { name: "Gustavo Henrique", message: "Impressionado com a velocidade de ativação. Fiz o pix e em menos de 1 minuto já tava com os acessos. Praticidade total.", date: "Ontem" },
  { name: "Sílvia Helena", message: "O melhor suporte que já usei. Tive uma dúvida na TV e me mandaram até vídeo explicando. Nota mil!", date: "2 dias atrás" },
  { name: "Tiago Oliveira", message: "Custo benefício imbatível. Já testei vários, mas esse aqui não tem comparação, é o mais estável de todos.", date: "2 dias atrás" },
  { name: "Mariana Dias", message: "Uso faz 6 meses e nunca tive problema. Quando tem atualização eles avisam antes, transparência total.", date: "3 dias atrás" },
  { name: "André Santos", message: "Pode confiar, o serviço é top. A tecnologia deles é muito rápida, troca de canal instantânea.", date: "3 dias atrás" },
  { name: "Patrícia Lima", message: "Estava receosa, fiz o teste e assinei o anual na hora. Economizei muito e o serviço é premium.", date: "4 dias atrás" },
  { name: "Roberto F.", message: "Atendimento humano e rápido. Nada de robôs chatos. Resolveram meu problema na hora. Show!", date: "4 dias atrás" },
  { name: "Jéssica Nunes", message: "O sinal é perfeito, moro no interior e aqui pega tudo liso sem precisar de internet de fibra.", date: "5 dias atrás" },
  { name: "Eduardo Vaz", message: "Não trava no futebol! Pra mim isso era o mais importante e passou no teste com louvor.", date: "5 dias atrás" },
  { name: "Camila Rocha", message: "Interface rápida e intuitiva. Minha mãe de 70 anos usa sozinha sem dificuldade nenhuma.", date: "Ontem" },
  { name: "Felipe Melo", message: "Melhor investimento que fiz esse ano. Toda a família usa e a qualidade não cai nunca.", date: "Hoje" },
];

const PLANS = [
  { name: "Mensal", price: "R$ 35,00", desc: "Ideal para experimentar.", popular: false },
  { name: "Trimestral", price: "R$ 90,00", desc: "Economia garantida por 3 meses.", popular: false },
  { name: "Semestral", price: "R$ 150,00", desc: "O equilíbrio perfeito.", popular: false },
  { name: "Anual", price: "R$ 250,00", desc: "Melhor oferta: Economia de 40%", popular: true },
];

export function ComprarPage() {
  const [testiIndex, setTestiIndex] = React.useState(0);
  const visibleTestimonials = TESTIMONIALS.slice(testiIndex * 5, (testiIndex + 1) * 5);
  const whatsappUrl = getWhatsAppLink("Olá, gostaria de saber mais sobre os planos.", "COMPRA");

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
        {/* Banner de Oferta - Verde com bordas pretas grossas */}
        <section id="testegratis" className="bg-[#22c55e] border-[6px] border-black mb-12 text-center p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl">
          <h2 className="text-black font-black uppercase tracking-tighter text-2xl md:text-3xl mb-6 italic">
            🚀 OFERTA DE LANÇAMENTO EXCLUSIVA!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <a 
              href={getWhatsAppLink("Quero fazer um teste, para poder participar da promoção PLANO ANUAL ECONOMIA DE 40%", "COMPRA")}
              target="_blank"
              rel="noreferrer"
              className="group bg-red-600 p-5 rounded-2xl border-[3px] border-black shadow-lg transition-smooth hover:scale-105 hover:bg-black flex flex-col justify-center min-h-[140px]"
            >
              <span className="block text-white font-black text-lg mb-2">PLANO ANUAL</span>
              <span className="text-white/90 text-sm font-bold uppercase tracking-tighter leading-tight">40% DE ECONOMIA REAL</span>
            </a>
            
            <a 
              href={getWhatsAppLink("Quero fazer um teste, para poder participar da promoção COMPRE 1 LEVE 2", "COMPRA")}
              target="_blank"
              rel="noreferrer"
              className="group bg-red-600 p-5 rounded-2xl border-[3px] border-black shadow-lg transition-smooth hover:scale-105 hover:bg-black flex flex-col justify-center min-h-[140px]"
            >
              <span className="block text-white font-black text-lg mb-2">COMPRE 1 LEVE 2</span>
              <span className="text-white/90 text-[10px] font-bold uppercase tracking-tighter leading-tight">
                PAGUE ANTES DE ACABAR O TESTE E GANHE UMA SEGUNDA CONTA GRATIS POR 30 DIAS
              </span>
            </a>

            <a 
              href={getWhatsAppLink("Quero fazer um teste, para poder participar da promoção DESCONTO INICIAL PRIMEIRO MÊS R$ 25,00", "COMPRA")}
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
              ⚠️ SÓ RESTAM 5 VAGAS PARA TESTE!
            </p>
            <p className="text-slate-800 font-bold text-sm md:text-base mb-6">
              Garanta seu teste grátis antes de comprar e valide nossa qualidade agora mesmo.
            </p>
            <a 
              href={getWhatsAppLink("Olá, quero garantir meu TESTE GRÁTIS de 4 horas antes de assinar um plano.", "COMPRA")}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-black text-white px-10 py-5 rounded-full font-black text-xl uppercase tracking-tighter hover:bg-slate-800 transition-smooth shadow-lg shadow-black/20"
            >
              GARANTIR TESTE GRÁTIS AGORA!
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
                href={getWhatsAppLink(`Olá, tenho interesse no plano ${plan.name} no valor de ${plan.price}, quero fazer um teste gratuito, por favor.`, "COMPRA")}
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
        <section id="suporte" className="mb-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl font-extrabold text-brand-primary uppercase tracking-widest opacity-40">
               O que dizem nossos clientes
            </h2>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setTestiIndex(i)}
                  className={`w-3 h-3 rounded-full transition-smooth ${testiIndex === i ? 'bg-brand-accent w-8' : 'bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`Ver grupo de depoimentos ${i + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {visibleTestimonials.map((t, i) => (
              <motion.div 
                key={t.name + i} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-sleek flex flex-col gap-3 min-h-[220px]"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => <Star key={j} size={10} fill="#fbbf24" stroke="#fbbf24" />)}
                </div>
                <p className="text-[11px] text-slate-600 italic leading-snug">"{t.message}"</p>
                <div className="flex flex-col gap-1 mt-auto pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-black text-brand-primary uppercase">{t.name}</span>
                  <span className="text-[9px] font-bold text-slate-400">{t.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
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
                * somente na aquisição de algum produto fisico, serviços e acessos são disponibilizados automaticamente no ato do pagamento, e o teste gratuito serve exatamente para o cliente comprar somente se estiver certeza absolutada, compre somente se tudo estiver funcionando corretamente e se te agradar.
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

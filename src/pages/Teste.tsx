import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MessageSquare, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/src/constants';
import { Countdown, Logo } from '@/src/components/Shared';

export function TestePage() {
  const whatsappUrl = getWhatsAppLink("Olá, quero ativar meu TESTE GRÁTIS de 4 horas agora mesmo.", "TESTE");

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
            className="bg-brand-accent text-white px-6 py-3 rounded-lg font-bold text-xs uppercase hover:opacity-90 transition-smooth shadow-lg shadow-blue-200"
          >
            Solicitar Teste Grátis
          </a>
        </div>
      </header>

      <div id="testegratis" className="container-sleek py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Content */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-blue-100 text-brand-accent px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider underline"
            >
              Oferta de Lançamento
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-brand-primary">
              Experimente 4 horas grátis antes de assinar.
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              Conheça a qualidade do nosso trabalho sem compromisso. Teste completo por 4 horas para você validar que nosso serviço é o que você procura.
            </p>

            <div className="flex flex-col gap-6">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-sleek-primary w-fit text-center"
              >
                Solicitar Teste Grátis Agora
              </a>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="badge-sleek">
                  <CheckCircle2 size={16} className="text-brand-success" />
                  7 dias de satisfação
                </div>
                <div className="badge-sleek">
                  <MessageSquare size={16} className="text-brand-accent" />
                  Suporte via WhatsApp
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Social Proof & Countdown */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Card: Launch Offer Options */}
            <section id="planos" className="bg-red-600 border-2 border-red-700 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white font-black uppercase tracking-widest text-xs mb-4">
                🚀 Ofertas de Lançamento:
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Anual: 40% OFF", msg: "PLANO ANUAL ECONOMIA DE 40%" },
                  { name: "COMPRE 1 LEVE 2", msg: "COMPRE 1 LEVE 2" },
                  { name: "1º Mês: R$ 25,00", msg: "DESCONTO INICIAL PRIMEIRO MÊS R$ 25,00" }
                ].map((item, index) => (
                  <a 
                    key={index}
                    href={getWhatsAppLink(`Quero fazer um teste, para poder participar da promoção ${item.msg}`, "TESTE")}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-2 items-center text-[10px] font-black text-white uppercase tracking-wider p-3 border border-white/30 rounded-lg hover:bg-white hover:text-red-600 transition-smooth bg-red-700/30"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    {item.name}
                  </a>
                ))}
              </div>
            </section>

            {/* Card: Testimonial */}
            <div id="suporte" className="card-sleek">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-brand-success font-bold text-sm">
                  JD
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-primary">João Duarte</div>
                  <div className="text-xs text-slate-400">Cliente há 6 meses</div>
                </div>
              </div>
              <p className="text-sm italic text-slate-700 leading-relaxed font-medium">
                "O teste de 4 horas me convenceu. O sinal não trava e o suporte foi super atencioso na hora da instalação."
              </p>
            </div>

            {/* Card: Urgent Offer */}
            <div className="card-sleek bg-slate-50 border-dashed border-slate-300">
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                Oferta por tempo limitado:
              </div>
              <div className="flex items-center justify-between">
                <Countdown />
                <div className="text-xs text-right text-slate-400 font-medium leading-tight">
                  Vagas de teste<br />restantes: <span className="text-brand-primary font-bold">4</span>
                </div>
              </div>
            </div>

            {/* Card: Shortened WhatsApp Action */}
            <div id="garantia" className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
              <div className="text-sm font-bold text-brand-primary">Suporte de Vendas:</div>
              <a 
                href={whatsappUrl} 
                target="_blank"
                rel="noreferrer"
                className="bg-brand-success text-white font-bold px-4 py-2 rounded-full text-xs hover:opacity-90 transition-smooth"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

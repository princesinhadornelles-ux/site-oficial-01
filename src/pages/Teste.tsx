import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, MessageSquare, Flame } from 'lucide-react';
import { getWhatsAppLink } from '@/src/constants';
import { Logo } from '@/src/components/Shared';

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// Builds a fully random slot-change schedule so each visitor sees a different experience
function buildSlotSchedule() {
  // Random starting slots between 5 and 11
  const initial = Math.floor(Math.random() * 7) + 5;
  let s = initial;
  const events: { ms: number; value: number }[] = [];
  let elapsed = 0;

  while (s > 1) {
    // Gap: sometimes a few seconds, sometimes ~20s — completely irregular
    const gap = (Math.random() < 0.3
      ? Math.floor(Math.random() * 5) + 3   // 3-7s  (fast drop, 30% chance)
      : Math.floor(Math.random() * 14) + 8  // 8-21s (slower drop, 70% chance)
    ) * 1000;

    elapsed += gap;

    // Drop amount: 1 when few slots remain, 1-3 when many remain
    const maxDrop = s > 5 ? 3 : 1;
    const drop = Math.floor(Math.random() * maxDrop) + 1;
    s = Math.max(1, s - drop);
    events.push({ ms: elapsed, value: s });
  }

  return { initial, events };
}

function getSlotCTA(slots: number): { label: string; cls: string } {
  if (slots >= 8) return {
    label: "Quero minha vaga",
    cls: "w-full mt-3 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-brand-accent text-white hover:brightness-110 transition-all",
  };
  if (slots >= 5) return {
    label: "Garantir minha vaga agora",
    cls: "w-full mt-3 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-orange-500 text-white hover:brightness-110 transition-all",
  };
  if (slots >= 3) return {
    label: "Corre! Garantir minha vaga",
    cls: "w-full mt-3 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-orange-600 text-white hover:brightness-110 transition-all",
  };
  if (slots === 2) return {
    label: "Restam 2 vagas — quero a minha!",
    cls: "w-full mt-3 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-red-500 text-white hover:brightness-110 transition-all shadow-md shadow-red-200",
  };
  // slots === 1
  return {
    label: "Pegar última vaga agora",
    cls: "w-full mt-3 py-3 rounded-xl font-black text-sm uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-all shadow-md shadow-red-200 flex items-center justify-center gap-2",
  };
}

const TESTIMONIALS = [
  { initials: "JD", name: "João Duarte",      time: "Cliente há 6 meses",  msg: "Fui em Saiba Mais, ganhei gratuitamente um acesso de 4 horas para conhecer o serviço. O sinal não trava e o suporte foi super atencioso na hora da instalação." },
  { initials: "MC", name: "Mariana Costa",    time: "Cliente há 3 meses",  msg: "Achei que ia ser complicado, mas a configuração com o suporte foi em menos de 2 minutos. Orientação impecável, uso no celular, TV e notebook sem problema nenhum." },
  { initials: "RS", name: "Rafael Souza",     time: "Cliente há 8 meses",  msg: "O suporte humano é o diferencial. Toda vez que precisei, respondem rápido e resolvem de verdade. Nunca vi isso em outro serviço do tipo." },
  { initials: "AL", name: "Ana Luiza",        time: "Cliente há 1 ano",    msg: "Preço justo e qualidade top. Já indiquei pra toda a família. Meu marido era cético, mas depois que conheceu o serviço assinou na hora." },
  { initials: "FP", name: "Felipe Prado",     time: "Cliente há 4 meses",  msg: "Fiquei surpreso com a estabilidade. Assisto futebol ao vivo sem travar nenhuma vez. Vale muito cada centavo do plano." },
  { initials: "CB", name: "Carla Braga",      time: "Cliente há 2 meses",  msg: "Tentei outros serviços antes e era decepção atrás de decepção. Aqui é diferente. O sinal é limpo e o atendimento é humano de verdade." },
  { initials: "TM", name: "Thiago Mendes",    time: "Cliente há 7 meses",  msg: "Assino o plano anual e economizei muito comparado ao que pagava antes. A qualidade em 4K é absurda, nunca pixeliza." },
  { initials: "LF", name: "Luciana Ferreira", time: "Cliente há 5 meses",  msg: "Minha internet não é das melhores e mesmo assim o serviço roda perfeito. Eles otimizaram muito bem. Recomendo sem hesitar." },
  { initials: "GN", name: "Gustavo Nunes",    time: "Cliente há 9 meses",  msg: "Atendimento no WhatsApp é rápido demais. Tive um problema numa sexta à noite e me responderam em menos de 3 minutos. Surpreendente!" },
  { initials: "PR", name: "Priscila Reis",    time: "Cliente há 6 meses",  msg: "Uso na Smart TV e no Fire Stick sem nenhuma dificuldade. A interface é fácil e intuitiva. Minha mãe consegue usar sozinha sem me chamar." },
  { initials: "BE", name: "Bruno Esteves",    time: "Cliente há 1 ano",    msg: "Paguei o plano Compre 1 Leve 2 e foi a melhor decisão. Duas contas pelo preço de uma, minha esposa também usa e nunca tivemos conflito de sinal." },
  { initials: "JO", name: "Juliana Oliveira", time: "Cliente há 3 meses",  msg: "O que me convenceu foi conhecer o serviço antes de pagar. Pude ver a qualidade com os meus próprios olhos. Confiança total desde o primeiro momento." },
  { initials: "DV", name: "Diego Vasconcelos",time: "Cliente há 11 meses", msg: "Sou exigente com qualidade de imagem e esse serviço atende perfeitamente. HD e 4K sem travamento, mesmo nos horários de pico." },
  { initials: "NM", name: "Natália Moura",    time: "Cliente há 4 meses",  msg: "Vim pelo preço e fiquei pela qualidade. O primeiro mês com desconto me deu a oportunidade de ver que vale muito mais do que cobram." },
  { initials: "RB", name: "Ricardo Barbosa",  time: "Cliente há 8 meses",  msg: "Transparência total. O que prometem na página é exatamente o que entregam. Isso é raro hoje em dia. Nunca fui enganado." },
  { initials: "SM", name: "Sabrina Melo",     time: "Cliente há 2 meses",  msg: "Configuração simples com o suporte e atendimento sempre disponível. Tudo que eu precisava num serviço de orientação digital. Nota dez sem exagero." },
  { initials: "ED", name: "Eduardo Dias",     time: "Cliente há 6 meses",  msg: "Uso principalmente para séries e filmes em 4K. A qualidade é incrível e nunca perdi uma cena por buffering. Totalmente recomendado." },
  { initials: "VP", name: "Vinicius Pereira", time: "Cliente há 5 meses",  msg: "O custo-benefício é imbatível. Pago menos da metade do que pagava antes e tenho uma qualidade muito superior. Não tem pra onde correr." },
  { initials: "LC", name: "Larissa Campos",   time: "Cliente há 7 meses",  msg: "Gostei demais da atenção no atendimento. Fizeram questão de me explicar tudo antes de eu assinar. Senti segurança desde a primeira mensagem." },
  { initials: "AM", name: "Alexandre Martins",time: "Cliente há 10 meses", msg: "Indiquei para 6 amigos e todos continuam assinantes até hoje. Quando um serviço é bom de verdade, a indicação é natural. Qualidade garantida." },
];

export function TestePage() {
  const whatsappUrl = getWhatsAppLink("Olá, quero saber mais sobre o serviço e conhecer os planos disponíveis.", "TESTE");

  const [currentIndex, setCurrentIndex] = useState(0);

  // Countdown timer: random start between 2:10 and 7:30 so visitors arrive at different points
  const [offerSeconds, setOfferSeconds] = useState(() => Math.floor(Math.random() * 320) + 130);
  const [bonusSeconds, setBonusSeconds] = useState(180);
  const [bonusActive, setBonusActive] = useState(false);

  // Slots driven by independent random schedule, not by timer thresholds
  const scheduleRef = useRef(buildSlotSchedule());
  const [slots, setSlots] = useState(scheduleRef.current.initial);
  const isLastSlot = slots === 1;

  // Testimonial rotation
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Main countdown (1 tick/s)
  useEffect(() => {
    if (offerSeconds <= 0) return;
    const t = setTimeout(() => setOfferSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [offerSeconds]);

  // Fire all slot-change events from the schedule (all scheduled at mount, random delays)
  useEffect(() => {
    const timeouts = scheduleRef.current.events.map(({ ms, value }) =>
      setTimeout(() => setSlots(value), ms)
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // When main timer hits 0, trigger bonus round after 1.5s dramatic pause
  useEffect(() => {
    if (offerSeconds === 0 && !bonusActive) {
      const t = setTimeout(() => setBonusActive(true), 1500);
      return () => clearTimeout(t);
    }
  }, [offerSeconds, bonusActive]);

  // Bonus countdown
  useEffect(() => {
    if (!bonusActive || bonusSeconds <= 0) return;
    const t = setTimeout(() => setBonusSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [bonusActive, bonusSeconds]);

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
            Saiba Mais
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
              Conheça o serviço antes de assinar.
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              Conheça a qualidade do nosso serviço sem compromisso. Entenda por que somos referência no mercado antes mesmo de assinar qualquer plano.
            </p>

            <div className="flex flex-col gap-6">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-sleek-primary w-fit text-center"
              >
                Quero Saber Mais Agora
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
                    href={getWhatsAppLink(`Quero saber mais sobre a promoção ${item.msg}`, "TESTE")}
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

            {/* Card: Testimonial (rotating) */}
            <div id="suporte" className="card-sleek overflow-hidden min-h-[140px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-brand-success font-bold text-sm shrink-0">
                      {TESTIMONIALS[currentIndex].initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-brand-primary">{TESTIMONIALS[currentIndex].name}</div>
                      <div className="text-xs text-slate-400">{TESTIMONIALS[currentIndex].time}</div>
                    </div>
                  </div>
                  <p className="text-sm italic text-slate-700 leading-relaxed font-medium">
                    "{TESTIMONIALS[currentIndex].msg}"
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-1 mt-4">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-brand-accent' : 'w-1 bg-slate-200'}`}
                  />
                ))}
              </div>
            </div>

            {/* Card: Urgent Offer — dynamic phases */}
            <AnimatePresence mode="wait">

              {/* PHASE 3 — BONUS ROUND */}
              {bonusActive && (
                <motion.a
                  key="bonus"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="block rounded-2xl p-5 bg-gradient-to-br from-orange-500 to-red-600 border-4 border-yellow-400 shadow-2xl cursor-pointer hover:brightness-110 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Flame size={20} className="text-yellow-300 animate-bounce" />
                    <span className="text-yellow-300 font-black text-[11px] uppercase tracking-widest">Última chance!</span>
                  </div>
                  <p className="text-white font-black text-sm uppercase leading-snug mb-3">
                    🤯 O DONO FICOU LOUCO E LIBEROU DE ÚLTIMA HORA MAIS 2 VAGAS — CLIQUE AGORA PARA NÃO PERDER!
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="bg-black/30 rounded-lg px-3 py-1 text-yellow-300 font-black text-lg tracking-widest">
                      {formatTime(bonusSeconds)}
                    </div>
                    <div className="text-right">
                      <div className="text-white font-black text-xs uppercase">Vagas liberadas</div>
                      <div className="text-yellow-300 font-black text-2xl leading-none">2</div>
                    </div>
                  </div>
                </motion.a>
              )}

              {/* PHASE 2 — LAST SLOT (1 vaga) */}
              {!bonusActive && offerSeconds > 0 && isLastSlot && (
                <motion.div
                  key="last"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl p-4 bg-white border-2 border-red-500 shadow-lg shadow-red-100"
                >
                  <div className="text-xs font-bold text-red-500 mb-2 uppercase tracking-wide flex items-center gap-1">
                    <Flame size={13} className="animate-pulse" /> Oferta por tempo limitado:
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="animate-pulse text-red-600 font-black text-2xl tracking-widest">
                      {formatTime(offerSeconds)}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-red-400 font-bold uppercase leading-tight">⚠️ ÚLTIMA VAGA!</div>
                      <div className="text-red-600 font-black text-2xl leading-none">1</div>
                    </div>
                  </div>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className={getSlotCTA(1).cls}>
                    <Flame size={14} />
                    {getSlotCTA(1).label}
                  </a>
                </motion.div>
              )}

              {/* PHASE 1 — NORMAL (slots decreasing) */}
              {!bonusActive && offerSeconds > 0 && !isLastSlot && (
                <motion.div
                  key={`normal-${slots}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="card-sleek bg-slate-50 border-dashed border-slate-300"
                >
                  <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                    Oferta por tempo limitado:
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="countdown-sleek text-sm md:text-base">
                      {formatTime(offerSeconds)}
                    </div>
                    <div className="text-xs text-right text-slate-400 font-medium leading-tight">
                      Vagas disponíveis<br />
                      restantes: <span className="text-brand-primary font-bold">{slots}</span>
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.a
                      key={`cta-${slots}`}
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={getSlotCTA(slots).cls}
                    >
                      {getSlotCTA(slots).label}
                    </motion.a>
                  </AnimatePresence>
                </motion.div>
              )}

            </AnimatePresence>

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

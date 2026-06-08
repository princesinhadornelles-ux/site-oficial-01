import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getWhatsAppLink } from '@/src/constants';

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

export function BlogHome() {
  const whatsappUrl = getWhatsAppLink("Olá, gostaria de fazer um _*teste*_ para conhecer o serviço, pode me ajudar?", "HOME");

  const GROUPS = Math.ceil(TESTIMONIALS.length / 3);
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentGroup(prev => (prev + 1) % GROUPS);
    }, 5000);
    return () => clearInterval(id);
  }, [GROUPS]);

  return (
    <div className="bg-brand-bg min-h-screen">

      {/* Block 1: Hero text */}
      <section id="testegratis" className="bg-slate-800 border-b border-white/10 py-8 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase leading-snug mb-4 text-white tracking-wide">
            VOCÊ ESTÁ NO SITE DO<br />
            <span className="whitespace-nowrap">
              <span className="text-brand-accent">MELHOR IPTV E P2P</span>{' '}DO BRASIL !
            </span>
          </h2>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-3">
            Estamos no mercado a mais de 10 anos, e podemos dizer que somos o melhor, te garantimos um teste grátis de 2 horas para conferir tudo que temos para te oferecer...
          </p>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Fizemos este site simples e básico para você não perder tempo lendo e ja ir falar diretamente com um atendente que está a sua espera, logo abaixo tera um botão chamado{' '}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-brand-accent underline hover:text-white transition-colors"
            >
              "CLIQUE AQUI PARA GERAR O TESTE !"
            </a>, clique e seja direcionado a um especialista pronto para te atender via WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 bg-[#25D366] text-white font-black text-sm md:text-base uppercase tracking-wide px-8 py-3 rounded-xl shadow-lg shadow-green-900/40 hover:brightness-110 transition-all"
          >
            Gerar Teste Gratuito No Whatsapp
          </a>
        </div>
      </section>

      {/* Block 2: Single column — main content */}
      <div id="planos" className="container-sleek py-5 md:py-8">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 text-brand-primary">
          Experimente por 4 horas ou 2 horas gratuitamente antes de assinar
        </h1>
        <p className="text-sm md:text-base text-slate-600 mb-8 leading-relaxed font-medium max-w-2xl">
          Conheça a qualidade do nosso trabalho sem compromisso. Teste gratuitamente um plano completo por 4 ou 2 horas para você validar que o nosso servidor é realmente o que você está procurando
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
        </div>
      </div>

      {/* Block 2.5: Highlight banner */}
      <section id="valores" className="bg-slate-700 py-8 px-5 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-white text-[clamp(0.75rem,3vw,1.25rem)] font-black uppercase tracking-wide leading-snug">
            TENHA MAIS DE 100 MIL CONTEÚDOS SEM TRAVAMENTOS COM<br />
            <span className="text-brand-accent whitespace-nowrap">QUALIDADE DE IMAGENS INIGUALÁVEL</span>
          </p>
        </div>
      </section>

      {/* Block: Steps */}
      <section id="comprar" className="bg-green-100 py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-xl md:text-2xl font-black uppercase tracking-wide text-green-900 mb-8">
            PASSOS PARA SER UM ASSINANTE!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white font-black text-lg flex items-center justify-center">1</div>
              <h3 className="font-black uppercase text-green-800 text-sm tracking-wide">TESTE GRÁTIS</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Solicite seu teste gratuito sem compromisso com um atendente pelo nosso atendimento. Nosso teste tem duração de 1 hora.
              </p>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white font-black text-lg flex items-center justify-center">2</div>
              <h3 className="font-black uppercase text-green-800 text-sm tracking-wide">ASSINE CONOSCO</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Gostou né? Agora que você já fez seu teste e já tem um cadastro, é só fazer seu pagamento solicitando para o atendente as formas disponíveis para pagamento.
              </p>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white font-black text-lg flex items-center justify-center">3</div>
              <h3 className="font-black uppercase text-green-800 text-sm tracking-wide">BOM ENTRETENIMENTO</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Prontinho! Agora é só você chamar a família, sentar no sofá, fazer uma pipoca, e curtir muito!
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Block 3: Testimonials */}
      <div id="suporte" className="container-sleek py-10 max-w-5xl mx-auto">
        <h2 className="text-center text-xl md:text-2xl font-black uppercase tracking-wide text-brand-primary mb-8">
          VEJA OS DEPOIMENTOS DE QUEM JÁ USOU
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGroup}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.slice(currentGroup * 3, currentGroup * 3 + 3).map((t, i) => (
              <div key={i} className="card-sleek flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-brand-success font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-brand-primary">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.time}</div>
                  </div>
                </div>
                <p className="text-sm italic text-slate-700 leading-relaxed font-medium">
                  "{t.msg}"
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: GROUPS }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentGroup(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentGroup ? 'w-6 bg-brand-accent' : 'w-2 bg-slate-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Block: CTA final */}
      <section id="falarcomatendente" className="bg-slate-900 py-12 px-5 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <p className="text-white text-sm md:text-base leading-relaxed font-medium">
            Agora que já conhece um pouco mais sobre nosso trabalho, fale agora mesmo com um atendente diretamente pelo WhatsApp e peça seu teste grátis e confira nossa qualidade
          </p>
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            animate={{
              color: ['#22c55e', '#facc15', '#ffffff', '#22c55e'],
              textShadow: [
                '0 0 0px #22c55e',
                '0 0 14px #facc15, 0 0 28px #facc15',
                '0 0 10px #ffffff',
                '0 0 0px #22c55e',
              ],
              scale: [1, 1.06, 1],
              borderColor: ['#22c55e', '#facc15', '#ffffff', '#22c55e'],
              boxShadow: [
                '0 0 0px #22c55e',
                '0 0 16px #facc15',
                '0 0 8px #ffffff',
                '0 0 0px #22c55e',
              ],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block border-4 rounded-2xl px-8 py-4 font-black text-lg md:text-2xl uppercase tracking-widest cursor-pointer"
          >
            CLIQUE AQUI PARA GERAR O TESTE !
          </motion.a>
        </div>
      </section>

    </div>
  );
}

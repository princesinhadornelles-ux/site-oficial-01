import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { getWhatsAppLink } from '@/src/constants';
import { Logo } from '@/src/components/Shared';

const WaIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.56 4.136 1.541 5.869L0 24l6.303-1.519A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.774 9.774 0 0 1-5.016-1.381l-.36-.214-3.741.901.957-3.638-.234-.374A9.769 9.769 0 0 1 2.182 12C2.182 6.566 6.566 2.182 12 2.182S21.818 6.566 21.818 12 17.434 21.818 12 21.818z" />
  </svg>
);

const PLAN_LIST = [
  "Canais ao vivo, filmes e séries",
  "Full HD e 4K*",
  "Smart TV, TV Box, celular e computador",
  "Suporte humano no WhatsApp",
  "Sem fidelidade",
];

const FAQ_ITEMS = [
  { q: "Preciso de antena ou instalação?",         a: "Não. Funciona pela internet, no aparelho que você já tem." },
  { q: "Tem fidelidade ou multa?",                 a: "Não. Você paga pelo período escolhido e renova se quiser." },
  { q: "Posso ver funcionando antes de pagar?",    a: "Sim. Fale com o atendente e peça uma demonstração antes de pagar." },
  { q: "Em quanto tempo começo a assistir?",       a: "Depois da confirmação do pagamento, o acesso é liberado em poucos minutos e o atendente ajuda na configuração." },
  { q: "Quais as formas de pagamento?",            a: "Pix e cartão de crédito." },
  { q: "Em quantas telas posso usar?",             a: "Consulte o atendente para confirmar o número de telas do seu plano." },
  { q: "Funciona na minha TV?",                    a: "Funciona em Smart TV, TV Box, celular e computador. Na dúvida, chame o atendente e informe o modelo." },
  { q: "E se eu me arrepender?",                   a: "Você tem 7 dias a partir da compra para desistir, conforme o Código de Defesa do Consumidor. Fale com o atendente para solicitar o reembolso." },
  { q: "Qual o horário de atendimento?",           a: "Todos os dias, das 9h às 21h." },
];

export function ComprarPage() {
  const waGeral      = getWhatsAppLink("Olá! Quero assinar. Pode me ajudar a escolher o plano?", "COMPRA");
  const waAnual      = getWhatsAppLink("Olá! Quero assinar o plano Anual (R$ 250).", "COMPRA");
  const waSemestral  = getWhatsAppLink("Olá! Quero assinar o plano Semestral (R$ 150).", "COMPRA");
  const waTrimestral = getWhatsAppLink("Olá! Quero assinar o plano Trimestral (R$ 90).", "COMPRA");
  const waMensal     = getWhatsAppLink("Olá! Quero assinar o plano Mensal (R$ 35).", "COMPRA");

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen text-gray-900 pb-20 md:pb-0">
      {/* ── 1. BARRA DO TOPO ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1120px] mx-auto px-5 h-[72px] flex items-center justify-between">
          <Logo />
          <a href={waGeral} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-colors whitespace-nowrap">
            <WaIcon size={16} />
            Assinar pelo WhatsApp
          </a>
        </div>
      </header>
      {/* ── 2. PRIMEIRA TELA ── */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1120px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 md:gap-12 items-center">
          <div className="flex flex-col gap-5">
            <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3.5 py-1.5 rounded-full w-fit">
              Planos a partir de R$&nbsp;35/mês
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
              Canais ao vivo, filmes e séries em um só plano
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Assista na Smart TV, TV Box, celular ou computador. Sem antena, sem técnico e sem fidelidade.
            </p>
            <div className="flex flex-col gap-3">
              <a href="#planos" className="flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl text-base md:text-lg font-bold transition-colors min-h-[52px]">
                Ver planos e assinar
              </a>
              <a href={waGeral} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2.5 bg-white hover:bg-green-50 text-green-600 border-2 border-green-600 px-6 py-4 rounded-xl text-base md:text-lg font-bold transition-colors min-h-[52px]">
                <WaIcon size={20} />
                Falar com um atendente
              </a>
            </div>
            <div className="flex flex-wrap gap-4 pt-1">
              {["Sem fidelidade", "Full HD e 4K*", "Suporte humano no WhatsApp"].map(s => (
                <span key={s} className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                  <Check size={15} className="text-green-600 shrink-0" strokeWidth={2.5} />
                  {s}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400">*A qualidade da imagem depende da sua internet.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 aspect-[4/3]">
            <img src="/images/familia-tv.jpg" alt="Família assistindo TV na sala" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
      {/* ── 3. PLANOS ── */}
      <section id="planos" className="bg-[#F6F7F9] py-14 md:py-20">
        <div className="max-w-[1120px] mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Escolha seu plano</h2>
            <p className="text-base text-gray-600">Todos os planos têm o mesmo conteúdo. Quanto maior o período, menor o preço por mês.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Anual — destaque, primeiro no mobile */}
            <div className="bg-white border-2 border-blue-600 rounded-2xl p-6 flex flex-col relative shadow-sm order-first md:order-last">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-100 text-blue-700 text-[11px] font-extrabold px-4 py-1 rounded-full whitespace-nowrap">
                Melhor preço por mês
              </span>
              <div className="text-sm font-bold text-gray-500 mt-2 mb-1">Anual</div>
              <div className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">R$&nbsp;250</div>
              <div className="text-sm text-gray-500 mb-6">equivale a R$&nbsp;20,83 por mês &mdash; <span className="text-blue-700 font-bold">economia de 40%</span></div>
              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {PLAN_LIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <Check size={15} className="text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />{item}
                  </li>
                ))}
              </ul>
              <a href={waAnual} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl text-sm font-bold transition-colors">
                <WaIcon size={16} />Assinar o Anual
              </a>
            </div>
            {/* Mensal */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col relative shadow-sm order-last md:order-first">
              <div className="text-sm font-bold text-gray-500 mb-1">Mensal</div>
              <div className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">R$&nbsp;35</div>
              <div className="text-sm text-gray-500 mb-6">pague mês a mês</div>
              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {PLAN_LIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <Check size={15} className="text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />{item}
                  </li>
                ))}
              </ul>
              <a href={waMensal} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-green-600 border-2 border-green-600 py-3.5 rounded-xl text-sm font-bold transition-colors">
                <WaIcon size={16} />Assinar o Mensal
              </a>
            </div>
            {/* Trimestral */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col relative shadow-sm order-last md:order-[2]">
              <div className="text-sm font-bold text-gray-500 mb-1">Trimestral</div>
              <div className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">R$&nbsp;90</div>
              <div className="text-sm text-gray-500 mb-6">equivale a R$&nbsp;30 por mês</div>
              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {PLAN_LIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <Check size={15} className="text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />{item}
                  </li>
                ))}
              </ul>
              <a href={waTrimestral} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-green-600 border-2 border-green-600 py-3.5 rounded-xl text-sm font-bold transition-colors">
                <WaIcon size={16} />Assinar o Trimestral
              </a>
            </div>
            {/* Semestral */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col relative shadow-sm order-last md:order-[3]">
              <div className="text-sm font-bold text-gray-500 mb-1">Semestral</div>
              <div className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">R$&nbsp;150</div>
              <div className="text-sm text-gray-500 mb-6">equivale a R$&nbsp;25 por mês</div>
              <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                {PLAN_LIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <Check size={15} className="text-green-600 shrink-0 mt-0.5" strokeWidth={2.5} />{item}
                  </li>
                ))}
              </ul>
              <a href={waSemestral} target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-green-600 border-2 border-green-600 py-3.5 rounded-xl text-sm font-bold transition-colors">
                <WaIcon size={16} />Assinar o Semestral
              </a>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-5">Formas de pagamento: Pix e cartão de crédito.</p>
        </div>
      </section>
      {/* ── 4. COMO ASSINAR EM 3 PASSOS ── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1120px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">Como assinar em 3 passos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { n: 1, title: "Escolha o plano e toque em \"Assinar\"", desc: "Você fala direto com um atendente no WhatsApp." },
              { n: 2, title: "Confira funcionando", desc: "Antes de pagar, peça ao atendente uma demonstração para ver funcionando na sua TV." },
              { n: 3, title: "Pague e assista", desc: "Depois do pagamento, seu acesso é ativado e o atendente ajuda na instalação." },
            ].map(step => (
              <div key={step.n} className="flex flex-col gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white text-xl font-extrabold flex items-center justify-center shrink-0">{step.n}</div>
                <h3 className="text-base md:text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 5. UMA ALTERNATIVA SIMPLES ── */}
      <section className="bg-[#F6F7F9] py-14 md:py-20">
        <div className="max-w-[1120px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">Uma alternativa simples à TV por assinatura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: (<svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/><line x1="3" y1="3" x2="21" y2="21"/></svg>), title: "Canais fechados sem antena", desc: "Canais ao vivo pela internet, sem parabólica, sem cabo e sem visita de técnico." },
              { icon: (<svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><polygon points="10,8 16,11 10,14" fill="currentColor" stroke="none"/></svg>), title: "Streaming completo", desc: "Filmes, séries e canais ao vivo num pacote só, em vez de pagar várias assinaturas." },
              { icon: (<svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>), title: "Na sua Smart TV ou TV Box", desc: "Funciona no aparelho que você já tem, e também no celular e no computador." },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
                {card.icon}
                <h3 className="text-base md:text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 6. FUNCIONA ONDE VOCÊ QUISER ── */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1120px] mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">Funciona onde você quiser</h2>
          <div className="flex flex-wrap gap-8 md:gap-12 justify-center mb-10">
            {[
              { label: "Smart TV", icon: <svg className="w-10 h-10 text-blue-600 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
              { label: "TV Box", icon: <svg className="w-10 h-10 text-blue-600 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M9 6V4M15 6V4M12 18v2"/></svg> },
              { label: "Celular", icon: <svg className="w-10 h-10 text-blue-600 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18v.01"/></svg> },
              { label: "Computador", icon: <svg className="w-10 h-10 text-blue-600 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M2 17h20M12 17v3M8 20h8"/></svg> },
            ].map(d => (
              <div key={d.label} className="text-sm font-semibold text-gray-700">{d.icon}{d.label}</div>
            ))}
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 max-w-xl mx-auto text-sm text-gray-600">
            <strong className="text-gray-900">Internet recomendada:</strong> 10 Mbps para Full HD e 25 Mbps para 4K.
          </div>
        </div>
      </section>
      {/* ── 7. PERGUNTAS FREQUENTES ── */}
      <section className="bg-[#F6F7F9] py-14 md:py-20">
        <div className="max-w-[760px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Perguntas frequentes</h2>
          <div className="divide-y divide-gray-200">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left bg-transparent border-0">
                  <span className="text-base font-bold text-gray-900">{item.q}</span>
                  <span className="text-blue-600 text-2xl font-light leading-none shrink-0 select-none">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="pb-5 text-sm md:text-base text-gray-600">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── 8. CHAMADA FINAL ── */}
      <section className="bg-blue-600 py-16 md:py-20 text-center px-5">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">Pronto para assistir?</h2>
          <p className="text-base md:text-lg text-blue-100 mb-8">Escolha seu plano e fale com um atendente agora.</p>
          <a href={waGeral} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-base md:text-lg font-bold transition-colors">
            <WaIcon size={22} />Assinar pelo WhatsApp
          </a>
        </div>
      </section>
      {/* ── 9. RODAPÉ ── */}
      <footer className="bg-gray-800 py-12 px-5">
        <div className="max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Filmes My View</p>
            <p className="text-xs text-gray-500 leading-relaxed">Atendimento: todos os dias, das 9h às 21h.</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Links</p>
            <div className="flex flex-col gap-1.5">
              <a href="/privacidade" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Política de Privacidade</a>
              <a href="/termos"      className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Termos de Uso</a>
              <a href="/aviso-legal" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Aviso Legal</a>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 leading-relaxed">© 2026 Filmes My View. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      {/* ── 10. BARRA FIXA CELULAR ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center justify-between gap-3 md:hidden z-50">
        <div className="text-xs text-gray-600 font-semibold leading-tight">
          A partir de <span className="text-gray-900 font-extrabold text-sm">R$&nbsp;35/mês</span>
        </div>
        <a href="#planos" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap">
          Assinar
        </a>
      </div>
    </div>
  );
}

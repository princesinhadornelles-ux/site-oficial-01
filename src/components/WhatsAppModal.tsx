import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_MODAL_CONFIG } from '@/src/constants';
import { registrarModalWhatsApp, concluirEtapaWhatsApp, type AlvoWhatsApp } from '@/src/gestauto/mkt';

/**
 * Máscara amigável: (DD) 99999-9999 para números brasileiros; "+" no início
 * permite números internacionais (até 15 dígitos).
 */
export function formatarTelefone(valor: string): string {
  const internacional = valor.trim().startsWith('+');
  let d = valor.replace(/\D/g, '');
  if (!internacional && d.length > 11) return formatarTelefone('+' + d);
  if (internacional) {
    d = d.slice(0, 15);
    if (d.startsWith('55') && d.length > 2) return '+55 ' + formatarBR(d.slice(2, 13));
    return '+' + d;
  }
  return formatarBR(d.slice(0, 11));
}

function formatarBR(d: string): string {
  if (!d) return '';
  if (d.length <= 2) return '(' + d;
  const ddd = d.slice(0, 2);
  const n = d.slice(2);
  if (n.length <= 4) return `(${ddd}) ${n}`;
  if (d.length <= 10) return `(${ddd}) ${n.slice(0, 4)}-${n.slice(4)}`;
  return `(${ddd}) ${n.slice(0, 5)}-${n.slice(5)}`;
}

/**
 * Regra interna do site para telefone OBRIGATÓRIO: exige um número completo e plausível.
 * Sem "+", 10 ou 11 dígitos são tratados como brasileiros (DDD + número).
 * (O que vai para o GestAuto continua sendo o texto digitado; ver concluirEtapaWhatsApp.)
 */
export function telefoneCompleto(valor: string): boolean {
  const internacional = valor.trim().startsWith('+');
  let d = valor.replace(/\D/g, '');
  if (!internacional && (d.length === 10 || d.length === 11)) d = '55' + d;
  if (d.startsWith('55') && (internacional || d.length >= 12)) {
    const n = d.slice(2);
    if (!/^[1-9]{2}/.test(n)) return false;
    const assinante = n.slice(2);
    if (/^(\d)\1+$/.test(assinante)) return false;
    if (n.length === 11 && assinante[0] === '9') return true;
    if (n.length === 10 && /^[2-5]/.test(assinante)) return true;
    return false;
  }
  if (!internacional) return false;
  return d.length >= 8 && d.length <= 15 && d[0] !== '0';
}

type Erros = { nome?: string; telefone?: string };
type Etapa = { alvo: AlvoWhatsApp; ref: string | null };

export function WhatsAppModal() {
  const [etapa, setEtapa] = React.useState<Etapa | null>(null);
  const [nome, setNome] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [erros, setErros] = React.useState<Erros>({});
  const primeiroCampo = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    registrarModalWhatsApp((alvo, ref) => { setErros({}); setEtapa({ alvo, ref }); });
    return () => registrarModalWhatsApp(null);
  }, []);

  const aberto = etapa !== null;

  React.useEffect(() => {
    if (!aberto) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const aoTeclar = (e: KeyboardEvent) => { if (e.key === 'Escape') setEtapa(null); };
    document.addEventListener('keydown', aoTeclar);
    // Foco automático só com mouse/teclado: no celular o teclado não abre sozinho por cima do botão.
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) primeiroCampo.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberto]);

  if (!etapa) return null;

  const cfg = WHATSAPP_MODAL_CONFIG;
  const mostraNome = cfg.modelo === 1;
  const nomeObrigatorio = mostraNome && cfg.nomeObrigatorio;
  const telefoneObrigatorio = cfg.telefoneObrigatorio;
  const tudoOpcional = !nomeObrigatorio && !telefoneObrigatorio;

  function fechar() {
    setEtapa(null);
  }

  // Chamado dentro do clique/envio do visitante: permite abrir a nova aba sem bloqueio.
  // O nome nunca é repassado: só o telefone (como digitado) ou null.
  function seguir(tel: string | null) {
    const { alvo, ref } = etapa!;
    setEtapa(null);
    concluirEtapaWhatsApp(alvo, ref, tel);
  }

  function confirmar(e: React.FormEvent) {
    e.preventDefault();
    const novos: Erros = {};
    if (nomeObrigatorio && nome.trim() === '') novos.nome = 'Informe seu nome.';
    const vazio = telefone.replace(/\D/g, '') === '';
    if (telefoneObrigatorio) {
      if (vazio) novos.telefone = 'Informe seu WhatsApp com DDD.';
      else if (!telefoneCompleto(telefone)) novos.telefone = 'Número inválido. Use (DDD) 99999-9999.';
    }
    setErros(novos);
    if (novos.nome || novos.telefone) return;
    seguir(vazio ? null : telefone.trim());
  }

  function aoDigitarTelefone(e: React.ChangeEvent<HTMLInputElement>) {
    let valor = e.target.value;
    const apagando = String((e.nativeEvent as InputEvent).inputType || '').startsWith('delete');
    // Ao apagar (backspace) um caractere da máscara, apaga também o dígito anterior.
    if (apagando && valor.length < telefone.length && valor.replace(/\D/g, '') === telefone.replace(/\D/g, '')) {
      const d = valor.replace(/\D/g, '').slice(0, -1);
      valor = (valor.trim().startsWith('+') ? '+' : '') + d;
    }
    setTelefone(formatarTelefone(valor));
    if (erros.telefone) setErros((x) => ({ ...x, telefone: undefined }));
  }

  const campo = 'w-full rounded-lg border bg-white px-3 py-2.5 text-base text-brand-primary placeholder:text-slate-400 outline-none transition-smooth focus:ring-2';
  const campoOk = 'border-slate-300 focus:border-brand-success focus:ring-green-100';
  const campoErro = 'border-red-400 focus:border-red-500 focus:ring-red-100';

  const indicador = (obrigatorio: boolean) => obrigatorio
    ? <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
    : <span className="ml-1 text-xs font-normal text-slate-400">(opcional)</span>;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start sm:items-center justify-center overflow-y-auto bg-slate-900/60 px-4 pt-[8vh] pb-6 sm:py-6"
      onMouseDown={(e) => { if (e.target === e.currentTarget) fechar(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-modal-titulo"
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-smooth"
        >
          <X size={18} />
        </button>

        <div className="mb-5 flex items-center gap-3 pr-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-brand-success">
            <MessageCircle size={20} />
          </div>
          <div>
            <h2 id="wa-modal-titulo" className="text-lg font-extrabold leading-tight text-brand-primary">{cfg.titulo}</h2>
            {cfg.subtitulo && <p className="mt-0.5 text-sm text-slate-500">{cfg.subtitulo}</p>}
          </div>
        </div>

        <form onSubmit={confirmar} noValidate className="flex flex-col gap-4">
          {mostraNome && (
            <div>
              <label htmlFor="wa-modal-nome" className="mb-1 block text-sm font-semibold text-slate-700">
                {cfg.rotuloNome}{indicador(nomeObrigatorio)}
              </label>
              <input
                ref={primeiroCampo}
                id="wa-modal-nome"
                type="text"
                autoComplete="name"
                maxLength={80}
                placeholder={cfg.placeholderNome}
                value={nome}
                onChange={(e) => { setNome(e.target.value); if (erros.nome) setErros((x) => ({ ...x, nome: undefined })); }}
                aria-invalid={!!erros.nome}
                aria-required={nomeObrigatorio}
                className={`${campo} ${erros.nome ? campoErro : campoOk}`}
              />
              {erros.nome && <p className="mt-1 text-xs text-red-600">{erros.nome}</p>}
            </div>
          )}

          <div>
            <label htmlFor="wa-modal-telefone" className="mb-1 block text-sm font-semibold text-slate-700">
              {cfg.rotuloTelefone}{indicador(telefoneObrigatorio)}
            </label>
            <input
              ref={mostraNome ? undefined : primeiroCampo}
              id="wa-modal-telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={25}
              placeholder={cfg.placeholderTelefone}
              value={telefone}
              onChange={aoDigitarTelefone}
              aria-invalid={!!erros.telefone}
              aria-required={telefoneObrigatorio}
              className={`${campo} ${erros.telefone ? campoErro : campoOk}`}
            />
            {erros.telefone && <p className="mt-1 text-xs text-red-600">{erros.telefone}</p>}
          </div>

          <button
            type="submit"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-success px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-green-200 transition-smooth hover:brightness-105 active:scale-[0.98]"
          >
            <MessageCircle size={18} />
            {cfg.textoBotao}
          </button>

          {tudoOpcional && (
            <button
              type="button"
              onClick={() => seguir(null)}
              className="-mt-1 text-sm text-slate-500 underline underline-offset-2 hover:text-slate-700"
            >
              {cfg.textoContinuarSemPreencher}
            </button>
          )}

          <p className="text-center text-[11px] leading-snug text-slate-400">
            {cfg.textoFinalidade}{' '}
            <a href="/privacidade" target="_blank" rel="noopener" className="underline hover:text-slate-600">
              Política de Privacidade
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

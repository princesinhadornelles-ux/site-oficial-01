/**
 * GestAuto — MARKETING → PIXELS & CAMPANHAS — integração do site (modo PADRÃO).
 *
 * Implementa o contrato API_PIXELS_CAMPANHAS_INTEGRACAO_UNIVERSAL_SITES_V1 (Anexo A):
 * - na carga da página, guarda gclid/gbraid/wbraid, campanha e UTMs por 30 dias;
 * - no clique de um link de WhatsApp, pede a referência ao GestAuto (orçamento de 1,5 s)
 *   e a coloca na última linha da mensagem;
 * - fail-open: o WhatsApp abre sempre, com ou sem referência.
 *
 * Este arquivo é importado antes do React (src/main.tsx) para capturar a URL de chegada
 * e registrar o ouvinte de clique antes dos demais.
 *
 * Modal de pré-atendimento (WHATSAPP_MODAL_CONFIG em src/constants.ts): quando ativo, aparece em todo
 * clique de WhatsApp, com ou sem referência. O clique primeiro tenta obter a referência (se o GestAuto
 * estiver ativo) e então mostra o modal; os botões do modal chamam concluirEtapaWhatsApp(). O telefone
 * só vai ao GestAuto (/ref/telefone, contrato AÇÃO 011-A) quando há referência válida.
 */
import { GESTAUTO_CFG } from './config';
import { WHATSAPP_MODAL_CONFIG } from '../constants';

const CFG = GESTAUTO_CFG;
const CLIENTE_VERSAO = 'site-snippet/3.0.0';
const CLIENTE_VERSAO_TELEFONE = 'site-snippet/3.1.0';
const SS_TEL_OFF = 'gestauto_mkt_v3_tel_off';
const LS = 'gestauto_mkt_v3';
const SS = 'gestauto_mkt_v3_reuso';
const OPT = 'gestauto_mkt_optout';
const D30 = 30 * 24 * 3600 * 1000;
const REUSO_MAX = 30 * 60 * 1000;
const ORC = 1500;
const SELETOR = 'a[href*="wa.me/"],a[href*="api.whatsapp.com/send"],[data-gestauto-wa]';

type Clique = { tipo: 'gclid' | 'gbraid' | 'wbraid'; valor: string };
type Utm = Record<'source' | 'medium' | 'campaign' | 'content' | 'term', string | null>;
type Origem = { id: Clique | null; cmp: string | null; utm: Utm; em: number };

function configValida(): boolean {
  const baseOk =
    /^https:\/\/[^/\s?#]+$/i.test(CFG.base) ||
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(CFG.base);
  return (
    baseOk &&
    /^pk_mkt_[0-9a-z]{8,40}$/.test(CFG.siteKey) &&
    /^[A-HJKMNP-TV-Z]{2,6}$/.test(CFG.prefixo) &&
    (CFG.ambiente === 'HOMOLOGACAO' || CFG.ambiente === 'PRODUCAO')
  );
}

let mem: Origem | null = null;
let emVoo = false;
const RE_REF = new RegExp('^Refer\\u00eancia: ' + CFG.prefixo + '-[0-9A-HJKMNP-TV-Z]{11}$');

function lsGet(k: string): any {
  try { return JSON.parse(localStorage.getItem(k) as string); } catch { return null; }
}
function lsSet(k: string, v: Origem) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch { mem = v; }
}
function lsDel(k: string) {
  try { localStorage.removeItem(k); } catch { /* sem localStorage */ }
  mem = null;
}
function optout(): boolean {
  try { return localStorage.getItem(OPT) === '1'; } catch { return false; }
}
function desligado(): boolean {
  const d = document.documentElement;
  const b = document.body;
  return !!((d && d.hasAttribute('data-gestauto-off')) || (b && b.hasAttribute('data-gestauto-off')));
}
function dig(s: string | null | undefined): string {
  return (s || '').replace(/\D/g, '');
}
function uuid(): string {
  try { if (crypto && crypto.randomUUID) return crypto.randomUUID(); } catch { /* fallback abaixo */ }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 3) | 8).toString(16);
  });
}
function caminhoSeguro(p: string): string {
  p = (p || '/').slice(0, 200);
  return /@|[0-9a-f]{16,}|[A-Za-z0-9_\-]{24,}|\d{6,}/i.test(p) ? '/' : p;
}

function origemValida(o: any): o is Origem {
  if (!o || typeof o !== 'object' || typeof o.em !== 'number' || !isFinite(o.em)) return false;
  if (o.id !== null && !(o.id && ['gclid', 'gbraid', 'wbraid'].includes(o.id.tipo) &&
      typeof o.id.valor === 'string' && o.id.valor.length > 0 && o.id.valor.length <= 512)) return false;
  if (o.cmp !== null && !(typeof o.cmp === 'string' && /^\d{1,20}$/.test(o.cmp))) return false;
  return !!o.utm && typeof o.utm === 'object';
}

function origem(): Origem | null {
  const o = lsGet(LS) || mem;
  if (!o) return null;
  if (!origemValida(o) || Date.now() - o.em > D30 || optout()) { lsDel(LS); return null; }
  return o;
}

function capturar() {
  if (optout()) { lsDel(LS); return; }
  const q = new URLSearchParams(location.search);
  let id: Clique | null = null;
  for (const t of ['gclid', 'gbraid', 'wbraid'] as const) {
    const v = (q.get(t) || '').trim();
    if (v && v.length <= 512) { id = { tipo: t, valor: v }; break; }
  }
  const c = (q.get('gad_campaignid') || q.get('gestauto_cid') || '').trim();
  const cmp = /^\d{1,20}$/.test(c) ? c : null;
  const utm = {} as Utm;
  let temUtm = false;
  (['source', 'medium', 'campaign', 'content', 'term'] as const).forEach((k) => {
    const v = q.get('utm_' + k);
    utm[k] = v && v.length <= 150 ? v : null;
    if (utm[k]) temUtm = true;
  });
  const atual = origem();
  if (id) lsSet(LS, { id, cmp, utm, em: Date.now() });
  else if (!(atual && atual.id) && (cmp || temUtm)) lsSet(LS, { id: null, cmp, utm, em: Date.now() });
}

function chaveReuso(o: Origem | null): string {
  return [
    'v3', CFG.prefixo, CFG.siteKey,
    (o && o.cmp) || '-',
    o && o.id ? o.id.tipo + ':' + o.id.valor : '-',
    CFG.ambiente, 'legitimo_interesse',
  ].join('|');
}

export type AlvoWhatsApp = { numero: string; texto: string; novaAba: boolean; contexto: string | null };

function resolver(a: HTMLElement): AlvoWhatsApp | null {
  let u: URL | null = null;
  const href = a.getAttribute('href');
  if (href) { try { u = new URL(href, location.href); } catch { u = null; } }
  let numero = dig(a.dataset.numero);
  let texto: string | null = a.dataset.texto || null;
  if (u && /(^|\.)wa\.me$/i.test(u.hostname)) {
    const seg = u.pathname.split('/')[1] || '';
    if (!numero && /^\d+$/.test(seg)) numero = seg;
    if (texto === null) texto = u.searchParams.get('text');
  } else if (u && /(^|\.)api\.whatsapp\.com$/i.test(u.hostname)) {
    if (!numero) numero = dig(u.searchParams.get('phone'));
    if (texto === null) texto = u.searchParams.get('text');
  }
  if (!numero || numero.length < 8 || numero.length > 15) return null;
  const ctx = a.dataset.gestautoContexto || '';
  return {
    numero,
    texto: texto || '',
    novaAba: a.getAttribute('target') === '_blank',
    contexto: /^[a-z0-9_]{1,50}$/.test(ctx) ? ctx : null,
  };
}

/** GestAuto em uso neste clique: configuração válida, sem kill switch e sem oposição do visitante. */
function gestautoAtivo(): boolean {
  return configValida() && !desligado() && !optout();
}

/** Reutiliza (até 30 min) ou pede ao GestAuto a referência. Devolve o texto "Referência: …" ou null. */
async function obterReferencia(contexto: string | null): Promise<string | null> {
  const o = origem();
  const k = chaveReuso(o);
  let r: { k: string; txt: string; ate: number } | null = null;
  try { r = JSON.parse(sessionStorage.getItem(SS) || 'null'); } catch { /* sem sessionStorage */ }
  if (r && r.k === k && Date.now() < r.ate && RE_REF.test(r.txt)) return r.txt;

  const limite = Date.now() + ORC;
  let refHost: string | null = null;
  try { refHost = document.referrer ? new URL(document.referrer).host : null; } catch { /* referrer inválido */ }
  // Serializado uma única vez: a retentativa reenvia os mesmos bytes com a mesma idempotency_key.
  const corpo = JSON.stringify({
    versao: '3',
    site_key: CFG.siteKey,
    idempotency_key: uuid(),
    cliente_versao: CLIENTE_VERSAO,
    pagina: { caminho: caminhoSeguro(location.pathname), referrer_host: refHost },
    clique: o && o.id ? { tipo: o.id.tipo, valor: o.id.valor, capturado_em: new Date(o.em).toISOString() } : null,
    google_campaign_id: (o && o.cmp) || null,
    utm: (o && o.utm) || null,
    contexto,
    consentimento: { base: 'legitimo_interesse', fonte: 'nenhum', optout: false },
  });

  for (let i = 0; i < 2; i++) {
    const resta = limite - Date.now();
    if (resta <= 0 || (i === 1 && resta < 300)) break;
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), i === 0 ? Math.min(1000, resta) : resta);
    try {
      const resp = await fetch(CFG.base + '/api/v1/public/v3/ref', {
        method: 'POST',
        credentials: 'omit',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: corpo,
        signal: ctrl.signal,
      });
      if (resp.status === 201 || resp.status === 200) {
        let j: any = null;
        try { j = await resp.json(); } catch { j = null; }
        if (j && j.instancia === CFG.prefixo && typeof j.texto_referencia === 'string' && RE_REF.test(j.texto_referencia)) {
          const ate = Math.min(Date.now() + REUSO_MAX, Date.parse(j.reutilizavel_ate || j.expira_em) || 0);
          try { sessionStorage.setItem(SS, JSON.stringify({ k, txt: j.texto_referencia, ate })); } catch { /* sem sessionStorage */ }
          return j.texto_referencia;
        }
        return null;
      }
      // 4xx (inclui 429) e 501: sem retentativa.
      if (resp.status < 500 || resp.status === 501) return null;
    } catch {
      /* rede ou timeout: uma retentativa se couber no orçamento */
    } finally {
      clearTimeout(t);
    }
  }
  return null;
}

// ---------------------------------------------------------------------------------------------
// Etapa opcional de telefone (CONTRATO_API_TELEFONE_OPCIONAL / AÇÃO 011-A).
// O telefone nunca vai para URL, localStorage, sessionStorage, cookie, console, Google ou Meta.
// ---------------------------------------------------------------------------------------------

/** Validação do site antes de enviar: só dígitos, espaço e + ( ) - . ; 8–25 caracteres; 10–15 dígitos. */
export function telefoneValido(valor: string): boolean {
  const s = valor.trim();
  if (s.length < 8 || s.length > 25 || !/^[0-9 +().\-]+$/.test(s)) return false;
  const d = s.replace(/\D/g, '').length;
  return d >= 10 && d <= 15;
}

let telefoneDesligado = false;
function etapaTelefoneDesligada(): boolean {
  if (telefoneDesligado) return true;
  try { return sessionStorage.getItem(SS_TEL_OFF) === '1'; } catch { return false; }
}
function marcarEtapaTelefoneDesligada() {
  telefoneDesligado = true;
  try { sessionStorage.setItem(SS_TEL_OFF, '1'); } catch { /* sem sessionStorage */ }
}

// Referências que já receberam este telefone nesta visita (somente em memória; evita chamada repetida).
const telefonePorReferencia = new Map<string, string>();

/**
 * POST /api/v1/public/v3/ref/telefone — "dispare e esqueça": orçamento de 1,5 s, keepalive,
 * no máximo 1 retentativa (só 503 ou rede) com os mesmos bytes e a mesma idempotency_key.
 * Nenhum resultado bloqueia ou altera a abertura do WhatsApp.
 */
function enviarTelefone(textoRef: string, telefone: string) {
  const referencia = textoRef.replace(/^Referência: /, '');
  if (telefonePorReferencia.get(referencia) === telefone) return;
  telefonePorReferencia.set(referencia, telefone);
  const corpo = JSON.stringify({
    versao: '3',
    site_key: CFG.siteKey,
    idempotency_key: uuid(),
    referencia,
    telefone,
    cliente_versao: CLIENTE_VERSAO_TELEFONE,
    consentimento: { base: 'legitimo_interesse', fonte: 'formulario', optout: false, telefone_autodeclarado: true },
  });
  const limite = Date.now() + ORC;
  (async () => {
    for (let i = 0; i < 2; i++) {
      const resta = limite - Date.now();
      if (resta <= 0 || (i === 1 && resta < 300)) break;
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), i === 0 ? Math.min(1000, resta) : resta);
      try {
        const resp = await fetch(CFG.base + '/api/v1/public/v3/ref/telefone', {
          method: 'POST',
          credentials: 'omit',
          mode: 'cors',
          keepalive: true,
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: corpo,
          signal: ctrl.signal,
        });
        const st = resp.status;
        if (st === 202 || st === 204) return;
        if (st === 404) { marcarEtapaTelefoneDesligada(); break; }
        if ([400, 401, 403, 413, 415, 422].includes(st)) {
          // Aviso técnico sem o telefone.
          console.warn('[GestAuto] /ref/telefone respondeu ' + st + '.');
          break;
        }
        if (st !== 503) break; // 429 e demais: não repetir
      } catch {
        /* rede ou timeout: uma retentativa se couber no orçamento */
      } finally {
        clearTimeout(t);
      }
    }
    telefonePorReferencia.delete(referencia);
  })();
}

function montarLink(alvo: AlvoWhatsApp, ref: string | null): string {
  const base = alvo.texto;
  const msg = ref ? (base ? base + '\n' + ref : ref) : base;
  return 'https://wa.me/' + alvo.numero + (msg ? '?text=' + encodeURIComponent(msg) : '');
}

/** Pré-abre a nova aba (opener nulo) quando o botão original abria em nova aba. */
function preAbrir(novaAba: boolean): Window | null {
  if (!novaAba) return null;
  try { const w = window.open('', '_blank'); if (w) w.opener = null; return w; } catch { return null; }
}

/** Leva a aba pré-aberta ao link; se ela não existir (bloqueada ou fechada), abre na mesma aba. */
function irPara(link: string, destino: Window | null) {
  if (destino && !destino.closed) {
    try { destino.location.href = link; return; } catch { /* segue para a mesma aba */ }
  }
  location.href = link;
}

/** Fluxo sem a etapa de telefone (o mesmo de antes): pré-abertura síncrona + referência em até 1,5 s. */
async function abrir(alvo: AlvoWhatsApp) {
  let destino: Window | null = null;
  let ref: string | null = null;
  try {
    destino = preAbrir(alvo.novaAba);
    ref = await obterReferencia(alvo.contexto);
  } catch {
    /* qualquer falha: segue sem referência */
  } finally {
    emVoo = false;
    irPara(montarLink(alvo, ref), destino);
  }
}

// Abertura do modal de pré-atendimento, registrada pelo componente WhatsAppModal.
// ref: o texto "Referência: …" quando o GestAuto devolveu uma; null quando não há (GestAuto
// desligado, fora do ar, oposição do visitante). O modal aparece nos dois casos (decisão do site).
type AbridorModal = (alvo: AlvoWhatsApp, ref: string | null) => void;
let abridorModal: AbridorModal | null = null;

export function registrarModalWhatsApp(fn: AbridorModal | null) {
  abridorModal = fn;
}

// Modal aberto e ainda não concluído: cada modal abre o WhatsApp uma única vez (trava contra clique duplo).
let etapaPendente: AlvoWhatsApp | null = null;

/** Fluxo com o modal: 1) referência, se o GestAuto estiver ativo (até 1,5 s); 2) modal sempre. */
async function abrirComModal(alvo: AlvoWhatsApp) {
  let ref: string | null = null;
  if (gestautoAtivo()) {
    try { ref = await obterReferencia(alvo.contexto); } catch { ref = null; }
  }
  emVoo = false;
  if (abridorModal) {
    etapaPendente = alvo;
    abridorModal(alvo, ref);
    return;
  }
  irPara(montarLink(alvo, ref), preAbrir(alvo.novaAba));
}

/**
 * Chamado pelos botões do modal, dentro do clique do visitante (não perde o gesto).
 * telefone: exatamente o que o visitante digitou, ou null. O nome nunca chega aqui.
 * O telefone só vai ao GestAuto com referência válida, GestAuto ativo (sem oposição),
 * recurso de telefone não desligado (404) e formato aceito pelo contrato.
 * O WhatsApp abre sempre, com a referência quando houver.
 */
export function concluirEtapaWhatsApp(alvo: AlvoWhatsApp, ref: string | null, telefone: string | null) {
  if (etapaPendente !== alvo) return;
  etapaPendente = null;
  if (ref && telefone && telefoneValido(telefone) && gestautoAtivo() && !etapaTelefoneDesligada()) {
    try { enviarTelefone(ref, telefone.trim()); } catch { /* nunca impede a abertura */ }
  }
  irPara(montarLink(alvo, ref), preAbrir(alvo.novaAba));
}

function aoClicar(ev: MouseEvent) {
  const comModal = WHATSAPP_MODAL_CONFIG.ativo && !!abridorModal;
  // Sem modal e sem GestAuto ativo (config inválida, kill switch ou oposição): o link funciona como sempre.
  if (!comModal && !gestautoAtivo()) return;
  const el = ev.target as Element | null;
  const a = el && el.closest ? (el.closest(SELETOR) as HTMLElement | null) : null;
  if (!a || ev.defaultPrevented || ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
  const alvo = resolver(a);
  if (!alvo) return;
  ev.preventDefault();
  if (emVoo) return;
  emVoo = true;
  if (comModal) abrirComModal(alvo);
  else abrir(alvo);
}

if (typeof window !== 'undefined') {
  if (configValida()) {
    try { capturar(); } catch { /* a captura nunca pode quebrar o site */ }
  } else if (CFG.base || CFG.siteKey || CFG.prefixo || CFG.ambiente) {
    // Configuração preenchida mas inválida: a integração fica desligada (links funcionam como antes).
    console.warn('[GestAuto] Configuração inválida em src/gestauto/config.ts: integração desligada.');
  }
  // Um único ouvinte para o GestAuto e para o modal; sem nenhum dos dois ativos, não interfere no clique.
  document.addEventListener('click', aoClicar, false);
}

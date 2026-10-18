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
 */
import { GESTAUTO_CFG } from './config';

const CFG = GESTAUTO_CFG;
const CLIENTE_VERSAO = 'site-snippet/3.0.0';
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

function resolver(a: HTMLElement) {
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

async function abrir(numero: string, base: string, novaAba: boolean, contexto: string | null) {
  let destino: Window | null = null;
  let ref: string | null = null;
  try {
    if (novaAba) {
      try { destino = window.open('', '_blank'); if (destino) destino.opener = null; } catch { destino = null; }
    }
    const o = origem();
    const k = chaveReuso(o);
    let r: { k: string; txt: string; ate: number } | null = null;
    try { r = JSON.parse(sessionStorage.getItem(SS) || 'null'); } catch { /* sem sessionStorage */ }
    if (r && r.k === k && Date.now() < r.ate && RE_REF.test(r.txt)) { ref = r.txt; return; }

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
            ref = j.texto_referencia;
            const ate = Math.min(Date.now() + REUSO_MAX, Date.parse(j.reutilizavel_ate || j.expira_em) || 0);
            try { sessionStorage.setItem(SS, JSON.stringify({ k, txt: ref, ate })); } catch { /* sem sessionStorage */ }
          }
          break;
        }
        // 4xx (inclui 429) e 501: sem retentativa.
        if (resp.status < 500 || resp.status === 501) break;
      } catch {
        /* rede ou timeout: uma retentativa se couber no orçamento */
      } finally {
        clearTimeout(t);
      }
    }
  } catch {
    /* qualquer falha: segue sem referência */
  } finally {
    const msg = ref ? (base ? base + '\n' + ref : ref) : base;
    const link = 'https://wa.me/' + numero + (msg ? '?text=' + encodeURIComponent(msg) : '');
    emVoo = false;
    // Se a aba pré-aberta não existir mais (bloqueada ou fechada), abre na mesma aba.
    let abriu = false;
    if (destino && !destino.closed) {
      try { destino.location.href = link; abriu = true; } catch { abriu = false; }
    }
    if (!abriu) location.href = link;
  }
}

function aoClicar(ev: MouseEvent) {
  if (desligado() || optout()) return;
  const alvo = ev.target as Element | null;
  const a = alvo && alvo.closest ? (alvo.closest(SELETOR) as HTMLElement | null) : null;
  if (!a || ev.defaultPrevented || ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
  const dados = resolver(a);
  if (!dados) return;
  ev.preventDefault();
  if (emVoo) return;
  emVoo = true;
  abrir(dados.numero, dados.texto, dados.novaAba, dados.contexto);
}

if (typeof window !== 'undefined') {
  if (configValida()) {
    try { capturar(); } catch { /* a captura nunca pode quebrar o site */ }
    document.addEventListener('click', aoClicar, false);
  } else if (CFG.base || CFG.siteKey || CFG.prefixo || CFG.ambiente) {
    // Configuração preenchida mas inválida: a integração fica desligada (links funcionam como antes).
    console.warn('[GestAuto] Configuração inválida em src/gestauto/config.ts: integração desligada.');
  }
}

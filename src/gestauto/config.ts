/// <reference types="vite/client" />

/**
 * GestAuto — MARKETING → PIXELS & CAMPANHAS (modo PADRÃO)
 *
 * Preencha com os dados entregues pelo administrador do GestAuto.
 * Enquanto algum campo estiver vazio ou inválido, a integração fica DESLIGADA
 * e os botões de WhatsApp funcionam exatamente como antes.
 *
 * - BASE_URL: endereço da API da instância (não o do painel), sem barra no final.
 * - SITE_KEY: chave pública do site (pk_mkt_...). Não é segredo.
 * - PREFIXO:  prefixo das referências (2–6 letras, sem I, L, O, U).
 * - AMBIENTE: HOMOLOGACAO ou PRODUCAO.
 *
 * Nunca coloque o site_secret aqui: este arquivo vai para o navegador.
 *
 * As variáveis VITE_GESTAUTO_* (se definidas no ambiente de build) têm prioridade;
 * servem para testes locais sem editar este arquivo.
 */
const BASE_URL = 'https://api.gestauto.top';
const SITE_KEY = 'pk_mkt_2d7eae7d89bac28f46f4';
const PREFIXO = 'ADS';
const AMBIENTE = 'PRODUCAO';

// Cada variável é lida individualmente: assim o Vite embute só estas quatro no bundle.
export const GESTAUTO_CFG = {
  base: (import.meta.env.VITE_GESTAUTO_BASE_URL || BASE_URL).trim().replace(/\/+$/, ''),
  siteKey: (import.meta.env.VITE_GESTAUTO_SITE_KEY || SITE_KEY).trim(),
  prefixo: (import.meta.env.VITE_GESTAUTO_PREFIXO || PREFIXO).trim().toUpperCase(),
  ambiente: (import.meta.env.VITE_GESTAUTO_AMBIENTE || AMBIENTE).trim().toUpperCase(),
};

/**
 * Configuration for WhatsApp rotation and site constants
 */

export const WHATSAPP_POOLS = {
  TESTE: [
    "5519983880841", // ADS 0841
    "5511953738283", // ADS 8283
    "5554920031494", // ADS 1494
    "5518981550717", // ADS 0717
    "5519988741698", // ADS 1698
    "5519987508959", // ADS 8959
    "5519988792084", // ADS 2084
    "5521979358021", // ADS 8021
  ],
  COMPRA: [
    "5519983880841", // ADS 0841
    "5511953738283", // ADS 8283
    "5554920031494", // ADS 1494
    "5518981550717", // ADS 0717
    "5519988741698", // ADS 1698
    "5519987508959", // ADS 8959
    "5519988792084", // ADS 2084
    "5521979358021", // ADS 8021
  ],
  COMPLETO: [
    "5519983880841", // ADS 0841
    "5511953738283", // ADS 8283
    "5554920031494", // ADS 1494
    "5518981550717", // ADS 0717
    "5519988741698", // ADS 1698
    "5519987508959", // ADS 8959
    "5519988792084", // ADS 2084
    "5521979358021", // ADS 8021
  ],
  HOME: [
    "5519983880841", // ADS 0841
    "5511953738283", // ADS 8283
    "5554920031494", // ADS 1494
    "5518981550717", // ADS 0717
    "5519988741698", // ADS 1698
    "5519987508959", // ADS 8959
    "5519988792084", // ADS 2084
    "5521979358021", // ADS 8021
  ]
};

/**
 * Modal de pré-atendimento exibido ao clicar em qualquer botão de WhatsApp.
 * - ativo: false => nenhum modal; os botões funcionam como antes.
 * - modelo: 1 => nome + telefone | 2 => somente telefone (no modelo 2, nomeObrigatorio não tem efeito).
 * - nomeObrigatorio / telefoneObrigatorio: true = obrigatório | false = opcional.
 * O nome nunca sai do navegador. O telefone só é enviado ao GestAuto quando preenchido e válido.
 */
export const WHATSAPP_MODAL_CONFIG = {
  ativo: true,
  modelo: 2 as 1 | 2,
  nomeObrigatorio: false,
  telefoneObrigatorio: false,
  titulo: "PARABÉNS..",
  subtitulo: "Obrigado por nos escolher",
  rotuloNome: "Seu nome",
  placeholderNome: "Digite seu nome",
  rotuloTelefone: "Seu WhatsApp",
  placeholderTelefone: "(DDD) 99999-9999",
  textoBotao: "Falar No Whatsapp - Gerar Teste",
  textoContinuarSemPreencher: "QUERO CONTINUAR SEM PREENCHER",
  textoFinalidade: "Usamos seu WhatsApp somente para identificar e agilizar o seu atendimento.",
};

export const SITE_CONFIG = {
  name: "Melhor Site Para Comprar IPTV",
  email: "faleconosco@gmail.com",
  address: "Localizado na Web",
  cnpj: "***.***.***/****-**",
  description: "Filmes My View - O maior portal de compra de IPTV e P2P",
  regionTitle: "Atendimento 100% ONLINE",
  footerDisclaimer: "Venha Conferir com um teste Gratuito de 2 horas",
  copyright: "© 2026 Filmes My View - Melhor No Rank em 2026"
};

export type PoolType = keyof typeof WHATSAPP_POOLS;

/**
 * Gets the current active WhatsApp number from a specific pool based on the day.
 */
export function getActiveWhatsApp(pool: PoolType = "TESTE"): string {
  const numbers = WHATSAPP_POOLS[pool];
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = dayOfYear % numbers.length;
  return numbers[index];
}

export function getWhatsAppLink(
  message: string = "Olá, gostaria de um teste gratuito.",
  pool: PoolType = "TESTE"
): string {
  const number = getActiveWhatsApp(pool);
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMsg}`;
}

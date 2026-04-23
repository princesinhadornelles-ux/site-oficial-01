/**
 * Configuration for WhatsApp rotation and site constants
 */

export const WHATSAPP_POOLS = {
  TESTE: [
    "5521979358021", // Número 1
    "5521979269275", // Número 2
    "5519987741165", // Número 3
    "5563981031760", // Número 4
  ],
  COMPRA: [
    "5561999084480", // Número 1
    "5561991692866", // Número 2
    "5561991094615", // Número 3
  ],
  COMPLETO: [
    "5561994224422", // Número 1
    "5561974034449", // Número 2
    "5561991472166", // Número 3
  ]
};

export const SITE_CONFIG = {
  name: "66.387.501 NATALIA SILVA DORNELLES",
  email: "princesinhadornelles@gmail.com",
  address: "QUADRA 32, 18, COND CONDOMINIO CENTRO OESTE IV AGUAS LINDAS DE GOIAS – GO, CEP: 72914-218",
  cnpj: "66.387.501/0001-80",
  description: "Mega Filmes Online - O maior portal de recomendações de filmes e séries. Conteúdo 100% legal.",
  regionTitle: "Atendimento em São José dos Campos e Região",
  footerDisclaimer: "Este site não hospeda, transmite ou disponibiliza conteúdos audiovisuais. Apenas recomendamos plataformas oficiais.",
  copyright: "© 2026 Mega Filmes Online 2026 - Portal em conformidade com Google Ads"
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
  message: string = "Olá, gostaria de saber mais sobre o teste grátis.",
  pool: PoolType = "TESTE"
): string {
  const number = getActiveWhatsApp(pool);
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMsg}`;
}

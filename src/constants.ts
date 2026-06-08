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
  ],
  HOME: [
    "5519988792084", // Número 1 — substitua pelo número desejado
    "5519987508959", // Número 2 — substitua pelo número desejado
    "5518988741698", // Número 3 — substitua pelo número desejado
    "5519983320717", // Número 4 — substitua pelo número desejado
    "5519984361036", // Número 5 — substitua pelo número desejado
    "5519988932787", // Número 6 — substitua pelo número desejado
    "5519988582346", // Número 7 — substitua pelo número desejado
  ]
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

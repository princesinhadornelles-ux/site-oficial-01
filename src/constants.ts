/**
 * Configuration for WhatsApp rotation and site constants
 */

export const WHATSAPP_POOLS = {
  TESTE: [
    "5511967923079", // ADS 3079
    "5511963502553", // ADS 2553
    "5561947584335", // ADS 4335
    "5511958404455", // ADS 4455
    "5511957683118", // ADS 3118
    "5511954172023", // ADS 2023
    "5511969899488", // ADS 9488
    "5511953540240", // ADS 0240
  ],
  COMPRA: [
    "5511955070938", // ADS2 0938
    "5513920056988", // ADS2 6988
    "5511970300225", // ADS2 0225
    "5582920029807", // ADS2 9807
    "5511954170460", // ADS2 0460
    "554965307139",  // ADS2 7139
    "5511958588404", // ADS2 8404
    "5511954937396", // ADS2 7396
  ],
  COMPLETO: [
    "5511967923079", // ADS 3079
    "5511963502553", // ADS 2553
    "5561947584335", // ADS 4335
    "5511958404455", // ADS 4455
    "5511957683118", // ADS 3118
    "5511954172023", // ADS 2023
    "5511969899488", // ADS 9488
    "5511953540240", // ADS 0240
  ],
  HOME: [
    "5511967923079", // ADS 3079
    "5511963502553", // ADS 2553
    "5561947584335", // ADS 4335
    "5511958404455", // ADS 4455
    "5511957683118", // ADS 3118
    "5511954172023", // ADS 2023
    "5511969899488", // ADS 9488
    "5511953540240", // ADS 0240
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
  ativo: false,
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

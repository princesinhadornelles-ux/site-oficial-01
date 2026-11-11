/**
 * Configuration for WhatsApp rotation and site constants
 */

export const WHATSAPP_POOLS = {
  TESTE: [
    "5511963502553", // ADS TEST 2553
    "5511957683118", // ADS TEST 3118
    "5538956349892", // ADS TEST 9892
    "5517956936823", // ADS TEST 6823
    "5561947584335", // ADS TEST 4335
    "5511958404455", // ADS TEST 4455
    "5511967923079", // ADS TEST 3079
    "5511958588404", // ADS TEST 8404
  ],
  COMPRA: [
    "5519983880841", // ADS VENDA 0841
    "5519988582346", // ADS VENDA 2346
    "5519988932787", // ADS VENDA 2787
    "5518981550717", // ADS VENDA 0717
    "5519988741698", // ADS VENDA 1698
    "5519987508959", // ADS VENDA 8959
    "5519988792084", // ADS VENDA 2084
    "5521979358021", // ADS VENDA 8021
  ],
  COMPLETO: [
    "5511963502553", // ADS TEST 2553
    "5511957683118", // ADS TEST 3118
    "5538956349892", // ADS TEST 9892
    "5517956936823", // ADS TEST 6823
    "5561947584335", // ADS TEST 4335
    "5511958404455", // ADS TEST 4455
    "5511967923079", // ADS TEST 3079
    "5511958588404", // ADS TEST 8404
  ],
  HOME: [
    "5511963502553", // ADS TEST 2553
    "5511957683118", // ADS TEST 3118
    "5538956349892", // ADS TEST 9892
    "5517956936823", // ADS TEST 6823
    "5561947584335", // ADS TEST 4335
    "5511958404455", // ADS TEST 4455
    "5511967923079", // ADS TEST 3079
    "5511958588404", // ADS TEST 8404
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

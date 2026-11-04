/**
 * Configuration for WhatsApp rotation and site constants
 */

export const WHATSAPP_POOLS = {
  TESTE: [
    "5511954937396", // ADS 7396
    "5511958588404", // ADS 8404
    "5511963502553", // ADS 2553
    "5511967923079", // ADS 3079
    "5511958404455", // ADS 4455
    "5561947584335", // ADS 4335
    "5511957683118", // ADS 3118
    "5517956936823", // ADS 6823
    "5538956349892", // ADS 9892
    "554797458567", // ADS 8567
    "556784781454", // ADS 1454
    "556784250745", // ADS 0745
    "556784270721", // ADS 0721
    "556784181344", // ADS 1344
    "556781941133", // ADS 1133
    "556784620603", // ADS 0603
    "556782020851", // ADS 0851
    "556784280691", // ADS 0691
    "556784360955", // ADS 0955
  ],
  COMPRA: [
    "5511954937396", // ADS 7396
    "5511958588404", // ADS 8404
    "5511963502553", // ADS 2553
    "5511967923079", // ADS 3079
    "5511958404455", // ADS 4455
    "5561947584335", // ADS 4335
    "5511957683118", // ADS 3118
    "5517956936823", // ADS 6823
    "5538956349892", // ADS 9892
    "554797458567", // ADS 8567
    "556784781454", // ADS 1454
    "556784250745", // ADS 0745
    "556784270721", // ADS 0721
    "556784181344", // ADS 1344
    "556781941133", // ADS 1133
    "556784620603", // ADS 0603
    "556782020851", // ADS 0851
    "556784280691", // ADS 0691
    "556784360955", // ADS 0955
  ],
  COMPLETO: [
    "5511954937396", // ADS 7396
    "5511958588404", // ADS 8404
    "5511963502553", // ADS 2553
    "5511967923079", // ADS 3079
    "5511958404455", // ADS 4455
    "5561947584335", // ADS 4335
    "5511957683118", // ADS 3118
    "5517956936823", // ADS 6823
    "5538956349892", // ADS 9892
    "554797458567", // ADS 8567
    "556784781454", // ADS 1454
    "556784250745", // ADS 0745
    "556784270721", // ADS 0721
    "556784181344", // ADS 1344
    "556781941133", // ADS 1133
    "556784620603", // ADS 0603
    "556782020851", // ADS 0851
    "556784280691", // ADS 0691
    "556784360955", // ADS 0955
  ],
  HOME: [
    "5511954937396", // ADS 7396
    "5511958588404", // ADS 8404
    "5511963502553", // ADS 2553
    "5511967923079", // ADS 3079
    "5511958404455", // ADS 4455
    "5561947584335", // ADS 4335
    "5511957683118", // ADS 3118
    "5517956936823", // ADS 6823
    "5538956349892", // ADS 9892
    "554797458567", // ADS 8567
    "556784781454", // ADS 1454
    "556784250745", // ADS 0745
    "556784270721", // ADS 0721
    "556784181344", // ADS 1344
    "556781941133", // ADS 1133
    "556784620603", // ADS 0603
    "556782020851", // ADS 0851
    "556784280691", // ADS 0691
    "556784360955", // ADS 0955
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

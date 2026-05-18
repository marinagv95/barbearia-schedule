export function extractPhone(from: string) {
  return from.split("@")[0];
}


/**
 * Extrai o número puro do ID do WhatsApp e formata para o padrão internacional (+55...)
 */
/**
 * Extrai o número puro e formata para o padrão internacional (+55...)
 * Lida com IDs de mensagens, LIDs (108...) e números diretos.
 */
export function formatWhatsAppNumber(from: string): string {
  if (!from) return "";

  let clean = from
    .split("@")[0]
    .split(":")[0]
    .replace(/\D/g, "");

  // se vier um LID grande, não inventa número
  if (clean.length > 13) {
    return clean;
  }

  if (clean.startsWith("55")) {
    return `+${clean}`;
  }

  return `+55${clean}`;
}
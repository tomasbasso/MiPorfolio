// Único lugar con el número de WhatsApp de BASSO TECH
export const WHATSAPP_NUMERO = '542302524872'

export function waLink(mensaje?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}

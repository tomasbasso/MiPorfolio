import { waLink, WHATSAPP_NUMERO } from '../whatsapp'

describe('waLink', () => {
  it('sin mensaje devuelve el chat directo', () => {
    expect(waLink()).toBe(`https://wa.me/${WHATSAPP_NUMERO}`)
  })

  it('codifica el mensaje en el query text', () => {
    expect(waLink('Hola, ¿cómo va? 100% stock & ventas')).toBe(
      `https://wa.me/${WHATSAPP_NUMERO}?text=Hola%2C%20%C2%BFc%C3%B3mo%20va%3F%20100%25%20stock%20%26%20ventas`,
    )
  })

  it('usa el número de Tomás en formato internacional', () => {
    expect(WHATSAPP_NUMERO).toBe('542302524872')
  })
})

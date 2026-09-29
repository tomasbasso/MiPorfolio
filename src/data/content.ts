// Contenido del sitio BASSO TECH — editar aquí sin tocar los componentes

export const marca = {
  nombre: 'BASSO TECH',
  isotipo: '/brand/isotipo.png',
  logoAnimado: '/brand/logo-animado.svg',
}

export const contacto = {
  whatsappVisible: '+54 2302 52-4872',
  email: 'tomas.basso@hotmail.com',
  ubicacion: 'Winifreda, La Pampa, Argentina',
  mensajeGeneral: 'Hola Tomás, vi la página de BASSO TECH y quiero consultar por un sistema para mi negocio.',
}

export const hero = {
  eyebrow: 'Desarrollo de software en La Pampa',
  titulo: 'Sistemas de gestión para',
  tituloDestacado: 'comercios y consultorios.',
  subtitulo: 'Stock, ventas, turnos, facturación y páginas web hechos a la medida de tu negocio, con soporte directo.',
}

export const rubros = [
  'Almacenes',
  'Kioscos',
  'Ferreterías',
  'Tiendas de ropa',
  'Consultorios',
  'Kinesiología',
  'Imprentas',
  'Distribuidoras',
  'Municipios',
  'Emprendimientos',
]

export type PantallaId = 'stock' | 'indumentaria' | 'turnero' | 'kinesio'

export interface Producto {
  id: PantallaId
  nombre: string
  rubro: string
  plataforma: 'Escritorio' | 'Web'
  frase: string
  descripcion: string
  funciones: string[]
  opcional?: string
  demo?: string
  mensajeWhatsApp: string
}

export const productos: Producto[] = [
  {
    id: 'stock',
    nombre: 'Stock y Punto de Venta',
    rubro: 'Comercios',
    plataforma: 'Escritorio',
    frase: 'Vendé, controlá el stock y cerrá la caja desde una sola pantalla.',
    descripcion:
      'Pensado para el mostrador: cobrás con lector de código de barras, el stock se descuenta solo y a fin del día tenés la caja cerrada y los números claros.',
    funciones: [
      'Venta rápida con lector de código de barras',
      'Alertas de stock bajo',
      'Clientes con cuenta corriente',
      'Presupuestos en PDF',
      'Caja diaria y reportes de ventas',
      'Actualización masiva de precios',
    ],
    opcional: 'Factura electrónica ARCA (ex AFIP)',
    mensajeWhatsApp: 'Hola Tomás, me interesa el sistema de Stock y Punto de Venta para mi comercio.',
  },
  {
    id: 'indumentaria',
    nombre: 'Stock para Indumentaria',
    rubro: 'Tiendas de ropa',
    plataforma: 'Escritorio',
    frase: 'Cada prenda con sus talles y colores, y el stock de cada combinación al día.',
    descripcion:
      'Cargás el producto una sola vez y el sistema maneja todas sus variantes. Sabés qué talle se está por agotar antes de que te lo pidan en el mostrador.',
    funciones: [
      'Variantes por talle y color',
      'Código de barras por variante',
      'Punto de venta y caja',
      'Clientes y cuenta corriente',
      'Costos y márgenes por prenda',
      'Reportes de lo más vendido',
    ],
    mensajeWhatsApp: 'Hola Tomás, me interesa el sistema de Stock para Indumentaria para mi tienda.',
  },
  {
    id: 'turnero',
    nombre: 'Turnero online',
    rubro: 'Consultorios',
    plataforma: 'Web',
    frase: 'Tus pacientes sacan turno solos, a cualquier hora, y reciben un recordatorio el día anterior.',
    descripcion:
      'Una página de reservas con la imagen de tu consultorio: el paciente elige especialidad, profesional y horario sin registrarse. Vos manejás todo desde un panel.',
    funciones: [
      'Reserva online paso a paso, sin registro',
      'Agenda por profesional, con ausencias y feriados',
      'Recordatorio automático por email',
      'Panel para administración, médicos y recepción',
      'Estados del turno: confirmado, atendido, ausente',
      'Funciona en celular y computadora',
    ],
    mensajeWhatsApp: 'Hola Tomás, me interesa el Turnero online para mi consultorio.',
  },
  {
    id: 'kinesio',
    nombre: 'Agenda para Kinesiología',
    rubro: 'Kinesiología y rehabilitación',
    plataforma: 'Escritorio',
    frase: 'Tratamientos por sesiones, historia clínica y cobros, en una agenda que se entiende de un vistazo.',
    descripcion:
      'Cargás el tratamiento con las sesiones autorizadas y el sistema arma todos los turnos de una vez, avisándote si se superponen. Cada sesión suma a la historia clínica del paciente.',
    funciones: [
      'Agenda semanal por profesional',
      'Tratamientos con sesiones autorizadas',
      'Turnos recurrentes con aviso de superposición',
      'Historia clínica por sesión',
      'Cobros y saldo por paciente',
      'Varios profesionales, un solo padrón de pacientes',
    ],
    mensajeWhatsApp: 'Hola Tomás, me interesa la Agenda para Kinesiología.',
  },
]

export interface Web {
  id: string
  nombre: string
  tipo: string
  descripcion: string
  url: string
  dominio: string
  captura: string
}

export const webs: Web[] = [
  {
    id: 'pazsport',
    nombre: 'PazSport',
    tipo: 'Tienda online',
    descripcion: 'Tienda de indumentaria deportiva con un perchero 3D que se gira con el dedo, catálogo por talle y pedidos que se cierran por WhatsApp.',
    url: 'https://pazsport.vercel.app',
    dominio: 'pazsport.vercel.app',
    captura: '/shots/pazsport.webp',
  },
  {
    id: 'cira',
    nombre: 'Cira Impresiones',
    tipo: 'Web + panel de administración',
    descripcion:
      'Regalos personalizados e impresiones a pedido: el cliente sube su diseño y coordina por WhatsApp. Panel propio para cargar productos y servidor con backups automáticos.',
    url: 'https://ciraimpresiones.com.ar',
    dominio: 'ciraimpresiones.com.ar',
    captura: '/shots/cira.webp',
  },
  {
    id: 'winifreda',
    nombre: 'Municipalidad de Winifreda',
    tipo: 'Sitio institucional',
    descripcion: 'Portal oficial del municipio: servicios, turismo, agenda, noticias, teléfonos de emergencia y farmacias de turno.',
    url: 'https://winifreda.gob.ar',
    dominio: 'winifreda.gob.ar',
    captura: '/shots/winifreda.webp',
  },
]

export interface Servicio {
  titulo: string
  descripcion: string
  icono: 'sistemas' | 'webs' | 'soporte' | 'ia'
  secundario?: boolean
}

export const servicios: Servicio[] = [
  {
    titulo: 'Sistemas a medida',
    descripcion: 'Si tu negocio trabaja distinto, el sistema se adapta a vos y no al revés.',
    icono: 'sistemas',
  },
  {
    titulo: 'Páginas web y tiendas online',
    descripcion: 'Sitios rápidos, que se ven bien en el celular y que podés actualizar vos mismo.',
    icono: 'webs',
  },
  {
    titulo: 'Implementación y soporte',
    descripcion: 'Instalación, carga inicial de datos, capacitación y una persona que responde cuando la necesitás.',
    icono: 'soporte',
  },
  {
    titulo: 'Automatizaciones con IA',
    descripcion: 'Tareas repetitivas que se resuelven solas: lectura de correos, extracción de datos y reportes.',
    icono: 'ia',
    secundario: true,
  },
]

export interface Paso {
  num: string
  titulo: string
  descripcion: string
}

export const pasos: Paso[] = [
  {
    num: '01',
    titulo: 'Charlamos',
    descripcion: 'Me contás cómo trabaja tu negocio y qué te está complicando. Por WhatsApp o en persona.',
  },
  {
    num: '02',
    titulo: 'Propuesta',
    descripcion: 'Te paso qué sistema conviene, qué hay que adaptar y el presupuesto, sin letra chica.',
  },
  {
    num: '03',
    titulo: 'Implementación',
    descripcion: 'Instalo el sistema, cargo tus datos y te capacito a vos y a tu equipo.',
  },
  {
    num: '04',
    titulo: 'Soporte',
    descripcion: 'Seguimos en contacto para ajustes, dudas y mejoras cuando las necesites.',
  },
]

export const fundador = {
  nombre: 'Tomás Basso Fernández',
  rol: 'fundador de BASSO TECH',
  foto: '/brand/tomas.webp',
  bio: [
    'Soy desarrollador de software y trabajo desde Winifreda, La Pampa. Hago sistemas para negocios reales: el mostrador de un comercio, la agenda de un consultorio, la tienda online de una marca.',
    'Cuando trabajás con BASSO TECH hablás directamente conmigo. El que entiende tu negocio es el mismo que escribe el código y el que te atiende cuando necesitás algo.',
    'Visito en persona a comercios y consultorios de Winifreda, Santa Rosa, Toay, General Pico, Eduardo Castex, Victorica y el resto de La Pampa. Con clientes de otras provincias trabajamos a distancia.',
  ],
  datos: [
    'Técnico Superior en Desarrollo de Software',
    'Técnico en Informática de Gestión (UNLPam)',
    'Winifreda, La Pampa',
  ],
}

// IDs de sección para navegación anclada
export const navLinks = [
  { label: 'Sistemas', href: '#sistemas' },
  { label: 'Webs', href: '#webs' },
  { label: 'Cómo trabajamos', href: '#como-trabajamos' },
  { label: 'Quién soy', href: '#quien-soy' },
  { label: 'Contacto', href: '#contacto' },
]

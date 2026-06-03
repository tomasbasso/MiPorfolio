// Contenido del portfolio — editar aquí sin tocar los componentes

export const personal = {
  nombre: 'Tomás Basso Fernández',
  rol: 'Desarrollador Full Stack .NET',
  ubicacion: 'Winifreda, La Pampa, Argentina',
  disponibilidad: ['Reubicación', 'Full Remote'],
  email: 'tomas.basso@hotmail.com',
  telefono: '+54 2302 524872',
  github: 'https://github.com/tomasbasso',
  linkedin: 'https://linkedin.com/in/tomasbasso',
  cv: '/CV_Basso_Tomas.pdf',
  foto: '/FotoPersonal.png',
  logo: '/MiLogoPersonal.png',
  frase: 'Construyo soluciones reales de negocio: ERPs, e-commerce y automatizaciones con IA, orientadas a escalabilidad y seguridad.',
}

export const sobreMi = `Desarrollador Full Stack .NET con experiencia en construcción de aplicaciones web empresariales, APIs REST y automatización de procesos con IA. Especializado en ASP.NET Core 8, Entity Framework, autenticación segura (JWT, Identity + 2FA) y frontend moderno con React.

Experiencia implementando soluciones reales de negocio (ERP, e-commerce, automatizaciones con LLMs) orientadas a escalabilidad, seguridad y eficiencia operativa.`

export interface StackGrupo {
  titulo: string
  color: string
  items: string[]
}

export const stack: StackGrupo[] = [
  {
    titulo: 'Backend',
    color: 'var(--neon-violet)',
    items: ['ASP.NET Core 8 (MVC / Web API)', 'Entity Framework Core', 'LINQ', 'JWT Authentication', 'ASP.NET Identity + 2FA', 'Arquitectura en capas'],
  },
  {
    titulo: 'Frontend',
    color: 'var(--neon-cyan)',
    items: ['React.js', 'JavaScript', 'Bootstrap 5', 'AJAX', 'HTML5 / CSS3'],
  },
  {
    titulo: 'Base de datos',
    color: 'var(--neon-magenta)',
    items: ['SQL Server'],
  },
  {
    titulo: 'Automatización & DevOps',
    color: 'var(--neon-cyan)',
    items: ['n8n', 'Docker', 'Webhooks', 'Integración con APIs externas', 'IMAP / Gmail API', 'Bots de Telegram', 'OpenAI / Gemini'],
  },
]

export interface Proyecto {
  id: string
  titulo: string
  descripcion: string
  resultado?: string
  stackItems: string[]
  gradFrom: string
  gradTo: string
  num: string
}

export const proyectos: Proyecto[] = [
  {
    id: 'erp',
    num: '01',
    titulo: 'ERP / Sistema de Inventario – Ferretería',
    descripcion: 'Aplicación web para gestión de productos, ventas y control de stock en tiempo real. Autenticación segura con roles y 2FA. Validación automática de inventario previo a facturación. Arquitectura en capas orientada a mantenimiento y escalabilidad.',
    resultado: 'Digitalización completa del proceso comercial y reducción de errores operativos.',
    stackItems: ['ASP.NET Core 8 (MVC)', 'EF Core', 'Identity + 2FA', 'SQL Server', 'Bootstrap', 'AJAX'],
    gradFrom: '#7C3AED',
    gradTo: '#22D3EE',
  },
  {
    id: 'finanzas',
    num: '02',
    titulo: 'App Móvil de Finanzas Personales',
    descripcion: 'Aplicación multiplataforma conectada a una API REST propia. Autenticación segura mediante JWT. Arquitectura cliente-servidor desacoplada.',
    stackItems: ['.NET MAUI', 'ASP.NET Core API', 'JWT'],
    gradFrom: '#E879F9',
    gradTo: '#7C3AED',
  },
  {
    id: 'ecommerce',
    num: '03',
    titulo: 'E-Commerce – Paz Sport',
    descripcion: 'Plataforma de ventas online con panel administrativo. Gestión dinámica de productos, descuentos y promociones. Consumo de APIs REST y persistencia relacional. Soporte para múltiples sucursales.',
    resultado: 'Centralización de catálogo y automatización de promociones comerciales.',
    stackItems: ['React.js', 'ASP.NET Core Web API', 'SQL Server'],
    gradFrom: '#22D3EE',
    gradTo: '#E879F9',
  },
  {
    id: 'automatizacion',
    num: '04',
    titulo: 'Automatización de Procesos con IA',
    descripcion: 'Workflows automatizados para procesamiento de correos y extracción de datos no estructurados. Integración con bots de Telegram y generación automática de reportes estructurados. Despliegue en contenedores Docker.',
    resultado: 'Reducción significativa de tareas administrativas manuales.',
    stackItems: ['n8n', 'Docker', 'Webhooks', 'IMAP/Gmail API', 'OpenAI / Gemini'],
    gradFrom: '#7C3AED',
    gradTo: '#E879F9',
  },
]

export interface ExperienciaItem {
  rol: string
  empresa: string
  periodo: string
  descripcion: string
}

export const experiencia: ExperienciaItem[] = [
  {
    rol: 'Concejal',
    empresa: 'Municipalidad de Winifreda, La Pampa',
    periodo: '03/2024 – Actualidad',
    descripcion: 'Análisis y gestión de proyectos, negociación con diferentes actores sociales, resolución de conflictos y toma de decisiones estratégicas.',
  },
  {
    rol: 'Gestión Administrativa',
    empresa: 'La Segunda Seguros / Avalián',
    periodo: '01/2017 – Actualidad',
    descripcion: 'Atención directa al cliente, resolución de reclamos bajo presión y optimización de tiempos de respuesta mediante sistemas de gestión.',
  },
]

export interface EducacionItem {
  titulo: string
  institucion: string
  periodo: string
}

export const educacion: EducacionItem[] = [
  {
    titulo: 'Técnico Superior en Desarrollo de Software',
    institucion: 'Instituto Tecnológico de Educación Superior',
    periodo: '03/2022 – 12/2025',
  },
  {
    titulo: 'Técnico en Informática de Gestión',
    institucion: 'Universidad Nacional de La Pampa',
    periodo: '03/2018 – 04/2022',
  },
]

// IDs de sección para navegación anclada
export const navLinks = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Stack', href: '#stack' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Contacto', href: '#contacto' },
]

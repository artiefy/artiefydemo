import { headers } from 'next/headers';

import type { Metadata } from 'next';

// sharedOpenGraph solo debe usarse en páginas generales, no en cursos dinámicos
const sharedOpenGraph = {
  images: [
    {
      url: 'https://CCOET.com/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'Unete a nosotros y transforma tus ideas en realidades con el poder del conocimiento',
    },
  ],
  locale: 'es_ES',
  type: 'website',
};

// Solo usar x-invoke-path para obtener el pathname actual
export async function getCurrentPath() {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') ?? '/';
  return pathname;
}

// Common metadata that can be reused
const defaultMetadata: Metadata = {
  title: {
    template: '%s | CCOET - Tu Plataforma Educativa',
    default: 'CCOET - Cursos Online | Aprende a Tu Ritmo',
  },
  description:
    'Explora CCOET, tu plataforma de aprendizaje online con cursos de alta calidad impartidos por profesionales. Desarrolla nuevas habilidades, avanza en tu carrera y expande tus horizontes con contenido educativo actualizado y accesible desde cualquier lugar. Únete a nuestra comunidad de estudiantes y transforma tu futuro profesional.',
  keywords: [
    'CCOET',
    'cursos online',
    'educación online',
    'plataforma educativa',
    'aprendizaje digital',
    'estudiar online',
    'formación online',
    'CCOET educación',
    'CCOET cursos',
    'CCOET online',
  ],
  metadataBase: new URL('https://artiefy.com'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://CCOET.com',
    siteName: 'CCOET - Plataforma de Educación Online',
    images: [
      {
        url: 'https://CCOET.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Artiefy - App Web Educativa de Cursos Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@CCOET',
    creator: '@CCOET',
  },
  verification: {
    google: 'QmeSGzDRcYJKY61p9oFybVx-HXlsoT5ZK6z9x2L3Wp4',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Helper para canonical
function getCanonical(pathname: string) {
  if (pathname === '/') return 'https://artiefy.com';
  return `https://artiefy.com${pathname}`;
}

// Route-specific metadata mejorado
export async function getMetadataForRoute(): Promise<Metadata> {
  const pathname = await getCurrentPath();

  const baseMetadata = {
    ...defaultMetadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...sharedOpenGraph,
    },
  };

  switch (pathname) {
    case '/':
      return {
        ...baseMetadata,
        title: 'CCOET - Cursos Online | Impulsa tu Futuro Profesional',
        description:
          'Descubre CCOET, la plataforma educativa líder que ofrece cursos online de calidad impartidos por expertos del sector. Aprende a tu ritmo, accede a contenidos actualizados y desarrolla habilidades relevantes para el mercado laboral actual. Transforma tu potencial profesional con nuestra metodología innovadora.',
        keywords: [
          'CCOET',
          'CCOET plataforma',
          'cursos CCOET',
          'educación online CCOET',
          'plataforma educativa',
          'cursos online',
          'educación digital',
          'aprendizaje online',
        ],
        alternates: { canonical: getCanonical('/') },
        openGraph: {
          ...baseMetadata.openGraph,
          title: 'CCOET - Cursos Online',
          url: getCanonical('/'),
        },
      };

    case '/estudiantes':
      return {
        ...baseMetadata,
        title: 'Cursos Online | Formación Integral en CCOET',
        description:
          'Explora nuestra completa biblioteca de cursos y programas diseñados para potenciar tu desarrollo profesional. Con más de 100 cursos especializados, encuentras formación actualizada en tecnología, negocios, marketing digital, idiomas y muchas áreas más. Aprende con metodologías prácticas y certificados reconocidos en el mercado.',
        keywords: [
          'CCOET cursos',
          'programas CCOET',
          'cursos online CCOET',
          'estudiantes CCOET',
          'formación profesional',
          'cursos digitales',
          'programas educativos',
        ],
        alternates: { canonical: getCanonical('/estudiantes') },
        openGraph: {
          ...baseMetadata.openGraph,
          title: 'CCOET - Cursos',
          url: getCanonical('/estudiantes'),
        },
      };

    case '/planes':
      return {
        ...baseMetadata,
        title:
          'Planes de Suscripción Educativos | Invierte en tu Futuro con CCOET',
        description:
          'Encuentra el plan perfecto para tu formación en CCOET. Desde suscripciones básicas hasta planes premium con acceso ilimitado a cursos, proyectos prácticos, mentoría personalizada y certificados digitales. Invierte en tu educación continua con precios accesibles y contenido de calidad que impulsa tu carrera profesional.',
        keywords: [
          'planes CCOET',
          'suscripción CCOET',
          'precios CCOET',
          'membresía artiefy',
          'planes educativos',
          'suscripción cursos online',
          'planes de estudio',
        ],
        alternates: { canonical: getCanonical('/planes') },
        openGraph: {
          ...baseMetadata.openGraph,
          title: 'CCOET - Planes de Suscripción',
          url: getCanonical('/planes'),
        },
      };

    default:
      return {
        ...baseMetadata,
        alternates: { canonical: getCanonical(pathname) },
        openGraph: {
          ...baseMetadata.openGraph,
          url: getCanonical(pathname),
        },
      };
  }
}

export { defaultMetadata };

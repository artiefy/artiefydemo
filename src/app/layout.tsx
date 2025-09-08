/* eslint-disable @next/next/no-img-element */
import { Merriweather, Montserrat, Orbitron } from 'next/font/google';
import Script from 'next/script';

import { esMX } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';

import { NotificationSubscription } from '~/components/estudiantes/layout/subscriptions/NotificationSubscription';
import { Toaster } from '~/components/estudiantes/ui/sonner';
import TourManager from '~/components/tour/tourManager';
import { getMetadataForRoute } from '~/lib/metadata/config';
import {
  getBreadcrumbSchema,
  getOrganizationSchema,
  getSiteNavigationSchema,
  getWebPagesSchema,
  getWebsiteSchema,
} from '~/lib/metadata/structured-data';

import Providers from './providers';

import type { Metadata } from 'next';

import '~/styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  preload: false,
  adjustFontFallback: true,
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
  adjustFontFallback: true,
});

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
  weight: ['300', '400', '700', '900'],
  preload: false,
  adjustFontFallback: true,
});

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadataForRoute();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const metadata = await getMetadataForRoute();
  let canonical = 'https://artiefy.com';
  if (
    typeof metadata.alternates === 'object' &&
    metadata.alternates &&
    'canonical' in metadata.alternates
  ) {
    const alt = metadata.alternates.canonical;
    if (typeof alt === 'string') {
      canonical = alt;
    } else if (alt instanceof URL) {
      canonical = alt.toString();
    }
  }

  // Prepare schema data
  const websiteSchema = getWebsiteSchema();
  const webPagesSchema = getWebPagesSchema();
  const siteNavigationSchema = getSiteNavigationSchema();
  const breadcrumbSchema = getBreadcrumbSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <ClerkProvider localization={esMX}>
      <html
        lang="es"
        className={`${montserrat.variable} ${orbitron.variable} ${merriweather.variable}`}
      >
        {/* Canonical URL en los metadatos de la página */}
        <link rel="canonical" href={canonical} />
        {/* Verificación de Google */}
        <meta
          name="google-site-verification"
          content="QmeSGzDRcYJKY61p9oFybVx-HXlsoT5ZK6z9x2L3Wp4"
        />
        {/* Verificación de dominio de Facebook */}
        <meta
          name="facebook-domain-verification"
          content="zxh6j216xifuou0gxlb1hp0zomyjx0"
        />
        {/* Schema.org con componentes Script de Next.js */}
        <Script id="schema-website" type="application/ld+json">
          {JSON.stringify(websiteSchema).replace(/</g, '\u003c')}
        </Script>
        <Script id="schema-webpages" type="application/ld+json">
          {JSON.stringify(webPagesSchema).replace(/</g, '\u003c')}
        </Script>
        <Script id="schema-navigation" type="application/ld+json">
          {JSON.stringify(siteNavigationSchema).replace(/</g, '\u003c')}
        </Script>
        <Script id="schema-breadcrumb" type="application/ld+json">
          {JSON.stringify(breadcrumbSchema).replace(/</g, '\u003c')}
        </Script>
        <Script id="schema-organization" type="application/ld+json">
          {JSON.stringify(organizationSchema).replace(/</g, '\u003c')}
        </Script>
        <body className="bg-background text-primary font-sans">
          {/* Meta Pixel noscript fallback */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=967037655459857&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
          {/* Microformatos para información de contacto */}
          <div className="h-card" style={{ display: 'none' }}>
            <a className="p-name u-url" href="https://artiefy.com">
              Artiefy
            </a>
            <span className="p-org">Artiefy Educación</span>
            <a className="u-email" href="mailto:artiefy4@gmail.com">
              artiefy4@gmail.com
            </a>
            <img
              className="u-photo"
              src="https://artiefy.com/artiefy-icon.png"
              alt="Logo de Artiefy"
            />
          </div>
          <Providers>
            <TourManager />
            {children}
            <NotificationSubscription />
          </Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

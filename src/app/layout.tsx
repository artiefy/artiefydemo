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
              CCOET
            </a>
            <span className="p-org">CCOET Educación</span>
            <a className="u-email" href="mailto:artiefy4@gmail.com">
              artiefy4@gmail.com
            </a>
            <img
              className="u-photo"
              src="https://CCOET.com/CCOET-icon.png"
              alt="Logo de CCOET"
            />
          </div>
          <Providers>
            <TourManager />
            {children}
            <NotificationSubscription />
          </Providers>
          <Toaster />

          {/* Script: sincroniza ?query con las barras de búsqueda (header, studentdetail, studentcategories) */}
          <Script id="sync-search" strategy="afterInteractive">
            {`
(function(){
  function matchesSelector(el){
    return el && el.matches && (
      el.matches('input.header-input') ||
      el.matches('input[data-no-chatbot]') ||
      el.matches('input[name="search"]') ||
      el.matches('input[data-role="course-search"]') ||
      el.matches('input[data-role="header-search"]')
    );
  }

  function syncFromUrl(){
    try {
      var q = new URLSearchParams(window.location.search).get('query') || '';
      var els = document.querySelectorAll('input.header-input, input[data-no-chatbot], input[name="search"], input[data-role="course-search"], input[data-role="header-search"]');
      els.forEach(function(el){
        try { if (el.value !== q) el.value = q; } catch(e){}
      });
    } catch(e) { console.error('sync-search error', e); }
  }

  // inicial
  syncFromUrl();

  // popstate (back/forward)
  window.addEventListener('popstate', syncFromUrl);

  // next/router client navigations may not emit popstate — detectar cambios en location.search por polling
  var lastSearch = location.search;
  setInterval(function(){
    if(location.search !== lastSearch){
      lastSearch = location.search;
      syncFromUrl();
    }
  }, 300);

  // si el usuario borra el input (typing, clear button x, change, search), borrar en todos los inputs y recargar /estudiantes si corresponde
  function handlePotentialClear(t){
    try {
      if (!t) return;
      if (!matchesSelector(t)) return;
      var v = t.value || '';
      if (v === '' && new URLSearchParams(location.search).has('query')) {
        // Borrar el texto en todos los inputs sincronizados
        var els = document.querySelectorAll('input.header-input, input[data-no-chatbot], input[name="search"], input[data-role="course-search"], input[data-role="header-search"]');
        els.forEach(function(el){
          try { el.value = ''; } catch(e){}
        });
        // Si estamos en la sección de estudiantes, recargar en /estudiantes
        if (location.pathname && location.pathname.startsWith('/estudiantes')) {
          window.location.href = '/estudiantes';
          return;
        }
        // En otras rutas solo quitar el query sin recargar
        history.replaceState(null, '', location.pathname);
        lastSearch = location.search;
        syncFromUrl();
      }
    } catch(e){ console.error('handlePotentialClear error', e); }
  }

  document.addEventListener('input', function(e){
    handlePotentialClear(e.target);
  }, {passive:true, capture:true});

  document.addEventListener('search', function(e){
    handlePotentialClear(e.target);
  }, {passive:true, capture:true});

  document.addEventListener('change', function(e){
    handlePotentialClear(e.target);
  }, {passive:true, capture:true});

})();
`}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}

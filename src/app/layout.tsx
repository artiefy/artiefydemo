import { Montserrat, Orbitron } from 'next/font/google';

import { esMX } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="es" className={`${montserrat.variable} ${orbitron.variable}`}>
        <body className="bg-background text-primary font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}

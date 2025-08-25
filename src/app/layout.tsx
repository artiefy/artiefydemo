import { Montserrat } from 'next/font/google';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esMX}>
      <html
        lang="es"
        className={`${montserrat.variable}`}
      >
        <body className="bg-background text-primary font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}

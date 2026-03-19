import { Metadata, Viewport } from 'next';
import { Karla, JetBrains_Mono } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import ClientLayout from '../components/ClientLayout';

const karla = Karla({
  subsets: ['latin'],
  weight: ['200', '400', '700'],
  display: 'swap',
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'styled-components',
    template: '%s | styled-components',
  },
  description:
    'Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress',
  icons: {
    icon: '/favicon.png',
  },
  manifest: '/manifest.json',
  authors: [{ name: 'styled-components' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  userScalable: true,
  themeColor: '#da936a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="dark" lang="en" className={`${karla.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ClientLayout>{children}</ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

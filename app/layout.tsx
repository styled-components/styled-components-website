import { Metadata, Viewport } from 'next';
import StyledComponentsRegistry from '~/lib/registry';
import ClientLayout from '~/components/ClientLayout';

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
  other: {
    'X-UA-Compatible': 'IE=edge,chrome=1',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  userScalable: true,
  themeColor: '#da936a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="dark" lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="/dmvendor.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Karla:wght@200;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ClientLayout>{children}</ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

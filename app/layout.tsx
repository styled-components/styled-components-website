import { Metadata, Viewport } from 'next';
import { Figtree, Inter, Google_Sans_Code } from 'next/font/google';
import './theme-base.css';
import StyledComponentsRegistry from '../lib/registry';
import ClientLayout from '../components/ClientLayout';
import { BASE_URL } from './url';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const googleSansCode = Google_Sans_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'styled-components',
    template: '%s | styled-components',
  },
  description: 'CSS for the <Component> Age',
  icons: {
    icon: '/favicon.png',
    shortcut: '/atom.png',
  },
  manifest: '/manifest.json',
  authors: [{ name: 'styled-components' }],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'styled-components',
    images: [{ url: '/atom.png', width: 652, height: 652 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mxstbr',
    creator: '@mxstbr',
    images: ['/meta.png'],
  },
  verification: {
    google: 'lWntYW6AWVMcShSIWLmOzKr8Wyek2TR-zuQn6_XGu_c',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  userScalable: true,
  themeColor: '#da936a',
};

/**
 * Inline script to set the theme before first paint, preventing FOUC.
 * Reads localStorage, falls back to system preference, defaults to light.
 */
const themeScript = `
  (function() {
    try {
      var d = document.documentElement;
      var stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') {
        d.classList.add(stored);
        if (stored === 'dark') d.dataset.theme = 'dark';
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        d.classList.add('dark');
        d.dataset.theme = 'dark';
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${figtree.variable} ${googleSansCode.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ClientLayout>
            <main id="main-content">{children}</main>
          </ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

import { Metadata, Viewport } from 'next';
import { Figtree, Inter, Google_Sans_Code } from 'next/font/google';
import './theme-base.css';
import StyledComponentsRegistry from '../lib/registry';
import ClientLayout from '../components/ClientLayout';
import { BASE_URL } from './url';
import { getPosts } from '@/utils/blog.server';

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
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: 'styled-components',
    template: '%s | styled-components',
  },
  description: 'CSS for the <Component> Age',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
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
  // Brand accent (oklch(0.50 0.16 290)) in sRGB hex. Mobile browser chrome
  // can't resolve oklch() or CSS vars here, so this is the one place the
  // brand purple has to live as a literal.
  themeColor: '#654DB6',
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
    if (location.pathname === '/') d.setAttribute('data-hero-logo-visible', '');
  })();
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = await getPosts();
  const latestPost = posts[0] ? { title: posts[0].title, slug: posts[0].slug } : null;

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
          <ClientLayout latestPost={latestPost}>
            <main id="main-content">{children}</main>
          </ClientLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

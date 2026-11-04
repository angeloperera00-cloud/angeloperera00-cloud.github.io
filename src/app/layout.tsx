import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/styles/site.css';
import '@/styles/projects.css';
import '@/styles/articles.css';
import IconSprite from '@/components/icons/IconSprite';
import MotionProvider from '@/components/motion/MotionProvider';
import { RouteTransitionListener } from '@/components/motion/TransitionLink';
import { ToastProvider } from '@/components/ui/Toast';
import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: '/images/og-2.jpg', width: 1200, height: 630, alt: 'Angelo Perera, software engineer' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/og-2.jpg'] },
  icons: {
    icon: [
      { url: '/icons/favicon-ap.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-ap-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F6F5F3',
};

/* Runs before first paint: the hero starts in its pre-animation state on the
   home page only; a fallback reveals everything if JavaScript stalls. */
const INTRO = `(function(d){var r=d.documentElement,p=location.pathname;r.classList.add('js');var keep=0;try{keep=!!sessionStorage.getItem('ap-lang-view')}catch(e){}if(keep&&'scrollRestoration' in history)history.scrollRestoration='manual';if(/^\\/it(\\/|$)/.test(p))r.lang='it';if(!keep&&(p==='/'||p==='/it'||p==='/it/')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)r.classList.add('intro');setTimeout(function(){r.classList.remove('intro')},2600)})(document)`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/bebas-neue-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/dm-sans-latin-opsz-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: INTRO }} />
      </head>
      <body>
        <IconSprite />
        <a className="skip" href="#main">Skip to content · Vai al contenuto</a>
        <ToastProvider>
          {children}
        </ToastProvider>
        <MotionProvider />
        <RouteTransitionListener />
      </body>
    </html>
  );
}

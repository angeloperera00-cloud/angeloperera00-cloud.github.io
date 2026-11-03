import type { ReactNode } from 'react';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { LangProvider } from '@/i18n/useLang';
import { getArticles } from '@/lib/articles';
import type { Lang } from '@/i18n';

/** Page chrome for one language: nav, main content and footer. `path` is the page's language-neutral path. */
export default function Shell({ lang, path, children }: { lang: Lang; path: string; children: ReactNode }) {
  return (
    <LangProvider lang={lang}>
      <Nav lang={lang} path={path} hideWriting={getArticles().length === 0} />
      <main id="main" lang={lang}>{children}</main>
      <Footer />
    </LangProvider>
  );
}

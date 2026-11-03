'use client';

import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import { site } from '@/content/site';
import { lp } from '@/i18n';
import { useLang } from '@/i18n/useLang';
import { t } from '@/i18n/ui';

export default function Footer() {
  const lang = useLang();
  const s = t(lang).footer;
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Link className="logo" href={lp(lang, '/#top')} aria-label={`${site.name}, ${t(lang).nav.backToTop}`}>AP<span>.</span></Link>
        <p className="footer__copy">© {new Date().getFullYear()} {site.name}. {s.rights}</p>
        <div className="footer__end">
          <span>{s.built} <Icon name="i-heart-fill" className="heart" label={s.love} /></span>
          <a className="footer__top" href="#top">{s.top} <Icon name="i-arrow-up" /></a>
        </div>
      </div>
    </footer>
  );
}

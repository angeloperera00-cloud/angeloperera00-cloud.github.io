'use client';

import { useEffect, useRef } from 'react';
import Icon from '@/components/icons/Icon';
import { site } from '@/content/site';
import { LANGS, LANG_LABEL, type Lang } from '@/i18n';
import { t } from '@/i18n/ui';

/** "Download CV" button that opens a small choice of English or Italian PDF. */
export default function CvMenu({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const s = t(lang).hero;
  const order: Lang[] = [lang, ...LANGS.filter((l) => l !== lang)];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const close = (e: Event) => { if (el.open && !el.contains(e.target as Node)) el.open = false; };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape' && el.open) { el.open = false; el.querySelector('summary')?.focus(); } };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc); };
  }, []);

  return (
    <details className="cvmenu" ref={ref}>
      <summary className="btn btn--ghost magnetic">
        {s.downloadCv} <Icon name="i-download" />
      </summary>
      <ul className="cvmenu__list">
        {order.map((l) => (
          <li key={l}>
            <a href={site.cv[l]} download={`Angelo-Perera-CV-${l.toUpperCase()}.pdf`} target="_blank" rel="noopener" hrefLang={l} onClick={() => { if (ref.current) ref.current.open = false; }}>
              <span className="cvmenu__flag">{l.toUpperCase()}</span>
              <span>{s.cvIn} {LANG_LABEL[l]}</span>
              <Icon name="i-download" />
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

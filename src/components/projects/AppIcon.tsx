import Icon from '@/components/icons/Icon';
import type { AppIconSpec } from '@/content/types';
import type { CSSProperties } from 'react';

/** App icon: vector recreations of the original designs, an image, or a monogram. */
export default function AppIcon({ spec, size }: { spec: AppIconSpec; size?: 'lg' }) {
  const cls = (v: string) => `appicon appicon--${v}${size ? ` appicon--${size}` : ''}`;
  if ('src' in spec) {
    return <span className={cls('img')} aria-hidden="true"><img src={spec.src} alt={spec.alt ?? ''} /></span>;
  }
  if ('monogram' in spec) {
    return (
      <span className={cls('mono')} aria-hidden="true" style={{ background: spec.background, color: spec.color ?? '#fff' } as CSSProperties}>
        {spec.monogram}
      </span>
    );
  }
  switch (spec.variant) {
    case 'mtlab':
      return <span className={cls('mtlab')} aria-hidden="true"><b>MT</b><small>LAB</small></span>;
    case 'tennisland':
      return (
        <span className={cls('tennis')} aria-hidden="true">
          <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" /><path d="M8.2 10.8c5.4 3.7 6.6 13 .6 19M31.8 10.8c-5.4 3.7-6.6 13-.6 19" /></svg>
        </span>
      );
    case 'propel':
      return <span className={cls('propel')} aria-hidden="true"><Icon name="i-box" line /></span>;
    case 'eyecheck':
      return (
        <span className={cls('eye')} aria-hidden="true">
          <svg viewBox="0 0 40 40"><path d="M4 20c4.2-6.6 9.6-10 16-10s11.8 3.4 16 10c-4.2 6.6-9.6 10-16 10S8.2 26.6 4 20Z" /><circle cx="20" cy="20" r="6.2" /><circle cx="20" cy="20" r="2.4" /></svg>
        </span>
      );
    case 'stikar':
      return <span className={cls('stikar')} aria-hidden="true"><b>STIK</b><b>AR</b></span>;
    case 'wanderly':
      return <span className={cls('wanderly')} aria-hidden="true">W</span>;
  }
}

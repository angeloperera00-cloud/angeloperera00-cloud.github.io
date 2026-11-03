import type { CSSProperties } from 'react';
import AppIcon from './AppIcon';
import type { AppIconSpec, DeviceKind } from '@/content/types';

/* Realistic, CSS-built device frames. Proportions follow the real hardware;
   screens accept native-resolution screenshots without letterboxing. */

export const DEVICE_SPEC: Record<DeviceKind, { name: string; size: string; ratio: string }> = {
  iphone: { name: 'iPhone', size: '1290 × 2796', ratio: '1290 / 2796' },
  ipad: { name: 'iPad', size: '2064 × 2752', ratio: '2064 / 2752' },
  watch: { name: 'Apple Watch', size: '410 × 502', ratio: '410 / 502' },
  tv: { name: 'Apple TV', size: '3840 × 2160', ratio: '16 / 9' },
  vision: { name: 'Apple Vision Pro window', size: '3840 × 2160', ratio: '16 / 9' },
  laptop: { name: 'Mac', size: '2880 × 1800', ratio: '16 / 10' },
  browser: { name: 'Web', size: '2880 × 1800', ratio: '16 / 10' },
  poster: { name: 'App Store screenshot', size: '2064 × 2752', ratio: '3 / 4' },
};

const swap = (s: string, sep: string) => s.split(sep).reverse().join(sep);

interface Props {
  kind: DeviceKind;
  orientation?: 'portrait' | 'landscape';
  /** Exact image size; overrides the default screen ratio. */
  width?: number;
  height?: number;
  src?: string;
  alt: string;
  accent: string;
  icon?: AppIconSpec;
  title?: string;
  className?: string;
  priority?: boolean;
  lang?: 'en' | 'it';
  island?: boolean;
}

export default function Device({ kind, orientation, width, height, src, alt, accent, icon, title, className, priority, lang = 'en', island = true }: Props) {
  const spec = DEVICE_SPEC[kind];
  const landscape = (orientation === 'landscape' && (kind === 'iphone' || kind === 'ipad')) || (kind === 'poster' && !!width && !!height && width > height);
  const ratio = width && height ? `${width} / ${height}` : landscape ? swap(spec.ratio, ' / ') : spec.ratio;
  const size = landscape ? swap(spec.size, ' × ') : spec.size;
  return (
    <div
      className={['device', `device--${kind}`, landscape && 'device--landscape', className].filter(Boolean).join(' ')}
      style={{ '--accent': accent, '--ratio': ratio } as CSSProperties}
    >
      <div className="device__frame">
        {kind === 'browser' && <div className="device__chrome" aria-hidden="true"><i /><i /><i /><span /></div>}
        <div className="device__screen">
          {src ? (
            <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" />
          ) : (
            <div className="placeholder-screen" role="img" aria-label={lang === 'it' ? `Segnaposto per uno screenshot ${spec.name}` : `Placeholder for a ${spec.name} screenshot`}>
              {icon && <AppIcon spec={icon} />}
              <span className="placeholder-screen__title">{title ?? 'Screenshot'}</span>
              <span className="placeholder-screen__size">{spec.name} · {size}</span>
              <span className="draft-pill">{lang === 'it' ? 'Segnaposto' : 'Placeholder'}</span>
            </div>
          )}
        </div>
        {kind === 'iphone' && island && <span className="device__island" aria-hidden="true" />}
      </div>
    </div>
  );
}

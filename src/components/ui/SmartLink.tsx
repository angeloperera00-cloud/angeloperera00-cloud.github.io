'use client';

import type { ReactNode, CSSProperties } from 'react';
import { useToast } from './Toast';
import { useLang } from '@/i18n/useLang';
import { t } from '@/i18n/ui';

interface Props {
  href?: string;
  /** Name of the setting to fill, shown in the console when the link is empty. */
  setting: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  ariaLabel?: string;
  download?: boolean;
  'data-reveal'?: string;
}

/**
 * External link driven by content settings. When the URL isn't set yet it
 * stays visible and explains itself instead of becoming a dead link.
 */
export default function SmartLink({ href, setting, className, style, children, ariaLabel, download, ...rest }: Props) {
  const toast = useToast();
  const lang = useLang();
  if (href) {
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={className}
        style={style}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download && !external ? { download: '' } : {})}
        data-reveal={rest['data-reveal']}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href="#"
      className={className}
      style={style}
      aria-label={ariaLabel}
      data-reveal={rest['data-reveal']}
      onClick={(e) => {
        e.preventDefault();
        toast(t(lang).toast.linkMissing);
        console.info(`[portfolio] Set "${setting}" in src/content`);
      }}
    >
      {children}
    </a>
  );
}

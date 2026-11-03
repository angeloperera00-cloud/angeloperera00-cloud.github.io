import type { IconName } from './sprite';

interface IconProps {
  name: IconName;
  className?: string;
  /** Stroke-style icons look best slightly heavier at small sizes. */
  line?: boolean;
  /** Accessible label; omit for decorative icons. */
  label?: string;
}

export default function Icon({ name, className, line, label }: IconProps) {
  const cls = ['ic', line ? 'ic--line' : '', className ?? ''].filter(Boolean).join(' ');
  return label ? (
    <svg className={cls} role="img" aria-label={label}><use href={`#${name}`} /></svg>
  ) : (
    <svg className={cls} aria-hidden="true"><use href={`#${name}`} /></svg>
  );
}

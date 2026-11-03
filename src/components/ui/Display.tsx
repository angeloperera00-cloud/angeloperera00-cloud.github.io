import type { ReactNode } from 'react';

type Line = string | { text: ReactNode; accent?: boolean };

/** Section heading in the display face with per-line mask reveal. */
export function Display({ lines, as: Tag = 'h2', className }: { lines: Line[]; as?: 'h1' | 'h2'; className?: string }) {
  return (
    <Tag className={['display', className].filter(Boolean).join(' ')} data-reveal="lines">
      {lines.map((l, i) => {
        const line = typeof l === 'string' ? { text: l } : l;
        return (
          <span key={i} className={`line${line.accent ? ' accent' : ''}`}>
            <span>{line.text}</span>
          </span>
        );
      })}
    </Tag>
  );
}

/** "01 / ABOUT ME" label pair used above every section title. */
export function SecLabel({ num, label, rule }: { num: string; label: string; rule?: boolean }) {
  return (
    <>
      <p className="sec-num" data-reveal>{num}</p>
      <p className="sec-label" data-reveal style={{ ['--d' as string]: '.06s' }}>{label}</p>
      {rule && <span className="sec-rule" data-reveal style={{ ['--d' as string]: '.1s' }} aria-hidden="true" />}
    </>
  );
}

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

/** Small red label above every section title (section numbers removed by design; `num` is kept for compatibility). */
export function SecLabel({ label, rule }: { num?: string; label: string; rule?: boolean }) {
  return (
    <>
      <p className="sec-label" data-reveal style={{ ['--d' as string]: '.06s' }}>{label}</p>
      {rule && <span className="sec-rule" data-reveal style={{ ['--d' as string]: '.1s' }} aria-hidden="true" />}
    </>
  );
}

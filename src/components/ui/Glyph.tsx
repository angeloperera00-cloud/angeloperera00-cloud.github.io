import Icon from '@/components/icons/Icon';
import type { Glyph as GlyphT } from '@/content/types';

/** Renders a chip/tile mark from content data: sprite icon, short text, or image. */
export default function Glyph({ glyph, className }: { glyph: GlyphT; className?: string }) {
  if ('icon' in glyph) return <Icon name={glyph.icon} line={glyph.line} className={className} />;
  if ('img' in glyph) return <img src={glyph.img} alt="" width={20} height={20} className={className} loading="lazy" />;
  return <span className={['glyph-text', className].filter(Boolean).join(' ')}>{glyph.text}</span>;
}

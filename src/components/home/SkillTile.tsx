import Icon from '@/components/icons/Icon';
import type { SkillTile as Tile } from '@/content/profile';
import type { CSSProperties } from 'react';

/** One technology tile (also reused in case-study tech stacks). */
export default function SkillTile({ tile }: { tile: Tile }) {
  let box;
  if ('img' in tile) {
    box = <span className="tile"><img src={tile.img} alt="" width={30} height={30} loading="lazy" /></span>;
  } else if ('glyph' in tile) {
    box = <span className="tile tile--glyph" style={{ '--c': tile.color } as CSSProperties}><Icon name={tile.glyph} line={tile.line} /></span>;
  } else if ('monoGlyph' in tile) {
    box = <span className="tile tile--mono" style={{ '--bg': tile.bg, '--c': tile.color } as CSSProperties}><Icon name={tile.monoGlyph} line /></span>;
  } else {
    box = <span className={`tile tile--mono${tile.word ? ' tile--word' : ''}`} style={{ '--bg': tile.bg, '--c': tile.color } as CSSProperties}>{tile.mono}</span>;
  }
  return <li>{box}{tile.label}</li>;
}

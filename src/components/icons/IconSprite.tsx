import { SPRITE } from './sprite';

/** Inline SVG sprite: every <Icon> references a <symbol> from here. */
export default function IconSprite() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      dangerouslySetInnerHTML={{
        __html: `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">${SPRITE}</svg>`,
      }}
    />
  );
}

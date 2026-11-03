import type { CSSProperties } from 'react';
import type { Article } from '@/content/types';
import { hash } from '@/lib/format';

/** Article cover: your image, or a generated editorial cover in the site's language. */
export default function ArticleCover({ article, priority }: { article: Article; priority?: boolean }) {
  if (article.cover) {
    return (
      <div className="acover">
        <img src={article.cover} alt={article.coverAlt ?? ''} loading={priority ? 'eager' : 'lazy'} decoding="async" />
      </div>
    );
  }
  const h = hash(article.id);
  const style = {
    '--gx': `${20 + (h % 60)}%`,
    '--gy': `${15 + ((h >> 8) % 55)}%`,
    '--rot': `${(h >> 4) % 2 ? -8 : 6}deg`,
  } as CSSProperties;
  const topic = article.tags[0] ?? 'Writing';
  return (
    <div className="acover acover--generated" style={style} aria-hidden="true">
      <span className="acover__topic">{topic}</span>
      <span className="acover__mark">AP<b>.</b></span>
    </div>
  );
}

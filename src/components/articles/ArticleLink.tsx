import type { ReactNode } from 'react';
import type { Article } from '@/content/types';

/** Opens the original publication. Placeholders render as plain blocks, never fake links. */
export default function ArticleLink({ article, className, children }: { article: Article; className: string; children: ReactNode }) {
  if (article.placeholder || !article.url) {
    return <div className={`${className} is-placeholder`}>{children}</div>;
  }
  return (
    <a className={className} href={article.url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

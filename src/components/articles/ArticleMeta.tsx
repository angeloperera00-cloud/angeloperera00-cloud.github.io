import { Fragment, type ReactNode } from 'react';
import Icon from '@/components/icons/Icon';
import type { Article } from '@/content/types';
import { formatDate } from '@/lib/format';
import { PLATFORM_LABEL } from '@/lib/articles';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';


/** Date · reading time · platform. Placeholders show labelled slots; real articles skip unknown fields. */
export default function ArticleMeta({ article, lang }: { article: Article; lang: Lang }) {
  const s = t(lang).writing;
  const ph = article.placeholder;
  const parts: ReactNode[] = [];
  if (article.date) parts.push(<time dateTime={article.date}>{formatDate(article.date, lang)}</time>);
  else if (ph) parts.push(<span className="ameta__ph">{s.pubDate}</span>);
  if (article.readingMinutes) parts.push(<span><Icon name="i-clock" />{article.readingMinutes} {s.minRead}</span>);
  else if (ph) parts.push(<span><Icon name="i-clock" /><span className="ameta__ph">{s.readTime}</span></span>);
  parts.push(<span>{PLATFORM_LABEL[article.platform]}</span>);
  return (
    <p className="ameta">
      {parts.map((p, i) => (
        <Fragment key={i}>{i > 0 && <i aria-hidden="true" />}{p}</Fragment>
      ))}
    </p>
  );
}

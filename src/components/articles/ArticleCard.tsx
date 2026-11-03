import type { CSSProperties } from 'react';
import Icon from '@/components/icons/Icon';
import ArticleCover from './ArticleCover';
import ArticleMeta from './ArticleMeta';
import ArticleLink from './ArticleLink';
import type { Article } from '@/content/types';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';


export default function ArticleCard({ article, index, style, lang }: { article: Article; index?: number; style?: CSSProperties; lang: Lang }) {
  return (
    <ArticleLink article={article} className="acard">
      <div className="acard__media">
        <ArticleCover article={article} />
        {article.placeholder && <span className="draft-pill">{t(lang).projects.placeholder}</span>}
      </div>
      <div className="acard__body" style={style}>
        {index !== undefined && <span className="acard__no" aria-hidden="true">{String(index).padStart(2, '0')}</span>}
        <ArticleMeta article={article} lang={lang} />
        <h3 className="acard__title"><span>{article.title}</span></h3>
        {article.excerpt && <p className="acard__excerpt">{article.excerpt}</p>}
        <div className="acard__foot">
          <ul className="atags">{article.tags.slice(0, 3).map((x) => <li key={x}>{x}</li>)}</ul>
          {!article.placeholder && <Icon name="i-arrow-up-right" className="acard__arrow" />}
        </div>
      </div>
    </ArticleLink>
  );
}

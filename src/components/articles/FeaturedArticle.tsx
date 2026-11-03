import Icon from '@/components/icons/Icon';
import ArticleCover from './ArticleCover';
import ArticleMeta from './ArticleMeta';
import ArticleLink from './ArticleLink';
import type { Article } from '@/content/types';
import type { Lang } from '@/i18n';
import { t } from '@/i18n/ui';


export default function FeaturedArticle({ article, lang }: { article: Article; lang: Lang }) {
  const s = t(lang).writing;
  return (
    <ArticleLink article={article} className="afeature">
      <div className="afeature__media">
        <ArticleCover article={article} priority />
      </div>
      <div className="afeature__body">
        <p className="akicker">
          <span className="akicker__label">{s.featured}</span>
          {article.tags[0] && <span>{article.tags[0]}</span>}
          {article.placeholder && <span className="draft-pill">{t(lang).projects.placeholder}</span>}
        </p>
        <h3 className="afeature__title"><span>{article.title}</span></h3>
        {article.excerpt && <p className="afeature__excerpt">{article.excerpt}</p>}
        <ArticleMeta article={article} lang={lang} />
        {!article.placeholder && (
          <span className="aread">{s.read} <Icon name="i-arrow-up-right" /></span>
        )}
      </div>
    </ArticleLink>
  );
}

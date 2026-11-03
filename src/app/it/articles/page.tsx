import type { Metadata } from 'next';
import ArticlesView from '@/views/ArticlesView';
import { t } from '@/i18n/ui';

export const metadata: Metadata = {
  title: t('it').meta.writing,
  description: t('it').writing.lede,
  alternates: { languages: { en: '/articles/', it: '/it/articles/' } },
};

export default function ArticlesPageIt() {
  return <ArticlesView lang="it" />;
}

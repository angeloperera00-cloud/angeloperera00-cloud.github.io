import type { Metadata } from 'next';
import ArticlesView from '@/views/ArticlesView';
import { t } from '@/i18n/ui';

export const metadata: Metadata = {
  title: t('en').meta.writing,
  description: t('en').writing.lede,
  alternates: { languages: { en: '/articles/', it: '/it/articles/' } },
};

export default function ArticlesPage() {
  return <ArticlesView lang="en" />;
}

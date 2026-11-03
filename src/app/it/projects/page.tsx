import type { Metadata } from 'next';
import ProjectsView from '@/views/ProjectsView';
import { t } from '@/i18n/ui';

export const metadata: Metadata = {
  title: t('it').meta.projects,
  description: t('it').meta.projectsDesc,
  alternates: { languages: { en: '/projects/', it: '/it/projects/' } },
};

export default function ProjectsPageIt() {
  return <ProjectsView lang="it" />;
}

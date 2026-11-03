import type { Metadata } from 'next';
import ProjectsView from '@/views/ProjectsView';
import { t } from '@/i18n/ui';

export const metadata: Metadata = {
  title: t('en').meta.projects,
  description: t('en').meta.projectsDesc,
  alternates: { languages: { en: '/projects/', it: '/it/projects/' } },
};

export default function ProjectsPage() {
  return <ProjectsView lang="en" />;
}

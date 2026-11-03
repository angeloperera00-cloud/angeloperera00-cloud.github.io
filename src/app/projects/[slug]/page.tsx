import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectView, { projectMetadata } from '@/views/ProjectView';
import { getProject, getPublishedProjects } from '@/lib/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return projectMetadata((await params).slug, 'en');
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug, 'en');
  if (!p) notFound();
  return <ProjectView project={p} lang="en" />;
}

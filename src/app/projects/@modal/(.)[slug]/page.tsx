import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projects';
import { ProjectModal } from '@/components/ProjectModal';

export default async function ProjectModalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectModal project={project} />;
}

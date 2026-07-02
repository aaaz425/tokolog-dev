import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { ProjectDetailCard } from '@/components/ProjectDetailCard';

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project?.title ?? 'Project' };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-body text-sm text-slate-600 hover:text-slate-800 transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft size={16} />
        Projects로 돌아가기
      </Link>

      <ProjectDetailCard project={project} />
    </div>
  );
}

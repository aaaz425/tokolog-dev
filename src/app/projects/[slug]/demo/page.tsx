import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { DemoLoader } from '@/components/DemoLoader';

export async function generateStaticParams() {
  return getAllProjects()
    .filter((p) => p.hasDemo)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? `${project.title} Demo` : 'Demo' };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !project.hasDemo) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href={`/projects/${slug}`}
        className="inline-flex items-center gap-1.5 font-body text-sm text-slate-600 hover:text-slate-800 transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft size={16} />
        {project.title}로 돌아가기
      </Link>

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-slate-800 mb-1">
          {project.title} — 데모
        </h1>
        <p className="font-body text-sm text-slate-600">
          목 데이터로 구동되는 인터랙티브 데모입니다.
        </p>
      </div>

      <DemoLoader slug={slug} />
    </div>
  );
}

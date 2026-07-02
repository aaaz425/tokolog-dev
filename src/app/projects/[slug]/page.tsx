import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Code2, ExternalLink, Play } from 'lucide-react';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { TagBadge } from '@/components/TagBadge';
import type { ProjectType } from '@/types/project';

const TYPE_LABELS: Record<ProjectType, string> = {
  company: '회사',
  team: '팀',
  personal: '개인',
};

const TYPE_STYLES: Record<ProjectType, string> = {
  company: 'bg-black text-white',
  team: 'bg-[#424242] text-white',
  personal: 'bg-blue-600 text-white',
};

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

  const fmt = (d: string) => d.replace('-', '.');
  const period = project.endDate
    ? `${fmt(project.startDate)} ~ ${fmt(project.endDate)}`
    : `${fmt(project.startDate)} ~ 진행 중`;

  return (
    <div className="max-w-3xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 font-body text-sm text-[#424242] hover:text-black transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Projects로 돌아가기
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="aspect-video bg-neutral-100 flex items-center justify-center">
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-heading text-7xl font-bold text-neutral-200">
              {project.title[0]}
            </span>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`font-body text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_STYLES[project.type]}`}
                >
                  {TYPE_LABELS[project.type]}
                </span>
                <span className="font-body text-xs text-gray-400">{period}</span>
              </div>
              <h1 className="font-heading text-2xl font-bold text-black">{project.title}</h1>
            </div>

            {project.hasDemo && (
              <Link
                href={`/projects/${project.slug}/demo`}
                className="flex-shrink-0 flex items-center gap-1.5 bg-black text-white font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-[#424242] transition-colors"
              >
                <Play size={14} />
                Demo
              </Link>
            )}
          </div>

          <p className="font-body text-sm text-[#424242] leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mb-6">
            <h2 className="font-heading text-sm font-semibold text-black mb-2">기술 스택</h2>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
          </div>

          {(project.githubUrl || project.deployUrl) && (
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-black text-black font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <Code2 size={16} />
                  GitHub
                </a>
              )}
              {project.deployUrl && (
                <a
                  href={project.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-black text-black font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <ExternalLink size={16} />
                  배포 링크
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

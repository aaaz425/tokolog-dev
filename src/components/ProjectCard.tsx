import Link from 'next/link';
import { TagBadge } from '@/components/TagBadge';
import { MotionCardSurface } from '@/components/motion/MotionCardSurface';
import type { Project, ProjectType } from '@/types/project';

const TYPE_STYLES: Record<ProjectType, string> = {
  company: 'bg-slate-200 text-slate-700',
  team: 'bg-slate-100 text-slate-600',
  personal: 'bg-accent-50 text-accent-600',
};

const TYPE_LABELS: Record<ProjectType, string> = {
  company: '회사',
  team: '팀',
  personal: '개인',
};

interface ProjectCardProps {
  project: Project;
}

function formatPeriod(startDate: string, endDate?: string) {
  const fmt = (d: string) => d.replace('-', '.');
  return endDate ? `${fmt(startDate)} ~ ${fmt(endDate)}` : `${fmt(startDate)} ~ 진행 중`;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <MotionCardSurface
        captureOrigin
        className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
      >
        <div className="aspect-video bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="font-heading text-4xl font-bold text-slate-300">
              {project.title[0]}
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`font-body text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_STYLES[project.type]}`}
            >
              {TYPE_LABELS[project.type]}
            </span>
            <span className="font-body text-xs text-slate-400">
              {formatPeriod(project.startDate, project.endDate)}
            </span>
          </div>
          <h3 className="font-heading text-base font-semibold text-slate-800 mb-1">
            {project.title}
          </h3>
          <p className="font-body text-sm text-slate-600 line-clamp-2 mb-3 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 5).map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
            {project.techStack.length > 5 && (
              <span className="font-body text-xs text-slate-400">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        </div>
      </MotionCardSurface>
    </Link>
  );
}

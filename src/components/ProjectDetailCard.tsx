import Link from 'next/link';
import { Code2, ExternalLink, Play } from 'lucide-react';
import { TagBadge } from '@/components/TagBadge';
import { MotionPill } from '@/components/motion/MotionPill';
import type { Project, ProjectType } from '@/types/project';

const TYPE_LABELS: Record<ProjectType, string> = {
  company: '회사',
  team: '팀',
  personal: '개인',
};

const TYPE_STYLES: Record<ProjectType, string> = {
  company: 'bg-slate-200 text-slate-700',
  team: 'bg-slate-100 text-slate-600',
  personal: 'bg-accent-50 text-accent-600',
};

function formatPeriod(startDate: string, endDate?: string) {
  const fmt = (d: string) => d.replace('-', '.');
  return endDate ? `${fmt(startDate)} ~ ${fmt(endDate)}` : `${fmt(startDate)} ~ 진행 중`;
}

interface ProjectDetailCardProps {
  project: Project;
  glass?: boolean;
  onDemoClick?: () => void;
}

export function ProjectDetailCard({ project, glass = false, onDemoClick }: ProjectDetailCardProps) {
  const cardStyle = glass
    ? 'bg-white/70 backdrop-blur-2xl border border-white/70 shadow-2xl'
    : 'bg-white border border-slate-200 shadow-sm';

  return (
    <div className={`rounded-lg overflow-hidden ${cardStyle}`}>
      <div className="aspect-video bg-slate-100 flex items-center justify-center">
        {project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-heading text-7xl font-bold text-slate-200">{project.title[0]}</span>
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
              <span className="font-body text-xs text-slate-400">
                {formatPeriod(project.startDate, project.endDate)}
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-slate-800">{project.title}</h1>
          </div>

          {project.hasDemo &&
            (onDemoClick ? (
              <button onClick={onDemoClick} className="flex-shrink-0">
                <MotionPill className="flex items-center gap-1.5 bg-accent-600 text-white font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-accent-500 transition-colors cursor-pointer">
                  <Play size={14} />
                  Demo
                </MotionPill>
              </button>
            ) : (
              <Link href={`/projects/${project.slug}/demo`} className="flex-shrink-0">
                <MotionPill className="flex items-center gap-1.5 bg-accent-600 text-white font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-accent-500 transition-colors cursor-pointer">
                  <Play size={14} />
                  Demo
                </MotionPill>
              </Link>
            ))}
        </div>

        <p className="font-body text-sm text-slate-600 leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="mb-6">
          <h2 className="font-heading text-sm font-semibold text-slate-800 mb-2">기술 스택</h2>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tag) => (
              <TagBadge key={tag} label={tag} />
            ))}
          </div>
        </div>

        {(project.githubUrl || project.deployUrl) && (
          <div className="flex gap-3 pt-4 border-t border-slate-200/60">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <MotionPill className="flex items-center gap-1.5 border border-slate-300 text-slate-700 font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer">
                  <Code2 size={16} />
                  GitHub
                </MotionPill>
              </a>
            )}
            {project.deployUrl && (
              <a href={project.deployUrl} target="_blank" rel="noopener noreferrer">
                <MotionPill className="flex items-center gap-1.5 border border-slate-300 text-slate-700 font-body text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer">
                  <ExternalLink size={16} />
                  배포 링크
                </MotionPill>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/project';
import { TagBadge } from './TagBadge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  const typeLabel = project.type === 'company' ? '사내' : '개인';
  const typeBg =
    project.type === 'company'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-emerald-100 text-emerald-700';

  const period = project.endDate
    ? `${project.startDate} ~ ${project.endDate}`
    : `${project.startDate} ~ 진행 중`;

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="text-base font-semibold text-gray-900 leading-snug">
          {project.title}
        </h2>
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${typeBg}`}
        >
          {typeLabel}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.techStack.slice(0, 5).map((tag) => (
          <TagBadge key={tag} label={tag} />
        ))}
        {project.techStack.length > 5 && (
          <span className="text-xs text-gray-400">
            +{project.techStack.length - 5}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400">{period}</p>
    </div>
  );
}

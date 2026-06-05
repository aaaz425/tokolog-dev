import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import type { Project } from '../types/project';
import { TagBadge } from './TagBadge';

interface ProjectCardProps {
  project: Project;
}

const TYPE_STYLES: Record<string, string> = {
  company: 'bg-black text-white',
  personal: 'bg-blue-600 text-white',
};

const TYPE_LABELS: Record<string, string> = {
  company: '회사',
  personal: '개인',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const { deleteProject } = useProjectStore();

  const period = project.endDate
    ? `${project.startDate} ~ ${project.endDate}`
    : `${project.startDate} ~ 진행 중`;

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm('이 프로젝트를 삭제할까요?')) return;
    await deleteProject(project.id);
  }

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="relative group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer select-none"
    >
      {/* 썸네일 플레이스홀더 */}
      <div className="aspect-video bg-neutral-100 flex items-center justify-center relative">
        <span className="font-heading text-2xl font-bold text-neutral-300">
          {project.title.charAt(0)}
        </span>

        {/* hover 삭제 버튼 */}
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-10"
          aria-label="프로젝트 삭제"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`font-body text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_STYLES[project.type] ?? 'bg-gray-100 text-[#424242]'}`}
          >
            {TYPE_LABELS[project.type] ?? project.type}
          </span>
          <span className="font-body text-xs text-gray-400">{period}</span>
        </div>
        <h3 className="font-heading text-base font-semibold text-black mb-1 leading-snug">
          {project.title}
        </h3>
        <p className="font-body text-sm text-[#424242] mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 5).map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
          {project.techStack.length > 5 && (
            <span className="font-body text-xs text-gray-400">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

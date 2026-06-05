import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { TagBadge } from '../components/TagBadge';
import { useProjectStore } from '../store/projectStore';
import type { Project, ProjectType } from '../types/project';

const TYPE_STYLES: Record<string, string> = {
  company: 'bg-black text-white',
  personal: 'bg-blue-600 text-white',
};

const TYPE_LABELS: Record<string, string> = {
  company: '회사',
  personal: '개인',
};

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, updateProject, deleteProject } = useProjectStore();
  const project = projects.find((p) => p.id === id);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<Project>>({});

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-24 text-gray-400">
          <p className="font-body text-sm">프로젝트를 찾을 수 없어요.</p>
          <button
            onClick={() => navigate('/projects')}
            className="mt-4 font-body text-sm text-black hover:underline"
          >
            목록으로
          </button>
        </div>
      </Layout>
    );
  }

  function startEdit() {
    setForm({
      title: project!.title,
      type: project!.type,
      description: project!.description,
      techStack: project!.techStack,
      startDate: project!.startDate,
      endDate: project!.endDate,
    });
    setEditing(true);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const techStack =
      typeof form.techStack === 'string'
        ? (form.techStack as string).split(',').map((t) => t.trim()).filter(Boolean)
        : form.techStack ?? project!.techStack;

    updateProject(project!.id, { ...form, techStack });
    setEditing(false);
  }

  function handleDelete() {
    if (!confirm('이 프로젝트를 삭제할까요?')) return;
    deleteProject(project!.id);
    navigate('/projects');
  }

  const period = project.endDate
    ? `${project.startDate} ~ ${project.endDate}`
    : `${project.startDate} ~ 진행 중`;

  const inputClass =
    'w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors';
  const labelClass = 'block font-body text-xs font-medium text-[#424242] mb-1';

  return (
    <Layout>
      <button
        onClick={() => navigate('/projects')}
        className="font-body text-sm text-gray-400 hover:text-black mb-6 flex items-center gap-1 transition-colors cursor-pointer"
      >
        ← 목록으로
      </button>

      {editing ? (
        <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 max-w-2xl">
          <div>
            <label className={labelClass}>프로젝트명</label>
            <input
              required
              value={form.title ?? ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>유형</label>
            <select
              value={form.type ?? project.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as ProjectType })}
              className={inputClass}
            >
              <option value="personal">개인</option>
              <option value="company">사내</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>설명</label>
            <textarea
              required
              value={form.description ?? ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className={labelClass}>기술 스택 (쉼표로 구분)</label>
            <input
              value={Array.isArray(form.techStack) ? form.techStack.join(', ') : (form.techStack ?? '')}
              onChange={(e) => setForm({ ...form, techStack: e.target.value as unknown as string[] })}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>시작일</label>
              <input
                required
                type="month"
                value={form.startDate ?? ''}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>종료일</label>
              <input
                type="month"
                value={form.endDate ?? ''}
                onChange={(e) => setForm({ ...form, endDate: e.target.value || undefined })}
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex-1 border border-gray-200 text-[#424242] font-body text-sm font-medium py-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 bg-black text-white font-body text-sm font-medium py-2 rounded-full hover:bg-[#424242] transition-colors cursor-pointer"
            >
              저장
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
          {/* 썸네일 */}
          <div className="aspect-video bg-neutral-100 rounded-md flex items-center justify-center mb-5">
            <span className="font-heading text-4xl font-bold text-neutral-300">
              {project.title.charAt(0)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3 mb-3">
            <h1 className="font-heading text-xl font-bold text-black">{project.title}</h1>
            <span className={`shrink-0 font-body text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_STYLES[project.type] ?? 'bg-gray-100 text-[#424242]'}`}>
              {TYPE_LABELS[project.type] ?? project.type}
            </span>
          </div>

          <p className="font-body text-xs text-gray-400 mb-3">{period}</p>
          <p className="font-body text-sm text-[#424242] mb-5 leading-relaxed">{project.description}</p>

          {project.techStack.length > 0 && (
            <div className="mb-5">
              <p className="font-body text-xs font-medium text-[#424242] mb-2">기술 스택</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tag) => (
                  <TagBadge key={tag} label={tag} />
                ))}
              </div>
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div className="mb-5">
              <p className="font-body text-xs font-medium text-[#424242] mb-2">링크</p>
              <div className="flex flex-col gap-1">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-black underline hover:text-[#424242] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <button
              onClick={startEdit}
              className="font-body px-4 py-1.5 text-sm font-medium border border-gray-200 text-[#424242] rounded-full hover:border-black hover:text-black transition-colors cursor-pointer"
            >
              편집
            </button>
            <button
              onClick={handleDelete}
              className="font-body px-4 py-1.5 text-sm font-medium border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

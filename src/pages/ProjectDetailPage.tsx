import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { TagBadge } from '../components/TagBadge';
import { useProjectStore } from '../store/projectStore';
import type { Project, ProjectType } from '../types/project';

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
          <p className="text-sm">프로젝트를 찾을 수 없어요.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-indigo-600 text-sm hover:underline"
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
        ? (form.techStack as string)
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : form.techStack ?? project!.techStack;

    updateProject(project!.id, { ...form, techStack });
    setEditing(false);
  }

  function handleDelete() {
    if (!confirm('이 프로젝트를 삭제할까요?')) return;
    deleteProject(project!.id);
    navigate('/');
  }

  const typeLabel = project.type === 'company' ? '사내' : '개인';
  const typeBg =
    project.type === 'company'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-emerald-100 text-emerald-700';
  const period = project.endDate
    ? `${project.startDate} ~ ${project.endDate}`
    : `${project.startDate} ~ 진행 중`;

  return (
    <Layout>
      <button
        onClick={() => navigate('/')}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1"
      >
        ← 목록으로
      </button>

      {editing ? (
        <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">프로젝트명</label>
            <input
              required
              value={form.title ?? ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">유형</label>
            <select
              value={form.type ?? project.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as ProjectType })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            >
              <option value="personal">개인</option>
              <option value="company">사내</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">설명</label>
            <textarea
              required
              value={form.description ?? ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">기술 스택 (쉼표로 구분)</label>
            <input
              value={
                Array.isArray(form.techStack)
                  ? form.techStack.join(', ')
                  : (form.techStack ?? '')
              }
              onChange={(e) => setForm({ ...form, techStack: e.target.value as unknown as string[] })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">시작일</label>
              <input
                required
                type="month"
                value={form.startDate ?? ''}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">종료일</label>
              <input
                type="month"
                value={form.endDate ?? ''}
                onChange={(e) => setForm({ ...form, endDate: e.target.value || undefined })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-indigo-700"
            >
              저장
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-2xl">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h1 className="text-xl font-bold text-gray-900">{project.title}</h1>
            <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${typeBg}`}>
              {typeLabel}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">{period}</p>
          <p className="text-sm text-gray-700 mb-5 leading-relaxed">{project.description}</p>

          {project.techStack.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-medium text-gray-500 mb-2">기술 스택</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tag) => (
                  <TagBadge key={tag} label={tag} />
                ))}
              </div>
            </div>
          )}

          {project.links && project.links.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-medium text-gray-500 mb-2">링크</p>
              <div className="flex flex-col gap-1">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2 border-t border-gray-100 mt-4">
            <button
              onClick={startEdit}
              className="px-4 py-1.5 text-sm font-medium border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
            >
              편집
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-1.5 text-sm font-medium border border-red-200 text-red-500 rounded-lg hover:bg-red-50"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

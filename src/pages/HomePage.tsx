import { useState } from 'react';
import { Layout } from '../components/Layout';
import { ProjectCard } from '../components/ProjectCard';
import { useProjectStore } from '../store/projectStore';
import type { Project, ProjectType } from '../types/project';

type FilterType = 'all' | ProjectType;

const EMPTY_FORM = {
  title: '',
  type: 'personal' as ProjectType,
  description: '',
  techStack: '',
  startDate: '',
  endDate: '',
};

export function HomePage() {
  const { projects, addProject } = useProjectStore();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.type === filter);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const project: Project = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      type: form.type,
      description: form.description.trim(),
      techStack: form.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      startDate: form.startDate,
      endDate: form.endDate || undefined,
      createdAt: new Date().toISOString(),
    };
    addProject(project);
    setForm(EMPTY_FORM);
    setShowModal(false);
  }

  const tabs: { label: string; value: FilterType }[] = [
    { label: '전체', value: 'all' },
    { label: '사내', value: 'company' },
    { label: '개인', value: 'personal' },
  ];

  return (
    <Layout onAddProject={() => setShowModal(true)}>
      <div className="flex items-center gap-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-4xl mb-3">📂</p>
          <p className="text-sm">프로젝트가 없어요. 새 프로젝트를 추가해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">새 프로젝트</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  프로젝트명 *
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                  placeholder="MyStack"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  유형 *
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value as ProjectType })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                >
                  <option value="personal">개인</option>
                  <option value="company">사내</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  설명 *
                </label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 resize-none"
                  placeholder="프로젝트 설명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  기술 스택 (쉼표로 구분)
                </label>
                <input
                  value={form.techStack}
                  onChange={(e) =>
                    setForm({ ...form, techStack: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                  placeholder="React, TypeScript, Tailwind"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    시작일 *
                  </label>
                  <input
                    required
                    type="month"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    종료일 (비우면 진행 중)
                  </label>
                  <input
                    type="month"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
          </div>
        </div>
      )}
    </Layout>
  );
}

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

const TABS: { label: string; value: FilterType }[] = [
  { label: '전체', value: 'all' },
  { label: '사내', value: 'company' },
  { label: '개인', value: 'personal' },
];

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

  return (
    <Layout onAddProject={() => setShowModal(true)}>
      {/* 페이지 헤더 */}
      <div className="mb-6">
        <h1 className="font-heading text-4xl font-bold text-black mb-1">Projects</h1>
        <p className="font-body text-sm text-[#424242]">
          A showcase of my recent work across various domains, ranging from individual experiments to large-scale team deployments.
        </p>
      </div>

      {/* PC 액션 버튼 행 */}
      <div className="hidden lg:flex items-center gap-3 mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 font-body text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-[#424242] transition-colors"
        >
          + New Project
        </button>
        <button className="flex items-center gap-2 font-body text-sm font-medium border border-black text-black px-4 py-2 rounded-full hover:bg-neutral-100 transition-colors">
          Filter
        </button>
      </div>

      {/* 필터 탭 */}
      <div className="flex items-center gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`font-body px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === tab.value
                ? 'bg-black text-white'
                : 'border border-gray-200 text-[#424242] hover:border-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 카드 그리드 */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="font-body text-sm">프로젝트가 없어요. 새 프로젝트를 추가해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* 새 프로젝트 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-heading text-base font-semibold text-black">새 프로젝트</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-black text-xl leading-none transition-colors"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block font-body text-xs font-medium text-[#424242] mb-1">
                  프로젝트명 *
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                  placeholder="MyStack"
                />
              </div>
              <div>
                <label className="block font-body text-xs font-medium text-[#424242] mb-1">
                  유형 *
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as ProjectType })}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black focus:outline-none focus:border-black transition-colors"
                >
                  <option value="personal">개인</option>
                  <option value="company">사내</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-xs font-medium text-[#424242] mb-1">
                  설명 *
                </label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black resize-none transition-colors"
                  placeholder="프로젝트 설명을 입력하세요"
                />
              </div>
              <div>
                <label className="block font-body text-xs font-medium text-[#424242] mb-1">
                  기술 스택 (쉼표로 구분)
                </label>
                <input
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  className="w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                  placeholder="React, TypeScript, Tailwind"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-xs font-medium text-[#424242] mb-1">
                    시작일 *
                  </label>
                  <input
                    required
                    type="month"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs font-medium text-[#424242] mb-1">
                    종료일 (비우면 진행 중)
                  </label>
                  <input
                    type="month"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 font-body text-sm text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-[#424242] font-body text-sm font-medium py-2 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-black text-white font-body text-sm font-medium py-2 rounded-full hover:bg-[#424242] transition-colors"
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

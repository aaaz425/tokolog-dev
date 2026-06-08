import { useState } from 'react';
import { Image, GitBranch, ExternalLink } from 'lucide-react';
import { Modal } from './Modal';
import { useProjectStore } from '../store/projectStore';
import type { ProjectType } from '../types/project';

const TYPE_OPTIONS: { value: ProjectType; label: string }[] = [
  { value: 'personal', label: '개인' },
  { value: 'team', label: '팀' },
  { value: 'company', label: '사내' },
  { value: 'education', label: '교육' },
];

const INITIAL_FORM = {
  title: '',
  type: 'personal' as ProjectType,
  startDate: '',
  endDate: '',
  leader: '',
  description: '',
  thumbnailUrl: '',
  githubUrl: '',
  deployUrl: '',
};

const inputClass =
  'w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-300';
const labelClass = 'block text-xs font-medium text-[#424242] mb-1';

interface ProjectFormModalProps {
  onClose: () => void;
}

export function ProjectFormModal({ onClose }: ProjectFormModalProps) {
  const { addProject, loading } = useProjectStore();
  const [form, setForm] = useState(INITIAL_FORM);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');

  function updateForm(updates: Partial<typeof INITIAL_FORM>) {
    setForm((prev) => ({ ...prev, ...updates }));
  }

  function handleTechKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = techInput.trim().replace(/,$/, '');
      if (tag && !techStack.includes(tag)) {
        setTechStack((prev) => [...prev, tag]);
      }
      setTechInput('');
    }
  }

  async function handleSubmit() {
    await addProject({
      title: form.title,
      type: form.type,
      description: form.description,
      techStack,
      startDate: form.startDate,
      endDate: form.endDate || undefined,
      leader: form.leader || undefined,
      thumbnailUrl: form.thumbnailUrl || undefined,
      githubUrl: form.githubUrl || undefined,
      deployUrl: form.deployUrl || undefined,
    });
    onClose();
  }

  return (
    <Modal title="Add New Project" onClose={onClose}>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">

          {/* 프로젝트명 */}
          <div>
            <label className={labelClass}>Project Title</label>
            <input
              type="text"
              placeholder="Enter project title"
              value={form.title}
              onChange={(e) => updateForm({ title: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* 썸네일 링크 */}
          <div>
            <label className={labelClass}>Thumbnail Image Link</label>
            <div className="relative">
              <Image
                size={14}
                strokeWidth={2}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="https://..."
                value={form.thumbnailUrl}
                onChange={(e) => updateForm({ thumbnailUrl: e.target.value })}
                className={`${inputClass} pl-8`}
              />
            </div>
          </div>

          {/* 프로젝트 유형 */}
          <div>
            <label className={labelClass}>Project Type</label>
            <div className="flex gap-1">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateForm({ type: opt.value })}
                  className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors ${
                    form.type === opt.value
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-[#424242] border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 기술스택 */}
          <div>
            <label className={labelClass}>Tech Stack</label>
            <div className="border border-gray-200 rounded-md px-3 py-2 min-h-[38px] focus-within:border-black transition-colors">
              <div className="flex flex-wrap gap-1 mb-1">
                {techStack.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-gray-100 text-[#424242] text-xs font-medium px-2 py-0.5 rounded"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        setTechStack((prev) => prev.filter((t) => t !== tag))
                      }
                      className="text-gray-400 hover:text-black leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="e.g. React, Node.js, Tailwind (comma separated)"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                className="w-full text-sm outline-none placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* 기간 + 역할 */}
          <div>
            <label className={labelClass}>기간</label>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <span className="block text-xs text-gray-400 mb-1">시작</span>
                <input
                  type="month"
                  value={form.startDate}
                  onChange={(e) => updateForm({ startDate: e.target.value })}
                  className={inputClass}
                />
              </div>
              <span className="text-gray-400 pb-2">—</span>
              <div className="flex-1">
                <span className="block text-xs text-gray-400 mb-1">종료</span>
                <input
                  type="month"
                  value={form.endDate}
                  onChange={(e) => updateForm({ endDate: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="w-24">
                <span className="block text-xs text-gray-400 mb-1">역할</span>
                <input
                  type="text"
                  placeholder="Leader"
                  value={form.leader}
                  onChange={(e) => updateForm({ leader: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* GitHub */}
          <div>
            <label className={labelClass}>GitHub Repository</label>
            <div className="relative">
              <GitBranch
                size={14}
                strokeWidth={2}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="https://github.com..."
                value={form.githubUrl}
                onChange={(e) => updateForm({ githubUrl: e.target.value })}
                className={`${inputClass} pl-8`}
              />
            </div>
          </div>

          {/* 설명 */}
          <div>
            <label className={labelClass}>Project Description</label>
            <textarea
              placeholder="Briefly describe the project..."
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* 배포 링크 */}
          <div>
            <label className={labelClass}>Deployment Link</label>
            <div className="relative">
              <ExternalLink
                size={14}
                strokeWidth={2}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="https://..."
                value={form.deployUrl}
                onChange={(e) => updateForm({ deployUrl: e.target.value })}
                className={`${inputClass} pl-8`}
              />
            </div>
          </div>

        </div>

        {/* 푸터 */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#424242] border border-gray-200 rounded-full hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-[#424242] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Project
          </button>
        </div>
      </div>
    </Modal>
  );
}

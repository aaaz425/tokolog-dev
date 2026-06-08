import { useState, useRef, useEffect } from 'react';
import { Image, GitBranch, ExternalLink, ChevronDown, Calendar } from 'lucide-react';
import { Modal } from './Modal';
import { useProjectStore } from '../store/projectStore';
import type { ProjectType } from '../types/project';

const TYPE_OPTIONS: { value: ProjectType; label: string }[] = [
  { value: 'personal', label: '개인' },
  { value: 'team', label: '팀' },
  { value: 'company', label: '사내' },
  { value: 'education', label: '교육' },
];

const ROLE_OPTIONS = ['리더', '팀원', '기획자', '디자이너', '개발자', '기여자'];

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
  const [roleOpen, setRoleOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0, width: 0 });
  const roleRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!roleOpen) return;
    function handleOutside(e: MouseEvent) {
      const inTrigger = roleRef.current?.contains(e.target as Node);
      const inDropdown = dropdownRef.current?.contains(e.target as Node);
      if (!inTrigger && !inDropdown) setRoleOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [roleOpen]);

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

  function handleRoleToggle() {
    if (roleRef.current) {
      const rect = roleRef.current.getBoundingClientRect();
      setDropdownStyle({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    setRoleOpen((o) => !o);
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

  const footer = (
    <div className="flex justify-end gap-2">
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
  );

  return (
    <Modal title="Add New Project" onClose={onClose} footer={footer}>
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
              <Image size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
            <div className="border border-gray-200 rounded-md px-3 py-2 focus-within:border-black transition-colors">
              <input
                type="text"
                placeholder="e.g. React, Node.js, Tailwind (comma separated)"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
                className="w-full text-sm outline-none placeholder:text-gray-300"
              />
              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {techStack.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setTechStack((prev) => prev.filter((t) => t !== tag))}
                      className="flex items-center gap-1 bg-gray-100 text-[#424242] text-xs font-medium px-2 py-0.5 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      {tag} ×
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 진행기간 + 역할 */}
          <div>
            <div className="flex items-end gap-2">
              {/* 진행기간 */}
              <div className="flex-1 min-w-0">
                <label className={labelClass}>진행기간</label>
                <div className="flex items-center gap-0.5">
                  {/* 날짜 입력: 클릭 시 showPicker()로 달력 열기 */}
                  <div
                    className="flex-1 min-w-0 flex items-center border border-gray-200 rounded-md px-2 py-2 cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => startDateRef.current?.showPicker()}
                  >
                    <span className={`flex-1 text-sm select-none ${form.startDate ? 'text-[#424242]' : 'text-gray-300'}`}>
                      {form.startDate ? form.startDate.replace('-', '.') : 'YYYY.MM'}
                    </span>
                    <Calendar size={13} strokeWidth={1.5} className="text-gray-300 shrink-0" />
                    <input
                      ref={startDateRef}
                      type="month"
                      value={form.startDate}
                      onChange={(e) => updateForm({ startDate: e.target.value })}
                      className="absolute opacity-0 pointer-events-none w-0 h-0"
                    />
                  </div>
                  <span className="text-gray-300 text-xs shrink-0">-</span>
                  <div
                    className="flex-1 min-w-0 flex items-center border border-gray-200 rounded-md px-2 py-2 cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => endDateRef.current?.showPicker()}
                  >
                    <span className={`flex-1 text-sm select-none ${form.endDate ? 'text-[#424242]' : 'text-gray-300'}`}>
                      {form.endDate ? form.endDate.replace('-', '.') : 'YYYY.MM'}
                    </span>
                    <input
                      ref={endDateRef}
                      type="month"
                      value={form.endDate}
                      onChange={(e) => updateForm({ endDate: e.target.value })}
                      className="absolute opacity-0 pointer-events-none w-0 h-0"
                    />
                  </div>
                </div>
              </div>

              {/* 역할 — fixed 드롭다운 */}
              <div className="shrink-0 w-24" ref={roleRef}>
                <label className={labelClass}>역할</label>
                <button
                  type="button"
                  onClick={handleRoleToggle}
                  className={`${inputClass} flex items-center justify-between`}
                >
                  <span className={form.leader ? 'text-[#424242]' : 'text-gray-300'}>
                    {form.leader || '선택'}
                  </span>
                  <ChevronDown
                    size={13}
                    strokeWidth={2}
                    className={`text-gray-400 shrink-0 ml-1 transition-transform ${roleOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* GitHub */}
          <div>
            <label className={labelClass}>GitHub Repository</label>
            <div className="relative">
              <GitBranch size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
              <ExternalLink size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
      </div>

      {/* 역할 드롭다운 — fixed 포지셔닝으로 모달 스크롤 영향 없음 */}
      {roleOpen && (
        <div
          ref={dropdownRef}
          style={{ position: 'fixed', top: dropdownStyle.top, left: dropdownStyle.left, width: dropdownStyle.width }}
          className="bg-white border border-gray-200 rounded-md shadow-md z-[9999] overflow-hidden"
        >
          {ROLE_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { updateForm({ leader: r }); setRoleOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 transition-colors ${
                form.leader === r ? 'text-black font-medium' : 'text-[#424242]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}

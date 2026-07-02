'use client';

import { useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project, ProjectType } from '@/types/project';

type FilterTab = 'all' | ProjectType;

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'personal', label: '개인' },
  { value: 'team', label: '팀' },
  { value: 'company', label: '회사' },
];

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<FilterTab>('all');

  const visible = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`font-body text-sm font-medium px-4 py-2 rounded-full transition-colors ${
              filter === tab.value
                ? 'bg-black text-white'
                : 'border border-black text-black hover:bg-neutral-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="font-body text-sm text-gray-400 py-16 text-center">
          해당 유형의 프로젝트가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

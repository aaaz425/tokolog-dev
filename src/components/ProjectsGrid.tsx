'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import { GRID_CONTAINER_VARIANTS, PILL_TRANSITION } from '@/lib/motion';
import { useMotionSafe } from '@/hooks/useMotionSafe';
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
  const motionSafe = useMotionSafe();

  const visible = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {FILTER_TABS.map((tab) => {
          const isActive = filter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`relative font-body text-sm font-medium px-4 py-2 rounded-full transition-colors cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isActive &&
                (motionSafe ? (
                  <motion.div
                    layoutId="project-filter-pill"
                    className="absolute inset-0 bg-accent-600 rounded-full"
                    transition={PILL_TRANSITION}
                  />
                ) : (
                  <div className="absolute inset-0 bg-accent-600 rounded-full" />
                ))}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
      {visible.length === 0 ? (
        <p className="font-body text-sm text-slate-400 py-16 text-center">
          해당 유형의 프로젝트가 없습니다.
        </p>
      ) : (
        <motion.div
          variants={motionSafe ? GRID_CONTAINER_VARIANTS : undefined}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

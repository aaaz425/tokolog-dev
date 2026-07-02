'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { ProjectDetailCard } from '@/components/ProjectDetailCard';
import { DemoLoader } from '@/components/DemoLoader';
import type { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
}

type ModalView = 'detail' | 'demo';

export function ProjectModal({ project }: ProjectModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<ModalView>('detail');
  const close = () => router.back();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Demo 등 이 프로젝트의 하위 경로로 이동하면 @modal 슬롯이 이전 상태를 그대로 들고 있는
  // Next.js parallel routes 특성 때문에, 자기 경로가 아니게 되면 스스로 렌더를 멈춘다.
  if (pathname !== `/projects/${project.slug}`) {
    return null;
  }

  const isDemo = view === 'demo';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50 ${isDemo ? '' : 'p-4'}`}
      onClick={isDemo ? undefined : close}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className={
          isDemo
            ? 'relative w-full h-full overflow-y-auto rounded-none bg-slate-50'
            : 'relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="닫기"
          className={`z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-slate-600 hover:text-slate-800 transition-colors cursor-pointer ${
            isDemo ? 'fixed top-4 right-4' : 'absolute top-4 right-4'
          }`}
        >
          <X size={18} />
        </button>

        {isDemo ? (
          <div className="max-w-3xl mx-auto p-6 md:p-10">
            <button
              onClick={() => setView('detail')}
              className="inline-flex items-center gap-1.5 font-body text-sm text-slate-600 hover:text-slate-800 transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft size={16} />
              {project.title}로 돌아가기
            </button>
            <div className="mb-6">
              <h1 className="font-heading text-2xl font-bold text-slate-800 mb-1">
                {project.title} — 데모
              </h1>
              <p className="font-body text-sm text-slate-600">
                목 데이터로 구동되는 인터랙티브 데모입니다.
              </p>
            </div>
            <DemoLoader slug={project.slug} />
          </div>
        ) : (
          <ProjectDetailCard project={project} glass onDemoClick={() => setView('demo')} />
        )}
      </motion.div>
    </motion.div>
  );
}

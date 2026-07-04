'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ProjectDetailCard } from '@/components/ProjectDetailCard';
import { DemoLoader } from '@/components/DemoLoader';
import { DemoControls } from '@/components/DemoControls';
import { useActiveProjectCard } from '@/store/useActiveProjectCard';
import type { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
}

type ModalView = 'detail' | 'demo';

export function ProjectModal({ project }: ProjectModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<ModalView>('detail');
  const originRect = useActiveProjectCard((s) => s.originRect);
  const close = () => router.back();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Demo 등 이 프로젝트의 하위 경로로 이동하면 @modal 슬롯이 이전 상태를 그대로 들고 있는
  // Next.js parallel routes 특성 때문에, 자기 경로가 아니게 되면 스스로 렌더를 멈춘다.
  if (pathname !== `/projects/${project.slug}`) {
    return null;
  }

  const isDemo = view === 'demo';

  // 클릭한 카드의 화면상 위치에서 모달이 확대되며 나타나는 것처럼 보이도록,
  // 카드 중심과 뷰포트 중심의 차이를 초기 위치로 사용한다.
  const entryTransform =
    originRect && typeof window !== 'undefined'
      ? {
          opacity: 0,
          scale: 0.45,
          x: originRect.x + originRect.width / 2 - window.innerWidth / 2,
          y: originRect.y + originRect.height / 2 - window.innerHeight / 2,
        }
      : { opacity: 0, scale: 0.96, y: 8 };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50 ${isDemo ? '' : 'p-4'}`}
      onClick={isDemo ? undefined : close}
    >
      {/* 진입 애니메이션 전용 레이어 — 클릭한 카드 위치에서 확대되며 나타난다.
          레이아웃 크기 변화(데모뷰 전환)는 안쪽 레이어가 layout prop으로 별도 처리한다. */}
      <motion.div
        initial={entryTransform}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="w-full h-full flex items-center justify-center pointer-events-none"
      >
        {isDemo && project.fullscreenDemo ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-auto relative w-full h-full overflow-hidden rounded-none bg-slate-50"
            onClick={(e) => e.stopPropagation()}
          >
            <DemoLoader slug={project.slug} />
            <DemoControls onBack={() => setView('detail')} onClose={close} />
          </motion.div>
        ) : (
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className={`pointer-events-auto ${
              isDemo
                ? 'relative w-full h-full overflow-y-auto rounded-none bg-slate-50'
                : 'relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {isDemo ? (
              <>
                <div className="max-w-3xl mx-auto p-6 md:p-10">
                  <DemoLoader slug={project.slug} />
                </div>
                <DemoControls onBack={() => setView('detail')} onClose={close} />
              </>
            ) : (
              <>
                <button
                  onClick={close}
                  aria-label="닫기"
                  className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
                <ProjectDetailCard project={project} glass onDemoClick={() => setView('demo')} />
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

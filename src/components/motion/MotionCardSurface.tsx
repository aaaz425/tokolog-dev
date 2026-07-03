'use client';

import type { MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CARD_HOVER_TRANSITION, GRID_ITEM_VARIANTS } from '@/lib/motion';
import { useMotionSafe } from '@/hooks/useMotionSafe';
import { useActiveProjectCard } from '@/store/useActiveProjectCard';

interface MotionCardSurfaceProps {
  children: ReactNode;
  className: string;
  captureOrigin?: boolean;
}

export function MotionCardSurface({ children, className, captureOrigin }: MotionCardSurfaceProps) {
  const motionSafe = useMotionSafe();
  const setOriginRect = useActiveProjectCard((s) => s.setOriginRect);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!captureOrigin) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setOriginRect({ x: rect.x, y: rect.y, width: rect.width, height: rect.height });
  };

  return (
    <motion.div
      variants={motionSafe ? GRID_ITEM_VARIANTS : undefined}
      whileHover={motionSafe ? { y: -4 } : undefined}
      transition={CARD_HOVER_TRANSITION}
      onClickCapture={handleClick}
      className={className}
    >
      {children}
    </motion.div>
  );
}

'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CARD_HOVER_TRANSITION, GRID_ITEM_VARIANTS } from '@/lib/motion';
import { useMotionSafe } from '@/hooks/useMotionSafe';

interface MotionCardSurfaceProps {
  children: ReactNode;
  className: string;
}

export function MotionCardSurface({ children, className }: MotionCardSurfaceProps) {
  const motionSafe = useMotionSafe();

  return (
    <motion.div
      variants={motionSafe ? GRID_ITEM_VARIANTS : undefined}
      whileHover={motionSafe ? { y: -4 } : undefined}
      transition={CARD_HOVER_TRANSITION}
      className={className}
    >
      {children}
    </motion.div>
  );
}

'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BUTTON_TRANSITION } from '@/lib/motion';
import { useMotionSafe } from '@/hooks/useMotionSafe';

interface MotionPillProps {
  children: ReactNode;
  className: string;
}

export function MotionPill({ children, className }: MotionPillProps) {
  const motionSafe = useMotionSafe();

  return (
    <motion.span
      whileHover={motionSafe ? { scale: 1.03 } : undefined}
      whileTap={motionSafe ? { scale: 0.97 } : undefined}
      transition={BUTTON_TRANSITION}
      className={className}
    >
      {children}
    </motion.span>
  );
}

import type { Transition, Variants } from 'framer-motion';

export const PILL_TRANSITION: Transition = { type: 'spring', stiffness: 500, damping: 40 };
export const CARD_HOVER_TRANSITION: Transition = { type: 'spring', stiffness: 400, damping: 30 };
export const BUTTON_TRANSITION: Transition = { duration: 0.15, ease: 'easeOut' };

export const GRID_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
};

export const GRID_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } },
};

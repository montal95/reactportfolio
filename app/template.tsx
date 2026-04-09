'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Template
 *
 * Next.js remounts this component on every navigation (unlike layout.tsx),
 * giving Framer Motion a real unmount/remount cycle to hook into.
 * AnimatePresence in TransitionProvider coordinates exit before enter.
 *
 * exit fires as this instance unmounts (navigation away).
 * initial/animate fire as the new instance mounts (navigation in).
 *
 * useReducedMotion() respects prefers-reduced-motion (WCAG 2.3.3):
 * when true, transitions become instant opacity-only fades (no movement).
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
      transition={{ duration: reduce ? 0 : 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ minHeight: '100%' }}
    >
      {children}
    </motion.div>
  );
}

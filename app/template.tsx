'use client';

import { motion } from 'framer-motion';

/**
 * Template
 *
 * Next.js remounts this component on every navigation (unlike layout.tsx),
 * giving Framer Motion a real unmount/remount cycle to hook into.
 * AnimatePresence in TransitionProvider coordinates exit before enter.
 *
 * exit fires as this instance unmounts (navigation away).
 * initial/animate fire as the new instance mounts (navigation in).
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ minHeight: '100%' }}
    >
      {children}
    </motion.div>
  );
}

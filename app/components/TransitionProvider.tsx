'use client';

import { AnimatePresence } from 'framer-motion';

/**
 * TransitionProvider
 *
 * Thin client wrapper that holds AnimatePresence above the template boundary.
 * template.tsx remounts on every navigation, giving Framer Motion real
 * mount/unmount lifecycle events. AnimatePresence here coordinates the
 * exit of the departing template instance before the entering one mounts.
 *
 * Lives in layout.tsx — never remounts itself.
 */
export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

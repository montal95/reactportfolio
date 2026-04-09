'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * TransitionProvider
 *
 * Thin client wrapper that holds AnimatePresence above the template boundary.
 * usePathname keys the child on every navigation so AnimatePresence sees a
 * genuine unmount/remount and can sequence the exit animation before the
 * entering template mounts.
 *
 * Lives in layout.tsx — never remounts itself.
 */
export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(children as React.ReactElement, { key: pathname })}
    </AnimatePresence>
  );
}

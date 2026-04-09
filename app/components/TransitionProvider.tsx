'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * TransitionProvider
 *
 * Thin client wrapper that holds AnimatePresence above the template boundary.
 * usePathname feeds the current route as a key on a React.Fragment wrapper so
 * AnimatePresence sees a genuine unmount/remount on every navigation and can
 * sequence the exit animation (on template.tsx's motion.div) before the
 * entering template mounts.
 *
 * React.createElement(Fragment, { key }) is used instead of cloneElement
 * because children passed to a layout-level component in the Next.js App
 * Router is an opaque internal node — cloneElement on it is unsafe and throws
 * "Element type is invalid" in the Playwright/jsdom environment.
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
      {React.createElement(React.Fragment, { key: pathname }, children)}
    </AnimatePresence>
  );
}

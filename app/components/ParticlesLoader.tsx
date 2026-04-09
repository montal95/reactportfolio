'use client';

import dynamic from 'next/dynamic';

/**
 * ParticlesLoader
 *
 * Thin 'use client' wrapper that owns the next/dynamic import.
 * next/dynamic with ssr: false is only permitted in Client Components —
 * page.tsx is a Server Component and cannot call it directly.
 */
const ParticlesBackground = dynamic(
  () => import('@/app/components/ParticlesBackground'),
  { ssr: false, loading: () => null }
);

export default function ParticlesLoader() {
  return <ParticlesBackground />;
}

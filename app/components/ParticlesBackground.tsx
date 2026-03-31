'use client';

import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

// Stable config reference — defined outside component to avoid re-renders
const options = {
  particles: {
    number: {
      value: 160,
      density: { enable: false },
    },
    color: { value: '#ffffff' },
    opacity: { value: 0.1 },
    size: {
      value: { min: 0.5, max: 5 },
    },
    links: { enable: false },
    move: {
      enable: true,
      random: true,
      speed: 1,
      direction: 'top' as const,
      outModes: { default: 'out' as const },
    },
  },
} as const;

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      className="hero-particles"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options={options as any}
    />
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

// Stable config reference — defined outside component to avoid re-renders
const options: ISourceOptions = {
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
      direction: 'top',
      outModes: { default: 'out' },
    },
  },
};

export default function ParticlesBackground() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduce) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, [reduce]);

  if (reduce || !ready) return null;

  return (
    <Particles
      className="hero-particles"
      options={options}
    />
  );
}

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SocialRow from '@/app/components/SocialRow';

interface HeroContentProps {
  aboutContent: string;
  available: boolean;
  cvfile: string;
  brandImage: string;
}

/* ─── Animation variants ─────────────────────────────────────────── */

const easing = [0.25, 0.46, 0.45, 0.94] as const;

/** Container drives stagger across all text children */
const textCol = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Each text item fades up */
const textItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easing },
  },
};

/** Photo slides in from the right with a slight scale */
const photo = {
  hidden: { opacity: 0, x: 24, scale: 0.94 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.25, ease: easing },
  },
};

/* ─── Component ──────────────────────────────────────────────────── */

export default function HeroContent({
  aboutContent,
  available,
  cvfile,
  brandImage,
}: HeroContentProps) {
  return (
    <div className="hero-grid">

      {/* ── Text column ──────────────────────────────────────────── */}
      <motion.div
        className="hero-text"
        variants={textCol}
        initial="hidden"
        animate="show"
      >
        {available && (
          <motion.div
            className="available-badge"
            aria-label="Available for work"
            variants={textItem}
          >
            <span className="available-dot" aria-hidden="true" />
            Available for work
          </motion.div>
        )}

        <motion.h1 className="hero-name" variants={textItem}>
          Sam Montalvo<span className="hero-name-accent">.Jr</span>
        </motion.h1>

        <motion.p className="hero-bio" variants={textItem}>
          {aboutContent}
        </motion.p>

        <motion.div className="hero-ctas" variants={textItem}>
          <a href="/work" className="btn-primary">
            View my work
          </a>
          <a
            href={cvfile}
            className="btn-ghost"
            download
            aria-label="Download CV (PDF)"
          >
            Download CV
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          role="list"
          aria-label="Career highlights"
          variants={textItem}
        >
          <div className="hero-stat" role="listitem">
            <span className="stat-number">4+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="hero-stat" role="listitem">
            <span className="stat-number">3</span>
            <span className="stat-label">Systems Modernized</span>
          </div>
          <div className="hero-stat" role="listitem">
            <span className="stat-number">10k+</span>
            <span className="stat-label">Users Served</span>
          </div>
        </motion.div>

        <motion.div variants={textItem}>
          <SocialRow />
        </motion.div>
      </motion.div>

      {/* ── Photo column ─────────────────────────────────────────── */}
      <motion.div
        className="hero-photo-frame"
        variants={photo}
        initial="hidden"
        animate="show"
      >
        <Image
          src={brandImage}
          alt="Sam Montalvo Jr"
          width={260}
          height={260}
          priority
          className="hero-photo"
        />
      </motion.div>

    </div>
  );
}



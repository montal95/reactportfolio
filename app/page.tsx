import Image from 'next/image';
import { information } from '@/lib/data/database';
import SocialRow from '@/app/components/SocialRow';
import ParticlesBackground from '@/app/components/ParticlesBackground';

export default function Home() {
  const { aboutContent, available, cvfile, brandImage } = information;

  return (
    <section className="hero-section" aria-label="Hero">
      <ParticlesBackground />

      <div className="hero-container">
        <div className="hero-grid">

          {/* ── Text column ──────────────────────────────────────────────── */}
          <div className="hero-text">

            {available && (
              <div className="available-badge" aria-label="Available for work">
                <span className="available-dot" aria-hidden="true" />
                Available for work
              </div>
            )}

            <h1 className="hero-name">
              Sam Montalvo<span className="hero-name-accent">.Jr</span>
            </h1>

            <p className="hero-bio">{aboutContent}</p>

            <div className="hero-ctas">
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
            </div>

            <div className="hero-stats" role="list" aria-label="Career highlights">
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
            </div>

            <SocialRow />
          </div>

          {/* ── Photo column ─────────────────────────────────────────────── */}
          <div className="hero-photo-frame">
            <Image
              src={brandImage}
              alt="Sam Montalvo Jr"
              width={260}
              height={260}
              priority
              className="hero-photo"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

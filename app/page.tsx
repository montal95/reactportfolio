import { information } from '@/lib/data/database';
import HeroContent from '@/app/components/HeroContent';
import ParticlesLoader from '@/app/components/ParticlesLoader';

export default function Home() {
  const { aboutContent, available, cvfile, brandImage } = information;

  return (
    <section className="hero-section" aria-label="Hero">
      <ParticlesLoader />

      <div className="hero-container">
        <HeroContent
          aboutContent={aboutContent}
          available={available}
          cvfile={cvfile}
          brandImage={brandImage}
        />
      </div>
    </section>
  );
}

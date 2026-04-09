import dynamic from 'next/dynamic';
import { information } from '@/lib/data/database';
import HeroContent from '@/app/components/HeroContent';

const ParticlesBackground = dynamic(
  () => import('@/app/components/ParticlesBackground'),
  { ssr: false, loading: () => null }
);

export default function Home() {
  const { aboutContent, available, cvfile, brandImage } = information;

  return (
    <section className="hero-section" aria-label="Hero">
      <ParticlesBackground />

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

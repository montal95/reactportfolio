import Image from 'next/image';
import { ExternalLink } from 'react-feather';
import { portfolios } from '@/lib/data/database';

export default function Work() {
  return (
    <section
      className="page-section work-section"
      aria-labelledby="work-heading"
    >
      <div className="page-container">
        <h1 className="section-title" id="work-heading">
          My <span className="section-title-accent">Work</span>
        </h1>

        <div className="work-grid">
          {portfolios.map((project, index) => (
            <article className="project-card" key={project.id}>
              {/* Image */}
              <div className="project-image-wrap">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={560}
                  height={315}
                  className="project-image"
                  priority={index === 0}
                />
              </div>

              {/* Body */}
              <div className="project-body">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-subtitle">{project.subtitle}</p>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`View ${project.title} (opens in new tab)`}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    View project
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


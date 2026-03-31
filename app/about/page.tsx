import Image from 'next/image';
import { Code, Layers, RefreshCw, Zap, Monitor, Database } from 'react-feather';
import { information, services } from '@/lib/data/database';
import type { ComponentType } from 'react';

// ─── Icon registry ────────────────────────────────────────────────────────────

type FeatherProps = { size?: number };

const ICON_MAP: Record<string, ComponentType<FeatherProps>> = {
  code:     Code,
  layers:   Layers,
  reload:   RefreshCw,
  bolt:     Zap,
  monitor:  Monitor,
  database: Database,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  const {
    name,
    aboutContent,
    age,
    nationality,
    language,
    email,
    address,
    freelanceStatus,
    aboutImage,
    cvfile,
  } = information;

  const infoItems = [
    { label: 'Full Name',   value: name },
    { label: 'Age',         value: `${age} Years` },
    { label: 'Nationality', value: nationality },
    { label: 'Languages',   value: language },
    { label: 'Email',       value: email,            href: `mailto:${email}` },
    { label: 'Location',    value: address },
    { label: 'Freelance',   value: freelanceStatus },
  ].filter((item) => Boolean(item.value));

  return (
    <>
      {/* ── Bio ──────────────────────────────────────────────────────────── */}
      <section
        className="page-section about-section"
        aria-labelledby="about-heading"
      >
        <div className="page-container">
          <h2 className="section-title" id="about-heading">
            About <span className="section-title-accent">Me</span>
          </h2>

          <div className="about-grid">
            <div className="about-image-wrap">
              <Image
                src={aboutImage}
                alt="Chicago skyline"
                width={520}
                height={380}
                className="about-image"
              />
            </div>

            <div className="about-content">
              <h3 className="about-name">
                I am{' '}
                <span className="about-name-accent">{name}</span>
              </h3>
              <p className="about-bio">{aboutContent}</p>

              <dl className="info-grid" aria-label="Personal information">
                {infoItems.map(({ label, value, href }) => (
                  <div className="info-chip" key={label}>
                    <dt className="info-label">{label}</dt>
                    <dd className="info-value">
                      {href ? (
                        <a href={href} className="info-link">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={cvfile}
                className="btn-primary"
                download
                aria-label="Download CV (PDF)"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section
        className="page-section services-section"
        aria-labelledby="services-heading"
      >
        <div className="page-container">
          <h2 className="section-title" id="services-heading">
            What I <span className="section-title-accent">Do</span>
          </h2>

          <div className="services-grid">
            {services.map((service) => {
              const Icon = ICON_MAP[service.icon] ?? Code;
              return (
                <article className="service-card" key={service.title}>
                  <div className="service-icon" aria-hidden="true">
                    <Icon size={22} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-body">{service.details}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

import { Briefcase, BookOpen } from 'react-feather';
import { skills, experience } from '@/lib/data/database';

export default function Resume() {
  const { workingExperience, educationExperience } = experience;
  const activeCategory  = skills.find((c) => c.tier === 'active');
  const aiCategory      = skills.find((c) => c.tier === 'ai');
  const otherCategories = skills.filter((c) => c.tier === 'default');

  return (
    <>
      {/* ── Skills ────────────────────────────────────────────────────── */}
      <section
        className="page-section skills-section"
        aria-labelledby="skills-heading"
      >
        <div className="page-container">
          <h1 className="section-title" id="skills-heading">
            Skills &amp; <span className="section-title-accent">Technologies</span>
          </h1>

          {/* Active stack — featured row */}
          {activeCategory && (
            <div className="skill-block skill-block--active">
              <p className="skill-block-label">{activeCategory.category}</p>
              <div className="skill-chips">
                {activeCategory.skills.map((skill) => (
                  <span key={skill} className="skill-chip skill-chip--active">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI & Agents — featured row */}
          {aiCategory && (
            <div className="skill-block skill-block--ai">
              <p className="skill-block-label">{aiCategory.category}</p>
              <div className="skill-chips">
                {aiCategory.skills.map((skill) => (
                  <span key={skill} className="skill-chip skill-chip--ai">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Remaining categories — grid */}
          <div className="skill-categories-grid">
            {otherCategories.map((cat) => (
              <div key={cat.category} className="skill-block">
                <p className="skill-block-label">{cat.category}</p>
                <div className="skill-chips">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────────────── */}
      <section
        className="page-section experience-section"
        aria-labelledby="experience-heading"
      >
        <div className="page-container">
          <h2 className="section-title" id="experience-heading">
            My <span className="section-title-accent">Experience</span>
          </h2>

          <div className="experience-grid">
            {/* Work */}
            <div className="timeline-col">
              <h3 className="timeline-heading">
                <Briefcase size={18} aria-hidden="true" />
                Working Experience
              </h3>
              <ol className="timeline">
                {workingExperience.map((item) => (
                  <li key={item.id} className="timeline-item">
                    <span className="timeline-year">{item.year}</span>
                    <h4 className="timeline-title">{item.position}</h4>
                    <p className="timeline-company">{item.company}</p>
                    {item.details && (
                      <p className="timeline-details">{item.details}</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Education */}
            <div className="timeline-col">
              <h3 className="timeline-heading">
                <BookOpen size={18} aria-hidden="true" />
                Educational Qualifications
              </h3>
              <ol className="timeline">
                {educationExperience.map((item) => (
                  <li key={item.id} className="timeline-item">
                    <span className="timeline-year">{item.year}</span>
                    <h4 className="timeline-title">{item.graduation}</h4>
                    <p className="timeline-company">{item.university}</p>
                    {item.details && (
                      <p className="timeline-details">{item.details}</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

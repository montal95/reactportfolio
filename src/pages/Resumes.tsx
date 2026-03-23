import React from "react";
import { skills, experience } from "../data/db/database";
import type { SkillCategory } from "../data/types";
import Sectiontitle from "../components/Sectiontitle";
import Smalltitle from '../components/Smalltitle';
import Layout from "../components/Layout";
import Resume from "../components/Resume";

function Resumes(): React.JSX.Element {
  const workingExperience = experience.workingExperience;
  const educationExperience = experience.educationExperience;
  const activeCategory = skills.find((c: SkillCategory) => c.tier === 'active');
  const otherCategories = skills.filter((c: SkillCategory) => c.tier !== 'active');

  return (
    <Layout>
      <div className="mi-skills-area mi-section mi-padding-top">
        <div className="container">
          <Sectiontitle title="Skills &amp; Technologies" />

          {activeCategory && (
            <div className="mi-skills-active-block">
              <p className="mi-skills-active-label">{activeCategory.category}</p>
              <div className="mi-skills-chips">
                {activeCategory.skills.map(skill => (
                  <span key={skill} className="mi-skill-chip mi-skill-chip--active">{skill}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mi-skills-categories">
            {otherCategories.map((cat: SkillCategory) => (
              <div key={cat.category} className="mi-skills-category">
                <p className="mi-skills-category-label">{cat.category}</p>
                <div className="mi-skills-chips">
                  {cat.skills.map(skill => (
                    <span key={skill} className={`mi-skill-chip mi-skill-chip--${cat.tier}`}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className="mi-resume-area mi-section mi-padding-top mi-padding-bottom">
        <div className="container">
          <Sectiontitle title="Resume" />
          <Smalltitle title="Working Experience" icon="briefcase" />
          <div className="mi-resume-wrapper">
            {workingExperience.map(workingExp => (
              <Resume key={workingExp.id} resumeData={workingExp} />
            ))}
          </div>
          <div className="mt-30"></div>
          <Smalltitle title="Educational Qualifications" icon="book" />
          <div className="mi-resume-wrapper">
            {educationExperience.map(educatonExp => (
              <Resume key={educatonExp.id} resumeData={educatonExp}/>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Resumes;

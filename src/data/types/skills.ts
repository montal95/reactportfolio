export type SkillTier = 'active' | 'ai' | 'default';

export interface SkillCategory {
  category: string;
  tier: SkillTier;
  skills: string[];
}

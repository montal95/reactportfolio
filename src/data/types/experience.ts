export interface WorkExperience {
  id: number;
  year: string;
  position: string;
  company: string;
  details: string;
}

export interface EducationExperience {
  id: number;
  year: string;
  graduation: string;
  university: string;
  details: string;
}

export interface Experience {
  workingExperience: WorkExperience[];
  educationExperience: EducationExperience[];
}

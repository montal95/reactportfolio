// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface SocialLinks {
  facebook: string;
  twitter: string;
  pinterest: string;
  behance: string;
  linkedin: string;
  dribbble: string;
  github: string;
  twitch: string;
}

export interface Information {
  name: string;
  aboutContent: string;
  age: number;
  phone: string;
  nationality: string;
  language: string;
  email: string;
  address: string;
  freelanceStatus: string;
  socialLinks: SocialLinks;
  brandImage: string;
  aboutImage: string;
  aboutImageLg: string;
  cvfile: string;
}

export interface Service {
  title: string;
  icon: string;
  details: string;
}

export interface Skill {
  title: string;
  value: number;
}

export interface PortfolioItem {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  largeImageUrl: string[];
  url: string;
}

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

export interface ContactInfo {
  phoneNumbers: string[];
  emailAddress: string[];
  address: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getAge(birthdate: string): number {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const database: {
  information: Information;
  services: Service[];
  skills: Skill[];
  portfolios: PortfolioItem[];
  experience: Experience;
  contactInfo: ContactInfo;
} = {
  information: {
    name: "Sam Montalvo Jr",
    aboutContent:
      "Full-stack software engineer with roots in web development dating to 2012. Core strengths in Rails application development, legacy system modernization, and CI/CD pipeline implementation. Bilingual in English and Spanish.",
    age: getAge("1991-05-13"),
    phone: "214-686-7539",
    nationality: "American",
    language: "English, Spanish",
    email: "sammontalvojr@gmail.com",
    address: "Chicago, Illinois, USA",
    freelanceStatus: "Available",
    socialLinks: {
      facebook: "",
      twitter: "https://x.com/SamMontalvo7",
      pinterest: "",
      behance: "",
      linkedin: "https://www.linkedin.com/in/samuel-montalvo-jr/",
      dribbble: "",
      github: "https://github.com/montal95",
      twitch: "https://www.twitch.tv/samwisethecreator",
    },
    brandImage: "/images/Sam-Montalvo.webp",
    aboutImage: "/images/chicago-skyline-sm.webp",
    aboutImageLg: "/images/chicago-skyline-lg.webp",
    cvfile: "/files/Sam-Montalvo-Jr-CV.pdf",
  },
  services: [
    {
      title: "Web Design",
      icon: "color-pallet",
      details:
        "Planning out a great design is the first step to creating a great experience. Design Tools: Balsamiq, Figma, Pen & Paper",
    },
    {
      title: "Web Development",
      icon: "code",
      details:
        "I am always building, whether its for a client, or fleshing out my ever expanding toolset. Languages I speak: HTML, CSS, Javascript, Ruby, Python",
    },
  ],
  skills: [
    { title: "HTML5", value: 90 },
    { title: "CSS3", value: 75 },
    { title: "Javascript", value: 80 },
    { title: "jQuery", value: 60 },
    { title: "ReactJS", value: 80 },
    { title: "Photoshop", value: 50 },
    { title: "Ruby", value: 80 },
    { title: "Rails", value: 75 },
  ],
  portfolios: [
    {
      id: 1,
      title: "Phasmophobia Notepad",
      subtitle: "A Companion PWA mimics the same functionality of the journal in the game Phasmophobia",
      imageUrl: "/images/PhasmoNotes.webp",
      largeImageUrl: ["/images/PhasmoNotes-lg.webp"],
      url: "https://gbnotepad.netlify.app/",
    },
    {
      id: 2,
      title: "PITS",
      subtitle: "A PWA to track your plant watering schedule.",
      imageUrl: "/images/PITS-Image-SM.webp",
      largeImageUrl: ["/images/PITS-Image-LG.webp"],
      url: "https://pits-pwa-tracking.netlify.app/",
    },
    {
      id: 3,
      title: "Flatbook",
      subtitle: "Minimalist notetaking app.",
      imageUrl: "/images/Flatbook-image-sm.webp",
      largeImageUrl: ["/images/Flatbook-image-lg.webp"],
      url: "https://flatbook-smj.netlify.app/",
    },
  ],
  experience: {
    workingExperience: [
      {
        id: 1,
        year: "2021 - 2025",
        position: "Application Developer",
        company: "Select Rehabilitation",
        details:
          "Built features for the Access Manager Rails application within a 10,000+ employee healthcare organization across 46 states. Drove legacy modernization from PHP/Laravel/AngularJS to Ruby on Rails.",
      },
      {
        id: 2,
        year: "2021 - 2025",
        position: "Freelance Software Developer",
        company: "Upwork",
        details:
          "Delivered web development projects across multiple client engagements using Rails, React, and JavaScript ecosystems.",
      },
      {
        id: 3,
        year: "2019 - 2020",
        position: "Technical Support",
        company: "Personal Creations",
        details: "",
      },
      {
        id: 4,
        year: "2016 - 2019",
        position: "Electrician",
        company: "Samm's Electric",
        details: "",
      },
      {
        id: 5,
        year: "2012 - 2016",
        position: "Web Content Developer",
        company: "Mauri Pro Sailing",
        details:
          "Managed a product database of 20,000+ items and built SEO-optimized product pages. Mentored interns on web content workflows.",
      },
    ],
    educationExperience: [
      {
        id: 1,
        year: "2020",
        graduation: "Full-Stack Software Development",
        university: "Flatiron School",
        details: "Ruby on Rails & JavaScript",
      },
      {
        id: 2,
        year: "2009 - 2012",
        graduation: "Bachelor of Arts in Psychology",
        university: "University of North Texas",
        details: "",
      },
      {
        id: 3,
        year: "2009",
        graduation: "High School Diploma",
        university: "Lake Dallas High School",
        details: "",
      },
    ],
  },
  contactInfo: {
    phoneNumbers: ["214-686-7539"],
    emailAddress: ["sammontalvojr@gmail.com"],
    address: "Chicago, IL USA",
  },
};

export const { information, services, skills, portfolios, experience, contactInfo } = database;
export default database;

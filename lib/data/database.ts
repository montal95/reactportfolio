import type {
  Information,
  Service,
  SkillCategory,
  PortfolioItem,
  Experience,
  ContactInfo,
} from './types';

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
  skills: SkillCategory[];
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
    available: true,
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
      medium: "https://sammontalvojr.medium.com",
    },
    brandImage: "/images/Sam-Montalvo.webp",
    aboutImage: "/images/chicago-skyline-sm.webp",
    aboutImageLg: "/images/chicago-skyline-lg.webp",
    cvfile: "/files/Sam-Montalvo-Jr-CV.pdf",
  },
  services: [
    {
      title: "Backend API Development",
      icon: "code",
      details:
        "Building and maintaining RESTful APIs with Ruby on Rails and Node.js. TDD with rSpec, FactoryBot, and Vitest. Production experience in healthcare and enterprise environments.",
    },
    {
      title: "Legacy Modernization",
      icon: "layers",
      details:
        "Migrating legacy systems to modern stacks — PHP/Laravel to Rails, CRA to Vite, Bootstrap 4 to 5. Emphasis on incremental delivery with zero disruption to production.",
    },
    {
      title: "CI/CD & DevOps",
      icon: "reload",
      details:
        "Jenkins and GitHub Actions pipelines with automated test gates, environment-separated deployments, and AWS integrations across EC2, S3, and SNS.",
    },
    {
      title: "AI Agent Engineering",
      icon: "bolt",
      details:
        "Designing multi-agent pipelines with LangChain, LangGraph, CrewAI, and Anthropic's Model Context Protocol. Practical orchestration delivered through client work and personal tooling.",
    },
    {
      title: "Full-Stack Feature Delivery",
      icon: "monitor",
      details:
        "End-to-end feature ownership across Rails backends, React frontends, and Hotwire-powered interfaces. Experienced across full delivery cycles from API design to production hotfix.",
    },
    {
      title: "Database & Infrastructure",
      icon: "database",
      details:
        "PostgreSQL schema design, Redis caching, and AWS-backed data pipelines. Environment-separated storage with S3 and strict access control across staging and production.",
    },
  ],
  skills: [
    {
      category: "Active stack — production daily",
      tier: "active",
      skills: ["Ruby on Rails", "React.js", "TypeScript", "PostgreSQL", "Redis", "AWS", "Docker", "GitHub Actions"],
    },
    {
      category: "AI & Agents",
      tier: "ai",
      skills: ["LangChain", "LangGraph", "CrewAI", "MCP", "Claude API"],
    },
    {
      category: "Backend",
      tier: "default",
      skills: ["Node.js", "Express.js", "Django", "Next.js", "Hotwire", "Sinatra"],
    },
    {
      category: "Languages",
      tier: "default",
      skills: ["Ruby", "JavaScript", "Python", "SQL", "HTML / CSS", "Groovy"],
    },
    {
      category: "Frontend",
      tier: "default",
      skills: ["Redux", "Redux-Thunk", "React Hooks", "Styled-Components", "AngularJS"],
    },
    {
      category: "Databases",
      tier: "default",
      skills: ["MongoDB", "SQLite", "Firebase", "GraphQL", "NeDB"],
    },
    {
      category: "Cloud & Infra",
      tier: "default",
      skills: ["EC2 · S3 · SNS", "Docker Compose", "Heroku", "Netlify"],
    },
    {
      category: "CI/CD & Testing",
      tier: "default",
      skills: ["Jenkins", "rSpec", "FactoryBot", "Mocha", "Chai"],
    },
    {
      category: "Tooling",
      tier: "default",
      skills: ["Datadog", "Figma", "Jira", "Confluence", "Lighthouse"],
    },
  ],
  portfolios: [
    {
      id: 1,
      title: "sammontalvojr.com",
      subtitle:
        "This portfolio site — ground-up rebuild from CRA 3 to Next.js 15 App Router with React 19, TypeScript strict mode, Framer Motion, and a native CSS design system.",
      imageUrl: "/images/portfolio-site-sm.webp",
      largeImageUrl: ["/images/portfolio-site-lg.webp"],
      url: "https://github.com/montal95/sammontalvo-next-portfolio",
    },
    {
      id: 2,
      title: "Phasmophobia Notepad",
      subtitle: "A Companion PWA mimics the same functionality of the journal in the game Phasmophobia",
      imageUrl: "/images/PhasmoNotes.webp",
      largeImageUrl: ["/images/PhasmoNotes-lg.webp"],
      url: "https://gbnotepad.netlify.app/",
    },
    {
      id: 3,
      title: "PITS",
      subtitle: "A PWA to track your plant watering schedule.",
      imageUrl: "/images/PITS-Image-SM.webp",
      largeImageUrl: ["/images/PITS-Image-LG.webp"],
      url: "https://pits-pwa-tracking.netlify.app/",
    },
    {
      id: 4,
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

import Mock from "../mock";

const database = {
  information: {
    name: "Sam Montalvo Jr",
    aboutContent:
      "I am a full stack software developer. I can provide clean and testable code. My passion is bringing your ideas to the screen",
    age: 29,
    phone: "214-686-7539",
    nationality: "American",
    language: "English, Spanish",
    email: "sammontalvojr@gmail.com",
    address: "Chicago, Illinois, USA",
    freelanceStatus: "Available",
    socialLinks: {
      facebook: "",
      twitter: "https://twitter.com/SamMontalvo7",
      pinterest: "",
      behance: "",
      linkedin: "https://www.linkedin.com/in/samuel-montalvo-jr/",
      dribbble: "",
      github: "https://github.com/montal95",
      twitch: "https://www.twitch.tv/samwisethecreator",
    },
    // 300px x 300px
    brandImage: "/images/Sam-Montalvo.png",
    aboutImage: "/images/chicago-skyline-sm.png",
    aboutImageLg: "/images/chicago-skyline-lg.png",
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
    // {
    //   title: "Mobile Application",
    //   icon: "mobile",
    //   details:
    //     "I enjoy creating Progressive Web Apps",
    // },
  ],
  // reviews: [
  //   {
  //     id: 1,
  //     content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita impedit nobis tempore quaerat quibusdam, aliquid maxime tempora.",
  //     author: {
  //       name: 'Burdette Turner',
  //       designation: 'Web Developer, Abc Company'
  //     }
  //   },
  //   {
  //     id: 2,
  //     content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita impedit nobis tempore quaerat quibusdam.",
  //     author: {
  //       name: 'Susan Yost',
  //       designation: 'Client'
  //     }
  //   },
  //   {
  //     id: 3,
  //     content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     author: {
  //       name: 'Irving Feeney',
  //       designation: 'Fiverr Client'
  //     }
  //   }
  // ],
  skills: [
    {
      title: "HTML5",
      value: 90,
    },
    {
      title: "CSS3",
      value: 75,
    },
    {
      title: "Javascript",
      value: 80,
    },
    {
      title: "jQuery",
      value: 60,
    },
    {
      title: "ReactJS",
      value: 80,
    },
    {
      title: "Photoshop",
      value: 50,
    },
    {
      title: "Ruby",
      value: 80,
    },
    {
      title: "Rails",
      value: 75,
    },
  ],
  portfolios: [
    {
      id: 1,
      title: "PITS",
      subtitle: "A PWA to track your plant watering schedule.",
      imageUrl: "/images/PITS-Image-SM.png",
      largeImageUrl: ["/images/PITS-Image-LG.png"],
      url: "https://pits-pwa-tracking.netlify.app/",
    },
    // {
    //   id: 2,
    //   title: "Coffee Mug",
    //   subtitle: "Awesome coffee mug design.",
    //   imageUrl: "/images/portfolio-image-4.jpg",
    //   largeImageUrl: [
    //     "/images/portfolio-image-4-lg.jpg",
    //     "/images/portfolio-image-4-lg2.jpg"
    //   ],
    //   url: 'https://facebook.com'
    // },
    // {
    //   id: 3,
    //   title: "Tea & Coffee Mug",
    //   subtitle: "Beautiful mug with logo.",
    //   imageUrl: "/images/portfolio-image-2.jpg",
    //   url: 'https://pinterest.com'
    // },
  ],
  experience: {
    workingExperience: [
      {
        id: 1,
        year: "2019 - 2020",
        position: "Technical Support",
        company: "Personal Creations",
        details: "",
      },
      {
        id: 2,
        year: "2016 - 2019",
        position: "Electrician",
        company: "Samm's Electric",
        details: "",
      },
      {
        id: 3,
        year: "2012 - 1016",
        position: "Web Content Developer",
        company: "Mauri Pro Sailing",
        details: "",
      },
    ],
    educationExperience: [
      {
        id: 1,
        year: "2020",
        graduation: "Software Engineering Bootcamp",
        university: "Flatiron School",
        details: "",
      },
      {
        id: 2,
        year: "2009 - 2012",
        graduation: "Bachelor of Psychology",
        university: "University of North Texas",
        details: "",
      },
      {
        id: 3,
        year: "2009",
        graduation: "High School Graduation",
        university: "Lake Dallas High School",
        details: "",
      },
    ],
  },
  blogs: [
    // {
    //   id: 1,
    //   title: 'Markdown & Html supported blog.',
    //   featuredImage: '/images/blog-image-1.jpg',
    //   filesource: '../../blog/markdown-html-supported-blog.md',
    //   createDay: "20",
    //   createMonth: 'February',
    //   createYear: "2020"
    // },
    // {
    //   id: 2,
    //   title: 'Installing NodeJS on your device.',
    //   featuredImage: '/images/blog-image-2.jpg',
    //   filesource: '../../blog/installing-nodejs-on-your-device.md',
    //   createDay: "20",
    //   createMonth: 'February',
    //   createYear: "2020"
    // },
    // {
    //   id: 3,
    //   title: 'UI/UX design starter with Adobe XD.',
    //   featuredImage: '/images/blog-image-3.jpg',
    //   filesource: '../../blog/uiux-design-starter-with-adobe-xd.md',
    //   createDay: "20",
    //   createMonth: 'February',
    //   createYear: "2020"
    // },
  ],
  contactInfo: {
    phoneNumbers: ["214-686-7539"],
    emailAddress: ["sammontalvojr@gmail.com"],
    address: "Chicago, IL USA",
  },
};

Mock.onGet("/api/information").reply((config) => {
  const response = database.information;
  return [200, response];
});

Mock.onGet("/api/services").reply((config) => {
  const response = database.services;
  return [200, response];
});

Mock.onGet("/api/reviews").reply((config) => {
  const response = database.reviews;
  return [200, response];
});

Mock.onGet("/api/skills").reply((config) => {
  const response = database.skills;
  return [200, response];
});

Mock.onGet("/api/portfolios").reply((config) => {
  const response = database.portfolios;
  return [200, response];
});

Mock.onGet("/api/experience").reply((config) => {
  const response = database.experience;
  return [200, response];
});

Mock.onGet("/api/blog").reply((config) => {
  const response = database.blogs;
  return [200, response];
});

Mock.onGet("/api/contactinfo").reply((config) => {
  const response = database.contactInfo;
  return [200, response];
});

import type {
  AboutData,
  ActionLink,
  AdditionalsData,
  CreativePortfolioData,
  FooterData,
  HeroData,
  NavItem,
  ProjectsData,
  ServicesData,
} from "./portfolio-types";

export const navItems: NavItem[] = [
  { label: "HOME", href: "#home", active: true },
  { label: "ABOUT ME", href: "#about" },
  { label: "WHAT I DO", href: "#services" },
  { label: "EXPERIENCES", href: "#projects" },
  { label: "DESIGNS", href: "#designs" },
  { label: "ADDITIONALS", href: "#additionals" },
];

export const contactAction: ActionLink = {
  label: "Get in touch",
  href: "mailto:johncarl.ramirez.dev@gmail.com",
  icon: "send",
};

export const heroData: HeroData = {
  kicker: "FIG_001 / ROOT DIRECTORY / 2026",
  status: "STATUS - ACTIVE",
  title: {
    before: "A CREATIVE",
    accented: ["WEB DEVELOPER", "DESIGNER"],
    after: "AND",
  },
  summary:
    "I CREATE DIGITAL PRODUCTS THAT FOCUS ON USER'S NEEDS AND OPTIMIZES BUSINESS STRATEGIES",
  portrait: {
    src: "/portfolio/profile-image.png",
    alt: "Black and white portrait of John Carl Ramirez.",
  },
  details: [
    "LOC: Purok 1A, Upper Poblacion, Libertad, Misamis Oriental, PH",
    "TEL: +63 954 994 2732",
    "EML: johncarl.ramirez.dev@gmail.com",
  ],
  actions: [
    {
      label: "Download CV",
      href: "/",
      icon: "download",
    },
    {
      label: "View GitHub",
      href: "https://github.com/",
      external: true,
      icon: "github",
      iconSrc: "/portfolio/icon-github.svg",
    },
  ],
};

export const aboutData: AboutData = {
  sectionLabel: "ABOUT ME",
  status: "LOG_002 / ACCESS GRANTED",
  title: {
    before: "I AM",
    accented: "JOHN CARL RAMIREZ",
  },
  summary:
    "Most developer portfolios teach in scattered pieces. A frontend mockup here, a basic script there. The pieces rarely line up. I am a Full-Stack Web Developer and Researcher. I build complex backend systems, optimize algorithms, and engineer robust web applications from the ground up.",
  actions: heroData.actions,
  media: {
    label: "Media placeholder",
  },
  columns: [
    {
      title: "DESIGN AND DEVELOPMENT",
      body: "Most developer portfolios teach in scattered pieces. A frontend mockup here, a basic script there. The pieces rarely line up. I am a Full-Stack Web Developer and Researcher. I build complex backend systems, optimize algorithms, and engineer robust web applications from the ground up.",
    },
    {
      title: "SYSTEMS UNDER THE HOOD",
      body: "My technical foundation is the spine. Full-Stack Web Development, Data Analytics, UI/UX Design, and Multimedia Production. Every system is built from raw logic first. Python. TypeScript. NextJS. By the time the user interface renders, the database and API are already functioning seamlessly under the hood.",
    },
  ],
};

export const servicesData: ServicesData = {
  sectionLabel: "WHAT I DO",
  status: "SKILLS_001 / AGENT",
  title: {
    before: "COMPREHENSIVE",
    accented: "DIGITAL",
    after: "SOLUTIONS",
  },
  summary:
    "Many developer portfolios present information in disjointed fragments. You might find a frontend mockup in one spot and a simple script in another, but they seldom connect. As a Full-Stack Web Developer and Researcher, I create intricate backend systems, enhance algorithms, and develop resilient web applications from scratch.",
  cards: [
    {
      title: "FULL-STACK WEB DEVELOPMENT",
      description:
        "Expert in engineering robust systems from database to user interface.",
      icon: "screen",
      items: [
        "NextJS & React",
        "NodeJS & Python",
        "Supabase & SQL",
        "System Architecture",
      ],
    },
    {
      title: "DATA SCIENCE & MACHINE LEARNING",
      description:
        "Skilled in extracting insights and building predictive models to drive data-informed decisions.",
      icon: "database",
      items: [
        "Python & R",
        "TensorFlow & PyTorch",
        "Data Visualization",
        "Statistical Analysis",
      ],
    },
    {
      title: "UI/UX DESIGN",
      description:
        "Dedicated to crafting intuitive and engaging digital experiences through user-centered design principles.",
      icon: "interface",
      items: [
        "Figma & Sketch",
        "User Research & Testing",
        "Prototyping & Wireframing",
        "Interaction Design",
      ],
    },
  ],
};

export const projectsData: ProjectsData = {
  sectionLabel: "EXPERIENCES",
  status: "PROJECTS_001 / CASEFILES",
  title: {
    accentedBefore: "PROJECTS",
    middle: "AND",
    accentedAfter: "ROLES",
  },
  summary:
    "Selected technical projects, research work, creative production, and leadership roles drawn from my resume. Each module highlights the role, stack, skills, and implementation focus behind the work.",
  projects: [
    {
      id: "gcs-system",
      module: "Module 1 / GCS System",
      category: "Major Project / Lead Developer",
      title: "Guidance & Counselling Services Appointment System",
      summary:
        "Led the development of a web-based appointment and management system for USTP-CDO's Guidance and Counselling Services using NextJS and Supabase.",
      carousel: [
        {
          id: "gcs-dashboard",
          title: "Appointment dashboard",
          description: "Sample dashboard overview for appointment requests",
          imageSrc: "/portfolio/projects/gcs-system.svg",
          imageAlt: "Sample dashboard for a guidance appointment system.",
        },
        {
          id: "gcs-rbac",
          title: "Role-based access",
          description: "Sample permission flow for staff and student roles",
          imageSrc: "/portfolio/projects/gcs-system.svg",
          imageAlt: "Sample role based access screen for the GCS system.",
        },
        {
          id: "gcs-notifications",
          title: "Notification system",
          description: "Sample notifications and schedule management state",
          imageSrc: "/portfolio/projects/gcs-system.svg",
          imageAlt: "Sample notification state for the GCS system.",
        },
      ],
      stack: {
        label: "TECH STACK",
        items: ["NextJS", "Supabase", "PostgreSQL", "Vercel"],
      },
      skills: {
        label: "SKILLS",
        items: ["UI/UX implementation", "Web development", "System design"],
      },
      notes: [
        {
          title: "RBAC Implementation",
          description:
            "Designed role-based access control for secure permissions across student, staff, and admin workflows.",
        },
        {
          title: "Complete CRUD Operations",
          description:
            "Built full database management capabilities with authentication, notifications, and ongoing feedback from GCS.",
        },
      ],
    },
    {
      id: "road-restoration",
      module: "Module 2 / Road Restoration",
      category: "Research / Lead Researcher",
      title: "Post-Disaster Road Restoration Algorithm Research",
      summary:
        "Developed novel approaches for optimizing post-disaster road restoration using Steiner tree approximation algorithms, with a pending related publication.",
      carousel: [
        {
          id: "road-network",
          title: "Road network graph",
          description: "Sample route network for restoration priority mapping",
          imageSrc: "/portfolio/projects/road-restoration.svg",
          imageAlt: "Sample route network graph for road restoration research.",
        },
        {
          id: "road-kmb",
          title: "Approximation model",
          description: "Sample KMB 2-approximation route comparison",
          imageSrc: "/portfolio/projects/road-restoration.svg",
          imageAlt: "Sample approximation model for road restoration.",
        },
        {
          id: "road-analysis",
          title: "Runtime analysis",
          description: "Sample accuracy and runtime analysis layout",
          imageSrc: "/portfolio/projects/road-restoration.svg",
          imageAlt: "Sample analysis screen for algorithm research.",
        },
      ],
      stack: {
        label: "TECH STACK",
        items: ["Python", "Graph algorithms", "Steiner tree", "Research writing"],
      },
      skills: {
        label: "SKILLS",
        items: ["Algorithm design", "Data analysis", "Technical research"],
      },
      notes: [
        {
          title: "Approximation Performance",
          description:
            "Produced higher approximation accuracy than several comparison approaches while keeping runtime relatively fast.",
        },
        {
          title: "Thesis Direction",
          description:
            "Positioned as a thesis proposal with possible expansion into neural networks or computer vision.",
        },
      ],
    },
    {
      id: "intramurals-video",
      module: "Module 3 / Video Editor",
      category: "University Student Government / Lead Video Editor",
      title: "University-Wide Intramurals Creative Production",
      summary:
        "Led a high-intensity editing workload for USTP-CDO intramurals, producing short-form content and event media with nearly 1000 videos edited in one week.",
      carousel: [
        {
          id: "video-timeline",
          title: "Editing timeline",
          description: "Sample production timeline for event video outputs",
          imageSrc: "/portfolio/projects/video-production.svg",
          imageAlt: "Sample video editing timeline for intramurals production.",
        },
        {
          id: "video-promo",
          title: "Promo workflow",
          description: "Sample promo content workflow for event campaigns",
          imageSrc: "/portfolio/projects/video-production.svg",
          imageAlt: "Sample promo video workflow layout.",
        },
        {
          id: "video-socials",
          title: "Social media output",
          description: "Sample short-form publishing and engagement view",
          imageSrc: "/portfolio/projects/video-production.svg",
          imageAlt: "Sample social media production layout.",
        },
      ],
      stack: {
        label: "TOOLS",
        items: ["Premiere Pro", "After Effects", "Photoshop", "Blender"],
      },
      skills: {
        label: "SKILLS",
        items: ["Video editing", "Motion graphics", "Creative direction"],
      },
      notes: [
        {
          title: "High-Volume Production",
          description:
            "Edited nearly 1000 videos during the event window while supporting multiple intramural productions.",
        },
        {
          title: "Engagement Impact",
          description:
            "Helped drive 100k+ cumulative engagements across university social media platforms.",
        },
      ],
    },
    {
      id: "enduro-branding",
      module: "Module 4 / Enduro Brand",
      category: "Internship / Lead Designer and Branding Manager",
      title: "Enduro Group Branding and Design Management",
      summary:
        "Lead designer and branding manager for Enduro Group Business Consulting and Services, supporting visual identity and communication work from Dallas, Texas.",
      carousel: [
        {
          id: "enduro-board",
          title: "Brand board",
          description: "Sample brand system board for consulting services",
          imageSrc: "/portfolio/projects/enduro-brand.svg",
          imageAlt: "Sample brand board for Enduro Group.",
        },
        {
          id: "enduro-layout",
          title: "Layout system",
          description: "Sample visual layout system for business collateral",
          imageSrc: "/portfolio/projects/enduro-brand.svg",
          imageAlt: "Sample layout system for business collateral.",
        },
        {
          id: "enduro-assets",
          title: "Asset direction",
          description: "Sample reusable assets for branding and marketing",
          imageSrc: "/portfolio/projects/enduro-brand.svg",
          imageAlt: "Sample reusable brand assets.",
        },
      ],
      stack: {
        label: "TOOLS",
        items: ["Figma", "Adobe Illustrator", "Photoshop", "Canva"],
      },
      skills: {
        label: "SKILLS",
        items: ["Brand strategy", "Graphic design", "Creative management"],
      },
      notes: [
        {
          title: "Brand Direction",
          description:
            "Managed visual direction for a consulting and services brand with a focus on consistency and clarity.",
        },
        {
          title: "Design Operations",
          description:
            "Produced reusable design assets for brand communication and ongoing business presentation needs.",
        },
      ],
    },
    {
      id: "cs3-leadership",
      module: "Module 5 / CS3 Portal",
      category: "Student Leadership / Core Team Lead",
      title: "Computer Science Student Society Core Team",
      summary:
        "Led an elite group of computer science students focused on research and software solutions, while building a unified website for the department and CS3.",
      carousel: [
        {
          id: "cs3-home",
          title: "Organization portal",
          description: "Sample portal homepage for CS3 and the department",
          imageSrc: "/portfolio/projects/cs3-portal.svg",
          imageAlt: "Sample homepage for the CS3 portal.",
        },
        {
          id: "cs3-team",
          title: "Team structure",
          description: "Sample team and project coordination layout",
          imageSrc: "/portfolio/projects/cs3-portal.svg",
          imageAlt: "Sample team coordination layout for CS3.",
        },
        {
          id: "cs3-research",
          title: "Research showcase",
          description: "Sample research and software solutions showcase",
          imageSrc: "/portfolio/projects/cs3-portal.svg",
          imageAlt: "Sample research showcase layout for CS3.",
        },
      ],
      stack: {
        label: "STACK",
        items: ["NextJS", "TypeScript", "Content systems", "GitHub"],
      },
      skills: {
        label: "SKILLS",
        items: ["Team leadership", "Web development", "Operations planning"],
      },
      notes: [
        {
          title: "Unified Website",
          description:
            "Currently building a unified website for USTP-CDO's Department of Computer Science and CS3.",
        },
        {
          title: "Team Realignment",
          description:
            "Restructuring the group to improve project focus, research output, and operating efficiency.",
        },
      ],
    },
  ],
};

export const creativePortfolioData: CreativePortfolioData = {
  sectionLabel: "DESIGNS",
  status: "SKILLS_001 / AGENT",
  title: {
    accented: "CREATIVE",
    rest: "PORTFOLIO",
  },
  summary:
    "Welcome to my creative portfolio! Here, you'll find a collection of my best work showcasing my skills in web development and design. Dive in to explore innovative projects that reflect my passion for technology and creativity.",
  brands: [
    {
      id: "snap-engineering",
      title: "Snap Engineering",
      meta: "> Started February 2026",
      details: ["Texas, United States", "Manufacturing and construction"],
      deliverables: ["Web design", "Branding and identity"],
      carousel: [
        {
          id: "snap-brand-board",
          title: "Snap brand board",
          description: "Brand image",
          imageSrc: "/portfolio/designs/snap-engineering.svg",
          imageAlt: "Sample brand board for Snap Engineering.",
        },
        {
          id: "snap-landing",
          title: "Snap landing page",
          description: "Homepage system exploration",
          imageSrc: "/portfolio/designs/snap-engineering.svg",
          imageAlt: "Sample landing page exploration for Snap Engineering.",
        },
        {
          id: "snap-identity",
          title: "Snap identity set",
          description: "Identity and visual system study",
          imageSrc: "/portfolio/designs/snap-engineering.svg",
          imageAlt: "Sample identity system for Snap Engineering.",
        },
      ],
    },
    {
      id: "nova-tech",
      title: "Nova Tech Solutions",
      meta: "> Founded July 2023",
      details: ["Berlin, Germany", "Software development and AI research"],
      deliverables: ["Mobile app design", "User experience"],
      carousel: [
        {
          id: "nova-interface",
          title: "Nova interface",
          description: "Mobile product interface exploration",
          imageSrc: "/portfolio/designs/nova-tech.svg",
          imageAlt: "Sample mobile product interface for Nova Tech Solutions.",
        },
      ],
    },
    {
      id: "oceanic-ventures",
      title: "Oceanic Ventures",
      meta: "> Established March 2025",
      details: ["Sydney, Australia", "Renewable energy and sustainability"],
      deliverables: ["Brand strategy", "Digital marketing"],
      carousel: [
        {
          id: "oceanic-campaign",
          title: "Oceanic campaign",
          description: "Sustainability campaign system",
          imageSrc: "/portfolio/designs/oceanic-ventures.svg",
          imageAlt: "Sample sustainability campaign for Oceanic Ventures.",
        },
      ],
    },
  ],
};

export const additionalsData: AdditionalsData = {
  sectionLabel: "ADDITIONALS",
  status: "SKILLS_001 / AGENT",
  title: {
    before: "SOME",
    accented: "EXTRA STUFF",
  },
  summary:
    "A section for other things, from academic work and achievements, to student organization involvements and roles.",
  blocks: [
    {
      id: "student-leadership",
      title: "STUDENT LEADERSHIP",
      summary:
        "I have been involved in several student organizations across the university I am currently attending, to sharpen my social and communication skills, alongside showcasing my technical and creative talents, in service of the students.",
      carousel: [
        {
          id: "leadership-org",
          title: "Student leadership",
          description: "Organization work and student service",
          imageSrc: "/portfolio/additionals/student-leadership.svg",
          imageAlt: "Sample student leadership board and organization layout.",
        },
        {
          id: "leadership-web",
          title: "CS3 website",
          description: "Unified department and organization website work",
          imageSrc: "/portfolio/additionals/student-leadership.svg",
          imageAlt: "Sample website planning board for CS3.",
        },
        {
          id: "leadership-media",
          title: "Student media",
          description: "Multimedia production and student communication",
          imageSrc: "/portfolio/additionals/student-leadership.svg",
          imageAlt: "Sample student media production layout.",
        },
      ],
      entries: [
        {
          date: "JULY 2024-2025",
          title: "CS3 Core Team Lead (November 2025 - Present)",
          details: [
            "Led an elite group of computer science students that focuses on research and software solutions to computer science-related problems.",
            "Currently building a unified website for USTP-CDO's Department of Computer Science and CS3, to showcase both the department and organization.",
          ],
        },
        {
          date: "2024 - PRESENT",
          title:
            "Member of several student organizations such as University Student Government (Video Editing and Multimedia Head), 4-H Club USTP-CDO, and Computer Science Student Society (CS3).",
        },
      ],
    },
    {
      id: "extra-curriculars",
      title: "EXTRA-CURRICULARS",
      summary:
        "Alongside student organizations, I have also involved myself in academic and non-academic events such as hackathons and competitions, showcasing my creative and technical skills to a wide range of people.",
      carousel: [
        {
          id: "topcit",
          title: "TOPCIT",
          description: "Academic competency and competition highlights",
          imageSrc: "/portfolio/additionals/extra-curriculars.svg",
          imageAlt: "Sample academic achievements and competition layout.",
        },
        {
          id: "ai-deas",
          title: "AI.Deas",
          description: "Regional AI ideation and pitch activity",
          imageSrc: "/portfolio/additionals/extra-curriculars.svg",
          imageAlt: "Sample AI event and pitch board.",
        },
        {
          id: "aws-hackathon",
          title: "AWS Hackathon",
          description: "Hackathon finalist and onsite pitching preparation",
          imageSrc: "/portfolio/additionals/extra-curriculars.svg",
          imageAlt: "Sample hackathon finalist presentation layout.",
        },
      ],
      entries: [
        {
          date: "NOVEMBER 2024",
          title: "Secured Level 2 in 11th TOPCIT (Test of Practical Competency in IT).",
        },
        {
          date: "SEPTEMBER 2025",
          title:
            "Participated in Department of Information and Communications Technology (DICT)'s AI.Deas Region X at Hammerson Hotel, Cagayan de Oro City.",
        },
        {
          date: "MARCH 2024",
          title:
            "Participated in Google Developer Student Clubs APAC Solution Challenge, finished at 1st Place in USTP-CDO, competed at Asia-regional level.",
        },
        {
          date: "JUNE 2026",
          title:
            "Participated in AWS UP Mindanao Student Society's Hackathon, secured Top 20 finalists and an upcoming onsite pitching in University of the Philippines Mindanao at Davao.",
        },
      ],
    },
  ],
};

export const footerData: FooterData = {
  cta: {
    title: {
      before: "GOT A VISION?",
      accented: "LET'S BRING IT TO LIFE!",
    },
    summary:
      "I'm always excited to collaborate on new and innovative projects. Whether you're starting from scratch or refining an existing idea.",
    action: contactAction,
  },
  brandLine: {
    before: "A CREATIVE",
    accented: ["WEB DEVELOPER", "DESIGNER"],
    after: "AND",
  },
  copyright: "© 2026 JOHN CARL RAMIREZ. ALL RIGHTS RESERVED",
  links: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      external: true,
      icon: "social",
      iconSrc: "/portfolio/brands/icon-instagram.svg",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      external: true,
      icon: "social",
      iconSrc: "/portfolio/brands/icon-facebook.svg",
    },
    {
      label: "GitHub",
      href: "https://github.com/",
      external: true,
      icon: "github",
      iconSrc: "/portfolio/icon-github.svg",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/639549942732",
      external: true,
      icon: "social",
      iconSrc: "/portfolio/brands/icon-whatsapp.svg",
    },
  ],
};

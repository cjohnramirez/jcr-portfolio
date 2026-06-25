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
import { cloudinaryAsset } from "./cloudinary";

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
    src: cloudinaryAsset("portfolio/profile-image.png"),
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
      iconSrc: cloudinaryAsset("portfolio/icon-github.svg"),
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
    src: cloudinaryAsset("portfolio/about-section.jpg"),
    alt: "John Carl Ramirez working at his desk.",
  },
  columns: [
    {
      title: "DESIGN AND DEVELOPMENT",
      body: "I design and build digital experiences where visual clarity and technical precision work together. From interface systems and responsive layouts to production-ready frontend architecture, every decision is shaped by usability, performance, and a clear purpose.",
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
          id: "gcs-homepage",
          title: "Public homepage",
          description: "Guidance and Counselling Services public landing page",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/gcs-system/gcs-homepage.png",
          ),
          imageAlt: "Public homepage for the Guidance and Counselling Services.",
        },
        {
          id: "gcs-signup",
          title: "Student registration",
          description: "Student account registration and profile onboarding",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/gcs-system/gcs-signup.png",
          ),
          imageAlt: "Student registration form for the GCS appointment system.",
        },
        {
          id: "gcs-admin",
          title: "Account administration",
          description: "Administrative account management and editing workflow",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/gcs-system/gcs-admin.png",
          ),
          imageAlt: "Administrative account editor for the GCS appointment system.",
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
          description: "Mapped restoration solution across a damaged road network",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/road-restoration/cdom.png",
          ),
          imageAlt: "Road restoration solution mapped across Cagayan de Oro.",
        },
        {
          id: "road-kmb",
          title: "Approximation model",
          description: "KMB 2-approximation algorithm research methodology",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/road-restoration/research-approx.png",
          ),
          imageAlt: "Research paper section describing the approximation algorithm.",
        },
        {
          id: "road-analysis",
          title: "Graph pruning analysis",
          description: "Graph subsets and pruning process used by the algorithm",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/road-restoration/research-graph.png",
          ),
          imageAlt: "Research figures showing graph subsets and algorithm pruning.",
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
      id: "enduro-branding",
      module: "Module 3 / Enduro Brand",
      category: "Internship / Lead Designer and Branding Manager",
      title: "Enduro Group Branding and Design Management",
      summary:
        "Lead designer and branding manager for Enduro Group Business Consulting and Services, supporting visual identity and communication work from Dallas, Texas.",
      carousel: [
        {
          id: "enduro-examples",
          title: "Brand applications",
          description: "Enduro Group identity across physical brand touchpoints",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/enduro-brand/branding-examples.png",
          ),
          imageAlt: "Enduro Group branding applied to signage, apparel, and stationery.",
        },
        {
          id: "enduro-clearspace",
          title: "Wordmark clearspace",
          description: "Wordmark spacing rules for consistent brand application",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/enduro-brand/wordmark-clearspace.png",
          ),
          imageAlt: "Enduro Group wordmark clearspace and safe-zone guidelines.",
        },
        {
          id: "enduro-devices",
          title: "Digital applications",
          description: "Wordmark and application icon usage across devices",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/enduro-brand/wordmark-devices.png",
          ),
          imageAlt: "Enduro Group wordmark and app icon examples on iOS devices.",
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
      module: "Module 4 / CS3 Portal",
      category: "Student Leadership / Core Team Lead",
      title: "Computer Science Student Society Core Team",
      summary:
        "Led an elite group of computer science students focused on research and software solutions, while building a unified website for the department and CS3.",
      carousel: [
        {
          id: "cs3-home",
          title: "Organization portal",
          description: "Portal homepage for CS3 and the department",
          imageSrc: cloudinaryAsset("portfolio/projects/cs3-portal/home-page.png"),
          imageAlt: "Sample homepage for the CS3 portal.",
        },
        {
          id: "cs3-footer",
          title: "Footer",
          description: "A professional and unique looking website footer",
          imageSrc: cloudinaryAsset("portfolio/projects/cs3-portal/footer.png"),
          imageAlt: "Sample footer layout for CS3.",
        },
        {
          id: "cs3-faq",
          title: "FAQs",
          description: "Frequently asked questions website design and layout",
          imageSrc: cloudinaryAsset("portfolio/projects/cs3-portal/faqs.png"),
          imageAlt: "Sample FAQs layout for CS3.",
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
      meta: "> Brand guidelines / December 2025",
      details: ["Manufacturing and DFM", "Industrial engineering website"],
      deliverables: ["Brand guidelines", "Web design"],
      carousel: [
        {
          id: "snap-brand-board",
          title: "Snap brand guidelines",
          description: "Industrial speed and engineering precision brand system",
          imageSrc: cloudinaryAsset(
            "portfolio/designs/snap-engineering/snap-brand-deck.png",
          ),
          imageAlt: "Snap Engineering brand guidelines cover.",
          imageFit: "contain",
        },
        {
          id: "snap-landing",
          title: "Snap landing page",
          description: "Manufacturing homepage exploration for DFM services",
          imageSrc: cloudinaryAsset(
            "portfolio/designs/snap-engineering/snap-homepage.png",
          ),
          imageAlt: "Snap Engineering homepage design for manufacturability services.",
          imageFit: "contain",
        },
        {
          id: "snap-samples",
          title: "Snap sample layouts",
          description: "Supporting page and presentation design samples",
          imageSrc: cloudinaryAsset(
            "portfolio/designs/snap-engineering/snap-samples.png",
          ),
          imageAlt: "Snap Engineering supporting design samples.",
          imageFit: "contain",
        },
      ],
    },
    {
      id: "xplore",
      title: "Xplore Travel",
      meta: "> Travel landing page concept",
      details: ["Saudi Arabia travel agency concept", "Destination campaign UI"],
      deliverables: ["Web design", "Social media layout"],
      carousel: [
        {
          id: "xplore-homepage",
          title: "Xplore homepage",
          description: "Hero-driven travel landing page for desert experiences",
          imageSrc: cloudinaryAsset("portfolio/designs/xplore/xplore-homepage.png"),
          imageAlt: "Xplore travel landing page design.",
          imageFit: "contain",
        },
        {
          id: "xplore-moodboard",
          title: "Xplore moodboard",
          description: "Visual direction for travel imagery and atmosphere",
          imageSrc: cloudinaryAsset("portfolio/designs/xplore/xplore-moodboard.png"),
          imageAlt: "Xplore travel moodboard.",
          imageFit: "contain",
        },
        {
          id: "xplore-social",
          title: "Xplore social media",
          description: "Campaign layout for destination promotion",
          imageSrc: cloudinaryAsset("portfolio/designs/xplore/xplore-socmed.png"),
          imageAlt: "Xplore social media campaign design.",
          imageFit: "contain",
        },
      ],
    },
    {
      id: "kingmaker",
      title: "Kingmaker Tax Advisors",
      meta: "> Brand guidelines / December 2025",
      details: ["Tax advisory identity", "Premium finance brand system"],
      deliverables: ["Branding and identity", "Guideline deck"],
      carousel: [
        {
          id: "kingmaker-brand-deck",
          title: "Kingmaker guidelines",
          description: "Brand guideline cover for the tax advisory identity",
          imageSrc: cloudinaryAsset(
            "portfolio/designs/kingmaker/kingmaker-brand-deck.png",
          ),
          imageAlt: "Kingmaker Tax Advisors brand guidelines cover.",
          imageFit: "contain",
        },
        {
          id: "kingmaker-usage",
          title: "Kingmaker usage",
          description: "Logo usage and collateral direction",
          imageSrc: cloudinaryAsset(
            "portfolio/designs/kingmaker/kingmaker-sample.png",
          ),
          imageAlt: "Kingmaker Tax Advisors usage and collateral examples.",
          imageFit: "contain",
        },
        {
          id: "kingmaker-footer",
          title: "Kingmaker footer",
          description: "Footer and digital brand application sample",
          imageSrc: cloudinaryAsset(
            "portfolio/designs/kingmaker/kingmaker-footer.png",
          ),
          imageAlt: "Kingmaker Tax Advisors footer design sample.",
          imageFit: "contain",
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
          id: "agrivanture",
          title: "Agrivanture",
          description: "4-H USTP-CDO student leadership field activity in Claveria",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/student-leadership/agrivanture.JPG",
          ),
          imageAlt: "4-H USTP-CDO Agrivanture group photo in Claveria.",
        },
        {
          id: "4h-meeting",
          title: "4-H planning",
          description: "Strategic planning and organizational alignment at USTP-CDO",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/student-leadership/4h-meeting.jpg",
          ),
          imageAlt: "4-H Club USTP-CDO strategic planning update poster.",
          imageFit: "contain",
        },
        {
          id: "ilead-2026",
          title: "iLEAD 2026",
          description: "Student leadership development event in Cagayan de Oro",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/student-leadership/ilead-2026.JPG",
          ),
          imageAlt: "Student leaders posing during iLEAD 2026.",
        },
        {
          id: "kahamili-2026",
          title: "Kahamili 2026",
          description: "Campus cultural event and student organization work",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/student-leadership/kahamili-2026.JPG",
          ),
          imageAlt: "Students in formal cultural attire during Kahamili 2026.",
        },
        {
          id: "usg-ustp-cdo",
          title: "USG USTP-CDO",
          description: "University Student Government and multimedia involvement",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/student-leadership/usg-ustp-cdo.jpg",
          ),
          imageAlt: "USTP-CDO student leaders in a university classroom.",
        },
        {
          id: "cs3-community",
          title: "CS3 community",
          description: "Computer Science Student Society campus involvement",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/student-leadership/CS3.jpg",
          ),
          imageAlt: "CS3 student organization group photo at USTP-CDO.",
        },
        {
          id: "deans-list",
          title: "Dean's List",
          description: "Academic recognition alongside organization work",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/student-leadership/deans-list.jpg",
          ),
          imageAlt: "Dean's list recognition photo.",
          imageFit: "contain",
        },
      ],
      entries: [
        {
          date: "NOVEMBER 2025 - PRESENT",
          title: "CS3 Core Team Lead (November 2025 - Present)"
        },
        {
          date: "JANUARY 2026",
          title:
            "4-H Club USTP-CDO strategic planning and organizational alignment meeting at USTP-CDO.",
        },
        {
          date: "2026",
          title:
            "Participated in 4-H Club USTP-CDO's Agrivanture student leadership and agriculture exposure activity in Claveria.",
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
          id: "aideas-dict",
          title: "AI.Deas Region X",
          description: "DICT AI.Deas participation in Cagayan de Oro City",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/extra-curriculars/aideas-dict.jpg",
          ),
          imageAlt: "AI.Deas Region X certificate and team placard for Team Huntwix.",
          imageFit: "contain",
        },
        {
          id: "aws-innovation-cup",
          title: "AWS Innovation Cup",
          description: "Top 20 semifinalist notice for Innovation Cup Mindanao 2026",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/extra-curriculars/aws-innovation-cup.png",
          ),
          imageAlt: "Innovation Cup Mindanao 2026 Top 20 semifinalist email.",
          imageFit: "contain",
        },
        {
          id: "wadhwani",
          title: "Wadhwani Ignite",
          description: "Entrepreneurship content completion certificate",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/extra-curriculars/wadhwani.png",
          ),
          imageAlt: "Wadhwani Foundation Ignite Philippines completion certificate.",
          imageFit: "contain",
        },
        {
          id: "kmb-research",
          title: "KMB research",
          description: "Published road restoration algorithm research screenshot",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/extra-curriculars/kmb-research.png",
          ),
          imageAlt: "SSRN page for KMB 2-approximation road restoration research.",
          imageFit: "contain",
        },
        {
          id: "freecodecamp",
          title: "freeCodeCamp",
          description: "Responsive Web Design developer certification",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/extra-curriculars/freecodecamp-webdesign.png",
          ),
          imageAlt: "freeCodeCamp Responsive Web Design certificate.",
          imageFit: "contain",
        },
      ],
      entries: [
        {
          date: "AUGUST 2024",
          title:
            "Completed freeCodeCamp's Legacy Responsive Web Design certification.",
        },
        {
          date: "MAY 2025",
          title:
            "Published KMB 2-approximation algorithm research for post-disaster road network restoration.",
        },
        {
          date: "MAY 2026",
          title:
            "Completed Wadhwani Foundation's Ignite Philippines entrepreneurship coursework.",
        },
        {
          date: "SEPTEMBER 2025",
          title:
            "Participated in Department of Information and Communications Technology (DICT)'s AI.Deas Region X at Hammerson Hotel, Cagayan de Oro City.",
        },
        {
          date: "JUNE 2026",
          title:
            "Advanced to the Top 20 semifinalists of Innovation Cup Mindanao 2026.",
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
      iconSrc: cloudinaryAsset("portfolio/brands/icon-instagram.svg"),
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      external: true,
      icon: "social",
      iconSrc: cloudinaryAsset("portfolio/brands/icon-facebook.svg"),
    },
    {
      label: "GitHub",
      href: "https://github.com/",
      external: true,
      icon: "github",
      iconSrc: cloudinaryAsset("portfolio/icon-github.svg"),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/639549942732",
      external: true,
      icon: "social",
      iconSrc: cloudinaryAsset("portfolio/brands/icon-whatsapp.svg"),
    },
  ],
};

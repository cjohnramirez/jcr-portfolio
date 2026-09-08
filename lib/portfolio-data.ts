import type {
  AboutData,
  ActionLink,
  AdditionalsData,
  CreativePortfolioData,
  FooterData,
  HeroData,
  ProjectsData,
  ServicesData,
} from "./portfolio-types";
import { cloudinaryAsset } from "./cloudinary";

export const contactAction: ActionLink = {
  label: "Get in touch",
  href: "mailto:johncarl.ramirez.dev@gmail.com",
  icon: "send",
};

export const heroData: HeroData = {
  kicker: "Cover",
  status: "Open to work",
  title: {
    before: "A creative",
    accented: ["web developer", "designer"],
    after: "and",
  },
  summary:
    "I build digital products around what users actually need, and what the business actually has to get done.",
  portrait: {
    src: cloudinaryAsset("portfolio/profile-image.png"),
    alt: "Black and white portrait of John Carl Ramirez.",
  },
  details: [
    "LOC: Cagayan de Oro, Philippines",
    "EML: johncarl.ramirez.dev@gmail.com",
  ],
  actions: [
    {
      label: "Download CV",
      href: "/cv.pdf",
      icon: "download",
    },
    {
      label: "View GitHub",
      href: "https://github.com/cjohnramirez",
      external: true,
      icon: "github",
      iconSrc: cloudinaryAsset("portfolio/icon-github.svg"),
    },
  ],
};

export const aboutData: AboutData = {
  sectionLabel: "ABOUT ME",
  status: "Cagayan de Oro, PH",
  title: {
    before: "I am",
    accented: "John Carl Ramirez",
  },
  summary:
    "Most developer portfolios come in scattered pieces. A frontend mockup here, a basic script there. The pieces rarely line up. I am a Full-Stack Web Developer and Researcher. I build complex backend systems, optimize algorithms, and engineer robust web applications from the ground up.",
  actions: heroData.actions,
  media: {
    src: cloudinaryAsset("portfolio/about-section.jpg"),
    alt: "John Carl Ramirez working at his desk.",
  },
  columns: [
    {
      title: "Design and development",
      body: "I design and build digital experiences where visual clarity and technical precision work together. From interface systems and responsive layouts to production-ready frontend architecture, every decision is shaped by usability, performance, and a clear purpose.",
    },
    {
      title: "Systems under the hood",
      body: "My technical foundation is the spine. Full-Stack Web Development, Data Analytics, UI/UX Design, and Multimedia Production. Every system is built from raw logic first. Python. TypeScript. NextJS. By the time the user interface renders, the database and API are already functioning seamlessly under the hood.",
    },
  ],
};

export const servicesData: ServicesData = {
  sectionLabel: "What I do",
  status: "3 areas",
  title: {
    before: "Comprehensive",
    accented: "digital",
    after: "solutions",
  },
  summary:
    "Three areas I work across. Systems from the database up, models that make sense of the data, and interfaces people can actually use. Each card lists what I reach for first.",
  cards: [
    {
      title: "Full-Stack Web Development",
      description:
        "Expert in engineering robust systems from database to user interface.",
      icon: "screen",
      items: [
        "NextJS & React",
        "NodeJS & Python",
        "FastAPI & Django",
        "Supabase & SQL",
        "System Architecture",
      ],
    },
    {
      title: "Data Science & Machine Learning",
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
      title: "UI/UX Design",
      description:
        "Dedicated to crafting intuitive and engaging digital experiences through user-centered design principles.",
      icon: "interface",
      items: [
        "Figma & Illustrator",
        "User Research & Testing",
        "Prototyping & Wireframing",
        "Interaction Design",
      ],
    },
  ],
};

export const projectsData: ProjectsData = {
  sectionLabel: "Case plates",
  status: "3 plates",
  title: {
    accentedBefore: "Projects",
    middle: "and",
    accentedAfter: "roles",
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
        "A web-based appointment and records system for the Guidance and Counselling Services at USTP-CDO, built to replace a paper process that made students queue at the office just to book a slot.",
      links: [
        {
          label: "Live deployment",
          href: "https://gcs-system.vercel.app/home",
        },
      ],
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
        label: "Tech stack",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "Supabase",
          "PostgreSQL",
          "Tailwind CSS",
          "Radix UI",
          "TanStack Query",
          "Vercel",
        ],
      },
      skills: {
        label: "Skills",
        items: ["UI/UX implementation", "Web development", "System design"],
      },
      notes: [
        {
          title: "Context",
          description:
            "Guidance and Counselling ran on paper. Records were retrieved by hand, and booking a session meant walking to the office in person — an extra step some students found uncomfortable enough to skip, on top of the waiting it caused. There was also nowhere central to send announcements from.",
        },
        {
          title: "Role",
          description:
            "Lead developer, on a team of five, submitted as a project research paper in December 2025 — with Gerlie Campion, Francis Adrian Esteban, Jhey Gulde, and Kathleen Grace Gultiano.",
        },
        {
          title: "Timeline",
          description: "About 4 months.",
        },
        {
          title: "Approach",
          description:
            "Three roles — student, counsellor, admin — that get genuinely different systems rather than the same screens with buttons hidden. Students book, reschedule and cancel; counsellors accept, reject and update requests; admins manage accounts and monitor the schedule. That is what made access control the hard part here: counselling records are confidential, so the boundary had to hold in the database, not just in the interface.",
        },
        {
          title: "Outcome",
          description:
            "We pitched it to the Guidance and Counselling Services and they approved it, but it was never deployed — it was a school project and development stopped after submission. The build is still up on Vercel if you want to click through it.",
        },
      ],
    },
    {
      id: "road-restoration",
      module: "Module 2 / Road Restoration",
      category: "Research / Corresponding Author",
      title: "Post-Disaster Road Restoration Algorithm Research",
      summary:
        "Published research adapting the Kou–Markowsky–Berman 2-approximation algorithm to pick restoration routes through a road network broken by a disaster, tested on synthetic graphs, Istanbul benchmarks, and Cagayan de Oro itself.",
      links: [
        {
          label: "Read the paper on SSRN",
          href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5277559",
        },
      ],
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
        label: "Tech stack",
        items: ["Python", "QGIS", "Graph algorithms", "Steiner trees"],
      },
      skills: {
        label: "Skills",
        items: ["Algorithm design", "Data analysis", "Technical research"],
      },
      notes: [
        {
          title: "Context",
          description:
            "After a disaster, the road network is the constraint on everything else — relief, evacuation, repair crews. Clearing it all is not an option, so the question is which subset of blocked roads to reopen to reconnect the places that matter. That is a Steiner tree problem, and it is NP-hard.",
        },
        {
          title: "Role",
          description:
            "Corresponding author, with Gerlie Campion, Kathleen Grace Gultiano, and Junar Landicho, in the Department of Computer Science at USTP-CDO.",
        },
        {
          title: "Timeline",
          description: "About 3–4 months.",
        },
        {
          title: "Approach",
          description:
            "We adapted KMB so the cost it minimises is blocked road first, unblocked road second — a lexicographic order, because clearing a blocked road is what actually costs a restoration crew. That modification is the part that could have broken the algorithm’s 2-approximation guarantee, so most of the work was testing whether the bound survived it.",
        },
        {
          title: "Outcome",
          description:
            "It held. Across 30 randomly generated graphs every approximation ratio stayed under 2 and most were exactly 1 — the optimal answer — with a standard deviation near 0.03. On the Istanbul benchmark instances from Akbari et al. the ratio stayed within the bound on all twelve, and the same held on Cagayan de Oro and Eastern Cagayan de Oro road data.",
        },
        {
          title: "The Trade-off",
          description:
            "KMB is slower, and the paper says so rather than hiding it: roughly 8–12 seconds per Istanbul instance against under a second for the Greedy algorithm. What you buy with that time is a guarantee — Greedy hit a ratio of 3.10 on one instance and 2.76 on another, outside any bound, and Thresholding swung from 1.34 to 30.41 seconds depending on the network. Whether the guarantee is worth the wait depends on whether you are planning the restoration or running it.",
        },
      ],
    },
    {
      id: "enduro-branding",
      module: "Module 3 / Enduro Brand",
      category: "Internship / Lead Designer and Branding Manager",
      title: "Enduro Group Branding and Design Management",
      summary:
        "Lead designer and branding manager for Enduro Group, a consulting firm out of Dallas, Texas. I authored the firm’s own brand guidelines and then designed client identity systems under its name.",
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
        label: "Tools",
        items: ["Figma", "Adobe Illustrator", "Photoshop", "Canva"],
      },
      skills: {
        label: "Skills",
        items: ["Brand strategy", "Graphic design", "Creative management"],
      },
      notes: [
        {
          title: "The House Brand",
          description:
            "Enduro Group Brand Guidelines, Version 2.0, February 2026 — a 31-page system covering the wordmark in two orientations at −5% tracking, its construction and clearspace geometry, the primary palette of Red Sand and Rustic Blue, Geist across seven weights, and the rules for applying all of it to signage, apparel, stationery and app icons.",
        },
        {
          title: "Client Work Under the Name",
          description:
            "Two complete identity systems went out as Enduro Group work: the Al-Bab Initiative, a field programme under the non-profit G.A.P., and Xplore Land & Sea, a boutique travel curator in Jeddah. Both have their own plates in the identity section.",
        },
        {
          title: "How It Started",
          description:
            "A listing on OnlineJobs.ph, after about a month of looking. It was my first job interview. What got me hired was showing the Figma work — specifically, redesigning a website from scratch in front of them.",
        },
        {
          title: "Who Did the Work",
          description:
            "The designs are mine, all of them, made under the direction of Enduro Group’s CEO.",
        },
        {
          title: "Design Operations",
          description:
            "Each brand ships as a repository rather than a PDF — a machine-readable DESIGN.md as the single source of truth, generators that build the collateral from it, and a verifier that checks the output against that brand’s own don’ts. Nothing is shared between brands on purpose: their rules genuinely conflict, so a shared generator would have to weaken both.",
        },
      ],
    },
  ],
};

export const creativePortfolioData: CreativePortfolioData = {
  sectionLabel: "Identity work",
  status: "4 systems",
  title: {
    accented: "Creative",
    rest: "portfolio",
  },
  summary:
    "Welcome to my creative portfolio! Here, you’ll find a collection of my best work showcasing my skills in web development and design. Dive in to explore innovative projects that reflect my passion for technology and creativity.",
  brands: [
    {
      id: "snap-engineering",
      title: "Snap Engineering",
      meta: "> Brand guidelines v1.0 / December 2025",
      summary:
        "An end-to-end manufacturing partner in Dallas–Fort Worth that folds technical consulting, 48-hour prototyping and full-scale production under one roof. The identity had to sound like the guarantee they sell: no hassle, no mistakes.",
      details: [
        "End-to-end manufacturing, DFW",
        "Custom angular “S” monogram",
        "Azure and Dark Azure over black",
        "Creato Display, with Neptune for technical labelling",
      ],
      deliverables: [
        "Brand guidelines",
        "Logo and monogram system",
        "Web design",
        "Photography direction",
      ],
      notes: [
        {
          title: "The Brief",
          description:
            "Bridge the gap between a design and a finished product, and look like it. The audience is procurement teams and business owners, so the work had to read as reliable and fast at the same time — industrial rather than start-up.",
        },
        {
          title: "The Direction",
          description:
            "A monogram built from sharp parallel paths that mirror additive manufacturing and mechanical drawing, interlocking to stand for the handover from concept to assembly, and leaning forward for momentum. The line weight is heavy and uniform so it reads as industrial strength rather than as a logotype flourish. Two typefaces with separate jobs: Creato Display for the brand voice, Neptune reserved for iconography and technical labelling.",
        },
      ],
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
      title: "Xplore Land & Sea",
      meta: "> Brand guidelines v1.0 / Enduro Group",
      summary:
        "A boutique travel curator in Jeddah selling the removal of friction — so the identity is built to feel handled. Composed, unhurried, and confident enough to leave space empty.",
      details: [
        "Boutique travel and experience curation, Jeddah, Saudi Arabia",
        "Positioned as an experience curator, not a mass-tour agency",
        "Built on three pillars: clarity, restoration, discovery",
        "Signature device: the 30° diagonal photo mask",
      ],
      deliverables: [
        "Brand guidelines",
        "Logo and emblem system",
        "Web design",
        "Social media layout",
        "Print collateral",
      ],
      notes: [
        {
          title: "The Brief",
          description:
            "Not a mass-tour agency. The audience is an international traveller with means who finds the Arab world genuinely appealing but logistically opaque — someone looking for a curator, not a package. Three pillars carry it: clarity, restoration, discovery.",
        },
        {
          title: "The Direction",
          description:
            "White grounds with Plantation green type, inverting to green fields for the bold surfaces. Depth comes from flat colour, scale and photography — no gradients on brand fields, no glow, no shadow. Discovery is revealed rather than announced: the watermark X and the 30° diagonal photo mask reward a second look instead of demanding the first. Density would read as pressure, and pressure is the opposite of what is being sold.",
        },
      ],
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
        {
          id: "xplore-card",
          title: "Xplore stationery",
          description: "The identity inverted onto Plantation green stock",
          imageSrc: cloudinaryAsset("portfolio/designs/xplore/xplore-card.png"),
          imageAlt: "Xplore Land and Sea business cards photographed in context.",
          imageFit: "contain",
        },
      ],
    },
    {
      id: "al-bab",
      title: "Al-Bab Initiative",
      meta: "> Brand guidelines v1.0 / Enduro Group",
      summary:
        "A field programme run through business as a means of access, for the non-profit G.A.P. The design problem was to look like serious infrastructure rather than a campaign — something built to last in a difficult place.",
      details: [
        "Field programme of the non-profit G.A.P. (Global Allied Partners)",
        "الباب — al-bab, “the door” — set in Noto Kufi Arabic",
        "Two audiences at once: field practitioners and supporting churches",
        "Serious infrastructure rather than a campaign",
      ],
      deliverables: [
        "Brand guidelines",
        "Bilingual logo system",
        "Stationery",
        "Tri-fold brochure",
        "Posters and signage",
      ],
      notes: [
        {
          title: "The Brief",
          description:
            "Two audiences the system has to hold at once. Field practitioners and partner organisations need dense operational detail to stay legible and credible; supporters need the work to feel grounded rather than promotional. Neither is served by a brochure.",
        },
        {
          title: "The Direction",
          description:
            "The brand’s own metaphor is a door, so layouts open: generous ground, one idea per surface, and when a composition feels crowded the fix is to remove rather than rearrange. Bebas Neue set solid and flush left at scale, hairline rules instead of cards, near-black ink, and copper strictly as emphasis — a surface where copper dominates is off-brand however handsome. Exactly one flourish is allowed per piece: the gradient headline, once or not at all.",
        },
        {
          title: "A Trap Worth Recording",
          description:
            "Bebas Neue ships a single weight, but h1–h6 default to bold. With no bold face the browser synthesises one by smearing the outlines — heavier, cruder, and it passes every check that only reads the stylesheet link. The system pins font-weight explicitly and sets font-synthesis to none.",
        },
      ],
      carousel: [
        {
          id: "albab-card",
          title: "Al-Bab stationery",
          description: "The bilingual mark at business-card scale",
          imageSrc: cloudinaryAsset("portfolio/designs/al-bab/albab-card.png"),
          imageAlt:
            "Al-Bab Initiative business cards photographed on a textured surface.",
          imageFit: "contain",
        },
        {
          id: "albab-brochure",
          title: "Tri-fold brochure",
          description: "Field documentation rather than a sales brochure",
          imageSrc: cloudinaryAsset("portfolio/designs/al-bab/albab-brochure.png"),
          imageAlt: "Al-Bab Initiative tri-fold brochure shown open and folded.",
          imageFit: "contain",
        },
        {
          id: "albab-poster",
          title: "Wall poster",
          description: "Bebas Neue set solid and flush left, at scale",
          imageSrc: cloudinaryAsset("portfolio/designs/al-bab/albab-poster.png"),
          imageAlt: "Al-Bab Initiative poster mounted on a wall.",
          imageFit: "contain",
        },
      ],
    },
    {
      id: "kingmaker",
      title: "Kingmaker Tax Advisors",
      meta: "> Brand guidelines v1.0 / December 2025",
      summary:
        "A tax firm that writes custom tax-saving blueprints per business rather than fitting clients into one template. The identity had to carry that as authority without tipping into the gold-and-marble cliché the category invites.",
      details: [
        "Bespoke tax strategy, not preparation",
        "Crown brandmark, used as the clearspace unit",
        "Antique Gold with Gray Hint, no secondary palette",
        "Cinzel for display, Lato for reading",
      ],
      deliverables: [
        "Brand guidelines",
        "Primary, secondary and reversed logo suite",
        "Standalone brandmark",
        "Pattern system",
        "Imagery and usage rules",
      ],
      notes: [
        {
          title: "The Brief",
          description:
            "Strategic, authoritative, trustworthy, regal — and disciplined enough that the name is never shortened. “Kingmaker Tax” and “Kingmaker Advisors” are both ruled out in the guidelines, because a half-name is where a premium brand starts leaking.",
        },
        {
          title: "The Direction",
          description:
            "Cinzel’s Roman capitals do the heritage work; Lato keeps the body text legible so the deck does not become a monument. The crown is more than an icon — it is the measurement unit for clearspace around both logo lockups, which ties the spacing system to the mark itself. Patterns are permitted but rationed: diagonal, cleanly tiling, and only over large areas.",
        },
      ],
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
  sectionLabel: "Appendix",
  status: "3 sections",
  title: {
    before: "Some",
    accented: "extra stuff",
  },
  summary:
    "A section for other things, from academic work and achievements, to student organization involvements and roles.",
  blocks: [
    {
      id: "education",
      title: "Education",
      summary:
        "Computer Science at USTP, and the school record before it.",
      entries: [
        {
          date: "2023 – Present",
          title:
            "BS Computer Science, University of Science and Technology of Southern Philippines — Cagayan de Oro campus, College of Information Technology and Computing.",
          details: [
            "CGPA 1.5632",
            "Dean’s List",
            "Coursework across Python, Java, C++, JavaScript and TypeScript",
          ],
        },
        {
          date: "2011 – 2023",
          title:
            "Prophet’s Pen Academy, Gitagum, Misamis Oriental — elementary through senior high school.",
          details: [
            "Valedictorian, Grade 7 to Grade 11",
            "School President and Salutatorian, Grade 12",
          ],
        },
      ],
    },
    {
      id: "student-leadership",
      title: "Student leadership",
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
          id: "deans-list",
          title: "Dean’s List",
          description: "Academic recognition alongside organization work",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/student-leadership/deans-list.jpg",
          ),
          imageAlt: "Dean’s list recognition photo.",
          imageFit: "contain",
        },
      ],
      entries: [
        {
          date: "January 2026",
          title:
            "4-H Club USTP-CDO strategic planning and organizational alignment meeting at USTP-CDO.",
        },
        {
          date: "2026",
          title:
            "Participated in 4-H Club USTP-CDO’s Agrivanture student leadership and agriculture exposure activity in Claveria.",
        },
        {
          date: "2024 – Present",
          title:
            "Member of several student organizations, including the University Student Government as Video Editing and Multimedia Head, and the 4-H Club at USTP-CDO.",
        },
      ],
    },
    {
      id: "extra-curriculars",
      title: "Extra-curriculars",
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
          date: "March 2024",
          title:
            "Finished 1st place at USTP-CDO in the Google Developer Student Clubs APAC Solution Challenge, then competed at the Asia-regional level.",
        },
        {
          date: "August 2024",
          title:
            "Completed freeCodeCamp’s Legacy Responsive Web Design certification.",
        },
        {
          date: "November 2024",
          title:
            "Secured Level 2 in the 11th TOPCIT, the Test of Practical Competency in IT.",
        },
        {
          date: "May 2025",
          title:
            "Published KMB 2-approximation algorithm research for post-disaster road network restoration.",
        },
        {
          date: "May 2026",
          title:
            "Completed Wadhwani Foundation’s Ignite Philippines entrepreneurship coursework.",
        },
        {
          date: "September 2025",
          title:
            "Participated in Department of Information and Communications Technology (DICT)'s AI.Deas Region X at Hammerson Hotel, Cagayan de Oro City.",
        },
        {
          date: "June 2026",
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
      before: "Got a vision?",
      accented: "Let’s bring it to life.",
    },
    summary:
      "I’m always excited to collaborate on new and innovative projects. Whether you’re starting from scratch or refining an existing idea.",
    action: contactAction,
  },
  brandLine: {
    before: "A creative",
    accented: ["web developer", "designer"],
    after: "and",
  },
  copyright: "© 2026 John Carl Ramirez. All rights reserved.",
  links: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/jcr_rrr/",
      external: true,
      icon: "social",
      iconSrc: cloudinaryAsset("portfolio/brands/icon-instagram.svg"),
    },
    {
      label: "Facebook",
      href: "https://web.facebook.com/john.ramirez.6767",
      external: true,
      icon: "social",
      iconSrc: cloudinaryAsset("portfolio/brands/icon-facebook.svg"),
    },
    {
      label: "GitHub",
      href: "https://github.com/cjohnramirez",
      external: true,
      icon: "github",
      iconSrc: cloudinaryAsset("portfolio/icon-github.svg"),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/john-carl-ramirez-334a3b362/",
      external: true,
      icon: "social",
      iconSrc: cloudinaryAsset("portfolio/brands/icon-linkedin.svg"),
    },
  ],
};

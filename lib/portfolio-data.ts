import type {
  AboutData,
  ActionLink,
  AdditionalsData,
  CarouselItem,
  CreativePortfolioData,
  FooterData,
  HeroData,
  ProjectsData,
  ServicesData,
} from "./portfolio-types";
import { cloudinaryAsset } from "./cloudinary";

/**
 * One sheet per page of a brand guidelines deck, rendered from the source PDF
 * to `<basePath>-01.webp`, `-02.webp` and so on. Pages are listed in deck
 * order as [title, description].
 */
function deckSheets(
  brand: string,
  basePath: string,
  pages: [title: string, description: string][],
): CarouselItem[] {
  const slug = basePath.split("/").pop();

  return pages.map(([title, description], index) => {
    const page = String(index + 1).padStart(2, "0");

    return {
      id: `${slug}-${page}`,
      title,
      description,
      imageSrc: cloudinaryAsset(`${basePath}-${page}.webp`),
      imageAlt: `${brand} brand guidelines, page ${index + 1}: ${title}.`,
      imageFit: "contain",
    };
  });
}

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
    "I build full-stack web products and brand systems, from database schema to interface.",
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
    "Full-stack web developer and researcher. I build backend systems, optimize graph algorithms, and ship production web applications end to end.",
  actions: heroData.actions,
  media: {
    src: cloudinaryAsset("portfolio/about-section.jpg"),
    alt: "John Carl Ramirez working at his desk.",
  },
  columns: [
    {
      title: "Design and development",
      body: "Interface systems, responsive layouts and production frontend architecture, specified against usability and performance targets.",
    },
    {
      title: "Systems under the hood",
      body: "Core stack: Python, TypeScript, Next.js, Django and PostgreSQL. The data model and API are built first, so the interface renders on a working backend.",
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
    "Three practice areas: systems from the database up, models over the data, and interfaces built for use. Each card lists the primary tools.",
  cards: [
    {
      title: "Full-Stack Web Development",
      description:
        "End-to-end systems, from schema and API to interface.",
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
        "Predictive models and statistical analysis for data-driven decisions.",
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
        "User-centred interface design, from research to interactive prototype.",
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
  status: "4 plates",
  title: {
    accentedBefore: "Projects",
    middle: "and",
    accentedAfter: "roles",
  },
  summary:
    "Technical projects, published research and brand systems. Each plate lists the role, stack, skills and implementation details.",
  projects: [
    {
      id: "trailventure",
      module: "Module 1 / TrailVenture",
      category: "Major Project / Solo Developer",
      featured: true,
      title: "TrailVenture: Tour Package Booking Platform",
      summary:
        "Tour package booking platform for the Philippines and beyond. Travellers search by destination, date and budget, compare package tiers and day-by-day itineraries, book a group start date, and pay through Stripe. The core engineering is payment integrity: server-side pricing, price holds and idempotent checkout.",
      links: [
        {
          label: "Live deployment",
          href: "https://trailventure.jcrdev.me",
        },
      ],
      carousel: [
        {
          id: "trailventure-home",
          title: "Home and search",
          description: "Destination, date and budget in a single entry point",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/trailventure/trailventure-home.png",
          ),
          imageAlt:
            "TrailVenture homepage with a destination, date and price search bar over a Palawan photograph.",
        },
        {
          id: "trailventure-search",
          title: "Search results",
          description: "Filtered package listings with per-person pricing",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/trailventure/trailventure-search.png",
          ),
          imageAlt:
            "TrailVenture search results listing tour packages with filters and prices.",
        },
        {
          id: "trailventure-package",
          title: "Package detail",
          description: "Tiers, itinerary and reviews for a single package",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/trailventure/trailventure-package.png",
          ),
          imageAlt:
            "TrailVenture package page for Palawan Island Paradise, showing photos, price and itinerary tabs.",
        },
        {
          id: "trailventure-booking",
          title: "Review and pay",
          description: "Server-calculated invoice with a 30-minute price hold",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/trailventure/trailventure-booking.png",
          ),
          imageAlt:
            "TrailVenture booking review with an itemised invoice, total price and a checkout button awaiting a start date.",
        },
        {
          id: "trailventure-success",
          title: "Booking confirmed",
          description: "Receipt page after Stripe Checkout returns",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/trailventure/trailventure-success.png",
          ),
          imageAlt:
            "TrailVenture booking confirmation showing the booking id, total paid, package and trip start.",
        },
        {
          id: "trailventure-account",
          title: "Your bookings",
          description: "Confirmed and awaiting-payment bookings with per-status actions",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/trailventure/trailventure-account.png",
          ),
          imageAlt:
            "TrailVenture account bookings list with confirmed and awaiting-payment trips, finish-payment and write-a-review actions.",
        },
      ],
      stack: {
        label: "Tech stack",
        items: [
          "Django",
          "Django REST Framework",
          "PostgreSQL",
          "Redis",
          "Celery",
          "Stripe",
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "shadcn/ui",
          "TanStack Query",
          "Docker",
          "Playwright",
          "pytest",
          "GitHub Actions",
        ],
      },
      skills: {
        label: "Skills",
        items: [
          "API security",
          "Payment integration",
          "System design",
          "Testing strategy",
          "Accessibility",
          "CI/CD",
        ],
      },
      notes: [
        {
          title: "Context",
          description:
            "Booking is where pricing errors cost money. The charged price must equal the displayed price, a partial payment must resolve to a final state, and a held slot must be neither double-sold nor held indefinitely.",
        },
        {
          title: "Role",
          description:
            "Solo developer: architecture, backend, frontend, tests and deployment.",
        },
        {
          title: "Approach",
          description:
            "Django REST API behind a Next.js frontend on a single origin. The web app proxies Django paths at request time, so session and CSRF cookies stay first-party and no token is stored in localStorage. Views are thin: writes go through a service layer, reads through selectors with query-count tests. Roles are assigned server-side only.",
        },
        {
          title: "Money",
          description:
            "Prices are calculated server-side and stored as integer centavos. A booking holds its price for 30 minutes and checkout rejects expired holds. Stripe Checkout sessions carry an idempotency key, so a repeated request returns the existing session. The webhook verifies Stripe’s signature, records each event id before processing, and ignores replays; unexpected errors return 5xx so Stripe retries. Bookings are never deleted: unpaid holds expire on a schedule and remain on record.",
        },
        {
          title: "Caching",
          description:
            "Catalog responses are cached in Redis under versioned keys. Any catalog write bumps the version and invalidates every dependent response at once, with no per-key mapping to maintain. Tests assert a cache hit costs zero database queries and a miss at most four.",
        },
        {
          title: "Correctness",
          description:
            "108 API tests, 50 unit tests and 132 browser tests across desktop, mobile and dark mode. CI runs the browser tests against a live API, PostgreSQL, Redis and a mail server. The tests pin the core rules: signup cannot set its own role, webhook replays are no-ops, expired holds cannot be paid, and reviews require a paid, started booking. axe checks every public page in CI; Lighthouse scores 100 for accessibility and SEO.",
        },
        {
          title: "Deployment",
          description:
            "Two containers and PostgreSQL on Northflank, Redis on Upstash, images on Cloudinary and mail through Mailjet, on a custom domain with automatic TLS. Background tasks run in-request and hold expiry runs as a scheduled command. Holds derive from a timestamp that checkout re-checks, so enforcement never depends on the scheduler.",
        },
      ],
    },
    {
      id: "steady",
      module: "Module 2 / Steady",
      category: "Major Project / Lead Developer",
      featured: true,
      title: "Steady: Student Guidance and Counselling Platform",
      summary:
        "Guidance and counselling platform for a school office. Students book sessions with their department’s counsellor, log mood check-ins, and receive articles and playlists matched to that mood. Counsellors manage requests and schedules. Administrators manage accounts, publish content and monitor a dashboard.",
      links: [
        {
          label: "Live deployment",
          href: "https://steady-system.jcrdev.me",
        },
      ],
      carousel: [
        {
          id: "steady-home",
          title: "Public homepage",
          description: "Public landing page for visitors",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/steady/steady-home.png",
          ),
          imageAlt:
            "Steady homepage, headed “Nurturing student growth and well-being”.",
        },
        {
          id: "steady-portal",
          title: "Resource portal",
          description: "Articles, playlists and events, publicly accessible",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/steady/steady-portal.png",
          ),
          imageAlt:
            "Steady resource portal showing a featured article, the next event, and announcements.",
        },
        {
          id: "steady-signup",
          title: "Student registration",
          description: "Registration with enrollment details and informed consent",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/steady/steady-signup.png",
          ),
          imageAlt:
            "Steady student sign-up form covering personal details, enrollment and emergency contacts.",
        },
        {
          id: "steady-student",
          title: "Student dashboard",
          description: "Mood check-in, profile and emergency contacts",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/steady/steady-student.png",
          ),
          imageAlt:
            "Steady student dashboard with a mood check-in, profile details and emergency contacts.",
        },
        {
          id: "steady-admin-dashboard",
          title: "Analytics dashboard",
          description: "Requests, pending sessions and visitor trend",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/steady/steady-admin-dashboard.png",
          ),
          imageAlt:
            "Steady admin dashboard showing appointment counts, registered students and a site-visitor chart.",
        },
        {
          id: "steady-admin-accounts",
          title: "Account administration",
          description: "Server-paginated account table with record editor",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/steady/steady-admin-accounts.png",
          ),
          imageAlt:
            "Steady admin accounts table with a student record open for editing.",
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
          "shadcn/ui",
          "Radix UI",
          "TanStack Query",
          "Zod",
          "Cloudinary",
          "Vitest",
          "GitHub Actions",
          "Vercel",
        ],
      },
      skills: {
        label: "Skills",
        items: [
          "System design",
          "Database security",
          "Real-time systems",
          "UI/UX design",
          "Accessibility",
        ],
      },
      notes: [
        {
          title: "Context",
          description:
            "Digitises a paper-based guidance workflow: record retrieval, in-person booking and announcements move to one platform. Counselling records are confidential, so each student’s data is isolated from other students and from uninvolved staff.",
        },
        {
          title: "Role",
          description:
            "Lead developer on a five-person team with Gerlie Campion, Francis Adrian Esteban, Jhey Gulde and Kathleen Grace Gultiano. Submitted as a project research paper, December 2025.",
        },
        {
          title: "Timeline",
          description: "4 months.",
        },
        {
          title: "Approach",
          description:
            "Three roles with distinct areas. Students book, reschedule and cancel; counsellors accept, decline and complete requests and set working hours; admins manage accounts, content and the dashboard. Reads are plain functions shared by server components and query hooks. Every write is a server action that checks the role and validates against the form’s schema.",
        },
        {
          title: "Confidentiality",
          description:
            "Access control lives in the database. Row-level security on every table scopes counsellors to their departments and students to their own records. Guard triggers enforce own-booking cancellation, double-booking prevention and admin-only department changes. Notifications are created only by database triggers and delivered live over a websocket. A 29-check SQL suite runs as each role to verify the policies, alongside 73 unit tests in CI.",
        },
        {
          title: "Interface",
          description:
            "Built on a documented design system: semantic colour tokens, a fixed type scale and 17 shared components, so the dark theme is a token swap. Loading, empty and error states are visually distinct, and skeletons match each page’s layout. Contrast is verified by script on every colour change.",
        },
        {
          title: "Outcome",
          description:
            "Pitched to and approved by the school’s guidance office. Live at steady-system.jcrdev.me.",
        },
      ],
    },
    {
      id: "road-restoration",
      module: "Module 3 / Road Restoration",
      category: "Research / Corresponding Author",
      title: "Post-Disaster Road Restoration Algorithm Research",
      summary:
        "Published research adapting the Kou–Markowsky–Berman 2-approximation algorithm to select restoration routes through a disaster-damaged road network. Evaluated on synthetic graphs, Istanbul benchmarks and Cagayan de Oro road data.",
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
          description: "Restoration solution mapped on the Cagayan de Oro network",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/road-restoration/cdom.png",
          ),
          imageAlt: "Road restoration solution mapped across Cagayan de Oro.",
        },
        {
          id: "road-kmb",
          title: "Approximation model",
          description: "KMB 2-approximation methodology",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/road-restoration/research-approx.png",
          ),
          imageAlt: "Research paper section describing the approximation algorithm.",
        },
        {
          id: "road-analysis",
          title: "Graph pruning analysis",
          description: "Graph subsets and pruning steps",
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
            "Post-disaster road access gates relief, evacuation and repair. The task is selecting the minimum set of blocked roads to reopen so critical sites reconnect: an NP-hard Steiner tree problem.",
        },
        {
          title: "Role",
          description:
            "Corresponding author, with Gerlie Campion, Kathleen Grace Gultiano and Junar Landicho, Department of Computer Science, USTP-CDO.",
        },
        {
          title: "Timeline",
          description: "3–4 months.",
        },
        {
          title: "Approach",
          description:
            "KMB modified to minimise a lexicographic cost: blocked road first, unblocked road second, matching the real cost to a restoration crew. The core work was verifying that the 2-approximation bound holds under this modification.",
        },
        {
          title: "Outcome",
          description:
            "The bound holds. Across 30 random graphs every ratio stayed under 2 and most were exactly 1 (optimal), with a standard deviation near 0.03. All twelve Istanbul benchmark instances from Akbari et al. and both Cagayan de Oro networks stayed within the bound.",
        },
        {
          title: "Performance",
          description:
            "KMB runs 8–12 seconds per Istanbul instance against under one second for Greedy, in exchange for a guaranteed bound. Greedy reached ratios of 3.10 and 2.76, and Thresholding runtime ranged from 1.34 to 30.41 seconds. KMB fits restoration planning, where solution quality outweighs latency.",
        },
      ],
    },
    {
      id: "enduro-branding",
      module: "Module 4 / Enduro Brand",
      category: "Internship / Lead Designer and Branding Manager",
      title: "Enduro Group Branding and Design Management",
      summary:
        "Lead designer and branding manager for Enduro Group, a consulting firm in Dallas, Texas. Authored the firm’s brand guidelines and designed client identity systems under its name.",
      carousel: deckSheets(
        "Enduro Group",
        "portfolio/projects/enduro-brand/deck/enduro-deck",
        [
          ["Cover", "Brand guidelines v2.0, February 2026"],
          ["Index", "Six sections across 31 pages"],
          ["Brand introduction", "Section 1.0"],
          ["Positioning", "Purpose-driven consulting statement"],
          ["Brand vision", "Vision statement with Red Sand accents"],
          ["Brand wordmark", "Section 2.0"],
          ["Lockups", "Vertical and horizontal wordmark at −5% tracking"],
          ["Construction", "Wordmark geometry grid"],
          ["Clearspace", "X-unit safe zone on both lockups"],
          ["Brand colours", "Section 3.0"],
          ["Primary colours", "Black, Rustic Blue, Red Sand and White"],
          ["Grayscale", "Six steps from Alpine White to Vulcan"],
          ["Colours on wordmark", "Vulcan, Red Sand and inverted pairings"],
          ["Wordmark on backgrounds", "Photographic and tinted grounds"],
          ["Primary typography", "Section 4.0"],
          ["Geist", "Seven weights, Extralight to Extrabold"],
          ["Typography in use", "Hero, newsletter and service layouts"],
          ["Applications", "Dashboard, checkout and app promotion UI"],
          ["Rules on images", "Section 5.0"],
          ["Image preferences", "Natural light and earth-tone palette"],
          ["Image pillars", "Natural lighting, organic textures, muted tones"],
          ["Application icon", "Section 6.0"],
          ["Browser", "Favicon on grid and in the tab bar"],
          ["macOS", "Dock icon and notification"],
          ["iOS", "App icon, App Store listing and notification"],
          ["Instagram", "Profile and reel treatment"],
          ["Imagery wordmark", "Section 7.0"],
          ["Billboard signage", "Wall-mounted vision statement"],
          ["Clothing and apparel", "T-shirt and tote bag"],
          ["Cards and posters", "Business card and billboard"],
          ["Closing", "Version 2.0 end matter"],
        ],
      ),
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
            "Enduro Group Brand Guidelines v2.0, February 2026: 31 pages covering the wordmark in two orientations at −5% tracking, construction and clearspace geometry, the Red Sand and Rustic Blue palette, Geist in seven weights, and applications across signage, apparel, stationery and app icons.",
        },
        {
          title: "Client Work Under the Name",
          description:
            "Two identity systems shipped as Enduro Group work: the Al-Bab Initiative, a field programme of the non-profit G.A.P., and Xplore Land & Sea, a boutique travel curator in Jeddah. Both have plates in Identity Work.",
        },
        {
          title: "Hiring",
          description:
            "Hired through OnlineJobs.ph after redesigning a website live in Figma during the interview.",
        },
        {
          title: "Authorship",
          description:
            "All designs authored by me under the direction of Enduro Group’s CEO.",
        },
        {
          title: "Design Operations",
          description:
            "Each brand ships as a repository: a machine-readable DESIGN.md as the single source of truth, generators that build collateral from it, and a verifier that checks output against the brand’s rules. Brands share no code, because their rules conflict and a shared generator would dilute both.",
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
    "Brand identity systems: guidelines, logo suites, colour, typography and collateral. Each plate presents the full guidelines deck.",
  brands: [
    {
      id: "snap-engineering",
      title: "Snap Engineering",
      meta: "> Brand guidelines v1.0 / December 2025",
      summary:
        "End-to-end manufacturing partner in Dallas–Fort Worth combining technical consulting, 48-hour prototyping and full-scale production. The identity expresses the brand promise: no hassle, no mistakes.",
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
            "Bridge the gap between a design and a finished product. Audience: procurement teams and business owners. Tone: reliable, fast and industrial.",
        },
        {
          title: "The Direction",
          description:
            "A monogram of sharp parallel paths referencing additive manufacturing and mechanical drawing, interlocking to signal the handover from concept to assembly and leaning forward for momentum. Heavy, uniform line weight for industrial strength. Two typefaces with separate roles: Creato Display for the brand voice, Neptune for iconography and technical labels.",
        },
      ],
      carousel: deckSheets(
        "Snap Engineering",
        "portfolio/designs/snap-engineering/deck/snap-deck",
        [
          ["Cover", "Brand guidelines v1.0, December 2025"],
          ["Brand introduction", "Concept to scale under one roof"],
          ["Icon and alternate logos", "Angular S monogram and horizontal lockups"],
          ["Colour palette", "Sweet Grey, White, Azure and Dark Azure"],
          ["Primary typeface", "Creato Display in five weights"],
          ["Iconography typeface", "Neptune for technical labelling"],
          ["Photography and imagery", "Billboard, signage and print applications"],
          ["Closing", "Version 1.0 end matter"],
        ],
      ),
    },
    {
      id: "xplore",
      title: "Xplore Land & Sea",
      meta: "> Brand guidelines v1.0 / Enduro Group",
      summary:
        "Boutique travel curator in Jeddah. The identity is composed, unhurried and spacious, built to signal that every logistic is handled.",
      details: [
        "Boutique travel and experience curation, Jeddah, Saudi Arabia",
        "Positioned as an experience curator",
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
            "Audience: international travellers with means who find the Arab world appealing but logistically opaque, seeking a curator over a package. Three pillars: clarity, restoration, discovery.",
        },
        {
          title: "The Direction",
          description:
            "White grounds with Plantation green type, inverting to green fields for bold surfaces. Depth comes from flat colour, scale and photography, with brand fields kept free of gradients, glow and shadow. The watermark X and the 30° diagonal photo mask reveal themselves on a second look. Low density conveys calm.",
        },
      ],
      carousel: deckSheets(
        "Xplore Land & Sea",
        "portfolio/designs/xplore/deck/xplore-deck",
        [
          ["Cover", "Brand guidelines v1.0, designed by Enduro Group"],
          ["Welcome", "Guidelines introduction"],
          ["Index", "Seven sections across 26 slides"],
          ["Brand introduction", "Section 2.0"],
          ["What is Xplore", "Experience curator based in Jeddah"],
          ["Brand pillars", "Clarity, restoration and discovery"],
          ["Brand positioning", "Five tone scales, conventional to curated"],
          ["Logo", "Section 3.0"],
          ["Emblem", "Abstract X emblem construction"],
          ["Versions", "Icon, outline icon and PLORE wordmark"],
          ["Minimum sizes", "10 mm print, 30 px digital, 48 px favicon"],
          ["Clear space", "Half-emblem-width exclusion zone"],
          ["Special cases", "Favicons, iconography and edge-cropped marks"],
          ["Colours", "Section 4.0"],
          ["Main palette", "White, Feta and Plantation"],
          ["Colour proportions", "Usage ratio wheel for neutrals and greens"],
          ["Applying colour", "Six swatches with Deep Jade and Cadet Blue accents"],
          ["Typography", "Section 5.0"],
          ["Primary typeface", "Plus Jakarta Sans for headings"],
          ["Secondary typeface", "Geist Regular for body copy"],
          ["Type setting", "Five-step scale, −5% tracking, 100% leading"],
          ["Examples", "Section 6.0"],
          ["Social media", "Instagram profile and campaign tiles"],
          ["Posters and signage", "LED screen, wall posters and outdoor flags"],
          ["Stationery", "Tri-fold brochure, business card and travel guide"],
          ["Notes", "Section 7.0"],
          ["Closing", "Bridging cultures. Curating restorative discovery."],
        ],
      ),
    },
    {
      id: "al-bab",
      title: "Al-Bab Initiative",
      meta: "> Brand guidelines v1.0 / Enduro Group",
      summary:
        "Field programme of the non-profit G.A.P. that uses business as a means of access. The identity reads as durable infrastructure rather than a campaign.",
      details: [
        "Field programme of the non-profit G.A.P. (Global Allied Partners)",
        "الباب, al-bab, “the door”, set in Noto Kufi Arabic",
        "Two audiences at once: field practitioners and supporting churches",
        "Institutional, infrastructure-grade tone",
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
            "Two audiences in one system. Field practitioners and partner organisations need dense operational detail that stays legible and credible; supporters need the work to read as grounded rather than promotional.",
        },
        {
          title: "The Direction",
          description:
            "The brand metaphor is a door, so layouts open: generous ground, one idea per surface, and reduction over rearrangement when a composition crowds. Bebas Neue set solid and flush left at scale, hairline rules instead of cards, near-black ink, and copper strictly for emphasis. One flourish per piece: the gradient headline.",
        },
        {
          title: "Font Synthesis",
          description:
            "Bebas Neue ships a single weight while h1 to h6 default to bold, which makes browsers synthesise a faux bold. The system pins font-weight explicitly and sets font-synthesis to none.",
        },
      ],
      carousel: deckSheets(
        "Al-Bab Initiative",
        "portfolio/designs/al-bab/deck/albab-deck",
        [
          ["Cover", "Brand guidelines v1.0, June 2026"],
          ["Welcome", "Guidelines introduction"],
          ["Index", "Seven sections across 28 slides"],
          ["Brand introduction", "Section 2.0"],
          ["What is Al-Bab", "Business-as-access programme under G.A.P."],
        ],
      ),
    },
    {
      id: "kingmaker",
      title: "Kingmaker Tax Advisors",
      meta: "> Brand guidelines v1.0 / December 2025",
      summary:
        "Tax advisory firm that writes a custom tax-saving blueprint for each business. The identity conveys authority through restraint.",
      details: [
        "Bespoke tax strategy and planning",
        "Crown brandmark, used as the clearspace unit",
        "Antique Gold, Gray Hint and Shocking Black",
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
            "Strategic, authoritative, trustworthy and regal. The full name is mandatory: the guidelines rule out “Kingmaker Tax” and “Kingmaker Advisors” to protect the premium positioning.",
        },
        {
          title: "The Direction",
          description:
            "Cinzel’s Roman capitals carry the heritage; Lato keeps body copy legible. The crown doubles as the clearspace unit for both lockups, tying the spacing system to the mark. Patterns are diagonal, tile cleanly and are reserved for large areas.",
        },
      ],
      carousel: deckSheets(
        "Kingmaker Tax Advisors",
        "portfolio/designs/kingmaker/deck/kingmaker-deck",
        [
          ["Cover", "Brand guidelines v1.0, December 2025"],
          ["Contents", "Nine sections, story to usage"],
          ["Story", "Custom tax-saving blueprints per business"],
          ["Tone and voice", "Nine voice attributes and the full-name rule"],
          ["Primary logo", "Crown-unit clearspace on the horizontal lockup"],
          ["Secondary logo", "Stacked lockup and spacing guide"],
          ["Colour conventions", "Logo on grey, gold, black and cyan grounds"],
          ["Brandmark", "Standalone crown in approved colourways"],
          ["Primary colours", "Gray Hint, Antique Gold and Shocking Black"],
          ["Colour rules", "Approved and rejected text-on-ground pairs"],
          ["Primary typeface", "Cinzel Roman capitals for display"],
          ["Secondary typeface", "Lato for body copy"],
          ["Patterns", "Diagonal tiling patterns on three grounds"],
          ["Imagery", "Strategy, workspace and leadership photography"],
          ["Usage", "Folder, letterhead and envelope stationery"],
          ["Closing", "Version 1.0 end matter"],
        ],
      ),
    },
  ],
};

export const additionalsData: AdditionalsData = {
  sectionLabel: "Appendix",
  status: "3 sections",
  title: {
    before: "Records and",
    accented: "achievements",
  },
  summary:
    "Academic record, student leadership roles, competitions and certifications.",
  blocks: [
    {
      id: "education",
      title: "Education",
      summary:
        "BS Computer Science at USTP, preceded by the school record.",
      entries: [
        {
          date: "2023 – Present",
          title:
            "BS Computer Science, University of Science and Technology of Southern Philippines, Cagayan de Oro campus, College of Information Technology and Computing.",
          details: [
            "CGPA 1.5632",
            "Dean’s List",
            "Coursework across Python, Java, C++, JavaScript and TypeScript",
          ],
        },
        {
          date: "2011 – 2023",
          title:
            "Prophet’s Pen Academy, Gitagum, Misamis Oriental: elementary through senior high school.",
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
        "Student organization roles at USTP-CDO across student government, multimedia and planning.",
      carousel: [
        {
          id: "agrivanture",
          title: "Agrivanture",
          description: "4-H USTP-CDO field activity in Claveria",
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
          description: "University Student Government, multimedia",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/student-leadership/usg-ustp-cdo.jpg",
          ),
          imageAlt: "USTP-CDO student leaders in a university classroom.",
        },
        {
          id: "deans-list",
          title: "Dean’s List",
          description: "Academic recognition",
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
            "4-H Club USTP-CDO strategic planning and organizational alignment meeting.",
        },
        {
          date: "2026",
          title:
            "4-H Club USTP-CDO Agrivanture leadership and agriculture exposure activity, Claveria.",
        },
        {
          date: "2024 – Present",
          title:
            "Video Editing and Multimedia Head, University Student Government; member, 4-H Club USTP-CDO.",
        },
      ],
    },
    {
      id: "extra-curriculars",
      title: "Extra-curriculars",
      summary:
        "Hackathons, competitions, published research and certifications.",
      carousel: [
        {
          id: "aideas-dict",
          title: "AI.Deas Region X",
          description: "DICT AI.Deas, Cagayan de Oro City",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/extra-curriculars/aideas-dict.jpg",
          ),
          imageAlt: "AI.Deas Region X certificate and team placard for Team Huntwix.",
          imageFit: "contain",
        },
        {
          id: "aws-innovation-cup",
          title: "AWS Innovation Cup",
          description: "Top 20 semifinalist, Innovation Cup Mindanao 2026",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/extra-curriculars/aws-innovation-cup.png",
          ),
          imageAlt: "Innovation Cup Mindanao 2026 Top 20 semifinalist email.",
          imageFit: "contain",
        },
        {
          id: "wadhwani",
          title: "Wadhwani Ignite",
          description: "Entrepreneurship coursework certificate",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/extra-curriculars/wadhwani.png",
          ),
          imageAlt: "Wadhwani Foundation Ignite Philippines completion certificate.",
          imageFit: "contain",
        },
        {
          id: "kmb-research",
          title: "KMB research",
          description: "Published road restoration algorithm research",
          imageSrc: cloudinaryAsset(
            "portfolio/additionals/extra-curriculars/kmb-research.png",
          ),
          imageAlt: "SSRN page for KMB 2-approximation road restoration research.",
          imageFit: "contain",
        },
        {
          id: "freecodecamp",
          title: "freeCodeCamp",
          description: "Responsive Web Design certification",
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
            "1st place at USTP-CDO, Google Developer Student Clubs APAC Solution Challenge; advanced to the Asia-regional round.",
        },
        {
          date: "August 2024",
          title:
            "freeCodeCamp Legacy Responsive Web Design certification.",
        },
        {
          date: "November 2024",
          title:
            "Level 2, 11th TOPCIT (Test of Practical Competency in IT).",
        },
        {
          date: "May 2025",
          title:
            "Published KMB 2-approximation algorithm research for post-disaster road network restoration.",
        },
        {
          date: "May 2026",
          title:
            "Wadhwani Foundation Ignite Philippines entrepreneurship coursework.",
        },
        {
          date: "September 2025",
          title:
            "DICT AI.Deas Region X, Hammerson Hotel, Cagayan de Oro City.",
        },
        {
          date: "June 2026",
          title:
            "Top 20 semifinalist, Innovation Cup Mindanao 2026.",
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
      "Available for full-stack development, research and brand design projects, from new builds to existing products.",
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

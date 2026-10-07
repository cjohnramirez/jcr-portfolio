import type {
  AboutData,
  ActionLink,
  AdditionalsData,
  CarouselItem,
  ContactData,
  CreativePortfolioData,
  ExperienceEntry,
  FooterData,
  Gallery,
  HeroData,
  HomeHero,
  MediaItem,
  MotionPiece,
  PrintPiece,
  ProjectsData,
  RecordEntry,
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
  status: "6 plates",
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
      result: "Django, Next.js, Stripe, 290 CI tests, Lighthouse 100 for accessibility and SEO",
      summary:
        "Tour package booking platform for the Philippines and beyond. Travellers search by destination, date and budget, compare package tiers and day-by-day itineraries, book a group start date, and pay through Stripe. The core engineering is payment integrity: server-side pricing, price holds and idempotent checkout.",
      links: [
        {
          label: "Live deployment",
          href: "https://trailventure.jcrdev.me",
        },
      ],
      cover: {
        light: cloudinaryAsset(
          "portfolio/projects/trailventure/trailventure-cover-light.webp",
        ),
        dark: cloudinaryAsset("portfolio/projects/trailventure/trailventure-cover-dark.webp"),
        thumb: cloudinaryAsset("portfolio/projects/trailventure/trailventure-thumb.webp"),
        alt: "TrailVenture homepage on a laptop, with the destination, date and budget search over a Palawan photograph.",
      },
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
      result: "Next.js, Supabase, Led a team of five, Access control in the database, 29-check security suite",
      summary:
        "Guidance and counselling platform for a school office. Students book sessions with their department’s counsellor, log mood check-ins, and receive articles and playlists matched to that mood. Counsellors manage requests and schedules. Administrators manage accounts, publish content and monitor a dashboard.",
      links: [
        {
          label: "Live deployment",
          href: "https://steady-system.jcrdev.me",
        },
      ],
      cover: {
        light: cloudinaryAsset(
          "portfolio/projects/steady/steady-cover-light.webp",
        ),
        dark: cloudinaryAsset("portfolio/projects/steady/steady-cover-dark.webp"),
        thumb: cloudinaryAsset("portfolio/projects/steady/steady-thumb.webp"),
        alt: "Steady homepage on a laptop, headed “Nurturing student growth and well-being”.",
      },
      galleries: [
        {
          id: "steady-figma",
          title: "Original Figma designs",
          summary:
            "The interface as first designed in Figma, under the project’s earlier name, GCS System.",
          items: [
            {
              src: cloudinaryAsset("portfolio/projects/steady/figma/gcs-home.webp"),
              alt: "GCS System Figma design: home page, full length.",
              caption: "Home page, full length",
              tall: true,
            },
            {
              src: cloudinaryAsset("portfolio/projects/steady/figma/gcs-landing.webp"),
              alt: "GCS System Figma design: landing page content manager.",
              caption: "Landing page content manager",
            },
            {
              src: cloudinaryAsset("portfolio/projects/steady/figma/gcs-student-login.webp"),
              alt: "GCS System Figma design: student login.",
              caption: "Student login",
            },
            {
              src: cloudinaryAsset("portfolio/projects/steady/figma/gcs-appointment.webp"),
              alt: "GCS System Figma design: book an appointment.",
              caption: "Book an appointment",
            },
            {
              src: cloudinaryAsset("portfolio/projects/steady/figma/gcs-counselor-dashboard.webp"),
              alt: "GCS System Figma design: counsellor dashboard.",
              caption: "Counsellor dashboard",
            },
            {
              src: cloudinaryAsset("portfolio/projects/steady/figma/gcs-dashboard.webp"),
              alt: "GCS System Figma design: administrator dashboard.",
              caption: "Administrator dashboard",
            },
            {
              src: cloudinaryAsset("portfolio/projects/steady/figma/gcs-appointments.webp"),
              alt: "GCS System Figma design: appointment requests.",
              caption: "Appointment requests",
            },
            {
              src: cloudinaryAsset("portfolio/projects/steady/figma/gcs-accounts.webp"),
              alt: "GCS System Figma design: account management.",
              caption: "Account management",
            },
            {
              src: cloudinaryAsset("portfolio/projects/steady/figma/gcs-settings-account-settings.webp"),
              alt: "GCS System Figma design: account settings.",
              caption: "Account settings",
            },
          ],
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
      id: "fresco-grow-lab",
      module: "Module 3 / Fresco Grow Lab",
      category: "Internship / Solo Developer",
      featured: true,
      title: "Fresco Grow Lab: IoT Telemetry for Grow-Bag Experiments",
      result: "ESP32 sensors and a Next.js dashboard, Sole developer",
      summary:
        "IoT telemetry for Fresco Greenovations, an agritech startup in Cagayan de Oro. ESP32 sensors log grow-bag temperature at four depths and tipping-bucket rainfall, and a Next.js dashboard turns the readings into watering, thermal and rain analytics. Boards are flashed and configured from the browser.",
      links: [
        {
          label: "Live deployment",
          href: "https://fresco-grow-lab.jcrdev.me",
        },
      ],
      cover: {
        light: cloudinaryAsset(
          "portfolio/projects/fresco-grow-lab/fresco-grow-lab-cover-light.webp",
        ),
        dark: cloudinaryAsset("portfolio/projects/fresco-grow-lab/fresco-grow-lab-cover-dark.webp"),
        thumb: cloudinaryAsset("portfolio/projects/fresco-grow-lab/fresco-grow-lab-thumb.webp"),
        alt: "Fresco Grow Lab temperature dashboard on a laptop, with probe readings and a temperature trace.",
      },
      galleries: [
        {
          id: "fresco-collateral",
          title: "Brand collateral",
          summary: "Print and social design for Fresco Greenovations.",
          items: [
            {
              src: cloudinaryAsset("portfolio/projects/fresco-grow-lab/collateral/fresco-first-page.webp"),
              alt: "Fresco Greenovations tri-fold brochure, outside.",
              caption: "Tri-fold brochure, outside",
            },
            {
              src: cloudinaryAsset("portfolio/projects/fresco-grow-lab/collateral/fresco-second-page.webp"),
              alt: "Fresco Greenovations tri-fold brochure, inside.",
              caption: "Tri-fold brochure, inside",
            },
            {
              src: cloudinaryAsset("portfolio/projects/fresco-grow-lab/collateral/fresco-fresco-dump.webp"),
              alt: "Fresco Greenovations social post: The 2025 Archives.",
              caption: "Social post: The 2025 Archives",
            },
            {
              src: cloudinaryAsset("portfolio/projects/fresco-grow-lab/collateral/fresco-miss-earth.webp"),
              alt: "Fresco Greenovations social post: Miss Philippines Earth 2025 visit.",
              caption: "Social post: Miss Philippines Earth 2025 visit",
            },
            {
              src: cloudinaryAsset("portfolio/projects/fresco-grow-lab/collateral/fresco-poster.webp"),
              alt: "Fresco Greenovations conference poster: Greenfluencing the Future.",
              caption: "Conference poster: Greenfluencing the Future",
            },
          ],
        },
      ],
      carousel: [
        {
          id: "fresco-dashboard",
          title: "Temperature dashboard",
          description: "Watering status, next-watering countdown and four probe channels",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/fresco-grow-lab/fresco-dashboard.png",
          ),
          imageAlt:
            "Fresco Grow Lab temperature dashboard with a weigh-the-bag status, a watering countdown, sensor health and readings from control, surface, root-zone and bottom probes.",
        },
        {
          id: "fresco-thermal",
          title: "Thermal patterns",
          description: "Hourly heatmap, vertical profile and bag-versus-ambient delta",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/fresco-grow-lab/fresco-thermal.png",
          ),
          imageAlt:
            "Fresco Grow Lab analytics with a seven-day hourly temperature heatmap, a vertical temperature profile down the bag and a bag-versus-ambient line chart.",
        },
        {
          id: "fresco-monitor",
          title: "Monitor",
          description: "Live feed, watering controls and irrigation event log",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/fresco-grow-lab/fresco-monitor.png",
          ),
          imageAlt:
            "Fresco Grow Lab monitor view with the live feed status, watering controls and a table of irrigation events with weight-log progress.",
        },
        {
          id: "fresco-rain",
          title: "Rain gauge",
          description: "Calibrated rainfall, tip count and rainfall trace",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/fresco-grow-lab/fresco-rain-dashboard.png",
          ),
          imageAlt:
            "Fresco Grow Lab rain gauge dashboard showing rainfall in millilitres and millimetres, physical tips, current rate and a cumulative rainfall chart.",
        },
        {
          id: "fresco-connect",
          title: "Browser flashing",
          description: "Flash prebuilt firmware to an ESP32 over Web Serial",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/fresco-grow-lab/fresco-connect.png",
          ),
          imageAlt:
            "Fresco Grow Lab Connect Hardware dialog with Flash, USB and Supabase tabs and a prebuilt grow-bag temperature firmware ready to flash.",
        },
        {
          id: "fresco-docs",
          title: "Hardware docs",
          description: "Wiring, GPIO map and firmware build environments",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/fresco-grow-lab/fresco-docs.png",
          ),
          imageAlt:
            "Fresco Grow Lab project docs on the Hardware tab, listing each probe channel, its placement and its ESP32 GPIO pin.",
        },
      ],
      stack: {
        label: "Tech stack",
        items: [
          "ESP32",
          "C++",
          "PlatformIO",
          "Next.js",
          "React",
          "TypeScript",
          "Supabase",
          "PostgreSQL",
          "Tailwind CSS",
          "shadcn/ui",
          "Recharts",
          "SWR",
          "Zod",
          "Web Serial",
          "esptool-js",
          "Vitest",
          "Playwright",
          "GitHub Actions",
          "Vercel",
        ],
      },
      skills: {
        label: "Skills",
        items: [
          "Embedded systems",
          "IoT data pipelines",
          "Data visualisation",
          "Database security",
          "Sensor calibration",
          "CI/CD",
        ],
      },
      notes: [
        {
          title: "Context",
          description:
            "Fresco Greenovations needed to know whether low-cost temperature probes can tell when a grow bag needs water, and how much rain reaches its plots. The grow-bag experiment logs four depths around the clock against daily 2 L waterings and 10-minute weigh-ins. The rain gauge turns a tipping bucket into calibrated rainfall, intensity and event data.",
        },
        {
          title: "Role",
          description:
            "Solo developer during an internship: hardware wiring, firmware, data pipeline, dashboard and deployment.",
        },
        {
          title: "Timeline",
          description:
            "Field build in July 2026; public release on October 1, 2026.",
        },
        {
          title: "Firmware",
          description:
            "C++ on PlatformIO with four build environments. Two ESP32 boards send data three ways: Wi-Fi to Supabase, USB serial into the browser, or the rain gauge’s own access point. Interrupt handlers only update counters; debouncing and publishing run in the main loop, so sensing and networking share one microcontroller.",
        },
        {
          title: "Calibration",
          description:
            "The hall-effect sensor counts both magnet edges per tip (tips = edges / 2). Each tip is calibrated to 2.3695 ml, the mean of 42 trials, and an odd edge count shows as a pending half tip.",
        },
        {
          title: "Hardware setup",
          description:
            "Boards are flashed from the browser with esptool-js over Web Serial. Wi-Fi and Supabase settings are entered over USB and saved on the board, so images carry no credentials and no one recompiles. Boards hold only the publishable key; writes run through server routes under row-level security.",
        },
        {
          title: "Data",
          description:
            "Supabase Postgres ships as five migrations: readings, irrigation events, rain gauge, RLS policies and SQL views. Rain sessions are kept locally in IndexedDB. A deterministic simulator models air at 24–33 °C, deeper probes lagging, bag weight dropping and afternoon showers, so every visitor sees the same realistic history without hardware.",
        },
        {
          title: "Analytics",
          description:
            "Thermal heatmap, vertical depth profile, recovery after watering, weight drift, rain events and intensity classes, each computed from the raw readings.",
        },
        {
          title: "Correctness",
          description:
            "95 Vitest tests, Playwright, ESLint and strict TypeScript. GitHub Actions builds and publishes the firmware images; Vercel deploys the dashboard from main.",
        },
      ],
    },
    {
      id: "agriova",
      module: "Module 4 / Agriova",
      category: "Major Project / Solo Developer",
      featured: true,
      title: "Agriova: Offline Farm Ledger for Filipino Smallholders",
      result: "React Native, Offline-first farm ledger with a Gemini assistant, Android and iOS",
      summary:
        "Mobile farm ledger for smallholders in Cagayan de Oro that shows whether a season is earning money, with no signal needed. Farmers record expenses, harvests and sales in two or three fields, track produce before it spoils, and ask an assistant that answers from their own records. Android and iOS from one TypeScript codebase.",
      links: [
        {
          label: "Source code",
          href: "https://github.com/cjohnramirez/agriova",
        },
      ],
      cover: {
        light: cloudinaryAsset(
          "portfolio/projects/agriova/agriova-cover-light.webp",
        ),
        dark: cloudinaryAsset("portfolio/projects/agriova/agriova-cover-dark.webp"),
        thumb: cloudinaryAsset("portfolio/projects/agriova/agriova-thumb.webp"),
        alt: "Agriova home and farm statistics screens on two phones.",
      },
      carousel: [
        {
          id: "agriova-home",
          title: "Home",
          description: "Season earnings, plots in progress and produce to sell",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/agriova/agriova-screen-main.webp",
          ),
          imageAlt:
            "Agriova home screen on a phone, showing season earnings over a field photo, plot cards and a produce-to-sell countdown.",
          imageFit: "contain",
        },
        {
          id: "agriova-fields",
          title: "Fields",
          description: "Each plot with its current crop and past seasons",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/agriova/agriova-screen-farm-fields.webp",
          ),
          imageAlt:
            "Agriova fields screen on a phone, listing each plot with its current crop and status.",
          imageFit: "contain",
        },
        {
          id: "agriova-activity",
          title: "Activity",
          description: "Week strip of records with heat and rain warnings",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/agriova/agriova-screen-calendar.webp",
          ),
          imageAlt:
            "Agriova activity screen on a phone, with a week strip of recorded expenses, harvests and sales.",
          imageFit: "contain",
        },
        {
          id: "agriova-statistics",
          title: "Farm statistics",
          description: "Plots, total area and money over six months",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/agriova/agriova-screen-statistics.webp",
          ),
          imageAlt:
            "Agriova farm statistics screen on a phone, with plot count, total size and a six-month money chart.",
          imageFit: "contain",
        },
        {
          id: "agriova-assistant",
          title: "Assistant",
          description: "Chat that answers from the farmer’s own records",
          imageSrc: cloudinaryAsset(
            "portfolio/projects/agriova/agriova-screen-ai-chatbot.webp",
          ),
          imageAlt:
            "Agriova assistant screen on a phone, answering a farmer’s question from their own records.",
          imageFit: "contain",
        },
      ],
      stack: {
        label: "Tech stack",
        items: [
          "React Native",
          "Expo",
          "TypeScript",
          "expo-router",
          "SQLite",
          "Drizzle ORM",
          "Supabase",
          "PostgreSQL",
          "Deno Edge Functions",
          "Google Gemini",
          "Jest",
          "pgTAP",
          "Maestro",
          "EAS Build",
          "GitHub Actions",
        ],
      },
      skills: {
        label: "Skills",
        items: [
          "Offline-first architecture",
          "Sync engines",
          "Database security",
          "Mobile UI/UX",
          "Accessibility",
          "CI/CD",
        ],
      },
      notes: [
        {
          title: "Context",
          description:
            "Smallholders rarely know whether a season made or lost money, because records live in memory or loose notebooks. Pilot users average 57 years old, farm under weak signal on budget Android phones with 2 to 4 GB of RAM, and read Bisaya first. Every screen answers one of three validated questions: am I earning, will my harvest spoil, am I getting a fair price.",
        },
        {
          title: "Role",
          description:
            "Solo developer: product, design adaptation, mobile app, backend, sync engine, AI assistant, CI and release pipeline. Shipped as v1.0.0.",
        },
        {
          title: "Architecture",
          description:
            "Local-first. SQLite on the phone is the source of truth, so screens never wait on the network. A custom outbox engine pushes rows parents-first and pulls by server timestamp, with last-write-wins because each farm has one owner. Only sign-in, the assistant and account deletion need a connection.",
        },
        {
          title: "Money",
          description:
            "Amounts are integer centavos and quantities integer thousandths, identical on SQLite and Postgres, so profit totals never drift. Conversions live in one units module at every input and display boundary.",
        },
        {
          title: "Assistant",
          description:
            "Heat, rain and spoilage warnings come from a rules engine on the phone and work offline. Chat runs Gemini behind a Supabase Edge Function: the key never ships in the app, the phone sends a farm summary with no name or email, and a security-definer function enforces a 20-question daily quota in one statement.",
        },
        {
          title: "Security",
          description:
            "Row-level security on every farmer table, plus composite foreign keys on (id, owner_id) so the database itself refuses links to another farmer’s plot. Account deletion runs server-side from the caller’s token and cascades through every table before the phone is wiped.",
        },
        {
          title: "Design",
          description:
            "Adapts a Figma prototype to the real user: 56 dp touch targets, Bisaya and English for every string, layouts checked at 320 to 412 dp and 1.3x font scale. About 25 primitives on colour, type and spacing tokens; iOS uses native Liquid Glass tabs.",
        },
        {
          title: "Correctness",
          description:
            "1,207 Jest tests against real SQLite, pgTAP tests for RLS and cascading deletes, and Maestro flows for onboarding and recording. Network calls carry a 20 s deadline with a warm-up health check after idle, tuned on the pilot hotspot. GitHub Actions runs every check on push; EAS Build and EAS Update ship releases.",
        },
      ],
    },
    {
      id: "road-restoration",
      module: "Module 5 / Road Restoration",
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
      module: "Module 6 / Enduro Brand",
      category: "Internship / Lead Designer and Branding Manager",
      title: "Enduro Group Branding and Design Management",
      links: [
        {
          label: "Visit website",
          href: "https://endurogroup.com/",
        },
        {
          label: "Enduro Group on LinkedIn",
          href: "https://www.linkedin.com/company/endurogroup/",
        },
      ],
      summary:
        "Lead designer and branding manager for Enduro Group, a consulting firm in Dallas, Texas. Authored the firm’s brand guidelines and designed client identity systems under its name.",
      galleries: [
        {
          id: "enduro-applications",
          title: "Applications",
          summary: "The house brand in use, rendered on light and dark grounds.",
          items: [
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-white-01.webp"),
              alt: "Enduro Group wall billboard mockup, light version.",
              caption: "Wall billboard, light",
            },
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-dark-01.webp"),
              alt: "Enduro Group wall billboard mockup, dark version.",
              caption: "Wall billboard, dark",
            },
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-white-02.webp"),
              alt: "Enduro Group t-shirt mockup, light version.",
              caption: "T-shirt, light",
            },
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-dark-02.webp"),
              alt: "Enduro Group t-shirt mockup, dark version.",
              caption: "T-shirt, dark",
            },
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-white-03.webp"),
              alt: "Enduro Group tote bag mockup, light version.",
              caption: "Tote bag, light",
            },
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-dark-03.webp"),
              alt: "Enduro Group tote bag mockup, dark version.",
              caption: "Tote bag, dark",
            },
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-white-04.webp"),
              alt: "Enduro Group business card mockup, light version.",
              caption: "Business card, light",
            },
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-dark-04.webp"),
              alt: "Enduro Group business card mockup, dark version.",
              caption: "Business card, dark",
            },
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-white-05.webp"),
              alt: "Enduro Group roadside billboard mockup, light version.",
              caption: "Roadside billboard, light",
            },
            {
              src: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-dark-05.webp"),
              alt: "Enduro Group roadside billboard mockup, dark version.",
              caption: "Roadside billboard, dark",
            },
          ],
        },
      ],
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
            "Three client identity systems shipped as Enduro Group work: Snap Engineering, a manufacturing partner in Dallas-Fort Worth; the Al-Bab Initiative, a field programme of the non-profit G.A.P.; and Xplore Land & Sea, a boutique travel curator in Jeddah. With Enduro’s own, four brand systems in all. Each has a plate in Identity Work.",
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
      kind: "identity",
      cover: {
        src: cloudinaryAsset("portfolio/designs/snap-engineering/mockups/snap-billboard.webp"),
        alt: "Snap Engineering roadside billboard mockup: Industrial Speed. Engineering Precision. Done in a Snap.",
      },
      galleries: [
        {
          id: "snap-engineering-applications",
          title: "Applications",
          items: [
            {
              src: cloudinaryAsset("portfolio/designs/snap-engineering/mockups/snap-billboard.webp"),
              alt: "Snap Engineering roadside billboard mockup.",
              caption: "Roadside billboard",
            },
            {
              src: cloudinaryAsset("portfolio/designs/snap-engineering/mockups/snap-street-poster.webp"),
              alt: "Snap Engineering street column poster mockup.",
              caption: "Street poster",
            },
            {
              src: cloudinaryAsset("portfolio/designs/snap-engineering/mockups/snap-manual.webp"),
              alt: "Snap Engineering design manual cover among leaves.",
              caption: "Design manual",
            },
          ],
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
      kind: "identity",
      cover: {
        src: cloudinaryAsset("portfolio/designs/xplore/mockups/xplore-wall-poster.webp"),
        alt: "Xplore Land & Sea wall posters mockup.",
      },
      galleries: [
        {
          id: "xplore-applications",
          title: "Applications",
          items: [
            {
              src: cloudinaryAsset("portfolio/designs/xplore/mockups/xplore-wall-poster.webp"),
              alt: "Xplore Land & Sea wall posters mockup.",
              caption: "Wall posters",
            },
            {
              src: cloudinaryAsset("portfolio/designs/xplore/mockups/xplore-business-card.webp"),
              alt: "Xplore Land & Sea business card mockup.",
              caption: "Business card",
            },
            {
              src: cloudinaryAsset("portfolio/designs/xplore/mockups/xplore-trifold-brochure.webp"),
              alt: "Xplore Land & Sea tri-fold brochure mockup.",
              caption: "Tri-fold brochure",
            },
            {
              src: cloudinaryAsset("portfolio/designs/xplore/mockups/xplore-book.webp"),
              alt: "Xplore Land & Sea book mockup.",
              caption: "Book",
            },
            {
              src: cloudinaryAsset("portfolio/designs/xplore/mockups/xplore-outdoor-flags.webp"),
              alt: "Xplore Land & Sea outdoor flags mockup.",
              caption: "Outdoor flags",
            },
            {
              src: cloudinaryAsset("portfolio/designs/xplore/mockups/xplore-led-screen.webp"),
              alt: "Xplore Land & Sea led screen mockup.",
              caption: "LED screen",
            },
          ],
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
      kind: "identity",
      cover: {
        src: cloudinaryAsset("portfolio/designs/al-bab/mockups/al-bab-wall-poster.webp"),
        alt: "Al-Bab Initiative wall posters mockup.",
      },
      galleries: [
        {
          id: "al-bab-applications",
          title: "Applications",
          items: [
            {
              src: cloudinaryAsset("portfolio/designs/al-bab/mockups/al-bab-wall-poster.webp"),
              alt: "Al-Bab Initiative wall posters mockup.",
              caption: "Wall posters",
            },
            {
              src: cloudinaryAsset("portfolio/designs/al-bab/mockups/al-bab-business-card.webp"),
              alt: "Al-Bab Initiative business card mockup.",
              caption: "Business card",
            },
            {
              src: cloudinaryAsset("portfolio/designs/al-bab/mockups/al-bab-trifold-brochure.webp"),
              alt: "Al-Bab Initiative tri-fold brochure mockup.",
              caption: "Tri-fold brochure",
            },
            {
              src: cloudinaryAsset("portfolio/designs/al-bab/mockups/al-bab-book.webp"),
              alt: "Al-Bab Initiative book mockup.",
              caption: "Book",
            },
            {
              src: cloudinaryAsset("portfolio/designs/al-bab/mockups/al-bab-outdoor-flags.webp"),
              alt: "Al-Bab Initiative outdoor flags mockup.",
              caption: "Outdoor flags",
            },
            {
              src: cloudinaryAsset("portfolio/designs/al-bab/mockups/al-bab-led-screen.webp"),
              alt: "Al-Bab Initiative led screen mockup.",
              caption: "LED screen",
            },
          ],
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
      kind: "identity",
      cover: {
        src: cloudinaryAsset("portfolio/designs/kingmaker/mockups/kingmaker-folder.webp"),
        alt: "Kingmaker Tax Advisors black presentation folder among leaves.",
      },
      galleries: [
        {
          id: "kingmaker-applications",
          title: "Applications",
          items: [
            {
              src: cloudinaryAsset("portfolio/designs/kingmaker/mockups/kingmaker-folder.webp"),
              alt: "Kingmaker Tax Advisors presentation folder mockup.",
              caption: "Presentation folder",
            },
            {
              src: cloudinaryAsset("portfolio/designs/kingmaker/mockups/kingmaker-stationery.webp"),
              alt: "Kingmaker Tax Advisors folder, letterhead and envelope.",
              caption: "Stationery set",
            },
          ],
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
    // Interface studies.
    {
      id: "barangai",
      kind: "interface",
      title: "BarangAI",
      meta: "> UP Mindanao Innovation Cup / June 2026",
      summary:
        "SMS-based citizen concern intake and action dashboard, built for the UP Mindanao Innovation Cup, where the team reached the finals. Lead designer on the hackathon team, from moodboard and storyboard to the full landing page wireframe.",
      details: [
        "Finalist, UP Mindanao Innovation Cup, June 2026",
        "Lead designer on the hackathon team",
        "SMS-based citizen concern intake and action dashboard",
        "Blue pixel-block visual language",
      ],
      deliverables: ["Visual identity", "Moodboard", "Storyboard", "Landing page wireframe"],
      cover: {
        src: cloudinaryAsset("portfolio/designs/barangai/barangai-main.webp"),
        alt: "BarangAI identity board in blue: posters, social tiles and the pixel-block mark.",
      },
      galleries: [
        {
          id: "barangai-wireframe",
          title: "Landing page wireframe",
          items: [
            {
              src: cloudinaryAsset("portfolio/designs/barangai/barangai-wireframe.webp"),
              alt: "BarangAI landing page wireframe, full length.",
              caption: "Landing page, full length",
              tall: true,
            },
          ],
        },
      ],
      carousel: [
        {
          id: "barangai-main",
          title: "Identity board",
          description: "Posters, social tiles and the pixel-block mark",
          imageSrc: cloudinaryAsset("portfolio/designs/barangai/barangai-main.webp"),
          imageAlt: "BarangAI identity board in blue.",
          imageFit: "contain",
        },
        {
          id: "barangai-moodboard",
          title: "Moodboard",
          description: "Colour, type and imagery direction",
          imageSrc: cloudinaryAsset("portfolio/designs/barangai/barangai-moodboard.webp"),
          imageAlt: "BarangAI moodboard.",
          imageFit: "contain",
        },
        {
          id: "barangai-storyboard-2",
          title: "Storyboard 1",
          description: "In many Mindanao communities",
          imageSrc: cloudinaryAsset("portfolio/designs/barangai/barangai-storyboard-2.webp"),
          imageAlt: "BarangAI storyboard frame: in many Mindanao communities.",
          imageFit: "contain",
        },
        {
          id: "barangai-storyboard-3",
          title: "Storyboard 2",
          description: "Barangay concerns still arrive",
          imageSrc: cloudinaryAsset("portfolio/designs/barangai/barangai-storyboard-3.webp"),
          imageAlt: "BarangAI storyboard frame: barangay concerns still arrive.",
          imageFit: "contain",
        },
        {
          id: "barangai-storyboard-4",
          title: "Storyboard 3",
          description: "Across phones, laptops and megaphones",
          imageSrc: cloudinaryAsset("portfolio/designs/barangai/barangai-storyboard-4.webp"),
          imageAlt: "BarangAI storyboard frame: barangay concerns across devices.",
          imageFit: "contain",
        },
        {
          id: "barangai-storyboard-5",
          title: "Storyboard 4",
          description: "Without one system",
          imageSrc: cloudinaryAsset("portfolio/designs/barangai/barangai-storyboard-5.webp"),
          imageAlt: "BarangAI storyboard frame: without one system.",
          imageFit: "contain",
        },
        {
          id: "barangai-storyboard-9",
          title: "Storyboard 5",
          description: "Reports get left without updates",
          imageSrc: cloudinaryAsset("portfolio/designs/barangai/barangai-storyboard-9.webp"),
          imageAlt: "BarangAI storyboard frame: reports get left without updates.",
          imageFit: "contain",
        },
      ],
    },
    {
      id: "pronote",
      kind: "interface",
      title: "ProNote",
      meta: "> Personal project / 2025",
      summary:
        "AI-powered notes app, a personal project designed in 2025 and built in React. Notes, tasks, habits and a diary share one workspace.",
      details: [
        "Personal project, 2025",
        "AI-powered notes app, built in React",
        "Dark interface with sidebar navigation across modules",
      ],
      deliverables: ["Notes", "Tasks", "Habits", "Diary"],
      cover: {
        src: cloudinaryAsset("portfolio/designs/pronote/pronote-tasks.webp"),
        alt: "ProNote daily tasks screen with progress cards.",
      },
      carousel: [
        {
          id: "pronote-tasks",
          title: "Tasks",
          description: "Daily tasks with progress and due dates",
          imageSrc: cloudinaryAsset("portfolio/designs/pronote/pronote-tasks.webp"),
          imageAlt: "ProNote daily tasks screen.",
          imageFit: "contain",
        },
        {
          id: "pronote-notes",
          title: "Notes",
          description: "Tagged notes in a board layout",
          imageSrc: cloudinaryAsset("portfolio/designs/pronote/pronote-notes.webp"),
          imageAlt: "ProNote notes screen.",
          imageFit: "contain",
        },
        {
          id: "pronote-habits",
          title: "Habits",
          description: "Weekly habit tracker",
          imageSrc: cloudinaryAsset("portfolio/designs/pronote/pronote-habits.webp"),
          imageAlt: "ProNote habits screen.",
          imageFit: "contain",
        },
        {
          id: "pronote-diary",
          title: "Diary",
          description: "Dated entries with a rich text editor",
          imageSrc: cloudinaryAsset("portfolio/designs/pronote/pronote-diary.webp"),
          imageAlt: "ProNote diary screen.",
          imageFit: "contain",
        },
      ],
    },
    {
      id: "cs-website",
      kind: "interface",
      title: "CS Website",
      meta: "> CS Core Team / 2025",
      summary:
        "Flagship project from leading the CS Core Team: a website for the BS Computer Science program at USTP Cagayan de Oro, covering the program, its objectives and its achievements. Started in 2025; not launched.",
      details: [
        "Flagship project of the CS Core Team, started 2025",
        "BS Computer Science, USTP Cagayan de Oro",
        "Orange and charcoal on a grid ground",
        "Not launched",
      ],
      deliverables: ["Website design", "Program pages", "Achievements showcase"],
      cover: {
        src: cloudinaryAsset("portfolio/designs/cs-website/cs-website-01.webp"),
        alt: "CS Website hero: Be at the bleeding edge of computing.",
      },
      galleries: [
        {
          id: "cs-website-full",
          title: "Full page",
          items: [
            {
              src: cloudinaryAsset("portfolio/designs/cs-website/cs-website-full.webp"),
              alt: "CS Website design, full length.",
              caption: "Home page, full length",
              tall: true,
            },
          ],
        },
      ],
      carousel: [
        {
          id: "cs-website-01",
          title: "Section 1",
          description: "Home page",
          imageSrc: cloudinaryAsset("portfolio/designs/cs-website/cs-website-01.webp"),
          imageAlt: "CS Website home page, section 1 of 9.",
          imageFit: "contain",
        },
        {
          id: "cs-website-02",
          title: "Section 2",
          description: "Home page",
          imageSrc: cloudinaryAsset("portfolio/designs/cs-website/cs-website-02.webp"),
          imageAlt: "CS Website home page, section 2 of 9.",
          imageFit: "contain",
        },
        {
          id: "cs-website-03",
          title: "Section 3",
          description: "Home page",
          imageSrc: cloudinaryAsset("portfolio/designs/cs-website/cs-website-03.webp"),
          imageAlt: "CS Website home page, section 3 of 9.",
          imageFit: "contain",
        },
        {
          id: "cs-website-04",
          title: "Section 4",
          description: "Home page",
          imageSrc: cloudinaryAsset("portfolio/designs/cs-website/cs-website-04.webp"),
          imageAlt: "CS Website home page, section 4 of 9.",
          imageFit: "contain",
        },
        {
          id: "cs-website-05",
          title: "Section 5",
          description: "Home page",
          imageSrc: cloudinaryAsset("portfolio/designs/cs-website/cs-website-05.webp"),
          imageAlt: "CS Website home page, section 5 of 9.",
          imageFit: "contain",
        },
        {
          id: "cs-website-06",
          title: "Section 6",
          description: "Home page",
          imageSrc: cloudinaryAsset("portfolio/designs/cs-website/cs-website-06.webp"),
          imageAlt: "CS Website home page, section 6 of 9.",
          imageFit: "contain",
        },
        {
          id: "cs-website-07",
          title: "Section 7",
          description: "Home page",
          imageSrc: cloudinaryAsset("portfolio/designs/cs-website/cs-website-07.webp"),
          imageAlt: "CS Website home page, section 7 of 9.",
          imageFit: "contain",
        },
        {
          id: "cs-website-08",
          title: "Section 8",
          description: "Home page",
          imageSrc: cloudinaryAsset("portfolio/designs/cs-website/cs-website-08.webp"),
          imageAlt: "CS Website home page, section 8 of 9.",
          imageFit: "contain",
        },
        {
          id: "cs-website-09",
          title: "Section 9",
          description: "Home page",
          imageSrc: cloudinaryAsset("portfolio/designs/cs-website/cs-website-09.webp"),
          imageAlt: "CS Website home page, section 9 of 9.",
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

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------

export const homeHero: HomeHero = {
  name: "John Carl Ramirez",
  role: "Developer and brand designer",
  // Each one is backed by work on this site: the case studies, the identity
  // systems, the interface studies, the motion pieces and the SSRN preprint.
  roles: [
    "Developer and brand designer",
    "Full-stack developer",
    "Brand identity designer",
    "UI/UX designer",
    "Motion designer",
    "Algorithm researcher",
  ],
  proof:
    "Full-stack applications and websites, from research to interface, made by a developer and designer with a keen eye for design and user experience.",
  status: "Open to work",
  location: "Cagayan de Oro, Philippines",
  facts: ["Full-stack, Research, Brand", "TypeScript, Python, Next.js, Django"],
};

/** Order of the four project cards on the home page. */
export const featuredWorkIds = [
  "trailventure",
  "steady",
  "agriova",
  "fresco-grow-lab",
] as const;

/** Order of the four identity cards on the home page. */
// The Enduro case study leads the tab. Xplore takes the full-width last tile:
// its cover is wide enough for it, where Kingmaker's 1100px cover is not.
export const featuredBrandIds = [
  "snap-engineering",
  "kingmaker",
  "al-bab",
  "xplore",
] as const;

export const interfaceIds = ["barangai", "pronote", "cs-website"] as const;

function motionPiece(
  id: string,
  title: string,
  format: string,
  aspect: MotionPiece["aspect"],
  summary: string,
): MotionPiece {
  return {
    id,
    title,
    format,
    summary,
    aspect,
    poster: cloudinaryAsset(`portfolio/motion/${id}-poster.webp`),
    loop: {
      webm: `/portfolio/motion/${id}-loop.webm`,
      mp4: `/portfolio/motion/${id}-loop.mp4`,
    },
    full: `portfolio/motion/full/${id}.mp4`,
  };
}

// Muted everywhere: the audio is stripped at encode time, not just silenced
// in the player, because several of these use commercial music.
export const motionData: MotionPiece[] = [
  motionPiece(
    "wordmark-teaser",
    "Paugnat 2026",
    "Event teaser, February 2026",
    "wide",
    "Teaser trailer for Paugnat, USTP-CDO’s university-wide yearly intramurals. Made in Blender and After Effects.",
  ),
  motionPiece(
    "btr-trailer",
    "Beyond the Rainbow",
    "Campaign teaser, June 2026",
    "wide",
    "For a USG USTP-CDO initiative that raises awareness of the LGBTQ+ community, in celebration of Pride Month.",
  ),
  motionPiece(
    "narcos-ph",
    "Narcos intro, Philippines edition",
    "Title sequence, Personal project",
    "wide",
    "Inspired by the Netflix series Narcos, retold with Philippine history.",
  ),
  motionPiece(
    "wildflower",
    "Wildflower",
    "Lyric video, Billie Eilish",
    "square",
    "Personal project, made in After Effects in 2025.",
  ),
  motionPiece(
    "promise",
    "Promise",
    "Lyric video, Laufey",
    "square",
    "Personal project, made in After Effects in 2025.",
  ),
  motionPiece(
    "the-shade",
    "The Shade",
    "Lyric video, Rex Orange County",
    "square",
    "Personal project, made in After Effects in 2025.",
  ),
];

const apparel = (file: string, alt: string, caption: string): MediaItem => ({
  src: cloudinaryAsset(`portfolio/designs/apparel/${file}.webp`),
  alt,
  caption,
});

const frescoCollateral: Gallery | undefined = projectsData.projects
  .find((project) => project.id === "fresco-grow-lab")
  ?.galleries?.find((gallery) => gallery.id === "fresco-collateral");

export const printData: PrintPiece[] = [
  {
    id: "official-apparel",
    title: "Official apparel",
    format: "Apparel, 4-H Club USTP-CDO and CS3",
    summary:
      "Designed in 2025 and adopted as official apparel by 4-H Club USTP-CDO and CS3, the main BSCS student organization.",
    cover: apparel("4h-green-t-shirt", "Green 4-H Club shirt, worn, showing the back print.", "4-H Club, green, back"),
    items: [
      apparel("4h-green-t-shirt", "Green 4-H Club shirt, worn, showing the back print.", "4-H Club, green, back"),
      apparel("4h-green-mockup", "Green 4-H Club shirt, front and back flats.", "4-H Club, green, front and back"),
      apparel("4h-white-t-shirt", "White 4-H Club shirt, worn, showing the back print.", "4-H Club, white, back"),
      apparel("4h-white-mockup", "White 4-H Club shirt, front and back flats.", "4-H Club, white, front and back"),
      apparel("cs-polo-core-team-front", "White and cyan Computer Science Student Society core team polo, front.", "CS3 core team, front"),
      apparel("cs-polo-core-team-back", "White and cyan Computer Science Student Society core team polo, back.", "CS3 core team, back"),
      apparel("cs-polo-faculty-front", "Navy and gold faculty polo for the Department of Computer Science, front.", "Faculty, front"),
      apparel("cs-polo-faculty-back", "Navy and gold faculty polo for the Department of Computer Science, back.", "Faculty, back"),
    ],
  },
  {
    id: "fresco-collateral",
    title: "Fresco Greenovations",
    format: "Print and social",
    summary: "Brochure, social posts and a conference poster for Fresco Greenovations, the agritech startup Fresco Grow Lab was built for.",
    cover: {
      src: cloudinaryAsset("portfolio/projects/fresco-grow-lab/collateral/fresco-poster.webp"),
      alt: "Fresco Greenovations conference poster: Greenfluencing the Future.",
    },
    items: frescoCollateral?.items ?? [],
  },
];

export const experienceData: ExperienceEntry[] = [
  {
    date: "Dec 2025 to Aug 2026",
    title: "Lead Designer and Branding Manager",
    org: "Enduro Group, Dallas, Texas",
    summary:
      "Authored the firm’s brand guidelines and designed client identity systems under its name, including Al-Bab Initiative and Xplore Land & Sea.",
    href: "/work/enduro-branding",
    hrefLabel: "View the Enduro Group brand",
    image: {
      light: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-white-01.webp"),
      dark: cloudinaryAsset("portfolio/projects/enduro-brand/mockups/enduro-dark-01.webp"),
      alt: "Enduro Group wall billboard: We empower purposeful leaders to create a lasting global impact.",
    },
  },
  {
    date: "May 2025",
    title: "KMB 2-approximation for post-disaster road restoration",
    org: "SSRN preprint, Corresponding author",
    summary:
      "Adapts the Kou–Markowsky–Berman 2-approximation to select restoration routes through a damaged road network, evaluated on Istanbul benchmarks and Cagayan de Oro road data.",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5277559",
    hrefLabel: "Read the paper on SSRN",
    external: true,
  },
];

export const recordData: RecordEntry[] = [
  { date: "2023 to present", title: "BS Computer Science, USTP Cagayan de Oro, Dean’s List" },
  { date: "2024 to present", title: "Video Editing and Multimedia Head, University Student Government" },
  { date: "March 2024", title: "1st place at USTP-CDO, Google Developer Student Clubs APAC Solution Challenge" },
  { date: "November 2024", title: "Level 2, 11th TOPCIT" },
  { date: "June 2026", title: "Top 20 semifinalist, Innovation Cup Mindanao 2026" },
];

export const contactData: ContactData = {
  kicker: "Colophon",
  title: "Got a vision? Let’s bring it to life.",
  summary: footerData.cta.summary,
  email: contactAction.href.replace("mailto:", ""),
  links: [
    ...footerData.links,
    { label: "Download CV", href: "/cv.pdf", icon: "download" },
  ],
};

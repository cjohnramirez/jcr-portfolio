import { cloudinaryAsset } from "./cloudinary";
import type { CaseContent, MediaItem } from "./portfolio-types";

/**
 * Short-form copy for every detail page.
 *
 * Every line here is condensed from the project's own notes in
 * portfolio-data.ts, or from copy John supplied. Every figure already appears
 * in those notes. Nothing is added: when a page has no honest number to show,
 * it shows none.
 */

/** A full-page capture, sliced by scripts/capture-fullpage.mjs. */
function slices(dir: string, name: string, count: number, alt: string): MediaItem[] {
  return Array.from({ length: count }, (_, index) => ({
    src: cloudinaryAsset(`portfolio/${dir}/fullpage/${name}-${String(index + 1).padStart(2, "0")}.webp`),
    alt: index === 0 ? alt : "",
  }));
}

/** A screen captured at full length by scripts/capture-screens.mjs. */
function screen(slug: string, name: string, count: number, label: string, alt: string) {
  return {
    label,
    items: Array.from({ length: count }, (_, index) => ({
      src: cloudinaryAsset(`portfolio/projects/${slug}/screens/${name}-${String(index + 1).padStart(2, "0")}.webp`),
      alt: index === 0 ? alt : "",
    })),
  };
}

/** A screen kept from the original screenshots: not reachable without the hardware. */
function still(path: string, label: string, alt: string) {
  return { label, items: [{ src: cloudinaryAsset(`portfolio/projects/${path}`), alt }] };
}

const agriovaScreen = (file: string, caption: string, alt: string): MediaItem => ({
  src: cloudinaryAsset(`portfolio/projects/agriova/${file}.webp`),
  alt,
  caption,
});

export const caseContent: Record<string, CaseContent> = {
  // ---- Work -----------------------------------------------------------
  trailventure: {
    layout: "website",
    tagline: "Full-stack tour booking application, with Stripe integration.",
    role: "Solo developer",
    year: "2026",
    stack: "Django, Next.js, and Stripe",
    status: "Live",
    figuresNote: "Lighthouse, desktop · Oct 2026",
    figures: [
      { value: "90", label: "Performance" },
      { value: "100", label: "Accessibility" },
      { value: "100", label: "Best practices" },
    ],
    decisions: [
      { title: "Server-side money", line: "Prices are computed on the server and stored as integer centavos." },
      { title: "Idempotent checkout", line: "Repeat requests reuse the Stripe session; webhook replays are ignored." },
      { title: "Versioned cache", line: "One version bump clears every catalog response; a hit costs zero queries." },
    ],
    site: {
      label: "trailventure.jcrdev.me",
      href: "https://trailventure.jcrdev.me",
      fullPage: slices("projects/trailventure", "trailventure", 2, "TrailVenture home page, full length."),
      pages: [
        screen("trailventure", "search", 1, "Search results", "TrailVenture search results for Palawan, with filters."),
        screen("trailventure", "package", 1, "Package detail", "TrailVenture package page for Palawan Island Paradise."),
        screen("trailventure", "booking", 1, "Review and pay", "TrailVenture booking review before Stripe checkout."),
        screen("trailventure", "success", 1, "Booking confirmed", "TrailVenture booking confirmation."),
        screen("trailventure", "account", 1, "Your bookings", "TrailVenture account page listing bookings."),
      ],
    },
  },
  steady: {
    layout: "website",
    tagline: "Guidance and counselling, confidential by design.",
    role: "Lead developer, team of five",
    year: "2025",
    stack: "Next.js and Supabase",
    status: "Live",
    figuresNote: "Lighthouse, desktop · Oct 2026",
    figures: [
      { value: "97", label: "Performance" },
      { value: "100", label: "Accessibility" },
      { value: "100", label: "Best practices" },
    ],
    decisions: [
      { title: "Access in the database", line: "Row-level security scopes counsellors to departments and students to their own records." },
      { title: "Checked writes", line: "Every write is a server action that checks the role and validates the form." },
      { title: "Token-swap theming", line: "Semantic tokens and shared components make the dark theme a token swap." },
    ],
    site: {
      label: "steady-system.jcrdev.me",
      href: "https://steady-system.jcrdev.me",
      fullPage: slices("projects/steady", "steady", 2, "Steady home page, full length."),
      pages: [
        screen("steady", "portal", 2, "Resource portal", "Steady resource portal with articles, announcements and events."),
        screen("steady", "signup", 1, "Student registration", "Steady student registration form."),
        screen("steady", "student", 1, "Student dashboard", "Steady student dashboard with mood check-in and appointments."),
        screen("steady", "admin-dashboard", 1, "Analytics dashboard", "Steady admin dashboard with appointment and visitor analytics."),
        screen("steady", "admin-accounts", 1, "Account administration", "Steady admin account management table."),
      ],
    },
  },
  "fresco-grow-lab": {
    layout: "website",
    tagline: "Agritech internship hub for research works, from hardware data to dashboard.",
    role: "Solo developer, internship",
    year: "2026",
    stack: "ESP32, Next.js, and Supabase",
    status: "Live",
    figuresNote: "Lighthouse, desktop · Oct 2026",
    figures: [
      { value: "89", label: "Performance" },
      { value: "100", label: "Accessibility" },
      { value: "100", label: "Best practices" },
    ],
    decisions: [
      { title: "Three ways in", line: "Boards send data over Wi-Fi, USB serial, or the gauge’s own access point." },
      { title: "Browser flashing", line: "Boards are flashed and set up over Web Serial, so images carry no credentials." },
      { title: "Same history for all", line: "A deterministic simulator gives every visitor realistic data without hardware." },
    ],
    site: {
      label: "fresco-grow-lab.jcrdev.me",
      href: "https://fresco-grow-lab.jcrdev.me",
      fullPage: screen("fresco-grow-lab", "dashboard", 1, "Dashboard", "Fresco Grow Lab temperature dashboard.").items,
      pages: [
        screen("fresco-grow-lab", "monitor", 1, "Monitor", "Fresco Grow Lab monitor with watering controls and readings."),
        screen("fresco-grow-lab", "analytics", 2, "Analytics", "Fresco Grow Lab analytics: temperature, weight and watering charts."),
        still("fresco-grow-lab/fresco-rain-dashboard.png", "Rain gauge", "Fresco Grow Lab rain gauge dashboard."),
        still("fresco-grow-lab/fresco-connect.png", "Browser flashing", "Flashing ESP32 firmware from the browser over Web Serial."),
        screen("fresco-grow-lab", "docs", 1, "Project docs", "Fresco Grow Lab project documentation."),
      ],
    },
  },
  agriova: {
    layout: "study",
    tagline: "A farm ledger that works without signal.",
    role: "Solo developer",
    stack: "React Native and Supabase",
    status: "v1.0.0 · Android and iOS",
    figures: [
      { value: "1,207", label: "Jest tests against real SQLite" },
      { value: "56 dp", label: "touch targets for older hands" },
      { value: "20", label: "assistant questions a day, per farmer" },
    ],
    decisions: [
      { title: "Local-first", line: "SQLite on the phone is the source of truth; screens never wait on the network." },
      { title: "Exact money", line: "Integer centavos on phone and server, so profit totals never drift." },
      { title: "A private assistant", line: "Gemini sits behind an Edge Function; the phone sends a farm summary, never a name." },
      { title: "Built for the user", line: "Bisaya and English, 56 dp targets, checked at 1.3x font scale." },
    ],
    transparent: true,
    coverPair: [
      agriovaScreen("agriova-cover-left", "", "Agriova home screen on a tilted phone, with this season's earnings."),
      agriovaScreen("agriova-cover-right", "", "Agriova farm statistics on a tilted phone."),
    ],
    screens: [
      agriovaScreen("agriova-screen-main", "Am I earning?", "Agriova home screen with this season's earnings."),
      agriovaScreen("agriova-screen-farm-fields", "Will my harvest spoil?", "Agriova fields screen, listing each plot and its crop."),
      agriovaScreen("agriova-screen-calendar", "What needs doing today?", "Agriova activity calendar with heat and sell-soon warnings."),
      agriovaScreen("agriova-screen-statistics", "Am I getting a fair price?", "Agriova farm statistics screen."),
      agriovaScreen("agriova-screen-ai-chatbot", "Ask your own records", "Agriova assistant answering from the farm's records."),
    ],
  },
  "road-restoration": {
    layout: "study",
    name: "Road Restoration",
    tagline: "Reopening the fewest roads after a disaster.",
    role: "Corresponding author",
    year: "May 2025",
    stack: "Python and QGIS",
    status: "SSRN preprint",
    figures: [
      { value: "< 2", label: "approximation ratio on all 30 random graphs" },
      { value: "12", label: "Istanbul benchmark instances, all within the bound" },
      { value: "3.10", label: "worst Greedy ratio, against KMB’s guaranteed 2" },
    ],
    decisions: [
      { title: "A crew’s real cost", line: "Blocked roads cost first, open roads second, as they do for a restoration crew." },
      { title: "The bound holds", line: "Verified the 2-approximation still holds under the modified cost." },
      { title: "Quality over speed", line: "KMB takes 8 to 12 seconds where Greedy takes under one, for a guaranteed bound." },
    ],
  },
  "enduro-branding": {
    layout: "study",
    name: "Enduro Group",
    tagline: "Dallas-based business consulting and services.",
    role: "Lead Designer and Branding Manager",
    year: "Dec 2025 to Aug 2026",
    stack: "Figma, Illustrator, and Photoshop",
    status: "Enduro Group, Dallas",
    fitScreens: true,
    figures: [
      { value: "31", label: "pages of brand guidelines, v2.0" },
      { value: "4", label: "brand systems completed, Enduro’s own included" },
      { value: "9", label: "months as lead designer, December 2025 to August 2026" },
    ],
    decisions: [
      { title: "One wordmark, two ways", line: "Vertical and horizontal lockups at −5% tracking, with construction and clearspace rules." },
      { title: "Brands as repositories", line: "Each brand ships a machine-readable DESIGN.md, generators and a verifier." },
      { title: "No shared code", line: "Brand rules conflict, and a shared generator would dilute both." },
    ],
  },

  // ---- Brand and design ------------------------------------------------
  "cs-website": {
    layout: "website",
    tagline: "A home for BS Computer Science at USTP.",
    role: "Lead, CS Core Team",
    year: "2025",
    stack: "Website design",
    status: "Not launched",
    decisions: [
      { title: "A working grid", line: "Orange and charcoal on a grid ground, with offset cards that read as stacked sheets." },
      { title: "Program first", line: "The page opens on the program, then its objectives, then what students achieved." },
    ],
    site: {
      label: "BSCS website · design",
      fullPage: slices("designs/cs-website", "cs-website", 4, "CS Website home page design, full length."),
    },
  },
  barangai: {
    layout: "website",
    tagline: "Citizen concerns, by text, into one dashboard.",
    role: "Lead designer, hackathon team",
    year: "June 2026",
    stack: "Brand and interface design",
    status: "Finalist, UP Mindanao Innovation Cup",
    decisions: [
      { title: "SMS first", line: "Residents report by text to a barangay short code." },
      { title: "One flood, one incident", line: "Many texts about one event become a single acknowledged incident." },
      { title: "Pixel-block language", line: "One blue mark and system across posters, social tiles and the dashboard." },
    ],
    site: {
      label: "BarangAI landing page · design",
      fullPage: slices("designs/barangai", "barangai", 4, "BarangAI landing page wireframe, full length."),
      pages: [
        {
          label: "Identity board",
          background: "#f7f7f7",
          items: [{ src: cloudinaryAsset("portfolio/designs/barangai/barangai-main.webp"), alt: "BarangAI identity board: logo, colours, type and pixel-block system." }],
        },
        {
          label: "Moodboard",
          background: "#f7f7f7",
          items: [{ src: cloudinaryAsset("portfolio/designs/barangai/barangai-moodboard.webp"), alt: "BarangAI moodboard." }],
        },
        {
          label: "Storyboard",
          layout: "grid",
          items: [2, 3, 4, 5].map((n, index) => ({
            src: cloudinaryAsset(`portfolio/designs/barangai/barangai-storyboard-${n}.webp`),
            alt: `BarangAI storyboard, panel ${index + 1} of 4.`,
          })),
        },
      ],
    },
  },
  pronote: {
    layout: "study",
    tagline: "An AI notes app, designed and built in React.",
    role: "Personal project",
    year: "2025",
    stack: "React",
    status: "Personal project",
    decisions: [
      { title: "One workspace", line: "Notes, tasks, habits and a diary share one sidebar." },
      { title: "Cards over lists", line: "Tasks and notes sit as tagged cards with progress at a glance." },
    ],
  },
  kingmaker: {
    layout: "brand",
    tagline: "Authority through restraint.",
    brief: "Strategic, authoritative, regal. The full name is mandatory, to protect the premium position.",
    direction: "Cinzel’s Roman capitals carry the heritage; the crown doubles as the clearspace unit.",
    spec: [
      { label: "Mark", value: "Crown brandmark" },
      { label: "Colour", value: "Antique Gold, Gray Hint, Shocking Black" },
      { label: "Type", value: "Cinzel and Lato" },
      { label: "Device", value: "Diagonal tiling patterns" },
    ],
  },
  xplore: {
    layout: "brand",
    tagline: "Composed, unhurried and spacious.",
    brief: "A curator, not a package, for travellers who find the Arab world appealing but opaque.",
    direction: "White grounds, Plantation green type, a watermark X and a 30° photo mask. Low density conveys calm.",
    spec: [
      { label: "Mark", value: "X emblem and wordmark" },
      { label: "Colour", value: "Plantation green on white" },
      { label: "Type", value: "Plus Jakarta Sans and Geist" },
      { label: "Device", value: "30° diagonal photo mask" },
    ],
  },
  "al-bab": {
    layout: "brand",
    tagline: "Durable infrastructure, not a campaign.",
    brief: "One system for two audiences: field practitioners, and the churches that support them.",
    direction: "The brand is a door, so layouts open: generous ground, hairline rules, copper only for emphasis.",
    spec: [
      { label: "Mark", value: "الباب, “the door”" },
      { label: "Colour", value: "Near-black ink and copper" },
      { label: "Type", value: "Bebas Neue and Noto Kufi Arabic" },
      { label: "Device", value: "One gradient headline per piece" },
    ],
  },
  "snap-engineering": {
    layout: "brand",
    tagline: "No hassle, no mistakes.",
    brief: "Bridge a design and a finished product, for procurement teams and business owners.",
    direction: "An angular S of parallel paths, leaning forward, at a heavy, uniform line weight.",
    spec: [
      { label: "Mark", value: "Angular “S” monogram" },
      { label: "Colour", value: "Azure and Dark Azure over black" },
      { label: "Type", value: "Creato Display and Neptune" },
      { label: "Device", value: "Interlocking parallel paths" },
    ],
  },
};

export function getCaseContent(slug: string): CaseContent | undefined {
  return caseContent[slug];
}

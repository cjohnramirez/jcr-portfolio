export type ActionLink = {
  label: string;
  href: string;
  external?: boolean;
  icon?: "download" | "github" | "mail" | "arrow" | "social" | "send";
  iconSrc?: string;
};

export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type HeroData = {
  kicker: string;
  status: string;
  title: {
    before: string;
    accented: string[];
    after: string;
  };
  summary: string;
  portrait: {
    src: string;
    alt: string;
  };
  details: string[];
  actions: ActionLink[];
};

export type AboutData = {
  sectionLabel: string;
  status: string;
  title: {
    before: string;
    accented: string;
  };
  summary: string;
  actions: ActionLink[];
  media: {
    src: string;
    alt: string;
  };
  columns: {
    title: string;
    body: string;
  }[];
};

export type ServiceCardData = {
  title: string;
  description: string;
  items: string[];
  icon: "screen" | "database" | "interface";
};

export type ServicesData = {
  sectionLabel: string;
  status: string;
  title: {
    before: string;
    accented: string;
    after: string;
  };
  summary: string;
  cards: ServiceCardData[];
};

export type CarouselItem = {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
};

export type ProjectCaseStudy = {
  id: string;
  module: string;
  title: string;
  category: string;
  summary: string;
  /**
   * Lifts the plate into the selected-work band on `/` and `/work`, ahead of
   * the index. A flag rather than a list of ids elsewhere, so promoting the
   * next build is a one-line change in this file and nothing has to agree
   * with it.
   */
  featured?: boolean;
  /**
   * Device mockup for the selected-work tile, one render per theme. Cropped
   * to the tile's 1.86 ratio with the device resting on the bottom edge.
   */
  cover?: {
    light: string;
    dark: string;
    alt: string;
  };
  carousel: CarouselItem[];
  stack: {
    label: string;
    items: string[];
  };
  skills: {
    label: string;
    items: string[];
  };
  notes: {
    title: string;
    description: string;
  }[];
  /**
   * Where the work itself lives — a deployment, a published paper. Rendered
   * beneath the lead, so a reader can go and check the claims rather than
   * take the plate's word for them.
   */
  links?: {
    label: string;
    href: string;
  }[];
  /**
   * One line of proof for the home card: stack, then the strongest verifiable
   * outcome. Every figure here must already appear in `notes`.
   */
  result?: string;
  /** Extra imagery shown under the sheets, e.g. original Figma designs. */
  galleries?: Gallery[];
};

export type ProjectsData = {
  sectionLabel: string;
  status: string;
  title: {
    accentedBefore: string;
    middle: string;
    accentedAfter: string;
  };
  summary: string;
  projects: ProjectCaseStudy[];
};

export type PortfolioBrand = {
  id: string;
  title: string;
  meta: string;
  /**
   * The lead paragraph. Previously the plate joined `details` with em dashes
   * to stand in for one, which reads as a list wearing a sentence's clothes
   * and cannot carry a real brief.
   */
  summary?: string;
  details: string[];
  deliverables: string[];
  /** The brief and the direction, in the same shape the case plates use. */
  notes?: {
    title: string;
    description: string;
  }[];
  carousel: CarouselItem[];
  /**
   * `identity` entries are brand systems; `interface` entries are UI/UX
   * studies. Both render through the same detail template.
   */
  kind?: "identity" | "interface";
  /** Card image on the home page. Falls back to the first sheet. */
  cover?: MediaItem;
  galleries?: Gallery[];
};

export type CreativePortfolioData = {
  sectionLabel: string;
  status: string;
  title: {
    accented: string;
    rest: string;
  };
  summary: string;
  brands: PortfolioBrand[];
};

export type TimelineEntry = {
  date: string;
  title: string;
  description?: string;
  details?: string[];
};

export type AdditionalBlock = {
  id: string;
  title: string;
  summary: string;
  /**
   * Optional: not every appendix block has plates. Education is a dated record
   * with nothing to photograph, and an empty annotated frame reads as a broken
   * image rather than as a deliberately quiet block.
   */
  carousel?: CarouselItem[];
  entries: TimelineEntry[];
};

export type AdditionalsData = {
  sectionLabel: string;
  status: string;
  title: {
    before: string;
    accented: string;
  };
  summary: string;
  blocks: AdditionalBlock[];
};

export type FooterData = {
  cta: {
    title: {
      before: string;
      accented: string;
    };
    summary: string;
    action: ActionLink;
  };
  brandLine: {
    before: string;
    accented: string[];
    after: string;
  };
  copyright: string;
  links: ActionLink[];
};

export type MediaItem = {
  src: string;
  alt: string;
  caption?: string;
  /**
   * A full-length page capture. Rendered in a fixed-height frame that scrolls,
   * rather than shrunk until it is unreadable.
   */
  tall?: boolean;
};

export type Gallery = {
  id: string;
  title: string;
  summary?: string;
  items: MediaItem[];
};

export type MotionPiece = {
  id: string;
  title: string;
  /** What kind of piece it is, read from the work itself. */
  format: string;
  summary?: string;
  aspect: "square" | "wide";
  poster: string;
  /** Silent 8-second loop, served with the site. */
  loop: { webm: string; mp4: string };
  /** Muted full-length encode, served from the CDN. */
  full: string;
};

export type PrintPiece = {
  id: string;
  title: string;
  format: string;
  summary?: string;
  cover: MediaItem;
  items: MediaItem[];
};

export type ExperienceEntry = {
  date: string;
  title: string;
  org: string;
  summary: string;
  href: string;
  hrefLabel: string;
  external?: boolean;
  image?: { light: string; dark: string; alt: string };
};

export type RecordEntry = {
  date: string;
  title: string;
};

export type ContactData = {
  kicker: string;
  title: string;
  summary: string;
  email: string;
  links: ActionLink[];
};

export type HomeHero = {
  name: string;
  role: string;
  proof: string;
  status: string;
  location: string;
  facts: string[];
};

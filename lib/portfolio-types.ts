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
    label: string;
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
};

export type ProjectCaseStudy = {
  id: string;
  module: string;
  title: string;
  category: string;
  summary: string;
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
  details: string[];
  deliverables: string[];
  carousel: CarouselItem[];
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
  carousel: CarouselItem[];
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

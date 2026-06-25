"use client";

import { BriefcaseBusiness, ChevronDown, Flag, Layers3 } from "lucide-react";
import { useId, useState } from "react";
import type { ProjectCaseStudy, ProjectsData } from "@/lib/portfolio-types";
import { CarouselFrame } from "../shared/carousel-frame";
import { SectionShell } from "../shared/section-shell";
import { StatusMarker } from "../shared/status-marker";

type ProjectsSectionProps = {
  data: ProjectsData;
};

type ProjectListProps = {
  projects: ProjectCaseStudy[];
  activeId: string;
  onSelect: (id: string) => void;
};

function ProjectList({ projects, activeId, onSelect }: ProjectListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();
  const activeProject =
    projects.find((project) => project.id === activeId) ?? projects[0];

  function selectProject(id: string) {
    onSelect(id);
    setIsOpen(false);
  }

  if (!activeProject) {
    return null;
  }

  return (
    <>
      <div className="relative z-10 w-full max-w-[394px] xl:hidden">
        <button
          aria-controls={listId}
          aria-expanded={isOpen}
          className="flex h-[68px] w-full items-center justify-between gap-4 overflow-hidden border border-[var(--portfolio-action-border)] bg-[var(--portfolio-action-bg)] p-5 text-left font-sans text-xs font-normal uppercase leading-none tracking-normal text-[var(--portfolio-action-text)] transition-colors hover:border-[var(--portfolio-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--portfolio-accent)]"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="min-w-0 truncate">{activeProject.module}</span>
          <ChevronDown
            aria-hidden="true"
            className={`size-[25px] shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            strokeWidth={1.5}
          />
        </button>

        {isOpen ? (
          <div
            className="absolute left-0 top-full w-full border-x border-b border-[var(--portfolio-border)] bg-[var(--portfolio-dropdown-list)]"
            id={listId}
            role="listbox"
          >
            {projects.map((project) => {
              const isActive = project.id === activeId;

              return (
                <button
                  aria-selected={isActive}
                  className={`flex min-h-[68px] w-full items-center bg-[var(--portfolio-dropdown-list)] p-5 text-left font-sans text-xs font-normal uppercase leading-none tracking-normal text-[var(--portfolio-text)] transition-[box-shadow] hover:shadow-[inset_0_0_0_1px_var(--portfolio-accent)] focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--portfolio-accent)] ${
                    isActive
                      ? "shadow-[inset_0_0_0_1px_var(--portfolio-accent)]"
                      : ""
                  }`}
                  key={project.id}
                  role="option"
                  type="button"
                  onClick={() => selectProject(project.id)}
                >
                  <span className="min-w-0 truncate">{project.module}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="hidden gap-5 text-xs uppercase leading-normal tracking-normal xl:flex xl:flex-col xl:text-base">
        {projects.map((project) => {
          const isActive = project.id === activeId;

          return (
            <button
              aria-pressed={isActive}
              className={`shrink-0 text-left font-sans text-xs font-normal uppercase leading-normal tracking-normal transition-colors hover:text-[var(--portfolio-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--portfolio-accent)] lg:text-[14px] ${
                isActive
                  ? "text-[var(--portfolio-accent)]"
                  : "text-[var(--portfolio-text)]"
              }`}
              key={project.id}
              type="button"
              onClick={() => onSelect(project.id)}
            >
              {isActive ? "> " : ""}
              {project.module}
            </button>
          );
        })}
      </div>
    </>
  );
}

type DetailBlockProps = {
  icon: "layers" | "briefcase" | "flag";
  title: string;
  items?: string[];
  description?: string;
};

const detailIcons = {
  layers: Layers3,
  briefcase: BriefcaseBusiness,
  flag: Flag,
};

function DetailBlock({ icon, title, items, description }: DetailBlockProps) {
  const Icon = detailIcons[icon];

  return (
    <article className="border border-[var(--portfolio-border)] p-6 text-[var(--portfolio-text)] lg:p-[30px]">
      <div className="mb-5 flex items-center gap-5">
        <Icon aria-hidden="true" className="size-6 shrink-0" strokeWidth={1.5} />
        <h4 className="text-xs font-normal uppercase leading-none lg:text-[14px]">
          {title}
        </h4>
      </div>
      {items ? (
        <ul className="space-y-0 text-xs uppercase leading-normal lg:text-[14px]">
          {items.map((item) => (
            <li className="before:mr-2 before:content-['>']" key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      {description ? (
        <p className="text-xs uppercase leading-normal lg:text-[14px]">
          {description}
        </p>
      ) : null}
    </article>
  );
}

function DetailList({
  icon,
  items,
  title,
}: {
  icon: "layers" | "briefcase";
  items: string[];
  title: string;
}) {
  const Icon = detailIcons[icon];

  return (
    <div>
      <div className="mb-5 flex items-center gap-5">
        <Icon aria-hidden="true" className="size-6 shrink-0" strokeWidth={1.5} />
        <h4 className="text-xs font-normal uppercase leading-none lg:text-[14px]">
          {title}
        </h4>
      </div>
      <ul className="space-y-0 text-xs uppercase leading-normal lg:text-[14px]">
        {items.map((item) => (
          <li className="before:mr-2 before:content-['>']" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechSkillsBlock({ project }: { project: ProjectCaseStudy }) {
  return (
    <article className="border border-[var(--portfolio-border)] p-6 text-[var(--portfolio-text)] lg:p-[30px]">
      <div className="grid gap-8 lg:gap-10">
        <DetailList
          icon="layers"
          items={project.stack.items}
          title={project.stack.label}
        />
        <DetailList
          icon="briefcase"
          items={project.skills.items}
          title={project.skills.label}
        />
      </div>
    </article>
  );
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const [activeId, setActiveId] = useState(data.projects[0]?.id ?? "");
  const activeProject =
    data.projects.find((project) => project.id === activeId) ?? data.projects[0];

  if (!activeProject) {
    return null;
  }

  return (
    <SectionShell id="projects" className="flex flex-col gap-10 p-5 lg:min-h-[1156px] lg:p-10">
      <div className="flex items-center justify-between gap-4 text-[var(--portfolio-text)]">
        <StatusMarker label={data.sectionLabel} />
        <p className="text-xs uppercase leading-none lg:text-[14px]">{data.status}</p>
      </div>

      <div className="flex flex-col gap-5 text-[var(--portfolio-text)]">
        <h2 className="text-[38px] font-normal uppercase leading-none tracking-normal sm:text-[52px] lg:text-[64px]">
          <span className="text-[var(--portfolio-accent)]">
            {data.title.accentedBefore}
          </span>{" "}
          {data.title.middle}{" "}
          <span className="text-[var(--portfolio-accent)]">
            {data.title.accentedAfter}
          </span>
        </h2>
        <p className="max-w-[1013px] text-xs font-normal uppercase leading-normal lg:text-[14px]">
          {data.summary}
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[276px_1fr] xl:gap-10">
        <ProjectList
          activeId={activeProject.id}
          projects={data.projects}
          onSelect={setActiveId}
        />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5 text-[var(--portfolio-text)]">
            <p className="text-xs uppercase leading-none text-[var(--portfolio-accent)] lg:text-[14px]">
              {activeProject.category}
            </p>
            <h3 className="text-[30px] font-normal uppercase leading-none tracking-normal lg:text-[36px]">
              {activeProject.title}
            </h3>
            <p className="text-xs uppercase leading-normal lg:text-[14px]">
              {activeProject.summary}
            </p>
          </div>

          <CarouselFrame
            className="w-full"
            items={activeProject.carousel}
            label="Image description"
          />

          <div className="grid gap-5 xl:grid-cols-[403px_1fr]">
            <TechSkillsBlock project={activeProject} />

            <div className="grid gap-5">
              {activeProject.notes.map((note) => (
                <DetailBlock
                  description={note.description}
                  icon="flag"
                  key={note.title}
                  title={note.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

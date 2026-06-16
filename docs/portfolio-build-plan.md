# Portfolio Build Plan

This file tracks the section-by-section implementation workflow for the single-page portfolio.

## Source

- Figma file: `Portfolio`
- Figma file key: `bi0Dq6dMTsSC5NXPaPKCRm`
- Root page node: `0:1`
- Implementation frame node: `19:682`
- Desktop reference size: `1440 x 7697`
- Implementation stack: Next `16.2.9`, React `19.2.4`, TypeScript, Tailwind `4`

## Approval Flow

Each section follows this order:

1. Add or update typed data in `lib/portfolio-data.ts`.
2. Build reusable prop-driven components in `components/portfolio/<section>/` and shared primitives in `components/portfolio/shared/`.
3. Assemble the section in `app/page.tsx`.
4. Run verification for the current slice.
5. Pause for approval before moving to the next section.

## Section Status

| Phase | Section | Status | Notes |
| --- | --- | --- | --- |
| 1 | Foundation + Docs | Built | Redone against Figma node `19:682`. |
| 2 | Hero + Navigation | Built | First review gate, using exact MCP frame context/assets. |
| 3 | About / Intro | Built | Built from Figma node `19:725`; media uses a local placeholder frame for now. |
| 4 | Digital Solutions | Built | Built from Figma node `19:754`; service icons use Lucide. |
| 5 | Projects and Roles | In review | Built from Figma node `19:796`; module data sourced from `main.md`; carousel uses local sample visuals. |
| 6 | Creative Portfolio | Not started | Reuse carousel primitive. |
| 7 | Additional / Extra Stuff | Not started | Dense content and responsive readability pass. |
| 8 | CTA + Footer | Not started | Final contact and social links. |
| 9 | Final Polish | Not started | Cross-section accessibility and responsive QA. |

## Current Approval Log

- Pending: Projects and Roles review after `19:796` implementation.

## Component Organization

- `components/portfolio/shared/`: reusable primitives used across sections.
- `components/portfolio/navigation/`: fixed portfolio navigation.
- `components/portfolio/hero/`: hero section.
- `components/portfolio/about/`: about / intro section.
- `components/portfolio/services/`: digital solutions section and service cards.
- `components/portfolio/projects/`: projects and roles section.

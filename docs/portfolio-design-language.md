# Portfolio Design Language

## Core Direction

The portfolio should feel like a precise editorial system: white canvas, thin rules, compact metadata, strict grids, and measured blue accents. The design should avoid decorative gradients, oversized rounded corners, floating cards, and generic startup styling.

## Tokens

- Background: `#f1f1f3`
- Surface: `#ffffff`
- Text: `#111111`
- Muted text: `#111111`
- Hairline border: `#d3d3d3`
- Strong border: `#d3d3d3`
- Accent blue: `#1591df`
- Button background: `#f1f1f1`

## Dark Mode

- Background: `#000000`
- Surface: `#0e0e0e`
- Text: `#dbdbdb`
- Border/button base: `#000000`
- Accent remains `#1591df`
- Theme control sits in the nav beside the contact button as a square icon-only action.
- UI icons use Lucide-style strokes; brand icons remain brand/Figma assets.

## Typography

- Figma uses Google Sans Code. The implementation self-hosts the regular Google Sans Code font from `public/fonts/google-sans-code-regular.ttf` so builds do not depend on Google Fonts network access.
- Body text is compact, uppercase where the Figma uses technical labels.
- Large display text should be tight and direct, with accent words in blue.
- Letter spacing stays neutral except for small all-caps metadata labels.

## Layout

- The page is a stack of full-width sections on a light-gray canvas.
- Section content sits in a centered white frame with thin borders.
- Desktop max width targets the Figma composition, with responsive padding on smaller screens.
- Mobile layout stacks content deliberately while keeping stable media frames and readable line lengths.

## Components

- Buttons are rectangular, small, and restrained.
- Cards use thin borders and square-to-subtle radius only.
- Image and carousel areas reserve stable aspect ratios to avoid layout shift.
- Repeated structures should be prop-driven from `lib/portfolio-data.ts`.

## Responsive Rules

- Mobile: stack major grids, preserve metadata order, keep actions wrap-safe.
- Tablet: use two-column layouts only when text has enough room.
- Desktop: match the Figma grid proportions as closely as possible.

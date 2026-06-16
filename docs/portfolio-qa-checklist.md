# Portfolio QA Checklist

Use this checklist at every section approval gate.

## Viewports

- `375px` mobile
- `768px` tablet
- `1024px` small desktop
- `1440px` Figma reference desktop

## Section Checks

- Content matches the visible Figma copy for the current section.
- Components receive content through typed props and data objects.
- Text does not overlap, clip, or spill outside controls.
- Media frames keep stable dimensions while loading.
- Interactive controls are keyboard reachable and have visible focus.
- Links have meaningful labels and safe external-link attributes.
- The section preserves the portfolio design language.

## Verification Commands

```bash
pnpm lint
pnpm build
```

## Current Slice

- Projects and Roles
- Required checks: module selector state, carousel keyboard controls, sample image rendering, desktop parity, mobile stacking, lint, dev startup.

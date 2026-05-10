---
name: responsive-ui-ux
description: Create, review, and refine responsive frontend interfaces so layouts, text, logos, images, cards, controls, and spacing stay readable and usable across devices, especially mobile screens. Use when Codex needs to improve UI/UX quality, fix mobile responsiveness, prevent overflow or awkward cropping, tune breakpoints, or make React/Tailwind interfaces adapt cleanly from phone to desktop.
---

# Responsive UI/UX

## Overview

Apply mobile-first UI/UX best practices when building or reviewing frontend interfaces. Keep layouts, typography, controls, images, logos, and spacing usable on small screens first, then scale up cleanly for tablet and desktop.

## Workflow

1. Audit the smallest practical viewport first.
2. Identify failures in hierarchy, readability, spacing, overflow, cropping, and touch usability.
3. Fix the structure before polishing visuals.
4. Add explicit responsive behavior for mobile, tablet, and desktop.
5. Re-check text, controls, media, and section rhythm after each layout change.

## Build Mode

Use this workflow when creating a new section or component.

### Start Mobile-First

- Begin with a single-column layout unless there is a strong reason not to.
- Let content stack naturally before introducing multi-column layouts.
- Prefer intrinsic sizing, flexible widths, and content-driven height over rigid fixed dimensions.
- Add breakpoint changes only when the layout clearly benefits from more space.

### Keep Text Readable

- Keep headings and body text readable on narrow screens without zooming.
- Prevent long lines, cramped paragraphs, and overly small captions.
- Let text wrap naturally; do not rely on tight tracking or compressed line-height to make content fit.
- Reduce decorative text effects if they hurt readability on small screens.

### Keep Controls Usable

- Make buttons, tabs, arrows, toggles, and links easy to tap on mobile.
- Avoid dense clusters of controls that compete for space.
- Keep active state, hover/focus state, and disabled state visually clear.
- Prefer horizontal scrolling selectors only when wrapping or stacking would be worse.

### Keep Layouts Stable

- Avoid abrupt jumps between breakpoints.
- Use consistent spacing rhythm between sections, cards, and internal content blocks.
- Make image-text rows collapse into a clean vertical sequence on smaller screens.
- Promote one primary action or focal point per section.

### Handle Media Intentionally

- Choose `object-cover` when edge cropping is acceptable and composition stays strong.
- Choose `object-contain` when the full asset matters, such as portraits, logos, certificates, UI screenshots, or product images.
- Prioritize faces, logos, and important interface details on mobile.
- Use `object-top`, `object-center`, padding, aspect constraints, or taller media areas when the image must stay fully understandable.
- Do not crop portraits so aggressively that the face becomes unclear.

## Review Mode

Use this checklist when auditing an existing UI before editing it.

- Check whether text is readable on mobile without zooming.
- Check whether buttons and links are easy to tap.
- Check whether cards feel cramped or over-padded.
- Check whether images, logos, and icons stay legible and uncropped.
- Check whether rows collapse into a sensible vertical order.
- Check whether content overflows horizontally.
- Check whether spacing remains consistent between sections.
- Check whether controls remain discoverable when content wraps.
- Check whether animation or decoration reduces clarity on small screens.

## React/Tailwind Guidance

- Prefer explicit breakpoint classes over accidental inheritance.
- Use width and max-width constraints deliberately; avoid letting large desktop values leak into mobile.
- Avoid fixed heights unless the visual requirement is intentional and tested on small screens.
- Use responsive padding and gap values that tighten on mobile and expand on larger screens.
- Keep media wrappers responsible for cropping behavior instead of pushing that responsibility into random child styles.
- When a section switches content, keep the control layout compact and touch-friendly.
- When using grids, ensure each breakpoint has a clear reason for the chosen column count.

## Common Failure Patterns

- Desktop-first layouts that become cramped on phones.
- Headlines or buttons that overflow because they assume wide screens.
- Logos or portraits that are technically visible but not understandable.
- Cards that rely on fixed height while content length varies.
- Carousels or switchers with controls that are too small or too hidden.
- Side-by-side sections that should stack earlier.

## References

- Read `references/mobile-responsive-checklist.md` when you need a compact QA checklist.
- Read `references/layout-patterns.md` when you need layout-specific guidance for common responsive section types.

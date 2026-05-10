# Layout Patterns

## Hero Sections

- Keep the primary message visible without requiring perfect desktop width.
- Stack media and text on smaller screens unless both remain strong side by side.
- Reduce decorative motion if it competes with readability.

## Cards

- Let content define height whenever possible.
- Tighten padding on mobile before shrinking text.
- Keep one clear focal element per card.

## Image + Text Rows

- Collapse into a single-column flow on small screens.
- Preserve the image subject when switching to mobile.
- Re-check whether the image should use `cover` or `contain` per breakpoint.

## Sliders and Switchers

- Keep one primary content panel visible at a time when space is limited.
- Make previous/next controls obvious, touch-friendly, and stylistically consistent with the rest of the site.
- Show enough context so users know which item is active.

## Navigation Bars

- Prevent nav items from becoming too cramped before they wrap.
- Prefer compact labels and predictable spacing.
- Keep theme toggles and action buttons easy to reach.

## Section Controls

- Match filter, tab, and switcher controls to the established button system.
- Avoid introducing a totally different control style for a single section.
- Keep controls near the content they affect.

## Responsive Column Changes

- Move from one column to two only when content has enough room.
- Avoid forcing equal column heights when content types differ.
- Re-check spacing and alignment after every breakpoint change.

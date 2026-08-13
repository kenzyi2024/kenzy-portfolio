# Accessibility Audit — Kenzy Ibrahim Portfolio

**Standard:** WCAG 2.1 AA · **Scope:** the revamped components in `src/App.jsx` (nav/menu, hero, stats, project preview cards, skill bars, interactive terminal, contact form, theme toggle) · **Status:** all findings below are **fixed** in the current build.

## Summary

Issues found: 11 · Critical: 3 · Major: 5 · Minor: 3 — all resolved.

The biggest problem was color contrast: the brand gold (`#C19A6B`) was used for small text and meaningful graphics on light backgrounds, where it measured ~2.1–2.4:1 (needs 4.5:1 for text, 3:1 for graphics). This was fixed by introducing two AA-safe tokens — `--accent-text` (dark gold on light surfaces) and `--accent-ondark` (bright gold on dark panels) — while keeping the original gold for decorative fills and for button backgrounds (which pair with dark text and already pass).

## Findings

### Perceivable
| # | Issue | WCAG | Severity | Fix |
|---|-------|------|----------|-----|
| 1 | Gold accent text (section kickers, project roles, stat labels, dates) on light backgrounds ~2.1:1 | 1.4.3 Contrast | 🔴 Critical | Switched to `--accent-text` (#6E5026) → 5.9–6.9:1 |
| 2 | Gold skill-proficiency bars & category icons on light cards <3:1 | 1.4.11 Non-text contrast | 🔴 Critical | Bars/icons now use `--accent-text` |
| 3 | Gold hero tagline / footer kicker on dark panels 4.26:1 (just under 4.5) | 1.4.3 | 🟡 Major | Switched to `--accent-ondark` (#D8B482) → 5.2–5.7:1 |
| 4 | Decorative SVG project previews exposed raw shapes to screen readers | 1.1.1 Non-text content | 🟢 Minor | Added `role="img"` + descriptive `aria-label` |
| 5 | Low-opacity footer meta (`/40`) below 4.5:1 | 1.4.3 | 🟢 Minor | Raised to `/70` |

### Operable
| # | Issue | WCAG | Severity | Fix |
|---|-------|------|----------|-----|
| 6 | Fullscreen menu couldn't be dismissed with the keyboard | 2.1.2 No keyboard trap | 🔴 Critical | Added Escape-to-close handler |
| 7 | No visible keyboard focus indicator | 2.4.7 Focus visible | 🟡 Major | Global `:focus-visible` outline (3px, `--accent-ondark`) |
| 8 | Infinite background/scan/flame animations ignored motion preferences | 2.3.3 / user comfort | 🟡 Major | `prefers-reduced-motion` CSS + Framer `useReducedMotion` gating loops |

### Understandable
| # | Issue | WCAG | Severity | Fix |
|---|-------|------|----------|-----|
| 9 | Contact inputs relied on placeholders only (no persistent labels) | 3.3.2 Labels or instructions | 🟡 Major | Added visible `<label>`s tied via `htmlFor`/`id`; `required`/`aria-required` |
| 10 | Validation errors not programmatically associated or announced | 3.3.1 Error identification | 🟡 Major | Error has `role="alert"` + `id`, inputs reference it via `aria-describedby` |

### Robust
| # | Issue | WCAG | Severity | Fix |
|---|-------|------|----------|-----|
| 11 | Menu, menu toggle, terminal log, icon-only controls missing name/role/state | 4.1.2 Name, Role, Value | 🟢 Minor | `role="dialog"`+`aria-modal` on menu; `aria-haspopup`/`aria-expanded` on toggle; `role="log"`+`aria-live="polite"` on terminal output; `aria-label`s on icon buttons; decorative icons `aria-hidden` |

## Color contrast — after fixes
| Element | Foreground | Background | Ratio | Required | Pass |
|---------|-----------|------------|-------|----------|------|
| Body text | `--ink` #2E4035 | cream #F3E5D0 | 8.9:1 | 4.5:1 | ✅ |
| Section kicker / project role | `--accent-text` #6E5026 | cream / card | 6.0–6.9:1 | 4.5:1 | ✅ |
| Skill bar fill | `--accent-text` #6E5026 | track | 6.8:1 | 3:1 | ✅ |
| Hero tagline / footer kicker | `--accent-ondark` #D8B482 | panel #2E4035 | 5.7:1 | 4.5:1 | ✅ |
| Button label | #1c130a | gold #C19A6B | 7.1:1 | 4.5:1 | ✅ |
| Form error text | #F0B58A | panel #2E4035 | ~6:1 | 4.5:1 | ✅ |
| Dark mode body | #EFE6D6 | #151B17 | 14:1 | 4.5:1 | ✅ |

## Keyboard & screen reader
- **Tab order** follows visual order; all interactive elements are native `<a>`/`<button>`/`<input>` and reachable.
- **Menu:** opens via button (`aria-expanded` reflects state), closes with the button or **Escape**; announced as a dialog.
- **Terminal:** input is labelled; responses live in a polite `role="log"` so they're announced as they appear.
- **Contact form:** labelled fields, required semantics, and an assertive error announcement.
- **Motion:** users with "reduce motion" set get a static experience (no looping blobs, scan line, or flame).

## Still worth doing (manual, can't be fully automated)
1. Test with a real screen reader (VoiceOver / NVDA) end-to-end.
2. Verify at 200% zoom on a small viewport.
3. If the custom cursor ever feels distracting, it already auto-disables on touch devices and could be made toggleable.

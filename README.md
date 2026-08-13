# Kenzy Ibrahim | Portfolio 2026

<p align="center">
  <strong>"You can't use up creativity. The more you use, the more you have."</strong>
  - Maya Angelou<br>
  <a href="https://kenzyibrahim.com"><strong>View Live Site »</strong></a>
</p>

### My Design Philosophy
Technology should be as refined as it is functional.

---
* **Color Palette:**
    * **Cream (`#F3E5D0`):** Primary background.
    * **Deep Forest Green (`#2E4035`):** Text, accents & dark panels.
    * **Sage & Gold (`#C19A6B`):** Depth & highlights.
* **Typography:** Playfair Display (headings), Lato (body), JetBrains Mono (code / labels).
* **Theming:** Light and dark modes driven by CSS variables on `data-theme`, toggled in the nav.

---

### Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core** | React (Vite) | Component-based UI architecture |
| **Styling** | Tailwind CSS + CSS variables | Utility-first, theme-aware design |
| **Animation** | Framer Motion | Scroll reveals, magnetic buttons, parallax |
| **Icons** | Lucide React | Lightweight, consistent iconography |
| **Hosting** | Vercel | CI/CD deployment & DNS management |

---

### Key Features
* **Light / dark theme** — CSS-variable palette toggled from the nav; the whole site transitions smoothly.
* **Motion polish** — typing-effect hero, animated stat counters, scroll-progress bar, magnetic buttons, floating background blobs, and a custom cursor (desktop).
* **Interactive project cards** — on-brand animated preview mockups in a browser frame, with tech badges, metric chips, and one-click GitHub / live-demo links.
* **Animated skill bars** — proficiency meters grouped by domain that fill on scroll.
* **Interactive terminal** — a working mini-shell (`whoami`, `projects`, `skills`, `resume`, …).
* **Working contact form** — validated, with loading / success / error states (see setup below).
* **Fully responsive** — desktop grids collapse to clean mobile stacks.

---

### Components (all in `src/App.jsx`)
The app is intentionally single-file for portability. Key building blocks:

| Component | Purpose |
| :--- | :--- |
| `CustomCursor` | Spring-follow cursor; auto-disables on touch devices. |
| `Blobs` | Ambient animated gradient background. |
| `MagneticButton` | Buttons/links that lean toward the pointer. |
| `CountUp` | Counts a number up when it scrolls into view (used in the stats band). |
| `ProjectPreview` | Renders the themed SVG mockup for each project (`falcon`, `booknook`, `wildfire`). |
| `Terminal` | The interactive mini-shell in the Terminal section. |
| `ContactForm` | The validated footer contact form. |
| `useTheme` / `useTyping` | Hooks for the light/dark toggle and the hero typing effect. |

**Swapping in real project screenshots:** replace `<ProjectPreview kind={p.preview} />` in the Projects card with `<img src={...} alt={p.title} className="w-full aspect-[16/10] object-cover" />`. Everything else in the card stays the same.

---

### Contact form setup (Formspree)
The form works out of the box: until a backend is configured it opens the visitor's mail client with the message pre-filled. To receive submissions in your inbox:

1. Create a free form at **[formspree.io](https://formspree.io)** and copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`).
2. In `src/App.jsx`, set the `FORM_ENDPOINT` constant (near the top) to that URL.
3. Done — the form automatically switches from the mailto fallback to real POST submissions, with success and error states handled.

---

### Getting started
```bash
npm install     # installs deps (includes eslint-plugin-react)
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # eslint
```

---

### Project Structure
```text
src/
├── assets/      # Media (logo, portrait, resume.pdf)
├── App.jsx      # Main logic, layout, and all components
├── index.css    # Tailwind entry
└── main.jsx     # React entry point
```

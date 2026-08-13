# Portfolio + Résumé Review — Through a SWE Intern Recruiter's Eyes

**Candidate:** Kenzy Ibrahim · CS @ George Mason (Class of 2028)
**Reviewed:** live React portfolio (`src/App.jsx`) + résumé PDF (01/29/2026)
**Reviewer lens:** a recruiter / hiring manager screening for a software engineering internship. I spend ~45 seconds on a portfolio before deciding to keep reading.

---

## TL;DR

The design instinct is genuinely good — the editorial cream-and-green brand looks more mature than 90% of student portfolios, and using framer-motion already puts Kenzy ahead. But right now the site **undersells the résumé and, worse, contradicts it in places.** A recruiter who opens both tabs side by side will see two different stories for the same job, and that reads as carelessness on the one artifact you fully control. Fix the content-truth gap first, then add the polish.

The three things costing interviews today:

1. **The site and résumé tell different stories** for Ultatel and OSCAR (details below). This is the single biggest issue.
2. **Every quantified win from the résumé is missing from the site.** "37% attendance increase," "team of 8," "95% reliability," "10,000+ books" — none of it appears on the page. The site is all adjectives; the résumé is all numbers. It should be the reverse.
3. **No proof of code.** GitHub links are buried inside a carousel. For a SWE role, the fastest trust signal is "let me see the repo" — that should be one click from the hero.

---

## What's working (keep it)

- **The brand.** Playfair + Lato, the forest-green/cream palette, the text-stroke hover — this is a real visual identity. Don't throw it away; build on it.
- **Framer-motion is already in the stack.** Scroll reveals and the animated menu show motion sense.
- **Clean component structure.** `SectionHeading`, `SkillPillGroup` — good habits.
- **The projects are legitimately interesting.** A YOLOv8 telecom-inspection system and a survival-analysis wildfire model are *above* the typical "to-do app" student bar. Lead with them harder.

---

## The critical problem: the site contradicts the résumé

A recruiter cross-references. When the two disagree, they trust neither.

**Ultatel — completely different stories:**
- **Résumé:** "Redesigned the site's visual style… 17% engagement improvement… launched 5+ features in JavaScript/TypeScript… reduced deployment errors 30%." (front-end / product work)
- **Site:** "Developed and maintained RESTful APIs and server-side logic using Node.js and Express.js." (back-end work)

These describe two different internships. Pick the true one and make both match. (The résumé version is more specific and quantified — I'd standardize on it.)

**OSCAR — different role framing and dates:**
- **Résumé:** "Website Specialist… Nov 2025… product lifecycle & IA redesign… 25,000+ students… 37% attendance increase."
- **Site:** "Oct 2025… Drupal CMS updates… Undergraduate Research Week countdown."

Not contradictory, but a recruiter notices the date mismatch (Oct vs Nov) and that the impressive "37% / 25,000+" numbers vanished on the site.

**Verizon — the site throws away the best material:**
- Résumé: "Led a cross-functional team of 8… 'Project Falcon'… custom Confidence Gating algorithm… 95% reliability… fault-tolerant pipeline… 40% latency reduction."
- Site: "Engineered and optimized computer vision pipelines using YOLOv8."

The résumé bullet is a *story* (leadership + a named system + a novel technique + hard numbers). The site flattens it into one generic sentence. This is the project a recruiter most wants to ask about in an interview — feature it.

**Fix:** the site content should be sourced from the résumé, keeping every metric. I've done this in the rebuild.

---

## Content gaps on the site (all fixable)

- **Missing entirely:** Certifications (Cornell ML Foundations, CodePath Web Dev), GPA 3.7 / Dean's List, the InternConnect role, and *all* quantified outcomes.
- **Skills are aspirational, not evidenced.** The site lists TensorFlow, Express.js, ShadCN — but the résumé/projects don't clearly back all of them. Recruiters ask about anything on the list. List only what Kenzy can defend in an interview, and ideally tie each skill to where it was used.
- **Only 2 projects shown**, both hidden behind carousel arrows. Carousels bury content — recruiters won't click through. Show all projects at once in a grid.
- **No résumé-to-repo path.** The "Resume" button is good; add prominent GitHub + live-demo links per project and in the hero.
- **The "About" copy is soft.** "My background in digital content creation deeply influences how I approach software engineering" is fine as a differentiator, but lead with the engineering: what has Kenzy actually built and shipped.

---

## What impresses a SWE recruiter (added in the rebuild)

- **Numbers, everywhere.** A small animated stats band up top: GPA, years coding, projects shipped, users impacted. Screens in 3 seconds.
- **Real project cards** with tech-stack badges, "what I built / what it did," and one-click GitHub + live demo — no carousel.
- **A skills section that maps to evidence**, grouped by domain, with the languages/tools actually used in the listed work.
- **Motion that signals front-end skill without being noisy:** scroll-reveal, magnetic buttons, a typing effect in the hero, an animated gradient/grain background, a subtle custom cursor, and a light/dark toggle. These are the "cool features" recruiters read as *this person can build UI.*
- **A tiny interactive terminal easter egg** — memorable, and a nice tell for the technically curious without getting in anyone's way.

---

## Résumé review

The résumé is strong — quantified, well-structured, real projects. A few fixes raise it from good to clean:

**Correctness / grammar:**
- "**Bachelors of Science**" → "**Bachelor of Science**."
- Wildfire project mixes verb forms: "**Utilizing** Random Survival Forests…" (gerund fragment) next to "Leveraged…" (past). Make all bullets start with a past-tense verb: "**Engineered** models using Random Survival Forests and Gradient Boosting Survival Analysis to forecast…"
- Keep every bullet starting with a strong past-tense action verb (Owned, Led, Directed, Built, Designed, Engineered, Reduced, Achieved) — mostly already true; just align the stragglers.

**Consistency:**
- **Date mismatch with the site:** résumé says OSCAR started Nov 2025, site says Oct 2025. Pick one everywhere.
- Dashes: use consistent en dashes in all date ranges (a couple use hyphens).

**Strengthening:**
- The Verizon "Confidence Gating" bullet is excellent — that specificity is exactly right. Do the same elsewhere: name systems and techniques.
- Consider a one-line summary at the top ("CS sophomore building full-stack + ML products; shipped a YOLOv8 vision system and a survival-analysis risk model") so a skimming recruiter gets the thesis instantly.
- Skills list is a touch long; make sure everything on it is interview-defensible.

**Format:** the layout is clean and ATS-friendly already. I've produced a revised, editable version with the fixes above so it's easy to keep current.

---

## Priority order

1. **Fix the site/résumé contradictions** (Ultatel especially). Non-negotiable — done in the rebuild.
2. **Put the numbers on the site.** Done.
3. **Kill the carousel; show projects in a grid with repo links.** Done.
4. **Add the stats band + hero CTA to GitHub.** Done.
5. **Apply the résumé grammar/consistency fixes.** Done (revised file included).
6. Layer in the motion/interactive polish. Done.

Everything marked "done" is in the rebuilt `App.jsx` and the revised résumé that accompany this review.

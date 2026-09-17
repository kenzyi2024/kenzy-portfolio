import React, { useState, useEffect, useRef } from 'react';
import {
  motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion,
} from 'framer-motion';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';

import kenzyImg from './assets/kenzy.jpg';
import logoImg from './assets/kenzyLogo.png';
import resumePdf from './assets/resume.pdf';

/* ============================================================
   DESIGN SYSTEM — editorial monograph
   Typography:  Fraunces (display) · Hanken Grotesk (text) · JetBrains Mono (metadata)
   Surfaces:    warm paper interior, deep forest "cover" moments
   Structure:   hairline rules + an index system, not cards-everywhere
   ============================================================ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    :root, [data-theme='light'] {
      --paper:#EFE7D6; --paper-2:#E7DEC8; --card:#F4EEE1;
      --ink:#222D26; --ink-2:rgba(34,45,38,.66); --ink-3:rgba(34,45,38,.42);
      --line:rgba(34,45,38,.16); --line-2:rgba(34,45,38,.30);
      --accent:#A9743C; --accent-ink:#795225;
      --panel:#222D26; --on-panel:#EFE7D6; --on-panel-2:rgba(239,231,214,.62);
      --panel-line:rgba(239,231,214,.18); --accent-on-panel:#D6AC77;
      --nav-bg:rgba(239,231,214,.70);
      --sel-bg:#222D26; --sel-fg:#EFE7D6;
    }
    [data-theme='dark'] {
      --paper:#191E15; --paper-2:#20261C; --card:#1E241A;
      --ink:#ECE3D1; --ink-2:rgba(236,227,209,.64); --ink-3:rgba(236,227,209,.42);
      --line:rgba(236,227,209,.15); --line-2:rgba(236,227,209,.28);
      --accent:#C99A63; --accent-ink:#D6AC77;
      --panel:#0F130D; --on-panel:#ECE3D1; --on-panel-2:rgba(236,227,209,.60);
      --panel-line:rgba(236,227,209,.14); --accent-on-panel:#D6AC77;
      --nav-bg:rgba(21,25,17,.66);
      --sel-bg:#ECE3D1; --sel-fg:#191E15;
    }

    html { scroll-behavior:smooth; }
    body { font-family:'Hanken Grotesk', system-ui, sans-serif; -webkit-font-smoothing:antialiased; background:var(--paper); }
    * { -webkit-tap-highlight-color:transparent; }

    /* Smooth light/dark crossfade — colors ease between themes everywhere.
       Hover states use transform/opacity/background-size, so they stay snappy. */
    *, *::before, *::after {
      transition: color .5s ease, background-color .5s ease, border-color .5s ease, fill .5s ease;
    }

    /* Typewriter caret */
    .blink { animation:blink 1.1s step-end infinite; }
    @keyframes blink { 50% { opacity:0; } }

    /* Warm animated aurora — sits behind content on the dark panels */
    .aurora { position:absolute; inset:-25% -12%; z-index:0; pointer-events:none;
      background:
        radial-gradient(38% 44% at 78% 26%, rgba(201,154,99,.60), transparent 70%),
        radial-gradient(44% 50% at 88% 82%, rgba(110,140,116,.42), transparent 72%),
        radial-gradient(34% 42% at 24% 88%, rgba(216,176,122,.34), transparent 70%);
      filter:blur(28px); opacity:.85;
      animation:auroraDrift 20s ease-in-out infinite alternate; }
    @keyframes auroraDrift {
      0%   { transform:translate3d(-2%,-1%,0) scale(1); }
      100% { transform:translate3d(3%,2.5%,0) scale(1.14); }
    }

    /* Faint logo watermark filling generous whitespace (decorative) */
    .watermark { position:absolute; pointer-events:none; z-index:0; user-select:none;
      opacity:.05; mix-blend-mode:normal; }
    [data-theme='dark'] .watermark { opacity:.06; }

    /* Subtle interactive nudge on list rows */
    .row-nudge { transition:transform .35s cubic-bezier(.22,.61,.36,1), color .3s ease; }
    .row-nudge:hover { transform:translateX(6px); }

    /* Kinetic marquee (pauses on hover; freezes under reduced-motion) */
    .marquee { display:flex; overflow:hidden; width:100%; user-select:none; -webkit-mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
    .marquee__track { display:flex; flex-shrink:0; align-items:center; white-space:nowrap; animation:marquee 38s linear infinite; }
    .marquee:hover .marquee__track { animation-play-state:paused; }
    @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }

    /* Ghosted display type — used sparingly, in a few well-spaced spots */
    .ghost { position:absolute; z-index:0; pointer-events:none; user-select:none;
      font-family:'Fraunces',serif; line-height:.8; letter-spacing:-.03em; font-weight:400; white-space:nowrap; }

    .font-display { font-family:'Fraunces', Georgia, serif; font-optical-sizing:auto; }
    .font-sans { font-family:'Hanken Grotesk', system-ui, sans-serif; }
    .font-mono { font-family:'JetBrains Mono', ui-monospace, monospace; }

    /* Editorial section index label */
    .eyebrow { font-family:'Hanken Grotesk',sans-serif; font-weight:600; font-size:11px;
      letter-spacing:.28em; text-transform:uppercase; }

    /* Inline text link — underline draws in on hover */
    .u-link { position:relative; display:inline; text-decoration:none;
      background-image:linear-gradient(currentColor,currentColor);
      background-size:0% 1px; background-repeat:no-repeat; background-position:0 100%;
      transition:background-size .4s cubic-bezier(.22,.61,.36,1), color .25s ease; }
    .u-link:hover { background-size:100% 1px; }
    /* Nav / persistent-underline variant retracts on hover */
    .u-link--on { background-size:100% 1px; }
    .u-link--on:hover { background-size:0% 1px; }

    /* Nav links shift to the accent on hover */
    .nav-link { transition:color .25s ease; }
    .nav-link:hover { color:var(--nav-accent) !important; }

    /* Underline-only form field */
    .field { width:100%; background:transparent; border:0; border-bottom:1px solid var(--panel-line);
      color:var(--on-panel); font-size:16px; padding:10px 2px; outline:none;
      transition:border-color .25s ease; font-family:'Hanken Grotesk',sans-serif; }
    .field::placeholder { color:var(--on-panel-2); }
    .field:focus { border-color:var(--accent-on-panel); }

    /* Very subtle paper grain — print texture, not decoration */
    .grain::after {
      content:''; position:fixed; inset:0; z-index:2; pointer-events:none; opacity:.035;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    ::selection { background:var(--sel-bg); color:var(--sel-fg); }
    ::-webkit-scrollbar { width:11px; }
    ::-webkit-scrollbar-track { background:var(--paper-2); }
    ::-webkit-scrollbar-thumb { background:var(--line-2); }

    .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
    .no-scrollbar::-webkit-scrollbar { display:none; }

    a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
      outline:2px solid var(--accent); outline-offset:3px; border-radius:1px;
    }
    .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px;
      overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration:.001ms !important; animation-iteration-count:1 !important;
        transition-duration:.001ms !important; scroll-behavior:auto !important;
      }
    }
  `}</style>
);

/* ============================================================
   DATA  (sourced from the résumé — every metric preserved)
   ============================================================ */
const LINKS = {
  email: 'kenzyi2024@gmail.com',
  github: 'https://github.com/kenzyi2024',
  linkedin: 'https://www.linkedin.com/in/kenzyibrahim',
};

// Contact form: paste a free Formspree form ID (https://formspree.io) to receive
// submissions by email. Until then, the form gracefully falls back to opening the
// visitor's mail client with the message pre-filled — so it works out of the box.
const FORM_ENDPOINT = 'https://formspree.io/f/your_form_id';

const STATS = [
  { value: 3.7, decimals: 1, label: 'GPA · Dean’s List' },
  { value: 25000, suffix: '+', label: 'Users reached' },
  { value: 8, label: 'Engineers led' },
  { value: 5, suffix: '+', label: 'Apps shipped' },
];

const EXPERIENCE = [
  {
    title: 'Website Specialist',
    company: 'George Mason University — OSCAR',
    date: 'Nov 2025 — Present',
    now: true,
    points: [
      'Led the information-architecture redesign of the OSCAR research platform for 25,000+ undergraduates, optimizing navigation and accessibility.',
      'Launched a conversion-optimized landing page that drove a 37% increase in attendance for the Celebration of Student Scholarship expo.',
    ],
    stack: ['Product', 'UI/UX', 'Accessibility'],
  },
  {
    title: 'AI Tech Fellow',
    company: 'Verizon',
    date: 'May 2025 — Dec 2025',
    points: [
      'Led a cross-functional team of 8 through a 15-week lifecycle to ship “Project Falcon,” a YOLOv8 computer-vision system that replaced manual telecom infrastructure inspections.',
      'Designed a custom “Confidence Gating” algorithm that filtered low-quality inference and raised system reliability to 95%.',
      'Architected a fault-tolerant ingestion pipeline with local caching for 2,000+ images, bypassing API rate limits and cutting latency 40%.',
    ],
    stack: ['Python', 'YOLOv8', 'Computer Vision', 'Leadership'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Ultatel',
    date: 'May 2024 — Aug 2024',
    points: [
      'Shipped 5+ new features in JavaScript and TypeScript and redesigned the UI, lifting user engagement 17% and retention 25%.',
      'Reduced production deployment errors 30% through rigorous testing, Agile practice, and disciplined version control.',
    ],
    stack: ['JavaScript', 'TypeScript', 'HTML/CSS', 'Agile'],
  },
  {
    title: 'Web Developer & Digital Marketing Intern',
    company: 'George Mason — InternConnect',
    date: 'Feb 2025 — Jul 2025',
    points: [
      'Built and maintained the InternConnect site, increasing student engagement 35% and improving career-resource accessibility.',
      'Optimized UI/UX and social strategy, driving 80% growth in online interactions.',
    ],
    stack: ['React', 'UI/UX', 'Content'],
  },
];

const PROJECTS = [
  {
    title: 'Project Falcon',
    role: 'AI Tech Fellow · Verizon',
    preview: 'falcon',
    desc: 'A YOLOv8-powered computer-vision system that replaced manual telecom infrastructure inspections. Featured a custom “Confidence Gating” algorithm and a fault-tolerant ingestion pipeline handling 2,000+ images.',
    metrics: ['95% reliability', '40% lower latency', 'Team of 8'],
    tags: ['Python', 'YOLOv8', 'Computer Vision'],
    proprietary: true,
  },
  {
    title: 'BookNook',
    role: 'Full-Stack · REST',
    preview: 'booknook',
    desc: 'A full-stack web app (React, MongoDB, Google Cloud) delivering context-aware text analysis and search over a 10,000+ book catalog via REST APIs, with a state-driven caching layer that cut redundant API calls ~60%.',
    metrics: ['10,000+ books', '~60% fewer API calls'],
    tags: ['React', 'MongoDB', 'Google Cloud'],
    github: 'https://github.com/kenzyi2024/BookNook',
    live: 'https://book-tracker-ivory.vercel.app/',
  },
  {
    title: 'Wildfire Evacuation Threat Predictor',
    role: 'ML Engineer',
    preview: 'wildfire',
    desc: 'A predictive web app that helps emergency managers triage wildfire risk and prioritize evacuations across 12–72 hour horizons using Random Survival Forests and Gradient Boosting Survival Analysis, validated on real WatchDuty data.',
    metrics: ['12–72h horizons', 'C-index + Brier tuned'],
    tags: ['Python', 'Streamlit', 'Scikit-learn'],
    github: 'https://github.com/kenzyi2024/wildfire-evac-app',
    live: 'https://wildfire-evac-app.streamlit.app/',
  },
  {
    title: 'Study Buddy Steve',
    role: 'Full-Stack · AI · Cloud',
    preview: 'studybuddy',
    desc: 'A full-stack study platform (React, Node.js, Python FastAPI microservices) with an AI document-parsing pipeline (OCR + LLMs) that auto-extracts class schedules from uploaded syllabi. Independently scalable services on Vercel + Google Cloud Run with JWT auth and MongoDB Atlas.',
    metrics: ['~90%+ extraction accuracy', 'Microservices'],
    tags: ['React', 'FastAPI', 'Google Cloud Run'],
    github: 'https://github.com/kenzyi2024/StudyBuddySteve',
    live: 'https://study-buddy-steve.vercel.app/',
  },
  {
    title: 'Eye Got You',
    role: 'Mobile · React Native',
    preview: 'eyegotyou',
    desc: 'A cross-platform mobile app (React Native, Expo, TypeScript) that manages complex multi-medication regimens through a clinical rules engine, with on-device camera text recognition (MLKit) and barcode scanning in an accessible, dark-mode-first UI.',
    metrics: ['iOS + Android', 'On-device OCR'],
    tags: ['React Native', 'Expo', 'TypeScript'],
    github: 'https://github.com/kenzyi2024/Eye-got-you',
  },
];

const SKILLS = [
  {
    group: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C / C++', 'HTML / CSS'],
  },
  {
    group: 'Frameworks & Libraries',
    items: ['React.js', 'Node.js', 'Tailwind CSS', 'Scikit-learn', 'Pandas'],
  },
  {
    group: 'ML & Tooling',
    items: ['Computer Vision · YOLOv8', 'Git & GitHub', 'MongoDB', 'REST APIs', 'Figma'],
  },
];

const CERTS = [
  { name: 'Machine Learning Foundations', org: 'Cornell University', date: 'Aug 2025' },
  { name: 'Web Development', org: 'CodePath.org', date: 'Apr 2025' },
];

/* ============================================================
   HOOKS
   ============================================================ */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { const t = localStorage.getItem('theme'); if (t === 'dark' || t === 'light') return t; } catch { /* ignore */ }
    return 'light';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);
  return [theme, () => setTheme(t => (t === 'light' ? 'dark' : 'light'))];
}

// Rotating typewriter effect (restored from the original site)
function useTyping(phrases, { type = 68, del = 38, hold = 1500 } = {}) {
  const reduce = useReducedMotion();
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const full = phrases[i % phrases.length];
    const done = !deleting && text === full;
    const empty = deleting && text === '';
    const delay = done ? hold : empty ? 420 : deleting ? del : type;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) { setDeleting(false); setI(x => x + 1); }
      else setText(full.substring(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, phrases, type, del, hold, reduce]);
  return reduce ? phrases[0] : text;
}

function CountUp({ value, decimals = 0, suffix = '', duration = 1400 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);
  const shown = reduce ? value : val;
  const display = decimals ? shown.toFixed(decimals) : Math.round(shown).toLocaleString();
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ============================================================
   PRIMITIVES
   ============================================================ */
const Container = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-[1160px] px-5 sm:px-8 lg:px-14 ${className}`}>{children}</div>
);

const Reveal = ({ children, className = '', style, as = 'div', y = 22, delay = 0, mount = false }) => {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  if (reduce) return React.createElement(as, { className, style }, children);
  const trigger = mount
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-70px' } };
  return (
    <M
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
      className={className} style={style}
    >{children}</M>
  );
};

const SectionHead = ({ index, label, title, light = false }) => {
  const reduce = useReducedMotion();
  const lineBg = light ? 'var(--panel-line)' : 'var(--line)';
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="font-mono text-xs" style={{ color: light ? 'var(--accent-on-panel)' : 'var(--accent-ink)' }}>{index}</span>
        <span className="eyebrow" style={{ color: light ? 'var(--on-panel-2)' : 'var(--ink-2)' }}>{label}</span>
        {reduce ? (
          <span className="h-px flex-1" style={{ background: lineBg }} />
        ) : (
          <motion.span className="h-px flex-1 origin-left" style={{ background: lineBg }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1], delay: 0.12 }} />
        )}
      </div>
      {title && (
        <h2 className="font-display mt-6 md:mt-7 text-[2.5rem] leading-[1.02] sm:text-6xl md:text-[4.4rem] tracking-[-0.02em]"
          style={{ color: light ? 'var(--on-panel)' : 'var(--ink)', fontWeight: 400 }}>
          {title}
        </h2>
      )}
    </Reveal>
  );
};

// Understated inline text link with a trailing mark
const LinkArrow = ({ href, children, mark = '↗', external = true, className = '', style, onClick }) => (
  <a href={href} onClick={onClick}
    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    className={`u-link inline-flex items-baseline gap-1.5 font-sans text-[15px] ${className}`} style={style}>
    <span>{children}</span>
    {mark && <span aria-hidden="true" className="text-[0.85em]">{mark}</span>}
  </a>
);

// Social platform icon links
const SOCIALS = [
  { label: 'GitHub', href: LINKS.github, Icon: Github, external: true },
  { label: 'LinkedIn', href: LINKS.linkedin, Icon: Linkedin, external: true },
  { label: 'Email', href: `mailto:${LINKS.email}`, Icon: Mail, external: false },
];

const Socials = ({ items = SOCIALS, color, showLabels = false, size = 18, gapClass = 'gap-x-5 gap-y-2', className = '' }) => (
  <div className={`flex flex-wrap items-center ${gapClass} ${className}`}>
    {items.map(({ label, href, Icon, external }) => (
      <a key={label} href={href} aria-label={label}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="inline-flex items-center gap-2 transition-all duration-300 hover:opacity-60 hover:-translate-y-0.5" style={{ color }}>
        <Icon size={size} strokeWidth={1.6} aria-hidden="true" />
        {showLabels && <span className="font-sans text-sm">{label}</span>}
      </a>
    ))}
  </div>
);

// Ghosted display type — used sparingly (a few well-spaced spots, not every section)
const GhostType = ({ children, className = '', color = 'var(--ink)', opacity = 0.05, rotate = 0 }) => (
  <span aria-hidden="true" className={`ghost ${className}`}
    style={{ color, opacity, transform: rotate ? `rotate(${rotate}deg)` : undefined }}>{children}</span>
);

// Kinetic tech marquee — a refined, clearly-bounded band
const MARQUEE_ITEMS = [
  'Full-stack', 'Machine Learning', 'Computer Vision', 'React', 'Python',
  'TypeScript', 'Node.js', 'FastAPI', 'REST APIs', 'MongoDB', 'Google Cloud', 'YOLOv8',
];
const Marquee = () => (
  <section aria-label="Technologies" className="relative overflow-hidden py-9 md:py-12">
    <div className="marquee">
      <div className="marquee__track">
        {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((t, i) => (
          <span key={i} className="inline-flex items-center" aria-hidden="true">
            <span className="font-display italic text-[1.9rem] md:text-[2.6rem] px-6 md:px-9" style={{ color: 'var(--ink-2)', fontWeight: 300 }}>{t}</span>
            <span className="font-display text-[1.9rem] md:text-[2.6rem]" style={{ color: 'var(--accent-ink)', fontWeight: 300 }}>/</span>
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   PROJECT PREVIEW  (hand-built SVG mockups — a real asset, kept
   and re-framed. Swap for a screenshot by replacing the <svg>.)
   ============================================================ */
const Frame = ({ url, children }) => (
  <div className="overflow-hidden" style={{ border: '1px solid var(--line-2)', background: 'var(--panel)' }}>
    <div className="flex items-center gap-1.5 px-3.5 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
      <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,.28)' }} />
      <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,.18)' }} />
      <span className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,.12)' }} />
      <span className="ml-2 flex-1 truncate font-mono text-[10px]" style={{ color: 'var(--on-panel-2)' }}>{url}</span>
    </div>
    <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
  </div>
);

const ProjectPreview = ({ kind }) => {
  if (kind === 'falcon') {
    return (
      <Frame url="verizon · internal — project-falcon">
        <svg viewBox="0 0 320 200" className="w-full h-full" style={{ background: '#0e1310' }} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Computer-vision detection preview">
          <defs>
            <radialGradient id="falconLift" cx="50%" cy="50%" r="62%">
              <stop offset="0%" stopColor="#3a4f44" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3a4f44" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="200" fill="url(#falconLift)" />
          {[...Array(9)].map((_, i) => <line key={'v' + i} x1={i * 40} y1="0" x2={i * 40} y2="200" stroke="#2E4035" strokeWidth="0.5" opacity="0.5" />)}
          {[...Array(6)].map((_, i) => <line key={'h' + i} x1="0" y1={i * 40} x2="320" y2={i * 40} stroke="#2E4035" strokeWidth="0.5" opacity="0.5" />)}
          <g stroke="var(--accent)" strokeWidth="1.5" fill="none">
            <rect x="34" y="46" width="72" height="58" rx="3" />
            <rect x="150" y="70" width="90" height="66" rx="3" />
            <rect x="210" y="30" width="60" height="44" rx="3" />
          </g>
          <g fontFamily="monospace" fontSize="7" fill="var(--accent)">
            <rect x="34" y="38" width="52" height="9" fill="var(--accent)" /><text x="37" y="45" fill="#0e1310">tower 0.97</text>
            <rect x="150" y="62" width="46" height="9" fill="var(--accent)" /><text x="153" y="69" fill="#0e1310">line 0.95</text>
            <rect x="210" y="22" width="44" height="9" fill="var(--accent)" /><text x="213" y="29" fill="#0e1310">node 0.93</text>
          </g>
          <motion.rect x="0" width="320" height="2" fill="var(--accent)" opacity="0.6"
            animate={{ y: [10, 190, 10] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
          <text x="12" y="188" fontFamily="monospace" fontSize="9" fill="#e8f0e8">confidence gating · reliability 95%</text>
        </svg>
      </Frame>
    );
  }
  if (kind === 'booknook') {
    const shelf = [
      ['#C19A6B', 86], ['#2E4035', 72], ['#8A9A8E', 96], ['#B8956A', 64], ['#3c5245', 90],
      ['#F3E5D0', 76], ['#C19A6B', 100], ['#546b5a', 70], ['#B8B8AA', 84],
    ];
    return (
      <Frame url="booknook · reading companion">
        <svg viewBox="0 0 320 200" className="w-full h-full" style={{ background: '#1c2620' }} preserveAspectRatio="xMidYMid slice" role="img" aria-label="BookNook — a cozy shelf with an AI reading companion">
          <defs>
            <radialGradient id="bnGlow" cx="50%" cy="56%" r="60%">
              <stop offset="0%" stopColor="#C19A6B" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#C19A6B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="200" fill="#1c2620" />
          <rect width="320" height="200" fill="url(#bnGlow)" opacity="0.9" />
          {shelf.map(([c, h], i) => {
            const x = 46 + i * 26;
            return (
              <g key={i}>
                <rect x={x} y={150 - h} width="22" height={h} rx="3" fill={c} />
                <rect x={x} y={150 - h} width="22" height="5" rx="2" fill="#fff" opacity="0.12" />
                <rect x={x + 3} y={150 - h + 12} width="16" height="3" rx="1.5" fill="#D8B482" opacity="0.85" />
              </g>
            );
          })}
          <rect x="28" y="163" width="264" height="6" fill="#000" opacity="0.28" />
          <rect x="28" y="150" width="264" height="14" rx="3" fill="#6E5026" />
          <rect x="28" y="150" width="264" height="3" rx="2" fill="#C19A6B" opacity="0.6" />
          <g>
            <rect x="110" y="14" width="100" height="34" rx="10" fill="#F3E5D0" />
            <path d="M150 46 l9 10 l7 -10 Z" fill="#F3E5D0" />
            <path d="M130 24 l2.5 6 l6 2.5 l-6 2.5 l-2.5 6 l-2.5 -6 l-6 -2.5 l6 -2.5 Z" fill="#C19A6B" />
            {/* the one gentle motion: a typing indicator */}
            <motion.circle cx="156" cy="31" r="3" fill="#2E4035"
              animate={{ opacity: [0.2, 1, 1, 1, 0.2, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.12, 0.37, 0.62, 0.75, 1] }} />
            <motion.circle cx="168" cy="31" r="3" fill="#2E4035"
              animate={{ opacity: [0.2, 0.2, 1, 1, 0.2, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.12, 0.37, 0.62, 0.75, 1] }} />
            <motion.circle cx="180" cy="31" r="3" fill="#C19A6B"
              animate={{ opacity: [0.2, 0.2, 0.2, 1, 0.2, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.12, 0.37, 0.62, 0.75, 1] }} />
          </g>
          <text x="160" y="190" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#B8B8AA">recaps · analysis · Socratic seminars</text>
        </svg>
      </Frame>
    );
  }
  if (kind === 'studybuddy') {
    const blink = { scaleY: [1, 1, 0.1, 1, 1] };
    const blinkT = { duration: 3.2, repeat: Infinity, times: [0, 0.92, 0.96, 0.99, 1] };
    return (
      <Frame url="studybuddysteve.app">
        <svg viewBox="0 0 320 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Study Buddy Steve — retro 8-bit study buddy that reads your syllabus">
          <rect width="320" height="200" fill="#1c2620" />
          <defs>
            <radialGradient id="steveLift" cx="50%" cy="52%" r="62%">
              <stop offset="0%" stopColor="#3a4f44" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3a4f44" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="200" fill="url(#steveLift)" />
          {[...Array(25)].map((_, i) => <rect key={i} x="0" y={i * 8} width="320" height="3" fill="#000" opacity="0.08" />)}
          <rect x="7" y="7" width="306" height="186" rx="6" fill="none" stroke="#C19A6B" strokeWidth="2" opacity="0.7" />
          <text x="20" y="52" fontFamily="monospace" fontWeight="700" fontSize="16" fill="#F3E5D0" letterSpacing="1">STOP RETYPING</text>
          <text x="20" y="72" fontFamily="monospace" fontWeight="700" fontSize="16" fill="#D8B482" letterSpacing="1">YOUR SYLLABUS</text>
          <rect x="20" y="150" width="150" height="15" rx="3" fill="#000" opacity="0.4" />
          <rect x="20" y="150" width="150" height="15" rx="3" fill="none" stroke="#C19A6B" strokeWidth="1.5" />
          <motion.rect x="22" y="152" height="11" rx="2" fill="#B8B8AA"
            animate={{ width: [0, 146, 146, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.6, 0.85, 1] }} />
          <text x="20" y="182" fontFamily="monospace" fontSize="8" fill="#D8B482">▸ LOADING SEMESTER.EXE</text>
          <g>
            <rect x="223" y="70" width="3" height="12" fill="#2E4035" /><circle cx="224.5" cy="68" r="3.5" fill="#C19A6B" />
            <rect x="256" y="70" width="3" height="12" fill="#2E4035" /><circle cx="257.5" cy="68" r="3.5" fill="#B8B8AA" />
            <rect x="205" y="82" width="72" height="50" rx="9" fill="#B8B8AA" stroke="#2E4035" strokeWidth="2" />
            <rect x="214" y="92" width="54" height="32" rx="4" fill="#141a16" />
            <motion.rect x="224" y="101" width="9" height="13" rx="2" fill="#D8B482" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} animate={blink} transition={blinkT} />
            <motion.rect x="249" y="101" width="9" height="13" rx="2" fill="#D8B482" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} animate={blink} transition={blinkT} />
            <rect x="200" y="138" width="10" height="24" rx="4" fill="#B8B8AA" stroke="#2E4035" strokeWidth="2" />
            <rect x="272" y="138" width="10" height="24" rx="4" fill="#B8B8AA" stroke="#2E4035" strokeWidth="2" />
            <rect x="214" y="134" width="54" height="40" rx="6" fill="#B8B8AA" stroke="#2E4035" strokeWidth="2" />
            <rect x="214" y="147" width="54" height="5" fill="#C19A6B" />
            <rect x="236" y="145" width="10" height="9" rx="2" fill="#C19A6B" />
            <circle cx="241" cy="165" r="4" fill="#141a16" />
            <rect x="224" y="174" width="12" height="11" rx="3" fill="#2E4035" />
            <rect x="246" y="174" width="12" height="11" rx="3" fill="#2E4035" />
          </g>
        </svg>
      </Frame>
    );
  }
  if (kind === 'eyegotyou') {
    return (
      <Frame url="Eye Got You · iOS & Android">
        <svg viewBox="0 0 320 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Eye Got You — medication reminders, an eye keeping watch over your doses">
          <defs>
            <radialGradient id="egyBg" cx="50%" cy="46%" r="72%">
              <stop offset="0%" stopColor="#3f5449" />
              <stop offset="100%" stopColor="#141a16" />
            </radialGradient>
          </defs>
          <rect width="320" height="200" fill="url(#egyBg)" />
          {[40, 58, 76].map((r, i) => (
            <circle key={i} cx="160" cy="100" r={r} fill="none" stroke="#C19A6B" strokeWidth="1" opacity={0.26 - i * 0.07} />
          ))}
          <path d="M92 100 Q 160 50 228 100 Q 160 150 92 100 Z" fill="#0a1613" stroke="#F3E5D0" strokeWidth="2.5" />
          <circle cx="160" cy="100" r="27" fill="#1c2620" stroke="#C19A6B" strokeWidth="2" />
          <motion.circle cx="160" cy="100" r="27" fill="none" stroke="#D8B482" strokeWidth="2"
            animate={{ r: [27, 32], opacity: [0.85, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }} />
          <circle cx="160" cy="100" fill="#F3E5D0" r="10" />
          <circle cx="160" cy="100" r="6" fill="#0a1613" />
          <circle cx="166" cy="94" r="2.5" fill="#F3E5D0" />
          <rect x="150" y="14" width="20" height="8" rx="2" fill="#C19A6B" />
          <rect x="156" y="20" width="8" height="14" rx="2" fill="#D8B482" />
          <motion.path d="M160 38 c 4.5 6 4.5 9.5 0 12.5 c -4.5 -3 -4.5 -6.5 0 -12.5 Z" fill="#C19A6B"
            animate={{ y: [0, 46, 46], opacity: [1, 1, 0] }} transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.72, 1], ease: 'easeIn' }} />
          <text x="160" y="182" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#B8B8AA" letterSpacing="1">every dose, on time.</text>
        </svg>
      </Frame>
    );
  }
  // wildfire
  return (
    <Frame url="wildfire-evac-app.streamlit.app">
      <svg viewBox="0 0 320 200" className="w-full h-full" style={{ background: '#151B17' }} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Wildfire risk map preview">
        <defs>
          <radialGradient id="risk" cx="62%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#C19A6B" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#C19A6B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2E4035" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <rect width="320" height="200" fill="url(#risk)" />
        {[...Array(7)].map((_, i) => <path key={i} d={`M0 ${30 + i * 26} Q 80 ${18 + i * 26} 160 ${30 + i * 26} T 320 ${30 + i * 26}`} fill="none" stroke="#8A9A8E" strokeWidth="0.6" opacity="0.4" />)}
        {[40, 62, 84].map((r, i) => <circle key={i} cx="198" cy="90" r={r} fill="none" stroke="#C19A6B" strokeWidth="1" opacity={0.5 - i * 0.12} />)}
        <motion.g animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '198px 90px' }}>
          <path d="M198 74 C 206 84, 206 92, 198 100 C 190 92, 190 84, 198 74 Z" fill="#C19A6B" />
        </motion.g>
        <rect x="12" y="12" width="120" height="34" rx="6" fill="#0f1411" opacity="0.7" />
        <text x="22" y="28" fontFamily="monospace" fontSize="8" fill="#e8f0e8">Threat horizon</text>
        <text x="22" y="40" fontFamily="monospace" fontSize="11" fill="#C19A6B">12–72h · high</text>
        <text x="12" y="190" fontFamily="monospace" fontSize="8" fill="#e8f0e8" opacity="0.8">Random Survival Forests · C-index tuned</text>
      </svg>
    </Frame>
  );
};

/* Floating, tilted, scroll-drifting project media (a la Spencer Gabor) */
const ProjectMedia = ({ p, flip }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [46, -46]);
  return (
    <motion.div ref={ref} style={{ y }} className={flip ? 'md:order-2' : ''}>
      <motion.div
        initial={reduce ? undefined : { rotate: flip ? 2.4 : -2.4 }}
        whileInView={reduce ? undefined : { rotate: flip ? 1.5 : -1.5 }}
        whileHover={reduce ? undefined : { rotate: 0, scale: 1.02 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
        className="relative group"
        style={{ boxShadow: '0 34px 70px -34px rgba(0,0,0,.42)' }}>
        <ProjectPreview kind={p.preview} />
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(14,19,15,.55)' }} aria-label={`Open ${p.title} live`}>
            <span className="px-6 py-3 eyebrow inline-flex items-center gap-2"
              style={{ background: 'var(--accent)', color: '#1c130a' }}>Live demo ↗</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   INTERACTIVE TERMINAL  (kept — genuinely functional for a SWE)
   ============================================================ */
const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'out', text: "Hi, I’m Kenzy. Type 'help' to explore." },
  ]);
  const [input, setInput] = useState('');
  const boxRef = useRef(null);
  useEffect(() => { const b = boxRef.current; if (b) b.scrollTop = b.scrollHeight; }, [history]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const push = (lines) => setHistory(h => [...h, { type: 'in', text: raw }, ...lines.map(l => ({ type: 'out', text: l }))]);
    switch (cmd) {
      case 'help':
        push(['available: whoami, skills, projects, education, contact, resume, clear']); break;
      case 'whoami':
        push(['Kenzy Ibrahim — CS @ George Mason (Class of 2028).', 'Full-stack + ML engineer who ships products with taste.']); break;
      case 'skills':
        push(['python  javascript  typescript  react  node  tailwind', 'scikit-learn  pandas  yolov8  git  mongodb  figma']); break;
      case 'projects':
        push(['1. Project Falcon  — YOLOv8 telecom vision (95% reliability)', '2. BookNook        — full-stack library, 10,000+ books', '3. Wildfire Predictor — survival-analysis risk model']); break;
      case 'education':
        push(['George Mason University — B.S. Computer Science', 'GPA 3.7 · Dean’s List · Expected May 2028']); break;
      case 'contact':
        push([`email:    ${LINKS.email}`, 'linkedin: /kenzyibrahim', 'github:   kenzyi2024']); break;
      case 'resume':
        push(['opening resume…']); window.open(resumePdf, '_blank'); break;
      case 'clear':
        setHistory([]); break;
      case '':
        setHistory(h => [...h, { type: 'in', text: '' }]); break;
      default:
        push([`command not found: ${cmd}. try 'help'.`]);
    }
    setInput('');
  };

  return (
    <div className="max-w-3xl overflow-hidden"
      style={{ background: '#0d120f', border: '1px solid var(--line-2)' }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,.26)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,.18)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,.12)' }} />
        <span className="ml-3 font-mono text-xs text-white/45">kenzy@portfolio ~ %</span>
      </div>
      <div ref={boxRef} className="p-5 font-mono text-sm h-72 overflow-y-auto text-[#c8d8c9]"
        role="log" aria-live="polite" aria-label="Terminal output"
        onClick={e => e.currentTarget.querySelector('input')?.focus({ preventScroll: true })}>
        {history.map((h, i) => (
          <div key={i} className="mb-1 break-words">
            {h.type === 'in'
              ? <span><span className="text-[#8fbf95]">$</span> <span className="text-white/90">{h.text}</span></span>
              : <span className="text-[#a9c6ae]">{h.text}</span>}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-[#8fbf95] mr-2">$</span>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); run(input); } }}
            className="flex-1 bg-transparent outline-none text-white/90 caret-[#8fbf95]"
            spellCheck={false} aria-label="terminal input" />
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   CONTACT FORM  (Formspree when configured, mailto fallback)
   ============================================================ */
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const valid = form.name.trim() && emailOk && form.message.trim().length >= 10;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid) {
      setError('Please add your name, a valid email, and a message of at least 10 characters.');
      return;
    }
    setError('');
    const configured = FORM_ENDPOINT && !FORM_ENDPOINT.includes('your_form_id');

    if (!configured) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      return;
    }
    try {
      setStatus('submitting');
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
      else { setStatus('error'); setError('Something went wrong — please email me directly.'); }
    } catch {
      setStatus('error'); setError('Network hiccup — please email me directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-xl">
        <p className="font-display text-3xl md:text-4xl" style={{ color: 'var(--on-panel)' }}>Message on its way.</p>
        <p className="font-sans mt-3" style={{ color: 'var(--on-panel-2)' }}>Thanks for reaching out — I’ll get back to you soon.</p>
        <button onClick={() => setStatus('idle')}
          className="u-link mt-5 eyebrow" style={{ color: 'var(--accent-on-panel)' }}>
          Send another →
        </button>
      </div>
    );
  }

  const labelCls = 'block eyebrow mb-1';
  const described = error ? 'cf-error' : undefined;

  return (
    <form onSubmit={submit} noValidate className="max-w-xl">
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
        <div>
          <label htmlFor="cf-name" className={labelCls} style={{ color: 'var(--on-panel-2)' }}>Name</label>
          <input id="cf-name" name="name" value={form.name} onChange={update} placeholder="Your name"
            required aria-required="true" autoComplete="name" aria-describedby={described} className="field" />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls} style={{ color: 'var(--on-panel-2)' }}>Email</label>
          <input id="cf-email" name="email" type="email" value={form.email} onChange={update} placeholder="you@email.com"
            required aria-required="true" autoComplete="email" aria-describedby={described} className="field" />
        </div>
      </div>
      <label htmlFor="cf-message" className={labelCls} style={{ color: 'var(--on-panel-2)' }}>Message</label>
      <textarea id="cf-message" name="message" value={form.message} onChange={update} rows={3}
        placeholder="What would you like to build together?" required aria-required="true" aria-describedby={described}
        className="field resize-none mb-6" />
      {error && (
        <p id="cf-error" role="alert" className="font-sans text-sm mb-6" style={{ color: '#E9A87A' }}>{error}</p>
      )}
      <button type="submit" disabled={status === 'submitting'}
        className="group inline-flex items-center gap-3 px-7 py-3.5 eyebrow disabled:opacity-60 transition-transform"
        style={{ background: 'var(--accent)', color: '#1c130a' }}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
};

/* ============================================================
   NAVIGATION — editorial masthead
   ============================================================ */
const NAV = [
  ['Work', '#projects'],
  ['Experience', '#experience'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Beyond', '#beyond'],
  ['Contact', '#contact'],
];

const Nav = ({ theme, toggleTheme, onOpenMenu, scrolled, overDark }) => {
  const ink = scrolled ? 'var(--ink)' : (overDark ? 'var(--on-panel)' : 'var(--ink)');
  const faint = scrolled ? 'var(--ink-2)' : (overDark ? 'var(--on-panel-2)' : 'var(--ink-2)');
  const navAccent = scrolled ? 'var(--accent-ink)' : (overDark ? 'var(--accent-on-panel)' : 'var(--accent-ink)');
  const navStyle = scrolled
    ? { background: 'var(--nav-bg)', borderBottom: '1px solid var(--line)', backdropFilter: 'blur(14px) saturate(140%)', WebkitBackdropFilter: 'blur(14px) saturate(140%)', '--nav-accent': navAccent }
    : { background: 'transparent', '--nav-accent': navAccent };
  return (
    <nav className="fixed top-0 inset-x-0 z-[65] transition-all duration-300" style={navStyle}>
      <Container className={`flex items-center justify-between ${scrolled ? 'py-3' : 'py-5'} transition-all duration-300`}>
        <a href="#top" className="group flex items-center" aria-label="Kenzy Ibrahim — back to top">
          <motion.img src={logoImg} alt="Kenzy Ibrahim"
            whileHover={{ rotate: [0, -11, 8, -4, 0], scale: 1.09 }}
            whileTap={{ scale: 0.9, rotate: 360 }}
            transition={{ rotate: { duration: 0.6, ease: 'easeInOut' }, scale: { type: 'spring', stiffness: 300, damping: 14 } }}
            style={{ transformOrigin: 'center' }}
            className={`w-auto object-contain transition-[height] duration-300 ${scrolled ? 'h-8' : 'h-9 md:h-10'}`} />
        </a>

        <div className="flex items-center gap-7">
          <ul className="hidden md:flex items-center gap-7">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="nav-link u-link font-sans text-[13px] font-medium tracking-wide" style={{ color: faint }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={toggleTheme} aria-label="Toggle color theme"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center transition-opacity hover:opacity-60"
            style={{ color: ink }}>
            {theme === 'light' ? <Moon size={17} strokeWidth={1.6} /> : <Sun size={17} strokeWidth={1.6} />}
          </button>
          <button onClick={onOpenMenu} aria-label="Open menu" aria-haspopup="dialog"
            className="md:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center" style={{ color: ink }}>
            <Menu size={22} strokeWidth={1.6} />
          </button>
        </div>
      </Container>
    </nav>
  );
};

const MobileMenu = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <motion.div role="dialog" aria-modal="true" aria-label="Site navigation"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[80] flex flex-col" style={{ background: 'var(--paper)', '--nav-accent': 'var(--accent-ink)' }}>
        <Container className="flex items-center justify-between py-5">
          <img src={logoImg} alt="Kenzy Ibrahim" className="h-9 w-auto object-contain" />
          <button onClick={onClose} aria-label="Close menu"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center" style={{ color: 'var(--ink)' }}>
            <X size={24} strokeWidth={1.4} />
          </button>
        </Container>
        <Container className="flex-1 flex flex-col justify-center">
          <ul>
            {NAV.map(([label, href], i) => (
              <motion.li key={href}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 + i * 0.05 }}
                className="border-t" style={{ borderColor: 'var(--line)' }}>
                <a href={href} onClick={onClose}
                  className="nav-link flex items-baseline gap-4 py-5 font-display text-4xl" style={{ color: 'var(--ink)' }}>
                  <span className="font-mono text-xs" style={{ color: 'var(--accent-ink)' }}>{String(i + 1).padStart(2, '0')}</span>
                  {label}
                </a>
              </motion.li>
            ))}
          </ul>
        </Container>
        <Container className="py-8">
          <Socials showLabels color="var(--ink-2)" size={18} gapClass="gap-x-7 gap-y-3" />
        </Container>
      </motion.div>
    )}
  </AnimatePresence>
);

/* Skills as a toolbox — each type is a compartment that opens to reveal the tools inside */
const Toolbox = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-3xl">
      {SKILLS.map((cat, i) => {
        const isOpen = open === i;
        return (
          <div key={cat.group} className="border-t last:border-b" style={{ borderColor: 'var(--line-2)' }}>
            <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-6 md:py-7 text-left">
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-xs" style={{ color: 'var(--accent-ink)' }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-2xl md:text-3xl tracking-[-0.01em]" style={{ color: 'var(--ink)', fontWeight: 400 }}>{cat.group}</span>
              </span>
              <span className="flex items-center gap-5">
                <span className="hidden sm:inline font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>{cat.items.length} tools</span>
                <span className="relative w-3.5 h-3.5 shrink-0" aria-hidden="true">
                  <span className="absolute top-1/2 left-0 w-3.5 h-px -translate-y-1/2" style={{ background: 'var(--ink)' }} />
                  <motion.span className="absolute top-0 left-1/2 h-3.5 w-px -translate-x-1/2" style={{ background: 'var(--ink)' }}
                    animate={{ opacity: isOpen ? 0 : 1 }} transition={{ duration: 0.25 }} />
                </span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="tools" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }} className="overflow-hidden">
                  <div className="flex flex-wrap gap-2.5 pb-7">
                    {cat.items.map((name, j) => (
                      <motion.span key={name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 + j * 0.05, type: 'spring', stiffness: 260, damping: 18 }}
                        className="px-4 py-2 font-sans text-sm" style={{ color: 'var(--ink)', border: '1px solid var(--line-2)' }}>
                        {name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

/* Experience as a vertical timeline the reader travels down — the accent rail fills as you scroll */
const ExperienceTimeline = () => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 62%', 'end 72%'] });
  return (
    <ol ref={ref} className="relative">
      <div aria-hidden="true" className="absolute left-[6px] top-2 bottom-8 w-px" style={{ background: 'var(--line-2)' }} />
      {!reduce && (
        <motion.div aria-hidden="true" className="absolute left-[6px] top-2 bottom-8 w-px origin-top"
          style={{ background: 'var(--accent)', scaleY: scrollYProgress }} />
      )}
      {EXPERIENCE.map((exp, i) => (
        <Reveal as="li" key={exp.company} delay={i * 0.05} className="relative pl-8 md:pl-12 pb-12 md:pb-16 last:pb-0">
          <span aria-hidden="true" className="absolute left-0 top-1"
            style={{ width: 14, height: 14, borderRadius: '9999px', background: exp.now ? 'var(--accent)' : 'transparent', border: '2px solid var(--accent)' }} />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-mono text-[12px] tracking-wide" style={{ color: 'var(--ink-2)' }}>{exp.date}</span>
            {exp.now && (
              <span className="inline-flex items-center gap-1.5 eyebrow" style={{ color: 'var(--accent-ink)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> Current
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl md:text-[1.9rem] tracking-[-0.01em] mt-2" style={{ color: 'var(--ink)', fontWeight: 400 }}>{exp.title}</h3>
          <p className="font-sans font-semibold text-sm mt-1" style={{ color: 'var(--accent-ink)' }}>{exp.company}</p>
          <ul className="mt-4 space-y-2.5 max-w-2xl">
            {exp.points.map((p, j) => (
              <li key={j} className="font-sans text-[15px] leading-relaxed flex gap-3" style={{ color: 'var(--ink-2)' }}>
                <span aria-hidden="true" style={{ color: 'var(--ink-3)' }}>—</span><span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[11px] tracking-wide" style={{ color: 'var(--ink-3)' }}>{exp.stack.join('  ·  ')}</p>
        </Reveal>
      ))}
    </ol>
  );
};

/* Apple-style scroll-driven canvas — the paper warmth shifts smoothly as you move
   through the page, so sections read as distinct moments yet flow into one another. */
const BG_TONES_LIGHT = ['#EFE7D6', '#E7DAC0', '#F3EDDE', '#E3D7BC', '#EFE7D6'];
const BG_TONES_DARK = ['#191E15', '#20261A', '#12170F', '#222922', '#191E15'];
const InteriorBackground = ({ progress, dark, reduce }) => {
  const tones = dark ? BG_TONES_DARK : BG_TONES_LIGHT;
  const bg = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], tones);
  return (
    <motion.div aria-hidden="true" className="fixed inset-0"
      style={{ backgroundColor: reduce ? tones[0] : bg, zIndex: -1 }} />
  );
};

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const reduce = useReducedMotion();
  const typed = useTyping([
    'Full-stack engineer.', 'ML builder.', 'UI/UX-obsessed.', 'Shipping products with taste.',
  ]);
  const { scrollY, scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const { scrollYProgress: heroProg } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProg, [0, 1], [0, reduce ? 0 : 90]);

  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setOverDark(y < window.innerHeight - 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollY]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <div className="grain relative min-h-screen overflow-x-hidden" style={{ color: 'var(--ink)' }}>
      <GlobalStyles />
      <InteriorBackground key={theme} progress={scrollYProgress} dark={theme === 'dark'} reduce={reduce} />

      <Nav theme={theme} toggleTheme={toggleTheme} onOpenMenu={() => setMenuOpen(true)}
        scrolled={scrolled} overDark={overDark} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── COVER / HERO ─────────────────────────────────── */}
      <header id="top" ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}>
        <div className="aurora" aria-hidden="true" />

        <motion.div style={{ y: heroY }} className="relative z-10 flex-1 flex items-center">
          <Container className="w-full pt-28 pb-16">
            <Reveal mount>
              <div className="flex items-center gap-4">
                <span className="eyebrow" style={{ color: 'var(--accent-on-panel)' }}>Portfolio</span>
                <span className="h-px w-16" style={{ background: 'var(--panel-line)' }} />
                <span className="font-mono text-[11px]" style={{ color: 'var(--on-panel-2)' }}>Selected work &amp; experience</span>
              </div>
            </Reveal>

            <Reveal mount delay={0.05}>
              <h1 className="font-display mt-8 md:mt-10 leading-[0.94] tracking-[-0.03em] text-[3.6rem] sm:text-[5.5rem] md:text-[8rem]"
                style={{ fontWeight: 400 }}>
                <span className="italic font-light">Kenzy</span> Ibrahim
              </h1>
            </Reveal>

            <Reveal mount delay={0.12}>
              <div className="mt-6 md:mt-8 flex items-center h-7">
                <span className="font-mono text-base md:text-lg" style={{ color: 'var(--accent-on-panel)' }}>{typed}</span>
                <span className="blink font-mono text-base md:text-lg" style={{ color: 'var(--accent-on-panel)' }} aria-hidden="true">_</span>
              </div>
              {/* reserved-height slot → the secret note fades in without shifting anything */}
              <div className="mt-2 h-5">
                <AnimatePresence>
                  {theme === 'dark' && (
                    <motion.p key="secret" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="font-mono text-[11px] md:text-xs tracking-wide" style={{ color: 'var(--on-panel-2)' }}>
                      <span aria-hidden="true">☾ </span>psst — after-hours mode. this is where the best builds happen.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal mount delay={0.18}>
              <p className="font-display italic text-xl md:text-2xl mt-7" style={{ color: 'var(--on-panel)', fontWeight: 300 }}>
                Engineering technology for life.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a href={resumePdf} target="_blank" rel="noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 eyebrow"
                  style={{ background: 'var(--accent)', color: '#1c130a' }}>
                  Résumé <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
                <Socials color="var(--on-panel)" size={20} gapClass="gap-x-5" />
                <LinkArrow href="#projects" external={false} mark="↓" style={{ color: 'var(--on-panel-2)' }}>View work</LinkArrow>
              </div>
            </Reveal>
          </Container>
        </motion.div>

        {/* cover footer — an editorial index strip */}
        <div className="relative z-10" style={{ borderTop: '1px solid var(--panel-line)' }}>
          <Container className="py-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
            {['Full-stack Engineer', 'Machine Learning', 'CS · George Mason ’28'].map((t, i) => (
              <span key={t} className="font-mono text-[11px] tracking-wide" style={{ color: i === 0 ? 'var(--on-panel)' : 'var(--on-panel-2)' }}>{t}</span>
            ))}
            <motion.a href="#stats" aria-label="Scroll to content"
              animate={reduce ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
              className="font-mono text-[11px] inline-flex items-center gap-2" style={{ color: 'var(--accent-on-panel)' }}>
              Scroll <span aria-hidden="true">↓</span>
            </motion.a>
          </Container>
        </div>
      </header>

      {/* ── STATS — editorial figures ledger ─────────────── */}
      <section id="stats" className="relative">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8"
            style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="py-10 md:py-16">
                <div className="flex gap-5">
                  <span className="w-px self-stretch shrink-0" style={{ background: 'var(--line-2)' }} />
                  <div>
                    <div className="font-display text-[2.75rem] md:text-6xl leading-none tracking-[-0.02em]" style={{ color: 'var(--ink)', fontWeight: 400 }}>
                      <CountUp value={s.value} decimals={s.decimals || 0} suffix={s.suffix || ''} />
                    </div>
                    <div className="eyebrow mt-3" style={{ color: 'var(--ink-2)' }}>{s.label}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section id="about" className="relative py-20 md:py-32">
        <GhostType color="var(--ink)" opacity={0.05} rotate={-3}
          className="hidden md:block italic text-[8rem] lg:text-[12rem] -left-4 bottom-6">Hello</GhostType>
        <Container className="relative z-10">
          <SectionHead index="01" label="About" />
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
            <Reveal>
              <figure>
                <div className="overflow-hidden rounded-t-[7rem] rounded-b-[1.75rem]"
                  style={{ border: '1px solid var(--line-2)', boxShadow: '0 24px 60px -32px rgba(0,0,0,.45)' }}>
                  <img src={kenzyImg} alt="Kenzy Ibrahim" className="w-full aspect-[4/5] object-cover" />
                </div>
                <figcaption className="font-mono text-[11px] mt-4 flex items-center justify-between px-2" style={{ color: 'var(--ink-3)' }}>
                  <span>Kenzy Ibrahim</span><span>George Mason University</span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="font-display text-2xl md:text-[2rem] leading-[1.3] tracking-[-0.01em]" style={{ color: 'var(--ink)', fontWeight: 400 }}>
                A Computer Science major at George Mason, building full-stack and ML products people actually use.
              </p>
              <div className="mt-7 space-y-5 font-sans text-[15px] md:text-base leading-relaxed max-w-xl" style={{ color: 'var(--ink-2)' }}>
                <p>My roots in digital content and design shape how I engineer: I care about the seam between elegant
                  UI/UX and robust architecture — from a YOLOv8 vision system that led a team of eight at Verizon,
                  to a survival-analysis model forecasting wildfire evacuation risk.</p>
                <p>Off the clock you’ll find me playing volleyball, baking cookies, and reading — usually while thinking
                  about what to build next.</p>
              </div>

              <div className="mt-10">
                <div className="eyebrow mb-1" style={{ color: 'var(--ink-3)' }}>Education &amp; Certifications</div>
                <ul>
                  <li className="flex items-baseline justify-between gap-4 py-4 border-t" style={{ borderColor: 'var(--line)' }}>
                    <div>
                      <div className="font-display text-lg" style={{ color: 'var(--ink)' }}>B.S. Computer Science</div>
                      <div className="font-sans text-sm" style={{ color: 'var(--ink-2)' }}>George Mason University · GPA 3.7, Dean’s List</div>
                    </div>
                    <span className="font-mono text-[11px] whitespace-nowrap" style={{ color: 'var(--ink-3)' }}>May 2028</span>
                  </li>
                  {CERTS.map(c => (
                    <li key={c.name} className="flex items-baseline justify-between gap-4 py-4 border-t" style={{ borderColor: 'var(--line)' }}>
                      <div>
                        <div className="font-display text-lg" style={{ color: 'var(--ink)' }}>{c.name}</div>
                        <div className="font-sans text-sm" style={{ color: 'var(--ink-2)' }}>{c.org}</div>
                      </div>
                      <span className="font-mono text-[11px] whitespace-nowrap" style={{ color: 'var(--ink-3)' }}>{c.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────── */}
      <section id="experience" className="relative py-20 md:py-32">
        <Container className="relative z-10">
          <SectionHead index="02" label="Experience" title="Where I’ve worked" />
          <ExperienceTimeline />
        </Container>
      </section>

      {/* ── WORK ─────────────────────────────────────────── */}
      <section id="projects" className="relative py-20 md:py-32">
        <GhostType color="var(--ink)" opacity={0.05} rotate={-4}
          className="hidden md:block italic text-[8rem] lg:text-[12rem] -right-5 top-16">Craft</GhostType>
        <Container className="relative z-10">
          <SectionHead index="03" label="Selected Work" title="Things I’ve built" />
          <div style={{ borderBottom: '1px solid var(--line)' }}>
            {PROJECTS.map((p, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal as="article" key={p.title}
                  className="grid md:grid-cols-2 gap-8 md:gap-16 items-center py-12 md:py-16"
                  style={{ borderTop: '1px solid var(--line)' }}>
                  <ProjectMedia p={p} flip={flip} />
                  <div className={flip ? 'md:order-1' : ''}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink-3)', fontWeight: 300 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="eyebrow" style={{ color: 'var(--accent-ink)' }}>{p.role}</span>
                    </div>
                    <h3 className="font-display text-3xl md:text-[2.5rem] leading-tight tracking-[-0.02em] mt-3" style={{ color: 'var(--ink)', fontWeight: 400 }}>{p.title}</h3>
                    <p className="font-sans text-[15px] leading-relaxed mt-4 max-w-lg" style={{ color: 'var(--ink-2)' }}>{p.desc}</p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-6">
                      {p.metrics.map((m, mi) => (
                        <React.Fragment key={m}>
                          {mi > 0 && <span aria-hidden="true" style={{ color: 'var(--line-2)' }}>·</span>}
                          <span className="font-sans text-sm font-semibold" style={{ color: 'var(--ink)' }}>{m}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="mt-4 font-mono text-[11px] tracking-wide" style={{ color: 'var(--ink-3)' }}>
                      {p.tags.join('  ·  ')}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">
                      {p.live && <LinkArrow href={p.live} style={{ color: 'var(--ink)' }}>Live demo</LinkArrow>}
                      {p.github && <LinkArrow href={p.github} style={{ color: 'var(--ink)' }}>Source</LinkArrow>}
                      {p.proprietary && (
                        <span className="eyebrow" style={{ color: 'var(--ink-3)' }}>Proprietary · Verizon</span>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── MARQUEE — professional × personal ────────────── */}
      <Marquee />

      {/* ── SKILLS ───────────────────────────────────────── */}
      <section id="skills" className="relative py-20 md:py-32">
        <Container className="relative z-10">
          <SectionHead index="04" label="Capabilities" title="The toolbox" />
          <p className="font-sans text-[15px] mb-8 max-w-md" style={{ color: 'var(--ink-2)' }}>
            Open a drawer to see what’s inside.
          </p>
          <Reveal><Toolbox /></Reveal>
        </Container>
      </section>

      {/* ── TERMINAL ─────────────────────────────────────── */}
      <section id="terminal" className="relative py-20 md:py-32">
        <Container className="relative z-10">
          <SectionHead index="05" label="Interactive" title="Poke around" />
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
            <Terminal />
            <div className="max-w-xs">
              <p className="font-sans text-[15px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                Prefer a command line? This one is real — type a command and it responds.
              </p>
              <p className="mt-4 font-mono text-[12px]" style={{ color: 'var(--ink-3)' }}>
                try: whoami · projects · skills · contact
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── BEYOND THE WORK — the person behind the commits ─ */}
      <section id="beyond" className="relative py-20 md:py-32">
        <Container className="relative z-10">
          <SectionHead index="06" label="Beyond the work" title="Off the clock" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20 items-start">
            <Reveal>
              <p className="font-display text-2xl md:text-[2rem] leading-[1.3] tracking-[-0.01em]" style={{ color: 'var(--ink)', fontWeight: 400 }}>
                There&apos;s a person behind the commits.
              </p>
              <div className="mt-7 space-y-5 font-sans text-[15px] md:text-base leading-relaxed max-w-xl" style={{ color: 'var(--ink-2)' }}>
                <p>My roots are in digital content and design, which is why I care as much about how something
                  feels as whether it works — that instinct follows me from the first wireframe to the last commit.</p>
                <p>Away from the keyboard you&apos;ll find me on the volleyball court, over-engineering a batch of
                  cookies, or lost in a good book — usually while quietly plotting the next thing to build.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="eyebrow mb-1" style={{ color: 'var(--ink-3)' }}>A few things I love</div>
              <ul>
                {[
                  ['Volleyball', 'weekends'],
                  ['Baking', 'cookies'],
                  ['Reading', 'fiction'],
                  ['Design', 'attention to detail'],
                ].map(([k, v]) => (
                  <li key={k} className="row-nudge flex items-baseline justify-between gap-4 py-4 border-t" style={{ borderColor: 'var(--line)' }}>
                    <span className="font-display text-lg" style={{ color: 'var(--ink)' }}>{k}</span>
                    <span className="font-mono text-[11px] whitespace-nowrap" style={{ color: 'var(--ink-3)' }}>{v}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── CONTACT / BACK COVER ─────────────────────────── */}
      <footer id="contact" className="relative overflow-hidden pt-20 md:pt-32 pb-10" style={{ background: 'var(--panel)', color: 'var(--on-panel)' }}>
        <div className="aurora" aria-hidden="true" style={{ opacity: 0.7 }} />
        <GhostType color="var(--on-panel)" opacity={0.06} rotate={-3}
          className="hidden md:block italic text-[9rem] lg:text-[15rem] -left-3 bottom-6">Kenzy</GhostType>
        <Container className="relative z-10">
          <SectionHead index="07" label="Contact" light />
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20">
            <div>
              <Reveal>
                <h2 className="font-display leading-[0.95] tracking-[-0.02em] text-[3rem] md:text-[4.5rem]" style={{ color: 'var(--on-panel)', fontWeight: 400 }}>
                  Let’s build <span className="italic font-light">something.</span>
                </h2>
                <p className="font-sans mt-5 max-w-md" style={{ color: 'var(--on-panel-2)' }}>
                  Open to software engineering internships. The inbox is always on.
                </p>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-10 space-y-6">
                  <a href={`mailto:${LINKS.email}`} className="u-link inline-flex items-center gap-3 font-display text-2xl md:text-3xl" style={{ color: 'var(--on-panel)' }}>
                    <Mail size={22} strokeWidth={1.6} aria-hidden="true" className="opacity-70" />
                    {LINKS.email}
                  </a>
                  <Socials showLabels items={SOCIALS.filter(s => s.label !== 'Email')} color="var(--on-panel-2)" size={18} gapClass="gap-x-8 gap-y-3" />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="lg:pt-4">
              <ContactForm />
            </Reveal>
          </div>

          <div className="mt-20 md:mt-28 pt-7 flex flex-wrap items-center justify-between gap-4"
            style={{ borderTop: '1px solid var(--panel-line)' }}>
            <span className="font-mono text-[11px]" style={{ color: 'var(--on-panel-2)' }}>© 2026 Kenzy Ibrahim</span>
            <Socials color="var(--on-panel-2)" size={16} gapClass="gap-x-5" />
            <a href="#top" className="u-link font-mono text-[11px] inline-flex items-center gap-2" style={{ color: 'var(--accent-on-panel)' }}>
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
}

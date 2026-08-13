import React, { useState, useEffect, useRef } from 'react';
import {
  motion, AnimatePresence, useInView, useMotionValue, useSpring, useScroll, useTransform
} from 'framer-motion';
import {
  Menu, X, Github, Linkedin, Mail, ArrowUpRight, ArrowDown, Sun, Moon,
  Flame, ScanEye, BookOpen, Terminal as TerminalIcon, ExternalLink, Sparkles,
  Award, Cpu, Code2, Braces, Send, Loader2, CheckCircle2, AlertCircle
} from 'lucide-react';

import kenzyImg from './assets/kenzy.jpg';
import logoImg from './assets/kenzyLogo.png';
import resumePdf from './assets/resume.pdf';

/* ============================================================
   THEME + GLOBAL STYLES
   ============================================================ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Lato:wght@300;400;700;900&family=JetBrains+Mono:wght@400;600&display=swap');

    :root, [data-theme='light'] {
      --bg:#F3E5D0; --bg-alt:#F9F4EB; --ink:#2E4035; --accent:#C19A6B; --accent2:#B8B8AA;
      --panel:#2E4035; --on-panel:#F3E5D0; --card:#FBF6EE; --line:rgba(46,64,53,.18);
      --ink-70:rgba(46,64,53,.72);
    }
    [data-theme='dark'] {
      --bg:#151B17; --bg-alt:#1B221D; --ink:#EFE6D6; --accent:#D3AB78; --accent2:#8A9A8E;
      --panel:#0F1411; --on-panel:#EFE6D6; --card:#1F2621; --line:rgba(239,230,214,.16);
      --ink-70:rgba(239,230,214,.72);
    }

    .font-serif { font-family:'Playfair Display', serif; }
    .font-sans { font-family:'Lato', sans-serif; }
    .font-mono { font-family:'JetBrains Mono', monospace; }

    html { scroll-behavior:smooth; }
    * { -webkit-tap-highlight-color:transparent; }

    .text-stroke {
      -webkit-text-stroke:1px var(--ink); color:transparent; transition:all .3s ease;
    }
    .text-stroke:hover { -webkit-text-stroke:0; color:var(--ink); }
    .text-stroke-light {
      -webkit-text-stroke:1px var(--on-panel); color:transparent; transition:all .3s ease;
    }
    .text-stroke-light:hover { -webkit-text-stroke:0; color:var(--on-panel); }

    .grain::before {
      content:''; position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.05;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .blink { animation:blink 1s step-end infinite; }
    @keyframes blink { 50% { opacity:0; } }

    @media (hover:hover) and (pointer:fine) { .hide-native-cursor, .hide-native-cursor * { cursor:none; } }

    ::selection { background:var(--ink); color:var(--bg); }
    ::-webkit-scrollbar { width:10px; }
    ::-webkit-scrollbar-track { background:var(--bg-alt); }
    ::-webkit-scrollbar-thumb { background:var(--accent); border-radius:20px; }
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
      'Led a cross-functional team of 8 through a 15-week lifecycle to ship "Project Falcon," a YOLOv8 computer-vision system that replaced manual telecom infrastructure inspections.',
      'Designed a custom "Confidence Gating" algorithm that filtered low-quality inference and raised system reliability to 95%.',
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
    icon: ScanEye,
    preview: 'falcon',
    desc: 'A YOLOv8-powered computer-vision system that replaced manual telecom infrastructure inspections. Featured a custom "Confidence Gating" algorithm and a fault-tolerant ingestion pipeline handling 2,000+ images.',
    metrics: ['95% reliability', '40% lower latency', 'Team of 8'],
    tags: ['Python', 'YOLOv8', 'Computer Vision'],
    proprietary: true,
  },
  {
    title: 'BookNook',
    role: 'Full-Stack Engineer',
    icon: BookOpen,
    preview: 'booknook',
    desc: 'A full-stack personal library that powers context-aware text analysis, guided Socratic seminars, and Smart Recaps across a catalog of 10,000+ books from the BookLib API. Built with a state-driven cache to eliminate redundant calls.',
    metrics: ['10,000+ books', 'State-driven cache'],
    tags: ['React', 'MongoDB', 'Google Cloud'],
    github: 'https://github.com/kenzyi2024/Book-Tracker',
    live: 'https://book-tracker-ivory.vercel.app/',
  },
  {
    title: 'Wildfire Evacuation Threat Predictor',
    role: 'ML Engineer',
    icon: Flame,
    preview: 'wildfire',
    desc: 'A predictive web app that helps emergency managers triage wildfire risk and prioritize evacuations across 12–72 hour horizons using Random Survival Forests and Gradient Boosting Survival Analysis, validated on real WatchDuty data.',
    metrics: ['12–72h horizons', 'C-index + Brier tuned'],
    tags: ['Python', 'Streamlit', 'Scikit-learn'],
    github: 'https://github.com/kenzyi2024/wildfire-evac-app',
    live: 'https://wildfire-evac-app.streamlit.app/',
  },
];

const SKILLS = [
  {
    group: 'Languages', icon: Code2,
    items: [
      { name: 'Python', level: 90 }, { name: 'JavaScript', level: 88 },
      { name: 'TypeScript', level: 80 }, { name: 'Java', level: 78 },
      { name: 'C / C++', level: 70 }, { name: 'HTML/CSS', level: 92 },
    ],
  },
  {
    group: 'Frameworks & Libraries', icon: Braces,
    items: [
      { name: 'React.js', level: 88 }, { name: 'Node.js', level: 78 },
      { name: 'Tailwind CSS', level: 90 }, { name: 'Scikit-learn', level: 75 },
      { name: 'Pandas', level: 78 },
    ],
  },
  {
    group: 'ML & Tools', icon: Cpu,
    items: [
      { name: 'Computer Vision / YOLOv8', level: 76 }, { name: 'Git & GitHub', level: 88 },
      { name: 'MongoDB', level: 74 }, { name: 'REST APIs', level: 82 },
      { name: 'Figma', level: 80 },
    ],
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
  const [theme, setTheme] = useState('light');
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  return [theme, () => setTheme(t => (t === 'light' ? 'dark' : 'light'))];
}

function useTyping(phrases, { type = 70, del = 40, hold = 1400 } = {}) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const full = phrases[i % phrases.length];
    const done = !deleting && text === full;
    const empty = deleting && text === '';
    const delay = done ? hold : empty ? 400 : deleting ? del : type;
    const t = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) { setDeleting(false); setI(x => x + 1); }
      else setText(full.substring(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, phrases, type, del, hold]);
  return text;
}

function CountUp({ value, decimals = 0, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  const display = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const CustomCursor = () => {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const dx = useSpring(x, { stiffness: 120, damping: 18 });
  const dy = useSpring(y, { stiffness: 120, damping: 18 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    const move = e => { x.set(e.clientX); y.set(e.clientY); };
    const over = e => setHover(!!e.target.closest('a,button,[data-cursor]'));
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    document.body.classList.add('hide-native-cursor');
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.body.classList.remove('hide-native-cursor');
    };
  }, [x, y]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches) return null;
  return (
    <>
      <motion.div className="fixed z-[100] pointer-events-none rounded-full mix-blend-difference"
        style={{ left: sx, top: sy, x: '-50%', y: '-50%', width: 8, height: 8, background: '#fff' }} />
      <motion.div className="fixed z-[100] pointer-events-none rounded-full border mix-blend-difference"
        style={{
          left: dx, top: dy, x: '-50%', y: '-50%', borderColor: '#fff',
          width: hover ? 56 : 34, height: hover ? 56 : 34,
        }}
        animate={{ opacity: hover ? 1 : 0.6 }} transition={{ duration: 0.2 }} />
    </>
  );
};

/* ============================================================
   ANIMATED BACKGROUND
   ============================================================ */
const Blobs = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <motion.div className="absolute w-[42rem] h-[42rem] rounded-full blur-3xl"
      style={{ background: 'var(--accent)', opacity: 0.12, top: '-8rem', left: '-8rem' }}
      animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.div className="absolute w-[36rem] h-[36rem] rounded-full blur-3xl"
      style={{ background: 'var(--accent2)', opacity: 0.12, bottom: '-6rem', right: '-6rem' }}
      animate={{ x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
  </div>
);

/* ============================================================
   SHARED
   ============================================================ */
const Heading = ({ children, light, align = 'text-center', kicker }) => (
  <div className={`mb-14 ${align}`}>
    {kicker && (
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
        style={{ color: 'var(--accent)' }}>{kicker}</motion.p>
    )}
    <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`font-serif font-bold text-4xl md:text-6xl ${light ? 'text-[var(--on-panel)]' : 'text-[var(--ink)]'}`}>
      {children}
    </motion.h2>
  </div>
);

const MagneticButton = ({ children, className = '', ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const move = e => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.a ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ x: sx, y: sy }}
      className={className} {...props}>{children}</motion.a>
  );
};

/* ============================================================
   PROJECT PREVIEW  (on-brand SVG mockups — swap for real
   screenshots by dropping an <img> in place of <ProjectPreview/>)
   ============================================================ */
const BrowserFrame = ({ url, children }) => (
  <div className="rounded-t-2xl overflow-hidden">
    <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: 'var(--panel)' }}>
      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
      <span className="ml-2 flex-1 truncate rounded-md px-2 py-0.5 font-mono text-[9px] text-white/50"
        style={{ background: 'rgba(255,255,255,.08)' }}>{url}</span>
    </div>
    <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
  </div>
);

const ProjectPreview = ({ kind }) => {
  if (kind === 'falcon') {
    return (
      <BrowserFrame url="verizon · internal — project-falcon">
        <svg viewBox="0 0 320 200" className="w-full h-full" style={{ background: '#0e1310' }} preserveAspectRatio="xMidYMid slice">
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
      </BrowserFrame>
    );
  }
  if (kind === 'booknook') {
    const spines = [['#2E4035', 78], ['#C19A6B', 96], ['#8A9A8E', 66], ['#3c5245', 88], ['#B8956A', 72], ['#546b5a', 92], ['#C19A6B', 60], ['#2E4035', 84], ['#9AA79B', 76]];
    return (
      <BrowserFrame url="book-tracker-ivory.vercel.app">
        <svg viewBox="0 0 320 200" className="w-full h-full" style={{ background: '#F9F4EB' }} preserveAspectRatio="xMidYMid slice">
          <rect x="16" y="16" width="200" height="16" rx="8" fill="#fff" stroke="#2E4035" strokeOpacity="0.15" />
          <circle cx="26" cy="24" r="3.5" fill="none" stroke="#C19A6B" strokeWidth="1.5" /><line x1="28.5" y1="26.5" x2="31" y2="29" stroke="#C19A6B" strokeWidth="1.5" />
          <text x="40" y="27" fontFamily="monospace" fontSize="8" fill="#2E4035" opacity="0.5">search 10,000+ books…</text>
          <rect x="228" y="16" width="76" height="16" rx="8" fill="#2E4035" /><text x="243" y="27" fontFamily="monospace" fontSize="8" fill="#F9F4EB">+ recap</text>
          {spines.map(([c, h], i) => (
            <g key={i}>
              <rect x={20 + i * 33} y={168 - h} width="26" height={h} rx="2" fill={c} />
              <rect x={20 + i * 33} y={168 - h + 6} width="26" height="3" fill="#000" opacity="0.12" />
              <rect x={20 + i * 33} y={162} width="26" height="4" fill="#000" opacity="0.15" />
            </g>
          ))}
          <line x1="16" y1="168" x2="304" y2="168" stroke="#2E4035" strokeOpacity="0.25" strokeWidth="1.5" />
          <text x="16" y="190" fontFamily="monospace" fontSize="8" fill="#2E4035" opacity="0.6">Socratic seminar · Smart Recaps · React + MongoDB</text>
        </svg>
      </BrowserFrame>
    );
  }
  // wildfire
  return (
    <BrowserFrame url="wildfire-evac-app.streamlit.app">
      <svg viewBox="0 0 320 200" className="w-full h-full" style={{ background: '#151B17' }} preserveAspectRatio="xMidYMid slice">
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
        <motion.g animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ transformOrigin: '198px 90px' }}>
          <path d="M198 74 C 206 84, 206 92, 198 100 C 190 92, 190 84, 198 74 Z" fill="#C19A6B" />
        </motion.g>
        <rect x="12" y="12" width="120" height="34" rx="6" fill="#0f1411" opacity="0.7" />
        <text x="22" y="28" fontFamily="monospace" fontSize="8" fill="#e8f0e8">Threat horizon</text>
        <text x="22" y="40" fontFamily="monospace" fontSize="11" fill="#C19A6B">12–72h · high</text>
        <text x="12" y="190" fontFamily="monospace" fontSize="8" fill="#e8f0e8" opacity="0.8">Random Survival Forests · C-index tuned</text>
      </svg>
    </BrowserFrame>
  );
};

/* ============================================================
   INTERACTIVE TERMINAL
   ============================================================ */
const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'out', text: "Hi, I’m Kenzy. Type 'help' to explore." },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

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
    <div data-cursor className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border"
      style={{ background: '#0d120f', borderColor: 'var(--line)' }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#151b16' }}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-white/50">kenzy@portfolio ~ %</span>
      </div>
      <div className="p-5 font-mono text-sm h-72 overflow-y-auto text-[#c8e6c9]"
        onClick={e => e.currentTarget.querySelector('input')?.focus()}>
        {history.map((h, i) => (
          <div key={i} className="mb-1 break-words">
            {h.type === 'in'
              ? <span><span className="text-[#7fd18a]">$</span> <span className="text-white/90">{h.text}</span></span>
              : <span className="text-[#a9d6b0]">{h.text}</span>}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-[#7fd18a] mr-2">$</span>
          <input autoFocus value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && run(input)}
            className="flex-1 bg-transparent outline-none text-white/90 caret-[#7fd18a]"
            spellCheck={false} aria-label="terminal input" />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
};

/* ============================================================
   CONTACT FORM  (Formspree when configured, mailto fallback)
   ============================================================ */
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
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
      // Zero-config fallback: open the visitor's mail client, pre-filled.
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

  const field = 'w-full rounded-xl px-4 py-3 font-sans text-sm outline-none transition-colors';
  const fieldStyle = {
    background: 'rgba(255,255,255,.06)', color: 'var(--on-panel)',
    border: '1px solid rgba(255,255,255,.16)',
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto rounded-2xl p-10 text-center border"
        style={{ background: 'rgba(255,255,255,.05)', borderColor: 'rgba(255,255,255,.16)' }}>
        <CheckCircle2 size={44} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
        <h3 className="font-serif text-3xl text-[var(--on-panel)] mb-2">Message on its way.</h3>
        <p className="font-sans text-[var(--on-panel)]/60 mb-6">Thanks for reaching out — I&apos;ll get back to you soon.</p>
        <button onClick={() => setStatus('idle')}
          className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
          Send another →
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} data-cursor className="w-full max-w-xl mx-auto text-left">
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input name="name" value={form.name} onChange={update} placeholder="Your name"
          className={field} style={fieldStyle} aria-label="Your name" />
        <input name="email" type="email" value={form.email} onChange={update} placeholder="you@email.com"
          className={field} style={fieldStyle} aria-label="Your email" />
      </div>
      <textarea name="message" value={form.message} onChange={update} rows={4} placeholder="What would you like to build together?"
        className={`${field} resize-none mb-4`} style={fieldStyle} aria-label="Your message" />
      {error && (
        <p className="flex items-center gap-2 font-sans text-sm mb-4" style={{ color: '#e8a87c' }}>
          <AlertCircle size={16} /> {error}
        </p>
      )}
      <button type="submit" disabled={status === 'submitting'}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full font-sans font-bold text-xs tracking-widest uppercase inline-flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 hover:scale-[1.02] transition-transform"
        style={{ background: 'var(--accent)', color: '#1c130a' }}>
        {status === 'submitting'
          ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
          : <>Send message <Send size={16} /></>}
      </button>
    </form>
  );
};

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const typed = useTyping([
    'Full-stack engineer.', 'ML builder.', 'UI/UX-obsessed.', 'Shipping products with taste.',
  ]);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  const menuItems = [
    ['About', '#about'], ['Experience', '#experience'], ['Projects', '#projects'],
    ['Skills', '#skills'], ['Terminal', '#terminal'], ['Contact', '#contact'],
  ];

  return (
    <div className="grain relative min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{ background: 'var(--bg)', color: 'var(--ink)' }}>
      <GlobalStyles />
      <CustomCursor />
      <Blobs />

      {/* scroll progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 z-[70] origin-left"
        style={{ scaleX: scrollYProgress, background: 'var(--accent)' }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[65] px-6 md:px-10 py-5 flex justify-between items-center">
        <a href="#top" className="font-serif text-xl md:text-2xl font-bold mix-blend-difference text-white">KI.</a>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme"
            className="p-2.5 rounded-full border hover:scale-110 transition-transform mix-blend-difference text-white"
            style={{ borderColor: 'rgba(255,255,255,.4)' }}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu"
            className="p-2.5 rounded-full mix-blend-difference text-white hover:scale-110 transition-transform">
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] flex flex-col p-6 md:p-10" style={{ background: 'var(--panel)' }}>
            <div className="flex justify-end">
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu"
                className="text-[var(--on-panel)] hover:rotate-90 transition-transform duration-300">
                <X size={44} strokeWidth={1} />
              </button>
            </div>
            <div className="flex-grow flex flex-col justify-center items-start pl-2 md:pl-20 gap-2 md:gap-4">
              {menuItems.map(([label, href], i) => (
                <motion.a key={label} href={href} onClick={() => setMenuOpen(false)}
                  initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="font-serif text-5xl md:text-8xl text-stroke-light hover:pl-6 md:hover:pl-12 transition-all duration-300">
                  {label}
                </motion.a>
              ))}
            </div>
            <div className="flex gap-6 pl-2 md:pl-20 font-mono text-xs tracking-widest text-[var(--on-panel)]/60">
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">GITHUB</a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">LINKEDIN</a>
              <a href={`mailto:${LINKS.email}`} className="hover:text-[var(--accent)]">EMAIL</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <header id="top" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-10"
        style={{ background: 'var(--panel)' }}>
        <motion.div style={{ y: heroY }} className="z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}
            className="w-44 md:w-60 mb-6">
            <img src={logoImg} alt="Kenzy Ibrahim" className="w-full h-auto object-contain" />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="font-mono text-[var(--on-panel)]/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            Kenzy Ibrahim · CS @ George Mason &apos;28
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="font-serif text-5xl md:text-8xl lg:text-9xl text-[var(--on-panel)] leading-[0.95] mb-6">
            <span className="italic">Engineering</span><br />technology for life.
          </motion.h1>
          <div className="h-8 mb-10">
            <span className="font-mono text-base md:text-xl text-[var(--accent)]">{typed}</span>
            <span className="blink text-[var(--accent)] font-mono text-base md:text-xl">_</span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton href={resumePdf} target="_blank" rel="noreferrer"
              className="px-8 py-3.5 rounded-full font-sans font-bold text-xs tracking-widest uppercase inline-flex items-center gap-2 shadow-lg"
              style={{ background: 'var(--accent)', color: '#1c130a' }}>
              Résumé <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton href={LINKS.github} target="_blank" rel="noreferrer"
              className="px-8 py-3.5 rounded-full font-sans font-bold text-xs tracking-widest uppercase inline-flex items-center gap-2 border"
              style={{ borderColor: 'var(--on-panel)', color: 'var(--on-panel)' }}>
              <Github size={16} /> GitHub
            </MagneticButton>
          </div>
        </motion.div>
        <motion.a href="#stats" aria-label="Scroll down"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute bottom-8 text-[var(--on-panel)]/50 hover:text-[var(--accent)]">
          <ArrowDown size={26} />
        </motion.a>
      </header>

      {/* STATS */}
      <section id="stats" className="relative z-10 py-16 md:py-20 px-6" style={{ background: 'var(--bg-alt)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="font-serif font-bold text-4xl md:text-6xl" style={{ color: 'var(--ink)' }}>
                <CountUp value={s.value} decimals={s.decimals || 0} suffix={s.suffix || ''} />
              </div>
              <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase mt-2" style={{ color: 'var(--accent)' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-24 px-6 md:px-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} className="lg:col-span-2">
            <div className="aspect-[3/4] rounded-t-[8rem] rounded-b-3xl overflow-hidden shadow-2xl group border-8"
              style={{ borderColor: 'var(--card)' }}>
              <img src={kenzyImg} alt="Kenzy Ibrahim" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
          <div className="lg:col-span-3">
            <Heading align="text-left" kicker="/ about">Full-stack, with an eye for design.</Heading>
            <div className="space-y-5 font-sans text-lg leading-relaxed" style={{ color: 'var(--ink-70)' }}>
              <p>I&apos;m a Computer Science major at George Mason University (Class of 2028, GPA 3.7, Dean&apos;s List). I build full-stack and ML products — from a YOLOv8 vision system that led a team of 8 at Verizon, to a survival-analysis model that forecasts wildfire evacuation risk.</p>
              <p>My roots in digital content and design shape how I engineer: I care about the seam between elegant UI/UX and robust architecture, and I like shipping things people actually use.</p>
              <p>Off the clock you&apos;ll find me playing volleyball, baking cookies, and reading — usually while thinking about what to build next.</p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              {CERTS.map(c => (
                <div key={c.name} className="flex items-center gap-2 px-4 py-2.5 rounded-full border font-mono text-xs"
                  style={{ borderColor: 'var(--line)', color: 'var(--ink-70)' }}>
                  <Award size={14} style={{ color: 'var(--accent)' }} />
                  {c.name} · {c.org}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative z-10 py-24 px-6 md:px-20" style={{ background: 'var(--bg-alt)' }}>
        <Heading kicker="/ experience">Where I&apos;ve worked</Heading>
        <div className="max-w-4xl mx-auto">
          <ol className="relative border-l-2 ml-2" style={{ borderColor: 'var(--line)' }}>
            {EXPERIENCE.map((exp, i) => (
              <motion.li key={exp.company} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="mb-14 ml-8">
                <motion.span whileInView={{ scale: [0, 1.3, 1] }} viewport={{ once: true }}
                  className="absolute flex w-4 h-4 rounded-full -left-[9px] ring-4"
                  style={{ background: 'var(--accent)', ['--tw-ring-color']: 'var(--bg-alt)' }} />
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold" style={{ color: 'var(--ink)' }}>{exp.title}</h3>
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{exp.date}</span>
                </div>
                <p className="font-sans font-bold tracking-wide mb-3" style={{ color: 'var(--ink-70)' }}>{exp.company}</p>
                <ul className="space-y-2 mb-4">
                  {exp.points.map((p, j) => (
                    <li key={j} className="font-sans leading-relaxed flex gap-3" style={{ color: 'var(--ink-70)' }}>
                      <span style={{ color: 'var(--accent)' }}>▹</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase border"
                      style={{ borderColor: 'var(--line)', color: 'var(--ink-70)' }}>{s}</span>
                  ))}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative z-10 py-24 px-6 md:px-20" style={{ background: 'var(--panel)' }}>
        <Heading light kicker="/ projects">Things I&apos;ve built</Heading>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }} data-cursor
              className="group rounded-3xl overflow-hidden flex flex-col shadow-xl border"
              style={{ background: 'var(--card)', borderColor: 'var(--line)' }}>
              <div className="relative">
                <ProjectPreview kind={p.preview} />
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(14,19,15,.55)' }} aria-label={`Open ${p.title} live`}>
                    <span className="px-5 py-2.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase inline-flex items-center gap-2"
                      style={{ background: 'var(--accent)', color: '#1c130a' }}>Live demo <ExternalLink size={14} /></span>
                  </a>
                )}
              </div>
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-serif font-bold text-2xl" style={{ color: 'var(--ink)' }}>{p.title}</h3>
                  <div className="flex gap-2 shrink-0 pt-1">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub repo"
                        className="p-2 rounded-full border hover:scale-110 transition-transform"
                        style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}><Github size={16} /></a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" aria-label="Live demo"
                        className="p-2 rounded-full border hover:scale-110 transition-transform"
                        style={{ borderColor: 'var(--line)', color: 'var(--ink)' }}><ExternalLink size={16} /></a>
                    )}
                    {p.proprietary && (
                      <span className="px-3 py-1.5 rounded-full font-mono text-[9px] tracking-wider uppercase self-center"
                        style={{ background: 'var(--bg)', color: 'var(--ink-70)' }}>Proprietary</span>
                    )}
                  </div>
                </div>
                <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>{p.role}</p>
                <p className="font-sans text-sm leading-relaxed mb-5 flex-grow" style={{ color: 'var(--ink-70)' }}>{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.metrics.map(m => (
                    <span key={m} className="px-3 py-1 rounded-full font-sans text-xs font-bold"
                      style={{ background: 'var(--accent)', color: '#1c130a' }}>{m}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
                  {p.tags.map(t => (
                    <span key={t} className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'var(--ink-70)' }}>#{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative z-10 py-24 px-6 md:px-20" style={{ background: 'var(--bg)' }}>
        <Heading kicker="/ skills">The toolkit</Heading>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {SKILLS.map((cat, ci) => (
            <motion.div key={cat.group} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: ci * 0.1 }}
              className="rounded-3xl p-7 border" style={{ background: 'var(--bg-alt)', borderColor: 'var(--line)' }}>
              <div className="flex items-center gap-3 mb-6">
                {React.createElement(cat.icon, { size: 20, style: { color: 'var(--accent)' } })}
                <h3 className="font-sans font-bold tracking-widest uppercase text-sm" style={{ color: 'var(--ink)' }}>{cat.group}</h3>
              </div>
              <div className="space-y-4">
                {cat.items.map((s, si) => (
                  <div key={s.name}>
                    <div className="flex justify-between font-mono text-xs mb-1.5" style={{ color: 'var(--ink-70)' }}>
                      <span>{s.name}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 + si * 0.08, ease: 'easeOut' }}
                        className="h-full rounded-full" style={{ background: 'var(--accent)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TERMINAL */}
      <section id="terminal" className="relative z-10 py-24 px-6" style={{ background: 'var(--bg-alt)' }}>
        <Heading kicker="/ interactive">
          <span className="inline-flex items-center gap-3"><TerminalIcon size={38} style={{ color: 'var(--accent)' }} /> Poke around</span>
        </Heading>
        <Terminal />
        <p className="text-center font-mono text-xs mt-6" style={{ color: 'var(--ink-70)' }}>
          try: whoami · projects · skills · contact
        </p>
      </section>

      {/* CONTACT */}
      <footer id="contact" className="relative z-10 pt-24 pb-12 px-6 flex flex-col items-center text-center overflow-hidden"
        style={{ background: 'var(--panel)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] md:w-[60rem] opacity-[0.04] pointer-events-none">
          <img src={logoImg} alt="" className="w-full h-auto object-contain" />
        </div>
        <div className="relative z-10 flex flex-col items-center w-full">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--accent)' }}>/ contact</motion.p>
          <h2 className="font-serif text-5xl md:text-8xl text-[var(--on-panel)] mb-4">Let&apos;s build something.</h2>
          <p className="font-sans text-[var(--on-panel)]/60 max-w-md mb-10">Open to software engineering internships. The inbox is always on.</p>

          <div className="w-full mb-10"><ContactForm /></div>

          <div className="flex items-center gap-4 w-full max-w-xl mx-auto mb-8">
            <span className="flex-1 h-px" style={{ background: 'rgba(255,255,255,.14)' }} />
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--on-panel)]/40">or find me at</span>
            <span className="flex-1 h-px" style={{ background: 'rgba(255,255,255,.14)' }} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <MagneticButton href={`mailto:${LINKS.email}`}
              className="px-8 py-4 rounded-full inline-flex items-center gap-3 font-sans text-sm shadow-lg"
              style={{ background: 'var(--accent)', color: '#1c130a' }}>
              <Mail size={18} /> {LINKS.email}
            </MagneticButton>
            <MagneticButton href={LINKS.linkedin} target="_blank" rel="noreferrer"
              className="px-8 py-4 rounded-full border inline-flex items-center gap-3 font-sans text-sm text-[var(--on-panel)]"
              style={{ borderColor: 'var(--accent)' }}>
              <Linkedin size={18} /> /kenzyibrahim
            </MagneticButton>
            <MagneticButton href={LINKS.github} target="_blank" rel="noreferrer"
              className="px-8 py-4 rounded-full border inline-flex items-center gap-3 font-sans text-sm text-[var(--on-panel)]"
              style={{ borderColor: 'var(--accent)' }}>
              <Github size={18} /> kenzyi2024
            </MagneticButton>
          </div>
          <div className="w-full max-w-2xl flex flex-col sm:flex-row justify-between items-center gap-3 text-[var(--on-panel)]/40 text-xs font-mono tracking-widest uppercase border-t pt-8"
            style={{ borderColor: 'rgba(255,255,255,.1)' }}>
            <span>© 2026 Kenzy Ibrahim</span>
            <span className="inline-flex items-center gap-2"><Sparkles size={12} /> Built with React + Framer Motion</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

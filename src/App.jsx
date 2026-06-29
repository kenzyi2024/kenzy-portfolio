import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Github, Linkedin, Mail, Code2, Cpu, ScanEye, ChevronLeft, ChevronRight, Flame, ShieldAlert, BookOpen
} from 'lucide-react';

import kenzyImg from './assets/kenzy.jpg';
import logoImg from './assets/kenzyLogo.png';
import resumePdf from './assets/resume.pdf';

// --- Styles & Fonts ---
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&display=swap');
    .font-serif { font-family: 'Playfair Display', serif; }
    .font-sans { font-family: 'Lato', sans-serif; }
    .text-stroke {
      -webkit-text-stroke: 1px #2E4035;
      color: transparent;
      transition: all 0.3s ease;
    }
    .text-stroke:hover {
      -webkit-text-stroke: 0px;
      color: #2E4035;
    }
  `}</style>
);

// --- Shared Components ---
const SectionHeading = ({ children, color = "text-[#2E4035]", align = "text-center" }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`font-sans font-bold text-4xl md:text-5xl tracking-[0.15em] uppercase mb-16 ${align} ${color}`}
  >
    {children}
  </motion.h2>
);

const SkillPillGroup = ({ category, skills }) => (
  <div className="mb-8">
    <h3 className="font-sans font-bold tracking-[0.2em] text-[#C19A6B] uppercase mb-4 text-center md:text-left">{category}</h3>
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {skills.map((skill, idx) => (
        <span key={idx} className="px-4 py-2 rounded-full border border-[#2E4035]/20 bg-[#F9F4EB] text-[#2E4035] text-xs font-bold tracking-wider hover:bg-[#2E4035] hover:text-[#F9F4EB] transition-colors cursor-default">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

// --- Main Application ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { title: 'ABOUT', href: '#about' },
    { title: 'EXPERIENCE', href: '#experience' },
    { title: 'PROJECTS', href: '#projects' },
    { title: 'SKILLS', href: '#skills' },
    { title: 'CONTACT', href: '#contact' }
  ];

  const experiences = [
    {
      id: "exp-website-specialist",
      title: "Website Specialist",
      company: "Undergraduate Research Office",
      date: "Oct 2025 – Present",
      description: "Managing front-end maintenance and UI/UX design updates. Led the digital campaign for Undergraduate Research Week, designing a multi-day social media countdown and deploying critical Drupal CMS updates for the poster expo."
    },
    {
      id: "exp-verizon",
      title: "AI Tech Fellow",
      company: "Verizon",
      date: "May 2025 – Dec 2025",
      description: "Engineered and optimized computer vision pipelines utilizing YOLOv8 and Python to automate infrastructure inspection, improving defect detection rates for telecom assets."
    },
    {
      id: "exp-ultatel",
      title: "Software Engineering Intern",
      company: "Ultatel",
      date: "May 2024 – Aug 2024",
      description: "Developed and maintained RESTful APIs and server-side logic using Node.js and Express.js, contributing to the core cloud communications platform."
    }
  ];

  const projects = [
    {
      title: "BookNook",
      role: "Personal Library App",
      tags: ["Web App", "UI/UX", "Tracking"],
      desc: "A digital library management tool to track reading progress, manage personal book collections, and promote literary analysis.",
      icon: BookOpen,
      githubUrl: "https://github.com/kenzyi2024/Book-Tracker",
      liveUrl: "https://book-tracker-ivory.vercel.app/"
    }, 
    {
      title: "Wildfire Evac App",
      role: "Machine Learning Web App",
      tags: ["Python", "Scikit-learn", "Web App"],
      desc: "A predictive routing application utilizing machine learning to analyze evacuation thresholds and help users find safe paths away from active wildfire zones.",
      icon: Flame,
      githubUrl: "https://github.com/kenzyi2024/wildfire-evac-app",
      liveUrl: "https://wildfire-evac-app.streamlit.app/"
    }
  ];

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div className="bg-[#F3E5D0] min-h-screen selection:bg-[#2E4035] selection:text-[#F3E5D0] overflow-x-hidden">
      <Styles />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto"></div>
        <button 
          onClick={toggleMenu}
          className="pointer-events-auto text-[#F3E5D0] mix-blend-difference hover:scale-110 transition-transform cursor-pointer"
        >
          <Menu size={32} />
        </button>
      </nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#F3E5D0] z-[60] flex flex-col p-6 md:p-10"
          >
            <div className="flex justify-end">
              <button onClick={toggleMenu} className="text-[#2E4035] hover:rotate-90 transition-transform duration-300">
                <X size={48} strokeWidth={1} />
              </button>
            </div>
            <div className="flex-grow flex flex-col justify-center items-start pl-4 md:pl-20 space-y-4 md:space-y-8">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  onClick={toggleMenu}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="font-sans font-thin text-5xl md:text-8xl tracking-widest uppercase text-stroke hover:pl-10 cursor-pointer"
                >
                  {item.title}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative min-h-screen bg-[#2E4035] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F3E5D0] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C19A6B] opacity-5 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <div className="w-56 md:w-72 mb-8 mx-auto">
            <img src={logoImg} alt="Kenzy Ibrahim Logo" className="w-full h-auto object-contain" />
          </div>
          <h2 className="font-sans text-[#F3E5D0] text-sm md:text-lg tracking-[0.3em] uppercase mb-4">Welcome to</h2>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl text-[#F3E5D0] mb-6 leading-tight">
            <span className="italic block md:inline mr-4">Kenzy</span>
            <span className="block md:inline">Ibrahim's</span>
          </h1>
          
          {/* The strong UVP text */}
          <p className="font-sans text-[#F3E5D0]/80 text-sm md:text-base tracking-[0.4em] uppercase mb-12">
            Engineering Technology for Daily Life
          </p>

          {/* The reinstated CTA Button */}
          <motion.a 
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 bg-[#B8B8AA] text-[#2E4035] rounded-full font-sans font-bold text-xs tracking-widest uppercase hover:bg-[#F3E5D0] transition-colors shadow-lg inline-block"
          >
            Resume
          </motion.a>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="bg-[#F3E5D0] pt-24 pb-12 px-6 md:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
          
          {/* Cinematic Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
             <div className="aspect-[3/4] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden bg-[#B8B8AA] shadow-2xl relative group border-8 border-[#F9F4EB]">
                <img 
                  src={kenzyImg} 
                  alt="Cinematic Portrait of Kenzy" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
             </div>
          </motion.div>

          {/* Bio Text */}
          <div className="text-[#2E4035] relative">
            <SectionHeading align="text-left">About Me</SectionHeading>
            
            <div className="space-y-6 font-sans text-lg text-[#2E4035]/80 mb-12 leading-relaxed relative z-10">
              <p>
                I am a Computer Science major (Class of May 2028) at George Mason University. 
              </p>
              <p>
                My background in digital content creation deeply influences how I approach software engineering. I specialize in full-stack development, leveraging my eye for design to bridge the gap between elegant UI/UX and robust backend architecture. 
              </p>
              <p>
                When I am not coding, you can find me playing volleyball or baking cookies. I am an avid reader and a dedicated enthusiast of technology that fundamentally improves our daily lives.
              </p>
            </div>

            <div className="flex gap-6 relative z-10">
              <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-[#2E4035] text-[#F3E5D0] rounded-full font-sans font-bold text-xs tracking-widest uppercase hover:bg-[#C19A6B] transition-colors shadow-lg">
                View Resume
              </a>
            </div>

            
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="py-24 px-6 md:px-20 bg-[#F9F4EB]">
        <SectionHeading>Professional Experience</SectionHeading>
        
        <div className="max-w-4xl mx-auto">
          <ol className="relative border-l-2 border-[#C19A6B]/50 ml-4 md:ml-0">                  
            {experiences.map((exp, index) => (
              <motion.li 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="mb-12 ml-8"
              >
                <span className="absolute flex items-center justify-center w-4 h-4 bg-[#C19A6B] rounded-full -left-[9px] ring-4 ring-[#F9F4EB]"></span>
                <h3 className="flex items-center mb-1 text-2xl font-serif font-bold text-[#2E4035]">{exp.title}</h3>
                <span className="block mb-2 font-sans text-sm font-bold tracking-widest uppercase text-[#C19A6B]">{exp.company} | {exp.date}</span>
                <p className="mb-4 text-base font-normal text-[#2E4035]/70 font-sans leading-relaxed">{exp.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-[#2E4035] relative">
        <div className="px-6 md:px-20">
            <SectionHeading color="text-[#F3E5D0]">Selected Projects</SectionHeading>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 md:px-20 relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-8 z-10">
            <button onClick={prevProject} className="p-3 rounded-full bg-[#C19A6B] text-white hover:scale-110 transition-transform"><ChevronLeft size={24} /></button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-8 z-10">
            <button onClick={nextProject} className="p-3 rounded-full bg-[#C19A6B] text-white hover:scale-110 transition-transform"><ChevronRight size={24} /></button>
          </div>

          <div className="overflow-hidden min-h-[500px] md:min-h-[400px]">
            <AnimatePresence mode='wait'>
              <motion.div 
                key={currentProject}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#F3E5D0] p-8 md:p-12 rounded-[3rem] shadow-xl flex flex-col md:flex-row gap-8 items-center h-full"
              >
                <div className="w-full md:w-1/3 flex justify-center items-center bg-[#F9F4EB] rounded-[2rem] aspect-square shadow-inner">
                   {React.createElement(projects[currentProject].icon, { size: 80, className: "text-[#2E4035]" })}
                </div>

                <div className="w-full md:w-2/3 text-left flex flex-col justify-center">
                   <h3 className="font-serif text-3xl md:text-5xl text-[#2E4035] mb-2 font-bold">{projects[currentProject].title}</h3>
                   <p className="font-sans text-[#C19A6B] tracking-widest uppercase text-xs md:text-sm font-bold mb-6">{projects[currentProject].role}</p>
                   <p className="font-sans text-[#2E4035]/80 text-lg mb-8 leading-relaxed">{projects[currentProject].desc}</p>
                   
                   <div className="flex flex-wrap gap-3 mb-8">
                      {projects[currentProject].tags.map((tag, i) => (
                        <span key={i} className="px-4 py-2 rounded-full border border-[#2E4035]/20 bg-white/50 text-[#2E4035] text-xs font-bold uppercase tracking-wider">{tag}</span>
                      ))}
                   </div>

                   <div className="flex gap-4 mt-auto">
                    {projects[currentProject].githubUrl && (
                      <a href={projects[currentProject].githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-[#2E4035] hover:bg-[#2E4035] hover:text-[#F3E5D0] transition-colors"><Github size={24} /></a>
                    )}
                    {projects[currentProject].liveUrl && (
                      <a href={projects[currentProject].liveUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full bg-[#C19A6B] text-white font-sans text-xs font-bold tracking-widest hover:bg-[#A68256] transition-colors uppercase inline-flex items-center justify-center">View App</a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

{/* Skills Matrix Section */}
      <section id="skills" className="py-24 px-6 md:px-20 bg-[#F9F4EB]">
        <SectionHeading>Technical Skills</SectionHeading>
        {/* Changed max-w-5xl to max-w-7xl and md:grid-cols-2 to lg:grid-cols-3 */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <SkillPillGroup 
            category="Front-End & UI/UX"
            skills={["HTML/CSS", "JavaScript (ES6+)", "React.js", "Tailwind CSS", "Figma", "ShadCN/UI", "Responsive Design"]}
          />
          <SkillPillGroup 
            category="Back-End & Systems"
            skills={["Node.js", "Express.js", "Java", "RESTful APIs", "Git/GitHub", "Linux/Bash"]}
          />
          <SkillPillGroup 
            category="AI & Machine Learning"
            skills={["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "YOLOv8", "Computer Vision"]}
          />
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-[#2E4035] pt-24 pb-12 flex flex-col items-center text-center px-6 relative overflow-hidden">
          
          {/* The Logo Watermark - Centered in Footer */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] md:w-[70rem] opacity-[0.05] pointer-events-none mix-blend-multiply">
            <img src={logoImg} alt="Logo Watermark" className="w-full h-auto object-contain" />
          </div>

          {/* Content Wrapper (Ensures text stays on top of the watermark) */}
          <div className="relative z-10 flex flex-col items-center w-full">
            <p className="font-serif italic text-[#F3E5D0]/60 mb-4 text-xl">Get in touch</p>
            <h2 className="font-sans font-thin text-5xl md:text-7xl text-[#F3E5D0] mb-12 tracking-widest text-stroke uppercase">Contact Me</h2>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-20">
              <a href="mailto:kenzyi2024@gmail.com" className="px-8 py-4 rounded-full border border-[#C19A6B] text-[#F3E5D0] flex items-center gap-3 hover:bg-[#C19A6B] transition-all bg-[#2E4035]/40 backdrop-blur-sm">
                <Mail size={20} />
                <span className="font-sans tracking-wide text-sm">kenzyi2024@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/kenzyibrahim" className="px-8 py-4 rounded-full border border-[#C19A6B] text-[#F3E5D0] flex items-center gap-3 hover:bg-[#C19A6B] transition-all bg-[#2E4035]/40 backdrop-blur-sm">
                <Linkedin size={20} />
                <span className="font-sans tracking-wide text-sm">/kenzyibrahim</span>
              </a>
            </div>

            <div className="w-full max-w-2xl flex justify-center text-[#F3E5D0]/40 text-xs font-sans tracking-widest uppercase border-t border-[#F3E5D0]/10 pt-8 mt-12">
              <span>© 2026 Kenzy Ibrahim</span>
            </div>         
            </div>
      </footer>
    </div>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  BrainCircuit, 
  Server,
  Instagram,
  Youtube,
  ScanEye,
  Palette,
  ChevronLeft,
  ChevronRight,
  Ticket
} from 'lucide-react';

import kenzyImg from './assets/kenzy.jpg';
import logoImg from './assets/kenzyLogo.jpg';

// --- Styles & Fonts ---
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&display=swap');

    .font-serif { font-family: 'Playfair Display', serif; }
    .font-sans { font-family: 'Lato', sans-serif; }

    /* Custom utility for the hollow text effect in the menu */
    .text-stroke {
      -webkit-text-stroke: 1px #2E4035;
      color: transparent;
      transition: all 0.3s ease;
    }
    
    .text-stroke:hover {
      -webkit-text-stroke: 0px;
      color: #2E4035;
    }
    
    /* Hide scrollbar for cleaner look if needed */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
);

// --- Components ---

const ExperienceCard = ({ items, category }) => (
  <div className="bg-[#F9F4EB] p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
    <div className="flex-grow">
      <ul className="space-y-3 mb-6">
        {items.map((item, idx) => (
          <li key={idx} className="font-sans text-[#2E4035] text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#2E4035] rounded-full"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-auto pt-4 border-t border-[#2E4035]/10 text-center">
      <h3 className="font-sans font-bold tracking-[0.2em] text-[#C19A6B] uppercase">{category}</h3>
    </div>
  </div>
);

const SectionHeading = ({ children, color = "text-[#2E4035]" }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`font-sans font-bold text-4xl md:text-5xl tracking-[0.15em] uppercase text-center mb-16 ${color}`}
  >
    {children}
  </motion.h2>
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
    { title: 'CONTACT', href: '#contact' }
  ];

  const projects = [
    {
      title: "Project Falcon",
      role: "Verizon AI Tech Fellow",
      tags: ["Python", "YOLOv8", "Computer Vision"],
      desc: "Automated bird detection system for telecom towers to prevent ecological damage and infrastructure downtime.",
      icon: ScanEye
    },
    {
      title: "GMU Ticket Exchange",
      role: "Full Stack Web App",
      tags: ["React", "Full Stack", "Web App"],
      desc: "A secure, student-verified marketplace for buying and selling campus event tickets, eliminating scalping.",
      icon: Ticket
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="bg-[#F3E5D0] min-h-screen selection:bg-[#2E4035] selection:text-[#F3E5D0] overflow-x-hidden">
      <Styles />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          {/* Logo placeholder */}
        </div>
        <button 
          onClick={toggleMenu}
          className="pointer-events-auto text-[#F3E5D0] mix-blend-difference hover:scale-110 transition-transform cursor-pointer"
        >
          <Menu size={32} />
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
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
        {/* Decorative Circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F3E5D0] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C19A6B] opacity-5 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >

        {/* --- HERO LOGO REPLACEMENT --- */}
          <div className="w-56 md:w-72 mb-8 mx-auto">
            <img 
              src={logoImg} 
              alt="Kenzy Ibrahim Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
          
          <h2 className="font-sans text-[#F3E5D0] text-sm md:text-lg tracking-[0.3em] uppercase mb-4">Welcome to</h2>
          
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl text-[#F3E5D0] mb-6 leading-tight">
            <span className="italic block md:inline mr-4">Kenzy</span>
            <span className="block md:inline">Ibrahim's</span>
          </h1>
          
          <p className="font-sans text-[#F3E5D0]/80 text-sm md:text-base tracking-[0.4em] uppercase mb-12">
            Portfolio
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 bg-[#B8B8AA] text-[#2E4035] rounded-full font-sans font-bold text-xs tracking-widest uppercase hover:bg-[#F3E5D0] transition-colors shadow-lg"
          >
            Resume
          </motion.button>
        </motion.div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-[#F3E5D0] relative">
        <div className="px-6 md:px-20">
            <SectionHeading>Projects</SectionHeading>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 md:px-20 relative">
          
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-8 z-10">
            <button onClick={prevProject} className="p-3 rounded-full bg-[#2E4035] text-[#F3E5D0] hover:scale-110 transition-transform">
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-8 z-10">
            <button onClick={nextProject} className="p-3 rounded-full bg-[#2E4035] text-[#F3E5D0] hover:scale-110 transition-transform">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Carousel Card */}
          <div className="overflow-hidden min-h-[500px] md:min-h-[400px]">
            <AnimatePresence mode='wait'>
              <motion.div 
                key={currentProject}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-[#F9F4EB] p-8 md:p-12 rounded-[3rem] shadow-xl border-2 border-[#2E4035]/10 flex flex-col md:flex-row gap-8 items-center h-full"
              >
                {/* Visual Side */}
                <div className="w-full md:w-1/3 flex justify-center items-center bg-[#F3E5D0] rounded-[2rem] aspect-square shadow-inner">
                   {React.createElement(projects[currentProject].icon, { size: 80, className: "text-[#2E4035]" })}
                </div>

                {/* Content Side */}
                <div className="w-full md:w-2/3 text-left flex flex-col justify-center">
                   <h3 className="font-serif text-3xl md:text-5xl text-[#2E4035] mb-2 font-bold">{projects[currentProject].title}</h3>
                   <p className="font-sans text-[#C19A6B] tracking-widest uppercase text-xs md:text-sm font-bold mb-6">{projects[currentProject].role}</p>
                   
                   <p className="font-sans text-[#2E4035]/80 text-lg mb-8 leading-relaxed">
                     {projects[currentProject].desc}
                   </p>
                   
                   <div className="flex flex-wrap gap-3 mb-8">
                      {projects[currentProject].tags.map((tag, i) => (
                        <span key={i} className="px-4 py-2 rounded-full border border-[#2E4035]/20 bg-white/50 text-[#2E4035] text-xs font-bold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                   </div>

                   <div className="flex gap-4 mt-auto">
                    <button className="p-3 rounded-full border border-[#2E4035] hover:bg-[#2E4035] hover:text-[#F3E5D0] transition-colors">
                      <Github size={24} />
                    </button>
                    <button className="px-8 py-3 rounded-full bg-[#C19A6B] text-white font-sans text-xs font-bold tracking-widest hover:bg-[#A68256] transition-colors uppercase">
                      View Project
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 gap-3">
            {projects.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentProject === index 
                    ? "w-8 h-2 bg-[#C19A6B]" 
                    : "w-2 h-2 bg-[#C19A6B]/30 hover:bg-[#C19A6B]/60"
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 md:px-20 bg-[#9CA99C]">
        <SectionHeading color="text-[#2E4035]">Experience</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <ExperienceCard 
            category="Front-End"
            items={[
              "HTML & CSS Mastery",
              "JavaScript (ES6+)",
              "React.js Component Architecture",
              "Tailwind CSS Styling",
              "Responsive Design Principles",
              "UI/UX Implementation (Figma)",
              "ShadCN/UI Library"
            ]}
          />
          <ExperienceCard 
            category="AI / ML"
            items={[
              "Python Programming",
              "Pandas & NumPy",
              "Matplotlib & Seaborn",
              "Scikit-learn",
              "Keras / TensorFlow",
              "YOLOv8 Computer Vision",
              "Verizon AI Tech Fellow"
            ]}
          />
          <ExperienceCard 
            category="Back-End"
            items={[
              "Python Scripting",
              "Java (Object Oriented)",
              "Node.js Runtime",
              "Express.js Framework",
              "RESTful API Development",
              "Server-side Logic",
              "Git / GitHub Version Control",
              "Ultatel Internship"
            ]}
          />
        </div>
      </section>

      {/* About & Footer Section */}
      <section id="about" className="bg-[#2E4035] pt-24 pb-12 px-6 md:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
             <div className="aspect-[3/4] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden bg-[#B8B8AA] relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2E4035]/80 z-10"></div>
                <img 
                  src={kenzyImg} 
                  alt="Portrait of Kenzy" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
             </div>
          </motion.div>

          {/* Bio Text */}
          <div className="text-[#F3E5D0]">
            <motion.h2 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="font-serif text-6xl md:text-8xl mb-6 leading-none"
            >
              Kenzy<br />Ibrahim
            </motion.h2>
            
            <p className="font-sans text-sm tracking-[0.2em] mb-8 text-[#C19A6B]">A LITTLE BIT ABOUT ME :)</p>
            
            <div className="space-y-4 font-sans text-lg font-light text-[#F3E5D0]/80 mb-12">
              <p>Computer Science Student at George Mason University</p>
              <p>Volleyball enthusiatest</p>
              <p>Creative Coordinator at MSA</p>
              <p>Passionate about bridging design and code to create seamless user experiences.</p>
            </div>

            <div className="mb-8">
               <p className="font-sans text-sm tracking-[0.2em] mb-6 text-[#C19A6B] uppercase">Connect with me on...</p>
               <div className="flex gap-6">
                 <a href="#" className="hover:text-[#C19A6B] transition-colors"><Github size={32} /></a>
                 <a href="#" className="hover:text-[#C19A6B] transition-colors"><Linkedin size={32} /></a>
                 <a href="#" className="hover:text-[#C19A6B] transition-colors"><Youtube size={32} /></a>
                 <a href="#" className="hover:text-[#C19A6B] transition-colors"><Instagram size={32} /></a>
               </div>
            </div>
            
                     {/* --- FOOTER LOGO REPLACEMENT --- */}
             <div className="w-80 h-80 ml-auto">
                 <img 
                   src={logoImg} 
                   alt="Kenzy Ibrahim Logo" 
                   className="w-full h-auto object-contain opacity-80"
                 />
             </div>
          </div>
        </div>


        {/* Contact Footer Area */}
        <div id="contact" className="border-t border-[#F3E5D0]/10 pt-16 flex flex-col items-center text-center">
            <p className="font-serif italic text-[#F3E5D0]/60 mb-4 text-xl">Get in touch</p>
            <h2 className="font-sans font-thin text-5xl md:text-7xl text-[#F3E5D0] mb-12 tracking-widest text-stroke uppercase">
              Contact Me
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-20">
              <a href="mailto:kenzy2024@gmail.com" className="px-8 py-4 rounded-full border border-[#C19A6B] text-[#F3E5D0] flex items-center gap-3 hover:bg-[#C19A6B] transition-all">
                <Mail size={20} />
                <span className="font-sans tracking-wide text-sm">kenzy2024@gmail.com</span>
              </a>
              <a href="#" className="px-8 py-4 rounded-full border border-[#C19A6B] text-[#F3E5D0] flex items-center gap-3 hover:bg-[#C19A6B] transition-all">
                <Linkedin size={20} />
                <span className="font-sans tracking-wide text-sm">/kenzyibrahim</span>
              </a>
            </div>

            <div className="w-full flex justify-between text-[#F3E5D0]/30 text-xs font-sans tracking-widest uppercase">
              <span>About</span>
              <span>Experience</span>
              <span>Projects</span>
              <span>Contact</span>
            </div>
        </div>
      </section>
    </div>
  );
}
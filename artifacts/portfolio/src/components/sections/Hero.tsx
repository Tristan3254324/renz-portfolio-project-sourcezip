import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { ChevronDown, ExternalLink, Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

import avatarUrl from '@assets/Graduation_1_1786051115417.png';

export function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-x-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="min-w-0 overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM.STATUS: AVAILABLE_FOR_WORK
          </div>
          
          <h1 className="font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(1.5rem, 7vw, 4.5rem)' }}>
            Hi, I'm <br />
            <span className="text-primary glow-text font-mono tracking-tighter break-words [overflow-wrap:anywhere]">RENZ TRISTAN FERNANDEZ DIAZ</span>
          </h1>
          
          <div className="mb-6">
            <p className="text-sm sm:text-base md:text-2xl text-muted-foreground font-light font-mono leading-relaxed break-words">
              &gt; {resumeData.personal.title}
            </p>
          </div>
          
          <p className="text-muted-foreground/80 max-w-lg mb-10 leading-relaxed text-sm md:text-base">
            Meticulous, technology-driven problem solver optimizing business processes. 
            Blending financial acumen with AI and global market tech innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <button 
              onClick={() => scrollTo('#experience')}
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-all glow-box flex items-center justify-center gap-2"
              data-testid="button-hero-experience"
            >
              Initialize Sequence <ExternalLink size={16} />
            </button>
            <button 
              onClick={() => scrollTo('#contact')}
              className="px-6 py-3 border border-border bg-card/50 text-foreground font-medium rounded hover:border-primary/50 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              data-testid="button-hero-contact"
            >
              Open Comms <Mail size={16} />
            </button>
            <a
              href={resumeData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[#0077B5]/60 bg-[#0077B5]/10 text-[#0077B5] font-medium rounded hover:bg-[#0077B5]/20 hover:border-[#0077B5] transition-all flex items-center justify-center gap-2"
              data-testid="button-hero-linkedin"
            >
              <FaLinkedin size={18} /> LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative order-first lg:order-last flex justify-center items-center"
        >
          {/* Avatar Hologram Effect */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 border-2 border-dashed border-primary/40 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-primary/50 glow-box bg-card">
              <img 
                src={avatarUrl} 
                alt="Renz Tristan F. Diaz" 
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback if image isn't loaded yet
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Renz+Diaz&background=0a0a0a&color=00ffff&size=400`;
                }}
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-4 w-full animate-[scan_2s_linear_infinite]" />
            </div>
            
          </div>
        </motion.div>

      </div>

      <motion.button
        type="button"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center min-h-11 min-w-11 text-muted-foreground hover:text-primary transition-colors"
        onClick={() => scrollTo('#about')}
      >
        <span className="font-mono text-xs tracking-widest mb-2">SCROLL_DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(800px); }
        }
      `}} />
    </section>
  );
}

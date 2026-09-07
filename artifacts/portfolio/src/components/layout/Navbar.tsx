import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import platformLogo from '@assets/platform_logo.png';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work Samples', href: '#work-samples' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Honors', href: '#honors' },
  { name: 'Academia', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-primary/20 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
          className="flex items-center"
          aria-label="Renz Diaz — Home"
        >
          <img
            src={platformLogo}
            alt="Renz Diaz logo"
            className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]"
          />
        </a>

        {/* Desktop Nav — only at lg+ where all items fit without clipping */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 font-mono text-sm">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              <span className="text-primary/50 text-xs mr-1">0{i + 1}.</span>
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="px-5 py-2.5 rounded border border-primary text-primary hover:bg-primary/10 transition-colors font-semibold glow-box"
            data-testid="link-nav-hire"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile/Tablet Nav Toggle — visible below lg */}
        <button 
          className="lg:hidden text-foreground hover:text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile/Tablet Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-primary/20 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 font-mono gap-1 max-h-[calc(100dvh-64px)] overflow-y-auto">
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-muted-foreground hover:text-primary px-3 py-2.5 rounded flex items-center hover:bg-primary/5 transition-colors"
                >
                  <span className="text-primary text-xs mr-3 shrink-0">0{i + 1}.</span>
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                className="mt-3 mx-3 px-5 py-3 rounded border border-primary text-primary text-center hover:bg-primary/10 transition-colors font-semibold glow-box"
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

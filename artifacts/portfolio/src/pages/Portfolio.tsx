import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { WorkSamples } from '@/components/sections/WorkSamples';
import { Skills } from '@/components/sections/Skills';
import { Certifications } from '@/components/sections/Certifications';
import { HonorsAwards } from '@/components/sections/HonorsAwards';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';
import { AiChatbot } from '@/components/AiChatbot';

export default function Portfolio() {
  // Enforce dark mode on the root element
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <WorkSamples />
        <Skills />
        <Certifications />
        <HonorsAwards />
        <Education />
        <Contact />
      </main>
      
      <AiChatbot />

      <footer className="py-8 border-t border-border bg-card/20 text-center text-muted-foreground font-mono text-sm">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} RENZ TRISTAN F. DIAZ. All systems operational.</p>
          <p className="mt-2 text-xs opacity-50">DESIGNED FOR MAXIMUM IMPACT</p>
        </div>
      </footer>
    </div>
  );
}

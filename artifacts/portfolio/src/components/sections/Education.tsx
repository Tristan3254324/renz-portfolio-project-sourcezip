import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { GraduationCap, MapPin } from 'lucide-react';

export function Education() {
  return (
    <section id="education" className="py-16 relative bg-card/10 scroll-mt-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono">
                <span className="text-primary">07.</span> ACADEMIA
              </h2>
              <div className="h-[1px] bg-border flex-1 min-w-[40px] max-w-xs" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-6 rounded-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <GraduationCap size={32} className="text-primary mb-4" />
            
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
                <div className="text-primary font-mono mb-4">{edu.institution}</div>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-mono">
                  <span>{edu.years}</span>
                  <span className="flex items-center gap-1 break-words">
                    <MapPin size={14} className="text-primary/70 shrink-0" /> {edu.location}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';

export function Experience() {
  const [activeTabId, setActiveTabId] = useState(0);

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono">
              <span className="text-primary">02.</span> EXPERIENCE_LOG
            </h2>
            <div className="h-[1px] bg-border flex-1 min-w-[40px] max-w-xs" />
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Tabs Sidebar */}
          <div className="md:w-1/3 lg:w-1/4 flex md:flex-col overflow-x-auto md:overflow-visible scrollbar-hide border-b md:border-b-0 md:border-l border-border relative z-10">
            {resumeData.experience.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTabId(index)}
                data-testid={`button-exp-tab-${index}`}
                className={`text-left px-4 py-3 font-mono text-sm whitespace-nowrap md:whitespace-normal transition-all duration-300 relative border-b-2 md:border-b-0 md:border-l-2 ${
                  activeTabId === index
                    ? 'text-primary border-primary bg-primary/5'
                    : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-card/50'
                } -mb-[2px] md:-mb-0 md:-ml-[2px]`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Active Content Panel */}
          <div className="md:w-2/3 lg:w-3/4 min-h-0 sm:min-h-[350px]">
            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: activeTabId === index ? 1 : 0,
                  x: activeTabId === index ? 0 : 20,
                  display: activeTabId === index ? 'block' : 'none'
                }}
                transition={{ duration: 0.3 }}
                className="bg-card/40 border border-border p-6 md:p-8 rounded-lg relative overflow-hidden group"
              >
                {/* Holographic grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 break-words">
                    {exp.role}
                  </h3>
                  <div className="text-primary font-mono text-base sm:text-lg mb-4 break-words">
                    @ {exp.company}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary/70" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary/70" />
                      {exp.location}
                    </span>
                  </div>

                  {exp.bullets.length > 0 ? (
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (i * 0.1) }}
                          className="flex items-start text-muted-foreground leading-relaxed"
                        >
                          <ChevronRight size={18} className="text-primary mt-1 mr-2 shrink-0" />
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground/50 font-mono italic">
                      [Data stream classified / Internal processing]
                    </p>
                  )}
                </div>
                
                {/* Corner decorative elements */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/50" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

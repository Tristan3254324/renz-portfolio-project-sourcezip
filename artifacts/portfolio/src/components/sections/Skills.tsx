import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { Terminal } from 'lucide-react';

export function Skills() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section id="skills" className="py-24 relative bg-card/20 border-y border-border">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono">
              <span className="text-primary">04.</span> SKILL_MATRIX
            </h2>
            <div className="h-[1px] bg-border flex-1 min-w-[40px] max-w-xs" />
          </div>
          <p className="text-muted-foreground max-w-2xl font-mono text-sm">
            &gt; SYSTEM.ANALYZE(COMPETENCIES); <br/>
            &gt; 60+ TOOLS DETECTED ACROSS 8 CATEGORIES.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {resumeData.skills.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-card border border-border rounded-lg p-4 sm:p-6 relative group hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
                <Terminal className="text-primary" size={18} />
                <h3 className="font-bold text-foreground tracking-tight">
                  {skillGroup.category}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={item}
                    className="px-3 py-1.5 text-xs font-mono rounded bg-secondary/50 text-secondary-foreground border border-border hover:border-primary hover:text-primary hover:bg-primary/10 transition-all cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

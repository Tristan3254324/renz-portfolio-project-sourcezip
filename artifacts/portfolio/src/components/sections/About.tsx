import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { StatCounter } from '@/components/ui/StatCounter';
import { Code, Globe, Award, Briefcase, ChevronRight, Zap } from 'lucide-react';

const stats = [
  { label: 'Work Experiences', value: 12, icon: Briefcase },
  { label: 'Tools Mastered', value: 60, icon: Code, suffix: '+' },
  { label: 'Certifications', value: 68, icon: Award },
  { label: 'Global Regions', value: 4, icon: Globe },
];

export function About() {
  const { personal } = resumeData;

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono">
              <span className="text-primary">01.</span> PROFILE_DATA
            </h2>
            <div className="h-[1px] bg-border flex-1 min-w-[40px] max-w-xs" />
          </div>

          {/* Story + Stats Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              {/* Origin Story */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border-l-2 border-primary pl-5"
              >
                <p className="text-muted-foreground leading-relaxed text-base italic">
                  {personal.story}
                </p>
              </motion.div>

              {/* Core Summary */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground leading-relaxed text-base"
              >
                {personal.summary}
              </motion.p>

              {/* Quick Meta */}
              <div className="font-mono text-sm border-l-2 border-primary/40 pl-4 text-primary/70 space-y-1">
                <p>&gt; LOCATION: {personal.location}</p>
                <p>&gt; SPECIALTY: Virtual Assistant, Data Entry Specialist, Automation &amp; System Admin</p>
                <p>&gt; LANGUAGE: C1 Advanced English (EF SET 61/100)</p>
                <p>&gt; STATUS: <span className="text-green-400">AVAILABLE_FOR_WORK</span></p>
              </div>
            </div>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="p-4 sm:p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon className="text-primary/50 group-hover:text-primary transition-colors mb-3 sm:mb-4" size={22} />
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-foreground mb-1">
                      <StatCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* What I Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 p-6 md:p-8 bg-card border border-border rounded-xl relative overflow-hidden"
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-primary/20 rounded-bl-none rounded-tr-xl" />

            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-primary" size={20} />
              <h3 className="font-mono text-primary uppercase tracking-widest text-sm">What_I_Offer</h3>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {personal.servicesIntro}
            </p>

            <ul className="grid sm:grid-cols-2 gap-2">
              {personal.services.map((service, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <ChevronRight className="text-primary mt-0.5 shrink-0" size={14} />
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Extended Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-8 bg-card border border-border rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/20 rounded-tr-none rounded-tl-xl" />

            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-primary" size={20} />
              <h3 className="font-mono text-primary uppercase tracking-widest text-sm">Extended_Background</h3>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4">
              {personal.extendedBackground}
            </p>

            <p className="text-primary/80 font-mono text-sm border-t border-border/40 pt-4 mt-4">
              &gt; {personal.passion}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

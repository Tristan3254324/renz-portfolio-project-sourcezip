import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Scene8 = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGlitch(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        {/* Cyberpunk grid background */}
        <motion.div 
          className="w-[200vw] h-[200vh] border-[1px] border-[var(--color-primary)]"
          style={{
            backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
          initial={{ rotateX: 60, y: -200, z: -500 }}
          animate={{ y: 0 }}
          transition={{ duration: 4, ease: "linear" }}
        />
      </div>

      <motion.div 
        className="relative z-10 text-center max-w-4xl px-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      >
        <h1 className="font-display font-bold text-6xl text-white tracking-widest uppercase mb-6 neon-text relative inline-block">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.1em" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            RENZ TRISTAN
          </motion.span>
          <br/>
          <motion.span
            className="text-[var(--color-primary)]"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.1em" }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          >
            FERNANDEZ DIAZ
          </motion.span>
          
          {glitch && (
            <motion.div 
              className="absolute inset-0 bg-white mix-blend-difference"
              animate={{ opacity: [0, 1, 0, 1, 0], x: [-5, 5, -2, 2, 0] }}
              transition={{ duration: 0.2 }}
            />
          )}
        </h1>

        <motion.div 
          className="w-24 h-1 bg-[var(--color-primary)] mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />

        <motion.p 
          className="font-mono text-sm text-[var(--color-text-secondary)] leading-loose tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          "Meticulous, technology-driven problem solver optimizing business processes. 
          <br/>
          Blending financial acumen with AI and global market tech innovation."
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

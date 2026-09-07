import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Scene1 = () => {
  const [glitch, setGlitch] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setGlitch(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const text = "RENZ TRISTAN FERNANDEZ DIAZ";
  const letters = Array.from(text);

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="absolute top-1/4 w-[1px] h-32 bg-[var(--color-primary)] opacity-40"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
      />
      
      <div className="relative overflow-hidden px-8 py-4 neon-box bg-black/80 backdrop-blur-sm">
        <h1 className="font-display font-bold text-5xl tracking-widest text-[var(--color-primary)] neon-text flex space-x-1">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.2, type: "spring", stiffness: 200 }}
              className={letter === " " ? "w-4" : ""}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        
        {glitch && (
          <motion.div 
            className="absolute inset-0 bg-[var(--color-primary)] mix-blend-overlay"
            animate={{ x: [-10, 10, -5, 5, 0], opacity: [0, 0.5, 0, 0.5, 0] }}
            transition={{ duration: 0.2, times: [0, 0.2, 0.5, 0.8, 1] }}
          />
        )}
      </div>

      <motion.div 
        className="mt-8 font-mono text-[var(--color-text-secondary)] tracking-[0.3em] text-sm uppercase flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
        INITIALIZING PROFILE...
      </motion.div>
    </motion.div>
  );
};

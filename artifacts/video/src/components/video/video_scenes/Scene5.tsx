import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Scene5 = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const controls = animate(count, 65, {
      duration: 1.5,
      delay: 0.5,
      ease: "easeOut",
      onComplete: () => setIsDone(true)
    });
    return controls.stop;
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative w-96 h-96 flex items-center justify-center"
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Radar/Circle Elements */}
        <motion.div 
          className="absolute inset-0 border-4 border-dashed border-[var(--color-primary)] rounded-full opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-4 border-2 border-[var(--color-primary)] rounded-full opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Glow behind counter */}
        {isDone && (
          <motion.div 
            className="absolute inset-10 bg-[var(--color-primary)] rounded-full blur-[80px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <div className="flex flex-col items-center justify-center text-center z-10">
          <div className="flex items-end font-display font-bold text-white neon-text">
            <motion.span className="text-9xl">{rounded}</motion.span>
            <motion.span 
              className="text-7xl text-[var(--color-primary)] mb-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isDone ? 1 : 0, scale: isDone ? 1 : 0 }}
              transition={{ type: "spring" }}
            >
              +
            </motion.span>
          </div>
          <motion.div 
            className="font-mono text-xl tracking-[0.4em] text-[var(--color-text-secondary)] mt-4 uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Certifications
          </motion.div>
        </div>
      </motion.div>

      {/* Accents */}
      <motion.div 
        className="absolute top-20 left-20 font-mono text-xs text-[var(--color-primary)] tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        VERIFICATION_NODE // VALID
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-20 font-mono text-xs text-[var(--color-primary)] tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        SYS.AUTH // APPROVED
      </motion.div>
    </motion.div>
  );
};

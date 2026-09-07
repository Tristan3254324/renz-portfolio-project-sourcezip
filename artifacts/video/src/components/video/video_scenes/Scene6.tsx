import { motion } from 'framer-motion';

export const Scene6 = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-transparent"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-warning)]/10 to-transparent mix-blend-screen pointer-events-none" />

      <motion.div 
        className="flex flex-col items-center"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.div 
          className="relative w-48 h-48 mb-8"
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Custom Gold Badge */}
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-warning)] neon-box-gold flex items-center justify-center bg-black/80">
            <motion.div 
              className="absolute inset-2 border border-dashed border-[var(--color-warning)]/50 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="text-center font-display font-bold text-[var(--color-warning)] leading-none">
              <span className="text-sm tracking-widest block mb-1">GUINNESS</span>
              <span className="text-2xl tracking-wider block">WORLD</span>
              <span className="text-lg tracking-widest block mt-1">RECORD</span>
            </div>
          </div>
          {/* Glowing pulse behind badge */}
          <motion.div 
            className="absolute inset-0 bg-[var(--color-warning)] rounded-full blur-[60px] -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.h2 
          className="font-display font-bold text-5xl text-white tracking-widest text-center uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ textShadow: "0 0 20px rgba(255, 184, 0, 0.5)" }}
        >
          Official Record Holder
        </motion.h2>

        <motion.div 
          className="mt-6 font-mono text-xl text-[var(--color-text-secondary)] text-center uppercase flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <span>Most Users in an AI Video Lesson</span>
          <span className="text-[var(--color-warning)] text-2xl font-bold tracking-widest mt-2 neon-box-gold py-2 px-6 bg-black/50">
            14,075 PARTICIPANTS
          </span>
          <span className="text-sm mt-2 tracking-widest">JULY 2026</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

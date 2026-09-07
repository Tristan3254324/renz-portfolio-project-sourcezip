import { motion } from 'framer-motion';

const roles = [
  "DIGITAL MARKETING PROFESSIONAL",
  "XERO PROFESSIONAL",
  "HUBSPOT EXPERT",
  "AUTOMATION EXPERT",
  "SYSTEM ADMIN EXPERT",
  "GENERAL VIRTUAL ASSISTANT",
  "CLIENT SUPPORT",
  "ADMINISTRATIVE ASSISTANT",
  "TECHNICAL SUPPORT"
];

export const Scene2 = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-row items-center justify-between px-20 bg-transparent"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col gap-2 w-1/2">
        {roles.map((role, i) => (
          <motion.div
            key={role}
            className="font-mono text-xl text-[var(--color-text-primary)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: i === 0 || i === 3 || i === 8 ? 1 : 0.4, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
          >
            <span className="text-[var(--color-primary)] mr-4">&gt;</span>
            {role}
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="w-1/2 flex justify-end"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
      >
        <div className="neon-box border-[var(--color-success)] bg-black/60 p-8 flex flex-col items-center gap-4 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-[var(--color-success)]"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          />
          <div className="w-16 h-16 rounded-full border-2 border-[var(--color-success)] flex items-center justify-center relative">
             <motion.div 
               className="absolute inset-0 rounded-full bg-[var(--color-success)]/20"
               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
             <div className="w-4 h-4 rounded-full bg-[var(--color-success)]" />
          </div>
          <h2 className="font-display font-bold text-2xl tracking-widest text-[var(--color-success)]" style={{textShadow: '0 0 10px rgba(0,255,255,0.5)'}}>
            AVAILABLE_FOR_WORK
          </h2>
          <p className="font-mono text-sm text-[var(--color-text-secondary)] text-center max-w-xs uppercase">
            System status optimal. Ready for new operational directives.
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
};

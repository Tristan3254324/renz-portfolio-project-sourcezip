import { motion } from 'framer-motion';

const experiences = [
  { role: "Digital Marketing", company: "Marketlink", detail: "3 YRS" },
  { role: "Finance Manager", company: "2GO", detail: "FINANCE" },
  { role: "KYC/AML Analyst", company: "Open NFT", detail: "CRYPTO" },
  { role: "Interpreter", company: "The Language Doctors", detail: "LINGUIST" },
  { role: "Ambassador", company: "DIFX", detail: "WEB3" },
];

export const Scene3 = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col justify-center px-16 bg-transparent"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      <motion.div className="mb-12">
        <motion.p 
          className="font-mono text-[var(--color-primary)] tracking-widest text-lg mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          // CAREER TRAJECTORY
        </motion.p>
        <motion.h2 
          className="font-display font-bold text-6xl tracking-tighter text-white uppercase neon-text"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        >
          15 ROLES OF <span className="text-[var(--color-primary)]">IMPACT</span>
        </motion.h2>
      </motion.div>

      <div className="flex gap-4 overflow-visible">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role}
            className="flex-1 neon-box bg-black/70 p-6 flex flex-col border-[var(--color-primary)]/30 backdrop-blur-md"
            initial={{ opacity: 0, y: 50, rotateX: 45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 150, damping: 15 }}
            style={{ transformPerspective: 1000 }}
          >
            <div className="font-mono text-[var(--color-text-secondary)] text-xs mb-4 uppercase tracking-widest flex justify-between border-b border-[var(--color-primary)]/20 pb-2">
              <span>SYS_RECORD_{i+1}</span>
              <span className="text-[var(--color-primary)]">{exp.detail}</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-1 uppercase">
              {exp.role}
            </h3>
            <p className="font-mono text-sm text-[var(--color-text-muted)] uppercase tracking-wider">
              @ {exp.company}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

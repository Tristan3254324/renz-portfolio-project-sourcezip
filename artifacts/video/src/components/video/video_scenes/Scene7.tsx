import { motion } from 'framer-motion';

const contacts = [
  { label: "LINKEDIN", value: "linkedin.com/in/tristan00" },
  { label: "EMAIL", value: "tristan@example.com" },
  { label: "PLATFORM", value: "Filo Tutor" }
];

export const Scene7 = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-row items-center px-16 bg-transparent"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-1/2 flex flex-col gap-6">
        <motion.h2 
          className="font-display font-bold text-5xl text-white tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          LET'S BUILD SOMETHING <br/> <span className="text-[var(--color-primary)] neon-text">TOGETHER</span>
        </motion.h2>

        <div className="flex flex-col gap-4">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.label}
              className="neon-box bg-black/60 p-4 border-[var(--color-primary)]/40 flex justify-between items-center backdrop-blur-md"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 150 }}
            >
              <span className="font-mono text-xs text-[var(--color-primary)] tracking-widest">{contact.label}</span>
              <span className="font-mono text-sm text-white">{contact.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="w-1/2 flex justify-center items-center relative"
        initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ delay: 1.2, duration: 1, type: "spring", damping: 20 }}
        style={{ transformPerspective: 1000 }}
      >
        <div className="relative w-80 h-[28rem]">
          {/* Cyberpunk frame for photo */}
          <div className="absolute inset-0 border-2 border-[var(--color-primary)] neon-box translate-x-4 translate-y-4" />
          <div className="absolute inset-0 border border-[var(--color-primary)]/50 -translate-x-4 -translate-y-4" />
          
          <div className="absolute inset-0 overflow-hidden bg-black filter grayscale hover:grayscale-0 transition-all duration-1000 z-10">
            <img 
              src={`${import.meta.env.BASE_URL}images/graduation.png`}
              alt="Renz Tristan Diaz"
              className="w-full h-full object-cover object-center opacity-80 mix-blend-screen"
            />
            {/* Scanline overlay */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-2 bg-[var(--color-primary)]/30"
              animate={{ y: [0, 448, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Decorative nodes */}
          <div className="absolute -top-6 -left-6 w-4 h-4 border-t-2 border-l-2 border-[var(--color-primary)]" />
          <div className="absolute -bottom-6 -right-6 w-4 h-4 border-b-2 border-r-2 border-[var(--color-primary)]" />
        </div>
      </motion.div>
    </motion.div>
  );
};

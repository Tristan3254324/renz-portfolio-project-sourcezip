import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const tools = [
  "HubSpot", "Xero", "Salesforce", "Zoho CRM", 
  "QuickBooks", "Google Workspace", "Microsoft 365", "Zapier", 
  "Make.com", "Notion", "Slack", "Monday.com", 
  "WordPress", "Shopify"
];

export const Scene4 = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => Math.min(p + Math.floor(Math.random() * 15) + 5, 100));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-transparent"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-12 left-16">
        <motion.h2 
          className="font-display font-bold text-4xl text-[var(--color-primary)] tracking-widest uppercase"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          ARSENAL_LOADED
        </motion.h2>
        <motion.div 
          className="h-1 bg-[var(--color-primary)] mt-2 w-48"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        />
      </div>

      <div className="grid grid-cols-5 gap-4 mt-20 w-[80vw]">
        {tools.map((tool, i) => (
          <motion.div
            key={tool}
            className="neon-box bg-black/80 flex items-center justify-center p-4 border-[var(--color-primary)]/40 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 1.0 + i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div 
              className="absolute inset-0 bg-[var(--color-primary)]/10"
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.2 + i * 0.08, duration: 0.5 }}
            />
            <span className="font-mono text-sm uppercase tracking-wider text-white z-10">
              {tool}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="absolute bottom-16 right-16 font-mono text-[var(--color-primary)] text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5 }}
      >
        {progress}% INTEGRATED
      </motion.div>
    </motion.div>
  );
};

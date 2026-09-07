import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Trophy, X, Star } from 'lucide-react';
import gwrCert from '@assets/Screenshot_2026-07-30_050925_1786058100466.png';
import gwrMilestone from '@assets/unnamed_(1)_1786058132800.png';

const honors = [
  {
    id: 'gwr-2026',
    title: 'Guinness World Records™',
    subtitle: 'Most Users in an AI Video Lesson',
    issuer: 'Guinness World Records™',
    date: 'Jul 2026',
    badge: '🏆 RECORD HOLDER',
    stat: '1 of 14,075',
    description:
      'Took part in a Guinness World Records™ event for the most users in an artificial intelligence video lesson with 14,075 participants achieved by Kanz and Ministry of Human Resources and Social Development, Saudi Arabia on July 15, 2026.',
    link: 'https://www.guinnessworldrecords.com/world-records/785201-most-users-in-an-artificial-intelligence-video-lesson',
    images: [gwrCert, gwrMilestone],
    accent: '#FFD700',   // gold
    glowColor: 'rgba(255,215,0,0.25)',
    tags: ['World Record', 'Artificial Intelligence', 'Kanz', 'Saudi Arabia'],
  },
];

export function HonorsAwards() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(0);
  const honor = honors[0];

  const openLightbox = (idx: number) => { setLightboxImg(idx); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);

  React.useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxImg(i => (i - 1 + honor.images.length) % honor.images.length);
      if (e.key === 'ArrowRight') setLightboxImg(i => (i + 1) % honor.images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen]);

  return (
    <section id="honors" className="py-24 relative overflow-hidden">
      {/* Ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-400/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-14"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono">
              <span className="text-primary">06.</span> HONORS_&amp;_AWARDS
            </h2>
            <div className="h-[1px] bg-border flex-1 min-w-[40px] max-w-xs" />
          </div>
          <p className="text-muted-foreground font-mono text-sm">
            &gt; WORLD-CLASS RECOGNITION — VERIFIED
          </p>
        </motion.div>

        {/* Main honor card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-yellow-400/30 bg-card overflow-hidden shadow-[0_0_60px_rgba(255,215,0,0.08)]"
        >
          {/* Top gold accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left — text content */}
            <div className="p-5 sm:p-8 md:p-12 flex flex-col justify-between gap-8">
              {/* Badge pill */}
              <div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-400/50 bg-yellow-400/10 text-yellow-400 font-mono text-xs font-bold mb-6"
                >
                  <Trophy size={12} className="shrink-0" />
                  {honor.badge}
                </motion.div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">
                  {honor.title}
                </h3>
                <p className="text-yellow-400 font-semibold text-base sm:text-lg mb-1">{honor.subtitle}</p>
                <p className="text-muted-foreground font-mono text-sm mb-6">
                  Issued by {honor.issuer} · {honor.date}
                </p>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {honor.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {honor.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded font-mono text-xs border border-yellow-400/20 bg-yellow-400/5 text-yellow-400/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Stat card */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-yellow-400/20 bg-yellow-400/5">
                  <Star size={16} className="text-yellow-400 shrink-0" />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">RANK</p>
                    <p className="font-bold text-yellow-400 text-lg leading-tight">{honor.stat}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">PARTICIPANTS</p>
                  </div>
                </div>

                {/* Verify link */}
                <a
                  href={honor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10 font-mono text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_16px_rgba(255,215,0,0.2)]"
                >
                  <ExternalLink size={14} />
                  Verify Record
                </a>
              </div>
            </div>

            {/* Right — image gallery */}
            <div className="grid grid-rows-2 gap-0 border-t md:border-t-0 md:border-l border-yellow-400/20">
              {honor.images.map((src, i) => (
                <motion.button
                  key={i}
                  onClick={() => openLightbox(i)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="group relative overflow-hidden aspect-video md:aspect-auto hover:z-10 cursor-zoom-in"
                >
                  <img
                    src={src}
                    alt={`Honor certificate ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="font-mono text-xs text-yellow-400 border border-yellow-400/50 bg-background/80 px-3 py-1.5 rounded-full">
                      VIEW FULL
                    </span>
                  </div>
                  {/* separator between rows */}
                  {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-yellow-400/20" />}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center gap-3"
        >
          <Trophy className="text-yellow-400" size={16} />
          <span className="font-mono text-xs text-muted-foreground">
            {honors.length} WORLD-CLASS HONOR — MORE ACCOLADES INCOMING
          </span>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="honor-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden border border-yellow-400/40 shadow-[0_0_60px_rgba(255,215,0,0.2)]">
                <img
                  src={honor.images[lightboxImg]}
                  alt="Honor"
                  className="w-full h-auto max-h-[80vh] object-contain bg-card"
                />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-400 rounded-tl-xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-400 rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-400 rounded-bl-xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-400 rounded-br-xl pointer-events-none" />
              </div>
              {/* Thumbnail nav */}
              <div className="flex gap-3 justify-center mt-4">
                {honor.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxImg(i)}
                    className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                      i === lightboxImg
                        ? 'border-yellow-400 shadow-[0_0_10px_rgba(255,215,0,0.5)]'
                        : 'border-border opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute top-2 right-2 sm:-top-4 sm:-right-4 p-2 rounded-full bg-card border border-border hover:border-yellow-400/50 text-foreground transition-all"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

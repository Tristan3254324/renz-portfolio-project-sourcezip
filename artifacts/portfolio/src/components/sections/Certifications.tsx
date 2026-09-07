import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Award, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Certificate image imports ---
import cert1  from '@assets/1685711277078_1786054598448.jpeg';
import cert2  from '@assets/1685964310771_1786054598448.jpeg';
import cert3  from '@assets/d63031f1101843b4aec8878c8445cbe1_1786054598449.png';
import cert4  from '@assets/101a392695c546e39be897183710bf13_1786054598449.png';
import cert5  from '@assets/e0ce14e777ec479b8d671f6ed53f3468_1786054598449.png';
import cert6  from '@assets/57f1e218e30641a2b8e912b36bd14078_1786054598450.png';
import cert7  from '@assets/57e3ac2b27494e47ad59f1cb850b57a6_1786054598450.png';
import cert8  from '@assets/d4de0db1440a4ab28e29a10358606380_1786054598450.png';
import cert9  from '@assets/0cfc80d54aa047468682e19f46c17f01_1786054598450.png';
import cert10 from '@assets/Copilot_20260526_003929_1786054598451.png';
import cert11 from '@assets/Screenshot_2026-07-26_121633_1786054598451.png';
import cert12 from '@assets/Screenshot_2026-07-12_034933_1786054598451.png';
import cert13 from '@assets/Copilot_20260520_155911_1786054598451.png';
import cert14 from '@assets/Copy_of_1727992217166_1786054598452.jpeg';
import cert15 from '@assets/Copy_of_1716893260120_1786054598452.jpeg';
import cert16 from '@assets/Copy_of_1716980031854_1786054598452.jpeg';
import cert17 from '@assets/Diaz,_Renz_Tristan_Fernandez_1786054598453.png';
import cert18 from '@assets/1684755662728_1786054598453.jpeg';
import cert19 from '@assets/1685076482320_1786054598453.jpeg';
import cert20 from '@assets/1685709564673_1786054598454.jpeg';

// --- Fourth batch of 7 certificate imports ---
import cert59 from '@assets/B.O.X._2024_-_Diaz,_Renz_Tristan_F._1_1786057316130.jpg';
import cert60 from '@assets/Certificate_Q3_2022_3_1_1786057365381.jpg';
import cert61 from '@assets/1785058866834_1786057697278.png';
import cert62 from '@assets/1785060126942_1786057697278.jpg';
import cert63 from '@assets/Screenshot_2026-08-07_070837_1786057818024.png';
import cert64 from '@assets/Screenshot_2026-08-07_071000_1786057818024.png';
import cert65 from '@assets/Screenshot_2026-08-07_070920_1786057818025.png';

// --- Latest Klaviyo Academy certificates ---
import cert66 from '@assets/Screenshot_2026-08-23_193614_1787485043587.png';
import cert67 from '@assets/Screenshot_2026-08-23_193454_1787485043589.png';
import cert68 from '@assets/Screenshot_2026-08-23_193220_1787485043589.png';

// --- Third batch of 18 certificate imports ---
import cert41 from '@assets/1695816938601_1786057107833.jpeg';
import cert42 from '@assets/1695817469332_1786057107834.jpeg';
import cert43 from '@assets/1698914188758_1786057107835.jpeg';
import cert44 from '@assets/1699320777312_1786057107836.jpeg';
import cert45 from '@assets/1700523027103_1786057107836.jpeg';
import cert46 from '@assets/1708678253872_1786057107837.jpeg';
import cert47 from '@assets/1700569348522_1786057107838.jpeg';
import cert48 from '@assets/1708681196002_1786057107838.jpeg';
import cert49 from '@assets/1711703385089_1786057107838.jpeg';
import cert50 from '@assets/1712483278393_1786057107839.jpeg';
import cert51 from '@assets/1713369730490_1786057107839.jpeg';
import cert52 from '@assets/1714463719719_1786057107840.jpeg';
import cert53 from '@assets/1715741315245_1786057107841.jpeg';
import cert54 from '@assets/1715823473858_1786057107841.jpeg';
import cert55 from '@assets/1716893260120_1786057107830.jpeg';
import cert56 from '@assets/1716980031854_1786057107831.jpeg';
import cert57 from '@assets/1727982023422_1786057107831.jpeg';
import cert58 from '@assets/1727992217166_1786057107832.jpeg';

// --- Second batch of 20 certificate imports ---
import cert21 from '@assets/1685815177058_1786056970643.jpeg';
import cert22 from '@assets/1686119418068_1786056970643.jpeg';
import cert23 from '@assets/1686279680505_1786056970644.jpeg';
import cert24 from '@assets/1686914500140_1786056970645.jpeg';
import cert25 from '@assets/1686931479924_1786056970646.jpeg';
import cert26 from '@assets/1687065283601_1786056970647.jpeg';
import cert27 from '@assets/1687067343218_1786056970647.jpeg';
import cert28 from '@assets/1687069187069_1786056970648.jpeg';
import cert29 from '@assets/1688203815194_1786056970649.jpeg';
import cert30 from '@assets/1688657301571_1786056970649.jpeg';
import cert31 from '@assets/1689398485442_1786056970649.jpeg';
import cert32 from '@assets/1689399796876_1786056970638.jpeg';
import cert33 from '@assets/1689400200051_1786056970639.jpeg';
import cert34 from '@assets/1689400821915_1786056970639.jpeg';
import cert35 from '@assets/1689402303202_1786056970640.jpeg';
import cert36 from '@assets/1691164297354_1786056970640.jpeg';
import cert37 from '@assets/1691509061947_1786056970641.jpeg';
import cert38 from '@assets/1692040318516_1786056970641.jpeg';
import cert39 from '@assets/1694872882912_1786056970642.jpeg';
import cert40 from '@assets/1695816773425_1786056970642.jpeg';

const certificates = [
  { src: cert1,  label: 'ACLS Certification',              issuer: 'PIM / NHCPS' },
  { src: cert2,  label: 'Fundamentals of Digital Marketing', issuer: 'Heyo' },
  { src: cert3,  label: 'Content Marketing Certified',       issuer: 'HubSpot Academy' },
  { src: cert4,  label: 'Sales Management Certification',    issuer: 'HubSpot Academy' },
  { src: cert5,  label: 'Frictionless Sales Certified',      issuer: 'HubSpot Academy' },
  { src: cert6,  label: 'Certification',                     issuer: 'Professional' },
  { src: cert7,  label: 'Certification',                     issuer: 'Professional' },
  { src: cert8,  label: 'Certification',                     issuer: 'Professional' },
  { src: cert9,  label: 'Certification',                     issuer: 'Professional' },
  { src: cert10, label: 'Certification',                     issuer: 'Professional' },
  { src: cert11, label: 'Certification',                     issuer: 'Professional' },
  { src: cert12, label: 'Certification',                     issuer: 'Professional' },
  { src: cert13, label: 'Certification',                     issuer: 'Professional' },
  { src: cert14, label: 'Certification',                     issuer: 'Professional' },
  { src: cert15, label: 'Certification',                     issuer: 'Professional' },
  { src: cert16, label: 'Certification',                     issuer: 'Professional' },
  { src: cert17, label: 'Certification',                     issuer: 'Professional' },
  { src: cert18, label: 'Certification',                     issuer: 'Professional' },
  { src: cert19, label: 'Certification',                     issuer: 'Professional' },
  { src: cert20, label: 'Certification',                     issuer: 'Professional' },
  { src: cert21, label: 'Certification',                     issuer: 'Professional' },
  { src: cert22, label: 'Certification',                     issuer: 'Professional' },
  { src: cert23, label: 'Certification',                     issuer: 'Professional' },
  { src: cert24, label: 'Certification',                     issuer: 'Professional' },
  { src: cert25, label: 'Certification',                     issuer: 'Professional' },
  { src: cert26, label: 'Certification',                     issuer: 'Professional' },
  { src: cert27, label: 'Certification',                     issuer: 'Professional' },
  { src: cert28, label: 'Certification',                     issuer: 'Professional' },
  { src: cert29, label: 'Certification',                     issuer: 'Professional' },
  { src: cert30, label: 'Certification',                     issuer: 'Professional' },
  { src: cert31, label: 'Certification',                     issuer: 'Professional' },
  { src: cert32, label: 'Twitter Video Ads Specialist',      issuer: 'Twitter Flight School' },
  { src: cert33, label: 'Twitter Ads Manager Fundamentals',  issuer: 'Twitter Flight School' },
  { src: cert34, label: 'Cross-Border Advertising',          issuer: 'Twitter Flight School' },
  { src: cert35, label: 'Snapchat Essentials',               issuer: 'Snapchat' },
  { src: cert36, label: 'Understanding Dementia',            issuer: 'University of Tasmania' },
  { src: cert37, label: 'Certification',                     issuer: 'Professional' },
  { src: cert38, label: 'Certification',                     issuer: 'Professional' },
  { src: cert39, label: 'Certification',                     issuer: 'Professional' },
  { src: cert40, label: 'Certification',                               issuer: 'Professional' },
  { src: cert41, label: 'Digital Marketing Training',                  issuer: 'GAO Tek Inc.' },
  { src: cert42, label: 'Certification',                               issuer: 'Professional' },
  { src: cert43, label: 'Certification',                               issuer: 'Professional' },
  { src: cert44, label: 'Certification',                               issuer: 'Professional' },
  { src: cert45, label: 'Certification',                               issuer: 'Professional' },
  { src: cert46, label: 'Certification',                               issuer: 'Professional' },
  { src: cert47, label: 'Certification',                               issuer: 'Professional' },
  { src: cert48, label: 'Certification',                               issuer: 'Professional' },
  { src: cert49, label: 'Certification',                               issuer: 'Professional' },
  { src: cert50, label: 'Certification',                               issuer: 'Professional' },
  { src: cert51, label: 'Certification',                               issuer: 'Professional' },
  { src: cert52, label: 'Certification',                               issuer: 'Professional' },
  { src: cert53, label: 'Certification',                               issuer: 'Professional' },
  { src: cert54, label: 'Certification',                               issuer: 'Professional' },
  { src: cert55, label: 'Konnect Insights Foundation',                 issuer: 'Konnect Insights Academy' },
  { src: cert56, label: 'Marketing Intern Completion',                 issuer: 'TaoCrowd Inc.' },
  { src: cert57, label: 'GCash Forest Rebuilding',                     issuer: 'GCash / HOPE' },
  { src: cert58, label: 'Mastering Konnect Insights',                  issuer: 'Konnect Insights Academy' },
  { src: cert59, label: 'Business Online eXploration 2024',            issuer: 'Philippine Junior Marketing Association' },
  { src: cert60, label: 'Client Success Intern Completion',            issuer: 'CrewBloom' },
  { src: cert61, label: 'Klaviyo Practitioner',                        issuer: 'Klaviyo Academy' },
  { src: cert62, label: 'Klaviyo Deliverability',                      issuer: 'Klaviyo Academy' },
  { src: cert63, label: 'Google Ads Search Professional (2026)',       issuer: 'Google' },
  { src: cert64, label: 'Certification',                               issuer: 'Professional' },
  { src: cert65, label: 'Certification',                               issuer: 'Professional' },
  { src: cert66, label: 'Digital Marketing',                            issuer: 'Klaviyo Academy' },
  { src: cert67, label: 'Klaviyo Strategist',                           issuer: 'Klaviyo Academy' },
  { src: cert68, label: 'Klaviyo Developer',                            issuer: 'Klaviyo Academy' },
];

export function Certifications() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(i => i !== null ? (i - 1 + certificates.length) % certificates.length : 0);
  const next = () => setLightbox(i => i !== null ? (i + 1) % certificates.length : 0);

  // Keyboard nav
  React.useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return (
    <section id="certifications" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono">
              <span className="text-primary">05.</span> CLEARANCE_LEVELS
            </h2>
            <div className="h-[1px] bg-border flex-1 min-w-[40px] max-w-xs" />
          </div>
          <p className="text-muted-foreground font-mono text-sm">
            &gt; {certificates.length} CREDENTIALS VERIFIED — CLICK TO INSPECT
          </p>
        </motion.div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 5) * 0.06, duration: 0.35 }}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-border hover:border-primary/70 cursor-pointer bg-card transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
            >
              {/* Certificate image */}
              <img
                src={cert.src}
                alt={cert.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-primary/20 backdrop-blur-sm border border-primary/40 rounded-full p-2">
                  <ZoomIn className="text-primary" size={20} />
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/80 backdrop-blur-sm border-t border-primary/20">
                <p className="text-primary font-mono text-[10px] truncate">{cert.issuer}</p>
              </div>

              {/* Index badge */}
              <div className="absolute top-2 left-2 bg-background/70 backdrop-blur border border-primary/30 rounded text-primary font-mono text-[10px] px-1.5 py-0.5">
                {String(idx + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Count bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center gap-3"
        >
          <Award className="text-primary" size={16} />
            <span className="font-mono text-xs text-muted-foreground">
            {certificates.length} CERTIFICATES LOADED — PLUS 30+ MORE ACROSS PLATFORMS
          </span>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Inner panel — stop propagation so clicking image doesn't close */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full flex flex-col items-center gap-4"
              onClick={e => e.stopPropagation()}
            >
              {/* Cert image */}
              <div className="relative w-full rounded-xl overflow-hidden border border-primary/40 shadow-[0_0_60px_rgba(0,255,255,0.15)]">
                <img
                  src={certificates[lightbox].src}
                  alt={certificates[lightbox].label}
                  className="w-full h-auto max-h-[75vh] object-contain bg-card"
                />
                {/* Glow corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-xl pointer-events-none" />
              </div>

              {/* Label + counter */}
              <div className="font-mono text-sm text-primary/80 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
                <span className="text-muted-foreground">{String(lightbox + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}</span>
                <span className="text-primary break-words">{certificates[lightbox].issuer}</span>
              </div>

              {/* Nav buttons */}
              <div className="flex items-center gap-4 mt-1">
                <button
                  onClick={prev}
                  className="p-3 rounded-full border border-border hover:border-primary/60 bg-card hover:bg-primary/10 transition-all text-foreground"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-3 rounded-full border border-border hover:border-destructive/60 bg-card hover:bg-destructive/10 transition-all text-foreground"
                >
                  <X size={20} />
                </button>
                <button
                  onClick={next}
                  className="p-3 rounded-full border border-border hover:border-primary/60 bg-card hover:bg-primary/10 transition-all text-foreground"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 overflow-x-auto pb-1 max-w-full px-2">
                {certificates.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(i)}
                    className={`shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                      i === lightbox
                        ? 'border-primary shadow-[0_0_8px_rgba(0,255,255,0.5)]'
                        : 'border-border hover:border-primary/40 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={c.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

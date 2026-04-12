import React from 'react';
import { motion } from 'framer-motion';

/**
 * Hero background: diagonal wash + chex grid (must stay visible) + soft glows + accents.
 * Grid is rendered LAST so radial washes cannot paint over it.
 */
const AnimatedGridBackground = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 h-full min-h-full w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FDFEFF 0%, #F0F6FF 100%)',
      }}
      aria-hidden
    >
      {/* ── Soft color washes (under everything except final grid) ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_88%_8%,rgba(191,219,254,0.42)_0%,transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_12%_92%,rgba(221,236,255,0.5)_0%,transparent_52%)]" />
      {/* Electric blue + lavender blobs (very soft — grid sits on top) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_35%,rgba(96,165,250,0.14)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_60%,rgba(196,181,253,0.12)_0%,transparent_50%)]" />

      {/* Light center lift — kept subtle so grid remains readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_65%_at_50%_28%,rgba(255,255,255,0.18)_0%,transparent_58%)]" />

      {/* Left Accent: Three vertical stacked boxes as seen in image */}
      <div className="absolute left-[8%] top-[30%] flex h-[100px] md:h-[120px] -rotate-1 opacity-90 sm:left-[12%] md:left-[15%]">
         <motion.div 
           className="w-[30px] md:w-[40px] h-full bg-[#E6F0FF] backdrop-blur-sm border-r border-white/40"
           animate={{ y: [-4, 4, -4] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         />
         <motion.div 
           className="w-[30px] md:w-[40px] h-full bg-[#C2DBFF] backdrop-blur-sm border-r border-white/40"
           animate={{ y: [-4, 4, -4] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
         />
         <motion.div 
           className="w-[30px] md:w-[40px] h-full bg-[#99BFFF] backdrop-blur-sm"
           animate={{ y: [-4, 4, -4] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
         />
      </div>

      {/* Right Accent: Three vertical stacked boxes */}
      <div className="absolute right-[8%] bottom-[20%] flex h-[100px] md:h-[120px] rotate-1 opacity-90 sm:right-[15%] md:right-[20%]">
         <motion.div 
           className="w-[30px] md:w-[40px] h-full bg-[#C2DBFF] backdrop-blur-sm border-r border-white/40"
           animate={{ y: [4, -4, 4] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         />
         <motion.div 
           className="w-[30px] md:w-[40px] h-full bg-[#99BFFF] backdrop-blur-sm border-r border-white/40"
           animate={{ y: [4, -4, 4] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
         />
         <motion.div 
           className="w-[30px] md:w-[40px] h-full bg-[#E6F0FF] backdrop-blur-sm"
           animate={{ y: [4, -4, 4] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
         />
      </div>

      {/* Soft floating accents */}
      <motion.div
        className="absolute top-[22%] left-[22%] h-[180px] w-[100px] rounded-xl bg-gradient-to-br from-blue-300/40 to-sky-200/25 blur-[2px]"
        animate={{ y: [-6, 10, -6], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[38%] right-[20%] h-[240px] w-[72px] rounded-[14px] bg-gradient-to-b from-blue-400/35 to-indigo-200/25 blur-[3px] sm:w-[88px]"
        animate={{ y: [8, -8, 8], opacity: [0.4, 0.58, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div className="absolute -right-[10%] top-[5%] h-[min(380px,50vw)] w-[min(380px,50vw)] rounded-full bg-[#BFDBFE]/35 blur-[90px]" />
      <div className="absolute -left-[8%] bottom-[10%] h-[min(320px,42vw)] w-[min(320px,42vw)] rounded-full bg-[#E0E7FF]/40 blur-[85px]" />

      {/* Chex grid — last paint; ~48px cells, visible neutral-grey 1px lines (reference: graph paper) */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(96, 165, 250, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(96, 165, 250, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: 'clamp(50px, 6vw, 80px) clamp(50px, 6vw, 80px)',
        }}
      />
    </div>
  );
};

export default AnimatedGridBackground;

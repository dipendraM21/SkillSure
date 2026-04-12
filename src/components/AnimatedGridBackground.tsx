import { motion } from 'framer-motion';

const CELL = 80;

/** Smooth circular orbit keyframes (Framer `x`/`y` as transform offsets, px). */
function circleOrbit(radius: number, segments: number, clockwise: boolean) {
  const x: number[] = [];
  const y: number[] = [];
  const dir = clockwise ? 1 : -1;
  for (let i = 0; i <= segments; i++) {
    const a = dir * (i / segments) * 2 * Math.PI;
    x.push(Number((radius * Math.cos(a)).toFixed(2)));
    y.push(Number((radius * Math.sin(a)).toFixed(2)));
  }
  return { x, y };
}

const LEFT_ORBIT = circleOrbit(CELL * 1.35, 40, true);
const RIGHT_ORBIT = circleOrbit(CELL * 1.1, 36, false);

const orbitTransition = {
  duration: 14,
  repeat: Infinity,
  ease: 'linear' as const,
};

const AnimatedGridBackground = () => {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      {/* Base gradient — subtle purple tint */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom right, #f6f3ff, #eef2ff)',
        }}
      />

      {/* Bottom-edge purple wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to top, rgba(68,39,173,0.10) 0%, transparent 30%),
            linear-gradient(to right, rgba(68,39,173,0.06) 0%, transparent 20%),
            linear-gradient(to left, rgba(24,173,153,0.04) 0%, transparent 25%)
          `,
        }}
      />

      {/* Soft centered purple glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(68,39,173,0.06), transparent 60%)',
        }}
      />

      {/* Left accent — circular orbit (clockwise) */}
      <motion.div
        className="absolute top-[26%] left-[6%] sm:left-[10%] md:left-[13%] z-[2] will-change-transform"
        style={{ transformOrigin: 'center center' }}
        animate={{ x: LEFT_ORBIT.x, y: LEFT_ORBIT.y }}
        transition={orbitTransition}
      >
        <div className="flex" style={{ height: CELL * 1.5 }}>
          <motion.div
            className="h-full bg-gradient-to-b from-[#E8DEFF] to-[#F0EAFF] border border-white/60 rounded-[2px]"
            style={{ width: CELL * 0.5 }}
            animate={{ opacity: [0.7, 0.9, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="h-full bg-gradient-to-b from-[#D0BFFF] to-[#DDD0FF] border border-white/50 rounded-[2px] -ml-px"
            style={{ width: CELL * 0.5 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />
          <motion.div
            className="h-full bg-gradient-to-b from-[#B49AFF] to-[#C4B0FF] border border-white/40 rounded-[2px] -ml-px"
            style={{ width: CELL * 0.5 }}
            animate={{ opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
        </div>
      </motion.div>

      {/* Right accent — circular orbit (counter-clockwise) */}
      <motion.div
        className="absolute top-[16%] right-[6%] sm:right-[12%] md:right-[18%] z-[2] will-change-transform"
        style={{ transformOrigin: 'center center' }}
        animate={{ x: RIGHT_ORBIT.x, y: RIGHT_ORBIT.y }}
        transition={{ ...orbitTransition, duration: 16 }}
      >
        <div className="flex" style={{ height: CELL * 1.5 }}>
          <motion.div
            className="h-full bg-gradient-to-b from-[#D0BFFF] to-[#DDD0FF] border border-white/50 rounded-[2px]"
            style={{ width: CELL * 0.5 }}
            animate={{ opacity: [0.75, 0.95, 0.75] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="h-full bg-gradient-to-b from-[#B49AFF] to-[#C4B0FF] border border-white/40 rounded-[2px] -ml-px"
            style={{ width: CELL * 0.5 }}
            animate={{ opacity: [0.65, 0.9, 0.65] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          <motion.div
            className="h-full bg-gradient-to-b from-[#E8DEFF] to-[#F0EAFF] border border-white/60 rounded-[2px] -ml-px"
            style={{ width: CELL * 0.5 }}
            animate={{ opacity: [0.7, 0.88, 0.7] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          />
        </div>
      </motion.div>

      {/* Ambient blurs */}
      <div className="absolute -right-[10%] top-[5%] h-[min(380px,50vw)] w-[min(380px,50vw)] rounded-full bg-[#DDD6FE]/20 blur-[90px]" />
      <div className="absolute -left-[8%] bottom-[10%] h-[min(320px,42vw)] w-[min(320px,42vw)] rounded-full bg-[#C4B5FD]/20 blur-[85px]" />

      {/* Grid lines — slight purple tint */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(68,39,173,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(68,39,173,0.08) 1px, transparent 1px)
          `,
          backgroundSize: `${CELL}px ${CELL}px`,
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 45%, black 50%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 45%, black 50%, transparent 100%)',
        }}
      />
    </motion.div>
  );
};

export default AnimatedGridBackground;

import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepData {
  id: string;
  title: string;
  description: string;
  image: React.ReactNode;
}

/** Optional “Getting Started” block (badge + title + description + step pills) above the scroll track. */
export interface ScrollStepsIntroConfig {
  badgeIcon?: React.ReactNode;
  badgeLabel: string;
  title: React.ReactNode;
  description: string;
}

interface ScrollStepsSectionProps {
  steps: StepData[];
  intro?: ScrollStepsIntroConfig;
}

const StepProgressBar: React.FC<{ steps: StepData[]; activeIndex: number }> = ({
  steps,
  activeIndex,
}) => {
  return (
    <div className="flex items-center gap-0 w-full max-w-[480px]">
      {steps.map((_, i) => {
        const isCompleted = i < activeIndex;
        const isActive = i === activeIndex;

        return (
          <React.Fragment key={i}>
            {/* Segment line (before each dot except the first) */}
            {i > 0 && (
              <div className="flex-1 h-[3px] rounded-full overflow-hidden bg-gray-200">
                <motion.div
                  className="h-full bg-[#4427AD] origin-left"
                  initial={false}
                  animate={{ scaleX: isCompleted || isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}

            {/* Step dot */}
            <motion.div
              className="relative flex-shrink-0"
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.85,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                  isCompleted || isActive
                    ? 'bg-[#4427AD] border-[#4427AD]'
                    : 'bg-white border-gray-300'
                }`}
              />
              {isActive ? (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#4427AD]/30"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                />
              ) : null}
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const ScrollStepsSection: React.FC<ScrollStepsSectionProps> = ({ steps, intro }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const scrollToStep = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const scrollable = Math.max(0, el.offsetHeight - window.innerHeight);
      if (scrollable <= 0) return;
      const t = steps.length <= 1 ? 0 : index / Math.max(1, steps.length - 1);
      window.scrollTo({ top: top + t * scrollable, behavior: 'smooth' });
    },
    [steps.length],
  );

  const updateScrollRange = useCallback(() => {
    if (trackRef.current) {
      setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
    }
  }, []);

  useLayoutEffect(() => {
    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, [updateScrollRange, steps]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.8,
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * steps.length), steps.length - 1);
    setActiveStep(idx);
  });

  return (
    <section id="getting-started" className="scroll-mt-28 w-full bg-white text-gray-900">
      {intro ? (
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center md:pb-14 md:pt-20">
          <div
            className={cn(
              'font-body mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-white px-4 py-1.5 text-sm font-medium text-[#4427AD] shadow-sm',
            )}
          >
            {intro.badgeIcon}
            <span>{intro.badgeLabel}</span>
          </div>
          <h2 className="font-heading mx-auto max-w-4xl text-[28px] sm:text-4xl font-bold leading-[1.1] tracking-tight text-[#111827] md:text-5xl lg:text-[52px]">
            {intro.title}
          </h2>
          <p className="font-body mx-auto mt-5 max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-[#666666] md:text-xl">
            {intro.description}
          </p>

          <div className="mt-10 w-full md:mt-12" role="group" aria-label="Process steps">
            {/* Row 1: Step 1 > Step 2 */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
              {steps.slice(0, 2).map((step, i) => (
                <React.Fragment key={step.id}>
                  {i > 0 && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#4427AD]/60 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" strokeWidth={2.5} aria-hidden />
                  )}
                  <button
                    type="button"
                    onClick={() => scrollToStep(i)}
                    className={cn(
                      'font-body inline-flex items-center gap-x-1.5 whitespace-nowrap rounded-full border border-blue-200/95 bg-white px-3.5 py-2 text-left text-[11.5px] leading-none shadow-sm transition-colors sm:gap-x-2 sm:px-6 sm:py-2.5 sm:text-[13.5px] md:px-8 md:py-3 md:text-[15px]',
                      activeStep === i ? 'border-[#4427AD] ring-2 ring-[#4427AD]/12' : 'hover:border-[#4427AD]/45',
                    )}
                  >
                    <span className="font-bold text-[#4427AD]">Step {i + 1}</span>
                    <span className="font-normal text-[#1a1a1a]">{step.title}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Row 2: > Step 3+ centered below */}
            {steps.length > 2 && (
              <div className="mt-2.5 flex items-center justify-center gap-1.5 sm:mt-3 sm:gap-2 md:gap-3">
                {steps.slice(2).map((step, i) => {
                  const realIndex = i + 2;
                  return (
                    <React.Fragment key={step.id}>
                      <ChevronRight className="h-4 w-4 shrink-0 text-[#4427AD]/60 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" strokeWidth={2.5} aria-hidden />
                      <button
                        type="button"
                        onClick={() => scrollToStep(realIndex)}
                        className={cn(
                          'font-body inline-flex items-center gap-x-1.5 whitespace-nowrap rounded-full border border-blue-200/95 bg-white px-3.5 py-2 text-left text-[11.5px] leading-none shadow-sm transition-colors sm:gap-x-2 sm:px-6 sm:py-2.5 sm:text-[13.5px] md:px-8 md:py-3 md:text-[15px]',
                          activeStep === realIndex ? 'border-[#4427AD] ring-2 ring-[#4427AD]/12' : 'hover:border-[#4427AD]/45',
                        )}
                      >
                        <span className="font-bold text-[#4427AD]">Step {realIndex + 1}</span>
                        <span className="font-normal text-[#1a1a1a]">{step.title}</span>
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${steps.length * 250}vh` }}
      >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col">
        {/* Slide area */}
        <div className="flex-1 flex items-center min-h-0">
          <motion.div
            ref={trackRef}
            className="flex h-full items-center gap-16 md:gap-24 px-[8vw] lg:px-[calc(50vw-420px)]"
            style={{ x }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="w-[85vw] lg:w-[840px] flex flex-col justify-center flex-shrink-0 h-full py-10 md:py-16 lg:py-20"
              >
                {/* Image card */}
                <motion.div
                  initial={{ opacity: 0.3, scale: 0.96, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4, margin: '200px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full aspect-[16/10] max-h-[55vh] bg-white rounded-2xl lg:rounded-3xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] border border-gray-100/80 overflow-hidden relative flex items-center justify-center mb-8 md:mb-10"
                >
                  {step.image}
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                >
                  <h2 className="font-heading mb-3 text-[24px] sm:text-[32px] font-bold leading-tight tracking-tight text-[#111827] md:text-[36px]">
                    <span className="text-[#4427AD]">{step.id}.</span>{' '}
                    {step.title}
                  </h2>
                  <p className="font-body max-w-[680px] text-base font-normal leading-[1.6] text-[#666666] md:text-lg">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Fixed bottom progress bar */}
        <div className="flex-shrink-0 flex justify-center pb-8 pt-4 px-6">
          <StepProgressBar steps={steps} activeIndex={activeStep} />
        </div>
      </div>
    </div>
    </section>
  );
};

import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export interface StepData {
  id: string;
  title: string;
  description: string;
  image: React.ReactNode;
}

interface ScrollStepsSectionProps {
  steps: StepData[];
}

export const ScrollStepsSection: React.FC<ScrollStepsSectionProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Synchronize the width of the scrollable track
  const updateScrollRange = useCallback(() => {
    if (trackRef.current) {
      setScrollRange(trackRef.current.scrollWidth - window.innerWidth);
    }
  }, []);

  useLayoutEffect(() => {
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, [updateScrollRange, steps]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth, gentle spring — feels fluid on mouse wheel without any snap/jitter
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.8,         // More mass gives a heavier, smoother glide
    stiffness: 40,     // Lower stiffness makes it respond slower to fast wheel turns
    damping: 20,       // Damping matches to allow it to glide to a stop
    restDelta: 0.001,
  });

  // Map vertical scroll progress strictly to horizontal X axis translation
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);
  
  // Progress bar mapped universally
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#fcfdfd] text-gray-900 border-t border-gray-100"
      style={{ height: `${steps.length * 250}vh` }} // Greatly increased height so mouse wheels scroll slower horizontally
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center shadow-[inset_0_-40px_100px_-50px_rgba(0,0,0,0.02)]">
        
        {/* Horizontal Track wrapper */}
        <motion.div 
          ref={trackRef}
          className="flex h-full items-center gap-16 md:gap-24 px-[10vw] lg:px-[calc(50vw-450px)]"
          style={{ x }}
        >
          {steps.map((step, index) => {
            return (
              <div key={index} className="w-[85vw] lg:w-[900px] flex flex-col justify-center flex-shrink-0 h-full max-h-screen py-12 md:py-20 lg:py-24">
                 
                 {/* Image Frame with entry animations */}
                 <motion.div 
                   initial={{ opacity: 0.3, scale: 0.95, y: 15 }}
                   whileInView={{ opacity: 1, scale: 1, y: 0 }}
                   viewport={{ once: false, amount: 0.4, margin: "200px" }}
                   transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                   className="w-full aspect-[16/10] max-h-[60vh] bg-white rounded-3xl lg:rounded-[40px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden relative flex items-center justify-center mb-10 md:mb-12"
                 >
                    {step.image}
                 </motion.div>

                 {/* Text Content Block */}
                 <motion.div 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: false, amount: 0.8 }}
                   transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                   className="w-full flex flex-col justify-start pb-12"
                 >
                    <h2 className="text-[32px] md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#1a1a24] mb-3 md:mb-4 leading-tight">
                      <span className="text-[#0055ff] mr-3">{step.id}.</span> 
                      {step.title}
                    </h2>
                    <p className="text-base md:text-[17px] lg:text-[19px] text-gray-500 leading-[1.7] max-w-[850px] font-normal">
                      {step.description}
                    </p>
                 </motion.div>

              </div>
            );
          })}
        </motion.div>
        
        {/* Global Fixed Progress Bar positioned precisely based on the reference layout */}
        <div className="absolute bottom-10 left-0 right-0 w-full flex justify-center z-50 pointer-events-none px-6">
           <div className="w-full max-w-[900px] h-[3px] bg-gray-200 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#0055ff] rounded-full" 
                style={{ width: progressWidth }}
              />
           </div>
        </div>
        
      </div>
    </div>
  );
};

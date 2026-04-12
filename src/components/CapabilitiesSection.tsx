import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bell, CheckCircle2, MessageSquare } from 'lucide-react';
import { LandingSectionHeading } from '@/components/landing/LandingSectionHeading';
import { CapabilityFeatureCard } from '@/components/landing/CapabilityFeatureCard';

// We replicate Lottie-like behavior natively using Framer Motion for higher performance and crisp SVGs
const BarChartAnimation = () => (
  <div className="relative w-full h-[220px] bg-transparent flex items-end justify-center gap-3 pb-6 overflow-hidden pt-10">
    <motion.div 
      animate={{ height: ["30%", "60%", "40%", "30%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-10 bg-purple-400 rounded-t-lg"
    />
    <motion.div 
      animate={{ height: ["50%", "80%", "60%", "50%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="w-10 bg-[#6B4FD8] rounded-t-lg"
    />
    <motion.div 
      animate={{ height: ["20%", "40%", "20%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="w-10 bg-red-400 rounded-t-lg relative flex justify-center"
    >
        <motion.div 
           animate={{ opacity: [0, 1, 0] }}
           transition={{ duration: 3, repeat: Infinity }}
           className="absolute -top-6 text-red-500"
        >
            <div className="text-[10px] w-4 h-4 rounded-full border border-red-500 flex items-center justify-center font-bold bg-white">!</div>
        </motion.div>
    </motion.div>
    <motion.div 
      animate={{ height: ["70%", "90%", "60%", "70%"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      className="w-10 bg-[#4427AD] rounded-t-lg"
    />
    <motion.div 
      animate={{ height: ["40%", "60%", "80%", "40%"] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      className="w-10 bg-purple-400 rounded-t-lg"
    />
  </div>
);

const DragDropAnimation = () => (
  <div className="relative w-full h-[220px] bg-transparent flex flex-col items-center justify-center gap-4 overflow-hidden pt-4">
    <motion.div 
      animate={{ y: [0, 50, 50, 0, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-48 h-10 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center px-4 z-10"
    >
        <div className="flex gap-1 mr-3">
            <div className="w-1 h-1 bg-gray-300 rounded-full" /><div className="w-1 h-1 bg-gray-300 rounded-full" />
        </div>
        <div className="w-20 h-2 bg-gray-200 rounded-full" />
    </motion.div>

    <motion.div 
      animate={{ y: [0, -50, -50, 0, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-48 h-10 bg-white rounded-lg shadow-sm border border-purple-200 flex items-center px-4 relative z-0"
    >
        <div className="flex gap-1 mr-3">
            <div className="w-1 h-1 bg-gray-300 rounded-full" /><div className="w-1 h-1 bg-gray-300 rounded-full" />
        </div>
        <div className="w-16 h-2 bg-purple-300 rounded-full" />
    </motion.div>

    <motion.div 
       animate={{ 
           x: [40, 40, -10, -10, 40],
           y: [30, -20, -20, 30, 30],
           scale: [1, 0.9, 0.9, 1, 1]
       }}
       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
       className="absolute z-20 text-black drop-shadow-md"
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1"><path d="M4 4l5 15 2.5-5.5L17 11 4 4z"></path></svg>
    </motion.div>
  </div>
);

const SchedulingAnimation = () => (
  <div className="relative w-full h-[220px] bg-transparent flex items-center justify-center overflow-hidden">
     <motion.div 
       animate={{ y: [10, -5, 10], opacity: [0.8, 1, 0.8] }}
       transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
       className="w-56 bg-white p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100"
     >
         <div className="flex justify-between items-start mb-3">
                <div className="bg-purple-100 text-[#4427AD] text-[10px] font-bold px-2 py-1 rounded">Math Test 1</div>
             <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="w-5 h-5 rounded-full border-2 border-gray-200 flex items-center justify-center"
             >
                 <motion.div animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-2.5 h-2.5 bg-[#4427AD] rounded-full" />
             </motion.div>
         </div>
         <div className="w-3/4 h-2 bg-gray-200 rounded-full mb-2" />
         <div className="w-1/2 h-2 bg-gray-100 rounded-full" />
     </motion.div>
  </div>
);

const BrandAnimation = () => (
  <div className="relative w-full lg:w-[45%] h-[240px] sm:h-[320px] lg:h-full bg-transparent flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full h-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
          <div className="h-10 border-b border-gray-100 flex items-center px-4">
              <div className="text-[10px] font-bold text-gray-400">Configure Workspace</div>
          </div>
          <div className="flex-1 p-4 flex gap-4">
              <div className="flex-1 flex flex-col gap-3">
                 <div className="h-6 w-full bg-gray-50 border border-gray-200 rounded text-[8px] flex items-center px-2 text-gray-400">Company Name</div>
                 <div className="h-6 w-full bg-gray-50 border border-gray-200 rounded flex items-center px-2 gap-2">
                     <motion.div 
                       animate={{ backgroundColor: ["#4427AD", "#18AD99", "#F4C84B", "#4427AD"] }}
                       transition={{ duration: 6, repeat: Infinity }}
                       className="w-3 h-3 rounded-sm"
                     />
                     <span className="text-[8px] text-gray-400">Primary Color</span>
                 </div>
              </div>
              <div className="w-24 bg-gray-50 border border-gray-100 rounded-lg p-2">
                  <motion.div 
                    animate={{ backgroundColor: ["#4427AD", "#18AD99", "#F4C84B", "#4427AD"] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="w-full h-10 rounded mb-2 opacity-20"
                  />
                  <div className="w-full h-2 bg-gray-200 rounded mb-1" />
                  <div className="w-2/3 h-2 bg-gray-200 rounded" />
              </div>
          </div>
      </div>
  </div>
);

const BellNotificationAnimation = () => (
   <div className="relative w-full h-[220px] bg-transparent flex flex-col items-center justify-center overflow-hidden">
      
      {/* Top success toast */}
      <motion.div 
        animate={{ opacity: [0, 1, 1, 0, 0], y: [-20, 0, 0, -20, -20] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-6 right-12 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2"
      >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
      </motion.div>

      {/* Bell Main */}
      <div className="relative">
          <motion.div 
            animate={{ rotate: [0, -15, 15, -10, 10, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            className="w-16 h-16 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center"
          >
              <Bell className="w-7 h-7 text-[#4427AD]" />
          </motion.div>
          <motion.div 
             animate={{ scale: [0, 1.2, 1, 1], opacity: [0, 1, 1, 0] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          />
      </div>

      {/* Bottom Message Toast */}
      <motion.div 
        animate={{ opacity: [0, 0, 1, 1, 0], y: [20, 20, 0, 0, 20] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-6 left-12 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2"
      >
          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
             <MessageSquare className="w-3 h-3 text-[#4427AD]" />
          </div>
          <div className="flex flex-col gap-1">
             <div className="w-16 h-1.5 bg-gray-200 rounded-full" />
             <div className="w-10 h-1 bg-gray-100 rounded-full" />
          </div>
      </motion.div>

   </div>
);

export const CapabilitiesSection = () => {
  return (
    <section className="w-full scroll-mt-28 py-14 sm:py-24 bg-white relative z-10" id="features">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <LandingSectionHeading
          badgeIcon={<Sparkles className="h-4 w-4 shrink-0 text-[#4427AD]" strokeWidth={2} />}
          badgeLabel="Core Platform Capabilities"
          badgeTone="neutral"
          titleClassName="font-semibold text-2xl leading-[1.15] tracking-tight text-neutral-900 sm:text-3xl md:text-5xl dark:text-white"
          descriptionClassName="w-full text-base leading-7 text-neutral-500 sm:text-lg md:text-xl dark:text-neutral-400"
          title={
            <>
              A learning platform built <br className="hidden md:block" /> to look like your own product
            </>
          }
          description="Designed for ed-tech businesses that need full branding control, scalable infrastructure, and modern learning workflows."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CapabilityFeatureCard
            title="AI-Assisted Insights"
            description="AI-powered analytics identify struggling students before they fall behind, reduces teacher workload, and provides decision-ready analytics on progress."
            illustration={<BarChartAnimation />}
          />

          <CapabilityFeatureCard
            title="Drag & Drop Builder"
            description="Manage your courses and lessons with a smooth, drag-and-drop interface. Create courses, modules, sections, lessons or schedule classes seamlessly."
            illustration={<DragDropAnimation />}
          />

          <CapabilityFeatureCard
            title="Test Scheduling"
            description="Organises learners into structured cohorts, automates assignments, tests, and milestones to keep students progressing on schedule."
            illustration={<SchedulingAnimation />}
          />

          <CapabilityFeatureCard
            layout="wide"
            className="lg:col-span-2"
            title="Complete Brand Control"
            description="Use the platform completely as your own brand. Custom domains, colours, logos, and messaging templates in the admin panel, all while keeping the underlying SaaS technology hidden."
            illustration={<BrandAnimation />}
          />

          <CapabilityFeatureCard
            title="Announcement & Notifications"
            description="Broadcast announcements, course updates, and critical notifications across the entire platform instantly via in-app and emails."
            illustration={<BellNotificationAnimation />}
          />
        </div>
      </div>
    </section>
  );
};

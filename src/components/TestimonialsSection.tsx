import React from 'react';
import { motion } from 'framer-motion';
import { LandingSectionHeading } from '@/components/landing/LandingSectionHeading';

const testimonials = [
  {
    logo: (
      <div className="flex items-center text-[#1E1B4B] font-bold text-xl tracking-tight">
        <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z" fill="#312E81"/>
        </svg>
        competishun
      </div>
    ),
    text: `"Newral is handling complete tech with top most efficiency, they helped us completely transform our platform's performance and scalability. From major cost optimization to faster video delivery and a smoother user experience, their execution was exceptional. The platform is now more stable, efficient, and growth-ready."`,
    authorName: "Mohit Tyagi",
    authorRole: "Founder, Competishun",
    authorAvatar: "https://i.pravatar.cc/150?u=mohit"
  },
  {
    logo: (
       <div className="flex items-center text-[#1E3A8A] font-bold text-[17px] tracking-tight whitespace-nowrap">
         <span className="w-6 h-6 mr-2 bg-[#4427AD] rounded flex items-center justify-center text-white text-[10px]">BC</span>
         BANSAL CLASSES
       </div>
    ),
    text: `"Newral helped us upgrade our technology at Bansal Classes with ease. Their strong software development support improved our operational efficiency and enhanced the overall student experience."`,
    authorName: "Sameer Bansal",
    authorRole: "Founder, Bansal Classes",
    authorAvatar: "https://i.pravatar.cc/150?u=sameer"
  },
  {
    logo: (
      <div className="bg-[#8B5CF6] text-white font-bold text-lg tracking-wider px-3 py-1.5 rounded-md flex items-center shadow-sm">
         <span className="mr-1">⚡️</span> FIZZ
      </div>
    ),
    text: `"Newral has been a valuable partner in our growth journey. Their scalable monitoring solutions and efficient DevOps workflows brought stability and clarity to our operations. We highly recommend their services."`,
    authorName: "Ashton Cofer",
    authorRole: "Co-Founder & CTO",
    authorAvatar: "https://i.pravatar.cc/150?u=ashton"
  },
  {
    logo: (
      <div className="text-gray-900 font-black text-2xl tracking-tighter flex items-center">
        <span className="text-[#4427AD] mr-1">✦</span> NextGen
      </div>
    ),
    text: `"Working with this team gave us a massive competitive edge. The platform scales dynamically during high-traffic mock exams without dropping a single connection. The granular data insights have drastically improved how we track student progress and drop-offs."`,
    authorName: "Sarah Jenkins",
    authorRole: "Director of Product",
    authorAvatar: "https://i.pravatar.cc/150?u=sarah"
  }
];

export const TestimonialsSection = () => {
  // We duplicate the array to ensure seamless infinite looping
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="w-full py-14 sm:py-24 bg-white relative z-10 overflow-hidden" id="testimonials">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center">
        <LandingSectionHeading
          badgeIcon={<span className="h-2 w-2 shrink-0 rounded-full bg-[#4427AD]" aria-hidden />}
          badgeLabel="Wall of Love"
          badgeTone="brand"
          title="Trusted by Industry Leaders"
          description="Join the founders and tech leaders who have transformed their platforms with our DevOps and scaling solutions."
        />
      </div>

      {/* Infinite Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex items-center py-4">
        
        {/* Gradient Masks for left & right fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[15vw] md:w-[20vw] bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-[15vw] md:w-[20vw] bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

        {/* Animated Marquee Track */}
        <motion.div 
          className="flex space-x-6 w-max px-6"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="flex flex-col bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)] min-w-[300px] sm:min-w-[380px] md:min-w-[480px] max-w-[480px] transition-transform hover:-translate-y-1 duration-300"
            >
              {/* Card Header: Logo & Stars */}
              <div className="flex items-center justify-between mb-8">
                 <div className="w-[180px] flex items-center">
                    {testimonial.logo}
                 </div>
                 <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                 </div>
              </div>
              
              {/* Card Body */}
              <p className="text-gray-600 leading-[1.7] text-[15.5px] flex-1 mb-8">
                {testimonial.text}
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-gray-100 flex items-center gap-4 mt-auto">
                 <img 
                    src={testimonial.authorAvatar} 
                    alt={testimonial.authorName} 
                    className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                 />
                 <div>
                    <h4 className="font-semibold text-gray-900 text-[15px]">{testimonial.authorName}</h4>
                    <p className="text-gray-500 text-[13px]">{testimonial.authorRole}</p>
                 </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

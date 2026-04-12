import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { Button } from '@/components/core/Button/Button';
import { LandingSectionHeading } from '@/components/landing/LandingSectionHeading';

const faqs = [
  {
    question: "Can I completely white-label the platform under my own brand?",
    answer: "Absolutely. SkillSure runs entirely under your brand with zero SaaS watermarks. You can connect your own custom domain, use your logos, brand colors, and all automated emails/notifications are sent using your sender identity."
  },
  {
    question: "How do you protect my video content from piracy and illegal downloads?",
    answer: "Our platform uses multi-DRM technology to encrypt video content. Videos are chopped into segments and securely delivered using signed URLs that change and expire dynamically, heavily mitigating illegal downloads and screen recording."
  },
  {
    question: "Does the platform support Indian payment gateways like UPI?",
    answer: "Yes, we integrate seamlessly with major regional payment gateways like Razorpay, Cashfree, and PayU, supporting UPI, credit/debit cards, and net banking out-of-the-box."
  },
  {
    question: "I have an existing LMS. Can you help migrate my courses and students?",
    answer: "Yes, our dedicated onboarding team assists with full data migrations. We can import bulk user accounts, structure your courses, and map over your video libraries efficiently so you experience zero downtime."
  },
  {
    question: "Do you provide custom-branded mobile apps for Android and iOS?",
    answer: "Yes! In addition to a highly responsive web application, we offer fully native, white-labeled mobile applications for both Android and iOS that we launch directly under your developer accounts."
  },
  {
    question: "How does the AI analytics actually help my ed-tech business?",
    answer: "Our AI systems automatically map student engagement trends to flag users who are likely to drop off. It grades assignments predictively and provides deep granular insights on exactly where students are pausing, rewinding, or struggling within video modules."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-14 sm:py-24 bg-white relative z-10" id="faq">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        
        <LandingSectionHeading
          badgeIcon={<MessageCircleQuestion className="h-3.5 w-3.5 shrink-0 text-[#4427AD]" strokeWidth={2} />}
          badgeLabel="Questions & Answers"
          badgeTone="brand"
          title={
            <>
              All your questions, <br />
              <span className="text-[#4427AD]">answered clearly.</span>
            </>
          }
          description="Everything you need to know about launching, securing, and scaling your educational platform with SkillSure."
        />

        {/* Content split: ~44% promo / ~56% accordion (matches reference proportions) */}
        <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,11fr)_minmax(0,14fr)] lg:gap-12">
          
          {/* Left Promo Card */}
          <div className="relative flex min-h-0 w-full min-w-0 flex-col items-start overflow-hidden rounded-2xl sm:rounded-[32px] border border-purple-100/60 bg-gradient-to-br from-white via-[#FAF8FF] to-[#EDE8FF] p-6 sm:p-10 md:p-12 shadow-[0_4px_24px_-4px_rgba(68,39,173,0.08)]">
             
             {/* Icon */}
             <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-50 bg-white shadow-sm">
                <Sparkles className="h-6 w-6 text-[#4427AD]" />
             </div>

             <h3 className="font-heading mb-4 text-[26px] sm:text-[32px] font-bold leading-[1.15] tracking-tight text-gray-900 md:text-[34px] lg:text-[36px]">
               FAQs can only do
               <br />
               so much.
             </h3>
             <p className="font-body mb-10 text-base leading-[1.6] text-gray-600 md:text-[17px]">
               For the rest, there is our team. Schedule a personalized walkthrough and let us show you exactly how SkillSure fits your specific ed-tech model.
             </p>

             <Button
               variant="primary"
               size="lg"
               title="Request a Demo"
               endIcon={<ArrowRight className="w-4 h-4" />}
               className="mt-auto"
             />
             
             {/* Subtle decorative background blur */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/40 blur-3xl rounded-full pointer-events-none"></div>
          </div>

          {/* Right FAQ Accordion List */}
          <div className="flex min-h-0 min-w-0 w-full flex-col gap-3">
             {faqs.map((faq, index) => {
               const isOpen = openIndex === index;
               
               return (
                 <div 
                   key={index}
                   className={`flex flex-col w-full rounded-2xl overflow-hidden transition-all duration-300 border ${isOpen ? 'bg-gradient-to-b from-white to-[#F8F5FF] border-purple-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]' : 'bg-white border-gray-100/80 hover:border-gray-200'}`}
                 >
                   <button 
                     onClick={() => toggleFAQ(index)}
                     className="w-full flex items-center justify-between p-4 sm:p-6 text-left outline-none cursor-pointer group"
                   >
                     <span className={`text-[14px] sm:text-[15.5px] pr-6 sm:pr-8 ${isOpen ? 'text-[#4427AD] font-medium' : 'text-gray-900 font-medium'}`}>
                       {faq.question}
                     </span>
                     <div className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-[#4427AD]' : 'text-gray-400 group-hover:text-gray-600'}`} />
                     </div>
                   </button>
                   
                   <AnimatePresence>
                     {isOpen ? (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3, ease: "easeInOut" }}
                       >
                         <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 text-gray-500 text-[14px] sm:text-[15px] leading-relaxed">
                           {faq.answer}
                         </div>
                       </motion.div>
                     ) : null}
                   </AnimatePresence>
                 </div>
               );
             })}
          </div>

        </div>
      </div>
    </section>
  );
};

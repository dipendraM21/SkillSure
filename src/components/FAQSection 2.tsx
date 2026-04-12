import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles, MessageCircleQuestion } from 'lucide-react';

const faqs = [
  {
    question: "Can I completely white-label the platform under my own brand?",
    answer: "Absolutely. Synappses runs entirely under your brand with zero SaaS watermarks. You can connect your own custom domain, use your logos, brand colors, and all automated emails/notifications are sent using your sender identity."
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
    <section className="w-full py-24 bg-white relative z-10" id="faq">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
              <MessageCircleQuestion className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Questions & Answers</span>
          </div>
          
          <h2 className="text-[42px] md:text-[52px] font-bold text-[#1a1a24] tracking-tight leading-[1.1] mb-5">
            All your questions, <br />
            <span className="text-[#0055ff]">answered clearly.</span>
          </h2>
          
          <p className="text-gray-500 text-lg md:text-[19px] max-w-2xl leading-relaxed">
            Everything you need to know about launching, securing, and scaling your educational platform with Synappses.
          </p>
        </div>

        {/* Content Split: Left Promo Sidebar & Right Accordion */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          
          {/* Left Promo Card */}
          <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col items-start bg-gradient-to-b from-[#F7FAFF] to-[#E6F0FF] rounded-[32px] p-8 md:p-10 border border-blue-100/60 relative overflow-hidden">
             
             {/* Icon */}
             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-50 mb-8">
                <Sparkles className="w-6 h-6 text-blue-600" />
             </div>

             <h3 className="text-3xl font-bold text-gray-900 leading-snug tracking-tight mb-4 pr-4">
               FAQs can only do<br />so much.
             </h3>
             <p className="text-gray-500 text-[15px] leading-[1.7] mb-10">
               For the rest, there is our team. Schedule a personalized walkthrough and let us show you exactly how Synappses fits your specific ed-tech model.
             </p>

             <button className="mt-auto bg-[#0055ff] hover:bg-blue-700 transition-colors text-white text-[15px] font-medium px-7 py-3.5 rounded-full flex items-center gap-2 shadow-sm">
                Request a Demo
                <ArrowRight className="w-4 h-4" />
             </button>
             
             {/* Subtle decorative background blur */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/40 blur-3xl rounded-full pointer-events-none"></div>
          </div>

          {/* Right FAQ Accordion List */}
          <div className="flex-1 flex flex-col gap-3">
             {faqs.map((faq, index) => {
               const isOpen = openIndex === index;
               
               return (
                 <div 
                   key={index}
                   className={`flex flex-col w-full rounded-2xl overflow-hidden transition-all duration-300 border ${isOpen ? 'bg-gradient-to-b from-white to-[#F4F8FF] border-blue-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]' : 'bg-white border-gray-100/80 hover:border-gray-200'}`}
                 >
                   <button 
                     onClick={() => toggleFAQ(index)}
                     className="w-full flex items-center justify-between p-6 text-left outline-none cursor-pointer group"
                   >
                     <span className={`text-[15.5px] pr-8 ${isOpen ? 'text-blue-600 font-medium' : 'text-gray-900 font-medium'}`}>
                       {faq.question}
                     </span>
                     <div className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
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
                         <div className="px-6 pb-6 pt-1 text-gray-500 text-[15px] leading-relaxed">
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

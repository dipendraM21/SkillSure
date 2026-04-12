import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

export const FooterSection = () => {
  return (
    <footer className="w-full relative pt-20">
      {/* Background fill for the bottom part of the footer */}
      <div className="absolute bottom-0 left-0 w-full h-full sm:h-[80%] bg-[#F4F7FB] -z-10"></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        {/* Top CTA Box */}
        <div className="relative w-full bg-[#5C8DFF] rounded-[40px] px-8 py-14 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-sm mb-20">
           {/* Decorative overlapping circles */}
           <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-[#759FFF] rounded-full opacity-60 pointer-events-none mix-blend-screen blur-2xl"></div>
           <div className="absolute bottom-[-50%] right-[10%] w-[400px] h-[400px] bg-[#437FFF] rounded-full opacity-50 pointer-events-none mix-blend-multiply blur-3xl"></div>
           <div className="absolute top-0 right-0 w-[50%] h-full bg-[#82A9FF] rounded-l-[100%] opacity-20 pointer-events-none transform translate-x-1/4 scale-150"></div>

           {/* CTA Content */}
           <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
             <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
               Start your teaching<br />journey today
             </h2>
             <p className="text-white/90 text-lg leading-relaxed max-w-md">
               Launch your first course in under 5 minutes with our AI-powered LMS dashboard. Join 100+ creators.
             </p>
           </div>

           {/* CTA Button */}
           <div className="relative z-10">
             <button className="bg-white hover:bg-gray-50 text-[#0055ff] transition-colors shadow-sm font-semibold text-[16px] px-8 py-4 rounded-xl flex items-center justify-center whitespace-nowrap">
               Schedule Demo
             </button>
           </div>
        </div>

        {/* Footer Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 pb-16">
          
          {/* Column 1: Brand & Socials */}
          <div className="md:col-span-1">
            <div className="flex items-center text-gray-900 font-bold text-2xl tracking-tighter mb-6">
              <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Synappses
            </div>
            <p className="text-gray-500 text-[14.5px] leading-relaxed mb-8 max-w-[280px]">
              Empowering the next generation of educators with AI-driven tools, seamless UX, and global scalability.
            </p>
            
            <div className="flex items-center space-x-5 text-gray-600">
               <a href="#" className="hover:text-gray-900 transition-colors">
                  {/* X / Twitter logo SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
               </a>
               <a href="#" className="hover:text-gray-900 transition-colors">
                  <Linkedin className="w-5 h-5" />
               </a>
               <a href="#" className="hover:text-gray-900 transition-colors">
                  <Instagram className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Column 2: PRODUCT */}
          <div className="md:ml-auto">
            <h4 className="text-gray-400 font-semibold mb-6 text-[13px] tracking-wider uppercase">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">Platform Overview</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">AI Course Builder</a></li>
              <li className="flex items-center">
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px] mr-2">Integrations</a>
                <span className="bg-blue-100/80 text-blue-600 font-bold text-[10px] uppercase px-2 py-0.5 rounded-full">New</span>
              </li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div className="md:ml-auto">
            <h4 className="text-gray-400 font-semibold mb-6 text-[13px] tracking-wider uppercase">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">Documentation</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">Community Forum</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4: COMPANY */}
          <div className="md:ml-auto">
            <h4 className="text-gray-400 font-semibold mb-6 text-[13px] tracking-wider uppercase">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">Terms and Conditions</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-[14.5px]">Refund Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/60 py-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-[13.5px]">
            © {new Date().getFullYear()} Synappses. Built for the future of education.
          </p>
        </div>

      </div>
    </footer>
  );
};

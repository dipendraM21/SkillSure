import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import skillsureLogo from '@/assets/svg/skillsure-logo-full.svg';

export const FooterSection = () => {
  return (
    <footer id="pricing" className="relative w-full scroll-mt-24">
      {/* Two-tone background: white on top → grey on bottom.
          The CTA card straddles the boundary line to create the overlap effect. */}
      <div className="absolute inset-x-0 top-0 h-[120px] bg-white" />
      <div className="absolute inset-x-0 bottom-0 top-[120px] bg-[#F4F7FB]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-8 md:px-8">

        {/* ── CTA Card ── straddles the white→grey boundary */}
        <div className="relative flex w-full flex-col items-center justify-between gap-6 sm:gap-8 overflow-hidden rounded-2xl sm:rounded-[28px] bg-gradient-to-r from-[#4427AD] via-[#5B3FD6] to-[#8B6FE8] px-6 py-10 sm:px-8 sm:py-12 shadow-2xl md:flex-row md:px-14 md:py-14">

          {/* Large visible white circle — right side accent */}
          <div className="pointer-events-none absolute -right-16 top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-white/15 md:-right-10 md:h-[360px] md:w-[360px]" />
          {/* Softer secondary glow behind circle */}
          <div className="pointer-events-none absolute -right-32 -top-10 h-[240px] w-[240px] rounded-full bg-white/8 blur-2xl" />

          <div className="relative z-10 max-w-lg text-center md:text-left">
            <h2 className="font-heading text-[28px] sm:text-[34px] font-bold leading-[1.12] tracking-tight text-white md:text-[42px]">
              Start your teaching
              <br />
              journey today
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/90 md:text-lg">
              Launch your first course in under 5 minutes with our AI-powered LMS dashboard. Join 100+ creators.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <button className="cursor-pointer whitespace-nowrap rounded-[14px] border border-white/80 bg-white px-8 py-3.5 text-[15px] font-semibold text-[#4427AD] shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
              Schedule Demo
            </button>
          </div>
        </div>

        {/* ── Footer links grid ── */}
        <div className="grid grid-cols-2 gap-8 pb-14 pt-14 sm:pt-16 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-8">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="mb-6 flex w-full items-center">
              <img src={skillsureLogo} alt="SkillSure Logo" className="h-5 w-auto" />
            </div>
            <p className="mb-8 max-w-[280px] text-[14.5px] leading-relaxed text-gray-500">
              Empowering the next generation of educators with AI-driven tools, seamless UX, and global scalability.
            </p>

            <div className="flex items-center space-x-5 text-gray-500">
              <a href="#" className="transition-colors hover:text-gray-900">
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a href="#" className="transition-colors hover:text-gray-900">
                <Linkedin className="h-[18px] w-[18px]" />
              </a>
              <a href="#" className="transition-colors hover:text-gray-900">
                <Instagram className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* PRODUCT */}
          <div className="md:ml-auto">
            <h4 className="mb-4 sm:mb-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-gray-400">Product</h4>
            <ul className="space-y-3.5">
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">Platform Overview</a></li>
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">AI Course Builder</a></li>
              <li className="flex items-center gap-2">
                <a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">Integrations</a>
                <span className="rounded-full bg-purple-100/80 px-2 py-0.5 text-[10px] font-bold uppercase text-[#4427AD]">New</span>
              </li>
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">Pricing</a></li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="md:ml-auto">
            <h4 className="mb-4 sm:mb-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-gray-400">Resources</h4>
            <ul className="space-y-3.5">
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">Documentation</a></li>
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">Community Forum</a></li>
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">Help Center</a></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="md:ml-auto">
            <h4 className="mb-4 sm:mb-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-gray-400">Company</h4>
            <ul className="space-y-3.5">
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">Terms and Conditions</a></li>
              <li><a href="#" className="text-[14.5px] text-gray-600 transition-colors hover:text-gray-900">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between border-t border-gray-200/50 py-8 md:flex-row">
          <p className="text-[13px] text-gray-400">
            © {new Date().getFullYear()} SkillSure. Built for the future of education.
          </p>
        </div>
      </div>
    </footer>
  );
};

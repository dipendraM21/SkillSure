import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ChevronRight, Rocket, LayoutGrid, Calendar, Bell, BookOpen, Activity, Copy, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/core/Button/Button';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';
import { ScrollStepsSection, StepData } from '@/components/ScrollStepsSection';
import { CapabilitiesSection } from '@/components/CapabilitiesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { FooterSection } from '@/components/FooterSection';
import skillsureLogo from '@/assets/svg/skillsure-logo-full.svg';

type NavSection = 'home' | 'features' | 'pricing';

const NavbarNavLink = ({
  id,
  label,
  activeNav,
  onSelect,
}: {
  id: NavSection;
  label: string;
  activeNav: NavSection;
  onSelect: (id: NavSection) => void;
}) => {
  const isActive = activeNav === id;
  return (
    <a
      href={`#${id}`}
      onClick={() => onSelect(id)}
      className={cn(
        'font-body px-4 py-2 text-sm font-semibold transition-colors relative inline-flex flex-col items-center',
        isActive ? 'text-[#4427AD]' : 'text-slate-600 hover:text-[#4427AD]',
      )}
    >
      <span className="relative inline-block pb-0.5">
        {label}
        {isActive ? (
          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#4427AD]" aria-hidden />
        ) : null}
      </span>
    </a>
  );
};

const NavbarMobileNavLink = ({
  id,
  label,
  delay,
  onNavigate,
}: {
  id: NavSection;
  label: string;
  delay: number;
  onNavigate: (id: NavSection) => void;
}) => (
  <motion.a
    href={`#${id}`}
    onClick={() => onNavigate(id)}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    className="font-heading text-[32px] font-bold tracking-tight text-[#1a1a24]"
  >
    {label}
  </motion.a>
);

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<NavSection>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const syncFromHash = () => {
      const raw = window.location.hash.slice(1);
      if (raw === 'features' || raw === 'pricing' || raw === 'home') {
        setActiveNav(raw);
      } else if (!raw) {
        setActiveNav('home');
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMobileNav = (id: NavSection) => {
    setActiveNav(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Top bar ── */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-[10050] flex w-full justify-center px-4 pt-4">
        <motion.nav
          initial={false}
          animate={{
            width: isScrolled ? "min(780px, 92vw)" : "min(1200px, 96vw)",
            borderRadius: isScrolled ? "9999px" : "16px",
            y: isScrolled ? 6 : 0,
            backgroundColor: isScrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.97)",
            boxShadow: isScrolled
              ? "0 8px 28px rgba(0,0,0,0.07), 0 0 0 1px rgba(255,255,255,0.85) inset"
              : "0 2px 8px rgba(0,0,0,0.04)",
            border: isScrolled ? "1px solid rgba(255,255,255,0.75)" : "1px solid rgba(0,0,0,0.06)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="pointer-events-auto relative z-[10050] mx-auto flex items-center justify-between backdrop-blur-xl backdrop-saturate-150"
          style={{
            paddingLeft: isScrolled ? "20px" : "32px",
            paddingRight: isScrolled ? "6px" : "10px",
            paddingTop: isScrolled ? "6px" : "10px",
            paddingBottom: isScrolled ? "6px" : "10px",
          }}
        >
          <div className="flex flex-1 items-center justify-start gap-3">
            <img src={skillsureLogo} alt="SkillSure" className="h-5 w-auto" />
          </div>

          <div className="hidden items-center gap-0.5 md:flex">
            <NavbarNavLink id="home" label="Home" activeNav={activeNav} onSelect={setActiveNav} />
            <NavbarNavLink id="features" label="Features" activeNav={activeNav} onSelect={setActiveNav} />
            <NavbarNavLink id="pricing" label="Pricing" activeNav={activeNav} onSelect={setActiveNav} />
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="hidden md:block">
              <Button variant="primary" size="sm" title="Book Demo" endIcon={<ChevronRight className="h-3.5 w-3.5" />} />
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile drawer (slides from right) ── */}
      <AnimatePresence>
        {mobileOpen ? (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[10060] bg-black/20 backdrop-blur-sm md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-[10070] flex w-[85vw] max-w-[380px] flex-col bg-white shadow-2xl md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <img src={skillsureLogo} alt="SkillSure" className="h-5 w-auto" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              {/* Nav label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-8 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4427AD]"
              >
                Navigation
              </motion.p>

              {/* Links */}
              <div className="mt-6 flex flex-col gap-5 px-6">
                <NavbarMobileNavLink id="home" label="Home" delay={0.08} onNavigate={handleMobileNav} />
                <NavbarMobileNavLink id="features" label="Features" delay={0.14} onNavigate={handleMobileNav} />
                <NavbarMobileNavLink id="pricing" label="Pricing" delay={0.2} onNavigate={handleMobileNav} />
              </div>

              {/* Divider */}
              <div className="mx-6 mt-8 border-t border-gray-100" />

              {/* Promo card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4 }}
                className="mx-6 mt-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-[#FAF8FF] to-[#EDE8FF] p-5"
              >
                <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#4427AD]">
                  <Sparkles className="h-4 w-4" />
                  New Scale Plans
                </div>
                <p className="text-[13.5px] leading-relaxed text-gray-500">
                  Our Pro &amp; Enterprise plans are now 20% off for annual bookings.
                </p>
                <a href="#pricing" onClick={() => setMobileOpen(false)} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#4427AD]">
                  View Pricing <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>

              {/* Bottom CTA */}
              <div className="mt-auto flex flex-col gap-3 px-6 pb-8 pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.35 }}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    title="Request Demo"
                    endIcon={<ArrowRight className="h-4 w-4" />}
                    className="w-full"
                  />
                </motion.div>
                <motion.a
                  href="#"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  className="text-center text-sm font-medium text-[#4427AD]"
                >
                  Sign in to Academy
                </motion.a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};



const FloatingBadge = () => (
    <div className="inline-flex items-center px-1.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#DDD6FE] shadow-sm mb-8 relative z-10">
        <span className="bg-[#4427AD] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">New</span>
        <span className="text-[#4427AD] text-xs font-semibold px-4 tracking-wide uppercase">Smart Candidate Assessment</span>
    </div>
);

const HeroTitle = () => {
    const words = ["assess", "evaluate", "hire"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <h1 className="text-[38px] sm:text-5xl md:text-[70px] font-medium text-[#1a1a24] tracking-[-0.02em] leading-[1.08] mb-8">
            Everything you need
            <br />
            to <span className="relative inline-block overflow-hidden [vertical-align:bottom]">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={words[index]}
                        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -30, filter: "blur(4px)" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-block text-[#4427AD]"
                    >
                        {words[index]}
                    </motion.span>
                </AnimatePresence>
            </span> talent
        </h1>
    );
};

const DashboardMockup = () => (
    <div className="relative mx-auto mt-12 sm:mt-20 max-w-6xl z-10">
      <div className="rounded-2xl sm:rounded-[40px] overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex p-3 sm:p-6">
         {/* Sidebar Mock */}
         <div className="w-[240px] pl-4 pr-6 pt-6 pb-12 flex-col items-start border-r border-gray-100 hidden lg:flex">
             <div className="flex items-center mb-10 w-full">
                 <img src={skillsureLogo} alt="SkillSure Logo" className="h-[28px] w-auto" />
             </div>
             
             <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 w-full">All Category</div>
             
             <div className="flex flex-col space-y-2 w-full">
                 {[
                     { icon: LayoutGrid, text: 'Dashboard', active: true },
                     { icon: BookOpen, text: 'Assessments' },
                     { icon: Copy, text: 'Question Bank' },
                     { icon: Bell, text: 'Candidates' },
                     { icon: Activity, text: 'Results' },
                     { icon: Activity, text: 'Reports' },
                     { icon: Activity, text: 'Settings' },
                 ].map((item, i) => (
                     <div key={i} className={`flex items-center px-3 py-2.5 rounded-xl cursor-pointer transition ${item.active ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                         <item.icon className={`w-5 h-5 mr-3 ${item.active ? 'text-gray-800' : 'text-gray-400'}`} strokeWidth={2}/>
                         <span className="text-sm">{item.text}</span>
                     </div>
                 ))}
             </div>
             
             <div className="mt-auto pt-8 flex flex-col space-y-2 w-full">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Help & Support</div>
                <div className="flex items-center px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 cursor-pointer">
                    <Activity className="w-5 h-5 mr-3 text-gray-400"/>
                    <span className="text-sm">Help Center</span>
                </div>
                <div className="flex items-center px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 cursor-pointer">
                    <Activity className="w-5 h-5 mr-3 text-gray-400"/>
                    <span className="text-sm">Settings</span>
                </div>
             </div>
         </div>
         
         {/* Main Content Area */}
         <div className="flex-1 lg:pl-10 lg:pr-4 pt-6">
            <div className="flex items-center justify-between mb-8 w-full">
                <h1 className="text-base sm:text-2xl font-medium text-gray-900 truncate">Hi Heel, <span className="font-normal text-gray-500 hidden sm:inline">Good Morning 👋</span></h1>
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center relative cursor-pointer">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="relative hidden md:block">
                        <Activity className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search here..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-[280px] focus:outline-none focus:ring-2 focus:ring-purple-100" />
                    </div>
                </div>
            </div>
            
            {/* Purple Banner */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl sm:rounded-3xl p-5 sm:p-10 text-white relative overflow-hidden shadow-lg shadow-purple-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-normal mb-6">Overview</div>
                <h2 className="text-2xl sm:text-4xl font-medium mb-4 leading-tight max-w-md">Evaluate candidates<br/>with clarity</h2>
                <p className="text-purple-100 mb-8 max-w-lg text-sm leading-relaxed">Create structured assessments, share links, and track real performance in one place.</p>
                <div className="flex items-center space-x-4 relative z-10">
                    <button className="bg-[#1a1a24] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:bg-black transition">Create Assessment</button>
                    <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-semibold transition backdrop-blur-sm">View Results</button>
                </div>
            </div>
            
            {/* Search filters mock */}
            <div className="flex items-center justify-between mt-8">
                <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-400 text-sm flex items-center w-full max-w-md border border-gray-100">
                    <Activity className="w-4 h-4 mr-2"/>
                    Search courses by title, instructor, or category...
                </div>
               <div className="flex items-center space-x-3 hidden sm:flex">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white shadow-sm flex items-center">
                        Most Popular <Activity className="w-4 h-4 ml-2"/>
                    </button>
                    <button className="p-2 bg-gray-500 text-white rounded-lg shadow-sm">
                       <Activity className="w-5 h-5"/>
                    </button>
               </div>
            </div>
            
            {/* Analytics Overview Title */}
            <div className="flex items-center justify-between mt-10 mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
                <div className="flex items-center text-sm text-gray-500 px-3 py-1.5 border border-gray-200 rounded-md">
                    <Calendar className="w-4 h-4 mr-2" />
                    Jun - 09 - 2023 <Activity className="w-3 h-3 ml-2"/>
                </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full opacity-60">
                {[1,2,3,4].map((i) => (
                    <div key={i} className="bg-white border flex items-center border-gray-100 rounded-2xl p-4 shadow-sm">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg mr-3"></div>
                        <div className="space-y-2 flex-1">
                            <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                            <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
      
      {/* Decorative gradient blur under dashboard */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-[#4427AD]/10 blur-[100px] z-0"></div>
    </div>
);

const mockSteps: StepData[] = [
  {
    id: "01",
    title: "Create Your Assessment",
    description: "Build tests using MCQs, SJT, data-based questions, and adaptive flows based on role and industry.",
    image: (
      <div className="w-full h-full bg-[#f8f9fc] flex flex-col justify-center items-center relative p-6">
        <div className="absolute top-4 left-4 flex space-x-1.5 opacity-60">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <div className="flex gap-3 w-full h-[65%] mt-6 relative z-10">
           {/* video mockup */}
           <div className="w-7/12 bg-slate-300 rounded-2xl overflow-hidden shadow-sm relative border border-slate-200/50">
               <div className="absolute inset-0 bg-slate-700/10"></div>
           </div>
           <div className="w-5/12 flex flex-col gap-3">
               <div className="h-1/2 bg-slate-200 rounded-2xl overflow-hidden shadow-sm relative border border-slate-200/50"><div className="absolute inset-0 bg-slate-700/5"></div></div>
               <div className="h-1/2 bg-slate-200 rounded-2xl overflow-hidden shadow-sm relative border border-slate-200/50"><div className="absolute inset-0 bg-slate-700/5"></div></div>
           </div>
        </div>
        {/* Floating Call Controls */}
        <div className="flex items-center space-x-2 mt-auto mb-2 bg-white backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl shadow-black/5 border border-slate-100 z-20">
           <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-50 transition cursor-pointer text-slate-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
           </div>
           <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-50 transition cursor-pointer text-slate-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 10-4 4 6 6 4-16-28-8z"></path></svg>
           </div>
           <div className="w-10 h-10 ml-2 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 cursor-pointer text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="22" y1="2" x2="2" y2="22"></line></svg>
           </div>
        </div>
      </div>
    )
  },
  {
    id: "02",
    title: "Share Assessment Link",
    description: "Generate a secure link and invite candidates directly — no manual setup required.",
    image: (
      <div className="w-full h-full bg-white flex flex-col pt-8 relative border-t-8 border-gray-50">
         <div className="absolute top-[-2px] left-4 flex space-x-1.5 opacity-50">
           <div className="w-2 h-2 rounded-full bg-red-400"></div>
           <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
           <div className="w-2 h-2 rounded-full bg-green-400"></div>
         </div>
         <div className="text-center mt-6">
           <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug">Plans designed for<br/>your <span className="text-[#4427AD]">smarter hiring</span></h3>
           <div className="flex justify-center mt-6">
              <div className="bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-medium z-10 mr-[-10px] shadow-sm">Monthly Billing</div>
              <div className="bg-white border border-gray-200 text-slate-700 px-4 py-1.5 pl-6 flex items-center rounded-r-full text-[10px] font-medium z-0">Annual Billing <span className="ml-2 bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wide">Save 20%</span></div>
           </div>
         </div>
         <div className="mt-8 flex w-full space-x-4 px-8 opacity-90 pb-8 flex-1 items-end">
            <div className="flex-1 bg-[#4427AD] rounded-2xl p-5 text-white shadow-xl shadow-[#4427AD]/20 translate-y-4 relative z-10 border border-[#6B4FD8]/50">
                <div className="text-[10px] font-semibold mb-3 flex items-center justify-between">Beginner <span className="bg-white/20 px-2 py-0.5 rounded-full text-[8px] font-bold">Most popular</span></div>
                <div className="text-4xl font-bold mb-2">$50<span className="text-xs font-medium opacity-70 ml-1">/monthly</span></div>
                <div className="text-[9px] text-purple-200 leading-relaxed mt-4">Perfect for developers building web agents and data workflows.</div>
            </div>
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 overflow-hidden shadow-sm">
                <div className="text-[10px] font-semibold text-slate-800 mb-3">Enterprise</div>
                <div className="text-4xl font-bold text-slate-900 mb-2">$90<span className="text-xs font-medium text-slate-400 ml-1">/monthly</span></div>
                <div className="text-[9px] text-slate-500 leading-relaxed mt-4">Perfect for production apps scaling across teams globally.</div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: "03",
    title: "Evaluate & Analyze Results",
    description: "Track performance with detailed scoring, behavioral insights, and real-time evaluation. ",
    image: (
      <div className="w-full h-full bg-[#f8f9fc] relative flex flex-col p-6 shadow-inner">
         <div className="flex items-center space-x-3 mb-6 opacity-60">
             <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-xs">🚀</div>
             <div className="h-3 w-20 bg-slate-200 rounded"></div>
         </div>
         <div className="flex flex-1 gap-4">
             <div className="w-[80px] h-full flex flex-col gap-3 border-r border-slate-200/60 pr-4 opacity-50">
                <div className="h-2 w-10 bg-slate-300 rounded mb-2"></div>
                <div className="h-6 w-full bg-slate-200 rounded-md"></div>
                <div className="h-4 w-full bg-slate-100 rounded-md"></div>
                <div className="h-4 w-full bg-slate-100 rounded-md"></div>
             </div>
             <div className="flex-1 flex flex-col space-y-4">
                 <div className="flex items-center justify-between opacity-50">
                     <div className="h-4 w-24 bg-slate-200 rounded"></div>
                     <div className="w-6 h-6 rounded-full bg-purple-100"></div>
                 </div>
                 <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 p-4 relative overflow-hidden flex-1 flex flex-col justify-center items-center text-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] -mr-10 -mt-10"></div>
                    <div className="w-12 h-12 bg-[#4427AD] rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-[#4427AD]/20 z-10"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                    <div className="text-sm font-bold text-slate-800 z-10 mb-2">Welcome to your Dashboard</div>
                    <div className="h-2 w-3/4 bg-slate-100 rounded-sm mx-auto z-10"></div>
                 </div>
             </div>
         </div>
      </div>
    )
  }
];

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#F2F2F2] font-body overflow-x-clip">
            <Navbar />

            <div className="relative">
                <AnimatedGridBackground />

                <main id="home" className="relative z-10 scroll-mt-28 pt-36 lg:pt-44 pb-16 flex flex-col items-center justify-center overflow-hidden min-h-screen">
                    <div className="max-w-4xl mx-auto px-6 text-center pt-4">
                       <FloatingBadge />

                       <HeroTitle />

                       <p className="text-base sm:text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                         A complete assessment platform to evaluate candidates using structured tests, behavioral analysis, and real performance insights.
                       </p>

                       <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                         <Button
                           variant="primary"
                           size="lg"
                           title="Request Demo"
                           endIcon={<ChevronRight className="w-5 h-5" strokeWidth={2.5} />}
                           className="w-full sm:w-auto"
                         />
                         <Button
                           variant="glassy"
                           size="lg"
                           title="Start Assessment"
                           className="w-full sm:w-auto"
                         />
                       </div>
                    </div>

                    <div className="w-full px-4 overflow-hidden relative">
                       <DashboardMockup />
                    </div>
                </main>
            </div>

            <CapabilitiesSection />

            <ScrollStepsSection
              steps={mockSteps}
              intro={{
                badgeIcon: <Rocket className="h-4 w-4 shrink-0 text-[#4427AD]" strokeWidth={2} />,
                badgeLabel: 'Getting Started',
                title: 'From test creation to candidate evaluation in simple steps',
                description:
                  'Set up your assessment, share it with candidates, and get structured insights all in a streamlined workflow.',
              }}
            />

            <TestimonialsSection />

            <FAQSection />

            <FooterSection />
        </div>
    );
};

export default LandingPage;

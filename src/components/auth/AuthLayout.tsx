import React, { PropsWithChildren } from 'react';
import skillsureLogo from '@/assets/svg/skillsure-logo-full.svg'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-bg-light text-text-primary-default min-h-screen flex flex-col relative overflow-hidden font-body">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-primary/10"></div>
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[50%] rounded-full blur-[120px] bg-secondary-light/20"></div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 bg-transparent">
        <div className="w-full max-w-[480px]">
          {/* Brand — left-aligned to match form card edge */}
          <header className="mb-10 flex flex-col items-start gap-2 text-left">
            <img src={skillsureLogo} alt="SkillSure" className="h-9 w-auto md:h-10" />
            <p className="max-w-[20rem] text-sm font-medium leading-snug tracking-tight text-text-secondary-default">
              The Cognitive Sanctuary Workspace
            </p>
          </header>

          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto border-t border-main-border/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={skillsureLogo} alt="SkillSure" className="h-5 w-auto" />
            <span className="text-xs font-normal text-text-secondary-default italic">© 2024 SkillSure. Cognitive Sanctuary Design.</span>
          </div>
          <div className="flex gap-6">
            <a className="text-xs font-normal text-text-secondary-default hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs font-normal text-text-secondary-default hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-xs font-normal text-text-secondary-default hover:text-primary transition-colors" href="#">Security</a>
            <a className="text-xs font-normal text-text-secondary-default hover:text-primary transition-colors" href="#">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;

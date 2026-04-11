import React, { PropsWithChildren } from 'react';

interface LoginCardProps extends PropsWithChildren {
  title: string;
  description: string;
}

const LoginCard = ({ title, description, children }: LoginCardProps) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_6px_-1px_rgba(68,39,173,0.04),0_10px_15px_-3px_rgba(79,79,79,0.08)]">
      <header className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-text-primary-default tracking-tight mb-2">{title}</h1>
        <p className="text-text-secondary-default text-sm">{description}</p>
      </header>
      {children}
    </div>
  );
};

export default LoginCard;

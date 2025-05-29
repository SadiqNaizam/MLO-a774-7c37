import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn('text-center py-8', className)}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground uppercase tracking-tight">
        AI QUOTIENT (AIQ) ASSESSMENT
      </h1>
      <p className="mt-2 text-base sm:text-lg text-foreground/90 uppercase tracking-wider">
        SCREENING AI-FRIENDLY TALENT
      </p>
    </header>
  );
};

export default Header;

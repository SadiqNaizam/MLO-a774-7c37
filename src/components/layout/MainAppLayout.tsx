import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  // Layout Requirements:
  // overall.definition: "flex flex-col w-full h-full justify-center items-center"
  // overall.sizing.container: "w-[80%] max-w-[1024px] mx-auto"
  // overall.sizing.mainContent: "flex flex-col gap-6"

  return (
    <div
      className={cn(
        'flex flex-col w-full min-h-screen justify-center items-center bg-background text-foreground p-4 sm:p-6 md:p-8',
        className
      )}
    >
      <div className="w-[80%] max-w-[1024px] mx-auto flex flex-col">
        <Header />
        <main className="flex flex-col gap-6 mt-4 md:mt-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;

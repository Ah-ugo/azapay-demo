/** @format */

'use client';
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMedia';
import Header from './header';
import Sidebar from './sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className='min-h-screen bg-slate-50 relative'>
      {/* Header */}
      <div className='relative z-50'>
        <Header
          isMobileSidebarOpen={isMobileSidebarOpen}
          toggleMobileSidebar={toggleMobileSidebar}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isDesktop ? 'lg:ml-80' : ''
        }`}
      >
        <div className='p-6 max-w-7xl mx-auto'>{children}</div>
      </main>
    </div>
  );
}

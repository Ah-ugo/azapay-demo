/** @format */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMedia';

interface HeaderProps {
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
}

export default function Header({
  isMobileSidebarOpen,
  toggleMobileSidebar,
}: HeaderProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <header className='bg-slate-800 border-b border-slate-700 h-16 w-full fixed top-0 left-0 z-50 px-4 shadow-md'>
      <div className='flex items-center justify-between h-full px-2 max-w-7xl mx-auto'>
        <div className='flex items-center'>
          {!isDesktop && (
            <button
              onClick={toggleMobileSidebar}
              className='p-2 text-white hover:bg-slate-700 rounded-lg transition-colors mr-4'
              aria-label='Toggle menu'
              aria-expanded={isMobileSidebarOpen}
            >
              <AnimatePresence mode='wait'>
                {isMobileSidebarOpen ? (
                  <motion.div
                    key='close'
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key='menu'
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}
          {!isDesktop && (
            <motion.div className='flex items-center min-w-0'>
              <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-2'>
                <span className='text-slate-900 font-bold text-sm'>Z</span>
              </div>
              <span className='text-white font-bold text-xl truncate'>
                ZynkBank
              </span>
            </motion.div>
          )}
        </div>
        <div className='flex items-center space-x-4'>
          <div className='w-8 h-8 bg-slate-600 rounded-full flex-shrink-0 flex items-center justify-center'>
            <span className='text-white text-xs font-medium'>JK</span>
          </div>
        </div>
      </div>
    </header>
  );
}

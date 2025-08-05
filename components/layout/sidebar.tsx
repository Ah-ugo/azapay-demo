/** @format */
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMedia';
import {
  BarChart3,
  FileText,
  ArrowLeftRight,
  PlusCircle,
  CreditCard,
  Building,
  DollarSign,
  HelpCircle,
  Share2,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: BarChart3,
    href: '/overview',
  },
  {
    id: 'statements',
    label: 'Statements & Reports',
    icon: FileText,
    href: '/statements',
  },
  {
    id: 'transfers',
    label: 'Electronic Fund Transfers',
    icon: ArrowLeftRight,
    href: '/transfers',
    subItems: [
      {
        label: 'Transfer funds to External Account',
        href: '/transfers/external',
      },
      { label: 'Wire Transfers', href: '/transfers/wire' },
      { label: 'ACH Transfers', href: '/transfers/ach' },
    ],
  },
  {
    id: 'new-account',
    label: 'Open New account',
    icon: PlusCircle,
    href: '/new-account',
  },
  {
    id: 'loans',
    label: 'Loans',
    icon: CreditCard,
    href: '/loans',
  },
  {
    id: 'external-accounts',
    label: 'External Accounts',
    icon: Building,
    href: '/external-accounts',
  },
  {
    id: 'payments',
    label: 'Transact-Payments',
    icon: DollarSign,
    href: '/payments',
  },
];

interface MenuItemProps {
  item: (typeof menuItems)[0];
  index: number;
  expandedSections: string[];
  toggleSection: (section: string) => void;
  onClose: () => void;
}

function MenuItem({
  item,
  index,
  expandedSections,
  toggleSection,
  onClose,
}: MenuItemProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
    >
      <div className='space-y-1'>
        <motion.a
          href={hasSubItems ? '#' : item.href}
          className={`flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
            expandedSections.includes(item.id)
              ? 'text-yellow-400 bg-slate-700'
              : 'text-slate-300 hover:bg-slate-700'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault();
              toggleSection(item.id);
            } else if (!isDesktop) {
              onClose();
            }
          }}
        >
          <div className='flex items-center min-w-0 flex-1'>
            <item.icon size={20} className='mr-3 flex-shrink-0' />
            <span className='font-medium truncate'>{item.label}</span>
          </div>
          {hasSubItems && (
            <div className='w-5 h-5 flex items-center justify-center'>
              {expandedSections.includes(item.id) ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
          )}
        </motion.a>

        {hasSubItems && expandedSections.includes(item.id) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='pl-6 ml-3 border-l-2 border-slate-600 space-y-1 overflow-hidden'
          >
            {item.subItems.map((subItem: any, subIndex: any) => (
              <motion.a
                key={subIndex}
                href={subItem.href}
                className={`block py-2 px-3 rounded transition-colors truncate ${
                  subIndex === item.subItems.length - 1
                    ? 'text-yellow-400 border-l-2 border-yellow-400 -ml-3 pl-5'
                    : 'text-slate-300 hover:text-white'
                }`}
                whileHover={{ x: 5 }}
                onClick={() => !isDesktop && onClose()}
              >
                {subItem.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'transfers',
  ]);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (!isDesktop && isMobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileOpen, isDesktop, onClose]);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={sidebarRef}
        className={`fixed top-0 left-0 bottom-0 w-80 bg-slate-800 z-50 shadow-xl ${
          isDesktop ? 'lg:block' : ''
        }`}
        initial={isDesktop ? 'open' : 'closed'}
        animate={isDesktop || isMobileOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      >
        {/* Scrollable Container */}
        <div className='h-full flex flex-col overflow-y-auto pt-0'>
          {/* Logo for Desktop */}
          {isDesktop && (
            <motion.div
              className='p-6 border-b border-slate-700'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className='flex items-center'>
                <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-2'>
                  <span className='text-slate-900 font-bold text-sm'>Z</span>
                </div>
                <span className='text-white font-bold text-xl'>ZynkBank</span>
              </div>
            </motion.div>
          )}

          {/* User Profile Section */}
          <div className='p-6 border-b border-slate-700'>
            <motion.div
              className='flex items-center'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className='w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mr-3 overflow-hidden'>
                <img
                  src='https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
                  alt='User Avatar'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='min-w-0 flex-1'>
                <h3 className='font-semibold text-white truncate'>
                  Jake Kanyinda
                </h3>
                <p className='text-slate-400 text-sm truncate'>
                  jk2013@gmail.com
                </p>
              </div>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            </motion.div>
          </div>

          {/* Navigation Menu */}
          <div className='flex-1 overflow-y-auto'>
            <nav className='p-4 space-y-2'>
              {menuItems.map((item, index) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  index={index}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  onClose={onClose}
                />
              ))}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className='p-4 border-t border-slate-700 space-y-2'>
            <motion.a
              href='/support'
              className='flex items-center px-3 py-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !isDesktop && onClose()}
            >
              <HelpCircle size={20} className='mr-3 flex-shrink-0' />
              <span className='truncate'>Contact support</span>
            </motion.a>
            <motion.a
              href='/share'
              className='flex items-center px-3 py-3 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !isDesktop && onClose()}
            >
              <Share2 size={20} className='mr-3 flex-shrink-0' />
              <span className='truncate'>Share with friends</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/project' },
    { name: 'Journal', path: '/blog' },
    { name: 'Gallery', path: '/media' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold tracking-tighter flex items-center gap-2">
          <span className="text-red-600">S</span>
          <span className="hidden sm:inline tracking-[0.2em]">ANDIPTO</span>
          <span className="text-red-600">R</span>
          <span className="hidden sm:inline tracking-[0.2em]">OY</span>
        </Link>
        
        <div className="flex gap-4 md:gap-8 items-center overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-[10px] md:text-sm font-medium uppercase tracking-widest transition-colors hover:text-red-500 whitespace-nowrap ${
                pathname === link.path ? 'text-red-600' : 'text-zinc-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

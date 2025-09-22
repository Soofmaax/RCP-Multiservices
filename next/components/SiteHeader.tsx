'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 ${
        scrolled ? 'bg-white/85 shadow-sm' : 'bg-white/80'
      }`}
    >
      <div
        className={`container flex items-center justify-between transition-all duration-200 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        <Link
          href="/"
          className={`font-semibold transition-transform duration-200 ${
            scrolled ? 'text-base' : 'text-lg'
          }`}
        >
          RCP Multiservices
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/zones" className="text-gray-700 hover:underline">
            Zones
          </Link>
          <Link href="/services" className="text-gray-700 hover:underline">
            Services
          </Link>
          <Link href="/contact" className="text-gray-700 hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
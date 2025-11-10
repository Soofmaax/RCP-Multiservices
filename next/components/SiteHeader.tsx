'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  const base =
    'relative inline-block text-gray-700 transition-colors hover:text-blue-700';
  const underline =
    'after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full';
  const activeCls = active ? 'text-blue-700 font-medium after:w-full' : '';
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`${base} ${underline} ${activeCls}`}
    >
      {children}
    </Link>
  );
}

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
          <NavLink href="/zones">Zones</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
      </div>
    </motion.header>
  );
}
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
      <div className="container py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
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
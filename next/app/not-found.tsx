'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="container py-16 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <motion.div
          className="text-7xl sm:text-8xl font-bold text-blue-600 select-none"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          404
        </motion.div>
        <motion.div
          className="absolute -top-6 -right-8 hidden sm:block"
          initial={{ rotate: -8, opacity: 0 }}
          animate={{ rotate: 0, opacity: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Petite bulle décorative */}
          <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="36" fill="#3B82F6" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.h1
        className="mt-6 text-2xl font-semibold"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        Oups… cette page s’est égarée.
      </motion.h1>

      <motion.p
        className="mt-2 text-gray-600 max-w-xl"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        La page que vous cherchez n’existe pas ou a été déplacée.
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
      >
        <Link
          href="/"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded transition-transform duration-150 hover:scale-[1.03]"
        >
          Retourner à l’accueil
        </Link>
      </motion.div>
    </main>
  );
}
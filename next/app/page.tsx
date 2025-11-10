'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import GoogleReviewsBadge from '@/components/GoogleReviewsBadge';

export default function HomePage() {
  return (
    <main className="container py-8">
      <motion.h1
        className="text-3xl font-semibold"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        RCP Multiservices
      </motion.h1>
      <motion.p
        className="mt-3 text-gray-700"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        Aide à domicile, ménage, jardinage et accompagnement en Île-de-France et en Normandie.
      </motion.p>

      <motion.div
        className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Link
          href="/zones"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-transform duration-150 hover:scale-[1.03]"
        >
          Voir nos zones d&apos;intervention
        </Link>
        <Link
          href="/services"
          className="inline-block text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded transition-transform duration-150 hover:scale-[1.03]"
        >
          Voir nos services
        </Link>
        <Link
          href="/contact"
          className="inline-block text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded transition-transform duration-150 hover:scale-[1.03]"
        >
          Contact
        </Link>
        <GoogleReviewsBadge />
      </motion.div>
    </main>
  );
}
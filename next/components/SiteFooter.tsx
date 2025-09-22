'use client';

import { motion } from 'framer-motion';
import GoogleReviewsBadge from '@/components/GoogleReviewsBadge';

export default function SiteFooter() {
  return (
    <motion.footer
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
      className="border-t bg-gray-900"
    >
      <div className="container py-6 flex items-center justify-between">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} RCP Multiservices — Île-de-France &amp; Normandie
        </p>
        <GoogleReviewsBadge variant="inverted" />
      </div>
    </motion.footer>
  );
}
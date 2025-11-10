'use client';

import { motion } from 'framer-motion';
import GoogleReviewsBadge from '@/components/GoogleReviewsBadge';

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="text-gray-300 hover:text-blue-400 transition-colors"
    >
      {children}
    </a>
  );
}

export default function SiteFooter() {
  return (
    <motion.footer
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
      className="border-t bg-gray-900"
    >
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          © {new Date().getFullYear()} RCP Multiservices — Île-de-France &amp; Normandie
        </p>

        <div className="flex items-center gap-5">
          <SocialIcon
            href="https://www.linkedin.com/company/NOM-DE-L-ENTREPRISE-PLACEHOLDER"
            label="LinkedIn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4 0 4.75 2.63 4.75 6.05V24h-4v-7.1c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.75 1.86-2.75 3.78V24h-4V8z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://twitter.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER" label="Twitter">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2H21.5l-7.5 8.58L23.5 22H16.7l-5.2-6.27L5.5 22H2.244l8.06-9.21L1.5 2h6.96l4.7 5.55L18.244 2zm-1.2 18h1.86L7.04 3.5H5.08L17.044 20z" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://instagram.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER" label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.4a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.16.46.346 1.26.4 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.4 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.46.16-1.26.346-2.43.4-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.4a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.16-.46-.346-1.26-.4-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.97.4-2.43A4.9 4.9 0 0 1 3.82 2.95 4.9 4.9 0 0 1 5.59 1.8c.46-.16 1.26-.346 2.43-.4C9.284 1.342 9.67 1.33 12 1.33m0 1.82c-3.17 0-3.545.012-4.79.07-1.03.048-1.59.22-1.96.37-.49.19-.84.41-1.21.78-.37.37-.59.72-.78 1.21-.15.37-.322.93-.37 1.96-.058 1.245-.07 1.62-.07 4.79s.012 3.545.07 4.79c.048 1.03.22 1.59.37 1.96.19.49.41.84.78 1.21.37.37.72.59 1.21.78.37.15.93.322 1.96.37 1.245.058 1.62.07 4.79.07s3.545-.012 4.79-.07c1.03-.048 1.59-.22 1.96-.37.49-.19.84-.41 1.21-.78.37-.37.59-.72.78-1.21.15-.37.322-.93.37-1.96.058-1.245.07-1.62.07-4.79s-.012-3.545-.07-4.79c-.048-1.03-.22-1.59-.37-1.96a3.08 3.08 0 0 0-.78-1.21 3.08 3.08 0 0 0-1.21-.78c-.37-.15-.93-.322-1.96-.37-1.245-.058-1.62-.07-4.79-.07zm0 3.28a6.2 6.2 0 1 1 0 12.4 6.2 6.2 0 0 1 0-12.4m0 1.82a4.38 4.38 0 1 0 0 8.76 4.38 4.38 0 0 0 0-8.76M17.9 4.8a1.04 1.04 0 1 1 0 2.08 1.04 1.04 0 0 1 0-2.08" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://facebook.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER" label="Facebook">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.67c0 .733.593 1.326 1.325 1.326H12.82v-9.294H9.692V11.01h3.128V8.41c0-3.1 1.893-4.79 4.659-4.79 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764V11.01h3.59l-.467 3.692h-3.123V24h6.127c.732 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z" />
            </svg>
          </SocialIcon>
        </div>

        <GoogleReviewsBadge variant="inverted" />
      </div>
    </motion.footer>
  );
}
import type { Metadata } from 'next';
import Link from 'next/link';
import GoogleReviewsBadge from '@/components/GoogleReviewsBadge';
import './globals.css';

export const metadata: Metadata = {
  title: 'RCP Multiservices — Île-de-France et Normandie',
  description:
    "Services à domicile de qualité en Île-de-France et en Normandie : aide, ménage, jardinage, accompagnement. Devis gratuit sous 24h.",
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="container py-4 flex items-center justify-between">
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
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t bg-gray-900">
          <div className="container py-6 flex items-center justify-between">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} RCP Multiservices — Île-de-France &amp; Normandie
            </p>
            <GoogleReviewsBadge variant="inverted" />
          </div>
        </footer>
      </body>
    </html>
  );
}
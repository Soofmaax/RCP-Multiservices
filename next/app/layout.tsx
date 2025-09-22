import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/BackToTop';

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
        <SiteHeader />
        <div className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
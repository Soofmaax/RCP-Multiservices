import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageTransition from '@/components/PageTransition';
import BackToTop from '@/components/BackToTop';

const SITE_URL = 'https://www.rcp-multiservices.com';

export const metadata: Metadata = {
  title: 'RCP Multiservices — Île-de-France et Normandie',
  description:
    "Services à domicile de qualité en Île-de-France et en Normandie : aide, ménage, jardinage, accompagnement. Devis gratuit sous 24h.",
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'RCP Multiservices — Services à domicile',
    description:
      "Aide à domicile, ménage, jardinage et accompagnement en Île-de-France et en Normandie. Devis gratuit sous 24h.",
    siteName: 'RCP Multiservices',
    locale: 'fr_FR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'RCP Multiservices' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCP Multiservices — Services à domicile',
    description:
      "Aide à domicile, ménage, jardinage et accompagnement en Île-de-France et en Normandie. Devis gratuit sous 24h.",
    images: ['/og-image.jpg'],
  },
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
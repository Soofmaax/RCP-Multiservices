import type { Metadata } from 'next';
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
      <body>{children}</body>
    </html>
  );
}
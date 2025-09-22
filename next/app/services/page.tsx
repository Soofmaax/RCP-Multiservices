'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import GoogleReviewsBadge from '@/components/GoogleReviewsBadge';

export const metadata = {
  title: 'Services à domicile — Aide, Ménage, Jardinage | RCP Multiservices',
  description:
    "Découvrez nos services à domicile en Île-de-France et en Normandie : aide à domicile, ménage, repassage, jardinage, petits travaux. Devis gratuit sous 24h.",
};

export default function ServicesPage() {
  return (
    <main className="container py-8">
      <motion.h1
        className="text-3xl font-semibold"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Nos services à domicile
      </motion.h1>
      <motion.p
        className="mt-3 text-gray-700"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        Nous proposons une gamme de prestations pour vous accompagner au quotidien, en Île-de-France et en Normandie.
      </motion.p>
      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
        <Link
          href="/contact"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Demander un devis
        </Link>
        <GoogleReviewsBadge />
      </div>

      <section className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Aide à domicile</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Courses, préparation des repas</li>
          <li>Aide administrative, accompagnement</li>
          <li>Compagnie et sorties</li>
        </ul>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Ménage et repassage</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Entretien régulier de la maison/appartement</li>
          <li>Grand ménage, remise en état</li>
          <li>Repassage, pliage</li>
        </ul>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Jardinage</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Tonte, taille, désherbage</li>
          <li>Entretien des haies et massifs</li>
          <li>Petits aménagements</li>
        </ul>
      </section>
    </main>
  );
}
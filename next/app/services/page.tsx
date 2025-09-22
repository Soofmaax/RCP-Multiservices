'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import GoogleReviewsBadge from '@/components/GoogleReviewsBadge';

export const metadata = {
  title: 'Services à domicile — Aide, Ménage, Jardinage | RCP Multiservices',
  description:
    "Découvrez nos services à domicile en Île-de-France et en Normandie : aide à domicile, ménage, repassage, jardinage, petits travaux. Devis gratuit sous 24h.",
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
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
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-transform duration-150 hover:scale-[1.03]"
        >
          Demander un devis
        </Link>
        <GoogleReviewsBadge />
      </div>

      <section className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Aide à domicile</h2>
        <motion.ul
          className="list-disc list-inside text-gray-700"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.li variants={itemVariants}>Courses, préparation des repas</motion.li>
          <motion.li variants={itemVariants}>Aide administrative, accompagnement</motion.li>
          <motion.li variants={itemVariants}>Compagnie et sorties</motion.li>
        </motion.ul>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Ménage et repassage</h2>
        <motion.ul
          className="list-disc list-inside text-gray-700"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.li variants={itemVariants}>Entretien régulier de la maison/appartement</motion.li>
          <motion.li variants={itemVariants}>Grand ménage, remise en état</motion.li>
          <motion.li variants={itemVariants}>Repassage, pliage</motion.li>
        </motion.ul>
      </section>

      <section className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Jardinage</h2>
        <motion.ul
          className="list-disc list-inside text-gray-700"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.li variants={itemVariants}>Tonte, taille, désherbage</motion.li>
          <motion.li variants={itemVariants}>Entretien des haies et massifs</motion.li>
          <motion.li variants={itemVariants}>Petits aménagements</motion.li>
        </motion.ul>
      </section>
    </main>
  );
}
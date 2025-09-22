'use client';

import { motion } from 'framer-motion';

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

export default function CityPrestations() {
  return (
    <section className="mt-6 space-y-2">
      <h2 className="text-xl font-semibold">Prestations</h2>
      <motion.ul
        className="list-disc list-inside text-gray-700"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.li variants={itemVariants}>
          Aide à domicile (courses, préparation des repas, accompagnement)
        </motion.li>
        <motion.li variants={itemVariants}>Ménage et repassage</motion.li>
        <motion.li variants={itemVariants}>Jardinage (tonte, taille, entretien)</motion.li>
        <motion.li variants={itemVariants}>Petits travaux et entretien courant</motion.li>
      </motion.ul>
    </section>
  );
}
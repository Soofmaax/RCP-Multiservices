'use client';

import Link from 'next/link';
import data from '@/data/locations.json';
import { motion } from 'framer-motion';

export const metadata = {
  title: "Zones d'intervention — Île-de-France et Normandie",
  description: "Découvrez nos villes d'intervention en Île-de-France et en Normandie.",
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function ZonesIndexPage() {
  return (
    <main className="container py-8">
      <motion.h1
        className="text-3xl font-semibold"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        Zones d&apos;intervention
      </motion.h1>

      <div className="mt-6 space-y-6">
        {data.regions.map((region) => (
          <section key={region.key}>
            <h2 className="text-xl font-semibold">{region.name}</h2>
            {region.departments.map((dpt) => (
              <div key={dpt.key} className="mt-2">
                <h3 className="font-medium">{dpt.name}</h3>
                <motion.ul
                  className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2"
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {dpt.cities.map((c) => (
                    <motion.li key={c.slug} variants={itemVariants}>
                      <Link
                        href={`/zones/${region.key}/${c.slug}`}
                        className="inline-block text-blue-600 hover:underline transition-transform duration-150 hover:scale-[1.02]"
                      >
                        {c.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
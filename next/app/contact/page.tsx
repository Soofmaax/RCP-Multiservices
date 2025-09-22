'use client';

import { motion } from 'framer-motion';
import GoogleReviewsBadge from '@/components/GoogleReviewsBadge';

export const metadata = {
  title: 'Contact — RCP Multiservices',
  description:
    "Contactez RCP Multiservices pour un devis gratuit sous 24h. Intervention en Île-de-France et en Normandie.",
};

export default function ContactPage() {
  return (
    <main className="container py-8">
      <motion.h1
        className="text-3xl font-semibold"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact
      </motion.h1>
      <motion.p
        className="mt-3 text-gray-700"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        Devis gratuit sous 24h. N&apos;hésitez pas à nous écrire ou à nous appeler.
      </motion.p>
      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
        <a
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          href="mailto:contact@rcp-multiservices.com"
        >
          Nous écrire
        </a>
        <GoogleReviewsBadge />
      </div>

      <section className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Coordonnées</h2>
        <ul className="text-gray-800">
          <li>
            Téléphone:{' '}
            <a className="text-blue-600 hover:underline" href="tel:+33123456789">
              +33 1 23 45 67 89
            </a>
          </li>
          <li>
            Email:{' '}
            <a className="text-blue-600 hover:underline" href="mailto:contact@rcp-multiservices.com">
              contact@rcp-multiservices.com
            </a>
          </li>
          <li>Adresse: 123 Avenue de la République, 75011 Paris</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Formulaire rapide</h2>
        <form
          className="mt-2 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            alert('Merci, votre demande a été envoyée (démo).');
            form.reset();
          }}
        >
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700">
              Nom
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full border rounded px-3 py-2"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="mt-1 w-full border rounded px-3 py-2"
              placeholder="vous@exemple.fr"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="mt-1 w-full border rounded px-3 py-2"
              placeholder="Décrivez votre besoin"
              rows={4}
            />
          </div>
          <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Envoyer
          </button>
        </form>
      </section>
    </main>
  );
}
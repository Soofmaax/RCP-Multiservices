import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { GoogleReviewsBadge } from '../components';
import { buildLocalBusinessLd } from '../utils/seo';
import { btnPrimary, ctaRow } from '../utils/styles';

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function ContactPage() {
  const title = 'Contact — RCP Multiservices';
  const description =
    "Contactez RCP Multiservices pour un devis gratuit sous 24h. Intervention en Île-de-France et en Normandie.";
  const canonical = `${SITE_URL}/contact`;

  const localBusinessLd = buildLocalBusinessLd({
    siteUrl: SITE_URL,
    telephone: '+33743670815',
    email: 'contact@rcp-multiservices.com',
    address: {
      streetAddress: '123 Avenue de la République',
      addressLocality: 'Paris',
      postalCode: '75011',
      addressCountry: 'FR',
    },
    openingHours: ['Mo-Fr 08:00-20:00', 'Sa 09:00-18:00'],
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>
      </Helmet>

      <main className="max-w-3xl mx-auto p-6">
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>{' '}
          / <span className="font-medium">Contact</span>
        </nav>

        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="mt-3 text-gray-700">
          Devis gratuit sous 24h. N'hésitez pas à nous écrire ou à nous appeler.
        </p>
        <div className={ctaRow}>
          <a className={btnPrimary} href="tel:+33743670815">
            Appeler: 07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
          </a>
          <a className={btnPrimary} href="mailto:contact@rcp-multiservices.com">
            Nous écrire
          </a>
          <GoogleReviewsBadge />
        </div>

        <section className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">Coordonnées</h2>
          <ul className="text-gray-800">
            <li>
              Téléphone:{' '}
              <a className="text-blue-600 hover:underline" href="tel:+33743670815">
                07 43 67 08 15
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
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Envoyer
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
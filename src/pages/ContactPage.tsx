import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { GoogleReviewsBadge } from '../components';
import { buildLocalBusinessLd } from '../utils/seo';
import { ctaRow } from '../utils/styles';

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

      <main className="container">
        <nav className="text-sm text-neutral-600 mb-4">
          <Link to="/contact" className="btn-request">
            Nous contacter
          </Link>{' '}
          / <span className="font-medium">Contact</span>
        </nav>

        <h1 className="heading-1">Contact</h1>
        <div className="accent mt-2"></div>
        <p className="mt-3 text-neutral-600">
          Devis gratuit sous 24h. N'hésitez pas à nous écrire ou à nous appeler.
        </p>
        <div className={ctaRow}>
          <a href="tel:+33743670815" className="btn-white">
            07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
          </a>
          <a href="mailto:contact@rcp-multiservices.com" className="btn-request">
            Nous écrire
          </a>
          <GoogleReviewsBadge />
        </div>

        <section className="section-spacious panel panel-hover space-y-2">
          <h2 className="heading-2">Coordonnées</h2>
          <div className="accent mt-2"></div>
          <ul className="text-neutral-900 space-y-2">
          <li className="flex items-center gap-2">
            <span className="icon-teal" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6.6 10.8c1.6 3.1 3.5 5.1 6.6 6.6l2.2-2.1c.3-.3.8-.4 1.2-.3c1 .3 2 .5 3 .6c.5.1.9.5.9 1v3c0 .6-.5 1-1.1 1C10.7 21.6 2.4 13.3 2.4 3.1c0-.6.4-1.1 1-1.1h3c.5 0 .9.4 1 1c.2 1 .4 2 .6 3c.1.4 0 .9-.3 1.2l-2.1 2.2Z"/></svg>
            </span>
            <span>
              Téléphone{' '}
              <a className="text-primary hover:underline" href="tel:+33743670815">
                07 43 67 08 15
              </a>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="icon-teal" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 7L4 7v11h16V7l-8 4Z"/></svg>
            </span>
            <span>
              Email{' '}
              <a className="text-primary hover:underline" href="mailto:contact@rcp-multiservices.com">
                contact@rcp-multiservices.com
              </a>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="icon-teal" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5Z"/></svg>
            </span>
            <span>Adresse: 123 Avenue de la République, 75011 Paris</span>
          </li>
        </ul>
        </section>

        <section className="section-spacious panel panel-hover">
          <h2 className="heading-2">Formulaire rapide</h2>
          <div className="accent mt-2"></div>
          <form
            className="mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              alert('Merci, votre demande a été envoyée (démo).');
              form.reset();
            }}
          >
            <div>
              <label htmlFor="name" className="block text-sm text-neutral-600">
                Nom
              </label>
              <input id="name" name="name" required className="mt-1 input" placeholder="Votre nom" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-neutral-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="mt-1 input"
                placeholder="vous@exemple.fr"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-neutral-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="mt-1 textarea"
                placeholder="Décrivez votre besoin"
                rows={4}
              />
            </div>
            <button type="submit" className="btn-primary">
              Envoyer
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
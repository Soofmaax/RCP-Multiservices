import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { GoogleReviewsBadge } from '../components';
import { buildLocalBusinessLd } from '../utils/seo';
import { ctaRow } from '../utils/styles';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_DISPLAY_SPACED, CONTACT_PHONE_E164, CONTACT_PHONE_TEL, DEMO_DISCLAIMER, SITE_NAME, SITE_URL } from '../config/site';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const title = `Contact — ${SITE_NAME}`;
  const description =
    `Contactez ${SITE_NAME} pour un devis gratuit sous 24h. Intervention en Île-de-France et en Normandie.`;
  const canonical = `${SITE_URL}/contact`;

  const localBusinessLd = buildLocalBusinessLd({
    siteUrl: SITE_URL,
    telephone: CONTACT_PHONE_E164,
    email: CONTACT_EMAIL,
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
        <meta property="og:image" content="/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="/og-default.jpg" />
        <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>
      </Helmet>

      <main className="container">
        <nav className="text-sm text-neutral-600 mb-4">
          <Link to="/contact" className="btn-request">
            Nous contacter
          </Link>{' '}
          / <span className="font-medium">Contact</span>
        </nav>

        {/* Hero overlay — même rendu que la section Témoignages */}
        <section className="section-spacious">
          <div className="rounded-[24px] overflow-hidden relative card-elevated">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"
              alt="Contact — illustration"
              className="w-full h-[360px] md:h-[420px] object-cover image-hero"
              loading="lazy"
              decoding="async"
              width={1600}
              height={1067}
            />
            <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-accent/95 text-white p-6 md:p-10 pt-8 md:pt-10 flex flex-col items-start justify-start rounded-r-[24px]">
              <h1 className="heading-1 heading-hero text-white">Contact</h1>
              <div className="h-1 w-20 bg-white rounded-full mt-2"></div>
              <p className="mt-3 text-white/90 text-lg md:text-xl">
                Devis gratuit sous 24h — appelez-nous ou écrivez-nous.
              </p>
              <div className={`${ctaRow} mt-3`}>
                <a href={CONTACT_PHONE_TEL} className="btn-white">
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="btn-request">
                  Nous écrire
                </a>
                <Link to="/services" className="btn-outline">
                  Voir nos services
                </Link>
                <GoogleReviewsBadge />
              </div>
            </div>
          </div>
        </section>

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
                <a className="text-primary hover:underline" href={CONTACT_PHONE_TEL}>
                  {CONTACT_PHONE_DISPLAY_SPACED}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="icon-teal" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 7L4 7v11h16V7l-8 4Z"/></svg>
              </span>
              <span>
                Email{' '}
                <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
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
          <p className="mt-2 text-neutral-600 text-sm">{DEMO_DISCLAIMER}</p>
          {sent ? (
            <p className="mt-2 text-neutral-900 font-medium">
              Merci. Formulaire de démonstration: aucune demande n’a été envoyée.
            </p>
          ) : null}
          <form
            className="mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              setSent(true);
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
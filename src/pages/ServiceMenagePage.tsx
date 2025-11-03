import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { GoogleReviewsBadge } from '../components';
import { ctaRow } from '../utils/styles';

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function ServiceMenagePage() {
  const title = 'Ménage & repassage — RCP Multiservices';
  const description =
    "Ménage et repassage : entretien régulier, grand ménage, remise en état, repassage. Planning flexible et contrôle qualité.";
  const canonical = `${SITE_URL}/services/menage-repassage`;

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
      </Helmet>

      <main className="container">
        <nav className="text-sm text-neutral-600 mb-4">
          <Link to="/" className="hover:underline">Accueil</Link> / <Link to="/services" className="hover:underline">Services</Link> / <span className="font-medium">Ménage &amp; repassage</span>
        </nav>

        {/* Hero overlay — même rendu que la section Témoignages */}
        <section className="section-spacious">
          <div className="rounded-[24px] overflow-hidden relative card-elevated">
            <img
              src="https://images.unsplash.com/photo-1581579188871-45ea61f2a6b2?auto=format&fit=crop&w=1600&q=80"
              alt="Ménage & repassage — illustration"
              className="w-full h-[360px] md:h-[420px] object-cover image-hero"
              loading="lazy"
              decoding="async"
              width={1600}
              height={1067}
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=80';
              }}
            />
            <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-accent/95 text-white p-6 md:p-10 pt-8 md:pt-10 flex flex-col items-start justify-start rounded-r-[24px]">
              <h1 className="heading-1 heading-hero text-white">Ménage &amp; repassage</h1>
              <div className="h-1 w-20 bg-white rounded-full mt-2"></div>
              <p className="mt-3 text-white/90 text-lg md:text-xl">
                Entretien régulier, grand ménage &amp; remise en état
              </p>
              <div className={`${ctaRow} mt-3`}>
                <a href="tel:+33743670815" className="btn-white">07&nbsp;43&nbsp;67&nbsp;08&nbsp;15</a>
                <Link to="/contact" className="btn-request">Demander un rendez-vous</Link>
                <Link to="/zones" className="btn-outline">Voir nos zones</Link>
                <GoogleReviewsBadge />
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacious panel panel-hover">
          <h2 className="heading-2">Prestations</h2>
          <div className="accent mt-2"></div>
          <ul className="service-list list-check mt-2">
            <li>Entretien régulier (poussière, sols, sanitaires, cuisine)</li>
            <li>Grand ménage et remise en état</li>
            <li>Repassage et pliage</li>
            <li>Nettoyage ponctuel (avant/après déménagement)</li>
          </ul>
        </section>

        <section className="section-spacious panel panel-hover">
          <h2 className="heading-2">FAQ</h2>
          <div className="accent mt-2"></div>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">Proposez-vous des créneaux flexibles ?</summary>
            <p className="mt-1 text-neutral-600">Oui, nous adaptons le planning à vos disponibilités.</p>
          </details>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">Fournissez-vous le matériel ?</summary>
            <p className="mt-1 text-neutral-600">Nous intervenons avec du matériel adapté si nécessaire.</p>
          </details>
        </section>

        <section className="section-spacious panel">
          <h2 className="heading-2">Demander un devis</h2>
          <div className="accent mt-2"></div>
          <p className="mt-2 text-neutral-600">Devis gratuit sous 24h par téléphone ou via notre formulaire.</p>
          <Link to="/contact" className="btn-request">Nous contacter</Link>
        </section>
      </main>
    </>
  );
}
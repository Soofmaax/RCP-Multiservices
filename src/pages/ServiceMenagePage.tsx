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

        {/* Hero split — style landing */}
        <section className="hero-split">
          <div className="hero-teal">
            <h1 className="heading-1 heading-hero">Ménage &amp; repassage</h1>
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
          {/* image retirée sur Ménage & repassage (on garde uniquement le panneau teal) */}
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
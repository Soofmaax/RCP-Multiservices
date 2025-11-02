import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { GoogleReviewsBadge } from '../components';
import { ctaRow } from '../utils/styles';

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function ServiceJardinagePage() {
  const title = 'Jardinage — RCP Multiservices';
  const description =
    "Jardinage : tonte, taille, entretien des haies et massifs, petits aménagements. Intervention rapide, résultat durable.";
  const canonical = `${SITE_URL}/services/jardinage`;

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
      </Helmet>

      <main className="container">
        <nav className="text-sm text-neutral-600 mb-4">
          <Link to="/" className="hover:underline">Accueil</Link> / <Link to="/services" className="hover:underline">Services</Link> / <span className="font-medium">Jardinage</span>
        </nav>

        <h1 className="heading-1">Jardinage</h1>
        <div className="accent mt-2"></div>
        <p className="mt-3 text-neutral-600">
          Tonte, taille, entretien des haies et massifs, désherbage et petits aménagements. Résultat propre et durable.
        </p>

        <div className={ctaRow}>
          <a href="tel:+33743670815" className="btn-white">07&nbsp;43&nbsp;67&nbsp;08&nbsp;15</a>
          <Link to="/contact" className="btn-request">Demander un devis</Link>
          <GoogleReviewsBadge />
        </div>

        <section className="section-spacious panel panel-hover">
          <h2 className="heading-2">Prestations</h2>
          <div className="accent mt-2"></div>
          <ul className="mt-2 list-disc list-inside text-neutral-600">
            <li>Tonte de pelouse</li>
            <li>Taille de haies et arbustes</li>
            <li>Entretien des massifs et désherbage</li>
            <li>Petits aménagements et évacuation des déchets verts</li>
          </ul>
        </section>

        <section className="section-spacious panel panel-hover">
          <h2 className="heading-2">FAQ</h2>
          <div className="accent mt-2"></div>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">Intervenez-vous rapidement ?</summary>
            <p className="mt-1 text-neutral-600">Oui, nous planifions une intervention dans les meilleurs délais.</p>
          </details>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">Pouvez-vous évacuer les déchets verts ?</summary>
            <p className="mt-1 text-neutral-600">Oui, nous pouvons évacuer les déchets verts si besoin.</p>
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
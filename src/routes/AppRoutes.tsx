import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { CityPage, ZonesIndex, ServicesPage, ContactPage, RegionPage, NotFoundPage, LegalPage, PrivacyPage } from '../pages';
import { GoogleReviewsBadge, QuickCall, Header } from '../components';
import { btnPrimary, btnSecondary, ctaRow } from '../utils/styles';

const SITE_URL = 'https://www.rcp-multiservices.com';

function Home() {
  const canonical = `${SITE_URL}/`;
  const title = 'RCP Multiservices — Île-de-France et Normandie';
  const description =
    'Services à domicile de qualité en Île-de-France et en Normandie : aide, ménage, jardinage, accompagnement. Devis gratuit sous 24h.';
  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: 'RCP Multiservices',
  };

  // Inline service icons (minimal SVGs)
  const ServiceIconHomeAssist = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-blue-600">
      <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7v3H4a2 2 0 0 0-2 2v5h20v-5a2 2 0 0 0-2-2h-1V9a7 7 0 0 0-7-7zm-5 10V9a5 5 0 0 1 10 0v3H7zm-3 5v-3h16v3H4z"/>
    </svg>
  );
  const ServiceIconClean = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-blue-600">
      <path fill="currentColor" d="M9 2h6l1 3h5v2h-2l-2 13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 7H1V5h5l1-3zm0 5H7l2 12h6l2-12h-2l-1 3H10L9 7z"/>
    </svg>
  );
  const ServiceIconGarden = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-blue-600">
      <path fill="currentColor" d="M7 2a5 5 0 0 0 0 10h2v10h2V12h2a5 5 0 0 0 0-10H7zm0 2h6a3 3 0 1 1 0 6H7a3 3 0 1 1 0-6z"/>
    </svg>
  );

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
        <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      </Helmet>
      <main className="container">
        {/* Hero */}
        <section className="hero">
          <h1 className="heading-1">RCP Multiservices</h1>
          <div className="accent mt-2"></div>
          <p className="mt-3 text-gray-700 text-lg md:text-xl">
            Services à domicile de confiance — Paris, Île-de-France &amp; Normandie.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="badge">Assuré RC Pro</span>
            <span className="badge">Intervenants qualifiés</span>
            <span className="badge">Intervention rapide</span>
          </div>
          <div className={`${ctaRow} mt-3`}>
            <a href="tel:+33743670815" className={btnPrimary}>
              Appeler: 07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
            </a>
            <Link to="/zones" className={btnSecondary}>
              Voir nos zones d&apos;intervention
            </Link>
            <Link to="/services" className={btnSecondary}>
              Voir nos services
            </Link>
            <Link to="/contact" className={btnSecondary}>
              Contact
            </Link>
            <GoogleReviewsBadge />
          </div>
        </section>

        {/* Nos services principaux */}
        <section className="mt-8">
          <h2 className="heading-2">Nos services principaux</h2>
          <div className="accent mt-2"></div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <article className="card p-4">
              <div className="flex items-center gap-2">
                <ServiceIconHomeAssist />
                <h3 className="text-lg font-semibold">Aide à domicile</h3>
              </div>
              <p className="text-gray-700 mt-2">
                Compagnie, accompagnement, courses, repas, démarches.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-700">
                <li>Réponse immédiate par téléphone</li>
                <li>Intervenants qualifiés et assurés</li>
                <li>Devis sous 24h</li>
              </ul>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a href="tel:+33743670815" className="btn-primary">Appeler</a>
                <Link to="/contact" className="btn-secondary">Demander un devis</Link>
              </div>
            </article>

            <article className="card p-4">
              <div className="flex items-center gap-2">
                <ServiceIconClean />
                <h3 className="text-lg font-semibold">Ménage &amp; repassage</h3>
              </div>
              <p className="text-gray-700 mt-2">
                Entretien régulier, grand ménage, repassage soigné.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-700">
                <li>Planning flexible</li>
                <li>Contrôle qualité</li>
                <li>Matériel adapté</li>
              </ul>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a href="tel:+33743670815" className="btn-primary">Appeler</a>
                <Link to="/contact" className="btn-secondary">Demander un devis</Link>
              </div>
            </article>

            <article className="card p-4">
              <div className="flex items-center gap-2">
                <ServiceIconGarden />
                <h3 className="text-lg font-semibold">Jardinage</h3>
              </div>
              <p className="text-gray-700 mt-2">
                Tonte, taille, entretien des haies et massifs.
              </p>
              <ul className="mt-2 list-disc list-inside text-gray-700">
                <li>Intervention rapide</li>
                <li>Résultat propre et durable</li>
                <li>Conseils d’entretien</li>
              </ul>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a href="tel:+33743670815" className="btn-primary">Appeler</a>
                <Link to="/contact" className="btn-secondary">Demander un devis</Link>
              </div>
            </article>
          </div>
        </section>

        {/* Témoignages statiques (temporaire) */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Ils nous recommandent</h2>
          <ul className="mt-3 space-y-3">
            <li className="card p-3">
              <div className="font-medium">Marie L. — Paris 11e</div>
              <p className="text-gray-800 mt-1">Très réactifs, intervention le jour-même. Merci !</p>
            </li>
            <li className="card p-3">
              <div className="font-medium">Paul R. — Rouen</div>
              <p className="text-gray-800 mt-1">Ménage impeccable, équipe ponctuelle et sympa.</p>
            </li>
            <li className="card p-3">
              <div className="font-medium">Sofia M. — Versailles</div>
              <p className="text-gray-800 mt-1">Jardinage soigné, très bon rapport qualité/prix.</p>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

function ZonesRoot() {
  const canonical = `${SITE_URL}/zones`;
  return (
    <>
      <Helmet>
        <title>Zones d&apos;intervention — Île-de-France et Normandie</title>
        <meta
          name="description"
          content="Découvrez nos villes d'intervention en Île-de-France et en Normandie."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Zones d’intervention — Île-de-France et Normandie" />
        <meta property="og:description" content="Découvrez nos villes d'intervention en Île-de-France et en Normandie." />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <ZonesIndex />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-12 bg-gray-900 text-gray-200">
      <div className="max-w-3xl mx-auto p-4 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm">
            Appeler:{' '}
            <a href="tel:+33743670815" className="text-white hover:underline">
              07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
            </a>{' '}
            • Horaires: Lun–Ven 08:00–20:00, Sam 09:00–18:00 • SIRET: à compléter • RC Pro: à compléter
          </div>
          <GoogleReviewsBadge variant="inverted" />
        </div>
        <div className="text-xs text-gray-400 flex flex-wrap gap-3">
          <Link to="/mentions-legales" className="hover:text-gray-300">
            Mentions légales
          </Link>
          <Link to="/confidentialite" className="hover:text-gray-300">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/zones" element={<ZonesRoot />} />
        <Route path="/zones/:region" element={<RegionPage />} />
        <Route path="/zones/:region/:city" element={<CityPage />} />
        <Route path="/mentions-legales" element={<LegalPage />} />
        <Route path="/confidentialite" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <QuickCall />
      <Footer />
    </BrowserRouter>
  );
}
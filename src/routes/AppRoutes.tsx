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
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-semibold">RCP Multiservices</h1>
        <p className="mt-3 text-gray-700">
          Aide à domicile, ménage, jardinage et accompagnement en Île-de-France et en Normandie.
        </p>
        <div className={ctaRow}>
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
            • Horaires: Lun–Ven 08:00–20:00, Sam 09:00–18:00
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
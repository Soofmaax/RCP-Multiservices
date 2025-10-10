import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { CityPage, ZonesIndex, ServicesPage, ContactPage } from '../pages';
import { GoogleReviewsBadge } from '../components';
import { btnPrimary, btnSecondary, ctaRow } from '../utils/styles';

function Home() {
  return (
    <>
      <Helmet>
        <title>RCP Multiservices — Île-de-France et Normandie</title>
        <meta
          name="description"
          content="Services à domicile de qualité en Île-de-France et en Normandie : aide, ménage, jardinage, accompagnement. Devis gratuit sous 24h."
        />
        <link rel="canonical" href="https://www.rcp-multiservices.com/" />
      </Helmet>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-semibold">RCP Multiservices</h1>
        <p className="mt-3 text-gray-700">
          Aide à domicile, ménage, jardinage et accompagnement en Île-de-France et en Normandie.
        </p>
        <div className={ctaRow}>
          <Link to="/zones" className={btnPrimary}>
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
  return (
    <>
      <Helmet>
        <title>Zones d&apos;intervention — Île-de-France et Normandie</title>
        <meta
          name="description"
          content="Découvrez nos villes d'intervention en Île-de-France et en Normandie."
        />
        <link rel="canonical" href="https://www.rcp-multiservices.com/zones" />
      </Helmet>
      <ZonesIndex />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t mt-12 bg-gray-900">
      <div className="max-w-3xl mx-auto p-4 flex items-center justify-center">
        <GoogleReviewsBadge variant="inverted" />
      </div>
    </footer>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/zones" element={<ZonesRoot />} />
        <Route path="/zones/:region/:city" element={<CityPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import CityPage from '../pages/CityPage';
import ZonesIndex from '../pages/ZonesIndex';
import ServicesPage from '../pages/ServicesPage';
import ContactPage from '../pages/ContactPage';
import GoogleReviewsBadge from '../components/GoogleReviewsBadge';

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
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            to="/zones"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Voir nos zones d&apos;intervention
          </Link>
          <Link
            to="/services"
            className="inline-block text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded"
          >
            Voir nos services
          </Link>
          <Link
            to="/contact"
            className="inline-block text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded"
          >
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
    <footer className="border-t mt-12">
      <div className="max-w-3xl mx-auto p-4 flex items-center justify-center">
        <GoogleReviewsBadge />
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
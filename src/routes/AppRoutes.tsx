import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import CityPage from '../pages/CityPage';
import ZonesIndex from '../pages/ZonesIndex';

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
        <Link
          to="/zones"
          className="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Voir nos zones d&apos;intervention
        </Link>
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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zones" element={<ZonesRoot />} />
        <Route path="/zones/:region/:city" element={<CityPage />} />
      </Routes>
    </BrowserRouter>
  );
}
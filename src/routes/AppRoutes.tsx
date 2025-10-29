import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { CityPage, ZonesIndex, ServicesPage, ContactPage, RegionPage, NotFoundPage, LegalPage, PrivacyPage } from '../pages';
import { GoogleReviewsBadge, QuickCall, Header, TopInfoBar } from '../components';
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
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-primary">
      <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7v3H4a2 2 0 0 0-2 2v5h20v-5a2 2 0 0 0-2-2h-1V9a7 7 0 0 0-7-7zm-5 10V9a5 5 0 0 1 10 0v3H7zm-3 5v-3h16v3H4z"/>
    </svg>
  );
  const ServiceIconClean = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-primary">
      <path fill="currentColor" d="M9 2h6l1 3h5v2h-2l-2 13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 7H1V5h5l1-3zm0 5H7l2 12h6l2-12h-2l-1 3H10L9 7z"/>
    </svg>
  );
  const ServiceIconGarden = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-primary">
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
        {/* Hero split (teal panel + royalty-free image) */}
        {(() => {
          const heroImg =
            'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=80';
          return (
            <section className="hero-split">
              <div className="hero-teal">
                <h1 className="heading-1">RCP Multiservices</h1>
                <div className="h-1 w-20 bg-white rounded-full mt-2"></div>
                <p className="mt-3 text-white/90 text-lg md:text-xl">
                  Services à domicile de confiance — Paris, Île-de-France &amp; Normandie.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="badge bg-white/10 text-white">Assuré RC Pro</span>
                  <span className="badge bg-white/10 text-white">Intervenants qualifiés</span>
                  <span className="badge bg-white/10 text-white">Intervention rapide</span>
                </div>
                <div className={`${ctaRow} mt-3`}>
                  <a href="tel:+33743670815" className="btn-white">
                    07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
                  </a>
                  <Link to="/services" className={btnPrimary}>
                    Demander un rendez-vous
                  </Link>
                  <Link to="/zones" className={btnSecondary}>
                    Voir nos zones d&apos;intervention
                  </Link>
                  <GoogleReviewsBadge />
                </div>
              </div>
              <div className="rounded-[24px] overflow-hidden shadow-md">
                <img
                  src={heroImg}
                  alt="Service à domicile — illustration"
                  className="w-full h-full object-cover md:min-h-[360px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>
          );
        })()}

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
              <p className="text-neutral-600 mt-2">
                Compagnie, accompagnement, courses, repas, démarches.
              </p>
              <ul className="mt-2 list-disc list-inside text-neutral-600">
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
              <p className="text-neutral-600 mt-2">
                Entretien régulier, grand ménage, repassage soigné.
              </p>
              <ul className="mt-2 list-disc list-inside text-neutral-600">
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
              <p className="text-neutral-600 mt-2">
                Tonte, taille, entretien des haies et massifs.
              </p>
              <ul className="mt-2 list-disc list-inside text-neutral-600">
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
              <p className="text-neutral-900 mt-1">Très réactifs, intervention le jour-même. Merci !</p>
            </li>
            <li className="card p-3">
              <div className="font-medium">Paul R. — Rouen</div>
              <p className="text-neutral-900 mt-1">Ménage impeccable, équipe ponctuelle et sympa.</p>
            </li>
            <li className="card p-3">
              <div className="font-medium">Sofia M. — Versailles</div>
              <p className="text-neutral-900 mt-1">Jardinage soigné, très bon rapport qualité/prix.</p>
            </li>
          </ul>
        </section>

        {/* How it Works (navy section) */}
        <section className="mt-10 section-navy">
          <div className="max-w-6xl mx-auto p-8">
            <div className="text-center">
              <div className="uppercase tracking-wider text-white/80 text-sm">3 ÉTAPES SIMPLES</div>
              <h2 className="heading-2 text-white mt-1">Comment ça marche</h2>
              <p className="mt-3 text-white/90">
                Nous organisons une intervention adaptée à vos besoins, au domicile ou sur site.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card-steps">
                <div className="flex items-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-accent">
                    <path fill="currentColor" d="M5 3h14a2 2 0 012 2v12a4 4 0 01-4 4H7a4 4 0 01-4-4V5a2 2 0 012-2zm2 4v2h10V7H7zm0 4v2h10v-2H7z"/>
                  </svg>
                  <div className="font-semibold">Étape 1</div>
                </div>
                <div className="mt-1 text-secondary font-medium">Demande de rendez-vous</div>
                <p className="mt-2 text-neutral-600">
                  Appelez le <a href="tel:+33743670815" className="text-primary hover:underline">07 43 67 08 15</a> ou écrivez-nous. Nous fixons un créneau rapidement.
                </p>
              </div>

              <div className="card-steps">
                <div className="flex items-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-accent">
                    <path fill="currentColor" d="M12 2a7 7 0 00-7 7v4h14V9a7 7 0 00-7-7zM5 15v1a4 4 0 004 4h6a4 4 0 004-4v-1H5z"/>
                  </svg>
                  <div className="font-semibold">Étape 2</div>
                </div>
                <div className="mt-1 text-secondary font-medium">Intervention / Examen</div>
                <p className="mt-2 text-neutral-600">
                  Nous intervenons au domicile ou sur site, au créneau convenu, avec du matériel adapté.
                </p>
              </div>

              <div className="card-steps">
                <div className="flex items-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-accent">
                    <path fill="currentColor" d="M12 4a4 4 0 014 4v2h2a4 4 0 014 4v6H2v-6a4 4 0 014-4h2V8a4 4 0 014-4z"/>
                  </svg>
                  <div className="font-semibold">Étape 3</div>
                </div>
                <div className="mt-1 text-secondary font-medium">Résultats & Suivi</div>
                <p className="mt-2 text-neutral-600">
                  Nous expliquons les résultats, conseillons les actions et assurons le suivi si nécessaire.
                </p>
              </div>
            </div>
          </div>
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
            Appeler{' '}
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
      <TopInfoBar />
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
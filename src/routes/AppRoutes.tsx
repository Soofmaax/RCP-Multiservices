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
                <h1 className="heading-1 heading-hero">RCP Multiservices</h1>
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
                  <Link to="/services" className="btn-request">
                    Demander un rendez-vous
                  </Link>
                  <Link to="/zones" className="btn-outline">
                    Voir nos zones d&apos;intervention
                  </Link>
                  <GoogleReviewsBadge />
                </div>
              </div>
              <div className="rounded-[24px] overflow-hidden shadow-md">
                <img
                  src={heroImg}
                  alt="Service à domicile — illustration"
                  className="w-full h-full object-cover md:min-h-[360px] mask-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>
          );
        })()}

        {/* Nos services principaux */}
        <section className="section-spacious">
          <h2 className="heading-2">Nos services principaux</h2>
          <div className="accent mt-2"></div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <article className="service-card">
              <div className="flex items-center gap-3">
                <div className="icon-teal">
                  <ServiceIconHomeAssist />
                </div>
                <h3 className="service-title">Aide à domicile</h3>
              </div>
              <p className="service-desc mt-2">
                Compagnie, accompagnement, courses, repas, démarches.
              </p>
              <ul className="service-list mt-2">
                <li>Réponse immédiate par téléphone</li>
                <li>Intervenants qualifiés et assurés</li>
                <li>Devis sous 24h</li>
              </ul>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a href="tel:+33743670815" className="btn-primary">Appeler</a>
                <Link to="/contact" className="btn-secondary">Demander un devis</Link>
                <Link to="/services" className="link-more">
                  En savoir plus <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            <article className="service-card">
              <div className="flex items-center gap-3">
                <div className="icon-teal">
                  <ServiceIconClean />
                </div>
                <h3 className="service-title">Ménage &amp; repassage</h3>
              </div>
              <p className="service-desc mt-2">
                Entretien régulier, grand ménage, repassage soigné.
              </p>
              <ul className="service-list mt-2">
                <li>Planning flexible</li>
                <li>Contrôle qualité</li>
                <li>Matériel adapté</li>
              </ul>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a href="tel:+33743670815" className="btn-primary">Appeler</a>
                <Link to="/contact" className="btn-secondary">Demander un devis</Link>
                <Link to="/services" className="link-more">
                  En savoir plus <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            <article className="service-card">
              <div className="flex items-center gap-3">
                <div className="icon-teal">
                  <ServiceIconGarden />
                </div>
                <h3 className="service-title">Jardinage</h3>
              </div>
              <p className="service-desc mt-2">
                Tonte, taille, entretien des haies et massifs.
              </p>
              <ul className="service-list mt-2">
                <li>Intervention rapide</li>
                <li>Résultat propre et durable</li>
                <li>Conseils d’entretien</li>
              </ul>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a href="tel:+33743670815" className="btn-primary">Appeler</a>
                <Link to="/contact" className="btn-secondary">Demander un devis</Link>
                <Link to="/services" className="link-more">
                  En savoir plus <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Témoignages statiques (temporaire) */}
        <section className="section-spacious">
          <h2 className="heading-2">Ils nous recommandent</h2>
          <div className="accent mt-2"></div>
          <ul className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <li className="testimonial-card">
              <div className="testimonial-name">Marie L. — Paris 11e</div>
              <p className="testimonial-text">Très réactifs, intervention le jour-même. Merci !</p>
            </li>
            <li className="testimonial-card">
              <div className="testimonial-name">Paul R. — Rouen</div>
              <p className="testimonial-text">Ménage impeccable, équipe ponctuelle et sympa.</p>
            </li>
            <li className="testimonial-card">
              <div className="testimonial-name">Sofia M. — Versailles</div>
              <p className="testimonial-text">Jardinage soigné, très bon rapport qualité/prix.</p>
            </li>
          </ul>
        </section>

        {/* Testimonials overlay on image (royalty-free) */}
        <section className="section-spacious">
          <div className="rounded-[24px] overflow-hidden relative card-elevated">
            <img
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1600&q=80"
              alt="Témoignages — illustration"
              className="w-full h-[420px] object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-accent/95 text-white p-6 md:p-10 flex flex-col justify-center rounded-l-[24px]">
              <div className="uppercase tracking-wide text-white/80 text-sm">Ce que disent nos clients</div>
              <h2 className="heading-2 text-white mt-1">Témoignages</h2>
              <div className="mt-4 text-white/90 max-w-md">
                <p className="font-semibold">Excellent, professionnel et à l’écoute.</p>
                <p className="mt-2">
                  Intervention à domicile, examen complet, explications claires et conseils adaptés.
                  Très satisfait du service rendu.
                </p>
                <div className="mt-3 text-yellow-300" aria-label="5 sur 5">★★★★★</div>
                <div className="mt-3 text-white/80 text-sm">Par M. Dupont</div>
              </div>
            </div>
          </div>
          <div className={`${ctaRow} mt-4 justify-center`}>
            <Link className={btnPrimary} to="/contact">
              Demander un rendez-vous
            </Link>
          </div>
        </section>

        {/* How it Works (navy section) */}
        <section className="section-spacious section-navy">
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
    <footer className="border-t mt-12 bg-navy text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-white/90">
            Besoin d’aide rapidement ? Appelez-nous au{' '}
            <a href="tel:+33743670815" className="underline hover:text-secondary">07&nbsp;43&nbsp;67&nbsp;08&nbsp;15</a>{' '}
            ou <Link to="/contact" className="underline hover:text-secondary">demandez un rendez-vous</Link>.
          </p>
          <div className="flex items-center gap-2">
            <a href="tel:+33743670815" className="btn-white">Appeler</a>
            <Link to="/contact" className="btn-primary">Rendez-vous</Link>
          </div>
          <div className="w-full text-white/70 text-sm">
            Horaires: Lun–Ven 08:00–20:00 • Sam 09:00–18:00 • Dim &amp; hors horaires: sur RDV
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="text-xl font-semibold">RCP Multiservices</div>
            <p className="text-white/80 text-sm">
              Services à domicile: aide, ménage, jardinage, accompagnement. Interventions rapides,
              équipe qualifiée et assurée.
            </p>
          </div>

          <div>
            <div className="text-lg font-semibold">Liens utiles</div>
            <ul className="mt-2 space-y-1 text-white/90">
              <li><Link to="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
              <li><Link to="/confidentialite" className="hover:underline">Politique de confidentialité</Link></li>
              <li><Link to="/services" className="hover:underline">Services</Link></li>
              <li><Link to="/zones" className="hover:underline">Zones d&apos;intervention</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-lg font-semibold">Liens rapides</div>
            <ul className="mt-2 space-y-1 text-white/90">
              <li><Link to="/" className="hover:underline">Accueil</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/zones/ile-de-france/paris" className="hover:underline">Paris</Link></li>
              <li><Link to="/zones/ile-de-france" className="hover:underline">Île-de-France</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-lg font-semibold">Prendre rendez-vous</div>
            <div className="mt-2 flex flex-col gap-2">
              <a href="tel:+33743670815" className="btn-white">07&nbsp;43&nbsp;67&nbsp;08&nbsp;15</a>
              <Link to="/contact" className="btn-primary">Demander un rendez-vous</Link>
              <GoogleReviewsBadge variant="inverted" />
            </div>
          </div>
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
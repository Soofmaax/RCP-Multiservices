import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { GoogleReviewsBadge } from '../components';
import { ctaRow } from '../utils/styles';

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function ServiceAidePage() {
  const title = 'Aide à domicile — RCP Multiservices';
  const description =
    "Aide à domicile : accompagnement, courses, repas, aide administrative. Intervenants qualifiés et assurés. Devis gratuit sous 24h.";
  const canonical = `${SITE_URL}/services/aide-a-domicile`;

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
          <Link to="/" className="hover:underline">Accueil</Link> / <Link to="/services" className="hover:underline">Services</Link> / <span className="font-medium">Aide à domicile</span>
        </nav>

        {/* Hero overlay — même rendu que la section Témoignages */}
        <section className="section-spacious">
          <div className="rounded-[24px] overflow-hidden relative card-elevated">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80"
              alt="Aide à domicile — illustration"
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
              <h1 className="heading-1 heading-hero text-white">Aide à domicile</h1>
              <div className="h-1 w-20 bg-white rounded-full mt-2"></div>
              <p className="mt-3 text-white/90 text-lg md:text-xl">
                Courses, repas, accompagnement &amp; aide administrative
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
            <li>Courses, préparation des repas</li>
            <li>Aide administrative et accompagnement</li>
            <li>Compagnie, sorties et stimulation</li>
            <li>Coordination avec l’entourage et les professionnels</li>
          </ul>
        </section>

        <section className="section-spacious panel panel-hover">
          <h2 className="heading-2">FAQ</h2>
          <div className="accent mt-2"></div>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">Proposez-vous un devis gratuit ?</summary>
            <p className="mt-1 text-neutral-600">Oui, devis gratuit sous 24h selon votre besoin.</p>
          </details>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">Vos intervenants sont-ils qualifiés et assurés ?</summary>
            <p className="mt-1 text-neutral-600">Oui, nous intervenons avec du personnel qualifié et assuré.</p>
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
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GoogleReviewsBadge } from '../components';
import { buildFaqLd } from '../utils/seo';
import { ctaRow } from '../utils/styles';

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function ServicesPage() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  const title = 'Services à domicile — Aide, Ménage, Jardinage | RCP Multiservices';
  const description =
    "Découvrez nos services à domicile en Île-de-France et en Normandie : aide à domicile, ménage, repassage, jardinage, petits travaux. Devis gratuit sous 24h.";
  const canonical = `${SITE_URL}/services`;

  const faqLd = buildFaqLd([
    {
      q: 'Proposez-vous un devis gratuit ?',
      a: 'Oui, devis gratuit sous 24h avec une estimation précise selon votre besoin.',
    },
    {
      q: 'Intervenez-vous partout en Île-de-France et en Normandie ?',
      a: "Oui, nous couvrons l'ensemble de l'Île-de-France et de la Normandie.",
    },
    {
      q: 'Vos intervenants sont-ils assurés et formés ?',
      a: 'Oui, nos intervenants sont qualifiés, assurés et accompagnés.',
    },
  ]);

  // Minimal inline icons for services (harmonized with home)
  const ServiceIconHomeAssist = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7v3H4a2 2 0 0 0-2 2v5h20v-5a2 2 0 0 0-2-2h-1V9a7 7 0 0 0-7-7zm-5 10V9a5 5 0 0 1 10 0v3H7zm-3 5v-3h16v3H4z"/>
    </svg>
  );
  const ServiceIconClean = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M9 2h6l1 3h5v2h-2l-2 13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 7H1V5h5l1-3zm0 5H7l2 12h6l2-12h-2l-1 3H10L9 7z"/>
    </svg>
  );
  const ServiceIconGarden = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
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
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <main className="container">
        <nav className="text-sm text-neutral-600 mb-4">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>{' '}
          / <span className="font-medium">Services</span>
        </nav>

        {/* Hero split (style cohérent avec la landing) */}
        <section className="hero-split">
          <div className="hero-teal">
            <h1 className="heading-1 heading-hero">Nos services à domicile</h1>
            <div className="h-1 w-20 bg-white rounded-full mt-2"></div>
            <p className="mt-3 text-white/90 text-lg md:text-xl">
              Prestations en Île-de-France &amp; Normandie — aide, ménage, jardinage.
            </p>
            <div className={`${ctaRow} mt-3`}>
              <a href="tel:+33743670815" className="btn-white">
                07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
              </a>
              <Link to="/contact" className="btn-request">
                Demander un rendez-vous
              </Link>
              <Link to="/zones" className="btn-outline">
                Voir nos zones d&apos;intervention
              </Link>
              <GoogleReviewsBadge />
            </div>
          </div>
          <div className="relative rounded-[24px] overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1517196084899-8d1bcd5ed9b5?auto=format&fit=crop&w=1600&q=80"
              alt="Prestations à domicile — illustration"
              className="w-full h-full object-cover md:min-h-[360px] mask-image"
              loading="lazy"
              decoding="async"
              width={1600}
              height={1067}
            />
            <div className="image-overlay-teal" aria-hidden="true"></div>
          </div>
        </section>

        <section id="aide-a-domicile" className="section-spacious">
          <article className="service-card group animate-fade-up">
            <div className="flex items-center gap-3">
              <div className="icon-teal">
                <ServiceIconHomeAssist />
              </div>
              <h2 className="service-title">Aide à domicile</h2>
            </div>
            <p className="service-desc mt-2">
              Appel direct et réponse immédiate. Intervenants qualifiés et assurés pour vous accompagner au quotidien.
            </p>
            <ul className="service-list list-check mt-2">
              <li>Courses, préparation des repas</li>
              <li>Aide administrative, accompagnement</li>
              <li>Compagnie et sorties</li>
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a href="tel:+33743670815" className="btn-primary">Appeler</a>
              <Link to="/contact" className="btn-secondary">Demander un devis</Link>
              <Link to="/services/aide-a-domicile" className="link-more">
                En savoir plus <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </section>

        <section id="menage-repassage" className="section-spacious">
          <article className="service-card group animate-fade-up">
            <div className="flex items-center gap-3">
              <div className="icon-teal">
                <ServiceIconClean />
              </div>
              <h2 className="service-title">Ménage et repassage</h2>
            </div>
            <p className="service-desc mt-2">
              Planning flexible, contrôle qualité et matériel adapté pour un entretien impeccable.
            </p>
            <ul className="service-list list-check mt-2">
              <li>Entretien régulier de la maison/appartement</li>
              <li>Grand ménage, remise en état</li>
              <li>Repassage, pliage</li>
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a href="tel:+33743670815" className="btn-primary">Appeler</a>
              <Link to="/contact" className="btn-secondary">Demander un devis</Link>
              <Link to="/services/menage-repassage" className="link-more">
                En savoir plus <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </section>

        <section id="jardinage" className="section-spacious">
          <article className="service-card group animate-fade-up">
            <div className="flex items-center gap-3">
              <div className="icon-teal">
                <ServiceIconGarden />
              </div>
              <h2 className="service-title">Jardinage</h2>
            </div>
            <p className="service-desc mt-2">
              Intervention rapide et résultat durable pour vos espaces verts.
            </p>
            <ul className="service-list list-check mt-2">
              <li>Tonte, taille, désherbage</li>
              <li>Entretien des haies et massifs</li>
              <li>Petits aménagements</li>
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a href="tel:+33743670815" className="btn-primary">Appeler</a>
              <Link to="/contact" className="btn-secondary">Demander un devis</Link>
              <Link to="/services/jardinage" className="link-more">
                En savoir plus <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </section>

        <section className="section-spacious panel panel-hover">
          <h2 className="heading-2">Demander un devis</h2>
          <div className="accent mt-2"></div>
          <p className="mt-2 text-neutral-600">
            Devis gratuit sous 24h. Contactez-nous par téléphone ou via notre formulaire.
          </p>
          <Link to="/contact" className="btn-request">
            Nous contacter
          </Link>
        </section>
      </main>
    </>
  );
}
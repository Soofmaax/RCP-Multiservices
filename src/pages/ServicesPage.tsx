import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { GoogleReviewsBadge } from '../components';
import { buildFaqLd } from '../utils/seo';
import { btnPrimary, ctaRow } from '../utils/styles';

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function ServicesPage() {
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
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>{' '}
          / <span className="font-medium">Services</span>
        </nav>

        <h1 className="text-3xl font-semibold">Nos services à domicile</h1>
        <p className="mt-3 text-gray-700">
          Nous proposons une gamme de prestations pour vous accompagner au quotidien, en
          Île-de-France et en Normandie.
        </p>
        <div className={ctaRow}>
          <a href="tel:+33743670815" className={btnPrimary}>
            Appeler: 07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
          </a>
          <Link to="/contact" className={btnPrimary}>
            Demander un devis
          </Link>
          <GoogleReviewsBadge />
        </div>

        <section className="mt-6 card p-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Aide à domicile</h2>
          </div>
          <p className="text-gray-700 mt-2">
            Appel direct et réponse immédiate. Intervenants qualifiés et assurés pour vous accompagner au quotidien.
          </p>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Courses, préparation des repas</li>
            <li>Aide administrative, accompagnement</li>
            <li>Compagnie et sorties</li>
          </ul>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a href="tel:+33743670815" className="btn-primary">Appeler</a>
            <Link to="/contact" className="btn-secondary">Demander un devis</Link>
          </div>
        </section>

        <section className="mt-6 card p-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Ménage et repassage</h2>
          </div>
          <p className="text-gray-700 mt-2">
            Planning flexible, contrôle qualité et matériel adapté pour un entretien impeccable.
          </p>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Entretien régulier de la maison/appartement</li>
            <li>Grand ménage, remise en état</li>
            <li>Repassage, pliage</li>
          </ul>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a href="tel:+33743670815" className="btn-primary">Appeler</a>
            <Link to="/contact" className="btn-secondary">Demander un devis</Link>
          </div>
        </section>

        <section className="mt-6 card p-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Jardinage</h2>
          </div>
          <p className="text-gray-700 mt-2">
            Intervention rapide et résultat durable pour vos espaces verts.
          </p>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Tonte, taille, désherbage</li>
            <li>Entretien des haies et massifs</li>
            <li>Petits aménagements</li>
          </ul>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a href="tel:+33743670815" className="btn-primary">Appeler</a>
            <Link to="/contact" className="btn-secondary">Demander un devis</Link>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Demander un devis</h2>
          <p className="text-gray-700">
            Devis gratuit sous 24h. Contactez-nous par téléphone ou via notre formulaire.
          </p>
          <Link to="/contact" className={btnPrimary}>
            Nous contacter
          </Link>
        </section>
      </main>
    </>
  );
}
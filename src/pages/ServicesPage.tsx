import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import GoogleReviewsBadge from '../components/GoogleReviewsBadge';
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
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <main className="max-w-3xl mx-auto p-6">
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
          <Link to="/contact" className={btnPrimary}>
            Demander un devis
          </Link>
          <GoogleReviewsBadge />
        </div>

        <section className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">Aide à domicile</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Courses, préparation des repas</li>
            <li>Aide administrative, accompagnement</li>
            <li>Compagnie et sorties</li>
          </ul>
        </section>

        <section className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">Ménage et repassage</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Entretien régulier de la maison/appartement</li>
            <li>Grand ménage, remise en état</li>
            <li>Repassage, pliage</li>
          </ul>
        </section>

        <section className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">Jardinage</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Tonte, taille, désherbage</li>
            <li>Entretien des haies et massifs</li>
            <li>Petits aménagements</li>
          </ul>
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
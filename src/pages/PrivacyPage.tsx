import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function PrivacyPage() {
  const title = 'Politique de confidentialité — RCP Multiservices';
  const description = 'Politique de confidentialité et protection des données de RCP Multiservices.';
  const canonical = `${SITE_URL}/confidentialite`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-semibold">Politique de confidentialité</h1>
        <section className="mt-4 space-y-2 text-gray-800">
          <p>Nous collectons les données strictement nécessaires pour traiter vos demandes (nom, email, message).</p>
          <p>Nous ne partageons pas vos données avec des tiers hors obligations légales.</p>
          <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à <a className="text-primary hover:underline" href="mailto:contact@rcp-multiservices.com">contact@rcp-multiservices.com</a>.</p>
          <p>Cookies: le site peut utiliser des cookies techniques pour le bon fonctionnement.</p>
        </section>
      </main>
    </>
  );
}
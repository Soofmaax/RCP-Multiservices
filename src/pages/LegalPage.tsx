import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function LegalPage() {
  const title = 'Mentions légales — RCP Multiservices';
  const description = 'Mentions légales de RCP Multiservices.';
  const canonical = `${SITE_URL}/mentions-legales`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <main className="container">
        <h1 className="text-3xl font-semibold">Mentions légales</h1>
        <section className="mt-4 space-y-2 text-neutral-900">
          <p>RCP Multiservices — Services à domicile.</p>
          <p>SIRET: à compléter</p>
          <p>Siège: à compléter</p>
          <p>Directeur de publication: à compléter</p>
          <p>Hébergeur: Netlify</p>
          <p>Assurance RC Pro: à compléter</p>
          <p>Contact: <a className="text-primary hover:underline" href="mailto:contact@rcp-multiservices.com">contact@rcp-multiservices.com</a></p>
        </section>
      </main>
    </>
  );
}
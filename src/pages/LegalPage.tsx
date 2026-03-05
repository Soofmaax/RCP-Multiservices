import { Helmet } from 'react-helmet-async';
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from '../config/site';

export default function LegalPage() {
  const title = `Mentions légales — ${SITE_NAME}`;
  const description = `Mentions légales de ${SITE_NAME}.`;
  const canonical = `${SITE_URL}/mentions-legales`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <main className="container">
        <h1 className="heading-1">Mentions légales</h1>
        <div className="accent mt-2"></div>
        <section className="section-spacious space-y-2 text-neutral-900">
          <p>{SITE_NAME} — Services à domicile.</p>
          <p>SIRET: à compléter</p>
          <p>Siège: à compléter</p>
          <p>Directeur de publication: à compléter</p>
          <p>Hébergeur: Netlify</p>
          <p>Assurance RC Pro: à compléter</p>
          <p>Contact: <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </section>
      </main>
    </>
  );
}
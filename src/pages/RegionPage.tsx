import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { findRegion } from '../data/locations';

const SITE_URL = 'https://www.rcp-multiservices.com';

type Params = {
  region: string;
};

export default function RegionPage() {
  const { region } = useParams<Params>();
  const data = region ? findRegion(region) : null;

  if (!data) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Région non trouvée</h1>
        <p className="mt-2 text-gray-600">La région demandée n&apos;a pas été trouvée.</p>
        <Link className="text-primary underline mt-4 inline-block" to="/zones">
          Revenir aux zones
        </Link>
      </main>
    );
  }

  const title = `${data.name} — Zones d’intervention | RCP Multiservices`;
  const description = `Découvrez nos villes d’intervention en ${data.name}. Sélectionnez une ville pour plus d’informations et demander un devis.`;
  const canonical = `${SITE_URL}/zones/${data.key}`;

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
      </Helmet>

      <main className="container">
        <nav className="text-sm text-neutral-600 mb-4">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>{' '}
          /{' '}
          <Link to="/zones" className="hover:underline">
            Zones
          </Link>{' '}
          / <span className="font-medium">{data.name}</span>
        </nav>

        <h1 className="text-3xl font-semibold">{data.name}</h1>
        <p className="mt-2 text-neutral-600">
          Choisissez une ville pour consulter les services disponibles et demander un devis.
        </p>

        <div className="mt-6 space-y-8">
          {data.departments.map((dept) => (
            <section key={dept.key}>
              <h2 className="text-xl font-semibold">{dept.name}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {dept.cities.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/zones/${data.key}/${c.slug}`}
                    className="link-city"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
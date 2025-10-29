import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { findRegion } from '../data/locations';

const SITE_URL = 'https://www.rcp-multisevices.com';

type Params = {
  region: string;
};

export default function RegionPage() {
  const { region } = useParams<Params>();
  const data = region ? findRegion(region) : null;

  if (!data) {
    return (
      <main className="container">
        <h1 className="heading-1">Région non trouvée</h1>
        <div className="accent mt-2"></div>
        <p className="mt-2 text-neutral-600">La région demandée n&apos;a pas été trouvée.</p>
        <Link className="link-more mt-3 inline-block" to="/zones">
          Revenir aux zones <span aria-hidden="true">→</span>
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

        <h1 className="heading-1">{data.name}</h1>
        <div className="accent mt-2"></div>
        <p className="mt-3 text-neutral-600">
          Choisissez une ville pour consulter les services disponibles et demander un devis.
        </p>

        <div className="mt-3">
          {data.departments.map((dept) => (
            <section key={dept.key} className="section-spacious">
              <h2 className="heading-2">{dept.name}</h2>
              <div className="accent mt-1"></div>
              <div className="dept-card mt-2">
                <div className="flex flex-wrap gap-2">
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
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
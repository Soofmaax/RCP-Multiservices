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
        <meta property="og:image" content="/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="/og-default.jpg" />
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

        {/* Hero overlay — même rendu que la section Témoignages */}
        <section className="section-spacious">
          <div className="rounded-[24px] overflow-hidden relative card-elevated">
            <img
              src={data.key === 'ile-de-france'
                ? 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80'
                : 'https://images.unsplash.com/photo-1526779259212-939e64768c92?auto=format&fit=crop&w=1600&q=80'}
              alt={`${data.name} — illustration`}
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
              <h1 className="heading-1 heading-hero text-white">{data.name}</h1>
              <div className="h-1 w-20 bg-white rounded-full mt-2"></div>
              <p className="mt-3 text-white/90 text-lg md:text-xl">
                Zones d&apos;intervention et villes couvertes
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a href="tel:+33743670815" className="btn-white">07&nbsp;43&nbsp;67&nbsp;08&nbsp;15</a>
                <Link to="/contact" className="btn-request">Demander un rendez-vous</Link>
                <Link to="/zones" className="btn-outline">Voir toutes les zones</Link>
              </div>
            </div>
          </div>
        </section>

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
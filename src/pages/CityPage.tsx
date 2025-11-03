import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { findCity } from '../data/locations';
import { Reviews, GoogleReviewsBadge } from '../components';
import { buildFaqLd, buildServiceLd, buildBreadcrumbsLd } from '../utils/seo';
import { ctaRow } from '../utils/styles';

type Params = {
  region: string;
  city: string;
};

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function CityPage() {
  const { region, city } = useParams<Params>();
  const match = region && city ? findCity(region, city) : null;

  if (!match) {
    return (
      <main className="container">
        <h1 className="text-2xl font-semibold">Zone non trouvée</h1>
        <p className="mt-2 text-neutral-600">
          La ville ou la région demandée n&apos;a pas été trouvée.
        </p>
        <Link className="text-primary underline mt-4 inline-block" to="/">
          Revenir à l&apos;accueil
        </Link>
      </main>
    );
  }

  const title = `Services à domicile à ${match.city.name} (${match.region.name}) — RCP Multiservices`;
  const description = `Aide à domicile, ménage, jardinage et accompagnement à ${match.city.name}. Intervention rapide, personnel qualifié et assuré. Devis gratuit sous 24h.`;
  const canonical = `${SITE_URL}/zones/${match.region.key}/${match.city.slug}`;

  const faqLd = buildFaqLd([
    { q: 'Proposez-vous un devis gratuit ?', a: 'Oui, nous proposons un devis gratuit sous 24h.' },
    {
      q: `Intervenez-vous à ${match.city.name} et aux alentours ?`,
      a: `Oui, nous intervenons à ${match.city.name} et dans tout le département ${match.department.name}.`,
    },
  ]);

  const serviceLd = buildServiceLd(match.city.name);

  const breadcrumbsLd = buildBreadcrumbsLd({
    siteUrl: SITE_URL,
    regionKey: match.region.key,
    regionName: match.region.name,
    citySlug: match.city.slug,
    cityName: match.city.name,
  });

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
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
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
          /{' '}
          <Link to={`/zones/${match.region.key}`} className="hover:underline">
            {match.region.name}
          </Link>{' '}
          / <span className="font-medium">{match.city.name}</span>
        </nav>

        {/* Hero overlay — même rendu que la section Témoignages */}
        <section className="section-spacious">
          <div className="rounded-[24px] overflow-hidden relative card-elevated">
            <img
              src={match.region.key === 'ile-de-france'
                ? 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80'
                : 'https://images.unsplash.com/photo-1526779259212-939e64768c92?auto=format&fit=crop&w=1600&q=80'}
              alt={`Ville de ${match.city.name} — illustration`}
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
            <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-accent/95 text-white p-6 md:p-10 flex flex-col justify-center rounded-l-[24px]">
              <h1 className="heading-1 heading-hero text-white">
                Services à domicile à {match.city.name}
              </h1>
              <div className="h-1 w-20 bg-white rounded-full mt-2"></div>
              <p className="mt-3 text-white/90 text-lg md:text-xl">
                {match.region.name} • {match.department.name}
              </p>
              <div className={`${ctaRow} mt-3`}>
                <a href="tel:+33743670815" className="btn-white">
                  07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
                </a>
                <Link to="/contact" className="btn-request">
                  Demander un rendez-vous
                </Link>
                <Link to={`/zones/${match.region.key}`} className="btn-outline">
                  Voir la région
                </Link>
                <GoogleReviewsBadge />
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacious panel panel-hover">
          <h2 className="heading-2">Prestations</h2>
          <div className="accent mt-2"></div>
          <ul className="service-list list-check mt-2">
            <li>Aide à domicile (courses, préparation des repas, accompagnement)</li>
            <li>Ménage et repassage</li>
            <li>Jardinage (tonte, taille, entretien)</li>
            <li>Petits travaux et entretien courant</li>
          </ul>
        </section>

        <Reviews />

        <section className="section-spacious">
          <h2 className="heading-2">Villes proches</h2>
          <div className="accent mt-2"></div>
          <p className="text-neutral-600">
            Nous intervenons également dans les villes voisines du département {match.department.name}.
          </p>
          <div className="dept-card mt-2">
            <div className="flex flex-wrap gap-2">
              {match.department.cities
                .filter((c) => c.slug !== match.city.slug)
                .slice(0, 8)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={`/zones/${match.region.key}/${c.slug}`}
                    className="link-city"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <section className="section-spacious panel panel-hover">
          <h2 className="heading-2">FAQ</h2>
          <div className="accent mt-2"></div>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">
              Proposez-vous un devis gratuit ?
            </summary>
            <p className="mt-1 text-neutral-600">
              Oui, nous proposons un devis gratuit sous 24h.
            </p>
          </details>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">
              Intervenez-vous à {match.city.name} et aux alentours ?
            </summary>
            <p className="mt-1 text-neutral-600">
              Oui, nous intervenons à {match.city.name} et dans tout le département {match.department.name}.
            </p>
          </details>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">
              Vos intervenants sont-ils qualifiés et assurés ?
            </summary>
            <p className="mt-1 text-neutral-600">
              Oui, notre équipe est formée, qualifiée et assurée pour intervenir en toute sécurité.
            </p>
          </details>
        </section>

        <section className="section-spacious panel">
          <h2 className="heading-2">Demander un devis</h2>
          <div className="accent mt-2"></div>
          <p className="mt-2 text-neutral-600">
            Devis gratuit sous 24h. Contactez-nous par téléphone ou via notre formulaire.
          </p>
          <a href="mailto:contact@rcp-multiservices.com" className="btn-request">
            Nous écrire
          </a>
        </section>
      </main>
    </>
  );
}
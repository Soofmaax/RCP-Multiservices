import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import locations from '../data/locations.json';

type Params = {
  region: string;
  city: string;
};

function findCity(regionKey: string, citySlug: string) {
  const region = locations.regions.find((r) => r.key === regionKey);
  if (!region) return null;
  for (const dept of region.departments) {
    const city = dept.cities.find((c) => c.slug === citySlug);
    if (city) {
      return { region, department: dept, city };
    }
  }
  return null;
}

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function CityPage() {
  const { region, city } = useParams<Params>();
  const match = region && city ? findCity(region, city) : null;

  if (!match) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Zone non trouvée</h1>
        <p className="mt-2 text-gray-600">
          La ville ou la région demandée n&apos;a pas été trouvée.
        </p>
        <Link className="text-blue-600 underline mt-4 inline-block" to="/">
          Revenir à l&apos;accueil
        </Link>
      </main>
    );
  }

  const title = `Services à domicile à ${match.city.name} (${match.region.name}) — RCP Multiservices`;
  const description = `Aide à domicile, ménage, jardinage et accompagnement à ${match.city.name}. Intervention rapide, personnel qualifié et assuré. Devis gratuit sous 24h.`;
  const canonical = `${SITE_URL}/zones/${match.region.key}/${match.city.slug}`;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Services à domicile à ${match.city.name}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'RCP Multiservices'
    },
    areaServed: {
      '@type': 'Place',
      name: match.city.name
    }
  };

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE_URL + '/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Zones',
        item: SITE_URL + '/zones'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: match.region.name,
        item: `${SITE_URL}/zones/${match.region.key}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: match.city.name,
        item: canonical
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsLd)}</script>
      </Helmet>
      <main className="max-w-3xl mx-auto p-6">
        <nav className="text-sm text-gray-600 mb-4">
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

        <h1 className="text-3xl font-semibold">
          Services à domicile à {match.city.name}
        </h1>
        <p className="mt-3 text-gray-700">
          Nous proposons des prestations d&apos;aide à domicile, ménage, jardinage et
          accompagnement à {match.city.name} et dans tout le département {match.department.name}.
          Notre équipe qualifiée et assurée intervient rapidement selon vos besoins.
        </p>

        <section className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">Prestations</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Aide à domicile (courses, préparation des repas, accompagnement)</li>
            <li>Ménage et repassage</li>
            <li>Jardinage (tonte, taille, entretien)</li>
            <li>Petits travaux et entretien courant</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Demander un devis</h2>
          <p className="text-gray-700">
            Devis gratuit sous 24h. Contactez-nous par téléphone ou via notre formulaire.
          </p>
          <a
            href="mailto:contact@rcp-multiservices.com"
            className="mt-2 inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Nous écrire
          </a>
        </section>
      </main>
    </>
  );
}
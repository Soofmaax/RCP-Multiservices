import type { Metadata } from 'next';
import Link from 'next/link';
import data from '@/data/locations.json';
import Reviews from '@/components/Reviews';
import GoogleReviewsBadge from '@/components/GoogleReviewsBadge';

export const revalidate = 60 * 60 * 12; // 12h

export async function generateStaticParams() {
  const params: { region: string; city: string }[] = [];
  for (const region of data.regions) {
    for (const dpt of region.departments) {
      for (const c of dpt.cities) {
        params.push({ region: region.key, city: c.slug });
      }
    }
  }
  return params;
}

type Props = { params: { region: string; city: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const match = findCity(params.region, params.city);
  if (!match) {
    return {
      title: 'Zone non trouvée | RCP Multiservices',
      description: 'La zone demandée est introuvable.',
    };
  }
  const title = `Services à domicile à ${match.city.name} — ${match.department.name}`;
  const description = `Aide à domicile, ménage, jardinage et accompagnement à ${match.city.name} (${match.department.name}). Devis gratuit sous 24h.`;
  const url = `https://www.rcp-multiservices.com/zones/${match.region.key}/${match.city.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'fr_FR',
    },
  };
}

export default function CityPage({ params }: Props) {
  const match = findCity(params.region, params.city);

  if (!match) {
    return (
      <main className="container py-8">
        <h1 className="text-2xl font-semibold">Zone non trouvée</h1>
        <p className="mt-3">
          Revenez à la page{' '}
          <Link className="text-blue-600 hover:underline" href="/zones">
            Zones
          </Link>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <nav className="text-sm text-gray-600 mb-4">
        <Link href="/" className="hover:underline">
          Accueil
        </Link>{' '}
        /{' '}
        <Link href="/zones" className="hover:underline">
          Zones
        </Link>{' '}
        / <span className="font-medium">{match.city.name}</span>
      </nav>

      <h1 className="text-3xl font-semibold">
        Services à domicile à {match.city.name} — {match.department.name}
      </h1>
      <p className="mt-3 text-gray-700">
        Nous proposons des prestations d&apos;aide à domicile, ménage, jardinage et accompagnement à{' '}
        {match.city.name} et dans tout le département {match.department.name}. Notre équipe qualifiée et assurée
        intervient rapidement selon vos besoins.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
        <Link
          href="/contact"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Demander un devis
        </Link>
        <GoogleReviewsBadge />
      </div>

      <Reviews />
    </main>
  );
}

function findCity(regionKey: string, citySlug: string) {
  for (const region of data.regions) {
    if (region.key !== regionKey) continue;
    for (const department of region.departments) {
      for (const city of department.cities) {
        if (city.slug === citySlug) {
          return { region, department, city };
        }
      }
    }
  }
  return null;
}
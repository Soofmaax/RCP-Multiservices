import Link from 'next/link';
import data from '@/data/locations.json';

export const metadata = {
  title: "Zones d'intervention — Île-de-France et Normandie",
  description: "Découvrez nos villes d'intervention en Île-de-France et en Normandie.",
};

export default function ZonesIndexPage() {
  return (
    <main className="container py-8">
      <h1 className="text-3xl font-semibold">Zones d&apos;intervention</h1>
      <div className="mt-6 space-y-6">
        {data.regions.map((region) => (
          <section key={region.key}>
            <h2 className="text-xl font-semibold">{region.name}</h2>
            {region.departments.map((dpt) => (
              <div key={dpt.key} className="mt-2">
                <h3 className="font-medium">{dpt.name}</h3>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dpt.cities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/zones/${region.key}/${c.slug}`}
                        className="text-blue-600 hover:underline"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
import { Link } from 'react-router-dom';
import { LOCATIONS } from '../data/locations';

export default function ZonesIndex() {
  return (
    <main className="container">
      <h1 className="heading-1">Zones d&apos;intervention</h1>
      <div className="accent mt-2"></div>
      <p className="mt-3 text-neutral-600">
        Nous intervenons en Île-de-France et en Normandie. Sélectionnez une région puis une ville.
      </p>

      <div className="mt-6 space-y-8">
        {LOCATIONS.regions.map((region) => (
          <section key={region.key} className="section-spacious">
            <h2 className="heading-2">{region.name}</h2>
            <div className="accent mt-1"></div>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {region.departments.map((dept) => (
                <li key={dept.key} className="text-neutral-900">
                  <div className="font-medium">{dept.name}</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {dept.cities.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/zones/${region.key}/${c.slug}`}
                        className="link-city"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
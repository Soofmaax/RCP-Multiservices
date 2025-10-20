import { Link } from 'react-router-dom';
import { LOCATIONS } from '../data/locations';

export default function ZonesIndex() {
  return (
    <main className="container">
      <h1 className="text-3xl font-semibold">Zones d&apos;intervention</h1>
      <p className="mt-2 text-gray-700">
        Nous intervenons en Île-de-France et en Normandie. Sélectionnez une région puis une ville.
      </p>

      <div className="mt-6 space-y-8">
        {LOCATIONS.regions.map((region) => (
          <section key={region.key}>
            <h2 className="text-2xl font-semibold">{region.name}</h2>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {region.departments.map((dept) => (
                <li key={dept.key} className="text-gray-800">
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
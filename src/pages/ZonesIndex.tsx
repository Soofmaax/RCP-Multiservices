import { Link, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { LOCATIONS } from '../data/locations';
import { MapZones } from '../components';

type Suggestion = { name: string; slug: string; regionKey: 'ile-de-france' | 'normandie' };

export default function ZonesIndex() {
  const [filter, setFilter] = useState<'all' | 'ile-de-france' | 'normandie'>('all');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const allCities: Suggestion[] = useMemo(() => {
    const arr: Suggestion[] = [];
    for (const r of LOCATIONS.regions) {
      for (const d of r.departments) {
        for (const c of d.cities) {
          arr.push({ name: c.name, slug: c.slug, regionKey: r.key as 'ile-de-france' | 'normandie' });
        }
      }
    }
    return arr;
  }, []);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allCities
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 7);
  }, [query, allCities]);

  return (
    <main className="container">
      <nav className="text-sm text-neutral-600 mb-4">
        <Link to="/" className="hover:underline">
          Accueil
        </Link>{' '}
        / <span className="font-medium">Zones</span>
      </nav>
      {/* Hero overlay — même rendu que la section Témoignages */}
      <section className="section-spacious">
        <div className="rounded-[24px] overflow-hidden relative card-elevated">
          <img
            src="https://images.unsplash.com/photo-1527049979667-990f1d0d8b79?auto=format&fit=crop&w=1600&q=80"
            alt="Zones d’intervention — illustration"
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
            <h1 className="heading-1 heading-hero text-white">Zones d&apos;intervention</h1>
            <div className="h-1 w-20 bg-white rounded-full mt-2"></div>
            <p className="mt-3 text-white/90 text-lg md:text-xl">
              Île-de-France &amp; Normandie — choisissez une région ou une ville
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link to="/services" className="btn-white">Voir nos services</Link>
              <Link to="/contact" className="btn-request">Demander un rendez-vous</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <div className="mt-3">
        <label htmlFor="city-search" className="block text-sm text-neutral-600">
          Rechercher une ville
        </label>
        <div className="mt-1 relative">
          <input
            id="city-search"
            className="input"
            placeholder="Ex: Paris, Rouen, Meaux…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-20 mt-1 w-full bg-white border border-border rounded-[12px] shadow">
              {suggestions.map((s) => (
                <li key={`${s.regionKey}-${s.slug}`}>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-surface.light"
                    onClick={() => {
                      void navigate(`/zones/${s.regionKey}/${s.slug}`);
                    }}
                  >
                    {s.name} <span className="text-neutral-600">({s.regionKey === 'ile-de-france' ? 'Île-de-France' : 'Normandie'})</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Map section */}
      <section className="section-spacious" aria-label="Carte des zones d'intervention">
        <h2 className="heading-2">Carte des zones d&apos;intervention</h2>
        <div className="accent mt-2"></div>

        <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer par région">
          <button type="button" className="btn-secondary" onClick={() => setFilter('all')}>
            Toutes
          </button>
          <button type="button" className="btn-secondary" onClick={() => setFilter('ile-de-france')}>
            Île-de-France
          </button>
          <button type="button" className="btn-secondary" onClick={() => setFilter('normandie')}>
            Normandie
          </button>
        </div>

        <div className="mt-3 rounded-[24px] overflow-hidden border border-border/70 shadow-md">
          <MapZones regionFilter={filter} />
        </div>
      </section>

      <div className="mt-6 space-y-8">
        {LOCATIONS.regions.map((region) => (
          <section key={region.key} className="section-spacious">
            <h2 className="heading-2">{region.name}</h2>
            <div className="accent mt-1"></div>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {region.departments.map((dept) => (
                <li key={dept.key} className="dept-card">
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
            <div className="mt-3">
              <Link to={`/zones/${region.key}`} className="link-more">
                Voir la région <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
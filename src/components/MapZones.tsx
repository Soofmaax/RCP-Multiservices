import { MapContainer, TileLayer, CircleMarker, Circle, Popup } from 'react-leaflet';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type LatLngTuple = readonly [number, number];
type BoundsTuple = readonly [LatLngTuple, LatLngTuple];

type CityMarker = {
  name: string;
  slug: string;
  regionKey: 'ile-de-france' | 'normandie';
  pos: LatLngTuple;
};

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Bounds covering Île-de-France & Normandie
const BOUNDS: BoundsTuple = [
  [47.5, -1.0], // southwest
  [50.5, 3.7],  // northeast
];

const REGION_BOUNDS: Record<'all' | 'ile-de-france' | 'normandie', BoundsTuple> = {
  all: BOUNDS,
  'ile-de-france': [
    [48.0, 1.5],
    [49.2, 3.5],
  ],
  normandie: [
    [48.8, -1.7],
    [50.0, 2.0],
  ],
};

const REGION_COVERAGE: Record<'ile-de-france' | 'normandie', { center: LatLngTuple; radius: number }> = {
  'ile-de-france': { center: [48.8566, 2.3522], radius: 50000 }, // ~50 km autour de Paris
  normandie: { center: [49.2, 0.5], radius: 120000 }, // ~120 km autour du centre de la Normandie
};

const FEATURED_CITIES: CityMarker[] = [
  { name: 'Paris', slug: 'paris', regionKey: 'ile-de-france', pos: [48.8566, 2.3522] },
  { name: 'Versailles', slug: 'versailles', regionKey: 'ile-de-france', pos: [48.8014, 2.1301] },
  { name: 'Meaux', slug: 'meaux', regionKey: 'ile-de-france', pos: [48.9602, 2.8784] },
  { name: 'Chelles', slug: 'chelles', regionKey: 'ile-de-france', pos: [48.8813, 2.5911] },
  { name: 'Fontainebleau', slug: 'fontainebleau', regionKey: 'ile-de-france', pos: [48.4079, 2.7016] },
  { name: 'Rouen', slug: 'rouen', regionKey: 'normandie', pos: [49.4431, 1.0993] },
];

const COLOR_BY_REGION: Record<'ile-de-france' | 'normandie', string> = {
  'ile-de-france': '#0B4EB3', // teal/navy brand
  normandie: '#1C8C4B', // green accent
};

export default function MapZones({ regionFilter = 'all' }: { regionFilter?: 'all' | 'ile-de-france' | 'normandie' }) {
  const navigate = useNavigate();
  const mapRef = useRef<import('leaflet').Map | null>(null);

  const visibleCities = useMemo(
    () => FEATURED_CITIES.filter((c) => (regionFilter === 'all' ? true : c.regionKey === regionFilter)),
    [regionFilter],
  );

  useEffect(() => {
    const m = mapRef.current;
    if (!m) return;
    const b = REGION_BOUNDS[regionFilter];
    m.fitBounds(b);
  }, [regionFilter]);

  const markers = visibleCities.map((c) => {
    const color = COLOR_BY_REGION[c.regionKey];
    return (
      <CircleMarker
        key={c.slug}
        center={c.pos}
        pathOptions={{ color, fillColor: color, fillOpacity: 0.85, weight: 2 }}
        radius={8}
      >
        <Popup>
          <div className="text-sm">
            <div className="font-medium">{c.name}</div>
            <button
              type="button"
              className="btn-primary mt-2"
              onClick={() => {
                void navigate(`/zones/${c.regionKey}/${c.slug}`);
              }}
            >
              Voir la ville
            </button>
          </div>
        </Popup>
      </CircleMarker>
    );
  });

  return (
    <div className="relative h-[420px] w-full">
      {/* Helper overlay + legend */}
      <div className="absolute top-2 left-2 z-[1000] rounded-[12px] bg-white/90 text-neutral-900 px-3 py-2 shadow text-sm">
        <div>Cliquez sur un marqueur ou utilisez les filtres pour centrer la carte.</div>
        <div className="mt-1 flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLOR_BY_REGION['ile-de-france'] }}></span>
            Île-de-France
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLOR_BY_REGION['normandie'] }}></span>
            Normandie
          </span>
        </div>
      </div>
      <MapContainer
        bounds={REGION_BOUNDS[regionFilter]}
        className="h-full w-full"
        whenCreated={(m) => {
          mapRef.current = m;
        }}
      >
        <TileLayer url={TILE_URL} />
        {/* Region coverage circles for clarity */}
        {(
          regionFilter === 'all'
            ? (['ile-de-france', 'normandie'] as const)
            : ([regionFilter] as const)
        ).map((key) => {
          const cfg = REGION_COVERAGE[key];
          const color = COLOR_BY_REGION[key];
          return (
            <Circle
              key={`cover-${key}`}
              center={cfg.center}
              radius={cfg.radius}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.15, weight: 1 }}
            />
          );
        })}
        {markers}
      </MapContainer>
    </div>
  );
}
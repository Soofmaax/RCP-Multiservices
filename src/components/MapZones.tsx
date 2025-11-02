import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';

type LatLngTuple = readonly [number, number];
type BoundsTuple = readonly [LatLngTuple, LatLngTuple];

// Types minimalistes et sûrs pour le GeoJSON
type RegionFeature = {
  type: 'Feature';
  properties?: { nom?: string };
  geometry: unknown;
};
type RegionFeatureCollection = {
  type: 'FeatureCollection';
  features: RegionFeature[];
};

function isFeatureCollection(x: unknown): x is RegionFeatureCollection {
  if (!x || typeof x !== 'object') return false;
  const obj = x as { type?: unknown; features?: unknown };
  return obj.type === 'FeatureCollection' && Array.isArray(obj.features);
}

const REGION_NAMES: Record<'ile-de-france' | 'normandie', string> = {
  'ile-de-france': 'Île-de-France',
  normandie: 'Normandie',
};

const REGION_COLOR: Record<'ile-de-france' | 'normandie', string> = {
  'ile-de-france': '#0B4EB3',
  normandie: '#0B4EB3',
};

// Styles ajustables
const FILL_OPACITY = 0.24;
const STROKE_WEIGHT = 4;
const OUTLINE_WEIGHT = 6;
const OUTLINE_OPACITY = 0.5;

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Emprise générale IDF & Normandie
const BOUNDS: BoundsTuple = [
  [47.5, -1.0], // sud-ouest
  [50.5, 3.7],  // nord-est
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

export default function MapZones({ regionFilter = 'all' }: { regionFilter?: 'all' | 'ile-de-france' | 'normandie' }) {
  const [fc, setFc] = useState<RegionFeatureCollection | null>(null);

  // Chargement du GeoJSON depuis le dossier public
  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch('/data/regions.geojson');
        if (!res.ok) return;
        const raw: unknown = await res.json();
        if (!isFeatureCollection(raw)) return;
        setFc(raw);
      } catch {
        // ignore
      }
    })();
  }, []);

  const featuresByKey = useMemo(() => {
    const record: Partial<Record<'ile-de-france' | 'normandie', RegionFeature>> = {};
    if (!fc) return record;
    for (const f of fc.features) {
      const nom = typeof f.properties?.nom === 'string' ? f.properties?.nom : undefined;
      if (nom === REGION_NAMES['ile-de-france']) record['ile-de-france'] = f;
      else if (nom === REGION_NAMES['normandie']) record['normandie'] = f;
    }
    return record;
  }, [fc]);

  type RegionKey = 'ile-de-france' | 'normandie';
  const allKeys: RegionKey[] = ['ile-de-france', 'normandie'];
  const keys = useMemo<RegionKey[]>(
    () => (regionFilter === 'all' ? allKeys : [regionFilter]),
    [regionFilter],
  );

  return (
    <div className="relative h-[420px] w-full">
      {/* Légende discrète */}
      <div className="absolute top-2 left-2 z-[1000] rounded-[12px] bg-white/90 text-neutral-900 px-3 py-2 shadow text-sm">
        <div>Surbrillance des régions d&apos;intervention.</div>
        <div className="mt-1 flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: REGION_COLOR['ile-de-france'] }}
            ></span>
            Île-de-France
          </span>
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: REGION_COLOR['normandie'] }}
            ></span>
            Normandie
          </span>
        </div>
      </div>
      <MapContainer bounds={REGION_BOUNDS[regionFilter]} className="h-full w-full">
        <TileLayer url={TILE_URL} />
        {keys.map((key) => {
          const data = featuresByKey[key];
          if (!data) return null;
          const color = REGION_COLOR[key];
          return (
            <>
              {/* Contour blanc sous-jacent */}
              <GeoJSON
                key={`geo-outline-${key}`}
                data={data}
                style={() => ({
                  color: '#ffffff',
                  weight: OUTLINE_WEIGHT,
                  opacity: OUTLINE_OPACITY,
                  fill: false,
                })}
              />
              {/* Couche principale colorée */}
              <GeoJSON
                key={`geo-fill-${key}`}
                data={data}
                style={() => ({
                  color,
                  weight: STROKE_WEIGHT,
                  fillColor: color,
                  fillOpacity: FILL_OPACITY,
                })}
              />
            </>
          );
        })}
      </MapContainer>
    </div>
  );
}
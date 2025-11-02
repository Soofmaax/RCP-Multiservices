import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { geoJSON } from 'leaflet';

type LatLngTuple = readonly [number, number];
type BoundsTuple = readonly [LatLngTuple, LatLngTuple];

// Types locaux minimaux
type GeoJsonObject = { type: string } & Record<string, unknown>;
type Feature = {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: Record<string, unknown>;
};
type FeatureCollection = {
  type: 'FeatureCollection';
  features: Feature[];
};

function isFeatureCollection(x: unknown): x is FeatureCollection {
  if (!x || typeof x !== 'object') return false;
  const obj = x as Record<string, unknown>;
  return obj.type === 'FeatureCollection' && Array.isArray((obj as { features?: unknown }).features);
}

const NOM_BY_KEY: Record<'ile-de-france' | 'normandie', string> = {
  'ile-de-france': 'Île-de-France',
  normandie: 'Normandie',
};

const COLOR_BY_REGION: Record<'ile-de-france' | 'normandie', string> = {
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
  const mapRef = useRef<import('leaflet').Map | null>(null);
  const [featuresByKey, setFeaturesByKey] = useState<Record<'ile-de-france' | 'normandie', GeoJsonObject> | null>(null);

  // Chargement du GeoJSON depuis le dossier public
  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch('/data/regions.geojson');
        if (!res.ok) return;
        const json = await res.json();
        if (!isFeatureCollection(json)) return;

        const record: Partial<Record<'ile-de-france' | 'normandie', GeoJsonObject>> = {};
        for (const f of json.features) {
          const nom = typeof f.properties?.nom === 'string' ? (f.properties.nom as string) : null;
          if (nom === NOM_BY_KEY['ile-de-france']) {
            record['ile-de-france'] = f as unknown as GeoJsonObject;
          } else if (nom === NOM_BY_KEY['normandie']) {
            record['normandie'] = f as unknown as GeoJsonObject;
          }
        }
        setFeaturesByKey(record as Record<'ile-de-france' | 'normandie', GeoJsonObject>);
      } catch {
        // ignore
      }
    })();
  }, []);

  const keys = regionFilter === 'all' ? (['ile-de-france', 'normandie'] as const) : ([regionFilter] as const);

  useEffect(() => {
    const m = mapRef.current;
    if (!m) return;

    let bounds: import('leaflet').LatLngBounds | null = null;
    for (const key of keys) {
      const data = featuresByKey?.[key];
      if (!data) continue;
      const gj = geoJSON(data);
      const b = gj.getBounds();
      bounds = bounds ? bounds.extend(b) : b;
    }

    if (bounds) {
      m.fitBounds(bounds, { padding: [18, 18] });
    } else {
      const fallback = REGION_BOUNDS[regionFilter];
      m.fitBounds(fallback);
    }
  }, [regionFilter, featuresByKey, keys]);

  return (
    <div className="relative h-[420px] w-full">
      {/* Légende discrète */}
      <div className="absolute top-2 left-2 z-[1000] rounded-[12px] bg-white/90 text-neutral-900 px-3 py-2 shadow text-sm">
        <div>Surbrillance des régions d&apos;intervention.</div>
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
        {keys.map((key) => {
          const data = featuresByKey?.[key];
          if (!data) return null;
          const color = COLOR_BY_REGION[key];
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
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import { useMemo } from 'react';

type LatLng = readonly [number, number];
type Bounds = readonly [LatLng, LatLng];
type RegionKey = 'ile-de-france' | 'normandie';
const ALL_REGION_KEYS: RegionKey[] = ['ile-de-france', 'normandie'];

// Couleurs par région (uniformisées bleu)
const REGION_COLOR: Record<RegionKey, string> = {
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
const BOUNDS: Bounds = [
  [47.5, -1.0], // sud-ouest
  [50.5, 3.7],  // nord-est
];

const REGION_BOUNDS: Record<'all' | RegionKey, Bounds> = {
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

// Polygones simplifiés (approximations propres et typées)
// IDF: contour grossier autour de Paris et départements proches
const POLY_IDF: LatLng[] = [
  [49.20, 2.40],
  [49.10, 3.20],
  [48.40, 3.30],
  [48.00, 2.60],
  [48.10, 1.70],
  [48.60, 1.50],
  [49.10, 2.00],
];
// Normandie: contour grossier couvrant Seine-Maritime, Calvados, Manche, Orne, Eure
const POLY_NOR: LatLng[] = [
  [49.80, 0.10],
  [49.50, 1.90],
  [49.10, 2.00],
  [48.80, 1.50],
  [48.60, 0.40],
  [48.50, -1.50],
  [49.40, -1.70],
  [49.70, -0.40],
];

const REGION_POLYGONS: Record<RegionKey, LatLng[]> = {
  'ile-de-france': POLY_IDF,
  normandie: POLY_NOR,
};

export default function MapZones({ regionFilter = 'all' }: { regionFilter?: 'all' | RegionKey }) {
  const keys = useMemo<RegionKey[]>(
    () => (regionFilter === 'all' ? ALL_REGION_KEYS : [regionFilter]),
    [regionFilter],
  );

  // Désactiver Leaflet en environnement de test (jsdom) pour éviter les erreurs
  const isTestEnv = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';
  if (isTestEnv) {
    return (
      <div className="relative h-[420px] w-full rounded-[24px] border border-border bg-surface-light flex items-center justify-center text-neutral-600 text-sm">
        Carte des zones (désactivée en tests)
      </div>
    );
  }

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
          const positions = REGION_POLYGONS[key];
          const color = REGION_COLOR[key];

          // Contour blanc sous-jacent
          const outlineOpts = {
            color: '#ffffff',
            weight: OUTLINE_WEIGHT,
            opacity: OUTLINE_OPACITY,
            fill: false,
          } as const;

          // Couche principale colorée
          const fillOpts = {
            color,
            weight: STROKE_WEIGHT,
            fill: true,
            fillColor: color,
            fillOpacity: FILL_OPACITY,
          } as const;

          return (
            <div key={`region-${key}`}>
              <Polygon positions={positions} pathOptions={outlineOpts} />
              <Polygon positions={positions} pathOptions={fillOpts} />
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
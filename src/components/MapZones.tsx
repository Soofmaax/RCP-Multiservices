import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import { REGIONS_POLYGONS } from '../data/regions';

type LatLngTuple = readonly [number, number];
type BoundsTuple = readonly [LatLngTuple, LatLngTuple];

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

const COLOR_BY_REGION: Record<'ile-de-france' | 'normandie', string> = {
  'ile-de-france': '#0B4EB3',
  normandie: '#1C8C4B',
};

export default function MapZones({ regionFilter = 'all' }: { regionFilter?: 'all' | 'ile-de-france' | 'normandie' }) {
  const mapRef = useRef<import('leaflet').Map | null>(null);

  useEffect(() => {
    const m = mapRef.current;
    if (!m) return;
    const b = REGION_BOUNDS[regionFilter];
    m.fitBounds(b);
  }, [regionFilter]);

  const keys = regionFilter === 'all' ? (['ile-de-france', 'normandie'] as const) : ([regionFilter] as const);

  return (
    <div className="relative h-[420px] w-full">
      {/* Helper overlay + legend */}
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
        {keys.map((key) => (
          <Polygon
            key={`poly-${key}`}
            positions={REGIONS_POLYGONS[key]}
            pathOptions={{ color: COLOR_BY_REGION[key], fillColor: COLOR_BY_REGION[key], fillOpacity: 0.18, weight: 2 }}
          />
        ))}
      </MapContainer>
    </div>
  );
}`}
              center={cfg.center}
              radius={cfg.radius}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.18, weight: 2 }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
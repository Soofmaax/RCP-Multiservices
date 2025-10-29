import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

type LatLngTuple = readonly [number, number];
type BoundsTuple = readonly [LatLngTuple, LatLngTuple];

type CityMarker = {
  name: string;
  slug: string;
  regionKey: string;
  pos: LatLngTuple;
};

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Bounds covering Île-de-France & Normandie (typed locally to avoid imported type unions)
const BOUNDS: BoundsTuple = [
  [47.5, -1.0], // southwest
  [50.5, 3.7],  // northeast
];

const FEATURED_CITIES: CityMarker[] = [
  { name: 'Paris', slug: 'paris', regionKey: 'ile-de-france', pos: [48.8566, 2.3522] },
  { name: 'Versailles', slug: 'versailles', regionKey: 'ile-de-france', pos: [48.8014, 2.1301] },
  { name: 'Meaux', slug: 'meaux', regionKey: 'ile-de-france', pos: [48.9602, 2.8784] },
  { name: 'Chelles', slug: 'chelles', regionKey: 'ile-de-france', pos: [48.8813, 2.5911] },
  { name: 'Fontainebleau', slug: 'fontainebleau', regionKey: 'ile-de-france', pos: [48.4079, 2.7016] },
  { name: 'Rouen', slug: 'rouen', regionKey: 'normandie', pos: [49.4431, 1.0993] },
];

export default function MapZones() {
  const navigate = useNavigate();

  const markers = FEATURED_CITIES.map((c) => {
    return (
      <Marker key={c.slug} position={c.pos}>
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
      </Marker>
    );
  });

  return (
    <div className="h-[420px] w-full">
      <MapContainer bounds={BOUNDS} className="h-full w-full">
        <TileLayer url={TILE_URL} />
        {markers}
      </MapContainer>
    </div>
  );
}
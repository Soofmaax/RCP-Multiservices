import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngLiteral } from 'leaflet';
import { useNavigate } from 'react-router-dom';

type CityMarker = {
  name: string;
  slug: string;
  regionKey: string;
  pos: LatLngLiteral;
};

const MAP_CENTER: LatLngLiteral = { lat: 48.8566, lng: 2.3522 };

const FEATURED_CITIES: CityMarker[] = [
  { name: 'Paris', slug: 'paris', regionKey: 'ile-de-france', pos: { lat: 48.8566, lng: 2.3522 } },
  { name: 'Versailles', slug: 'versailles', regionKey: 'ile-de-france', pos: { lat: 48.8014, lng: 2.1301 } },
  { name: 'Meaux', slug: 'meaux', regionKey: 'ile-de-france', pos: { lat: 48.9602, lng: 2.8784 } },
  { name: 'Chelles', slug: 'chelles', regionKey: 'ile-de-france', pos: { lat: 48.8813, lng: 2.5911 } },
  { name: 'Fontainebleau', slug: 'fontainebleau', regionKey: 'ile-de-france', pos: { lat: 48.4079, lng: 2.7016 } },
  { name: 'Rouen', slug: 'rouen', regionKey: 'normandie', pos: { lat: 49.4431, lng: 1.0993 } },
];

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function MapZones() {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: 420, width: '100%' }}
    >
      <TileLayer url={TILE_URL} />
      {FEATURED_CITIES.map((c) => (
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
      ))}
    </MapContainer>
  );
}
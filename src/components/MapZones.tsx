import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import { useNavigate } from 'react-router-dom';

type CityMarker = {
  name: string;
  slug: string;
  regionKey: string;
  pos: LatLngTuple;
};

const MAP_CENTER: LatLngTuple = [48.8566, 2.3522];

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

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: 420, width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {FEATURED_CITIES.map((c) => (
        <CircleMarker
          key={c.slug}
          center={c.pos}
          /* CircleMarker radius in pixels */
          pathOptions={{ color: '#10BFAE', fillColor: '#10BFAE', fillOpacity: 0.85 }}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-medium">{c.name}</div>
              <button
                type="button"
                className="btn-primary mt-2"
                onClick={() => { void navigate(`/zones/${c.regionKey}/${c.slug}`); }}
              >
                Voir la ville
              </button>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

type CityMarker = {
  name: string;
  slug: string;
  regionKey: string;
  lat: number;
  lng: number;
};

// Use a custom Leaflet icon to avoid touching global defaults
const defaultIcon = new Icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const FEATURED_CITIES: CityMarker[] = [
  { name: 'Paris', slug: 'paris', regionKey: 'ile-de-france', lat: 48.8566, lng: 2.3522 },
  { name: 'Versailles', slug: 'versailles', regionKey: 'ile-de-france', lat: 48.8014, lng: 2.1301 },
  { name: 'Meaux', slug: 'meaux', regionKey: 'ile-de-france', lat: 48.9602, lng: 2.8784 },
  { name: 'Chelles', slug: 'chelles', regionKey: 'ile-de-france', lat: 48.8813, lng: 2.5911 },
  { name: 'Fontainebleau', slug: 'fontainebleau', regionKey: 'ile-de-france', lat: 48.4079, lng: 2.7016 },
  { name: 'Rouen', slug: 'rouen', regionKey: 'normandie', lat: 49.4431, lng: 1.0993 },
];

export default function MapZones() {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: 420, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {FEATURED_CITIES.map((c) => (
        <Marker key={c.slug} position={[c.lat, c.lng]} icon={defaultIcon}>
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
        </Marker>
      ))}
    </MapContainer>
  );
}
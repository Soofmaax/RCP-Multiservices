import { useEffect, useRef } from 'react';
import L, { Map as LeafletMap, LatLngLiteral } from 'leaflet';
import { useNavigate } from 'react-router-dom';

type CityMarker = {
  name: string;
  slug: string;
  regionKey: string;
  pos: LatLngLiteral;
};

const MAP_CENTER: LatLngLiteral = { lat: 48.8566, lng: 2.3522 };
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const FEATURED_CITIES: CityMarker[] = [
  { name: 'Paris', slug: 'paris', regionKey: 'ile-de-france', pos: { lat: 48.8566, lng: 2.3522 } },
  { name: 'Versailles', slug: 'versailles', regionKey: 'ile-de-france', pos: { lat: 48.8014, lng: 2.1301 } },
  { name: 'Meaux', slug: 'meaux', regionKey: 'ile-de-france', pos: { lat: 48.9602, lng: 2.8784 } },
  { name: 'Chelles', slug: 'chelles', regionKey: 'ile-de-france', pos: { lat: 48.8813, lng: 2.5911 } },
  { name: 'Fontainebleau', slug: 'fontainebleau', regionKey: 'ile-de-france', pos: { lat: 48.4079, lng: 2.7016 } },
  { name: 'Rouen', slug: 'rouen', regionKey: 'normandie', pos: { lat: 49.4431, lng: 1.0993 } },
];

export default function MapZones() {
  const navigate = useNavigate();
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const el = mapElRef.current;
    if (!el) return;

    const map = L.map(el, {
      center: MAP_CENTER,
      zoom: 6,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    L.tileLayer(TILE_URL, {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    FEATURED_CITIES.forEach((c) => {
      const marker = L.marker(c.pos);

      const popupContent = document.createElement('div');
      popupContent.className = 'text-sm';

      const title = document.createElement('div');
      title.className = 'font-medium';
      title.textContent = c.name;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-primary mt-2';
      btn.textContent = 'Voir la ville';
      btn.addEventListener('click', () => { void navigate(`/zones/${c.regionKey}/${c.slug}`); });

      popupContent.appendChild(title);
      popupContent.appendChild(btn);

      marker.addTo(map).bindPopup(popupContent);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [navigate]);

  return <div style={{ height: 420, width: '100%' }} ref={mapElRef} />;
}
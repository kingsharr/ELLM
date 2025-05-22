'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src || markerIcon2x,
  iconUrl: markerIcon.src || markerIcon,
  shadowUrl: markerShadow.src || markerShadow,
});

interface Location {
  lat: number;
  lng: number;
  Location: string;
  Volume: number;
}

interface MapComponentProps {
  locations: Location[];
}

export default function MapComponent({ locations }: MapComponentProps) {
  // Filter out invalid coordinates to avoid rendering markers at [0,0]
  const validLocations = locations.filter(loc => loc.lat !== 0 && loc.lng !== 0);

  return (
    <MapContainer
      center={[3.139, 101.6869]}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {validLocations.map((loc, idx) => (
        <Marker key={idx} position={[loc.lat, loc.lng]}>
          <Popup>
            {loc.Location}: {loc.Volume} kg
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
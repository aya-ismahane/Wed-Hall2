import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icons for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow,
});

// Custom blue icon for user location
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
});

// Custom red icon for the hall
const hallIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [12, 41],
  popupAnchor: [0, -30],
  shadowUrl: markerShadow,
  shadowSize: [41, 41],
});

// Fit map bounds to show both markers
function FitBounds({ userLocation, hallLocation }) {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        [hallLocation.lat, hallLocation.lng],
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [userLocation, hallLocation, map]);
  return null;
}

export default function Map({ hallLat, hallLng }) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  }, []);

  const hallLocation = { lat: hallLat, lng: hallLng };
  const route = userLocation ? [[userLocation.lat, userLocation.lng], [hallLat, hallLng]] : null;

  return (
    <MapContainer
      center={[hallLat, hallLng]}
      zoom={14}
      className="leaflet-map"
    >
      {/* Fixed TileLayer URL */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Hall marker (red) */}
      <Marker position={[hallLat, hallLng]} icon={hallIcon}>
        <Popup>Wedding Hall</Popup>
      </Marker>

      {/* User marker (blue) */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* Polyline connecting user → hall */}
      {route && <Polyline positions={route} color="blue" weight={3} />}

      {/* Fit map bounds to show both markers */}
      {userLocation && <FitBounds userLocation={userLocation} hallLocation={hallLocation} />}
    </MapContainer>
  );
}

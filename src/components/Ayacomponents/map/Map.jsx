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
  iconSize: [35, 35],
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

export default function MapLeaf({ hallLat, hallLng }) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        console.error("Location error:", err);
        // Fallback to a default location if geolocation fails
        setUserLocation({ lat: 36.711, lng: 2.895 });
      }
    );
  }, []);

  const hallLocation = { lat: hallLat, lng: hallLng };

  return (
    <MapContainer
      center={[hallLat, hallLng]}
      zoom={13}
      className="leaflet-map"
      style={{ height: '400px', width: '100%' }} // Added inline style as backup
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Hall marker */}
      <Marker position={[hallLat, hallLng]} icon={hallIcon}>
        <Popup>Wedding Hall</Popup>
      </Marker>

      {/* User marker - show fallback if geolocation works but no permission */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
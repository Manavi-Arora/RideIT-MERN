import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useRideStore } from "../../store/useRideStore";

const blueIcon = new L.Icon({
  iconUrl: 'pick.png',
  iconSize: [32, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const redIcon = new L.Icon({
  iconUrl: 'dest.png',
  iconSize: [32, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MyMap = () => {
  const { pickup, dropoff } = useRideStore();
  const [pickupPosition, setPickupPosition] = useState(null);
  const [dropoffPosition, setDropoffPosition] = useState(null);

  // Update pickup and drop-off markers when new locations are selected
  useEffect(() => {
    console.log("Pickup:", pickup);
    console.log("Dropoff:", dropoff);
    if (pickup && pickup.coordinates) {
      setPickupPosition([pickup.coordinates[1], pickup.coordinates[0]]);
    }
    if (dropoff && dropoff.coordinates) {
      setDropoffPosition([dropoff.coordinates[1], dropoff.coordinates[0]]);
    }
  }, [pickup, dropoff]);

  const MapUpdater = ({ bounds }) => {
    const map = useMap();
    if (bounds) {
      map.fitBounds(bounds); // Automatically fit the map to the bounds of pickup and dropoff markers
    }
    return null;
  };

  // Determine the center and zoom level
  let mapCenter = [20.5937, 78.9629]; // Default center: India
  let mapZoom = 5;
  let bounds = null;

  if (pickupPosition && dropoffPosition) {
    // If both pickup and dropoff are set, create a bounds that contains both
    bounds = L.latLngBounds([pickupPosition, dropoffPosition]);
    mapZoom = Math.min(13, Math.max(10, mapZoom)); // Set a zoom that allows both points to be visible
  } else if (pickupPosition) {
    // If only pickup is set, center on pickup
    mapCenter = pickupPosition;
    mapZoom = 12; // Zoom in closer to pickup
  }

  // Path (blue line) between pickup and dropoff
  const pathCoordinates = pickupPosition && dropoffPosition ? [pickupPosition, dropoffPosition] : [];

  return (
    <div className="w-2/3 h-full">
      <MapContainer center={mapCenter} zoom={mapZoom} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Pickup Marker (Blue) */}
        {pickupPosition && (
          <Marker position={pickupPosition} icon={blueIcon}>
            <Popup>Pickup Location: {pickup.label}</Popup>
          </Marker>
        )}

        {/* Drop-off Marker (Red) */}
        {dropoffPosition && (
          <Marker position={dropoffPosition} icon={redIcon}>
            <Popup>Drop-off Location: {dropoff.label}</Popup>
          </Marker>
        )}

        {/* Blue Line Path (Polyline) */}
        {pathCoordinates.length > 0 && (
          <Polyline positions={pathCoordinates} color="blue" weight={5} />
        )}

        {/* Update map center and zoom */}
        <MapUpdater bounds={bounds} />
      </MapContainer>
    </div>
  );
};

export default MyMap;

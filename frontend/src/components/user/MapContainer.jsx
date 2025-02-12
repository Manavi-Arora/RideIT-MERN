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
  const [route, setRoute] = useState([]);

  // Update pickup and drop-off markers when new locations are selected
  useEffect(() => {
    console.log("PickUp:",pickup);
    if (pickup && pickup.coordinates) {
      setPickupPosition([pickup.coordinates[1], pickup.coordinates[0]]);
    }
    if (dropoff && dropoff.coordinates) {
      setDropoffPosition([dropoff.coordinates[1], dropoff.coordinates[0]]);
    }
  }, [pickup, dropoff]);
  useEffect(() => {
    if (pickupPosition && dropoffPosition) {
      const getRoute = async () => {
        const origin = pickupPosition.join(",");
        const destination = dropoffPosition.join(",");
        const apiKey = "88c14444245946ef88d11ca25ecb391f"; // Geoapify API key
  
        try {
          // Make API request to Geoapify Routing API
          const response = await fetch(
            `https://api.geoapify.com/v1/routing?waypoints=${origin}|${destination}&mode=drive&apiKey=${apiKey}`
          );
          const data = await response.json();
          console.log("Geoapify response data:", data); // Log to check structure
  
          // Check if the response contains valid features
          if (data.features && data.features.length > 0) {
            const routeGeometry = data.features[0].geometry;
            if (routeGeometry && routeGeometry.coordinates) {
              // Handle MultiLineString: Extract the first line's coordinates
              const routeCoords = routeGeometry.coordinates[0]; // First line in MultiLineString
              const geojson = routeCoords.map(([lng, lat]) => [lat, lng]); // Swap to [lat, lng] format
  
              // Set the route state with the proper coordinates
              setRoute(geojson);
            } else {
              console.error("No coordinates found in route geometry.");
            }
          } else {
            console.error("No features found in Geoapify response.");
          }
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      };
  
      getRoute();
    }
  }, [pickupPosition, dropoffPosition]);
  
  
  const MapUpdater = ({ pickupPosition, dropoffPosition }) => {
    const map = useMap();
  
    useEffect(() => {
       
      if (pickupPosition && dropoffPosition) {
        // Fit map to both pickup and dropoff
        const bounds = L.latLngBounds([pickupPosition, dropoffPosition]);
        map.fitBounds(bounds, { padding: [50, 50] });
      } else if (pickupPosition) {
        // Center and zoom in to pickup location if only pickup exists
        map.setView(pickupPosition, 14);
      }
    }, [pickupPosition, dropoffPosition, map]);
  
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

  return (
    <div className="w-2/3 h-full">
      <MapContainer center={mapCenter} zoom={mapZoom} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Pickup Marker (Blue) */}
        {pickupPosition && pickup?.value !== "" && (
          <Marker position={pickupPosition} icon={blueIcon}>
            <Popup>Pickup Location: {pickup?.label}</Popup>
          </Marker>
        )}

        {/* Drop-off Marker (Red) */}
        {dropoffPosition && dropoff?.value !== "" && (
          <Marker position={dropoffPosition} icon={redIcon}>
            <Popup>Drop-off Location: {dropoff?.label}</Popup>
          </Marker>
        )}

        {/* Blue Line Path (Polyline) from Geoapify Routing API */}
        {route.length > 0 && (
          <Polyline positions={route} color="blue" weight={3} opacity={0.8}/>
        )}

        {/* Update map center and zoom */}
        <MapUpdater pickupPosition={pickupPosition} dropoffPosition={dropoffPosition} />

      </MapContainer>
    </div>
  );
};

export default MyMap;

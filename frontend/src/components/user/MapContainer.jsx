import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useRideStore } from "../../store/useRideStore";
import RateList from "../user/Ride/RateList";
import { useDriverStore } from "../../store/useDriverStore";
import DriverDetails from "./Ride/DriverDetails";



const MyMap = () => {
  const { pickup, dropoff, userPosition, setUserPosition, setDistance, showRateList, setShowRateList, rideDetails } = useRideStore();
  const { assignDriver, updateDriverLocation, assignedDriver } = useDriverStore();  
  const [pickupPosition, setPickupPosition] = useState(null);
  const [dropoffPosition, setDropoffPosition] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);  // 🚗 Store driver's live location
  const [route, setRoute] = useState([]);
  let DriverUrl = "";
  //console.log(rideDetails);
  // Determine the driver icon URL based on the ride type
  switch (rideDetails?.name) {
    case "RideIT GO":
      DriverUrl = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png";
      break;
    case "RideIT Moto":
      DriverUrl = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png";
      break;
    case "RideIT Auto":
      DriverUrl = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png";
      break;
    case "RideIT Premier":
      DriverUrl = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png";
      break;
    case "RideIT XL":
      DriverUrl = "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png";
      break;
    default:
      DriverUrl = "location.png"; // Default location icon
  }
  
  // Define icon for pickup, dropoff, and user position
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
  
  const userIcon = new L.Icon({
    iconUrl: 'location.png',
    iconSize: [32, 32],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  
  // 🚗 Driver Icon with dynamic URL
  const driverIcon = new L.Icon({
    iconUrl: DriverUrl, // Use the dynamically set DriverUrl
    iconSize: [70, 70], // Adjust the icon size
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
  
  useEffect(() => {
    if (pickup && pickup.coordinates) {
      setPickupPosition([pickup.coordinates[1], pickup.coordinates[0]]);
    } else {
      setPickupPosition(null);
      setRoute([]);
    }

    if (dropoff && dropoff.coordinates) {
      setDropoffPosition([dropoff.coordinates[1], dropoff.coordinates[0]]);
    } else {
      setDropoffPosition(null);
      setRoute([]);
    }
    if (pickup && dropoff) {
      setShowRateList(true);
    }
  }, [pickup, dropoff]);

  // 📌 Watch user's geolocation and update driver location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);

          // 🔹 If driver is assigned, update their location
          if (assignedDriver) {
            updateDriverLocation(latitude, longitude);
            setDriverPosition([latitude, longitude]);  // Update driver's location in state
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [assignedDriver]);

  useEffect(() => {
    if (pickupPosition && dropoffPosition) {
      const getRoute = async () => {
        const origin = pickupPosition.join(",");
        const destination = dropoffPosition.join(",");
        const apiKey = "4881edf15f62432dbcd861fdbb4f0983";

        try {
          const response = await fetch(
            `https://api.geoapify.com/v1/routing?waypoints=${origin}|${destination}&mode=drive&apiKey=${apiKey}`
          );
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            const routeGeometry = data.features[0].geometry;
            if (routeGeometry && routeGeometry.coordinates) {
              const routeCoords = routeGeometry.coordinates[0];
              const geojson = routeCoords.map(([lng, lat]) => [lat, lng]);
              setRoute(geojson);
            }
          }
          if (data.features[0].properties && data.features[0].properties.distance) {
            await setDistance((data.features[0].properties.distance / 1000).toFixed(2));
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
        const bounds = L.latLngBounds([pickupPosition, dropoffPosition]);
        map.fitBounds(bounds, { padding: [50, 50] });
      } else if (pickupPosition) {
        map.setView(pickupPosition, 14);
      }
    }, [pickupPosition, dropoffPosition, map]);

    return null;
  };

  return (
    <div className="flex w-full h-full">
      <div className={`${pickupPosition && dropoffPosition ? 'w-2/3' : 'w-full'} h-full`}>
        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {pickupPosition && pickup?.value !== "" && (
            <Marker position={pickupPosition} icon={blueIcon}>
              <Popup>Pickup Location: {pickup?.label}</Popup>
            </Marker>
          )}

          {dropoffPosition && dropoff?.value !== "" && (
            <Marker position={dropoffPosition} icon={redIcon}>
              <Popup>Drop-off Location: {dropoff?.label}</Popup>
            </Marker>
          )}

          {userPosition && (
            <Marker position={userPosition} icon={userIcon}>
              <Popup>Your Location</Popup>
            </Marker>
          )}

          {/* 🚗 Driver Marker */}
          {assignedDriver && driverPosition && (
            <Marker position={driverPosition} icon={driverIcon}>
              <Popup>Driver's Location</Popup>
            </Marker>
          )}

          {route.length > 0 && <Polyline positions={route} color="blue" weight={3} opacity={0.8} />}

          <MapUpdater pickupPosition={pickupPosition} dropoffPosition={dropoffPosition} />
        </MapContainer>
      </div>
      {pickupPosition && dropoffPosition && (
        <div className={`${showRateList ? "w-3/7" : "w-1/2"} h-[calc(100vh-10vh)] overflow-y-auto bg-white shadow-lg`}>
          {showRateList ? <RateList /> : <DriverDetails />}
        </div>
      )}
    </div>
  );
};

export default MyMap;

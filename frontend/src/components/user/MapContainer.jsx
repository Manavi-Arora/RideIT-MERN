import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useRef} from "react";
import { useRideStore } from "../../store/useRideStore";
import RateList from "../user/Ride/RateList";
import { useDriverStore } from "../../store/useDriverStore";
import DriverDetails from "./Ride/DriverDetails";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";


const MyMap = () => {
  const { pickup, dropoff, userPosition, setUserPosition, setDistance, showRateList, setShowRateList, rideDetails, rideStatus, setRideStatus,screenshotURL, setScreenshotURL } = useRideStore();
  const { assignDriver, updateDriverLocation, assignedDriver } = useDriverStore();
  const [pickupPosition, setPickupPosition] = useState(null);
  const [dropoffPosition, setDropoffPosition] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);  // 🚗 Store driver's live location
  const [route, setRoute] = useState([]);
  const mapRef = useRef(null);
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
    const captureMap = async () => {
      if (mapRef.current && pickupPosition && dropoffPosition) {
        setTimeout(async () => {
          const canvas = await html2canvas(mapRef.current, { useCORS: true });
          const imageURL = canvas.toDataURL("image/png");
          setScreenshotURL(imageURL);
          console.log("Screenshot captured:", imageURL);
        }, 3000); // Wait for the map to adjust
      }
    };

    captureMap();
  }, [pickupPosition, dropoffPosition]);
  

  useEffect(() => {
    if (driverPosition && dropoffPosition) {
      const driverToDropoffDistance = L.latLng(driverPosition).distanceTo(L.latLng(dropoffPosition));

      if (driverToDropoffDistance <= 50) {
        setRideStatus("completed");
      }
    }
  }, [driverPosition, dropoffPosition]);


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
    const getRoute = async (start, end, setRouteCallback) => {
      const apiKey = "88c14444245946ef88d11ca25ecb391f";
      const origin = start.join(",");
      const destination = end.join(",");

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
            setRouteCallback(geojson);
          }
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    if (pickupPosition && dropoffPosition) {

      if (driverPosition) {
        const driverToPickupDistance = L.latLng(driverPosition).distanceTo(L.latLng(pickupPosition));
        if (driverToPickupDistance <= 50) {
          toast.success("🚖 Your driver has arrived at the pickup location!");
        }
        // 🚗 Always show the route from driver to pickup, even if within 50m
        getRoute(driverPosition, pickupPosition, setRoute);
      } else {
        // No driver assigned, show route from pickup to dropoff
        getRoute(pickupPosition, dropoffPosition, setRoute);
      }
    }

  }, [pickupPosition, dropoffPosition, driverPosition]);

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


  const MapUpdater = ({ pickupPosition, dropoffPosition, driverPosition }) => {
    const map = useMap();

    useEffect(() => {
      if (driverPosition && pickupPosition) {
        const driverToPickupDistance = L.latLng(driverPosition).distanceTo(L.latLng(pickupPosition));

        if (driverToPickupDistance > 50) {
          // 🚗 Driver is far from pickup → Show both driver & pickup
          const bounds = L.latLngBounds([pickupPosition, driverPosition]);
          map.fitBounds(bounds, { padding: [50, 50] });
        } else {
          // ✅ Driver is at pickup → Show driver & dropoff
          const bounds = L.latLngBounds([dropoffPosition, driverPosition]);
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      } else if (pickupPosition && dropoffPosition) {
        // Default: Show both pickup & dropoff if no driver
        const bounds = L.latLngBounds([pickupPosition, dropoffPosition]);
        map.fitBounds(bounds, { padding: [50, 50] });
      } else if (pickupPosition) {
        // Focus on pickup if no other positions exist
        map.setView(pickupPosition, 14);
      }
    }, [pickupPosition, dropoffPosition, driverPosition, map]);

    return null;
  };

  return (
    <div className="flex w-full h-full">
      {rideStatus === "completed" ? (
  <div className="w-full h-full flex flex-col items-center justify-center ">
    
      
      {/* 🎥 Video with Controlled Size */}
      <video
  playsInline
  loop
  autoPlay
  muted
  className="w-[450px] rounded-lg pb-2"
>
  <source
    src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/approved-animation-download-in-lottie-json-gif-static-svg-file-formats--successful-confirmed-checkmark-animated-check-marks-pack-sign-symbols-animations-5359645.mp4"
    type="video/mp4"
  />
</video>

      <h2 className="text-3xl font-extrabold text-green-400 flex items-center gap-2">
        Ride Completed 🎉
      </h2>
      <p className="text-lg text-black mt-2 text-center">
        Thank you for choosing <span className="text-green-400 font-semibold">RideIT</span>.
      </p>

      <button
        className="mt-6 px-6 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition duration-300"
        onClick={() => {
          setRideStatus("inProgress"); // ✅ Correct status update
          setTimeout(() => window.location.reload(), 100); // ✅ Reload after status update
        }}
      >
        Continue with Ride Booking &gt;
      </button>
    </div>
  
) : (
        <>
          {/* Regular Map Display */}
          <div  ref={mapRef} className={`${pickupPosition && dropoffPosition ? 'w-2/3' : 'w-full'} h-full`}>
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

              {assignedDriver && driverPosition && (
                <Marker position={driverPosition} icon={driverIcon}>
                  <Popup>Driver's Location</Popup>
                </Marker>
              )}

              {route.length > 0 && <Polyline positions={route} color="blue" weight={3} opacity={0.8} />}

              <MapUpdater pickupPosition={pickupPosition} dropoffPosition={dropoffPosition} driverPosition={driverPosition} />
            </MapContainer>
          </div>
          {pickupPosition && dropoffPosition && (
            <div className={`w-1/2 h-[calc(100vh-10vh)] overflow-y-auto bg-white shadow-lg`}>
              {showRateList ? <RateList /> : <DriverDetails />}
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default MyMap;
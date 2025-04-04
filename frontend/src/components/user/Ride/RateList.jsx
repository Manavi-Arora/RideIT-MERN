import { useEffect, useState } from "react";
import { CheckCircle, Tag, Search } from "lucide-react";
import rideData from "./RideData";
import RideCoupons from "./RideCoupons";
import { useRideStore } from "../../../store/useRideStore";
import toast from "react-hot-toast";
import { useDriverStore } from "../../../store/useDriverStore";
import { useAuthStore } from "../../../store/useAuthStore";

const FUEL_PRICE_PER_LITER = 100; // Example fuel price per liter

const RateList = () => {
  const {findingDriver, fetchDrivers, assignedDriver, setFindingDriver,drivers,assignDriver} = useDriverStore();
  const {setShowSidebar,authUser} = useAuthStore(); 
  const { distance,setShowRateList,bookRide, setRideDetials,pickup,dropoff} = useRideStore();
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountedPrices, setDiscountedPrices] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



  const FindDriver = async() =>{
    if (!selectedRide) {
      toast.error("Please select a ride first!");
      return;
    }
  
    // Storing the final ride details before searching for a driver
    setRideDetials({
      name: selectedRide.name,
      price: discountedPrices[selectedRide.name] || selectedRide.price,
      passengers: selectedRide.passengers,
      timeAway: selectedRide.timeAway,
      time: selectedRide.time,
      description: selectedRide.description,
      distance:distance,
    });
    console.log("distamce is ",distance);
    setShowSidebar(false);
    setFindingDriver(true);
    await fetchDrivers();
    //console.log(drivers);
    await assignDriver();
    setFindingDriver(false);
    setShowRateList(false);
  }

  useEffect(() => {
    if (distance) {
      const updatedRides = rideData.map((ride) => {
        const travelTimeHours = distance / ride.avgSpeed;
        const travelTimeMinutes = Math.round(travelTimeHours * 60);
        const currentTime = new Date();
        const arrivalTime = new Date(currentTime.getTime() + travelTimeMinutes * 60000);

        // Calculate fuel cost
        const fuelCost = (distance / ride.fuelEfficiency) * FUEL_PRICE_PER_LITER;

        // Calculate base price
        const price = ride.baseFare + ride.perKmFare * distance + fuelCost;
        const originalPrice = price * 1.02; // Small fluctuation

        return {
          name: ride.name,
          passengers: ride.passengers,
          timeAway: `${travelTimeMinutes} mins away`,
          time: arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          description: ride.description,
          price: price.toFixed(2),
          originalPrice: originalPrice.toFixed(2),
        };
      });
      
      setRides(updatedRides);
    }
  }, [distance]);

  const applyCoupon = () => {
    setErrorMessage("");
    const coupon = RideCoupons.find((c) => c.code.toUpperCase() === couponCode.toUpperCase());

    if (!coupon) {
      setErrorMessage("Invalid coupon code!");
      return;
    }

    const newPrices = {};
    let validCouponApplied = false;

    rides.forEach((ride) => {
      let discountedPrice = parseFloat(ride.price);

      if (discountedPrice >= coupon.minAmount) {
        validCouponApplied = true;

        if (coupon.discountPercentage) {
          discountedPrice -= (coupon.discountPercentage / 100) * discountedPrice;
        } else if (coupon.discountAmount) {
          discountedPrice -= coupon.discountAmount;
        }

        newPrices[ride.name] = discountedPrice.toFixed(2);
      }
    });

    if (!validCouponApplied) {
      setErrorMessage(`Coupon "${couponCode}" is applicable only for rides above ₹${coupon.minAmount}`);
      return;
    }

    setDiscountedPrices(newPrices);
    setAppliedCoupon(couponCode);
  };

  const handleRideSelect = (ride) => {
    setSelectedRide(ride);
  };

  return (
    <div className="m-5">
      <h1 className="text-lg font-bold mb-4 text-center">Available Rides</h1>
      {rides.map((ride, index) => (
        <div
          key={index}
          className={`p-4 mb-2 rounded-lg shadow flex items-center justify-between cursor-pointer ${selectedRide?.name === ride.name ? "bg-gray-300 border-2 border-black" : "bg-gray-100"
            }`}
          onClick={() => handleRideSelect(ride)}
        >
          <div className="flex items-center space-x-3">
            {ride.name === "RideIT GO" ? (
              <img alt="RideIT Go" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png" />
            ) : ride.name === "RideIT Moto" ? (
              <img alt="RideIT Moto" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png" />
            ) : ride.name === "RideIT Auto" ? (
              <img alt="RideIT Auto" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png" />
            ) : ride.name === "RideIT Premier" ? (<img alt="Premier" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png" />)
              : ride.name === "RideIT XL" ? (<img alt="UberXL" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png" />) : null
            }

            <div>
              <h3 className="font-semibold text-lg">{ride.name}</h3>
              <p className="text-sm text-gray-600">{ride.description}</p>
              <p className="text-sm">{ride.passengers} passengers</p>
              <p className="text-sm">{ride.timeAway} (Arrives at {ride.time})</p>
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">
              ₹{discountedPrices[ride.name] || ride.price}{" "}
              {discountedPrices[ride.name] && (
                <div className="line-through text-gray-400 text-sm">₹{ride.price}</div>
              )}
            </div>
          </div>
        </div>
      ))}

      {selectedRide && <div className="mt-4 p-4 bg-white shadow-lg">
        <h3 className="text-lg font-bold flex items-center">
          <Tag className="w-5 h-5 mr-2 text-yellow-500" /> Apply Coupon
        </h3>
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />
        <button
          className="mt-2 bg-black text-white px-4 py-2 rounded flex items-center"
          onClick={applyCoupon}
        >
          <CheckCircle className="w-5 h-5 mr-2" /> Apply
        </button>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {appliedCoupon && !errorMessage && (
          <p className="text-green-500 mt-2">Coupon "{appliedCoupon}" applied!</p>
        )}
      </div>}

      {selectedRide && (

        <div className="mt-6 p-4 bg-white shadow-lg text-center">
          <h3 className="text-lg font-bold">Selected Ride: {selectedRide.name}</h3>
          <p className="text-lg">Price: ₹{discountedPrices[selectedRide.name] || selectedRide.price}</p>
          
          <button className="mt-5 bg-black text-white px-4 py-2 rounded flex items-center mx-auto" onClick= {FindDriver}>
            <Search className="w-5 h-5 mr-2" /> Search Driver
          </button>
        </div>

      )}
    </div>
  );
};

export default RateList;

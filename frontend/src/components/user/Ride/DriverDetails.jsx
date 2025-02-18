import React from "react";
import { useDriverStore } from "../../../store/useDriverStore";
import { MapPin, CreditCard, Car, Clock, User, BadgeCheck, IndianRupee } from "lucide-react";
import { useRideStore } from "../../../store/useRideStore";
const DriverDetails = () => {
    const { assignedDriver } = useDriverStore();
    const { pickup, dropoff, rideDetails, paymentMethod } = useRideStore();

    if (!assignedDriver || Object.keys(assignedDriver || {}).length === 0) {
        return (
            <video autoPlay playsInline loop className="c-hhrJks h-full" style={{ width: "1024px" }} >
                <source
                    src="cab_book.mp4"
                    type="video/mp4"
                />
            </video>
        );
    }
    

    return (
        <div className="relative transition hover:scale-[1.02] m-7">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BadgeCheck className="text-green-500" size={24} /> Ride Confirmed
                </h2>
                <Clock className="text-gray-400" size={24} />
            </div>

            {/* Pickup & Dropoff */}
            <div className="mt-4 space-y-3  p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                    <MapPin color="#0040ff" size = {36} />
                    <p className="text-lg">{pickup.value}</p>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin color="#ff0000" size = {36} />
                    <p className="text-lg">{dropoff.value}</p>
                </div>
            </div>

            {/* Driver Info */}
            <div className="mt-6 flex items-center gap-4 p-4 rounded-lg shadow-lg">
                <img
                    src={assignedDriver.profilePic || "driver.jpg"}
                    alt="Driver"
                    className="w-16 h-16 rounded-full border-2 border-gray-500"
                />
                <div>
                    <h3 className="text-lg font-semibold">{assignedDriver?.fullName ?? "Unknown Driver"}</h3>
                    <p className="text-gray-400 flex items-center gap-1">
                        ⭐ {assignedDriver?.ratings ?? "N/A"} / 5.0
                    </p>
                    <p className="text-gray-500 flex items-center">
                        <User className="mr-2 text-yellow-400" size={16} /> {assignedDriver?.phoneNumber ?? "N/A"}
                    </p>
                </div>
            </div>

            {/* Vehicle Info */}
            <div className="mt-4 flex items-center gap-4  p-4 rounded-lg shadow-lg">
                {rideDetails.name === "RideIT GO" ? (
                    <img alt="RideIT Go" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png" />
                ) : rideDetails.name === "RideIT Moto" ? (
                    <img alt="RideIT Moto" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png" />
                ) : rideDetails.name === "RideIT Auto" ? (
                    <img alt="RideIT Auto" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png" />
                ) : rideDetails.name === "RideIT Premier" ? (<img alt="Premier" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png" />)
                    : rideDetails.name === "RideIT XL" ? (<img alt="UberXL" height="124" width="150" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png" />) : null
                }
                <div>
                    <h4 className="text-lg font-medium">{assignedDriver?.vehicleModel ?? "N/A"}</h4>
                    <p className="text-gray-400">{assignedDriver?.vehicleType ?? "Unknown"} - {assignedDriver?.vehicleNumber ?? "N/A"}</p>
                    <p className="text-gray-500">License No: {assignedDriver?.licenseNumber ?? "N/A"}</p>
                </div>
            </div>

            {/* Fare & Payment */}
            <div className="mt-4 p-4  rounded-lg shadow-lg">
                <div className="flex justify-between text-lg font-semibold">
                    <p>Total Fare:</p>
                    <p className="text-green-500 flex items-center">
                        <IndianRupee size={20} className="mr-1" /> {rideDetails?.price ?? "N/A"}
                    </p>
                </div>
                <div className="flex justify-between mt-2 text-gray-400">
                    <p>Payment Method:</p>
                    <p className="flex items-center gap-2">
                        <CreditCard size={20} className="text-blue-400" />{paymentMethod}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-4 mt-6">
                <button className="w-1/2 bg-red-500 text-white py-2 rounded-lg text-lg font-medium hover:bg-red-600 transition">
                    Cancel Ride
                </button>
                <button className="w-1/2 bg-green-500 text-white py-2 rounded-lg text-lg font-medium hover:bg-green-600 transition">
                    Track Ride
                </button>
            </div>
        </div>
    );
};

export default DriverDetails;

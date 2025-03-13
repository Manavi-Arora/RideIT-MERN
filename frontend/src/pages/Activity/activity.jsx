import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader2, MapPin, MapPinOff } from "lucide-react";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Header from "../../components/user/Header";

const Activity = () => {
    const [showImage, setShowImage] = useState(false);
    // Function to toggle image visibility
    const { fetchRideHistory, rideHistory, isFetchingRideHistory,authUser } = useAuthStore();
    const showImg = () => {
        setShowImage((prev) => !prev);
    };
    useEffect(() => {
        fetchRideHistory(authUser._id);
    }, []);

    if (isFetchingRideHistory)
        return (
            <div className="flex flex-col w-screen h-screen items-center">
                <Header />
                <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
            </div>
        );

    if (rideHistory.length === 0)
        return (
            <div className="flex flex-col w-screen h-screen items-center justify-center">
                <Header />
                <h2 className="text-green-500 font-extrabold text-2xl">OOPS! No rides yet!</h2>
                <DotLottieReact
                    src="https://lottie.host/81e298c1-23c4-4e6f-90bc-d6b2be2cb855/HiJc54TIwT.lottie"
                    loop
                    autoplay
                    height={"100px"}

                />
            </div>
        )

    return (
        <div className="flex flex-col w-screen h-screen bg-gray-100 overflow-y-auto">
            <Header />
            <div className="max-w-4xl mx-auto p-4 ">
                <h2 className="text-2xl font-semibold mb-4">Orders</h2>

                {/* Ride List */}
                <div className="space-y-4">
                    {rideHistory.map((ride) => (
                        <div key={ride._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex" onClick={showImg}>
                            <div className="flex justify-center mt-4 w-1/2">
                                {ride.rideName === "RideIT GO" ? (
                                    <img alt="RideIT Go" height="124" width="180" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png" />
                                ) : ride.rideName === "RideIT Moto" ? (
                                    <img alt="RideIT Moto" height="124" width="180" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png" />
                                ) : ride.rideName === "RideIT Auto" ? (
                                    <img alt="RideIT Auto" height="124" width="180" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png" />
                                ) : ride.rideName === "RideIT Premier" ? (
                                    <img alt="Premier" height="124" width="180" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png" />
                                ) : ride.rideName === "RideIT XL" ? (
                                    <img alt="UberXL" height="124" width="180" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png" />
                                ) : null}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-blue-500" width={"50px"} />
                                    <div className="flex flex-col">
                                        <span className="text-gray-800 font-bold text-lg">{ride.startLocation}</span>
                                        <span className="text-sm text-gray-500">Pickup point</span>
                                    </div>
                                </div>
                                <div className="border-l-2 border-gray-300 ml-3.5 h-14"></div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-red-500" width={"50px"} />
                                    <div className="flex flex-col">
                                        <span className="text-gray-800 font-bold text-lg">{ride.endLocation}</span>
                                        <span className="text-sm text-gray-500">Destination</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-md">Payment ₹{ride.fareAmount}</span>
                                    <span className="text-gray-500">Distance {ride.distance}Km</span>
                                    {showImage && ride.mapScreenShot && (
                                        <div
                                            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 flex items-center justify-center z-50"
                                            onClick={showImg} // Close when clicking outside
                                        >
                                            <img
                                                src={ride.mapScreenShot}
                                                alt="Ride Map Screenshot"
                                                className="max-w-full h-5/6 rounded-lg shadow-lg"
                                            />
                                            <button
                                                onClick={showImg}
                                                className="absolute top-4 right-4 bg-black flex items-center justify-center text-white p-2 rounded-full text-lg hover:bg-gray-600 transition w-8 h-8"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Activity;

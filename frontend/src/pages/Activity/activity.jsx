import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader2 } from "lucide-react";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Header from "../../components/user/Header";
    
const Activity = () => {
    
    const { fetchRideHistory, rideHistory, isFetchingRideHistory } = useAuthStore();

    useEffect(() => {
        fetchRideHistory();
    }, [fetchRideHistory]);

    if (isFetchingRideHistory)
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
            </div>
        );

    if (rideHistory.length === 0)
      return (
        <div className="flex flex-col h-screen items-center justify-center ">
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
        <div className="max-w-3xl mx-auto p-4">
        <Header />

            <h2 className="text-2xl font-semibold mb-4">Ride History</h2>
            <div className="space-y-4">
                {rideHistory.map((ride) => (
                    <div key={ride._id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-lg">{ride.destination}</h3>
                            <p className="text-sm text-gray-600">{new Date(ride.pickupTime).toLocaleString()}</p>
                            <p className="font-semibold">₹{ride.fare}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-500 rounded-lg text-sm">Help</button>
                            <button className="px-3 py-1 border border-gray-500 rounded-lg text-sm">Details</button>
                            <button className="px-3 py-1 border border-gray-500 rounded-lg text-sm">Rebook</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Activity;

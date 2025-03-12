import { Calendar, MapPin, DollarSign, Clock, CheckCircle, XCircle, Car } from "lucide-react";
import { useDriverStore } from "../../store/useDriverStore";
import { useEffect } from "react";
const DriverRideHistory = () => {
    const { fetchDriverRideHistory, driverRideHistory } = useDriverStore();
    useEffect(() => {
        fetchDriverRideHistory();
    }, []);
    return (
        <div className="w-2/3 mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ride History</h2>
            <div className="space-y-6">
                {driverRideHistory?.length > 0 ? (
                    driverRideHistory.map((ride) => (
                        <div key={ride._id} className="bg-white shadow-lg rounded-lg p-5 flex flex-col space-y-4 border border-gray-200">
                            {/* Ride Details */}
                            <div className="flex items-center space-x-4">
                                <Car className="text-blue-500" size={24} />
                                <h3 className="text-xl font-semibold text-gray-700">{ride.rideName}</h3>
                            </div>

                            {/* Locations */}
                            <div className="flex justify-between text-gray-600 text-sm">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="text-green-500" size={20} />
                                    <span className="font-medium">{ride.startLocation}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="text-red-500" size={20} />
                                    <span className="font-medium">{ride.endLocation}</span>
                                </div>
                            </div>

                            {/* Ride Details */}
                            <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
                                <div className="flex items-center space-x-2">
                                    <Clock className="text-gray-500" size={20} />
                                    <span>Pickup: {new Date(ride.pickupTime).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="text-gray-500" size={20} />
                                    <span>Dropoff: {new Date(ride.dropoffTime).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <DollarSign className="text-yellow-500" size={20} />
                                    <span>Fare: ${ride.fareAmount}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="text-blue-500" size={20} />
                                    <span>Distance: {ride.distance} km</span>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    {ride.rideStatus === "completed" ? (
                                        <CheckCircle className="text-green-500" size={20} />
                                    ) : (
                                        <XCircle className="text-red-500" size={20} />
                                    )}
                                    <span className="text-sm font-medium">
                                        Status: <span className="capitalize">{ride.rideStatus}</span>
                                    </span>
                                </div>

                                {/* Ride Rating */}
                                <span className="text-sm text-gray-600">⭐ {ride.rating}/5</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No ride history available.</p>
                )}
            </div>
        </div>
    );
};

export default DriverRideHistory;

import {
    Calendar,
    MapPin,
    DollarSign,
    Clock,
    CheckCircle,
    XCircle,
    Car,
} from "lucide-react";
import { useDriverStore } from "../../store/useDriverStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DriverRideHistory = () => {
    const { fetchDriverRideHistory, driverRideHistory, logout } =
        useDriverStore();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        fetchDriverRideHistory();
    }, []);
    const DriverLogout = () => {
        logout();
    };
    return (
        <div className="flex justify-center bg-[#e5e7eb] relative">
            <button
                className="btn btn-circle swap swap-rotate fixed z-40 md:hidden left-0"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                {/* Hamburger Icon */}
                {!isSidebarOpen ? (
                    <svg
                        className="fill-current cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                    >
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>
                ) : (
                    /* Close Icon */
                    <svg
                        className="fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 512 512"
                    >
                        <path d="M400 145L367 112 256 223 145 112 112 145 223 256 112 367 145 400 256 289 367 400 400 367 289 256 400 145Z" />
                    </svg>
                )}
            </button>
            {/* Sidebar */}
            <div
                key={isSidebarOpen} // Forces re-render
                id="sidebardash"
                className={`fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 transition-all duration-300 ease-in-out transform z-30 
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
  md:translate-x-0 md:block`}
            >
                <ul className="mt-4">
                    <span className="text-gray-400 font-bold">ADMIN</span>
                    <li className="mb-1 group">
                        <a
                            href="/dashboard"
                            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md"
                        >
                            <span className="text-sm">Dashboard</span>
                        </a>
                    </li>
                    <li className="mb-1 group">
                        <Link
                            to="/dashboard"
                            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md"
                        >
                            <span className="text-sm">Cabs</span>
                        </Link>
                    </li>
                    <li className="mb-1 group">
                        <Link
                            to="/driver-rides"
                            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md"
                        >
                            <span className="text-sm">Rides</span>
                        </Link>
                    </li>
                    <span className="text-gray-400 font-bold">PERSONAL</span>
                    <li className="mb-1 group">
                        <Link
                            to="/driver-profile"
                            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md"
                        >
                            <span className="text-sm">Profile</span>
                        </Link>
                    </li>
                    <li className="mb-1 group" onClick={DriverLogout}>
                        <p className="flex cursor-pointer font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md">
                            <span className="text-sm">Logout</span>
                        </p>
                    </li>
                </ul>
            </div>

            {/* Ride History Content */}
            <div className="w-screen md:w-2/3 h-screen mx-auto p-6 space-y-6 fixed md:right-32 overflow-y-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Ride History</h2>
                <div className="space-y-6">
                    {driverRideHistory?.length > 0 ? (
                        driverRideHistory.map((ride) => (
                            <div
                                key={ride._id}
                                className="bg-white shadow-lg rounded-lg p-5 flex flex-col space-y-4 border border-gray-200"
                            >
                                {/* Ride Details */}
                                <div className="flex items-center space-x-4">
                                    <Car className="text-blue-500" size={24} />
                                    <h3 className="text-xl font-semibold text-gray-700">
                                        {ride.rideName}
                                    </h3>
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
                                        <span>
                                            Pickup: {new Date(ride.pickupTime).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="text-gray-500" size={20} />
                                        <span>
                                            Dropoff: {new Date(ride.dropoffTime).toLocaleString()}
                                        </span>
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
                                            Status:{" "}
                                            <span className="capitalize">{ride.rideStatus}</span>
                                        </span>
                                    </div>

                                    {/* Ride Rating */}
                                    <span className="text-sm text-gray-600">
                                        ⭐ {ride.rating}/5
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No ride history available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DriverRideHistory;

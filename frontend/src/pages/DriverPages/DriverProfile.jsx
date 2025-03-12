import React,{useEffect} from "react";
import { Pencil, CheckCircle, XCircle, Car, Mail, Phone, Star, BadgeCheck } from "lucide-react";
import { useDriverStore } from "../../store/useDriverStore";

const DriverProfile = () => {
    const { authDriver, checkAuthDriver } = useDriverStore();
     useEffect(() => {
        checkAuthDriver();
     }, []);
  if (!authDriver) return <p className="text-center text-gray-500">No driver data available</p>;

  return (
    <div className="w-2/3 h-screen mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6">
      {/* Profile Section */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <img
            src={authDriver.profilePic}
            alt={authDriver.fullName}
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-xl font-semibold">{authDriver.fullName}</h2>
            <p className="text-gray-500">Professional Driver</p>
          </div>
        </div>
        <button className="flex items-center space-x-1 text-blue-500 hover:underline">
          <Pencil size={16} />
          <span>Edit</span>
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <button className="flex items-center space-x-1 text-blue-500 hover:underline">
            <Pencil size={16} />
            <span>Edit</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-gray-700 flex items-center space-x-2">
              <Mail size={16} /> <span>{authDriver.email}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-700 flex items-center space-x-2">
              <Phone size={16} /> <span>{authDriver.phoneNumber}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">License Number</p>
            <p className="text-gray-700">{authDriver.licenseNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Created</p>
            <p className="text-gray-700">{new Date(authDriver.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Car size={20} className="text-blue-500" />
            <span>Vehicle Information</span>
          </h3>
          <button className="flex items-center space-x-1 text-blue-500 hover:underline">
            <Pencil size={16} />
            <span>Edit</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-gray-700">{authDriver.vehicleType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Model</p>
            <p className="text-gray-700">{authDriver.vehicleModel}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Vehicle Number</p>
            <p className="text-gray-700">{authDriver.vehicleNumber}</p>
          </div>
        </div>
      </div>

      {/* Status & Ratings */}
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          {authDriver.availabilityStatus ? (
            <CheckCircle className="text-green-500" size={20} />
          ) : (
            <XCircle className="text-red-500" size={20} />
          )}
          <p className="text-gray-700">{authDriver.availabilityStatus ? "Available" : "Not Available"}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-500" size={20} />
          <p className="text-gray-700">{authDriver.ratings} Stars</p>
        </div>
        <div className="flex items-center space-x-2">
          {authDriver.profileCompleted ? (
            <BadgeCheck className="text-green-500" size={20} />
          ) : (
            <XCircle className="text-red-500" size={20} />
          )}
          <p className="text-gray-700">{authDriver.profileCompleted ? "Profile Complete" : "Incomplete Profile"}</p>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;

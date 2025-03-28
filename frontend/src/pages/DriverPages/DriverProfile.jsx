import React, { useEffect,useState } from "react";
import { Pencil, CheckCircle, XCircle, Car, Mail, Phone, Star, BadgeCheck } from "lucide-react";
import { useDriverStore } from "../../store/useDriverStore";
import { Link } from "react-router-dom";

const DriverProfile = () => {
  const { authDriver, checkAuthDriver,logout } = useDriverStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    checkAuthDriver();
  }, []);
  const DriverLogout = ()=>{
    logout();
  }


  if (!authDriver) return <p className="text-center text-gray-500">No driver data available</p>;

  return (
    <div className="flex w-screen bg-white relative">
      <button
        className="btn btn-circle swap swap-rotate fixed z-40 md:hidden"
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
            <a href="/dashboard" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md">
              <span className="text-sm">Dashboard</span>
            </a>
          </li>
          <li className="mb-1 group">
            <Link to="/dashboard" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md">
              <span className="text-sm">Cabs</span>
            </Link>
          </li>
          <li className="mb-1 group">
            <Link to="/driver-rides" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md">
              <span className="text-sm">Rides</span>
            </Link>
          </li>
          <span className="text-gray-400 font-bold">PERSONAL</span>
          <li className="mb-1 group">
            <Link to="/driver-profile" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md">
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

      {/* Main Content */}
      <div className="w-screen md:w-2/3 h-screen mx-auto bg-white p-6 space-y-6 fixed md:right-32">
        {/* Profile Section */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <img src={authDriver.profilePic} alt={authDriver.fullName} className="w-16 h-16 rounded-full border-2 border-gray-300" />
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
            {authDriver.availabilityStatus ? <CheckCircle className="text-green-500" size={20} /> : <XCircle className="text-red-500" size={20} />}
            <p className="text-gray-700">{authDriver.availabilityStatus ? "Available" : "Not Available"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-500" size={20} />
            <p className="text-gray-700">{authDriver.ratings} Stars</p>
          </div>
          <div className="flex items-center space-x-2">
            {authDriver.profileCompleted ? <BadgeCheck className="text-green-500" size={20} /> : <XCircle className="text-red-500" size={20} />}
            <p className="text-gray-700">{authDriver.profileCompleted ? "Profile Complete" : "Incomplete Profile"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;

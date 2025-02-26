import { useAuthStore } from "../../store/useAuthStore";
import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-black text-white flex justify-between items-center px-6 py-3.5 w-full sticky top-0">
      <h1 className="text-xl font-semibold">RideIT</h1>
      <div className="flex space-x-6 items-center">

        {/* Ride Button */}
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive ? "border-b-2 border-green-500 text-green-400" : "text-gray-400"
            }`
          }
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <title>Car front</title>
            <path
              d="m20.9 9-1.5-4.6c-.3-.8-1-1.4-1.9-1.4H6.4c-.9 0-1.6.5-1.9 1.4L3 9H1v3h1v9h4v-2h12v2h4v-9h1V9h-2.1ZM5 14h4v2H5v-2Zm10 2v-2h4v2h-4ZM7.1 6h9.7l1.3 4H5.8l1.3-4Z"
              fill="currentColor"
            ></path>
          </svg>
          <span>Ride</span>
        </NavLink>

        {/* Activity */}
        <NavLink
          to="/activity"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition ${isActive ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
            }`
          }
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><title>Receipt</title><path fill-rule="evenodd" clip-rule="evenodd" d="M3 23V1h18v22l-5.5-3-3.5 3-3.5-3L3 23ZM7 9h10V6H7v3Zm10 3H7v3h10v-3Z" fill="currentColor"></path></svg>
          <span>Activity</span>
        </NavLink>

        {/* User Name */}
        <span className="bg-gray-700 px-3 py-1 rounded-lg">
          {authUser?.fullName}
        </span>

        {/* Logout Button */}
        <button className="flex gap-2 items-center" onClick={logout}>
          <LogOut className="size-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

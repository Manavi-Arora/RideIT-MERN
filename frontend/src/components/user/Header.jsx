import { useAuthStore } from "../../store/useAuthStore";
import { LogOut } from "lucide-react";

const Header = () => {
    const {logout,authUser} = useAuthStore();
    return (
      <header className="bg-black text-white flex justify-between items-center px-6 py-3">
        <h1 className="text-xl font-semibold">RideIT</h1>
        <div className="flex space-x-4">
          <span>Wallet</span>
          <span>Receipts</span>
          <span>Account</span>
          <span className="bg-gray-700 px-3 py-1 rounded-lg">{authUser.fullName}</span>
          <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
    );
  };
  
  export default Header;
  
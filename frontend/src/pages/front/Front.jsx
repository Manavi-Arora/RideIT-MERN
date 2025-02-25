import { Link } from "react-router-dom";

const Front = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white w-screen">
      <div className="text-center space-y-8 max-w-3xl">
        <h1 className="text-5xl font-extrabold uppercase tracking-wide drop-shadow-lg">
          Welcome to <span className="text-gray-400">RideIT</span>
        </h1>
        <p className="text-lg text-gray-300 italic">
          Elevate your journey—whether as a discerning rider or a professional captain of the road.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Signup Card */}
          <div className="p-8 bg-white/10 shadow-lg backdrop-blur-lg rounded-2xl border border-gray-600 transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-200">🚖 Embark as a Rider</h2>
            <p className="text-gray-400 mt-2">Seamless, swift, and sophisticated travel at your fingertips.</p>
            <Link 
              to="user/signup" 
              className="mt-5 inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Join as Rider
            </Link>
          </div>

          {/* Captain Signup Card */}
          <div className="p-8 bg-white/10 shadow-lg backdrop-blur-lg rounded-2xl border border-gray-600 transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-200">🚗 Command the Wheel</h2>
            <p className="text-gray-400 mt-2">Take the helm, chart your course, and earn on your own terms.</p>
            <Link 
              to="/signup/captain" 
              className="mt-5 inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Become a Captain
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front;

import { useState } from "react";
import { CircleDollarSign } from "lucide-react";

const rides = [
  {
    name: "Intercity",
    passengers: 4,
    timeAway: "6 mins away",
    time: "2:22 AM",
    description: "Affordable outstation rides in compact cars",
    price: 1145.98,
    originalPrice: 1169.37,
  },
  {
    name: "Sedan Intercity",
    passengers: 4,
    timeAway: "4 mins away",
    time: "2:20 AM",
    description: "Outstation rides in comfortable sedans",
    price: 1353.32,
    originalPrice: 1380.94,
  },
  {
    name: "Go Intercity",
    passengers: 4,
    timeAway: "2 mins away",
    time: "2:18 AM",
    description: "Affordable outstation rides in compact cars",
    price: 1263.71,
    originalPrice: 1299.50,
  },
];

const RideRateList = () => {
  const [selectedRide, setSelectedRide] = useState(null);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Choose a ride</h2>
      <p className="text-lg font-medium text-gray-600 mb-2">Recommended</p>
      <div className="space-y-3">
        {rides.map((ride, index) => (
          <div
            key={index}
            className={`border p-4 rounded-lg cursor-pointer transition duration-200 ${
              selectedRide === index ? "border-black shadow-md" : "border-gray-300"
            }`}
            onClick={() => setSelectedRide(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{ride.name} &#128663;</h3>
              <span className="text-sm text-gray-500">{ride.timeAway}</span>
            </div>
            <p className="text-gray-500 text-sm">{ride.time}</p>
            <p className="text-gray-600 text-sm mt-1">{ride.description}</p>
            <div className="flex justify-between items-center mt-2">
              <div className="text-lg font-semibold text-green-600">₹{ride.price.toFixed(2)}</div>
              <div className="text-sm text-gray-500 line-through">₹{ride.originalPrice.toFixed(2)}</div>
              <span className="text-green-600 text-xs">✅ 2% off</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <button className="flex items-center space-x-2 text-gray-700 font-medium">
         <CircleDollarSign className="text-green-600" /> <span>Cash</span>
        </button>
        <button
          className="bg-black text-white px-6 py-2 rounded-lg text-lg font-medium"
          disabled={selectedRide === null}
        >
          Request {selectedRide !== null ? rides[selectedRide].name : "Ride"}
        </button>
      </div>
    </div>
  );
};

export default RideRateList;

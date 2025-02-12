const RideRequestForm = () => {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter location"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
        />
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full p-3 border border-gray-300 rounded-lg mb-3"
        />
        <div className="flex space-x-2">
          <button className="flex-1 p-3 border border-gray-300 rounded-lg">Today</button>
          <button className="flex-1 p-3 border border-gray-300 rounded-lg">Now</button>
        </div>
      </div>
    );
  };
  
  export default RideRequestForm;
  
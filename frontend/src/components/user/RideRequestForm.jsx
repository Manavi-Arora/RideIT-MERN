import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useRideStore } from "../../store/useRideStore";

const API_KEY = "9c405678cd3a4a8683d0a7691e79be1e";

const RideRequestForm = () => {
  const { setPickup, setDropoff } = useRideStore();
  const [pickupOptions, setPickupOptions] = useState([]);
  const [dropoffOptions, setDropoffOptions] = useState([]);
  const [pickupValue, setPickupValue] = useState(""); // To manage pickup input
  const [dropoffValue, setDropoffValue] = useState(""); // To manage dropoff input
  const [pickupSelected, setPickupSelected] = useState(null); // To store selected pickup location
  const [dropoffSelected, setDropoffSelected] = useState(null); // To store selected dropoff location

  // Fetch autocomplete suggestions
  const fetchLocations = async (query, setOptions) => {
    if (query.length < 3) {
      setOptions([]); // Reset options if input is too short
      return;
    }

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${API_KEY}`
      );
      const options = response.data.features.map((feature) => ({
        value: feature.properties.formatted,
        label: feature.properties.formatted,
        coordinates: feature.geometry.coordinates,
      }));
      setOptions(options);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white w-full">
      {/* Pickup Location */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Pickup Location</label>
        <Select
          placeholder="Enter pickup location"
          options={pickupOptions}
          value={pickupSelected ? { label: pickupSelected.label, value: pickupSelected.value } : { label: pickupValue, value: pickupValue }} // Show current value of pickup or pickupValue
          onInputChange={(value) => {
            setPickupValue(value); // Update pickup input as user types
            if (value.trim() !== "") {
              fetchLocations(value, setPickupOptions);
            }
          }}
          onChange={(selected) => {
            setPickup(selected); // Store full object for pickup
            setPickupSelected(selected); // Set the selected pickup
            setPickupValue(selected ? selected.label : ""); // Set the input to selected value
          }}
          className="mb-3"
        />
      </div>

      {/* Drop-off Location */}
      <div className="mb-3">
        <label className="block text-sm font-semibold mb-1">Drop-off Location</label>
        <Select
          placeholder="Enter drop-off location"
          options={dropoffOptions}
          value={dropoffSelected ? { label: dropoffSelected.label, value: dropoffSelected.value } : { label: dropoffValue, value: dropoffValue }} // Show current value of dropoff or dropoffValue
          onInputChange={(value) => {
            setDropoffValue(value); // Update dropoff input as user types
            if (value.trim() !== "") {
              fetchLocations(value, setDropoffOptions);
            }
          }}
          onChange={(selected) => {
            setDropoff(selected); // Store full object for dropoff
            setDropoffSelected(selected); // Set the selected dropoff
            setDropoffValue(selected ? selected.label : ""); // Set the input to selected value
          }}
          className="mb-3"
        />
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 p-3 border border-gray-300 rounded-lg">
          Today
        </button>
        <button className="flex-1 p-3 border border-gray-300 rounded-lg">
          Now
        </button>
      </div>
    </div>
  );
};

export default RideRequestForm;

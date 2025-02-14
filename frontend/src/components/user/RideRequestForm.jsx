import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useRideStore } from "../../store/useRideStore";

const API_KEY = "4881edf15f62432dbcd861fdbb4f0983";

const RideRequestForm = () => {
    const { setPickup, setDropoff } = useRideStore();
    const [pickupOptions, setPickupOptions] = useState([]);
    const [dropoffOptions, setDropoffOptions] = useState([]);
    const [pickupValue, setPickupValue] = useState("");
    const [dropoffValue, setDropoffValue] = useState("");
    const [pickupSelected, setPickupSelected] = useState(null);
    const [dropoffSelected, setDropoffSelected] = useState(null);

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
            <div className="mb-3 relative">
                <div className="flex items-center gap-2">
                    <div className="_css-ipqQZy">
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <label className="block text-md font-semibold mb-1">Pickup Location</label>
                </div>
                <div className="relative">
                    <Select
                        placeholder="Enter pickup location"
                        options={pickupOptions}
                        value={pickupSelected || (pickupValue ? { label: pickupValue, value: pickupValue } : null)}
                        onInputChange={(value) => {
                            setPickupValue(value);
                            if (value.trim() !== "") {
                                fetchLocations(value, setPickupOptions);
                            }
                        }}
                        onChange={(selected) => {
                            setPickup(selected);
                            setPickupSelected(selected);
                            setPickupValue(selected ? selected.label : "");
                        }}
                        className="mb-3"
                    />
                    {pickupSelected && (
                        <button
                            className="absolute right-0 md:right-11 top-2.5 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setPickup(null);
                                setPickupSelected(null);
                                setPickupValue("");
                            }}
                        >
                            <div class="_css-jYsWkC"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" data-baseweb="icon" aria-label="Clear value" role="button"><title>Clear value</title><path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1Zm6 15-2 2-4-4-4 4-2-2 4-4-4-4 2-2 4 4 4-4 2 2-4 4 4 4Z" fill="currentColor"></path></svg></div>
                        </button>
                    )}
                </div>
            </div>

            {/* Drop-off Location */}
            <div className="mb-3 relative">
                <div className="flex items-center gap-2">
                    <div className="_css-ipqQZy">
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M22 2H2v20h20V2Zm-7 7H9v6h6V9Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <label className="block text-md font-semibold mb-1">Drop-off Location</label>
                </div>
                <div className="relative">
                    <Select
                        placeholder="Enter drop-off location"
                        options={dropoffOptions}
                        value={dropoffSelected || (dropoffValue ? { label: dropoffValue, value: dropoffValue } : null)}
                        onInputChange={(value) => {
                            setDropoffValue(value);
                            if (value.trim() !== "") {
                                fetchLocations(value, setDropoffOptions);
                            }
                        }}
                        onChange={(selected) => {
                            setDropoff(selected);
                            setDropoffSelected(selected);
                            setDropoffValue(selected ? selected?.label : "");
                        }}
                        className="mb-3"
                    />
                    {dropoffSelected && (
                        <button
                            className="absolute right-0 md:right-11 top-2.5 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                                setDropoff(null);
                                setDropoffSelected(null);
                                setDropoffValue("");
                            }}
                        >
                            <div class="_css-jYsWkC"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" data-baseweb="icon" aria-label="Clear value" role="button"><title>Clear value</title><path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1Zm6 15-2 2-4-4-4 4-2-2 4-4-4-4 2-2 4 4 4-4 2 2-4 4 4 4Z" fill="currentColor"></path></svg></div>
                        </button>

                    )}
                </div>
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

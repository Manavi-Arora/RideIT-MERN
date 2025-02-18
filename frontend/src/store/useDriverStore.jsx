import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useRideStore } from "./useRideStore";

export const useDriverStore = create((set, get) => ({
    drivers: [], 
    assignedDriver: null, 
    findingDriver: false,
    setFindingDriver: (findingDriver) => set({ findingDriver }),

    fetchDrivers: async () => {
        try {
            const { data } = await axiosInstance.get("/driver/get-drivers");
            set({ drivers: data });
        } catch (error) {
            console.error("Error fetching drivers:", error);
            toast.error("Failed to load drivers.");
        }
    },

    assignDriver: () => {  // Accept rideDetails as a parameter
        const { drivers } = get();
        const { rideDetails } = useRideStore.getState();

        // Find the matching ride from the rideData array
        const rideData = [
            { name: "RideIT Auto", vehicleType: "Auto" },
            { name: "RideIT Moto", vehicleType: "Moto" },
            { name: "RideIT GO", vehicleType: "Car" },
            { name: "RideIT XL", vehicleType: "SUV" },
            { name: "RideIT Premier", vehicleType: "Luxury Car" }
        ];

        const matchingRide = rideData.find((ride) => ride.name === rideDetails?.name);

        if (!matchingRide) {
            toast.error("No matching ride found.");
            return;
        }

        const availableDrivers = drivers.filter(
            (driver) => driver.vehicleType === matchingRide.vehicleType
        );

        if (availableDrivers.length === 0) {
            toast.error("No drivers available for the selected ride type.");
            return;
        }

        const randomDriver = availableDrivers[Math.floor(Math.random() * availableDrivers.length)];
        set({ assignedDriver: randomDriver });
        toast.success(`Driver ${randomDriver.fullName} assigned!`);
    },

    updateDriverLocation: async (latitude, longitude) => {
        const assignedDriver = get().assignedDriver;

        if (!assignedDriver) {
            toast.error("No driver assigned!");
            return;
        }

        try {
            await axiosInstance.put(`/driver/update-location/${assignedDriver._id}`, { latitude, longitude });
        } catch (error) {
            console.error("Error updating driver location:", error);
            toast.error("Failed to update driver location.");
        }
    },
}));

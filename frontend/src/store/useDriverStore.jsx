import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useRideStore } from "./useRideStore";

export const useDriverStore = create((set, get) => ({
    authDriver: null,
    isSigningUp: false,
    isLoggingIn: false,
    drivers: [],
    assignedDriver: null,
    findingDriver: false,
    isUpdatingProfile : false,
    driverRideHistory : null,
    setFindingDriver: (findingDriver) => set({ findingDriver }),

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/driver/check");
            console.log("Full Auth Driver Data:", res.data);
            set({ authDriver: res.data });
            //get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth", error.message);
            set({ authDriver: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        //get().connectSocket();
        try {
            const res = await axiosInstance.post("/driver/signup", data);
            set({ authDriver: res.data });
            toast.success("Account created successfully");
            return res.data; 
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        //get().connectSocket();
        try {
            const res = await axiosInstance.post("/driver/login", data);
            set({ authDriver: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/driver/logout");
            set({ authDriver: null });
            //get().disconnectSocket();
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    },

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

    completeProfile: async (data) => {
        set({ isUpdatingProfile: true });
    
        try {
            const res = await axiosInstance.post("/driver/complete-profile", data, {
                withCredentials: true, // Ensure cookies are sent if using JWT in cookies
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            set({ authDriver: res.data.driver, profileCompleted: true });

        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    fetchDriverRideHistory: async () => {
        
        try {
          const res = await axiosInstance.get("/driver/driver-ride-history"); 
          set({ driverRideHistory: res.data.rides });
        } catch (error) {
          toast.error("Failed to fetch driver ride history.");
          console.error("Error fetching driver ride history:", error);
        } 
      },
       
}));

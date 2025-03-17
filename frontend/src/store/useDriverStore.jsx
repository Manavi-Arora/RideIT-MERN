import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useRideStore } from "./useRideStore";
import { useAuthStore } from "./useAuthStore";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"

export const useDriverStore = create((set, get) => ({
    authDriver: null,
    isSigningUp: false,
    isLoggingIn: false,
    drivers: [],
    newRides: [],
    currentRide: null,
    assignedDriver: null,
    findingDriver: false,
    isUpdatingProfile: false,
    driverRideHistory: null,
    isCheckingAuth: true,
    socket: null,
    setCurrentRide: (currentRide) => set({ currentRide }),
    connectSocket: () => {
        const { authDriver } = get()
        if (!authDriver || get().socket?.connected)
            return

        const socket = io(BASE_URL, {
            query: {
                driverId: authDriver._id,
                userId: ""
            }
        })
        socket.connect()
        set({ socket: socket })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket.disconnect()
        }
    },
    setAccepted: (rideIndex) => {
        set((state) => {
            const updatedRides = state.newRides
            !get().currentRide && updatedRides.map((ride, index) => {
                if (index === rideIndex) {
                    return { ...ride, accepted: true };
                }
                return ride;
            });

            return {
                newRides: updatedRides,
                currentRide: state.newRides[rideIndex],
            };
        });
    },

    subscribeToRides: () => {
        const socket = get().socket

        socket?.on("newRide", (data, callback) => {
            console.log("Ride received");
            const ride = { ...data, accepted: false };

            // Add the new ride safely
            set({ newRides: [...get().newRides, ride] });

            console.log("New rides:", get().newRides);

            if (get().currentRide) {
                callback(false); // Reject if a ride is already active
                return;
            }

            const rideIndex = get().newRides.findIndex(r => r === ride); // Track the added ride

            setTimeout(() => {
                const updatedRides = get().newRides;

                if (updatedRides[rideIndex]) {
                    callback(updatedRides[rideIndex].accepted); // ✅ Safe access
                } else {
                    callback(false); // Ride was removed or modified
                }

                // Safely remove the ride from the list
                set({ newRides: updatedRides.filter((_, index) => index !== rideIndex) });
            }, 60000); // 60 seconds
        });

    },
    unsubscribeFromRides: () => {
        const socket = get().socket
        socket?.off("newRide")
    },
    setFindingDriver: (findingDriver) => set({ findingDriver }),
    setAuthDriver: (driver) => set({ authDriver: driver }),
    checkAuthDriver: async () => {
        try {
            const res = await axiosInstance.get("/driver/check");
            console.log("Full Auth Driver Data:", res.data);
            set({ authDriver: res.data });
            useAuthStore.getState().setAuthUser(null);
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth", error.message);
            set({ authDriver: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        //get().connectSocket();
        try {
            const res = await axiosInstance.post("/driver/signup", data);
            set({ authDriver: res.data });
            useAuthStore.getState().setAuthUser(null);
            toast.success("Account created successfully");
            get().connectSocket();

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
            useAuthStore.getState().setAuthUser(null);
            toast.success("Logged in successfully");
            get().connectSocket();

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
            get().disconnectSocket();
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

    assignDriver: async () => {  // Accept rideDetails as a parameter
        const { drivers } = get();
        const { rideDetails } = useRideStore.getState();

        // Find the matching ride from the rideData array
        const rideData = [
            { name: "RideIT Auto", vehicleType: "Auto" },
            { name: "RideIT Moto", vehicleType: "Moto" },
            { name: "RideIT GO", vehicleType: "Car" },
            { name: "RideIT XL", vehicleType: "SUV" },
            { name: "RideIT Premier", vehicleType: "LuxuryCar" }
        ];

        const matchingRide = rideData.find((ride) => ride.name === rideDetails?.name);

        if (!matchingRide) {
            toast.error("No matching ride found.");
            return;
        }

        const availableDrivers = drivers.filter(
            (driver) => driver.vehicleType === matchingRide.vehicleType
        );
        console.log("Avl drivers", availableDrivers);

        if (availableDrivers.length === 0) {
            toast.error("No drivers available for the selected ride type.");
            return;
        }

        const onlineDrivers = useAuthStore.getState().onlineDrivers;

        const filteredDrivers = availableDrivers.filter((driver) => onlineDrivers.includes(driver._id))
        console.log("Flt drv:", filteredDrivers);
        await get().checkDriver(filteredDrivers);
    },

    checkDriver: async (filteredDrivers) => {

        try {
            if (filteredDrivers.length === 0) {
                toast.error("No drivers available for the selected ride type.");
                return;
            } // No available filtered drivers
            const data = useRideStore.getState().rideDetails;
            // Define a helper function to handle the retry logic
            const tryCheckDriver = async (driver) => {
                try {
                    const response = await axiosInstance.put(`/ride/checkDriver/${driver._id}`, data);
                    return response.data.accepted;
                } catch (error) {
                    console.error("Error checking driver:", error);
                    return false;
                }
            };

            // Loop through drivers until one accepts the ride or we run out of time
            let driver = null;
            let accepted = false;
            let retries = 0;
            const maxRetries = filteredDrivers.length; // Limit retries to the number of drivers

            while (retries < maxRetries && !accepted) {
                driver = filteredDrivers[retries];
                console.log("Checking: ", driver);
                accepted = await tryCheckDriver(driver); // Check if this driver accepts the ride
                console.log("acpt: ", accepted);
                retries++;

                if (accepted) {
                    set({ assignedDriver: driver });
                    toast.success(`Driver ${driver.fullName} assigned!`); // Return the first driver who accepts
                    return;
                }
            }

            // If no driver accepted the ride, return null
            return null;

        } catch (error) {
            console.error("Error in checkDriver function:", error);
            return null;
        }
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

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useDriverStore = create((set, get) => ({
    drivers: [], 
    assignedDriver: null, 
    findingDriver : false,
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

    assignDriver: () => {
        const { drivers } = get();
        if (drivers.length === 0) {
            toast.error("No drivers available at the moment.");
            return;
        }
        
        const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
        set({ assignedDriver: randomDriver });
        toast.success(`Driver ${randomDriver.fullName} assigned!`);
    },

}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useRideStore = create((set, get) => ({
    pickup : null,
    dropoff : null,
    setPickup: (pickup) => set({ pickup }),
    setDropoff: (dropoff) => set({ dropoff }),
}))
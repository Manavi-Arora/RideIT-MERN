import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useRideStore = create((set, get) => ({
    pickup : null,
    dropoff : null,
    userPosition : null,
    distance : null,
    setPickup: (pickup) => set({ pickup }),
    setDropoff: (dropoff) => set({ dropoff }),
    setUserPosition: (userPosition) => set({ userPosition }),
    setDistance: (distance) => set({ distance }),
}))
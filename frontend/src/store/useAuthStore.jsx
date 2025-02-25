import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"
export const useAuthStore = create((set, get) => ({
  
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  showSidebar : true,
  rideHistory: [],
  isFetchingRideHistory: false,
  setShowSidebar : (value) => set({showSidebar : value}),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      //get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  fetchRideHistory: async () => {
    set({ isFetchingRideHistory: true });

    try {
      const res = await axiosInstance.get("/auth/ride-history"); // API call
      set({ rideHistory: res.data.rides }); // Store ride history in Zustand state
    } catch (error) {
      toast.error("Failed to fetch ride history.");
      console.error("Error fetching ride history:", error);
    } finally {
      set({ isFetchingRideHistory: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    //get().connectSocket();
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    //get().connectSocket();
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      //get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  },
}))
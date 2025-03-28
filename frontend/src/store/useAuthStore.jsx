import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";
import { useDriverStore } from "./useDriverStore";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/"
export const useAuthStore = create((set, get) => ({

  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  showSidebar: true,
  rideHistory: [],
  isFetchingRideHistory: false,
  onlineDrivers : [],
  socket:null,
  connectSocket: () => {
      
    if(!get().authUser || get().socket?.connected)
      return;

    const socket = io(BASE_URL,{
        query: {
            driverId : "",
            userId : get().authUser._id
        }
    })
    socket.connect()
    set({socket : socket})
  },
  disconnectSocket: () => {
    if(get().socket?.connected)
    {
      get().socket.disconnect()
    }
  },
  subscribeToDrivers: () => {
    const socket = get().socket
    socket?.on("getOnlineDrivers",(data) => {
      console.log(data);
      set({onlineDrivers : data})
    });
  },
  unsubscribeFromDrivers: () => {
    const socket = get().socket
    socket?.off("getOnlineDrivers")
  },
  setShowSidebar: (value) => set({ showSidebar: value }),
  setAuthUser: (user) => set({ authUser: user }),
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      useDriverStore.getState().setAuthDriver(null);
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  fetchRideHistory: async (id) => {
    try {
      const res = await axiosInstance.get(`/auth/user-ride-history/${id}`);
      console.log("Ride history:", res.data.rides);
      set({ rideHistory: res.data.rides });
    } catch (error) {
      console.error("Error fetching ride history:", error);
    }
  },


  signup: async (data) => {
    set({ isSigningUp: true });
    //get().connectSocket();
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      useDriverStore.getState().setAuthDriver(null);
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    // get().connectSocket();
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      useDriverStore.getState().setAuthDriver(null);
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
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  },
}))
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID; // Ensure this is correct

export const useRideStore = create((set, get) => ({
    pickup: null,
    dropoff: null,
    userPosition: null,
    distance: null,
    showRateList: false,
    price: null,
    paymentMethod: null,
    rideDetails: null,
    rideStatus: "in Progress",
    setRideDetials: (rideDetails) => set({ rideDetails }),
    setRideStatus: (rideStatus) => set({ rideStatus }),
    setPickup: (pickup) => set({ pickup }),
    setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
    setShowRateList: (showRateList) => set({ showRateList }),
    setDropoff: (dropoff) => set({ dropoff }),
    setUserPosition: (userPosition) => set({ userPosition }),
    setDistance: (distance) => set({ distance }),

    // Handle Payment
    handlePayment: async (amount) => {
        try {
            const { data } = await axiosInstance.post("/ride/create-order", { amount });

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                const options = {
                    key: RAZORPAY_KEY_ID, // Ensure this is correct
                    amount: amount * 100,
                    currency: "INR",
                    name: "RideIT",
                    description: "Ride Fare Payment",
                    order_id: data.orderId,
                    handler: function (response) {
                        toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                    },
                    prefill: {
                        method: "upi",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            };

        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Payment failed. Please try again.");
        }
    },


    bookRide: async (rideDetails) => {
        try {
            const response = await axiosInstance.post("/ride/book-ride", rideDetails);
            if (response.status === 201) {
                toast.success("Ride booked successfully");
                console.log("Ride booked successfully:", response.data);
                return response.data;
            }
        } catch (error) {
            console.error("Error booking ride:", error.response?.data || error.message);
            throw error; 
        }
    },
}));

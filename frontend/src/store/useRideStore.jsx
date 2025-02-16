import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID; // Ensure this is correct

export const useRideStore = create((set, get) => ({
    pickup: null,
    dropoff: null,
    userPosition: null,
    distance: null,
    setPickup: (pickup) => set({ pickup }),
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
    }
}));

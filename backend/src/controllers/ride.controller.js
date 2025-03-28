import Ride from "../models/ride.model.js";
import Driver from "../models/driver.model.js";
import Razorpay from "razorpay";
import User from "../models/user.model.js";
import {io,getDriverSocketId} from "../lib/socket.js"

export const paymentByRazorpay = async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ error: "Razorpay keys not configured" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, 
      currency: "INR",
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};


export const bookRide = async (req, res) => {
  try {
    const {
      riderId,
      driverId,
      rideName,
      mapScreenShot,
      startLocation,
      endLocation,
      pickupTime,
      fareAmount,
      distance,
    } = req.body;

    // Validate input
    if (
      !riderId ||
      !driverId ||
      !rideName ||
      !mapScreenShot ||
      !startLocation ||
      !endLocation ||
      !pickupTime ||
      !fareAmount ||
      !distance
    ) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    // Check if the rider exists
    const rider = await User.findById(riderId);
    if (!rider) {
      return res.status(404).json({ message: "Rider not found." });
    }

    // Check if the driver exists
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found." });
    }

    // console.log("Check:", { riderId, driverId });

    // Create a new ride
    const newRide = new Ride({
      riderId, // ✅ Correct
      driverId, // ✅ Correct
      rideName,
      mapScreenShot,
      startLocation,
      endLocation,
      pickupTime,
      fareAmount,
      distance,
      rideStatus: "booked",
    });

    await newRide.save();

    // Return the created ride details
    res.status(201).json({ message: "Ride booked successfully", ride: newRide });

  } catch (error) {
    console.error("Error booking ride:", error);
    res.status(500).json({ message: "Server error while booking ride" });
  }
};

export const checkDriverAvailability =(req,res) => {
  try {
    const rideDetails = req.body;
    const driverId = req.params.id;
    let accepted = false; // Set default value
    
    const driverSocketId = getDriverSocketId(driverId);
    console.log("Emitting to:",driverSocketId);
    // Create a promise to handle the response asynchronously
    const rideAcceptedPromise = new Promise((resolve) => {
      io.to(driverSocketId).emit("newRide", rideDetails, (response) => {
        accepted = response; // Update accepted value
        resolve(); // Resolve the promise once the response is received
      });
    });
    
    // Wait for the driver to respond before sending the response
    rideAcceptedPromise.then(() => {
      console.log("drv acpt:",accepted);
      res.status(200).json({ accepted: accepted });
    });
    
  } catch (error) {
    res.status(500).json({message : "Internal Server Error"})
  }
};
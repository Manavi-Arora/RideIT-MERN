import Ride from "../models/ride.model";
import Driver from "../models/driver.model";


export const bookRide = async (req, res) => {
    try {
        const { riderId, driverId, startLocation, endLocation, pickupTime, fareAmount, distance } = req.body;

        // Validate input
        if (!riderId || !driverId || !startLocation || !endLocation || !pickupTime || !fareAmount || !distance) {
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

        // Create a new ride
        const newRide = new Ride({
            rider: riderId,
            driver: driverId,
            startLocation,
            endLocation,
            pickupTime,
            fareAmount,
            distance,
            rideStatus: 'booked',
        });

        await newRide.save();

        // Return the created ride details
        res.status(201).json({ message: "Ride booked successfully", ride: newRide });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while booking ride" });
    }
};
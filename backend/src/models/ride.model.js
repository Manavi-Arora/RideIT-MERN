import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the rider (User model)
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver", // Reference to the driver (Driver model)
      required: true,
    },
    rideName : {
      type:String,
      required :true,
    },
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
      required: true,
    },
    pickupTime: {
      type: Date,
      required: true,
    },
    dropoffTime: {
      type: Date,
    },
    fareAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    rideStatus: {
      type: String,
      enum: ['booked', 'in-progress', 'completed', 'cancelled'],
      default: 'booked',
    },
    distance: {
      type: Number, // Distance in kilometers or miles
    },
    mapScreenShot : {
      type : String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1, // Rating after completion
    },
    
},{ timestamps: true });

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;

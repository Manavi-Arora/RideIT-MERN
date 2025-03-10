import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    licenseNumber: {
      type: String,
      // required: true,
      unique: true,
      sparse : true,
    },
    vehicleType: {
      type: String,
      // required: true,
    },
    vehicleModel: {
      type: String,
      // required: true,
    },
    vehicleNumber: {
      type: String,
      // required: true,
      unique: true,
      sparse : true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    availabilityStatus: {
      type: Boolean,
      default: true, // True means the driver is available for rides
    },
    ratings: {
      type: Number,
      default: 0,
    },
    location: { 
      type: { type: String, default: "Point" }, 
      coordinates: { type: [Number], default: [0, 0] }  // [longitude, latitude]
    },
    profileCompleted: { type: Boolean, default: false }
},{ timestamps: true });

driverSchema.index({ location: "2dsphere" }); // Index for geospatial queries

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
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
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
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
},{ timestamps: true });

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;

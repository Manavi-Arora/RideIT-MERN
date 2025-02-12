import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import Driver from "../models/driver.model.js";
import Ride from "../models/ride.model.js";
import bcrypt from "bcryptjs";


export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signup = async (req, res) => {
    const { fullName, email, password, phoneNumber } = req.body;
    try {
      if (!fullName || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
  
      if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }

      if (phoneNumber.length != 10 || !/^\d{10}$/.test(phoneNumber)) {
        return res.status(400).json({ message: "Invalid Phone Number format" });
      }
  
      const user = await User.findOne({ email });
      const phone = await User.findOne({phoneNumber});
      if (user) return res.status(400).json({ message: "Email already exists" });
      if (phone) return res.status(400).json({ message: "Phone Number is already registered" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        fullName,
        email,
        phoneNumber,
        password: hashedPassword,
      });
  
      if (newUser) {
        // generate jwt token here
        generateToken(newUser._id, res);
        await newUser.save();
  
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
          phoneNumber: newUser.phoneNumber,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      generateToken(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export const logout = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

    export const getUserRidesHistory = async (req, res) => {
        try {
        const userId = req.userId;  // Assuming the user ID is available from the authenticated JWT
    
        // Fetch rides associated with the user, populate fields from the User and Driver models if needed
        const rides = await Ride.find({ rider: userId })
            .sort({ pickupTime: -1 })  // Sort by pickup time, newest first
            .populate("rider", "fullName email phoneNumber profilePic")  // Populate rider's details
            .populate("driver", "fullName email phoneNumber profilePic")  // Populate driver's details
    
        if (rides.length === 0) {
            return res.status(404).json({ message: "No ride history found for this user." });
        }
    
        // Respond with the ride history
        res.status(200).json({ rides });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
        }
    };
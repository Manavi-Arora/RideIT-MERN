import { generateToken } from "../lib/utils.js";
import Driver from "../models/driver.model.js";
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

      if (phoneNumber.length != 10) {
        return res.status(400).json({ message: "Invalid Phone Number format" });
      }
  
      const user = await Driver.findOne({ email });
  
      if (user) return res.status(400).json({ message: "Email already exists" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new Driver({
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
      const user = await Driver.findOne({ email });
  
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

  export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find({}, "-password"); // Exclude passwords for security
        res.status(200).json(drivers);
    } catch (error) {
        console.error("Error fetching drivers:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const updateDriverLocation = async (req, res) => {
    const { driverId } = req.params;
    const { latitude, longitude } = req.body;

    try {
        const driver = await Driver.findByIdAndUpdate(
            driverId,
            { location: { type: "Point", coordinates: [longitude, latitude] } },
            { new: true }
        );

        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }

        res.status(200).json({ message: "Location updated", driver });
    } catch (error) {
        console.error("Error updating driver location:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
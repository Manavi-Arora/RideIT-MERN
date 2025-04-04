import jwt from "jsonwebtoken";
import Driver from "../models/driver.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await Driver.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    req.userId = user.id;  
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const checkProfileCompletion = async (req, res, next) => {
  const driver = await Driver.findById(req.user.id);
  if (!driver.profileCompleted) {
      return res.status(403).json({ message: "Please complete your profile to proceed." });
  }
  next();
};

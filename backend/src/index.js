import dotenv from "dotenv";
dotenv.config();  // Load .env first

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import driverRoutes from "./routes/driver.route.js";
import rideRoutes from "./routes/ride.route.js";
import { connectDB } from "./lib/db.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/ride", rideRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectDB();
});

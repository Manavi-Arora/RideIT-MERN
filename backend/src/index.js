import dotenv from "dotenv";
import path from "path";
dotenv.config();  // Load .env first

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import driverRoutes from "./routes/driver.route.js";
import rideRoutes from "./routes/ride.route.js";
import { connectDB } from "./lib/db.js";
import {app,server} from "./lib/socket.js"

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
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

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  connectDB();
});

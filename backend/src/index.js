import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import driverRoutes from "./routes/driver.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser()); 
app.use("/api/auth",authRoutes);
app.use("/api/driver",driverRoutes);
app.use("/api/ride",driverRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
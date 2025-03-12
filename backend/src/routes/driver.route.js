import express from "express";
import { checkAuth, login, logout, signup, getAllDrivers, updateDriverLocation, driverDashboard, completeProfile,getDriverRidesHistory} from "../controllers/driver.controller.js";
import { protectRoute, checkProfileCompletion} from "../middleware/driver.middleware.js";
const router = express.Router();

router.post("/complete-profile", protectRoute, completeProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);
router.get("/get-drivers", getAllDrivers); // Route to fetch all drivers
router.get("/dashboard", checkProfileCompletion, driverDashboard);
router.get("/driver-ride-history", protectRoute, getDriverRidesHistory);

router.put("/update-location/:driverId", updateDriverLocation);
export default router;

import express from "express";
import { checkAuth, login, logout, signup, getAllDrivers} from "../controllers/driver.controller.js";
import { protectRoute } from "../middleware/driver.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);
router.get("/get-drivers", getAllDrivers); // Route to fetch all drivers

export default router;

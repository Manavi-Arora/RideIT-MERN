import express from "express";
import { checkAuth, login, logout, signup, getUserRidesHistory} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);
router.get("/ride-history", protectRoute, getUserRidesHistory);

export default router;

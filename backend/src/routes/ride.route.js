import express from "express";
import { bookRide,paymentByRazorpay } from "../controllers/ride.controller.js";
const router = express.Router();

router.post("/book", bookRide);
router.post("/create-order",paymentByRazorpay)
export default router;

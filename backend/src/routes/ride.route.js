import express from "express";
import { bookRide,paymentByRazorpay,checkDriverAvailability } from "../controllers/ride.controller.js";
const router = express.Router();

router.post("/book-ride", bookRide);
router.post("/create-order",paymentByRazorpay)

router.put("/checkDriver/:id",checkDriverAvailability)
export default router;

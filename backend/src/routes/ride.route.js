import express from "express";
import { bookRide } from "../controllers/ride.controller.js";
const router = express.Router();

router.post("/book", bookRide);

export default router;

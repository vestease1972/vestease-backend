// routes/order.routes.js
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createOrder,
  getMyOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

// Create order after payment
router.post("/", authMiddleware, createOrder);

// Get logged-in user's orders
router.get("/my", authMiddleware, getMyOrders);

export default router;

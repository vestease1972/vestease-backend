import express from "express";
import adminProtect from "../middleware/admin.middleware.js";
import Order from "../models/Order.js";

const router = express.Router();

/* ===============================
   GET ALL ORDERS (ADMIN)
================================ */
router.get("/", adminProtect, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;

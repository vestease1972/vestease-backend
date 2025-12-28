import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import adminProtect from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", adminProtect, async (req, res) => {
  const orders = await Order.find();
  const products = await Product.countDocuments();
  const coupons = await Coupon.countDocuments({ isActive: true });

  const revenue = orders.reduce(
    (sum, o) => (o.status === "PAID" ? sum + o.total : sum),
    0
  );

  res.json({
    orders: orders.length,
    products,
    coupons,
    revenue,
  });
});

export default router;

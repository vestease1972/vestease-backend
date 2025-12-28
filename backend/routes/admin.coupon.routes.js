import express from "express";
import adminProtect from "../middleware/admin.middleware.js";
import Coupon from "../models/Coupon.js";

const router = express.Router();

/* ===============================
   GET ALL COUPONS
================================ */
router.get("/", adminProtect, async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json(coupons);
});

/* ===============================
   CREATE COUPON
================================ */
router.post("/", adminProtect, async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json(coupon);
});

/* ===============================
   UPDATE COUPON
================================ */
router.put("/:id", adminProtect, async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(coupon);
});

/* ===============================
   DELETE COUPON
================================ */
router.delete("/:id", adminProtect, async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ message: "Coupon deleted" });
});

/* ===============================
   TOGGLE ACTIVE
================================ */
router.patch("/:id/toggle", adminProtect, async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  coupon.isActive = !coupon.isActive;
  await coupon.save();
  res.json(coupon);
});

export default router;
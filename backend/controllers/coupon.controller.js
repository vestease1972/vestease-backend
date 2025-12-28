import Coupon from "../models/Coupon.js";

export const validateCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    if (!code || !cartTotal) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      expiryDate: { $gte: new Date() },
    });

    if (!coupon) {
      return res.status(400).json({ message: "Invalid coupon code" });
    }

    if (cartTotal < coupon.minOrderValue) {
      return res.status(400).json({
        message: `Minimum order ₹${coupon.minOrderValue} required`,
      });
    }

    let discount = 0;

    if (coupon.discountType === "PERCENT") {
      discount = Math.floor((cartTotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      coupon: coupon.code,
      discount,
      finalTotal: cartTotal - discount,
    });
  } catch (err) {
    res.status(500).json({ message: "Coupon validation failed" });
  }
};

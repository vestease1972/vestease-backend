import Order from "../models/Order.js";
import Product from "../models/Product.js";

/* ===============================
   CREATE ORDER (AFTER PAYMENT)
================================ */
export const createOrder = async (req, res) => {
  try {
    const { items, total, paymentId } = req.body;

    // 🔒 STOCK VALIDATION
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      const sizeEntry = product.sizes.find(
        (s) => s.size === item.size
      );

      if (!sizeEntry || sizeEntry.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name} (${item.size})`,
        });
      }
    }

    // 🔽 DECREMENT STOCK
    for (const item of items) {
      await Product.updateOne(
        { _id: item.productId, "sizes.size": item.size },
        { $inc: { "sizes.$.stock": -item.quantity } }
      );
    }

    // 🧾 CREATE ORDER
    const order = await Order.create({
      user: req.user._id,
      items,
      total,
      paymentId,
      status: "PAID",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

/* ===============================
   GET LOGGED-IN USER ORDERS
================================ */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

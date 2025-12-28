// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        size: String,
        quantity: Number,
        image: String,
      },
    ],
    total: Number,
    paymentId: String,
    status: { type: String, default: "PAID" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

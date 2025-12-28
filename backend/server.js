import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/product.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

import adminRoutes from "./routes/admin.routes.js";
import adminProductRoutes from "./routes/admin.product.routes.js";
import adminStatsRoutes from "./routes/admin.stats.routes.js";
import adminOrdersRoutes from "./routes/admin.orders.routes.js";
import adminCouponRoutes from "./routes/admin.coupon.routes.js";

dotenv.config();
const app = express();

/* Fix __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   CORS — MUST BE FIRST
========================= */
app.use(
  cors({
    origin: ["https://vestease.in", "https://www.vestease.in"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* Body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */
/* PUBLIC ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

/* ADMIN ROUTES — SPECIFIC FIRST */
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/admin/orders", adminOrdersRoutes);
app.use("/api/admin/coupons", adminCouponRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("API running...");
});

connectDB();

const PORT = process.env.PORT || 5000;
/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  // Ensure CORS headers are present even on errors
  res.setHeader("Access-Control-Allow-Origin", "https://vestease.in");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

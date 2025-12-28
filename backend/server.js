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

/* __dirname fix */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



/* CORS — MUST BE FIRST */
app.use(
  cors({
    origin: "https://vestease.in",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* Preflight support */
app.options("*", cors());

app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/admin/orders", adminOrdersRoutes);
app.use("/api/admin/coupons", adminCouponRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

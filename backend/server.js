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

/* ===============================
   FIX __dirname FOR ES MODULES
================================ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===============================
   MIDDLEWARE
================================ */
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://vestease.in",
        "https://www.vestease.in"
      ];

      // allow server-to-server & Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
  })
);



app.use(express.json());

/* ===============================
   STATIC IMAGES (FIXED)
   Folder: /images (ROOT LEVEL)
   URL: http://localhost:5000/images/filename.jpg
================================ */


/* ===============================
   ROUTES
================================ */
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


/* ===============================
   TEST ROUTE
================================ */
app.get("/", (req, res) => {
  res.send("API running...");
});

/* ===============================
   DATABASE
================================ */
connectDB();

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

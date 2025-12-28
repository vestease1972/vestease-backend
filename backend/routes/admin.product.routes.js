import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminProduct.controller.js";

import adminProtect from "../middleware/admin.middleware.js";
import upload from "../config/multer.js";

const router = express.Router();

/* TEST ROUTE (optional) */
router.get("/__test", (req, res) => {
  res.json({ ok: true });
});

/* ===============================
   GET ALL PRODUCTS
================================ */
router.get("/", adminProtect, getAllProducts);

/* ===============================
   CREATE PRODUCT
================================ */
router.post(
  "/",
  adminProtect,
  upload.array("images", 5), // ✅ middleware function
  createProduct
);

/* ===============================
   UPDATE PRODUCT
================================ */
router.put(
  "/:id",
  adminProtect,
  upload.array("images", 5), // ✅ FIXED HERE
  updateProduct
);

/* ===============================
   DELETE PRODUCT
================================ */
router.delete("/:id", adminProtect, deleteProduct);

export default router;

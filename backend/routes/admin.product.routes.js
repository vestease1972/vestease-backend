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

/* TEST ROUTE (can keep or remove) */
router.get("/__test", (req, res) => {
  res.json({ ok: true });
});

/* GET ALL PRODUCTS */
router.get("/", adminProtect, getAllProducts);

/* ✅ REAL CREATE PRODUCT */
router.post(
  "/",
  adminProtect,
  upload,
  createProduct
);

/* ✅ REAL UPDATE PRODUCT */
router.put(
  "/:id",
  adminProtect,
  upload,
  updateProduct
);

/* DELETE PRODUCT */
router.delete("/:id", adminProtect, deleteProduct);

export default router;

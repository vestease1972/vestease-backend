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

/* TEST ROUTE (already added and working) */
router.get("/__test", (req, res) => {
  res.json({ ok: true });
});

/* GET ALL PRODUCTS */
router.get("/", adminProtect, getAllProducts);

/* 🔴 TEMPORARY DEBUG POST ROUTE */
router.post(
  "/",
  adminProtect,
  (req, res) => {
    res.json({ reached: "after adminProtect" });
  }
);

/* ❌ COMMENT THESE FOR NOW
router.post(
  "/",
  adminProtect,
  upload,
  createProduct
);

router.put(
  "/:id",
  adminProtect,
  upload,
  updateProduct
);
*/

router.delete("/:id", adminProtect, deleteProduct);

export default router;

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

/* TEST ROUTE */
router.get("/__test", (req, res) => {
  res.json({ ok: true });
});

/* GET ALL PRODUCTS */
router.get("/", adminProtect, getAllProducts);

/* 🔴 DEBUG POST ROUTE — STEP 2 */
router.post(
  "/",
  adminProtect,
  upload,
  (req, res) => {
    res.json({
      reached: "after upload",
      files: req.files?.length || 0,
      body: req.body,
    });
  }
);

/* ❌ STILL COMMENTED OUT FOR NOW
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

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

router.get("/", adminProtect, getAllProducts);

router.post(
  "/",
  adminProtect,
  upload.array("images", 5),
  createProduct
);

router.put(
  "/:id",
  adminProtect,
  upload.array("images", 5),
  updateProduct
);

router.delete("/:id", adminProtect, deleteProduct);

export default router;

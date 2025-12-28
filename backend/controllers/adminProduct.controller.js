import Product from "../models/Product.js";

/* ===============================
   GET ALL PRODUCTS (ADMIN)
================================ */
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    next(error);
  }
};

/* ===============================
   CREATE PRODUCT
================================ */
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, sizes } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name & price required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    // ✅ Cloudinary URLs
    const images = req.files.map((file) => file.path);

    // ✅ Safe JSON parsing
    let parsedDescription = [];
    let parsedSizes = [];

    if (description) {
      try {
        parsedDescription = JSON.parse(description);
      } catch {
        parsedDescription = [];
      }
    }

    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        parsedSizes = [];
      }
    }

    const product = await Product.create({
      name,
      price: Number(price),
      description: parsedDescription,
      sizes: parsedSizes,
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    next(error); // 🔴 REQUIRED
  }
};

/* ===============================
   UPDATE PRODUCT
================================ */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, sizes } = req.body;

    const updates = {};

    if (name) updates.name = name;
    if (price) updates.price = Number(price);

    if (description) {
      try {
        updates.description = JSON.parse(description);
      } catch {
        updates.description = [];
      }
    }

    if (sizes) {
      try {
        updates.sizes = JSON.parse(sizes);
      } catch {
        updates.sizes = [];
      }
    }

    // ✅ Cloudinary URLs on update
    if (req.files && req.files.length > 0) {
      updates.images = req.files.map((file) => file.path);
    }

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    next(error);
  }
};

/* ===============================
   DELETE PRODUCT
================================ */
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete product error:", error);
    next(error);
  }
};

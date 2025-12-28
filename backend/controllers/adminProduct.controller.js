import Product from "../models/Product.js";

/* ===============================
   GET ALL PRODUCTS (ADMIN)
================================ */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("FETCH PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch products" });
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
      return res.status(400).json({ message: "At least one image is required" });
    }

    // ✅ FIX: Correct Cloudinary image URLs
    const images = req.files
      .map((file) => file.path || file.url || file.secure_url)
      .filter(Boolean);

    if (images.length === 0) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const parsedDescription = description
      ? JSON.parse(description)
      : [];

    const parsedSizes = sizes
      ? JSON.parse(sizes)
      : [];

    const product = await Product.create({
      name,
      price: Number(price),
      description: parsedDescription,
      sizes: parsedSizes,
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    next(error);
  }
};

/* ===============================
   UPDATE PRODUCT
================================ */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, sizes } = req.body;

    const updates = {};

    if (name) updates.name = name;
    if (price) updates.price = Number(price);
    if (description) updates.description = JSON.parse(description);
    if (sizes) updates.sizes = JSON.parse(sizes);

    // ✅ FIX: Update images if new ones uploaded
    if (req.files && req.files.length > 0) {
      updates.images = req.files
        .map((file) => file.path || file.url || file.secure_url)
        .filter(Boolean);
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Product update failed" });
  }
};

/* ===============================
   DELETE PRODUCT
================================ */
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};

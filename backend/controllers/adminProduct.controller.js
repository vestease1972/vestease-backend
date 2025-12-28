import Product from "../models/Product.js";

/* ===============================
   GET ALL PRODUCTS (ADMIN)
================================ */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* ===============================
   CREATE PRODUCT
================================ */
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, sizes } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name & price required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images required" });
    }

    const images = req.files.map(
      (file) => `/images/${file.filename}`
    );

    const product = await Product.create({
      name,
      price: Number(price),
      description: description ? JSON.parse(description) : [],
      sizes: sizes ? JSON.parse(sizes) : [],
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Product creation failed" });
  }
};

/* ===============================
   UPDATE PRODUCT
================================ */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, sizes } = req.body;

    const updates = {
      ...(name && { name }),
      ...(price && { price: Number(price) }),
      ...(description && { description: JSON.parse(description) }),
      ...(sizes && { sizes: JSON.parse(sizes) }),
    };

    if (req.files?.length) {
      updates.images = req.files.map(
        (file) => `/images/${file.filename}`
      );
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
    console.error("Update product error:", error);
    res.status(500).json({ message: "Update failed" });
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

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};

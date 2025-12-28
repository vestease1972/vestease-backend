import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },

    // ✅ At least ONE image required, variable length
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one product image is required",
      },
    },

    // ✅ Description lines (1–5 allowed)
    description: {
      type: [String],
      required: true,
    },

    sizes: [sizeSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

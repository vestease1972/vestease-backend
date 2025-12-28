import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },

    // ✅ IMAGE PATHS (served from /images)
    images: [{ type: String, required: true }],

    // ✅ 5-line description
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

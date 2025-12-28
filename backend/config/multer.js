import multer from "multer";
import pkg from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const CloudinaryStorage =
  pkg.CloudinaryStorage || pkg.default || pkg;

const storage = new CloudinaryStorage({
  cloudinary, // 🔴 FULL cloudinary module
  params: {
    folder: "vestease-products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;

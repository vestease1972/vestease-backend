import multer from "multer";
import CloudinaryStorage from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "vestease-products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const uploadInstance = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default function upload(req, res, next) {
  // ✅ Allow CORS preflight
  if (req.method === "OPTIONS") return next();

  uploadInstance.array("images", 5)(req, res, (err) => {
    if (err) {
      console.error("UPLOAD ERROR:", err);
      return res.status(400).json({
        message: "Image upload failed",
        error: err.message,
      });
    }
    next();
  });
}

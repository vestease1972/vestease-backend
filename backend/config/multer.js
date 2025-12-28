import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "vestease-products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// ✅ WRAPPER TO SKIP OPTIONS
export default function uploadMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  return upload.array("images", 5)(req, res, next);
}

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import multerStorage from "multer-storage-cloudinary";

const { CloudinaryStorage } = multerStorage;

/* ===============================
   CLOUDINARY CONFIG
================================ */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ===============================
   STORAGE
================================ */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "vestease/products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;

import multer from "multer";
import pkg from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

/*
  multer-storage-cloudinary export shape differs by version.
  This safely supports ALL versions in Node 22 + ESM.
*/
const CloudinaryStorage =
  pkg.CloudinaryStorage || pkg.default || pkg;

const storage = new CloudinaryStorage({
  cloudinary, // MUST be v2 instance
  params: {
    folder: "vestease-products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

/* ES MODULE FIX */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* STORAGE */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../images"));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  },
});

/* FILE FILTER */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new Error("Only images allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;

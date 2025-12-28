import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const adminProtect = async (req, res, next) => {
  // ✅ Allow CORS preflight
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No admin token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await Admin.findById(decoded.id).select("-password");
    if (!req.admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Admin unauthorized" });
  }
};

export default adminProtect;

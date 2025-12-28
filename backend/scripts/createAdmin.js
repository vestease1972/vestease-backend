import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("Pravi@1972", 10);

await Admin.create({
  email: "admin@vestease.com",
  password: hashedPassword,
});

console.log("Admin created");
process.exit();

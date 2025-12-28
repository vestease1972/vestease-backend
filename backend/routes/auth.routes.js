import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { registerUser, loginUser, getMe } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);

export default router;

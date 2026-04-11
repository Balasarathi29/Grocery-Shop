import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  loginWithGoogle,
  registerUser,
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", loginWithGoogle);
router.get("/me", requireAuth, getCurrentUser);

export default router;

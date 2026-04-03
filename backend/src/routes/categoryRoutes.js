import { Router } from "express";
import {
  createCategory,
  getCategoryByCode,
  listCategories,
} from "../controllers/categoryController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", listCategories);
router.post("/", requireAuth, requireAdmin, createCategory);
router.get("/:code", getCategoryByCode);

export default router;

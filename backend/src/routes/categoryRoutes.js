import { Router } from "express";
import {
  createCategory,
  getCategoryByCode,
  listCategories,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", listCategories);
router.post("/", createCategory);
router.get("/:code", getCategoryByCode);

export default router;

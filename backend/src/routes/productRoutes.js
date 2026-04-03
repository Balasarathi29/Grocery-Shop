import { Router } from "express";
import {
  createProduct,
  getProductById,
  listProducts,
} from "../controllers/productController.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", listProducts);
router.post("/", requireAuth, requireAdmin, createProduct);
router.get("/:id", getProductById);

export default router;

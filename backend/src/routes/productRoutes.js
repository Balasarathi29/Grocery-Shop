import { Router } from "express";
import {
  createProduct,
  getProductById,
  listProducts,
} from "../controllers/productController.js";

const router = Router();

router.get("/", listProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);

export default router;

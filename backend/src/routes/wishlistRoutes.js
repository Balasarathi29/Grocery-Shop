import { Router } from "express";
import {
  addProductToWishlist,
  getWishlist,
  removeProductFromWishlist,
} from "../controllers/wishlistController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/", getWishlist);
router.post("/:productId", addProductToWishlist);
router.delete("/:productId", removeProductFromWishlist);

export default router;

import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, getProductsByUserId, updateProduct } from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/", getAllProducts)
router.get("/user-products",requireAuth(), getProductsByUserId)
router.get("/:id", getProductById)
router.post("/", requireAuth(), createProduct)
router.put("/:id", requireAuth(), updateProduct)
router.delete("/:id", requireAuth(), deleteProduct)

export default router;
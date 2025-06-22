import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { createProduct, getAllProducts, getProductById, getProductsByCategory, searchProducts, updateProduct } from "../../controllers/product.controller";
import { uploadArray } from "../../config/arrayImagesUploader";

const router = Router();

router.post('/',extractToken,uploadArray("images"),createProduct)
router.get("/search",searchProducts)
router.get('/',getAllProducts)
router.get('/category/:categoryName',getProductsByCategory)
router.get('/:_id',getProductById)
router.put('/:_id',extractToken,uploadArray("images"),updateProduct)


export default router;
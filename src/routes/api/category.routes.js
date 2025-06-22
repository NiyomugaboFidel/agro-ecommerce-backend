import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../../controllers/categories.controller";

const router = Router();

router.post("/",extractToken,createCategory)
router.get("/",getAllCategories)
router.put("/:_id",extractToken,updateCategory)
router.delete("/:_id",extractToken,deleteCategory)
router.get("/:_id",getCategoryById)

export default router;
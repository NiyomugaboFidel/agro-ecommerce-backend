import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { addToCart, clearCart, getCart, removeFromCart } from "../../controllers/cart.controller";

const router = Router();

router.post("/:_id/add",extractToken,addToCart)
router.get("/",extractToken,getCart)
router.delete('/remove/:_id',extractToken,removeFromCart)
router.delete('/clear',extractToken,clearCart)

export default router;
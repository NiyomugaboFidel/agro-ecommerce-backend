import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { addToWishlist, getWishlist, moveAllWishlistToCart, moveWishlistToCart, removeFromWishlist } from "../../controllers/wishlist.controller";

const router = Router();

router.get("/all",extractToken,getWishlist)
router.post("/move-all",extractToken,moveAllWishlistToCart)
router.post("/:_id",extractToken,addToWishlist)
router.delete("/:_id",extractToken,removeFromWishlist)
router.post("/add-to-cart/:_id",extractToken,moveWishlistToCart)

export default router;
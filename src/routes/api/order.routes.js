import { Router } from "express";
import extractToken from "../../middlewares/checkUserWithToken";
import { CancelOrder, createOrder, getAllDeliveredOrders, getAllOrders, getOrderById, getOrdersByUser, updateDeliveryStatus, updateOrderStatus } from "../../controllers/order.controller";

const router = Router();

router.post("/",extractToken,createOrder)
router.get("/user",extractToken,getOrdersByUser)
router.get("/all",extractToken,getAllOrders)
router.get("/delivers",extractToken,getAllDeliveredOrders)
router.patch("/:_id",extractToken,updateOrderStatus)
router.get("/:_id",getOrderById)
router.patch("/:_id/cancel",extractToken,CancelOrder)
router.patch("/:_id/delivers",extractToken,updateDeliveryStatus)


export default router;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _checkUserWithToken = _interopRequireDefault(require("../../middlewares/checkUserWithToken"));
var _order = require("../../controllers/order.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.post("/", _checkUserWithToken["default"], _order.createOrder);
router.get("/user", _checkUserWithToken["default"], _order.getOrdersByUser);
router.get("/all", _checkUserWithToken["default"], _order.getAllOrders);
router.get("/delivers", _checkUserWithToken["default"], _order.getAllDeliveredOrders);
router.patch("/:_id", _checkUserWithToken["default"], _order.updateOrderStatus);
router.get("/:_id", _order.getOrderById);
router.patch("/:_id/cancel", _checkUserWithToken["default"], _order.CancelOrder);
router.patch("/:_id/delivers", _checkUserWithToken["default"], _order.updateDeliveryStatus);
var _default = exports["default"] = router;
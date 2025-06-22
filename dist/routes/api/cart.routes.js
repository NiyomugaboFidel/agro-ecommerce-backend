"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _checkUserWithToken = _interopRequireDefault(require("../../middlewares/checkUserWithToken"));
var _cart = require("../../controllers/cart.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.post("/:_id/add", _checkUserWithToken["default"], _cart.addToCart);
router.get("/", _checkUserWithToken["default"], _cart.getCart);
router["delete"]('/remove/:_id', _checkUserWithToken["default"], _cart.removeFromCart);
router["delete"]('/clear', _checkUserWithToken["default"], _cart.clearCart);
var _default = exports["default"] = router;
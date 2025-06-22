"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _checkUserWithToken = _interopRequireDefault(require("../../middlewares/checkUserWithToken"));
var _wishlist = require("../../controllers/wishlist.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();
router.get("/all", _checkUserWithToken["default"], _wishlist.getWishlist);
router.post("/move-all", _checkUserWithToken["default"], _wishlist.moveAllWishlistToCart);
router.post("/:_id", _checkUserWithToken["default"], _wishlist.addToWishlist);
router["delete"]("/:_id", _checkUserWithToken["default"], _wishlist.removeFromWishlist);
router.post("/add-to-cart/:_id", _checkUserWithToken["default"], _wishlist.moveWishlistToCart);
var _default = exports["default"] = router;
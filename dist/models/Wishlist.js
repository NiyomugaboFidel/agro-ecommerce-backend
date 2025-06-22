"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wishlist = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Define the Wishlist schema
var wishlistSchema = new _mongoose["default"].Schema({
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  addedAt: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true
});
var Wishlist = exports.Wishlist = _mongoose["default"].model("Wishlist", wishlistSchema);
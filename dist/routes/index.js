"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("./api/user.routes"));
var _category = _interopRequireDefault(require("./api/category.routes"));
var _product = _interopRequireDefault(require("./api/product.routes"));
var _cart = _interopRequireDefault(require("./api/cart.routes"));
var _wishlist = _interopRequireDefault(require("./api/wishlist.routes"));
var _order = _interopRequireDefault(require("./api/order.routes"));
var _statistics = _interopRequireDefault(require("./api/statistics.routes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var routes = _express["default"].Router();
routes.use('/users', _user["default"]);
routes.use('/categories', _category["default"]);
routes.use('/products', _product["default"]);
routes.use('/carts', _cart["default"]);
routes.use('/product-wishes', _wishlist["default"]);
routes.use('/orders', _order["default"]);
routes.use('/statistics', _statistics["default"]);
var _default = exports["default"] = routes;
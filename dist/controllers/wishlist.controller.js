"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromWishlist = exports.moveWishlistToCart = exports.moveAllWishlistToCart = exports.getWishlist = exports.addToWishlist = void 0;
var _Cart = require("../models/Cart");
var _Product = require("../models/Product");
var _Wishlist = require("../models/Wishlist");
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Add a product to the wishlist
var addToWishlist = exports.addToWishlist = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var productId, userId, product, existingWishlistItem, wishlistItem, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          productId = req.params._id;
          userId = req.user.id;
          _context.p = 1;
          _context.n = 2;
          return _Product.Product.findById(productId);
        case 2:
          product = _context.v;
          if (product) {
            _context.n = 3;
            break;
          }
          return _context.a(2, res.status(404).json({
            message: "Product not found"
          }));
        case 3:
          _context.n = 4;
          return _Wishlist.Wishlist.findOne({
            user: userId,
            product: productId
          });
        case 4:
          existingWishlistItem = _context.v;
          if (!existingWishlistItem) {
            _context.n = 5;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "Product is already in your wishlist"
          }));
        case 5:
          // Add the product to the wishlist
          wishlistItem = new _Wishlist.Wishlist({
            user: userId,
            product: productId
          });
          req.io.to(userId).emit('wishlistUpdated', {
            user: userId,
            product: product,
            action: 'added'
          });
          _context.n = 6;
          return wishlistItem.save();
        case 6:
          if (!req.io) {
            res.status(201).json(formattedResponse);
          }
          _context.n = 8;
          break;
        case 7:
          _context.p = 7;
          _t = _context.v;
          res.status(500).json({
            message: "Something went wrong",
            error: _t.message
          });
        case 8:
          return _context.a(2);
      }
    }, _callee, null, [[1, 7]]);
  }));
  return function addToWishlist(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Remove a product from the wishlist
var removeFromWishlist = exports.removeFromWishlist = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var productId, userId, wishlistItem, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          productId = req.params._id;
          userId = req.user.id;
          _context2.p = 1;
          _context2.n = 2;
          return _Wishlist.Wishlist.findOneAndDelete({
            user: userId,
            product: productId
          });
        case 2:
          wishlistItem = _context2.v;
          if (wishlistItem) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: "Product not found in your wishlist"
          }));
        case 3:
          req.io.to(userId).emit("wishlistUpdated", {
            user: userId,
            product: productId,
            action: "removed"
          });
          res.status(200).json({
            message: "Product removed from wishlist"
          });
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          res.status(500).json({
            message: "Something went wrong",
            error: _t2.message
          });
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 4]]);
  }));
  return function removeFromWishlist(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Get a user's wishlist
var getWishlist = exports.getWishlist = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var userId, wishlist, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          userId = req.user.id;
          _context3.p = 1;
          _context3.n = 2;
          return _Wishlist.Wishlist.find({
            user: userId
          }).populate("product");
        case 2:
          wishlist = _context3.v;
          res.status(200).json({
            wishlist: wishlist
          });
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t3 = _context3.v;
          res.status(500).json({
            message: "Something went wrong",
            error: _t3.message
          });
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 3]]);
  }));
  return function getWishlist(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var moveWishlistToCart = exports.moveWishlistToCart = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var productId, userId, quantity, wishlistItem, product, cart, existingProductIndex, newQuantity, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          productId = req.params._id;
          userId = req.user.id;
          quantity = req.body.quantity;
          _context4.p = 1;
          // Find the product in the wishlist
          console.log("prod id== ".concat(productId, " userid==").concat(userId));
          _context4.n = 2;
          return _Wishlist.Wishlist.findOne({
            user: userId,
            product: productId
          });
        case 2:
          wishlistItem = _context4.v;
          console.log("wishlist item==", wishlistItem);
          if (wishlistItem) {
            _context4.n = 3;
            break;
          }
          return _context4.a(2, res.status(404).json({
            message: "Product not found in your wishlist"
          }));
        case 3:
          _context4.n = 4;
          return _Product.Product.findById(productId);
        case 4:
          product = _context4.v;
          if (product) {
            _context4.n = 5;
            break;
          }
          return _context4.a(2, res.status(404).json({
            message: "Product not found"
          }));
        case 5:
          if (!(quantity > product.quantity)) {
            _context4.n = 6;
            break;
          }
          return _context4.a(2, res.status(400).json({
            message: "Not enough stock for product: ".concat(product.title, ". Available quantity: ").concat(product.quantity)
          }));
        case 6:
          _context4.n = 7;
          return _Cart.Cart.findOne({
            user: userId
          });
        case 7:
          cart = _context4.v;
          if (cart) {
            _context4.n = 8;
            break;
          }
          cart = new _Cart.Cart({
            user: userId,
            products: [{
              product: productId,
              quantity: quantity
            }]
          });
          _context4.n = 11;
          break;
        case 8:
          // Check if the product is already in the cart
          existingProductIndex = cart.products.findIndex(function (item) {
            return item.product.toString() === productId;
          });
          if (!(existingProductIndex > -1)) {
            _context4.n = 10;
            break;
          }
          newQuantity = cart.products[existingProductIndex].quantity + quantity;
          if (!(newQuantity > product.quantity)) {
            _context4.n = 9;
            break;
          }
          return _context4.a(2, res.status(400).json({
            message: "Not enough stock for product: ".concat(product.title, ". Available quantity: ").concat(product.quantity)
          }));
        case 9:
          // Update the quantity in the cart
          cart.products[existingProductIndex].quantity = newQuantity;
          _context4.n = 11;
          break;
        case 10:
          // Add the product to the cart
          cart.products.push({
            product: productId,
            quantity: quantity
          });
        case 11:
          _context4.n = 12;
          return cart.save();
        case 12:
          _context4.n = 13;
          return _Wishlist.Wishlist.findOneAndDelete({
            user: userId,
            product: productId
          });
        case 13:
          res.status(200).json({
            message: "Wishes moved to Cart Successfully!",
            cart: cart
          });
          _context4.n = 15;
          break;
        case 14:
          _context4.p = 14;
          _t4 = _context4.v;
          res.status(500).json({
            message: "Something went wrong",
            error: _t4.message
          });
        case 15:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 14]]);
  }));
  return function moveWishlistToCart(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Move all products from the wishlist to the cart
var moveAllWishlistToCart = exports.moveAllWishlistToCart = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var userId, wishlistItems, cart, _iterator, _step, _loop, _ret, _t5, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          console.log("controller reached!");
          userId = req.user.id;
          console.log("userId:", userId);
          console.log("Request Params:", req.params);
          console.log("Request Body:", req.body);
          _context6.p = 1;
          _context6.n = 2;
          return _Wishlist.Wishlist.find({
            user: userId
          }).populate("product");
        case 2:
          wishlistItems = _context6.v;
          console.log("Wishlist Items:", wishlistItems);
          if (wishlistItems.length) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2, res.status(404).json({
            message: "Your wishlist is empty"
          }));
        case 3:
          _context6.n = 4;
          return _Cart.Cart.findOne({
            user: userId
          });
        case 4:
          cart = _context6.v;
          if (!cart) {
            cart = new _Cart.Cart({
              user: userId,
              products: []
            });
          }
          _iterator = _createForOfIteratorHelper(wishlistItems);
          _context6.p = 5;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var wishlistItem, productId, product, quantity, existingProductIndex, newQuantity;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  wishlistItem = _step.value;
                  productId = wishlistItem.product._id;
                  product = wishlistItem.product;
                  quantity = wishlistItem.product.moq;
                  console.log("Product ID:", productId);
                  console.log("Product:", product);
                  if (!(product.quantity < quantity)) {
                    _context5.n = 1;
                    break;
                  }
                  return _context5.a(2, {
                    v: res.status(400).json({
                      message: "Not enough stock for product: ".concat(product.title, ". Available quantity: ").concat(product.quantity)
                    })
                  });
                case 1:
                  existingProductIndex = cart.products.findIndex(function (item) {
                    return item.product.toString() === productId.toString();
                  });
                  if (!(existingProductIndex > -1)) {
                    _context5.n = 3;
                    break;
                  }
                  newQuantity = cart.products[existingProductIndex].quantity + quantity;
                  if (!(newQuantity > product.quantity)) {
                    _context5.n = 2;
                    break;
                  }
                  return _context5.a(2, {
                    v: res.status(400).json({
                      message: "Not enough stock for product: ".concat(product.title, ". Available quantity: ").concat(product.quantity)
                    })
                  });
                case 2:
                  cart.products[existingProductIndex].quantity = newQuantity;
                  _context5.n = 4;
                  break;
                case 3:
                  cart.products.push({
                    product: productId,
                    quantity: quantity
                  });
                case 4:
                  return _context5.a(2);
              }
            }, _loop);
          });
          _iterator.s();
        case 6:
          if ((_step = _iterator.n()).done) {
            _context6.n = 9;
            break;
          }
          return _context6.d(_regeneratorValues(_loop()), 7);
        case 7:
          _ret = _context6.v;
          if (!_ret) {
            _context6.n = 8;
            break;
          }
          return _context6.a(2, _ret.v);
        case 8:
          _context6.n = 6;
          break;
        case 9:
          _context6.n = 11;
          break;
        case 10:
          _context6.p = 10;
          _t5 = _context6.v;
          _iterator.e(_t5);
        case 11:
          _context6.p = 11;
          _iterator.f();
          return _context6.f(11);
        case 12:
          _context6.n = 13;
          return cart.save();
        case 13:
          _context6.n = 14;
          return _Wishlist.Wishlist.deleteMany({
            user: userId
          });
        case 14:
          req.io.to(userId).emit("cartUpdated", {
            user: userId,
            message: "Product(s) moved from wishlist to cart",
            cart: cart,
            // Send the updated cart details to update the UI
            action: "added"
          });

          // // if(!req.io){
          res.status(200).json({
            message: "All products moved from wishlist to cart",
            cart: cart
          });
          // // }
          _context6.n = 16;
          break;
        case 15:
          _context6.p = 15;
          _t6 = _context6.v;
          console.log("Error:", _t6); // Log the error
          res.status(500).json({
            error: _t6.message
          });
        case 16:
          return _context6.a(2);
      }
    }, _callee5, null, [[5, 10, 11, 12], [1, 15]]);
  }));
  return function moveAllWishlistToCart(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
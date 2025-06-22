"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromCart = exports.getCart = exports.clearCart = exports.addToCart = void 0;
var _Cart = require("../models/Cart.js");
var _Product = require("../models/Product.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var addToCart = exports.addToCart = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var productId, quantity, userId, product, cart, existingProductIndex, newQuantity, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          productId = req.params._id;
          quantity = req.body.quantity;
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
          if (!(quantity > product.quantity)) {
            _context.n = 4;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "Not enough stock for product: ".concat(product.title, ". Available quantity: ").concat(product.quantity)
          }));
        case 4:
          _context.n = 5;
          return _Cart.Cart.findOne({
            user: userId
          });
        case 5:
          cart = _context.v;
          if (cart) {
            _context.n = 7;
            break;
          }
          if (!(quantity < product.moq)) {
            _context.n = 6;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "The quantity for product: ".concat(product.title, " must be at least ").concat(product.moq)
          }));
        case 6:
          cart = new _Cart.Cart({
            user: userId,
            products: [{
              product: productId,
              quantity: quantity
            }]
          });
          _context.n = 11;
          break;
        case 7:
          // Check if the product is already in the cart
          existingProductIndex = cart.products.findIndex(function (item) {
            return item.product.toString() === productId;
          });
          if (!(existingProductIndex > -1)) {
            _context.n = 9;
            break;
          }
          // Product exists in the cart, check the combined quantity
          newQuantity = cart.products[existingProductIndex].quantity + quantity; // Check if the combined quantity exceeds the available stock
          if (!(newQuantity > product.quantity)) {
            _context.n = 8;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "Not enough stock for product: ".concat(product.title, ". Available quantity: ").concat(product.quantity)
          }));
        case 8:
          // Update the quantity in the cart
          cart.products[existingProductIndex].quantity = newQuantity;
          _context.n = 11;
          break;
        case 9:
          if (!(quantity < product.moq)) {
            _context.n = 10;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "The quantity for product: ".concat(product.title, " must be at least ").concat(product.moq)
          }));
        case 10:
          // Add the product to the cart
          cart.products.push({
            product: productId,
            quantity: quantity
          });
        case 11:
          _context.n = 12;
          return cart.save();
        case 12:
          req.io.to(userId).emit("");
          res.status(201).json({
            cart: cart
          });
          _context.n = 14;
          break;
        case 13:
          _context.p = 13;
          _t = _context.v;
          console.error("Error adding to cart:", _t);
          res.status(500).json({
            message: "Something went wrong",
            error: _t.message
          });
        case 14:
          return _context.a(2);
      }
    }, _callee, null, [[1, 13]]);
  }));
  return function addToCart(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getCart = exports.getCart = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var userId, cart, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          userId = req.user.id;
          _context2.p = 1;
          _context2.n = 2;
          return _Cart.Cart.findOne({
            user: userId
          }).populate({
            path: "products.product",
            model: "Product",
            select: "title price images quantity moq"
          });
        case 2:
          cart = _context2.v;
          if (cart) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: "Cart not found"
          }));
        case 3:
          res.status(200).json({
            message: "Cart retrieved successfully",
            cart: cart
          });
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          return _context2.a(2, res.status(500).json({
            message: "internal server Error!"
          }));
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 4]]);
  }));
  return function getCart(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var removeFromCart = exports.removeFromCart = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var productId, userId, cart, productIndex, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          productId = req.params._id;
          userId = req.user.id;
          _context3.p = 1;
          _context3.n = 2;
          return _Cart.Cart.findOne({
            user: userId
          });
        case 2:
          cart = _context3.v;
          if (cart) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: "Cart not found"
          }));
        case 3:
          // Check if the product exists in the cart
          productIndex = cart.products.findIndex(function (item) {
            return item.product.toString() === productId;
          });
          if (!(productIndex === -1)) {
            _context3.n = 4;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: "Product not found in the cart"
          }));
        case 4:
          // Remove the product from the cart
          cart.products.splice(productIndex, 1);

          // Save the updated cart
          _context3.n = 5;
          return cart.save();
        case 5:
          res.status(200).json({
            message: "Product removed from cart successfully",
            cart: cart
          });
          _context3.n = 7;
          break;
        case 6:
          _context3.p = 6;
          _t3 = _context3.v;
          res.status(500).json({
            message: "Something went wrong",
            error: _t3.message
          });
        case 7:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 6]]);
  }));
  return function removeFromCart(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var clearCart = exports.clearCart = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var userId, cart, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          userId = req.user.id;
          _context4.p = 1;
          _context4.n = 2;
          return _Cart.Cart.findOne({
            user: userId
          });
        case 2:
          cart = _context4.v;
          if (cart) {
            _context4.n = 3;
            break;
          }
          return _context4.a(2, res.status(404).json({
            message: "Cart not found"
          }));
        case 3:
          cart.products = [];
          _context4.n = 4;
          return cart.save();
        case 4:
          res.status(200).json({
            message: "Cart cleared successfully",
            cart: cart
          });
          _context4.n = 6;
          break;
        case 5:
          _context4.p = 5;
          _t4 = _context4.v;
          res.status(500).json({
            message: "Something went wrong",
            error: _t4.message
          });
        case 6:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 5]]);
  }));
  return function clearCart(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
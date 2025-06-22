"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrderStatus = exports.updateDeliveryStatus = exports.getOrdersByUser = exports.getOrderById = exports.getAllOrders = exports.getAllDeliveredOrders = exports.createOrder = exports.CancelOrder = void 0;
var _generateOrderEmailTemplate = require("../middlewares/generateOrderEmailTemplate");
var _Cart = require("../models/Cart");
var _Order = require("../models/Order");
var _User = _interopRequireDefault(require("../models/User"));
var _emailUtil = require("../utils/emailUtil");
var _Product = require("../models/Product");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createOrder = exports.createOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var userId, _req$body, street, city, postalCode, country, province, district, user, cart, managers, order, managerEmails, recipients, htmlMessage, emailData, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          userId = req.user.id;
          _req$body = req.body, street = _req$body.street, city = _req$body.city, postalCode = _req$body.postalCode, country = _req$body.country, province = _req$body.province, district = _req$body.district;
          _context.p = 1;
          _context.n = 2;
          return _User["default"].findById(userId);
        case 2:
          user = _context.v;
          _context.n = 3;
          return _Cart.Cart.findOne({
            user: userId
          }).populate("products.product");
        case 3:
          cart = _context.v;
          if (!(!cart || cart.products.length === 0)) {
            _context.n = 4;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: "Cart is empty"
          }));
        case 4:
          managers = _toConsumableArray(new Set(cart.products.map(function (item) {
            return item.product.user.toString();
          })));
          order = new _Order.Order({
            user: userId,
            products: cart.products.map(function (item) {
              return {
                product: item.product._id,
                quantity: item.quantity,
                manager: item.product.user,
                status: "Pending"
              };
            }),
            totalPrice: cart.totalPrice,
            shippingAddress: {
              street: street,
              city: city,
              postalCode: postalCode,
              country: country,
              province: province,
              district: district
            },
            managerApprovalStatus: managers.map(function (manager) {
              return {
                manager: manager,
                status: "Pending"
              };
            })
          });
          _context.n = 5;
          return order.save();
        case 5:
          _context.n = 6;
          return _User["default"].find({
            _id: {
              $in: managers
            }
          }).select("email firstname lastname");
        case 6:
          managerEmails = _context.v;
          recipients = [{
            name: "Admin super",
            address: "fidelniyomugabo67@gmail.com"
          }].concat(_toConsumableArray(managerEmails.map(function (manager) {
            return {
              name: "".concat(manager.firstname, " ").concat(manager.lastname),
              address: manager.email
            };
          }))); // Send email to both admin and managers
          htmlMessage = (0, _generateOrderEmailTemplate.generateOrderEmailTemplate)(user, order, cart);
          emailData = {
            sender: {
              name: "Your Store",
              address: process.env.MAIL_USER
            },
            recipients: recipients,
            subject: "New Order Placed by ".concat(user.firstname, " ").concat(user.lastname),
            message: "A new order has been placed by ".concat(user.firstname, " ").concat(user.lastname, "."),
            data: {
              htmlMessage: htmlMessage
            }
          };
          _context.n = 7;
          return (0, _emailUtil.sendEmail)(emailData);
        case 7:
          // Clear the cart after order is placed
          cart.products = [];
          _context.n = 8;
          return cart.save();
        case 8:
          res.status(201).json(order);
          _context.n = 10;
          break;
        case 9:
          _context.p = 9;
          _t = _context.v;
          console.error("Error creating order:", _t);
          res.status(500).json({
            message: "Failed to create order",
            error: _t
          });
        case 10:
          return _context.a(2);
      }
    }, _callee, null, [[1, 9]]);
  }));
  return function createOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateOrderStatus = exports.updateOrderStatus = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var orderId, status, userId, isAdmin, order, managerStatus, allApproved, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          orderId = req.params._id;
          status = req.body.status;
          userId = req.user.id;
          isAdmin = req.user.role === "superAdmin";
          _context2.p = 1;
          _context2.n = 2;
          return _Order.Order.findById(orderId).populate("products.product");
        case 2:
          order = _context2.v;
          if (order) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: "Order not found"
          }));
        case 3:
          if (!(order.orderStatus === "Cancelled")) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, res.status(400).json({
            message: "Cannot update the status of a cancelled order."
          }));
        case 4:
          if (!isAdmin) {
            _context2.n = 6;
            break;
          }
          // Admin updates the order status
          order.adminApprovalStatus = status;
          if (status === "Approved") {
            order.orderStatus = "Approved";
          } else if (status === "Rejected") {
            order.orderStatus = "Rejected";
          }
          _context2.n = 5;
          return order.save();
        case 5:
          return _context2.a(2, res.status(200).json(order));
        case 6:
          // If the user is not admin, they must be a manager
          managerStatus = order.managerApprovalStatus.find(function (ms) {
            return ms.manager.toString() === userId.toString();
          });
          if (managerStatus) {
            _context2.n = 7;
            break;
          }
          return _context2.a(2, res.status(403).json({
            message: "Unauthorized to update this order"
          }));
        case 7:
          // Update the manager's approval status
          managerStatus.status = status;

          // Handle the case where the manager rejects the product
          if (status === "Rejected") {
            // Remove the rejected product from the order
            order.products = order.products.filter(function (item) {
              return item.manager.toString() !== userId.toString();
            });
            // Remove the manager's approval status
            order.managerApprovalStatus = order.managerApprovalStatus.filter(function (ms) {
              return ms.manager.toString() !== userId.toString();
            });
          }

          // Check if all remaining managers have approved the order
          allApproved = order.managerApprovalStatus.every(function (ms) {
            return ms.status === "Approved";
          });
          if (allApproved) {
            order.orderStatus = "Approved";
          } else if (order.managerApprovalStatus.length === 0) {
            // If all products were rejected, reject the entire order
            order.orderStatus = "Rejected";
          }
          _context2.n = 8;
          return order.save();
        case 8:
          res.status(200).json(order);
        case 9:
          _context2.n = 11;
          break;
        case 10:
          _context2.p = 10;
          _t2 = _context2.v;
          console.error("Error updating order status:", _t2);
          res.status(500).json({
            message: "Failed to update order status",
            error: _t2
          });
        case 11:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 10]]);
  }));
  return function updateOrderStatus(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var updateDeliveryStatus = exports.updateDeliveryStatus = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var orderId, isAdmin, order, _iterator, _step, item, product, _t3, _t4;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          orderId = req.params._id;
          isAdmin = req.user.role === "superAdmin";
          _context3.p = 1;
          _context3.n = 2;
          return _Order.Order.findById(orderId).populate("products.product");
        case 2:
          order = _context3.v;
          if (order) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: "Order not found"
          }));
        case 3:
          if (!isAdmin) {
            _context3.n = 13;
            break;
          }
          order.deliveryStatus.adminConfirmed = true;

          // Check if admin confirmed delivery
          if (!order.deliveryStatus.adminConfirmed) {
            _context3.n = 12;
            break;
          }
          order.deliveryStatus.isDelivered = true;
          order.orderStatus = "Delivered";

          // Reduce the quantity of each product in the order
          _iterator = _createForOfIteratorHelper(order.products);
          _context3.p = 4;
          _iterator.s();
        case 5:
          if ((_step = _iterator.n()).done) {
            _context3.n = 9;
            break;
          }
          item = _step.value;
          _context3.n = 6;
          return _Product.Product.findById(item.product._id);
        case 6:
          product = _context3.v;
          if (!(product.quantity < item.quantity)) {
            _context3.n = 7;
            break;
          }
          return _context3.a(2, res.status(400).json({
            message: "Not enough stock for product: ".concat(product.title, ". Available quantity: ").concat(product.quantity)
          }));
        case 7:
          product.quantity -= item.quantity;
          _context3.n = 8;
          return product.save();
        case 8:
          _context3.n = 5;
          break;
        case 9:
          _context3.n = 11;
          break;
        case 10:
          _context3.p = 10;
          _t3 = _context3.v;
          _iterator.e(_t3);
        case 11:
          _context3.p = 11;
          _iterator.f();
          return _context3.f(11);
        case 12:
          _context3.n = 14;
          break;
        case 13:
          return _context3.a(2, res.status(403).json({
            message: "Unauthorized to confirm delivery"
          }));
        case 14:
          _context3.n = 15;
          return order.save();
        case 15:
          res.status(200).json(order);
          _context3.n = 17;
          break;
        case 16:
          _context3.p = 16;
          _t4 = _context3.v;
          console.error("Error updating delivery status:", _t4);
          res.status(500).json({
            message: "Failed to update delivery status",
            error: _t4
          });
        case 17:
          return _context3.a(2);
      }
    }, _callee3, null, [[4, 10, 11, 12], [1, 16]]);
  }));
  return function updateDeliveryStatus(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getOrdersByUser = exports.getOrdersByUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var userId, orders, _t5;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          userId = req.user.id;
          _context4.p = 1;
          _context4.n = 2;
          return _Order.Order.find({
            user: userId
          }).populate("products.product");
        case 2:
          orders = _context4.v;
          if (!(!orders || orders.length === 0)) {
            _context4.n = 3;
            break;
          }
          return _context4.a(2, res.status(400).json({
            message: "No orders found"
          }));
        case 3:
          res.status(200).json(orders);
          _context4.n = 5;
          break;
        case 4:
          _context4.p = 4;
          _t5 = _context4.v;
          console.error("Error retrieving orders by user:", _t5);
          res.status(500).json({
            message: "Failed to retrieve orders",
            error: _t5
          });
        case 5:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 4]]);
  }));
  return function getOrdersByUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getAllOrders = exports.getAllOrders = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var user, orders, _t6;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          user = req.user;
          _context5.p = 1;
          if (!(user.role !== "superAdmin")) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, res.status(403).json({
            message: "only superAdmin allowed!"
          }));
        case 2:
          _context5.n = 3;
          return _Order.Order.find().populate("products.product");
        case 3:
          orders = _context5.v;
          if (!(!orders || orders.length === 0)) {
            _context5.n = 4;
            break;
          }
          return _context5.a(2, res.status(404).json({
            message: "No orders found"
          }));
        case 4:
          res.status(200).json(orders);
          _context5.n = 6;
          break;
        case 5:
          _context5.p = 5;
          _t6 = _context5.v;
          console.error("Error retrieving all orders:", _t6);
          res.status(500).json({
            message: "Failed to retrieve orders",
            error: _t6
          });
        case 6:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 5]]);
  }));
  return function getAllOrders(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var getAllDeliveredOrders = exports.getAllDeliveredOrders = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var user, deliveredOrders, _t7;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          user = req.user;
          _context6.p = 1;
          if (!(user.role !== "superAdmin")) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, res.status(403).json({
            message: "Only superAdmin is allowed!"
          }));
        case 2:
          _context6.n = 3;
          return _Order.Order.find({
            "deliveryStatus.isDelivered": true
          }).populate("products.product") // Populating the product details
          .exec();
        case 3:
          deliveredOrders = _context6.v;
          if (!(!deliveredOrders || deliveredOrders.length === 0)) {
            _context6.n = 4;
            break;
          }
          return _context6.a(2, res.status(404).json({
            message: "No delivered orders found"
          }));
        case 4:
          // Return the delivered orders
          res.status(200).json(deliveredOrders);
          _context6.n = 6;
          break;
        case 5:
          _context6.p = 5;
          _t7 = _context6.v;
          console.error("Error retrieving delivered orders:", _t7);
          res.status(500).json({
            message: "Failed to retrieve delivered orders",
            error: _t7
          });
        case 6:
          return _context6.a(2);
      }
    }, _callee6, null, [[1, 5]]);
  }));
  return function getAllDeliveredOrders(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var CancelOrder = exports.CancelOrder = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var userId, orderId, order, _t8;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          userId = req.user.id;
          orderId = req.params._id;
          _context7.p = 1;
          _context7.n = 2;
          return _Order.Order.findById(orderId);
        case 2:
          order = _context7.v;
          if (order) {
            _context7.n = 3;
            break;
          }
          return _context7.a(2, res.status(404).json({
            message: 'Order not found'
          }));
        case 3:
          if (!(order.user.toString() !== userId)) {
            _context7.n = 4;
            break;
          }
          return _context7.a(2, res.status(403).json({
            message: 'You do not have permission to cancel this order'
          }));
        case 4:
          if (!(order.orderStatus === 'Cancelled')) {
            _context7.n = 5;
            break;
          }
          return _context7.a(2, res.status(400).json({
            message: 'Order is already cancelled'
          }));
        case 5:
          order.orderStatus = 'Cancelled';
          _context7.n = 6;
          return order.save();
        case 6:
          res.status(200).json({
            message: 'Order successfully cancelled',
            order: order
          });
          _context7.n = 8;
          break;
        case 7:
          _context7.p = 7;
          _t8 = _context7.v;
          console.error('Failed to cancel order:', _t8);
          res.status(500).json({
            message: 'Server error'
          });
        case 8:
          return _context7.a(2);
      }
    }, _callee7, null, [[1, 7]]);
  }));
  return function CancelOrder(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var getOrderById = exports.getOrderById = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var orderId, order, _t9;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          orderId = req.params._id;
          _context8.p = 1;
          _context8.n = 2;
          return _Order.Order.findById(orderId).populate("products.product") // Populating the product details from the referenced collection
          .exec();
        case 2:
          order = _context8.v;
          if (order) {
            _context8.n = 3;
            break;
          }
          return _context8.a(2, res.status(404).json({
            message: "Order not found"
          }));
        case 3:
          return _context8.a(2, res.status(200).json(order));
        case 4:
          _context8.p = 4;
          _t9 = _context8.v;
          // Catch any errors that occur and return a 500 server error
          console.error("Error fetching order by ID:", _t9);
          return _context8.a(2, res.status(500).json({
            message: "Server error",
            error: _t9
          }));
      }
    }, _callee8, null, [[1, 4]]);
  }));
  return function getOrderById(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripeWebhook = exports.getPendingPayments = exports.getPaymentSession = exports.getOrdersByPaymentStatus = exports.createRefund = exports.createPayment = void 0;
var _Order = require("../models/Order");
require("dotenv/config");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var createPayment = exports.createPayment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _order$customerInfo, _req$body, orderId, amount, _req$body$currency, currency, _req$body$productName, productName, _req$body$productDesc, productDescription, _req$body$quantity, quantity, customerEmail, _req$body$metadata, metadata, order, paymentAmount, session, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          console.log('Request body:', req.body);
          console.log('Request headers:', req.headers);
          if (!(!req.body || Object.keys(req.body).length === 0)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            success: false,
            error: 'Request body is empty or not properly parsed',
            message: 'Make sure Content-Type is application/json and body is valid JSON'
          }));
        case 1:
          _req$body = req.body, orderId = _req$body.orderId, amount = _req$body.amount, _req$body$currency = _req$body.currency, currency = _req$body$currency === void 0 ? 'usd' : _req$body$currency, _req$body$productName = _req$body.productName, productName = _req$body$productName === void 0 ? 'Product Purchase' : _req$body$productName, _req$body$productDesc = _req$body.productDescription, productDescription = _req$body$productDesc === void 0 ? 'Order payment' : _req$body$productDesc, _req$body$quantity = _req$body.quantity, quantity = _req$body$quantity === void 0 ? 1 : _req$body$quantity, customerEmail = _req$body.customerEmail, _req$body$metadata = _req$body.metadata, metadata = _req$body$metadata === void 0 ? {} : _req$body$metadata;
          console.log('Extracted orderId:', orderId);
          if (orderId) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(400).json({
            success: false,
            error: 'Order ID is required',
            receivedData: req.body
          }));
        case 2:
          _context.n = 3;
          return _Order.Order.findById(orderId).populate('user products.product');
        case 3:
          order = _context.v;
          if (order) {
            _context.n = 4;
            break;
          }
          return _context.a(2, res.status(404).json({
            success: false,
            error: 'Order not found',
            orderId: orderId
          }));
        case 4:
          console.log('Found order:', order._id);
          paymentAmount = amount || order.totalPrice;
          _context.n = 5;
          return stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: customerEmail || ((_order$customerInfo = order.customerInfo) === null || _order$customerInfo === void 0 ? void 0 : _order$customerInfo.email) || 'customer@example.com',
            line_items: [{
              price_data: {
                currency: currency.toLowerCase(),
                product_data: {
                  name: productName,
                  description: productDescription
                },
                unit_amount: Math.round(paymentAmount * 100)
              },
              quantity: quantity
            }],
            metadata: _objectSpread(_objectSpread({}, metadata), {}, {
              orderId: orderId.toString(),
              mongoOrderId: orderId.toString(),
              originalAmount: paymentAmount.toString()
            }),
            success_url: "".concat(process.env.CLIENT_URL || 'http://localhost:3000', "/payment/success?session_id={CHECKOUT_SESSION_ID}"),
            cancel_url: "".concat(process.env.CLIENT_URL || 'http://localhost:3000', "/payment/cancel"),
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60
          });
        case 5:
          session = _context.v;
          order.paymentInfo = order.paymentInfo || {};
          order.paymentInfo.stripeSessionId = session.id;
          order.paymentInfo.checkoutUrl = session.url;
          order.paymentInfo.paymentStatus = 'pending';
          order.paymentInfo.currency = currency.toLowerCase();
          order.paymentMethod = 'Credit Card';
          order.orderStatus = 'Payment Pending';
          order.orderHistory = order.orderHistory || [];
          order.orderHistory.push({
            status: 'Payment Session Created',
            changedAt: new Date(),
            note: "Stripe checkout session created: ".concat(session.id)
          });
          _context.n = 6;
          return order.save();
        case 6:
          console.log('Payment session created successfully:', session.id);
          return _context.a(2, res.status(200).json({
            success: true,
            sessionId: session.id,
            url: session.url,
            orderId: order._id,
            amount: paymentAmount,
            currency: currency,
            message: 'Payment session created successfully'
          }));
        case 7:
          _context.p = 7;
          _t = _context.v;
          console.error('Stripe payment creation error:', _t);
          return _context.a(2, res.status(500).json({
            success: false,
            error: 'Failed to create payment session',
            message: _t.message,
            stack: process.env.NODE_ENV === 'development' ? _t.stack : undefined
          }));
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function createPayment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var stripeWebhook = exports.stripeWebhook = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var sig, event, _t2, _t3, _t4;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          sig = req.headers['stripe-signature'];
          _context2.p = 1;
          event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t2 = _context2.v;
          console.error('Webhook signature verification failed:', _t2.message);
          return _context2.a(2, res.status(400).send("Webhook Error: ".concat(_t2.message)));
        case 3:
          _context2.p = 3;
          _t3 = event.type;
          _context2.n = _t3 === 'checkout.session.completed' ? 4 : _t3 === 'payment_intent.succeeded' ? 6 : _t3 === 'payment_intent.payment_failed' ? 8 : 10;
          break;
        case 4:
          _context2.n = 5;
          return handleCheckoutSessionCompleted(event.data.object);
        case 5:
          return _context2.a(3, 11);
        case 6:
          _context2.n = 7;
          return handlePaymentIntentSucceeded(event.data.object);
        case 7:
          return _context2.a(3, 11);
        case 8:
          _context2.n = 9;
          return handlePaymentIntentFailed(event.data.object);
        case 9:
          return _context2.a(3, 11);
        case 10:
          console.log("Unhandled event type: ".concat(event.type));
        case 11:
          res.status(200).json({
            received: true
          });
          _context2.n = 13;
          break;
        case 12:
          _context2.p = 12;
          _t4 = _context2.v;
          console.error('Error processing webhook:', _t4);
          res.status(500).json({
            error: 'Webhook processing failed',
            message: _t4.message
          });
        case 13:
          return _context2.a(2);
      }
    }, _callee2, null, [[3, 12], [1, 2]]);
  }));
  return function stripeWebhook(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
function handleCheckoutSessionCompleted(_x5) {
  return _handleCheckoutSessionCompleted.apply(this, arguments);
}
function _handleCheckoutSessionCompleted() {
  _handleCheckoutSessionCompleted = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(session) {
    var order, _t9;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.p = 0;
          console.log('Processing checkout session completed:', session.id);
          _context7.n = 1;
          return _Order.Order.findOne({
            'paymentInfo.stripeSessionId': session.id
          }).populate('user products.product');
        case 1:
          order = _context7.v;
          if (order) {
            _context7.n = 2;
            break;
          }
          console.error('Order not found for session:', session.id);
          return _context7.a(2);
        case 2:
          order.paymentInfo = order.paymentInfo || {};
          order.paymentInfo.paymentStatus = 'succeeded';
          order.paymentInfo.amountPaid = session.amount_total;
          order.paymentInfo.currency = session.currency;
          order.paymentInfo.paidAt = new Date();
          order.orderStatus = 'Approved';
          order.customerInfo = order.customerInfo || {};
          order.customerInfo.email = session.customer_email;
          order.orderHistory = order.orderHistory || [];
          order.orderHistory.push({
            status: 'Payment Completed',
            changedAt: new Date(),
            note: "Payment of $".concat(session.amount_total / 100, " completed successfully")
          });
          _context7.n = 3;
          return order.save();
        case 3:
          console.log("Order ".concat(order._id, " payment completed: $").concat(session.amount_total / 100));
          _context7.n = 5;
          break;
        case 4:
          _context7.p = 4;
          _t9 = _context7.v;
          console.error('Error handling checkout session completed:', _t9);
        case 5:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 4]]);
  }));
  return _handleCheckoutSessionCompleted.apply(this, arguments);
}
function handlePaymentIntentSucceeded(_x6) {
  return _handlePaymentIntentSucceeded.apply(this, arguments);
}
function _handlePaymentIntentSucceeded() {
  _handlePaymentIntentSucceeded = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(paymentIntent) {
    var order, _t0;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.p = 0;
          _context8.n = 1;
          return _Order.Order.findOne({
            'paymentInfo.stripePaymentIntentId': paymentIntent.id
          });
        case 1:
          order = _context8.v;
          if (!order) {
            _context8.n = 3;
            break;
          }
          order.paymentInfo = order.paymentInfo || {};
          order.paymentInfo.paymentStatus = 'succeeded';
          order.paymentInfo.amountPaid = paymentIntent.amount;
          order.paymentInfo.paidAt = new Date();
          order.orderStatus = 'Approved';
          order.orderHistory = order.orderHistory || [];
          order.orderHistory.push({
            status: 'Payment Succeeded',
            changedAt: new Date(),
            note: "Payment intent ".concat(paymentIntent.id, " succeeded")
          });
          _context8.n = 2;
          return order.save();
        case 2:
          console.log("Payment of $".concat(paymentIntent.amount / 100, " succeeded for order ").concat(order._id));
        case 3:
          _context8.n = 5;
          break;
        case 4:
          _context8.p = 4;
          _t0 = _context8.v;
          console.error('Error handling payment intent succeeded:', _t0);
        case 5:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 4]]);
  }));
  return _handlePaymentIntentSucceeded.apply(this, arguments);
}
function handlePaymentIntentFailed(_x7) {
  return _handlePaymentIntentFailed.apply(this, arguments);
}
function _handlePaymentIntentFailed() {
  _handlePaymentIntentFailed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(paymentIntent) {
    var order, _paymentIntent$last_p, _t1;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          _context9.p = 0;
          _context9.n = 1;
          return _Order.Order.findOne({
            'paymentInfo.stripePaymentIntentId': paymentIntent.id
          });
        case 1:
          order = _context9.v;
          if (!order) {
            _context9.n = 3;
            break;
          }
          order.paymentInfo = order.paymentInfo || {};
          order.paymentInfo.paymentStatus = 'failed';
          order.orderStatus = 'Payment Failed';
          order.orderHistory = order.orderHistory || [];
          order.orderHistory.push({
            status: 'Payment Failed',
            changedAt: new Date(),
            note: "Payment failed: ".concat(((_paymentIntent$last_p = paymentIntent.last_payment_error) === null || _paymentIntent$last_p === void 0 ? void 0 : _paymentIntent$last_p.message) || 'Unknown error')
          });
          _context9.n = 2;
          return order.save();
        case 2:
          console.log("Payment of $".concat(paymentIntent.amount / 100, " failed for order ").concat(order._id));
        case 3:
          _context9.n = 5;
          break;
        case 4:
          _context9.p = 4;
          _t1 = _context9.v;
          console.error('Error handling payment intent failed:', _t1);
        case 5:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 4]]);
  }));
  return _handlePaymentIntentFailed.apply(this, arguments);
}
var getPaymentSession = exports.getPaymentSession = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _order$paymentInfo, sessionId, session, order, _t5;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.p = 0;
          sessionId = req.params.sessionId;
          if (sessionId) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(400).json({
            success: false,
            error: 'Session ID is required'
          }));
        case 1:
          _context3.n = 2;
          return stripe.checkout.sessions.retrieve(sessionId);
        case 2:
          session = _context3.v;
          _context3.n = 3;
          return _Order.Order.findOne({
            'paymentInfo.stripeSessionId': sessionId
          }).populate('user products.product');
        case 3:
          order = _context3.v;
          res.status(200).json({
            success: true,
            session: {
              id: session.id,
              payment_status: session.payment_status,
              customer_email: session.customer_email,
              amount_total: session.amount_total,
              currency: session.currency,
              metadata: session.metadata
            },
            order: order ? {
              id: order._id,
              orderStatus: order.orderStatus,
              paymentStatus: (_order$paymentInfo = order.paymentInfo) === null || _order$paymentInfo === void 0 ? void 0 : _order$paymentInfo.paymentStatus,
              totalPrice: order.totalPrice,
              products: order.products
            } : null
          });
          _context3.n = 5;
          break;
        case 4:
          _context3.p = 4;
          _t5 = _context3.v;
          console.error('Error retrieving payment session:', _t5);
          res.status(500).json({
            success: false,
            error: 'Failed to retrieve payment session',
            message: _t5.message
          });
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 4]]);
  }));
  return function getPaymentSession(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var createRefund = exports.createRefund = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body2, orderId, paymentIntentId, amount, _req$body2$reason, reason, order, refund, _t6;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.p = 0;
          _req$body2 = req.body, orderId = _req$body2.orderId, paymentIntentId = _req$body2.paymentIntentId, amount = _req$body2.amount, _req$body2$reason = _req$body2.reason, reason = _req$body2$reason === void 0 ? 'requested_by_customer' : _req$body2$reason;
          if (!(!orderId && !paymentIntentId)) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, res.status(400).json({
            success: false,
            error: 'Either Order ID or Payment Intent ID is required'
          }));
        case 1:
          if (!orderId) {
            _context4.n = 3;
            break;
          }
          _context4.n = 2;
          return _Order.Order.findById(orderId);
        case 2:
          order = _context4.v;
          _context4.n = 5;
          break;
        case 3:
          _context4.n = 4;
          return _Order.Order.findOne({
            'paymentInfo.stripePaymentIntentId': paymentIntentId
          });
        case 4:
          order = _context4.v;
        case 5:
          if (order) {
            _context4.n = 6;
            break;
          }
          return _context4.a(2, res.status(404).json({
            success: false,
            error: 'Order not found'
          }));
        case 6:
          _context4.n = 7;
          return stripe.refunds.create({
            payment_intent: paymentIntentId || order.paymentInfo.stripePaymentIntentId,
            amount: amount ? Math.round(amount * 100) : undefined,
            reason: reason
          });
        case 7:
          refund = _context4.v;
          order.paymentInfo.refunds = order.paymentInfo.refunds || [];
          order.paymentInfo.refunds.push({
            refundId: refund.id,
            amount: refund.amount,
            reason: refund.reason,
            status: refund.status,
            createdAt: new Date()
          });
          order.paymentInfo.amountRefunded = (order.paymentInfo.amountRefunded || 0) + refund.amount;
          if (order.paymentInfo.amountRefunded >= order.paymentInfo.amountPaid) {
            order.paymentInfo.paymentStatus = 'refunded';
            order.orderStatus = 'Refunded';
          } else {
            order.paymentInfo.paymentStatus = 'partially_refunded';
          }
          order.orderHistory = order.orderHistory || [];
          order.orderHistory.push({
            status: 'Refund Processed',
            changedAt: new Date(),
            note: "Refund of $".concat(refund.amount / 100, " processed")
          });
          _context4.n = 8;
          return order.save();
        case 8:
          res.status(200).json({
            success: true,
            refund: {
              id: refund.id,
              amount: refund.amount / 100,
              status: refund.status,
              reason: refund.reason
            },
            order: {
              id: order._id,
              orderStatus: order.orderStatus,
              paymentStatus: order.paymentInfo.paymentStatus
            }
          });
          _context4.n = 10;
          break;
        case 9:
          _context4.p = 9;
          _t6 = _context4.v;
          console.error('Error creating refund:', _t6);
          res.status(500).json({
            success: false,
            error: 'Failed to create refund',
            message: _t6.message
          });
        case 10:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function createRefund(_x0, _x1) {
    return _ref4.apply(this, arguments);
  };
}();
var getOrdersByPaymentStatus = exports.getOrdersByPaymentStatus = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var status, orders, _t7;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.p = 0;
          status = req.params.status;
          _context5.n = 1;
          return _Order.Order.find({
            'paymentInfo.paymentStatus': status
          }).populate('user products.product').sort({
            createdAt: -1
          });
        case 1:
          orders = _context5.v;
          res.status(200).json({
            success: true,
            count: orders.length,
            orders: orders
          });
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t7 = _context5.v;
          console.error('Error fetching orders by payment status:', _t7);
          res.status(500).json({
            success: false,
            error: 'Failed to fetch orders',
            message: _t7.message
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function getOrdersByPaymentStatus(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();
var getPendingPayments = exports.getPendingPayments = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var orders, _t8;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return _Order.Order.find({
            'paymentInfo.paymentStatus': {
              $in: ['pending', 'processing']
            },
            paymentMethod: {
              $ne: 'Cash on Delivery'
            }
          }).populate('user products.product').sort({
            createdAt: -1
          });
        case 1:
          orders = _context6.v;
          res.status(200).json({
            success: true,
            count: orders.length,
            orders: orders
          });
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t8 = _context6.v;
          console.error('Error fetching pending payments:', _t8);
          res.status(500).json({
            success: false,
            error: 'Failed to fetch pending payments',
            message: _t8.message
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function getPendingPayments(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();
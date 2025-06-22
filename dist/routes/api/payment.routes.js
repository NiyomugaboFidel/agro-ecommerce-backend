"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _payment = require("../../controllers/payment.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post('/create-payment-session', _payment.createPayment);
// router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
router.get('/session/:sessionId', _payment.getPaymentSession);
router.post('/refund', _payment.createRefund);
router.get('/orders/status/:status', _payment.getOrdersByPaymentStatus);
router.get('/pending', _payment.getPendingPayments);
var _default = exports["default"] = router;
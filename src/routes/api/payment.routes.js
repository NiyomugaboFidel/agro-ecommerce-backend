import express from 'express';
import {
  createPayment,
  stripeWebhook,
  getPaymentSession,
  createRefund,
  getOrdersByPaymentStatus,
  getPendingPayments
} from '../../controllers/payment.controller';

const router = express.Router();

router.post('/create-payment-session', createPayment);
// router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
router.get('/session/:sessionId', getPaymentSession);
router.post('/refund', createRefund);
router.get('/orders/status/:status', getOrdersByPaymentStatus);
router.get('/pending', getPendingPayments);

export default router;
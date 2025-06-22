const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { Order } from '../models/Order';
import "dotenv/config";

export const createPayment = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Request body is empty or not properly parsed',
        message: 'Make sure Content-Type is application/json and body is valid JSON'
      });
    }

    const {
      orderId,
      amount,
      currency = 'usd',
      productName = 'Product Purchase',
      productDescription = 'Order payment',
      quantity = 1,
      customerEmail,
      metadata = {}
    } = req.body;

    console.log('Extracted orderId:', orderId);

    if (!orderId) {
      return res.status(400).json({
        success: false,
        error: 'Order ID is required',
        receivedData: req.body
      });
    }

    const order = await Order.findById(orderId).populate('user products.product');
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
        orderId: orderId
      });
    }

    console.log('Found order:', order._id);

    const paymentAmount = amount || order.totalPrice;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail || order.customerInfo?.email || 'customer@example.com',
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: productName,
              description: productDescription,
            },
            unit_amount: Math.round(paymentAmount * 100),
          },
          quantity: quantity,
        },
      ],
      metadata: {
        ...metadata,
        orderId: orderId.toString(),
        mongoOrderId: orderId.toString(),
        originalAmount: paymentAmount.toString()
      },
      success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/cancel`,
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60),
    });

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
      note: `Stripe checkout session created: ${session.id}`,
    });

    await order.save();

    console.log('Payment session created successfully:', session.id);

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
      orderId: order._id,
      amount: paymentAmount,
      currency: currency,
      message: 'Payment session created successfully'
    });

  } catch (error) {
    console.error('Stripe payment creation error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to create payment session',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      error: 'Webhook processing failed',
      message: error.message
    });
  }
};


async function handleCheckoutSessionCompleted(session) {
  try {
    console.log('Processing checkout session completed:', session.id);
    
    const order = await Order.findOne({ 
      'paymentInfo.stripeSessionId': session.id 
    }).populate('user products.product');
    
    if (!order) {
      console.error('Order not found for session:', session.id);
      return;
    }
    
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
      note: `Payment of $${session.amount_total / 100} completed successfully`,
    });
    
    await order.save();
    
    console.log(`Order ${order._id} payment completed: $${session.amount_total / 100}`);
    
  } catch (error) {
    console.error('Error handling checkout session completed:', error);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    const order = await Order.findOne({ 
      'paymentInfo.stripePaymentIntentId': paymentIntent.id 
    });
    
    if (order) {
      order.paymentInfo = order.paymentInfo || {};
      order.paymentInfo.paymentStatus = 'succeeded';
      order.paymentInfo.amountPaid = paymentIntent.amount;
      order.paymentInfo.paidAt = new Date();
      order.orderStatus = 'Approved';
      
      order.orderHistory = order.orderHistory || [];
      order.orderHistory.push({
        status: 'Payment Succeeded',
        changedAt: new Date(),
        note: `Payment intent ${paymentIntent.id} succeeded`,
      });
      
      await order.save();
      
      console.log(`Payment of $${paymentIntent.amount / 100} succeeded for order ${order._id}`);
    }
    
  } catch (error) {
    console.error('Error handling payment intent succeeded:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent) {
  try {
    const order = await Order.findOne({ 
      'paymentInfo.stripePaymentIntentId': paymentIntent.id 
    });
    
    if (order) {
      order.paymentInfo = order.paymentInfo || {};
      order.paymentInfo.paymentStatus = 'failed';
      order.orderStatus = 'Payment Failed';
      
      order.orderHistory = order.orderHistory || [];
      order.orderHistory.push({
        status: 'Payment Failed',
        changedAt: new Date(),
        note: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
      });
      
      await order.save();
      
      console.log(`Payment of $${paymentIntent.amount / 100} failed for order ${order._id}`);
    }
    
  } catch (error) {
    console.error('Error handling payment intent failed:', error);
  }
}

export const getPaymentSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ 
        success: false,
        error: 'Session ID is required' 
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    const order = await Order.findOne({ 
      'paymentInfo.stripeSessionId': sessionId 
    }).populate('user products.product');
    
    res.status(200).json({
      success: true,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
      },
      order: order ? {
        id: order._id,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentInfo?.paymentStatus,
        totalPrice: order.totalPrice,
        products: order.products,
      } : null,
    });

  } catch (error) {
    console.error('Error retrieving payment session:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to retrieve payment session',
      message: error.message 
    });
  }
};

export const createRefund = async (req, res) => {
  try {
    const { orderId, paymentIntentId, amount, reason = 'requested_by_customer' } = req.body;

    if (!orderId && !paymentIntentId) {
      return res.status(400).json({ 
        success: false,
        error: 'Either Order ID or Payment Intent ID is required' 
      });
    }

    let order;
    if (orderId) {
      order = await Order.findById(orderId);
    } else {
      order = await Order.findOne({ 
        'paymentInfo.stripePaymentIntentId': paymentIntentId 
      });
    }

    if (!order) {
      return res.status(404).json({ 
        success: false,
        error: 'Order not found' 
      });
    }

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId || order.paymentInfo.stripePaymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
      reason: reason,
    });

    order.paymentInfo.refunds = order.paymentInfo.refunds || [];
    order.paymentInfo.refunds.push({
      refundId: refund.id,
      amount: refund.amount,
      reason: refund.reason,
      status: refund.status,
      createdAt: new Date(),
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
      note: `Refund of $${refund.amount / 100} processed`,
    });

    await order.save();

    res.status(200).json({
      success: true,
      refund: {
        id: refund.id,
        amount: refund.amount / 100,
        status: refund.status,
        reason: refund.reason,
      },
      order: {
        id: order._id,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentInfo.paymentStatus,
      },
    });

  } catch (error) {
    console.error('Error creating refund:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create refund',
      message: error.message 
    });
  }
};

export const getOrdersByPaymentStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const orders = await Order.find({ 'paymentInfo.paymentStatus': status })
      .populate('user products.product')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders by payment status:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch orders',
      message: error.message 
    });
  }
};

export const getPendingPayments = async (req, res) => {
  try {
    const orders = await Order.find({ 
      'paymentInfo.paymentStatus': { $in: ['pending', 'processing'] },
      paymentMethod: { $ne: 'Cash on Delivery' }
    })
      .populate('user products.product')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('Error fetching pending payments:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch pending payments',
      message: error.message 
    });
  }
};
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        manager: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Refers to the manager of the product
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Credit Card", "Online Payment"],
      default: "Cash on Delivery",
    },
    
    // Enhanced payment information for Stripe integration
    paymentInfo: {
      // Stripe payment details
      stripeSessionId: {
        type: String,
        sparse: true, // Allows null values but ensures uniqueness when present
      },
      stripePaymentIntentId: {
        type: String,
        sparse: true,
      },
      stripeCustomerId: {
        type: String,
      },
      
      // Payment status tracking
      paymentStatus: {
        type: String,
        enum: ["pending", "processing", "succeeded", "failed", "canceled", "refunded", "partially_refunded"],
        default: "pending",
      },
      
      // Payment amounts in cents (Stripe uses cents)
      amountPaid: {
        type: Number,
        default: 0,
      },
      amountRefunded: {
        type: Number,
        default: 0,
      },
      
      // Currency
      currency: {
        type: String,
        default: "usd",
        lowercase: true,
      },
      
      // Payment timestamps
      paidAt: {
        type: Date,
      },
      refundedAt: {
        type: Date,
      },
      
      // Refund information
      refunds: [{
        refundId: String,
        amount: Number,
        reason: String,
        status: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }],
      
      // Store checkout session URL for reference
      checkoutUrl: {
        type: String,
      },
      
      // Payment metadata from Stripe
      paymentMetadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
    
    orderStatus: {
      type: String,
      enum: ["Pending", "Payment Pending", "Payment Failed", "Approved", "Rejected", "Delivered", "Cancelled", "Refunded"],
      default: "Pending",
    },
    
    shippingAddress: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
      province: {
        type: String,
      },
      district: {
        type: String,
      },
    },
    
    // Customer information for Stripe
    customerInfo: {
      email: {
        type: String,
      },
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    
    orderDate: {
      type: Date,
      default: Date.now,
    },
    
    managerApprovalStatus: [
      {
        manager: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
        approvedAt: {
          type: Date,
        },
        rejectionReason: {
          type: String,
        },
      },
    ],
    
    adminApprovalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    
    deliveryStatus: {
      adminConfirmed: {
        type: Boolean,
        default: false,
      },
      isDelivered: {
        type: Boolean,
        default: false,
      },
      deliveredAt: {
        type: Date,
      },
      trackingNumber: {
        type: String,
      },
    },
    
    // Order notes and history
    notes: {
      type: String,
    },
    
    orderHistory: [{
      status: String,
      changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
      note: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
orderSchema.index({ user: 1, orderDate: -1 });
orderSchema.index({ "paymentInfo.stripeSessionId": 1 });
orderSchema.index({ "paymentInfo.stripePaymentIntentId": 1 });
orderSchema.index({ "paymentInfo.paymentStatus": 1 });
orderSchema.index({ orderStatus: 1 });

// Virtual for checking if order is paid
orderSchema.virtual('isPaid').get(function() {
  if (this.paymentMethod === 'Cash on Delivery') {
    return this.deliveryStatus.isDelivered;
  }
  return this.paymentInfo.paymentStatus === 'succeeded';
});

// Virtual for getting payment display status
orderSchema.virtual('paymentDisplayStatus').get(function() {
  if (this.paymentMethod === 'Cash on Delivery') {
    return this.deliveryStatus.isDelivered ? 'Paid (COD)' : 'Pending (COD)';
  }
  
  switch (this.paymentInfo.paymentStatus) {
    case 'succeeded':
      return 'Paid';
    case 'pending':
      return 'Payment Pending';
    case 'processing':
      return 'Processing Payment';
    case 'failed':
      return 'Payment Failed';
    case 'refunded':
      return 'Refunded';
    case 'partially_refunded':
      return 'Partially Refunded';
    default:
      return 'Unknown';
  }
});

// Method to update payment status
orderSchema.methods.updatePaymentStatus = function(status, metadata = {}) {
  this.paymentInfo.paymentStatus = status;
  
  if (status === 'succeeded') {
    this.paymentInfo.paidAt = new Date();
    this.orderStatus = 'Approved'; // Auto-approve paid orders
  } else if (status === 'failed') {
    this.orderStatus = 'Payment Failed';
  }
  
  // Add to order history
  this.orderHistory.push({
    status: `Payment ${status}`,
    changedAt: new Date(),
    note: `Payment status updated to ${status}`,
  });
  
  // Update metadata if provided
  if (Object.keys(metadata).length > 0) {
    this.paymentInfo.paymentMetadata = {
      ...this.paymentInfo.paymentMetadata,
      ...metadata,
    };
  }
  
  return this.save();
};

// Method to add refund
orderSchema.methods.addRefund = function(refundData) {
  this.paymentInfo.refunds.push(refundData);
  this.paymentInfo.amountRefunded += refundData.amount;
  
  // Update payment status based on refund amount
  if (this.paymentInfo.amountRefunded >= this.paymentInfo.amountPaid) {
    this.paymentInfo.paymentStatus = 'refunded';
    this.orderStatus = 'Refunded';
  } else {
    this.paymentInfo.paymentStatus = 'partially_refunded';
  }
  
  this.paymentInfo.refundedAt = new Date();
  
  // Add to order history
  this.orderHistory.push({
    status: 'Refund Processed',
    changedAt: new Date(),
    note: `Refund of ${refundData.amount / 100} processed. Reason: ${refundData.reason}`,
  });
  
  return this.save();
};

// Static method to find orders by payment status
orderSchema.statics.findByPaymentStatus = function(status) {
  return this.find({ 'paymentInfo.paymentStatus': status });
};

// Static method to find orders needing payment
orderSchema.statics.findPendingPayments = function() {
  return this.find({
    paymentMethod: { $ne: 'Cash on Delivery' },
    'paymentInfo.paymentStatus': { $in: ['pending', 'processing'] }
  });
};

export const Order = mongoose.model("Order", orderSchema);
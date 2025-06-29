import { generateOrderEmailTemplate } from "../middlewares/generateOrderEmailTemplate";
import { Cart } from "../models/Cart";
import { Order } from "../models/Order";
import User from "../models/User";
import { sendEmail } from "../utils/emailUtil";
import { Product } from "../models/Product";

export const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { street, city, postalCode, country, province, district } = req.body;

  try {
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const managers = [...new Set(cart.products.map((item) => item.product.user.toString()))];

    const order = new Order({
      user: userId,
      products: cart.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        manager: item.product.user,
        status: "Pending",
      })),
      totalPrice: cart.totalPrice,
      shippingAddress: {
        street,
        city,
        postalCode,
        country,
        province,
        district,
      },
      managerApprovalStatus: managers.map((manager) => ({
        manager,
        status: "Pending",
      })),
    });

    await order.save();

    const managerEmails = await User.find({
      _id: { $in: managers },
    }).select("email firstname lastname");
    
    const recipients = [
      { name: "Admin super", address: process.env.ADMIN_MAIL },
      ...managerEmails.map((manager) => ({
        name: `${manager.firstname} ${manager.lastname}`,
        address: manager.email,
      })),
    ];

    // Send email to both admin and managers
    const htmlMessage = generateOrderEmailTemplate(user, order, cart);
    const emailData = {
      sender: { name: "Your Store", address: process.env.MAIL_USER },
      recipients,
      subject: `New Order Placed by ${user.firstname} ${user.lastname}`,
      message: `A new order has been placed by ${user.firstname} ${user.lastname}.`,
      data: { htmlMessage },
    };

    await sendEmail(emailData);

    // Clear the cart after order is placed
    cart.products = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
};



export const updateOrderStatus = async (req, res) => {
  const orderId = req.params._id;
  const { status } = req.body;
  const userId = req.user.id;
  const isAdmin = req.user.role === "superAdmin";

  try {
    const order = await Order.findById(orderId).populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({ message: "Cannot update the status of a cancelled order." });
    }

    // Ensure status is Pending before approving
    // if (status === "Approved" && order.orderStatus !== "Pending") {
    //   return res.status(400).json({ message: "Order cannot be approved unless it is pending." });
    // }

    if (isAdmin) {
      // Admin updates the order status
      order.adminApprovalStatus = status;
      if (status === "Approved") {
        order.orderStatus = "Approved";
      } else if (status === "Rejected") {
        order.orderStatus = "Rejected";
      }

      await order.save();
      return res.status(200).json(order);
    } else {
      // If the user is not admin, they must be a manager
      const managerStatus = order.managerApprovalStatus.find(
        (ms) => ms.manager.toString() === userId.toString()
      );

      if (!managerStatus) {
        return res.status(403).json({ message: "Unauthorized to update this order" });
      }

      // Update the manager's approval status
      managerStatus.status = status;

      // Handle the case where the manager rejects the product
      if (status === "Rejected") {
        // Remove the rejected product from the order
        order.products = order.products.filter(
          (item) => item.manager.toString() !== userId.toString()
        );
        // Remove the manager's approval status
        order.managerApprovalStatus = order.managerApprovalStatus.filter(
          (ms) => ms.manager.toString() !== userId.toString()
        );
      }

      // Check if all remaining managers have approved the order
      const allApproved = order.managerApprovalStatus.every((ms) => ms.status === "Approved");

      if (allApproved) {
        order.orderStatus = "Approved";
      } else if (order.managerApprovalStatus.length === 0) {
        // If all products were rejected, reject the entire order
        order.orderStatus = "Rejected";
      }

      await order.save();
      res.status(200).json(order);
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status", error });
  }
};




export const updateDeliveryStatus = async (req, res) => {
  const orderId = req.params._id;
  const isAdmin = req.user.role === "superAdmin";
  
  try {
    const order = await Order.findById(orderId).populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only superAdmin confirms delivery
    if (isAdmin) {
      order.deliveryStatus.adminConfirmed = true;

      // Check if admin confirmed delivery
      if (order.deliveryStatus.adminConfirmed) {
        order.deliveryStatus.isDelivered = true;
        order.orderStatus = "Delivered";

        // Reduce the quantity of each product in the order
        for (const item of order.products) {
          const product = await Product.findById(item.product._id);
          if (product.quantity < item.quantity) {
            return res.status(400).json({
              message: `Not enough stock for product: ${product.title}. Available quantity: ${product.quantity}`,
            });
          }
          product.quantity -= item.quantity;
          await product.save();
        }
      }
    } else {
      return res.status(403).json({ message: "Unauthorized to confirm delivery" });
    }

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating delivery status:", error);
    res.status(500).json({ message: "Failed to update delivery status", error });
  }
};

  

  
  export const getOrdersByUser = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const orders = await Order.find({ user: userId }).populate("products.product");
  
      if (!orders || orders.length === 0) {
        return res.status(400).json({ message: "No orders found" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error retrieving orders by user:", error);
      res.status(500).json({ message: "Failed to retrieve orders", error });
    }
  };

  export const getAllOrders = async (req, res) => {
    const user=req.user
    try {
        if(user.role!=="superAdmin"){
            return res.status(403).json({message:"only superAdmin allowed!"})
        }
      const orders = await Order.find().populate("products.product");
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error retrieving all orders:", error);
      res.status(500).json({ message: "Failed to retrieve orders", error });
    }
  };

  export const getAllDeliveredOrders = async (req, res) => {
    const user = req.user;
  
    try {
      // Check if the user is a superAdmin 
      if (user.role !== "superAdmin") {
        return res.status(403).json({ message: "Only superAdmin is allowed!" });
      }
  
      // Query to find all orders where deliveryStatus.isDelivered is true
      const deliveredOrders = await Order.find({ "deliveryStatus.isDelivered": true })
        .populate("products.product") // Populating the product details
        .exec();
  
      // Check if any orders were found
      if (!deliveredOrders || deliveredOrders.length === 0) {
        return res.status(404).json({ message: "No delivered orders found" });
      }
  
      // Return the delivered orders
      res.status(200).json(deliveredOrders);
    } catch (error) {
      console.error("Error retrieving delivered orders:", error);
      res.status(500).json({ message: "Failed to retrieve delivered orders", error });
    }
  };
  
  export const CancelOrder = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params._id;
  
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if (order.user.toString() !== userId) {
        return res.status(403).json({ message: 'You do not have permission to cancel this order' });
      }
  
      if (order.orderStatus === 'Cancelled') {
        return res.status(400).json({ message: 'Order is already cancelled' });
      }
      order.orderStatus = 'Cancelled';
      await order.save();
  
      res.status(200).json({ message: 'Order successfully cancelled', order });
    } catch (error) {
      console.error('Failed to cancel order:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const getOrderById = async (req, res) => {
    const orderId = req.params._id;
  
    try {
      // Fetch the order by its ID and populate the 'products.product' field
      const order = await Order.findById(orderId)
        .populate("products.product") // Populating the product details from the referenced collection
        .exec();
  
      // If no order is found, return a 404 error
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Return the order data
      return res.status(200).json(order);
    } catch (error) {
      // Catch any errors that occur and return a 500 server error
      console.error("Error fetching order by ID:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  };
import User from "../models/User";
import { Order } from "../models/Order";
import { Product } from "../models/Product";

export const Statistics = async (req, res) => {
  try {
    // Total number of users, grouped by role
    const userStatistics = await User.aggregate([
      {
        $group: {
          _id: '$role', // Group users by their role
          count: { $sum: 1 }, // Count the number of users in each role
        },
      },
    ]);

    // Total number of active vs inactive users
    const userActiveStatus = await User.aggregate([
      {
        $group: {
          _id: '$isActive',
          count: { $sum: 1 }, // Count active/inactive users
        },
      },
    ]);

    // Total number of products, categorized by expiration status and category
    const productStatistics = await Product.aggregate([
      {
        $group: {
          _id: '$isExpired', // Group by expired status
          count: { $sum: 1 }, // Count the number of expired and non-expired products
        },
      },
    ]);

    // Total products by category
    const productCategoryStatistics = await Product.aggregate([
      {
        $group: {
          _id: '$category', // Group by category
          count: { $sum: 1 }, // Count products in each category
        },
      },
      {
        $lookup: {
          from: 'categories', // Assuming you have a Category model
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },
      {
        $unwind: '$categoryInfo',
      },
      {
        $project: {
          categoryName: '$categoryInfo.name',
          count: 1,
        },
      },
    ]);

    // Total number of orders and revenue statistics
    const orderStatistics = await Order.aggregate([
      {
        $group: {
          _id: null, // No grouping (get total for all orders)
          totalRevenue: { $sum: '$totalPrice' }, // Sum of all order prices (assuming `totalPrice` exists)
          orderCount: { $sum: 1 }, // Total number of orders
          avgOrderValue: { $avg: '$totalPrice' }, // Average order value
        },
      },
    ]);

    // Orders grouped by month
    const ordersPerMonth = await Order.aggregate([
      {
        $group: {
          _id: { $month: '$createdAt' }, // Group by the month of creation
          orderCount: { $sum: 1 }, // Count the number of orders per month
          totalRevenue: { $sum: '$totalPrice' }, // Total revenue per month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);

    // Average product rating (assuming a rating field exists)
    const productRatingStatistics = await Product.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$stars' }, // Average rating
        },
      },
    ]);

    // Number of products per unit (kg, pcs, bottle, etc.)
    const productUnitStatistics = await Product.aggregate([
      {
        $group: {
          _id: '$unit', // Group by product unit
          count: { $sum: 1 }, // Count the number of products in each unit
        },
      },
    ]);

    // Total products added in the last 30 days
    const recentProductsCount = await Product.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    // Send the aggregated data to the frontend
    return res.status(200).json({
      userStatistics,
      userActiveStatus,
      productStatistics,
      productCategoryStatistics,
      orderStatistics: orderStatistics[0], // Since there's no grouping, return first item
      ordersPerMonth,
      productRatingStatistics: productRatingStatistics[0], // Return first item
      productUnitStatistics,
      recentProductsCount,
    });
  } catch (error) {
    console.error("Failed to fetch statistics", error);
    return res.status(500).json({ message: "Failed to fetch statistics" });
  }
};

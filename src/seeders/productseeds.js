import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import User from "../models/User.js";

const productSeeder = async () => {
  try {
    const admin = await User.findOne({ email: process.env.ADMIN_MAIL });
    if (!admin) {
      console.log("❌ Admin not found. Seed admin first.");
      return;
    }

    const agricultureCategory = await Category.findOne({ name: "agriculture" });
    const foodCategory = await Category.findOne({ name: "food" });

    if (!agricultureCategory || !foodCategory) {
      console.log("❌ Categories missing. Seed categories first.");
      return;
    }

    const products = [
      {
        title: "Fresh Tomatoes",
        images: ["uploads/tomato1.jpg"],
        price: 1500,
        discount: "10%",
        quantity: 100,
        moq: 5,
        unit: "kg",
        details: "Fresh and organic tomatoes from local farms.",
        category: foodCategory._id,
        user: admin._id,
        expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      },
      {
        title: "Wheat Seeds",
        images: ["uploads/wheat1.jpg"],
        price: 3000,
        discount: "5%",
        quantity: 500,
        moq: 10,
        unit: "kg",
        details: "High-quality wheat seeds for better yield.",
        category: agricultureCategory._id,
        user: admin._id,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Organic Carrots",
        images: ["uploads/carrots.jpg"],
        price: 2000,
        discount: "15%",
        quantity: 250,
        moq: 4,
        unit: "kg",
        details: "Organic, crunchy, and nutritious carrots.",
        category: foodCategory._id,
        user: admin._id,
        expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ];

    const existing = await Product.countDocuments();
    if (existing === 0) {
      await Product.insertMany(products);
      console.log("✅ Products seeded successfully");
    } else {
      console.log("ℹ️ Products already exist. Skipping.");
    }
  } catch (error) {
    console.error("❌ Product seeding failed:", error.message);
  }
};

export default productSeeder;

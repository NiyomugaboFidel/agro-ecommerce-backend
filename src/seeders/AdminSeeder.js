import User from "../models/User.js";
import { Category } from "../models/Category.js";
import { generateToken } from "../utils/generateToken.js";
import { BcryptUtil } from "../utils/bcryptjs.js";

const seedData = async () => {
  try {
    const adminEmail = process.env.ADMIN_MAIL;
    // ✅ Seed admin user
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await BcryptUtil.hash("adminPassword");
      const admin = await User.create({
        firstname: "admin",
        lastname: "super",
        email: adminEmail,
        role: "superAdmin",
        phoneNumber: "+250786639348",
        password: hashedPassword,
      });

      const token = generateToken(admin);
      console.log("✅ Admin user seeded successfully");
      console.log("🔑 Admin token:", token);
    } else {
      console.log("✅ Admin user already exists.");
    }

    // ✅ Seed categories
    const categoriesCount = await Category.countDocuments();
    if (categoriesCount === 0) {
      await Category.insertMany([
        { name: "agriculture" },
        { name: "food" }
      ]);
      console.log("✅ Categories seeded: agriculture, food");
    } else {
      console.log("✅ Categories already exist.");
    }

  } catch (error) {
    console.error("❌ Seeding error:", error);
  }
};

export default seedData;

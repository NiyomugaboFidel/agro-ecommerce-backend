import mongoose from "mongoose";

// Enum for product units
const unitsEnum = [
  "kg",      // Kilograms
  "g",       // Grams
  "lb",      // Pounds
  "l",       // Liters
  "ml",      // Milliliters
  "m",       // Meters
  "cm",      // Centimeters
  "pcs",     // Pieces
  "box",     // Box
  "dozen",   // Dozen
  "bottle",  // Bottle
  "packet",  // Packet
];

const productSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      default: [],
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stars: { type: Number, min: 0, max: 5, default: 0 },
    rates: { type: Number, default: 0 },
    discount: { type: String, default: "" },
    quantity: { type: Number, default: 0 },
    moq: { type: Number, default: 1, min: 1 },
    unit: { type: String, enum: unitsEnum, required: true },
    details: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderCount: {
      type: Number,
      default: 0,
    },
    expirationDate: {
      type: Date,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  this.isExpired = this.expirationDate < Date.now();
  next();
});

export const Product = mongoose.model("Product", productSchema);

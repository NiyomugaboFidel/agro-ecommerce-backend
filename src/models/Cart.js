import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
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
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalItems: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("save", async function (next) {
  this.totalItems = this.products.reduce((acc, item) => acc + item.quantity, 0);
  this.totalPrice = 0;
  for (const item of this.products) {
    const product = await mongoose.model("Product").findById(item.product);
    this.totalPrice += item.quantity * product.price;
  }

  next();
});

export const Cart = mongoose.model("Cart", cartSchema);

import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

export const addToCart = async (req, res) => {
  const productId = req.params._id;
  const { quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > product.quantity) {
      return res.status(400).json({
        message: `Not enough stock for product: ${product.title}. Available quantity: ${product.quantity}`,
      });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If no cart exists, create one and check MOQ
      if (quantity < product.moq) {
        return res.status(400).json({
          message: `The quantity for product: ${product.title} must be at least ${product.moq}`,
        });
      }

      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }],
      });
    } else {
      // Check if the product is already in the cart
      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingProductIndex > -1) {
        // Product exists in the cart, check the combined quantity
        const newQuantity = cart.products[existingProductIndex].quantity + quantity;

        // Check if the combined quantity exceeds the available stock
        if (newQuantity > product.quantity) {
          return res.status(400).json({
            message: `Not enough stock for product: ${product.title}. Available quantity: ${product.quantity}`,
          });
        }

        // Update the quantity in the cart
        cart.products[existingProductIndex].quantity = newQuantity;
      } else {
        // Product doesn't exist in the cart, add it with the requested quantity
        if (quantity < product.moq) {
          return res.status(400).json({
            message: `The quantity for product: ${product.title} must be at least ${product.moq}`,
          });
        }

        // Add the product to the cart
        cart.products.push({ product: productId, quantity });
      }
    }

    // Save the cart
    await cart.save();
    req.io.to(userId).emit("")
    res.status(201).json({
      cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};



export const getCart=async(req,res)=>{
    const userId=req.user.id;
    try{
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "products.product",
            model: "Product",
            select: "title price images quantity moq",
          });
      
          if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
          }
      
          res.status(200).json({
            message: "Cart retrieved successfully",
            cart,
          });
    }
    catch(error){
        return res. status(500).json({message:"internal server Error!"})
    }
}

export const removeFromCart = async (req, res) => {
    const productId = req.params._id;
    const userId = req.user.id;
  
    try {
      // Find the user's cart
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Check if the product exists in the cart
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in the cart" });
      }
  
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({
        message: "Product removed from cart successfully",
        cart,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };

  export const clearCart = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.products = [];

      await cart.save();
  
      res.status(200).json({
        message: "Cart cleared successfully",
        cart,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
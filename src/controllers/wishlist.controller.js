import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { Wishlist } from "../models/Wishlist";


// Add a product to the wishlist
export const addToWishlist = async (req, res) => {
  const productId = req.params._id;
  const userId = req.user.id;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the wishlist
    const existingWishlistItem = await Wishlist.findOne({ user: userId, product: productId });
    if (existingWishlistItem) {
      return res.status(400).json({ message: "Product is already in your wishlist" });
    }

    // Add the product to the wishlist
    const wishlistItem = new Wishlist({ user: userId, product: productId });
    req.io.to(userId).emit('wishlistUpdated', { user:userId, product:product, action: 'added' });
    await wishlistItem.save();

    if (!req.io) {
      res.status(201).json(formattedResponse);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Remove a product from the wishlist
export const removeFromWishlist = async (req, res) => {
  const productId = req.params._id;
  const userId = req.user.id;

  try {
    // Find and remove the product from the wishlist
    const wishlistItem = await Wishlist.findOneAndDelete({ user: userId, product: productId });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Product not found in your wishlist" });
    }

    req.io.to(userId).emit("wishlistUpdated",{user:userId,product:productId,action:"removed"})

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Get a user's wishlist
export const getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.find({ user: userId }).populate("product");
    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const moveWishlistToCart = async (req, res) => {
    const productId = req.params._id;
    const userId = req.user.id;
    const { quantity } = req.body;
  
    try {
      // Find the product in the wishlist
      console.log(`prod id== ${productId} userid==${userId}`)
      const wishlistItem = await Wishlist.findOne({ user: userId, product: productId });
      console.log("wishlist item==",wishlistItem)
      if (!wishlistItem) {
        return res.status(404).json({ message: "Product not found in your wishlist" });
      }
  
      // Check if the product exists and has enough stock
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (quantity > product.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product: ${product.title}. Available quantity: ${product.quantity}`,
        });
      }
  
      // Find or create a cart for the user
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
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
          const newQuantity = cart.products[existingProductIndex].quantity + quantity;
  
          if (newQuantity > product.quantity) {
            return res.status(400).json({
              message: `Not enough stock for product: ${product.title}. Available quantity: ${product.quantity}`,
            });
          }
  
          // Update the quantity in the cart
          cart.products[existingProductIndex].quantity = newQuantity;
        } else {
          // Add the product to the cart
          cart.products.push({ product: productId, quantity });
        }
      }
  
      // Save the updated cart
      await cart.save();
  
      // Remove the product from the wishlist
      await Wishlist.findOneAndDelete({ user: userId, product: productId });
  
      res.status(200).json({
        message: "Wishes moved to Cart Successfully!",
        cart,
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
  
  // Move all products from the wishlist to the cart
  export const moveAllWishlistToCart = async (req, res) => {
    console.log("controller reached!")
    const userId = req.user.id;
    
    console.log("userId:", userId); 
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body); 
  
    try {
      const wishlistItems = await Wishlist.find({ user: userId }).populate("product");
    
      console.log("Wishlist Items:", wishlistItems);
  
      if (!wishlistItems.length) {
        return res.status(404).json({ message: "Your wishlist is empty" });
      }
  
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        cart = new Cart({ user: userId, products: [] });
      }
  
      for (const wishlistItem of wishlistItems) {
        const productId = wishlistItem.product._id;
        const product = wishlistItem.product;
        const quantity = wishlistItem.product.moq;
  
        console.log("Product ID:", productId);
        console.log("Product:", product);
  
        if (product.quantity < quantity) {
          return res.status(400).json({
            message: `Not enough stock for product: ${product.title}. Available quantity: ${product.quantity}`,
          });
        }
  
        const existingProductIndex = cart.products.findIndex(
          (item) => item.product.toString() === productId.toString()
        );
  
        if (existingProductIndex > -1) {
          const newQuantity = cart.products[existingProductIndex].quantity + quantity;
  
          if (newQuantity > product.quantity) {
            return res.status(400).json({
              message: `Not enough stock for product: ${product.title}. Available quantity: ${product.quantity}`,
            });
          }
  
          cart.products[existingProductIndex].quantity = newQuantity;
        } else {
          cart.products.push({ product: productId, quantity });
        }
      }
  
      // Save the updated cart
      await cart.save();
  
      // Clear the wishlist
      await Wishlist.deleteMany({ user: userId });
      req.io.to(userId).emit("cartUpdated", {
        user: userId,
        message: "Product(s) moved from wishlist to cart",
        cart,  // Send the updated cart details to update the UI
        action: "added",
      });

    // // if(!req.io){
      res.status(200).json({
        message: "All products moved from wishlist to cart",
        cart,
      });
    // // }
    } catch (error) {
      console.log("Error:", error); // Log the error
      res.status(500).json({ error: error.message });
    }
  };
  
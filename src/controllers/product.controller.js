import { Product } from "../models/Product";
import { Category } from "../models/Category";
import FuzzySearch from 'fuzzy-search'; 


export const createProduct = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== "superAdmin" && user.role !== "manager") {
      return res.status(403).json({ message: "Unauthorized: Only super admin or manager is allowed to create a product!" });
    }

    const { title, price, discount, quantity, moq, details, categoryName, expirationDate, unit } = req.body;
    const images = req.files.map((img) => img.path);

    // Find category by name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    // Create a new product with the provided data
    const newProduct = new Product({
      images,
      title,
      price,
      discount,
      quantity,
      details,
      category: category._id,
      user: user._id,
      expirationDate,
      moq,
      unit,  // New unit field
    });

    // Save the new product
    await newProduct.save();

    return res.status(201).json({
      product: newProduct,
      message: "Product created successfully!",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params._id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    if (user.role !== "superAdmin" && user._id.toString() !== product.user.toString()) {
      return res.status(403).json({ message: "Unauthorized: Only super admin or the creator of this product can update it!" });
    }

    const { title, price, stars, rates, discount, quantity, type, details, categoryName, expirationDate, moq, unit } = req.body;

    if (req.files && req.files.length > 0) {
      product.images = req.files.map((img) => img.path);
    }

    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });

      if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }

      product.category = category._id;
    }

    product.title = title || product.title;
    product.price = price || product.price;
    product.moq = moq || product.moq;
    product.stars = stars || product.stars;
    product.rates = rates || product.rates;
    product.discount = discount || product.discount;
    product.quantity = quantity || product.quantity;
    product.type = type || product.type;
    product.details = details || product.details;
    product.expirationDate = expirationDate || product.expirationDate;
    product.unit = unit || product.unit;

    const updatedProduct = await product.save();

    return res.status(200).json({
      product: updatedProduct,
      message: "Product updated successfully!",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error!", error: error.message });
  }
};



 export const getProductById=async(req,res)=>{
    try{
        const prodId=req.params._id;
        const product=await Product.findById(prodId).populate("category","name").exec()

        if(!product){
            return res.status(404).json({message:"Product not Found!"})
        }
        return res.status(200).json(product)
    }
    catch(error){
        return res.status(500).json({message:"internal server error!!"})
    }
  }

  export const getAllProducts=async(req,res)=>{
    try{
        const products=await Product.find()

        return res.status(200).json(products)
    }
    catch(error){
        return res.status(500).json({message:"internal server error!!"})
    }
  }

  export const getProductsByCategory = async (req, res) => {
    console.log("accessed")
    try {
      const categoryName = req.params.categoryName;

  
      // Find the category by name
      const category = await Category.findOne({ name: categoryName });
  
      if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }
  
      // Find products associated with this category
      const products = await Product.find({ category: category._id });
  
      return res.status(200).json( products );
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return res.status(500).json({ message: "Internal server error!" });
    }
  };
  
  export const searchProducts = async (req, res) => {
    try {
      const { title, minPrice, maxPrice, categoryName, stars, minQuantity, discount } = req.query;
      
      let query = {};
      
      // Fuzzy search for the title
      if (title) {
        const allProducts = await Product.find({}, 'title'); // Get all product titles
        const searcher = new FuzzySearch(allProducts, ['title'], { caseSensitive: false });
        const fuzzyTitleResults = searcher.search(title); // Perform fuzzy search
  
        if (fuzzyTitleResults.length === 0) {
          return res.status(404).json({ message: "No products found with the given title!" });
        }
  
        // Extract all matched product IDs
        const matchedTitles = fuzzyTitleResults.map((result) => result._id);
        query._id = { $in: matchedTitles }; // Filter products based on matched titles
      }
  
      // Price range search
      if (minPrice && maxPrice) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      } else if (minPrice) {
        query.price = { $gte: minPrice };
      } else if (maxPrice) {
        query.price = { $lte: maxPrice };
      }
  
      // Fuzzy search for the category name
      if (categoryName) {
        const allCategories = await Category.find({}, 'name'); // Get all category names
        const categorySearcher = new FuzzySearch(allCategories, ['name'], { caseSensitive: false });
        const fuzzyCategoryResults = categorySearcher.search(categoryName); // Perform fuzzy search
  
        if (fuzzyCategoryResults.length === 0) {
          return res.status(404).json({ message: "Category not found!" });
        }
  
        const matchedCategory = fuzzyCategoryResults[0]; // Pick the best match
        query.category = matchedCategory._id; // Add the matched category's ID to the query
      }
  
      // Quantity filter
      if (minQuantity) {
        query.quantity = { $gte: minQuantity };
      }
  
      // Discount filter (case-insensitive)
      if (discount) {
        query.discount = { $regex: discount, $options: "i" };
      }
  
      // Fetch products based on the query
      const products = await Product.find(query).populate("category", "name").exec();
      
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error searching products:", error.message);
      return res.status(500).json({ message: error.message });
    }
  };
  
import { Category } from "../models/Category";

export const createCategory = async (req, res) => {
  try {
    const user = req.user;

    if (!user.role === "superAdmin") {
      return res
        .status(403)
        .json({ message: "only super admin allowed to create category!" });
    }
    const { name } = req.body;
    const newCategory = await Category.create({
      name,
    });
    return res
      .status(201)
      .json({ message: "category created successfuly!", newCategory });
  } catch (error) {
    return res.status(500).json({ message: "internal server error!" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const catId = req.params._id;
    const { newCategory } = req.body;
    const user = req.user;
    if (!user.role === "superAdmin") {
      return res
        .status(403)
        .json({ message: "only super admin allowed to update category!" });
    }
    const category = await Category.findById(catId);
    if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }
    category.name = newCategory;
    const upadatedCategory = await category.save();
    return res.status(200).json({messsage:"category updated successfully!",upadatedCategory});
  } catch (error) {
    return res.status(500).json({ message: "internal server error!" });
  }
};

export const deleteCategory = async (req, res) => {
    try {
      const catId = req.params._id;
      const user = req.user;

      if (user.role !== "superAdmin") {
        return res
          .status(403)
          .json({ message: "Only super admin is allowed to delete a category!" });
      }
      const category = await Category.findById(catId);
      if (!category) {
        return res.status(404).json({ message: "Category not found!" });
      }
      const productsInCategory = await Product.find({ category: catId });
      if (productsInCategory.length > 0) {
        return res
          .status(400)
          .json({ message: "Cannot delete category with associated products!" });
      }
      await Category.findByIdAndDelete(catId);
  
      return res
        .status(200)
        .json({ message: "Category deleted successfully!" });
    } catch (error) {
      console.error("Error deleting category:", error);
      return res.status(500).json({ message: "Internal server error!" });
    }
  };

  export const getAllCategories=async(req,res)=>{
    try{
        const allCategories=await Category.find()
        return res.status(200).json(allCategories)
    }
    catch(error){
        return res.status(500).json({message:"internal server error!!"})
    }
  }

  export const getCategoryById=async(req,res)=>{
    try{
        const catId=req.params._id;

        const category=await Category.findById(catId)

        if(!category){
            return res.status(404).json({message:"no category found!"})
        }
        return res.status(200).json(category)
    }
    catch(error){
      console.log(error)
        return res.status(500).json({message:"internal server error!!"})
    }
  }
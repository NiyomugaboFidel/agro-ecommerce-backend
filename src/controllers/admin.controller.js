import User from "../models/User";

export const getUsers = async (req, res) => {
    const currentUser = req.user;

    try {
        if (currentUser.role !== "superAdmin") {
            return res.status(401).json({ message: "Only superAdmin Allowed!" });
        }
        const users = await User.find();

        const filteredUsers = users.filter(user => user._id.toString() !== currentUser._id.toString());

        return res.status(200).json(filteredUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUserRole=async(req,res)=>{
    try{
        const userId=req.params._id;
        const user=req.user;
        const {userRole}=req.body;
        if(user.role!=="superAdmin"){
            return res.status(401).json({message:"Unauthorized, only superAdmin allowed!"})
        }
        const userData=await User.findById({_id:userId})

        if(!userData){
            return res.status(404).json({message:"user not found!"})
        }

        userData.role=userRole;
        const updatedUserRole=await userData.save();

        return res.status(200).json({message:"user Role Updated Successfully!",user:updatedUserRole})
    }
    catch(error){
        return res.status(500).json({message:"internal server error",error:error})
    }
}
export const updateUserActive=async(req,res)=>{
    const userId=req.params._id;
    const user=req.user;
    try{
        if(user.role!=="superAdmin"){
            return res.status(401).json({message:"Unauthorized, only superAdmin allowed!"})
        }
        const targetUser = await User.findById(userId);

        // If user not found, return 404
        if (!targetUser) {
          return res.status(404).json({ message: "User not found!" });
        }
    
        // Toggle the 'isActive' status of the user
        targetUser.isActive = !targetUser.isActive;
    
        // Save the updated user
        await targetUser.save();
    
        // Respond with the updated user data
        return res.status(200).json({
          message: `User ${targetUser.isActive ? 'activated' : 'deactivated'} successfully!`,
          user: targetUser,
        });
      } catch (error) {
        console.error('Error updating user activeness:', error);
        return res.status(500).json({
          message: "An error occurred while updating the user's activeness.",
          error: error.message,
        });
      }
}

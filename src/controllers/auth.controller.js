import { status } from "init";
import User from "../models/User";
import { checkToken, registerUser } from "../services/user.service";
import { BcryptUtil } from "../utils/bcryptjs";
import { sendEmail } from "../utils/emailUtil";
import { generateToken } from "../utils/generateToken";

export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, role, phoneNumber, password } =
      req.body;
    const userData = {
      firstname,
      lastname,
      email,
      role,
      phoneNumber,
      password,
    };
    const userExist=await User.findOne({email})
    
    if(userExist){
      return res.status(401).json({error:"user Already Exist"})
    }
    const token = generateToken(userData);
    const response = await registerUser(userData);
    return res.status(201).json({
      user: response,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    console.log("user==++",foundUser)
    if (!foundUser) {
      return res.status(400).json({ error: "User does not exist!" });
    }

    // Check if the password is undefined or null
    if (!foundUser.password) {
      return res
        .status(400)
        .json({ error: "Password is missing in the user record!" });
    }

    const passwordMatches = await BcryptUtil.compare(
      req.body.password,
      foundUser.password
    );

    if (!passwordMatches) {
      return res.status(400).json({ error: "Passwords don't match!" });
    }

    const userToken = {
      _id: foundUser.id,
      firstname: foundUser.firstname,
      lastname: foundUser.lastname,
      email: foundUser.email,
      role: foundUser.role,
    };

    const token = generateToken(userToken);

    return res.status(200).json({
      message: "User logged in successfully!",
      user: {
        id: foundUser.id,
        firstname: foundUser.firstname,
        email: foundUser.email,
        role: foundUser.role,
        isactive: foundUser.isActive,
      },
      token: token,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const fillEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const userInfo = {
        email: user.email,
        id: user._id,
      };
      const token = generateToken(userInfo, { expiresIn: "10m" });
      const sendToEmail = req.body.email;
      const link = `${process.env.APP_URL}/auth/reset-password?token=${token}`;
      const HTMLText = `<html>
        <head>
        <style>
        .controler{
         display: flex;
         justify-content: center;
         align-items: center;
         background-color: gainsboro;
        }
        .container {
          border: 2px;
          color: black;
        }
        .button {
          background-color: #9B51E0;
          padding: 10px 20px;
          text-decoration: none;
          font-weight: bold;
          border-radius: 4px;
        }
        .button:hover{
         background-color: #8a7a99;
        }
        .container-full{
          background-color: white;
          border-radius: 4px;
          box-shadow: 8px white;
          position: relative;
          opacity: 70%;
          width: 60%;
          padding: 8px 8px 8px 8px;
          margin: auto;
        }
        .container-small{
         position: absolute;
         border-radius: 4px 4px 0px 0px;
         top: 0;
         left: 0;
         background-color: #9B51E0;
         width: 100%;
         height: 18%;
        }
        img{
          width: 200%;
          height: 100%;
          object-fit: cover;
        }
        .header{
          background-repeat: no-repeat;
          background-size: fit;
          width: 50%;
          height: 30%;
        }
        a{
          text-decoration: none;
          color: white;
        }
        span{
          color: #fff;
        }
      </style>
       </head>
       <body>
       <div class="controler">
        <div class="container-full">
        <div class="container-small" style="display: flex;">
            <p style="color: aliceblue; font-family: 'Courier New', Courier, monospace; padding: 20px;">Have You Heard? <br> Alive Now!</p> 
            <span style="padding: 12px; font-size: 30px;text-align: center; margin-left: 10px;">WooHo Car</span></div>
        <div style='font-size: 12px'><strong> <h3>Hi ${user.lastname}<h3/><br> <br>
        <div class = "header">
        <img src='https://d1u4v6449fgzem.cloudfront.net/2020/03/The-Ecommerce-Business-Model-Explained.jpg' alt='header'/>
        </div><br> <br>
        <div class="container">
        <h3>Please click  here to reset your password </h3>
        <a href="${link}" class="button"><span>Reset Password</span></a>
        </div>
        <br> <br>Remember, beware of scams and keep this one-time verification link confidential.<br>
        </strong><br>WooHoo Car</div>
        </div>
        </div>
        </body>
        </html>
         `;
      await sendEmail(sendToEmail, "Reset password", HTMLText);
      res.status(200).json({
        message: "Reset password email has been sent, check your inbox",
      });
    }
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ error: "server error" });
  }
};

export const ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = checkToken(token, process.env.JWT_SECRET);

    if (payload) {
      const hashPassword = await BcryptUtil.hash(req.body.password);
      await User.updateOne(
        { email: payload.data.email },
        {
          password: hashPassword,
          lastTimePasswordUpdated: new Date(),
          expired: false,
        }
      );
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      res.status(400).json({ message: "invalid token" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


export const updatePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("userId", userId);

    const { currentPassword, newPassword } = req.body;
    console.log("Received Passwords:", req.body);

    const user = await User.findById(userId);
    console.log("User from DB:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const isMatch = await BcryptUtil.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect!" });
    }
    const isSamePassword = await BcryptUtil.compare(newPassword, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({
          error: "New password must be different from the old password!",
        });
    }
    const hashedPassword = await BcryptUtil.hash(newPassword);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error("Update Password Error:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};


export const editUserProfile = async (req, res) => {
  try {
    const userEmail = req.user.email;
    
    // Find the user by email
    const decodeUser = await User.findOne({ email: userEmail });

    if (!decodeUser) {
      return res.status(401).json("User not found");
    }

    // Define the updated fields based on the request body or use existing data
    const updatedFields = {
      firstname: req.body.firstname || decodeUser.firstname,
      lastname: req.body.lastname || decodeUser.lastname,
      email: req.body.email || decodeUser.email,
      role: req.body.role || decodeUser.role,
      phoneNumber: req.body.phoneNumber || decodeUser.phoneNumber,
      profilePic: req.file ? req.file.path : decodeUser.profilePic,
      location: {
        province: req.body.province || decodeUser.location.province,
        city: req.body.city || decodeUser.location.city,
        street: req.body.street || decodeUser.location.street,
        zipcode: req.body.zipcode || decodeUser.location.zipcode,
      },
      isActive: req.body.isActive !== undefined ? req.body.isActive : decodeUser.isActive,
    };

    // Update the user with the new data
    const updatedUser = await User.findByIdAndUpdate(
      decodeUser._id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      user: updatedUser,
      message: "User profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const requestManager = async (req, res) => {
  try {
    const user = req.user;
    const { message } = req.body;
    const link = `${process.env.APP_URL}/users/update-role/${user._id}`;
    const recipients = [
      {
        name: "Fidele Niyomugabo",
        address: process.env.ADMIN_MAIL,
      },
    ];

    const data = {
      htmlMessage: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); background-color: #f9f9f9;">
          <h2 style="font-size: 24px; color: #2c3e50; text-align: center; margin-bottom: 20px;">requesting to be a manager</h2>
          <div style="font-size: 18px; color: #333;">
            <p><strong>Full Name:</strong> ${user.firstname} ${user.lastname}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phoneNumber}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px; border-left: 4px solid #3498db; margin-top: 10px;">
              ${message}
            </div>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${link}" style="text-decoration: none;">
              <button style="background-color: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
                Update Role
              </button>
            </a>
          </div>
        </div>
      `,
    };

    const results = await sendEmail({
      sender: {
        name: `${user.firstname} ${user.lastname}`,
        address: user.email,
      },
      recipients,
      subject: "New Request To Be A Manager",
      message: message,
      data: data,
    });

    return res.status(200).json({ accepted: results.accepted });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const getUserInfo=async(req,res)=>{
  const userId=req.user.id;
  try{
    const userInfo=await User.findById(userId);

    if(!userInfo){
      res.status(404).json({message:"user not Found!"})
    }
    res.status(200).json(userInfo)
  }
  catch(error){
    return res.status(500).json({message:"internal server Error!"})
  }
}

export const getUserById=async(req,res)=>{
  try{
    const userId=req.params._id;
    const user=await User.findById(userId)

    if(!user){
      return res.status(400).json({error:"user Not Found!"})
    }
    return res.status(200).json(user)
  }catch(error){
    return res.status(500).json({error:"internal server error"})
  }
}

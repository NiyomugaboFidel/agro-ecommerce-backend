
import { BcryptUtil } from "../utils/bcryptjs";
import User from "../models/User";
import Jwt from "jsonwebtoken";

export const registerUser = async (data) => {
  const { firstname, lastname, email, phoneNumber, password } =
    data;
  const newUser = await User.create({
    firstname,
    lastname,
    email,
    phoneNumber,
    password: await BcryptUtil.hash(password),
  });
  return newUser;
};

export const checkToken = (token, env) => {
  const payload = Jwt.verify(token, env, (error, decodedToken) => {
    if (error) {
      return error;
    }
    return decodedToken;
  });

  return payload;
};

// export const findUserById = async (id) => {
//   const user = await User.findById({ _id: id });
//   if (user) {
//     return user;
//   } else {
//     return false;
//   }
// };
// export const findUserByEmail = async (email) => {
//   const UserInfo = await User.findOne({ email });

//   if (UserInfo == null) {
//     return false;
//   }
//   return UserInfo;
// };
// export const findAllUsers = async (userId) => {
//   const users = await User.find({ _id: { $ne: userId } });
//   if (users) {
//     return users;
//   }
//   return false;
// };

// export const logout = async (userData) => {
//   const token = userData.split(" ")[1];
//   await Blacklist.create({ token });
// };

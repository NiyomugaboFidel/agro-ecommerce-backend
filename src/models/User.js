import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required:true,
    unique: true,
  },
  role: {
    type: String,
    default: 'client',
    enum:["client","manager","superAdmin"]
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilePic: {
    type: String,
    default: 'https://res.cloudinary.com/dd92qmql1/image/upload/v1688126539/DEV/user_3_nec6s8.png',
  },
  location: {
    province: {
      type: String,
    },
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
  isActive:{
    type:Boolean,
    default:true
  },
  provider: {
    type: String,
  },
}, { timestamps: true });

const User=mongoose.model('User',userSchema)

export default User;

import {User} from "../models/userModel.js";
import brcypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const newUser = async (req, res) => {
    try {
      const {name, email, password} = req.body;
      let user = await User.findOne({email});
      if(user) return next(new ErrorHandler("User already exists", 400))

      const hashedPassword = await brcypt.hash(password,10)
      user = await User.create({name,email,password: hashedPassword})

      sendCookie(user, res, "Registed Successfully", 201)
    } catch (error) {
      next(error)
    }
}

export const loginUser = async (req,res,next) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email}).select("+password");
      if(!user) return next(new ErrorHandler("Invalid Email", 404))
  
      const isMatch = await brcypt.compare(password, user.password);
      if(!isMatch) return next(new ErrorHandler("Invalid Password", 404))
  
      sendCookie(user, res, `Welcome Back ${user.name}`, 200)
    } catch (error) {
      next(error)
    }
}

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success:true,
    user: req.user,
  });
}

export const logoutUser = (req, res) => {
    res.status(200).cookie("token", "", {expires:new Date(Date.now())}).json({
      success:true,
      user: req.user,
      sameSite: process.env.NODE_ENV === "Development"?"lax" : "none",
      secure: process.env.NODE_ENV === "Development"?false : true, 
    });
  }

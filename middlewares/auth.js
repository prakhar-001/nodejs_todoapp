import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"


export const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token) return res.status(404).json({success:false, message: "Login First"});
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // this will pass complete details of user in a object and not only id of the user 
    req.user = await User.findById(decoded._id);
    next();
};
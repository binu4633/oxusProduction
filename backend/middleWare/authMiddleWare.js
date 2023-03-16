import {promisify} from 'util'

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  console.log('the header auth', req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
   
    try {
      const token = req.headers.authorization.split(" ")[1];

      // console.log("token", token);
      // console.log('the token length', token.length);

      const isCustomeAuth = token.length > 500;
      // console.log('custome auth', isCustomeAuth);
      let decodedData;
     // 171 is the normal token length
      if (token && isCustomeAuth) {
        // console.log('the if portion workinggg');

       
        decodedData =   jwt.decode(token); 
        // decodedData = jwt.verify(token, process.env.JWT_SECRET);

     
        const freshUser = await User.find({email:decodedData.email});
        req.user = freshUser;
     
        // req.user = await User.findById(decodedData.id).select("-password");
        // decodedData = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        next()
      } else {
    
        decodedData =   jwt.decode(token); 
      
        // decodedData = await promisify(jwt.decode)(token)
        // decodedData = await promisify(jwt.decode(token))
       

        const freshUser = await User.findById(decodedData.id);
        req.user = [freshUser];
        //  console.log('from auth middle', freshUser);
        if(freshUser){
          next()
        }
       
      }

      //   console.log(req.user);
      // next();
    } catch (error) {
      next()
      // res.status(401);
      throw new Error("Not Autherized token failed");
    }
  
  }

  // checking token
// varifyiing token
// check if the user still exist 
// check if user changed password after the token was issued

  //   if (!token) {
  //     res.status(401);
  //     throw new Error("not authorized");
  //   }

  // next();
};

export {protect};

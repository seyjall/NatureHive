import { asynchandlers } from "../utils/asynchandlers.js";
import { Apierror } from "../utils/Apierror.js";
import jwt from "jsonwebtoken"
import { User } from "../../models/user.model.js";
export const verifyJWT = asynchandlers(async(req ,_, next ) => {

  
   

  try {
     const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")
     
    
     
     if(!token){
       throw new Apierror(401 , "no token generated , error in auth middleware")
     }

     console.log("frontend token in auth middleware " , token); 

    try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
     console.log("decoded token in auth middleware " , decodedToken); 
     
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    

    
    if (!user) {
      throw new Apierror(401, "User not found in auth middleware ");
    }

    req.user = user;
    console.log("user attached in auth middleware " , req.user); 
    next();
  } catch (error) {
    console.error("JWT verify error:", error);
    throw new Apierror(401, "Unauthorized: Invalid token");
  }
  } catch (error) {

    throw new Apierror(401 , error?.message || "invalid acess token")
    
  }
  


})
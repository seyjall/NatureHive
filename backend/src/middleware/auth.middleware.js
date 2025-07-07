import { asynchandlers } from "../utils/asynchandlers.js";
import { Apierror } from "../utils/Apierror.js";
import jwt from "jsonwebtoken"
import { User } from "../../models/user.model.js";
export const verifyJWT = asynchandlers(async(req ,_, next ) => {

  
   

  try {
     const token =  req.cookies?.acessToken || req.header("Authorization")?.replace("Bearer" , "")
     
    
     
     if(!token){
       throw new Apierror(401 , "no token generated ")
     }

     console.log("token in auth middleware " , token); 

    try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
     console.log("decoded token in auth middleware " , token); 
     
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
      console.log("user in auth middleware" , user); 
    
    if (!user) {
      throw new Apierror(401, "Unauthorized: User not found");
    }

    req.user = user;
    console.log("userid in auth middleware " , req.user.id); 
    next();
  } catch (error) {
    console.error("JWT verify error:", error);
    throw new Apierror(401, "Unauthorized: Invalid token");
  }
  } catch (error) {

    throw new Apierror(401 , error?.message || "invalid acess token")
    
  }
  


})
import {asynchandlers}  from "../utils/asynchandlers.js";
import {Apierror} from "../utils/Apierror.js"
import {User} from "../../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import path from "path"
import { log } from "console";

const generateAccessAndRefreshTokens = async(userId) => {

    try{

        const user = await User.findById(userId) 
        const accessToken = user.generateAccessToken() 
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken 
        user.save({validateBeforeSave : false })

        return {accessToken , refreshToken} 

    }catch(err){
         throw new Apierror(500 , "error in method generateAccessAndRefreshTokens")
    }
}

const registerUser = asynchandlers( async (req , res ) => {
  
 const {name , email , password } = req.body 


if(
    [name , email ,  password].some((feild) => (
               feild?.trim() === "" ))
){
    throw new Apierror(400 , "feilds cant be empty all are req in registerUser")

}



const existedUser = await User.findOne({
    $or : [ {name :name.toLowerCase()} ,  {email :email.toLowerCase()} ]
})



if(existedUser){
    throw new Apierror(409 , "user with email or username exist in registerUser method")
}


const avatarLocalPath =  path.resolve(req.files?.avatar[0]?.path) ; 



if(!avatarLocalPath) {
    throw new Apierror(400 , "avatar file is required ")
}

 
    const avatar = await uploadOnCloudinary(avatarLocalPath) 


if(!avatar){
    throw new Apierror(400 , "avatar file is required ")
}
 
const user = await User.create({
    name : name.toLowerCase(), 
    avatar : avatar.url , 
    email , 
    password , 
    


})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser) {
    throw new Apierror(500 , "error in registerUser method ")
}

console.log("User created  in  RegisterUser method" , createdUser)

return res.status(201).json(
    new Apiresponse(200 , createdUser , "   User registered successfully ")
      
)

})

const loginUser = asynchandlers(async (req ,res) => {
   

    const {email , password} = req.body 
    

    if( !(email)){

        throw new Apierror(400 , " email is required ")
    }

    
    
    const user = await User.findOne({
        $or : [{email} ]
    })
   


    if(!user){
        throw new Apierror(404 , "error in loginUser method : user not found")
    }

    const ispasswordValid = await user.isPasswordCorrect(password)
     
     
    if(!ispasswordValid){
        throw new Apierror(401 , "error in loginUser method : password not valid  ")
    }

   const {accessToken , refreshToken} = await  generateAccessAndRefreshTokens(user._id)

   const loggedInUser = await User.findById(user._id).select(
     "-password -refreshToken"
   )

   const options = {
     httpOnly: true , 
     secure : true ,
     sameSite : "None"
   }

   console.log("data in loginUser" , loggedInUser);

   return res
   .status(200)
   .cookie("accessToken" , accessToken , options)
   .cookie("refreshToken" , refreshToken , options )
   .json(
     new Apiresponse(200 , {user : loggedInUser , accessToken , refreshToken } , 
        "user logged in successfully"
     )
   )
    

})

const logoutUser = asynchandlers(async(req , res ) =>{

   
    
   await User.findByIdAndUpdate( req.user._id , 
        {
            $set : {
                refreshToken :undefined 

            }
        }, {
            new : true 
        }
    )

    const options = {
        httpOnly: true , 
        secure : true , 
        sameSite : "None"
      }

      console.log("LogoutUser method done");
      
    

      return res
      .status(200)
      .clearCookie("acessToken" , options)
      .clearCookie("refreshToken" , options)
      .json(new Apiresponse(200 , {} , "User logged out " ))
   
})

const refreshAccessToken = asynchandlers(async(req ,res) =>{
   const incomingRefreshToken =  req.cookies.refreshToken || req.body.refreshToken

   if(!incomingRefreshToken){
    throw new Apierror(401 , "unauthorised request token not same")
   }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET)
  
   const user = await User.findById(decodedToken?._id)
  
   if(!user){
      throw new Apierror(401 , "invalid user ")
  }
  
  
  if(incomingRefreshToken !== user?.refreshToken){
      throw new  Apierror(401 , "refresh token didnt match")
  }
  
   const options = {
      httpOnly : true , 
      secure : true , 
      sameSite : "None"
   }
  
   const {accessToken , newrefreshToken} = await generateAccessAndRefreshTokens(user._id)
  
   return res
   .status(200)
   .cookie("accessToken" , accessToken , options)
   .cookie("refreshToken" , newrefreshToken , options)
   .json(
      new Apiresponse(
          200 , 
          {
              accessToken , 
             refreshToken : newrefreshToken 
  
          },
          "Access token refreshed"
      )
   )
  } catch (error) {
    
    throw new Apierror(401 , error?.message || 
        "Invalid refresh Token"
    )
  }





})

const changeCurrentPassword = asynchandlers(async (req , res) =>{
    const {oldPassword , newPassword} = req.body 

    const user = await User.findById(req.user?._id) 

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword , newPassword)

    if(!isPasswordCorrect){
        throw new Apierror(400 , "old password not correct ")
    }

    user.password = newPassword 
    await user.save({validateBeforeSave : false})
    
    console.log("changeCurrentPassword method done");
    

    return res
    .status(200)
    .json(
        new Apiresponse(200 , {} , "password changed successfully" )
    )

})

const getCurrentUser = asynchandlers(async(req , res ) =>{
    return res
    .status(200)
    .json( new Apiresponse(200 , req.user , "current user fetched successfully "))
})

const updateAccountDetails = asynchandlers(async(req , res) =>{
    const {name , email } = req.body 

    if(!name || !email){
        throw new Apierror(400 , "both email and name required")

    }

    const user = await User.findByIdAndUpdate(req.user?._id , 
        { $set : {
            name , 
            email 
        } } , 
        {new : true }

    ).select("-password")
    
    console.log("UpdateAccountDetails method user ", user);
    

   return res 
   .status(200)
   .json(
    new Apiresponse(200 , user , "Account details updated successfully")
   )


})

const updateUserAvatar = asynchandlers(async(req , res) =>{
    
    const avatarLocalPath = req.file?.path 

    if(!avatarLocalPath){
          throw new Apierror(400 , "Avatar file is missing")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
  
    if(!avatar){
        throw new Apierror(400 , "Avatar file not uploaded to cloudinary ")
  }

  const user = await User.findByIdAndUpdate(req.user?._id  ,
    {  $set : {
        avatar : avatar.url 
    }} , 
    {new : true }
  ).select("-password")

  console.log("UpdateUserAvatar user :" ,  user)
      
  
  return res.status(200)
  .json(
      new Apiresponse(200 , user , "AvatarImage updated ")
  )






})


export {registerUser , 
       loginUser , 
       logoutUser , 
       refreshAccessToken,
       changeCurrentPassword , 
       getCurrentUser , 
       updateAccountDetails ,    
       updateUserAvatar  

} 
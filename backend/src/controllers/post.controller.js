import {Apierror} from "../utils/Apierror.js"
import {Post} from "../../models/post.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js";
import path from "path"
import { asynchandlers } from "../utils/asynchandlers.js";

const createPost = asynchandlers(async(req,res) => {

    const{title , slug , content , featuredImage , status , userId} = req.body;
  


    if(!(title && slug  && content && status)){
        throw new Apierror(400 , "all feilds are required"); 
    }

    const existedPost = await Post.findOne({
        $or : [ {slug}]
    })

    if(existedPost){
        throw new Apierror(401 , "Post already exist"); 
    }
const file = req.files?.featuredImage?.[0];
if (!file) {
  throw new Apierror(400, "Featured Image not found");
}

    const imagelocalepath = path.resolve(file.path) ;

    if(!imagelocalepath){
        throw new Apierror(400 , "featured Image not found"); 
    }

    const cloudinary_url = await uploadOnCloudinary(imagelocalepath); 
    if(!cloudinary_url){
        throw new Apierror(400 , "failed to upload on cloudinary")
    }

    console.log("created_post" , cloudinary_url)
  
    const createdpost = await Post.create({
        title , 
        slug , 
        content ,
        featuredImage: cloudinary_url.secure_url, 
        status , 
        userId
}) 
   
    if(!createdpost){
        throw new Apierror(400 , "Error in creating post"); 
    }

    

    return res.status(201).json(
        new Apiresponse(200 , createdpost , "post created successfully")
    )

})


//updatepost 

//deletepost 



const getPost  = asynchandlers(async(req,res) => {
    
    const{slug} = req.params ; 
    const post = await Post.findOne({slug :slug}) ; 

    if(!post){
        throw new Apierror(401 , "No post found"); 
    }

    return res.status(201).json(
        new Apiresponse(200 , post , "post found successfully")
    )
})

const getPosts = asynchandlers(async(req ,res) => {
   
   console.log("getPosts method "); 
   
   const allposts = await Post.find({status :'active'}); 

   if(!allposts){
    throw new Apierror(400 , "No Posts found")
   }

   console.log("Allposts" , allposts); 

   return res.status(201).json(
     new Apiresponse(200 , allposts , "All posts found")
   )
})



export { createPost, getPost , getPosts  };


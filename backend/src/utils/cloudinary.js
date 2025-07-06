import {v2 as cloudinary} from  "cloudinary"
import fs from "fs" 

import dotenv from "dotenv"


dotenv.config({
    path : './.env'
})

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME , 
    api_key : process.env.CLOUDINARY_API_KEY , 
    api_secret : process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
 
    try{

        if(!localFilePath) {
            
            
            return null }

        //else upload on cloudinary 
     
        
        try{
            const response = await cloudinary.uploader.upload(localFilePath , {
                resource_type : "auto" 

            })
            // console.log("response received " , response);
            return response  
            
        }catch(err){
            console.log("uploading error in clodinary upload " , err);
            
        }
        


        //file has been uploaded successfully 
        console.log("file uploaded successfuly on cloudinary " , response.url);
         fs.unlinkSync(localFilePath)
     
        

    }catch(error){

        fs.unlinkSync(localFilePath)
        //removes locally saved temp file 
        return null 

    }
}

export {uploadOnCloudinary}


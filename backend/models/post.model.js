import  mongoose , {Schema} from  "mongoose"

const postSchema = new Schema ({ 

title : {
type : String , 
required : true ,  
        
}, 

slug : {
    type : String , 
        required : true ,  
        lowercase : true , 
        trim : true , 
        index : true ,
        unique : true 

}, 

content : {
    type : String , 
        required : true ,  
       

}, 

featuredImage : {
     type : String , //cloudanary url 
        required : true 

}, 

status : {
     type : String , 
        required : true 

} , 

userId : {
 type: Schema.Types.ObjectId, 
      ref: "User",                       
      required: true,
}







} , {timestamps : true })

export const Post = mongoose.model("Post" , postSchema)
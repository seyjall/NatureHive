

import axios from "axios";


export class Service{
constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL, 
      withCredentials: true,    
    });
  }



//formData : {title , slug , content , featuredImage , status , userId}
async createPost (formData){
  try {
      const response = await this.api.post("/posts/createPost",formData , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("createPost error:", error.response?.data || error.message);
      throw error;
    } 
}




async getPost (slug) {
   try {
      const response = await this.api.get(`/posts/${slug}`);
      return response.data;
    } catch (error) {
      console.error("getPost error:", error.response?.data || error.message);
      throw error;
    }
}

async getPosts(){
    console.log("Request URL:", `${this.api.defaults.baseURL}/posts`);
    
    console.log("calling getPosts");
    
   try {
      const response = await this.api.get("/posts");

      console.log("response from getPosts" , response.data); 
      return response.data;
    } catch (error) {
      console.error("getPosts error:", error.response?.data || error.message);
      throw error;
    }
}

 






}







const service = new Service() ; 
export default service 


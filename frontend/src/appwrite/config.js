

import axios from "axios";


export class Service{
constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL, 
      withCredentials: true,    
    });
  }



async createPost (formData){
  try {
      const response = await this.api.post("/posts/createPost", formData);
      
      console.log("response from createPost" , response.data); 

      return response.data;
    } catch (error) {
      console.error("createPost method error:", error.response?.data || error.message);
      throw error;
    } 
}




async getPost (slug) {
   try {
      const response = await this.api.get(`/posts/${slug}`);

      console.log("response from getPost" , response.data ); 

      return response.data;
    } catch (error) {
      console.error("getPost method error:", error.response?.data || error.message);
      throw error;
    }
}

async getPosts(){
   
    
   try {
      const response = await this.api.get("/posts");

      console.log("response from getPosts" , response.data); 
      return response.data;
    } catch (error) {
      console.error("getPosts method error:", error.response?.data || error.message);
      throw error;
    }
}

 






}







const service = new Service() ; 
export default service 


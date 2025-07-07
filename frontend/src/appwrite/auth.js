import conf from "../conf/conf.js";
import axios from "axios"



export class AuthService {
     constructor() {
    this.api = axios.create({
      baseURL: conf.backendUrl, 
      withCredentials: true,    
    });
  }

    async  createAccount ({email , password , name , avatar}){
      const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar[0]); 

    // console.log("data sending" , avatar[0])
         try {
      const response = await this.api.post("/users/register", formData , {
        headers: {
        "Content-Type": "multipart/form-data",
      },
      });

      console.log("response data" , response.data); 
      return response.data;
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      throw error;
    }
       
    }
   

    async login({ email, password }) {
        try {
      
      const response = await this.api.post("/users/login", {
        email,
        password,
      });


      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
    }
    

    async getCurrentUser () {
        try {
        const token = localStorage.getItem("acessToken");
        // console.log("sending token in get current user" , token ); 
    const response = await this.api.get("/users/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("data in get  CurrentUser" , response.data); 

    return response.data ; 
    } catch (error) {
      console.error("Get current user failed:", error.response?.data || error.message);
      throw error;
    }
   
    }

    async logout() {
        try {
      await this.api.post("/users/logout");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      throw error;
    }
    }

    async updateAccount(data){
      try{
        const user = await this.api.patch("/users/update-account" , data , {
           headers: { "Content-Type": "application/json" },
        })

        if(user){
          console.log("Account Updated successfully"); 
        }
       
      }catch(err){
        console.error("Failed to Update Account", err.response?.data || err.message);
      throw err;
      }
    }

    async updateAvatar(formData){
     try{
        const user = await this.api.post("/users/update-avatar" , formData, {
           headers: { "Content-Type": "multipart/form-data" },
        })

        if(user){
          console.log("Account Updated successfully"); 
        }
       
      }catch(err){
        console.error("Failed to Update Account", err.response?.data || err.message);
      throw err;
      }
    }

    async changePassword(data) {
       try{
         await this.api.post("/users/change-password" , data, {
           headers: { "Content-Type": "multipart/form-data" },
        })
        
        console.log("Password Updated Suceessfully")
       
      }catch(err){
        console.error("Failed to Update Account", err.response?.data || err.message);
      throw err;
      }
    }


}

const authService = new AuthService(); 



export default authService


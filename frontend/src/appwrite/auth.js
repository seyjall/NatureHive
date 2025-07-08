
import axios from "axios"



export class AuthService {
     constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL, 
      withCredentials: true,    
    });
  }

    async  createAccount ({email , password , name , avatar}){
      const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar[0]); 
    
    //debugging
    console.log("sending FormData in createAccount")
    formData.forEach((value, key) => {
  console.log(key, value);
});
         try {
      const response = await this.api.post("/users/register", formData );
       //debugging
      console.log("response in createAccount" , response.data); 
      return response.data;
    } catch (error) {
      console.error("Error in createAccount", error.response?.data || error.message);
      throw error;
    }
       
    }
   

    async login({ email, password }) {
        try {
      
      const response = await this.api.post("/users/login", {
        email,
        password,
      });
      
      //debugging
      console.log("response data in loginmethod" , response.data); 


      return response.data;
    } catch (error) {
      console.error("error in login method ", error.response?.data || error.message);
      throw error;
    }
    }
    

    async getCurrentUser () {
        try {
        const accessToken = localStorage.getItem("accessToken");
  
    const response = await this.api.get("/users/current-user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("responsedata in get  CurrentUser" , response.data); 

    return response.data ; 
    } catch (error) {
      console.error("Get current user failed:", error.response?.data || error.message);
      throw error;
    }
   
    }

    async logout() {
        try {
      await this.api.post("/users/logout");
      console.log("logout successfully"); 
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
          console.log("User Account Updated successfully"); 
        }
       
      }catch(err){
        console.error("Failed to Update Account", err.response?.data || err.message);
      throw err;
      }
    }

    async updateAvatar(formData){
     try{
        const user = await this.api.post("/users/update-avatar" , formData)

        if(user){
          console.log("User Avatar Updated successfully"); 
        }
       
      }catch(err){
        console.error("Failed to user Avatar ", err.response?.data || err.message);
      throw err;
      }
    }

    async changePassword(data) {
       try{
         await this.api.post("/users/change-password" , data, {
            headers: { "Content-Type": "application/json" },
        })
        
        console.log("Password Updated Suceessfully")
       
      }catch(err){
        console.error("Failed to Update Password", err.response?.data || err.message);
      throw err;
      }
    }


}

const authService = new AuthService(); 



export default authService



import axios from "axios"



export class Service {
     constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL, 
      withCredentials: true,    
    });
  }

  async createCheckoutSession(product) {
    try {
      
       const jwttoken = localStorage.getItem("accessToken");
      const response = await this.api.post("/payments/create-checkout-session", {product} , {
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${jwttoken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("createPayment error:", error.response?.data || error.message);
    }
  }

  async savePayment(sessionId){
    try{
      const response = await this.api.post("/payments/save-payment" ,
        {sessionId }, 
         {
        headers: { "Content-Type": "application/json" },
      }); 

      console.log("response data" , response.data); 

    }catch(err){
      console.log("Error in savePayment" , err); 
    }
  }

  async getPayments( ){
     try{

      console.log("payments method called "); 
      const response = await this.api.get("/payments/get-payments" ,
     
         {
        headers: { "Content-Type": "application/json" },
      }); 

      if(!response){
        console.log("no response")
      }
    console.log("data fetched" , response.data); 
      return response.data ; 

    }catch(err){
      console.log("Error in gettingPayments" , err); 
    }
       
  }

 


}




const Paymentservice = new Service();
export default Paymentservice;

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

       console.log("accessToken" , jwttoken); 
      const response = await this.api.post("/payments/create-checkout-session", {product} , {
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${jwttoken}`,
        },
      });
      console.log("response from createCheckout" , response.data); 

      return response.data;
    } catch (error) {
      console.error("createPayment method  error:", error.response?.data || error.message);
    }
  }

  async savePayment(sessionId){
    try{
      const response = await this.api.post("/payments/save-payment" ,
        {sessionId }, 
         {
        headers: { "Content-Type": "application/json" },
      }); 

      console.log("response data from save Payment " , response.data); 

    }catch(err){
      console.log("Error in savePayment" , err); 
    }
  }

  async getPayments( ){
     try{

    
      const response = await this.api.get("/payments/get-payments"); 

    console.log("response from get Payments " , response.data); 
      return response.data ; 

    }catch(err){
      console.log("Error in gettingPayments" , err); 
    }
       
  }

 


}




const Paymentservice = new Service();
export default Paymentservice;
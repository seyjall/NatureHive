import Stripe from "stripe";
import { User } from "../../models/user.model.js";
import { UserPayment } from "../../models/UserPayment.model.js";
import { asynchandlers } from "../utils/asynchandlers.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

const savePayment = asynchandlers(async(req,res) => {
    const {sessionId} = req.body ; 
   
    const session = await stripe.checkout.sessions.retrieve(sessionId); 
  
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent 
    ); 
 
   const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);


    const user = await User.findOne({
         stripe_customer_id : paymentIntent.customer
    })


    

if (!user) {
  return res.status(404).json(new Apiresponse(400 , "User not found"));
}

const savedPayment = await UserPayment.create({
  userId: user._id,
  paymentIntentId: paymentIntent.id,
  receiptUrl: charge.receipt_url,
  amount: paymentIntent.amount_received, 
  currency: paymentIntent.currency,      
  paidAt: new Date(),                    
});

  if(!savedPayment){
    return res.status(404).json(new Apiresponse(400 , "Failed to save payment"))
  }

//   console.log("saved payment" , savedPayment); 

  res.status(200).json(new Apiresponse(200 , savedPayment , "Payment saved successfully "));

})

const getPayments = asynchandlers(async(req , res) => {
    //get user
    const userId  = req.user.id;
    console.log("useId got " , userId);  
    const user =await  User.findById(userId); 

    if(!user){
       throw new Apierror(401 , "User not found"); 
    }

    const payments = await UserPayment.find({userId: userId}); 
    
    console.log("payement" , payments)
    return res.status(200).json(
        new Apiresponse(200 , payments , "Payments fetched successfully")
    )

})

export {savePayment , getPayments}
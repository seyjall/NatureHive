
import { asynchandlers } from "../utils/asynchandlers.js";
import Stripe from "stripe";
import {User} from "../../models/user.model.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


import { Apiresponse } from "../utils/Apiresponse.js";


const createCheckoutSession = asynchandlers(async(req , res) => {
   const { product} = req.body;
   const userId = req.user.id ;
 
   const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
 
if (!user.stripeCustomerId) {
  const customer = await stripe.customers.create({ email: user.email });
  user.stripe_customer_id = customer.id;
  await user.save();
}

const customerId = user.stripe_customer_id ;



  try {
   const session = await stripe.checkout.sessions.create({
     payment_method_types :["card"] , 
     mode : "payment" , 
     line_items : [
        {
            price_data : {
                currency : "usd" , 
                product_data : {
                    name : product.name , 

                }, 
                unit_amount : product.price*100, 
            }, 
            quantity :1, 
        }
     ], 
     customer: customerId,
    
     success_url: "http://localhost:5173/Success?session_id={CHECKOUT_SESSION_ID}", 
      cancel_url: "http://localhost:5173/Failure",

    
   });
   return  res.status(200).json({sessionId : session.id}); 

  } catch (err) {
   console.error(err);
    res.status(500).json({ error: "Something went wrong creating session" });
  }
})

export {createCheckoutSession}
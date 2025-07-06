import { loadStripe } from "@stripe/stripe-js";
import Paymentservice from "../../appwrite/payment_order.js";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); 

function Payment_method(){
    const handleClick = async () => {
        const stripe = await stripePromise

        try{
            const {sessionId} = await Paymentservice.createCheckoutSession({
               name : "My package" , 
               price : 30 , 
            });

            const {error} = await stripe.redirectToCheckout({
                sessionId : sessionId , 
            })

            if(error){
                console.log("stripe redirect error" , error)
            }
            
        }catch(err){
            console.log("Error in handlePayment" , err)
        }
    };
  

    return (
        <>
        <div className="text-white">
            <button onClick={handleClick} className="btn-large pink">
              Book your trip now 
            </button>
         
        </div>
        
        </>
    )

}

export default Payment_method ; 
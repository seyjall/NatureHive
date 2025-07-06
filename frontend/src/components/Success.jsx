import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Paymentservice from "../appwrite/payment_order";

function Success() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); 
    const sessionId = params.get("session_id"); 
    
    console.log("sessionid got " , sessionId); 

    if(sessionId){
      Paymentservice.savePayment(sessionId); 
    }

    //payment is saved 
  } , []); 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-green-600 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">✅ Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your purchase.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Go Back Home and login to view Payments in Payment History.
      </Link>
    </div>
  );
}

export default Success;
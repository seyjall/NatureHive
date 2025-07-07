import {User} from "../models/user.model.js" 
import mongoose , {Schema}from "mongoose"


const UserPaymentSchema =  new Schema({
  userId : {
    type : Schema.Types.ObjectId , 
    ref  :User , 
    required :true 
  },

  sessionId : {
     type : String 
  },

  paymentIntentId : {
    type : String 
  }, 

  receiptUrl : {
    type : String 
  }, 

  amount : {
    type : Number
  }, 
  currency : {
    type : String , 
    default  :"usd" , 
  }, 
  createdAt : {
    type : Date , 
    default : Date.now
  }
})
export const UserPayment = mongoose.model("UserPayment" , UserPaymentSchema)
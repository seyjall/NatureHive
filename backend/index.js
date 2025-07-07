

import dotenv from "dotenv"
import {app} from './app.js'; 



dotenv.config({
    path : './.env'
})

import mongoose from "mongoose" 
import { DB_NAME } from "./src/constants.js";
import connectDB from "./src/db/index.js";


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log(`server is running at port ${
            process.env.PORT
        }`);
        
    })

    

    
})
.catch((err) => {
    console.log("MONGO DB CONNECTION FAILED " , err);
    
})


















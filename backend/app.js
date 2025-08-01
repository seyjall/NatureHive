import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express(); 

app.use(cors({
    origin : process.env.CORS_ORIGIN ,
    credentials :true 
}))


app.use(express.json({limit : "16kb"}))

app.use(express.urlencoded ({extended : true , limit : "16kb"}))

app.use(express.static("public"))

app.use(cookieParser())


app.get("/" , (req , res) => {
    res.send({
        activeStatus :true, 
        error:false
    })
})




//routes 

import userRouter from "./src/routes/user.routes.js"

app.use("/api/v1/users" , userRouter)

import postRouter from "./src/routes/post.routes.js"

app.use("/api/v1/posts" , postRouter)

import paymentrouter from "./src/routes/payment.routes.js"

app.use("/api/v1/payments" , paymentrouter)



export {app}

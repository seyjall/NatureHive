import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express(); 

app.use(cors({
    origin : process.env.CORS_ORIGIN ,
    credentials :true 
}))
app.options('*', cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

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

//routes declaration 
app.use("/api/v1/users" , userRouter)

import postRouter from "./src/routes/post.routes.js"
app.use("/api/v1/posts" , postRouter)

import paymentrouter from "./src/routes/payment.routes.js"

app.use("/api/v1/payments" , paymentrouter)

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(err.status || 500).json({
    success: false,
    message: err.message
  });
});

export {app}

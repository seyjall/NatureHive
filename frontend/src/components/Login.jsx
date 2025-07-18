import React , {useState} from "react"
import {Link , useNavigate} from 'react-router-dom'
import {login as authLogin} from  '../store/authSlice' 
import {  Logo} from "./index" 
import { Input , Button} from "./index"

import { useDispatch } from "react-redux"
import authService from "../appwrite/auth" 
import {useForm} from 'react-hook-form'
import axios from 'axios' ; 
import { useSelector} from "react-redux"
import { useEffect } from "react"


const Login = () => {
   
    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const {register , handleSubmit ,  formState: { errors }} = useForm() 
    const [error ,setError ]= useState("") 
    const [loading , setloading] = useState(false); 
     const authStatus = useSelector((state) => state.auth.status);
  
    const login = async (data) => {
        setError("") 

        try{
            setloading(true);
            
         const session =    await authService.login(data);
         console.log( "session created " , session) ; 
         console.log("accessToken" , session.data.accessToken); 
localStorage.setItem("accessToken", session.data.accessToken);
localStorage.setItem("refreshToken", session.data.refreshToken);       
         if(session) {
            const userData = await authService.getCurrentUser()
              
            if(userData)  {
                dispatch(authLogin ({userData}))
              console.log("dispatching done")
            }
         }
        }catch(error)
        {
               setloading(false); 
            setError(error.message )

        }finally{
            setloading(false)
        }
    }

 useEffect(() => {
    console.log("AuthStatus set " , authStatus);
    if (authStatus === true) {
     console.log("navigating here to join in ")
      navigate("/Join-in");
    }
  }, [authStatus, navigate]);

    return(
        <div className="flex items-center justify-center w-full">
            
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign in to your account </h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}
        className="mt-8">
            <div className="space-y-5">
                  <Input 
                  label = "Email: "
                  placeholder = "Enter your email"
                  type = "email"
                  {...register("email" , {
                    required : true , 
                    validate : {
                        matchPatern : (value) => 
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || 
                        "email address must be a valid address" , 
                    }
                  })}></Input>

                  <Input 
                  label = "Password" 
                   placeholder = "enter your Password" 
                   type = "password" 
                    {...register("password"  , {
                        required : true , 
                    
                    })}>
                  </Input>

                  <Button
                  type = "submit" 
                  className = "w-full ">
                  
                 {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}

                  
                   </Button>

            </div>


        </form>
            </div>
        </div>
    )
}

export default Login 

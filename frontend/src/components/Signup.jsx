import React, { useState }  from "react";
import authService from "../appwrite/auth";
import { Link , useNavigate } from "react-router-dom";
import {login} from "../store/authSlice" 
import {Button , Input , Logo} from "./index" 
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup () {
    const navigate = useNavigate()
    const [error , setError] = useState("") 
    const  dispatch = useDispatch() 
    const {register , handleSubmit} = useForm() 
    const [loading, setLoading] = useState(false);
    const create = async(data) => {
        setError("") 
        setLoading(true)

        try{
          
          // console.log("inside method ")
         const userData =  await authService.createAccount(data)
         console.log("userData" , userData)
         if(userData) {
            const res = await authService.login({ email, password });

if (res && res.accessToken && res.refreshToken) {

  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);

 
  dispatch(login(res.data)); 

  // ✅ Redirect user
  navigate("/");

  console.log("Login success ✅");
} else {
  console.error("Login failed:", res.message);
}
         }

        }catch(error) {
            setLoading(false);
            setError(error.message) 
        }finally {
            setLoading(false);
          }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-300 shadow-lg">
        <div className="text-center mb-6">
          <span className="inline-block w-24 mb-4">
            <Logo width="100%" />
          </span>
          <h2 className="text-3xl font-semibold text-gray-800">Sign up to create account</h2>
          <p className="mt-2 text-base text-gray-600">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {error && (
          <p className="text-red-600 mt-4 text-center text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Name"
              placeholder="Enter your Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your Password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Input
              label="Confirm Password"
              placeholder="Re-enter password"
              type="password"
              {...register("confirmPassword", {
                required: true,
              })}
            />
           
            <Input
          label="Avatar"
          type="file"
         accept="image/*"
         id="Avatar"
        {...register("avatar", {
       required: true,
       })}
       />

            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary-dark transition duration-300"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
      
    );
}

export default Signup 



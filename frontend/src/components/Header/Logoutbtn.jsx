
import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function Logoutbtn () {
 const dispatch = useDispatch() ; 

 const logoutHandler = () => {
    authService.logout().then(() => {
        dispatch(logout())
    })
 }

 return(
    <>
    <button className="text-white  hover:text-gray-500 transition duration-200"
    onClick={logoutHandler}>Logout</button>
   
    </>
 )
}


export default Logoutbtn 

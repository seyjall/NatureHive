import {Container , Logo ,Logoutbtn}  from "../index";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import React from 'react'; 
import { useNavigate } from "react-router-dom";



function Header () {
    const authStatus = useSelector((state) => state.auth.status)
  

    const navigate = useNavigate() 


    const navItems = [
        {
            name : 'Home' , 
            slug : "/" , 
            active : true 
        },
        {
            name : "Login" , 
            slug : '/login' , 
            active : !authStatus 
        },
        {
            name : "Signup" , 
            slug :"/signup" , 
            active : !authStatus 
        },
        {
            name : "All Posts" , 
            slug : "/all-posts" , 
            active :authStatus , 
        },
        {
            name : "Add Post" , 
            slug : "/add-post" , 
            active : authStatus
        },{
            name : "Profile" , 
            slug : "Profile" , 
            active : authStatus
        }
      
    ]
   
   
    return(

    <header className="bg-grey-800 text-white w-full">
    <Container>
        <nav className="flex bg-white items-center justify-between px-2 ">
            <div className="flex items-center">
                <Link to="/">
                  <h1 className="justify-center text-3xl py-4">NatureHive</h1>
                </Link>
            </div>
            <ul className="flex space-x-4">
                {navItems.map((item) =>
                    item.active ? (
                        <li key={item.name}>
                            <button
                                onClick={() => navigate(item.slug)}
                                className="text-white hover:text-gray-500 transition duration-200"
                            >
                                {item.name}
                            </button>
                        </li>
                    ) : null
                )}

                {authStatus && (
                    <li>
                        <Logoutbtn className=" text-white font-bold py-2 px-4 rounded transition duration-200" />
                    </li>
                )}
            </ul>
        </nav>
    </Container>
</header>
    )
}

export default Header ; 


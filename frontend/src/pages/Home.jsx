import React , {useEffect ,  useState} from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config.js"
import { Container , PostCard } from "../components";
import { useSelector } from "react-redux";
import Tripdetails from "../components/Trips/Tripdetails";
import Trips from "../components/Trips/Trips";
import {Logo} from "../components";
import TypingEffect from "../components/Trips/typingeffect";
import Images from "../components/Trips/imagesize";
import ImageSlider from "../components/Trips/Imageslider";
function Home () {
    const[posts , setPosts ] = useState([]) ;
    const { status: authStatus, userData } = useSelector((state) => state.auth); 
  useEffect (()=>{
    if(authStatus){
      service.getPosts().then((posts) =>{

        if(posts){
         setPosts(posts.data)
        } 
     })
      
    }

  } , [])

  if(posts.length === 0){
    return (
      <div className="bg-white min-h-screen  items-center justify-center w-full">
       
      <Container>
      <div className="relative w-full h-screen overflow-hidden">
 
  <video 
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="background.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="relative z-10 flex flex-col h-full text-white text-center">
  
  <button className = "border-2 border-gray-400 bg-transparent w-1/2 justify-center mx-auto mt-3 rounded-xl text-4xl hover:border-gray-400">Search for<TypingEffect title={'Trip to Goa with Friends'} className= {'text-white'}></TypingEffect></button>
  <div className="pt-10 left-10">
    <h1 className="font-Homenaje text-9xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#04746b] to-[#ff00c6]">
    Leave the Stress Behind
    </h1>
    <h1 className="font-Homenaje text-9xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#04746b] to-[#ff00c6]">
    Embrace the moment 
    </h1>
  </div>
  <div className=" py-4 justify-center ">
        <p className = "text-3xl pt-3 ">your next journey into nature starts here </p>
        <Link to = "/login">
        <button className = "bg-transparent hover : border-none">Let's Go</button>
        </Link>

     
        
       
        </div>

 

 
   
  </div>
  
  
  
   </div>


      
      </Container>
     
    </div>
    )
  }
  return(
    <div className="bg-white min-h-screen py-16">
    <Container>
    <h1 className="text-6xl text-blue-950 pb-4 text-center font-bold">
  Ready to Explore? <br /> Click on the first image below!
</h1>
    <Trips></Trips>
   
    
    </Container>
  </div>

  );
}

export default Home; 


import React from "react";
import Images from "./imagesize";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Typingeffect from "./typingeffect.jsx";
import ImageSlider from "./Imageslider.jsx";
import Payment_method from "../payment/payment_method.jsx";
function Tripdetails (){
    const { title, image } = useParams(); 
    const tripImages = {
      Uttarakhand: [
        "/u1.jpg",
        "/u2.jpg",
        "/u3.jpg",
      ],
      Kashmir: [
        "/images/kashmir1.png",
        "/images/kashmir2.png",
        "/images/kashmir3.png",
      ],
    };
  
  
    const images = tripImages[title] || [];
    const notify = () => toast(`Pack your bags !An amazing adventure to ${title} awaits you!`);
    return(
        <div className="bg-white">
            <div className="relative w-full">
  
      <div className="relative    justify-center items-center  px-3">
     
     <div>
     
     <div className="pt-4 ">
     <h1 className="text-7xl font-mogra">{title}</h1>
     {images.length > 0 ? <ImageSlider images={images} /> : <p>No images found.</p>}
     </div>


     </div>
   
   <div className="flex  bg-gradient-to-r from-[#044A74D3] to-[#0079FFD7] rounded-md mt-10">
   <div  className="px-8 py-4">
       <div><h1>R</h1></div>
       <div><h1>E</h1></div>
       <div><h1>V</h1></div>
       <div><h1>I</h1></div>
       <div><h1>E</h1></div>
       <div><h1>W</h1></div>
     </div>
     <div className="my-10">
      <p className="text-3xl py-4 text-green-50">Loved by 99% of Travellers</p>
      <Typingeffect title = {"Our trip was absolutely breathtaking! From the mesmerizing landscapes to the warm hospitality, every moment felt like a dream. Exploring hidden gems, indulging in local cuisine, and creating unforgettable memories made this journey truly special. Can't wait for the next adventure"}></Typingeffect>
      <p className="justify-right"> - Merry Watson </p>
     </div>

   </div>
    

    
     
       
    
        
      </div>
   


  
      <div>

         
        <div className="mt-6 space-y-4 py-2 px-2 mb-2 shadow-md justify-center">
            <h1 className="text-6xl text-red-950">Trip is scheduled on 22 JAN 2025 </h1>
            <h2 className="text-4xl font-bold mx-0">Schedule</h2>
            {/* <div className="col-span-3 grid grid-cols-3 gap-4"> */}

    
  <div className="col-span-3 grid grid-cols-3 gap-4 ">
  <div className="p-4  text-left bg-slate-300 rounded-tl-full opacity-100 transition-all duration-800">
  <h2 className="text-2xl font-semibold">Arrival & Exploration</h2>
  <p className="text-lg py-3">
    Experience an unforgettable journey with guided mountain treks through scenic landscapes, cozy bonfire nights under a starlit sky, thrilling river rafting adventures, and immersive cultural experiences with local traditions and cuisine.
  </p>
</div>

<div className="p-4 border border-gray-300 text-left bg-slate-300 rounded-tl-full opacity-100 transition-all duration-800">
  <h2 className="text-2xl font-semibold">A Day Full of Adventure</h2>
  <p className="text-lg py-3">
 an energizing trek to a breathtaking viewpoint, soaking in the panoramic sunrise. Next, challenge yourself with an adrenaline-pumping river rafting session, navigating through exciting rapids. After a well-deserved lunch, dive into an exhilarating rock climbing and rappelling adventure, pushing your limits.
  </p>
</div>

<div className="p-4 border border-gray-300 text-left  bg-slate-300 rounded-tl-full opacity-100 transition-all duration-800">
  <h2 className="text-2xl font-semibold">Capture Your Moments</h2>
  <p className="text-lg py-3">
    Every journey is a story waiting to be told—immerse yourself , experience heart-racing adventures, and create  memories. From the thrill of conquering rugged trails to the serenity of watching a golden sunset, every moment is a snapshot of joy. Laugh with friends by a crackling bonfire, capture the beauty of untouched nature.
  </p>
</div>

  </div>
  
           
        </div>

      
        <div className="mt-6 text-center">
         <p className="text-black">Here is booking </p>
         <Payment_method/>

          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
            
     

         </div>
    );

}

export default Tripdetails ; 
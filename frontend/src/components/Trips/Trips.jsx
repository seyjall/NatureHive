import React from "react";
import Images from "./imagesize.jsx"
import { Link } from "react-router-dom";
import Tripdetails from "./Tripdetails.jsx";
import Activities from "./Activities.jsx";
import Community from "./Community.jsx";

function Trips (){
 
    return(
        <div className="pt-0 mt-0" >

        <div className=" flex justify-center ">
            <Link to="/Tripdetails/Uttarakhand/uttarakhand.png"
           > 
           
            <Images src = "1.png" className={"flex-1"}></Images></Link>
        <Link to = "/Tripdetails/Himachal/himachal.png"><Images src = "2.png"  className={"flex-1"}></Images></Link> 
       <Link to = "/Tripdetails/Panchagani/panchagani.png" ><Images src = "3.png"  className={"flex-1"}></Images></Link>
       <Link to = "/Tripdetails/Kashmir/kashmir.png"><Images src = "4.png"  className={"flex-1"}></Images></Link>

        </div>
        <div className=" flex justify-center">
            <Link to="/Tripdetails/Columbia/columbia.png"> <Images src = "2.1.png" className={"flex-1"}></Images></Link>
            <Link to="/Tripdetails/Ladakh/ladakh.png"> <Images src = "2.2.png"  className={"flex-1"}></Images></Link>
            <Link  to="/Tripdetails/Chopta/chopta.png">  <Images src = "2.3.png"  className={"flex-1"}></Images></Link>
            <Link  to="/Tripdetails/Himalaya/himalaya.png"> <Images src = "2.4.png"  className={"flex-1"}></Images></Link>
        
      
      
      


        </div>
        <Activities></Activities>
        <Community></Community>
       
        </div>

       
    )

}

export default Trips; 
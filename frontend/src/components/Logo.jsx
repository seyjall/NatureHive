import React from "react";

function Logo({width = '100px' , className}) {
    return(
        <>
        
       <div  className={`rounded-full overflow-hidden  sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20`}
      style={{ width, height: width }} 
       ><img src="logo.png" alt="logo" className="w-full h-full object-cover"/></div>
        </>
    )
}

export default Logo 

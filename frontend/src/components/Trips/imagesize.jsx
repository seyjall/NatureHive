import React from "react";
function Images ({className , src }){

    return(
        <div className= {`${className} w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 2xl:w-80 aspect-square `}>
         <img src = {src} alt = "image"></img>
        </div>
    )

}

export default Images ; 
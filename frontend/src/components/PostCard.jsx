import React from 'react';
import appwriteService from "../appwrite/config"
 
import { Link } from 'react-router-dom';

const PostCard = ({_id , title , featuredImage ,slug }) => {
   
    
    
//    console.log("inside the postcard" , $id , title , featuredImage); 
    return (
        <div className="post-card">

            <Link to = {`/post/${slug}`}>
  <div className="w-full bg-gray-50 rounded-xl p-4">
    <div className="w-full justify-center mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <img
        src={featuredImage} 
        alt={title}
        className="w-30 h-30 object-cover rounded-xl"
      />
    </div>
  </div>
</Link>
           
        </div>
    );
};

export default PostCard;

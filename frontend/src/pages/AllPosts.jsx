import React , {useState , useEffect} from "react"
import service from"../appwrite/config"
import Container from "../components/container/Container.jsx"
import PostCard  from "../components/PostCard.jsx"

function AllPosts() {

    const[posts ,setPosts] = useState([])
    useEffect(() => {
        service.getPosts().then((posts) =>{
           
            if(posts && posts.data) {      
                setPosts(posts.data)
            }else{
                 console.log("loaded all posts");
            }
        })

    } , [])

    
    
    
    return(
        <div className="w-full py-8">
      <Container>

        <div>
  <div>
            <h1 className="text-6xl text-blue-950 pb-3 font-bold">Discover Travel Tales: Read All Posts by Fellow Adventurers!</h1>
           
        </div>
        <div className="flex  flex-wrap">
          
            { 
            
            
            Array.isArray(posts) && posts.map((post) => (
                
                <div key = {post._id} className="p-2 w-1/4 text-black"> 
                  
                
                   {post.featuredImage ? (
            <PostCard {...post} />
        ) : (
            <p>Loading...</p>
        )}
                    </div>

            ))}

        </div>
        </div>
       
      </Container>

        </div>

    )
}

export default AllPosts
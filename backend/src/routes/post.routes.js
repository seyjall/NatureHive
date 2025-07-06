import {Router} from "express" 
import { createPost, getPost, getPosts } from "../controllers/post.controller.js"
import {upload} from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js"


const router = Router() 

//secoured routes using authorization middleware 

router.route("/createPost").post(verifyJWT ,
       upload.fields([
        { name : "featuredImage" , 
          maxCount : 1 
        } , 

    ]) ,
    createPost)


router.route("/:slug").get(verifyJWT , getPost)
router.route("/").get(verifyJWT , getPosts)




export default router 

 
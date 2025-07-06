import {Router} from "express" 
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAcessToken, registerUser, updateAccountDetails, updateUserAvatar} from "../controllers/user.controller.js"
import {upload} from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js"


const router = Router() 

router.route("/register").post(
    upload.fields([
        { name : "avatar" , 
          maxCount : 1 
        } , 

    ]) , 
    registerUser , 

)

router.route("/login").post(
    loginUser
)

//login expects raw-data 

router.route("/logout").post(verifyJWT ,logoutUser)
router.route("/refresh-token").post(refreshAcessToken)
router.route("/change-password").post(verifyJWT , changeCurrentPassword)
router.route("/current-user").get(verifyJWT , getCurrentUser)
router.route("/update-account").patch(verifyJWT , updateAccountDetails )
router.route("/update-avatar").patch(verifyJWT , upload.single("avatar") , updateUserAvatar)


export default router 

 
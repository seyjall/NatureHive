import {Router} from "express" 
import {createCheckoutSession}from "../controllers/payment.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import {getPayments, savePayment} from "../controllers/UserPayment.controller.js"
const router = Router() 
router.route("/create-checkout-session").post(verifyJWT, createCheckoutSession);
router.route("/save-payment").post(verifyJWT , savePayment); 
router.route("/get-payments").get(verifyJWT , getPayments);

export default router
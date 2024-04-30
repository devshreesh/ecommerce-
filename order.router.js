import { Router } from "express";
import { orderinfo } from "../controllers/order.controller.js";
import { productdata } from "../controllers/cart.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";


const router = Router()


router.route("/order").post( orderinfo);
router.route("/cart").post( productdata );





export default router 
import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutuser,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import {productdata } from "../controllers/cart.controller.js"

const router = Router();

router.route("/cart").post(productdata);

export default router;

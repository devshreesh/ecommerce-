import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutuser,
} from "../controllers/user.controller.js";
import { orderinfo } from "../controllers/order.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "fullname",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser)
//secured routes for user verify
router.route("/logout").post(verifyjwt, logoutuser);

export default router ;

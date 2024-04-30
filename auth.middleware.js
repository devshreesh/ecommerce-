import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const verifyjwt = asyncHandler(async(req, res, next) => {
  try {
    const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    console.log(token)

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user =  User.findById(decodedToken?._id).select("-password -refreshtoken");

    if (!user) {
      throw new ApiError(403, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(400, error?.message || "Invalid access token"));
  }
});

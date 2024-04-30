import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { User } from "../models/user.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { response } from "express";

const generateAccessTokenaandrefreshtokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accesstoken = user.generateAccessToken()
    const refreshtoken = user.generateRefreshToken()

    user.refreshtoken = refreshtoken;
    user.accesstoken = accesstoken; 
    await user.save({ validateBeforeSave: false });

    return { accesstoken, refreshtoken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, phonenumber } = req.body;
  console.log("email:", email);
  console.log("fullname:", fullname);
  console.log("phonenumber", phonenumber);
  console.log("password:", password);

  if (fullname === "") {
    throw new ApiError(404, "fullname is required");
  }
  if (email === "") {
    throw new ApiError(400, "email is required");
  }
  if (phonenumber === "") {
    throw new ApiError(400, "phonenumber is required");
  }
  if (password === "") {
    throw new ApiError(400, "password is required");
  }

  const existinguser = await User.findOne({
    $or: [{ email }, { fullname }],
  });

  if (existinguser) {
    throw new ApiError(409, "user with this userid or email alread exist");
  }

  const user = await User.create({
    fullname,
    email,
    phonenumber,
    password,
  });

  const createduser = await User.findById(user._id).select(
    "-password  -refreshtoken "
  );

  if (!createduser) {
    throw new ApiError(550, "user not created");
  }

  return res
  .status(201).json({
    message: "user register success",
    data: new ApiResponse(200, createduser, "useraddress registered successfully")
  });
  
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  console.log(email)

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log(password)
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accesstoken, refreshtoken } = await generateAccessTokenaandrefreshtokens(user._id);

  const loggedInUser = await User.findById(user._id).select(" -password -refreshtoken ");

  const option = {
    httpOnly: true,
    secure: true,
  };
  if (!loggedInUser) {
    return res.redirect('/website2.0/index.html');
  } else {
    return res
      .status(200)
      .cookie("accesstoken", accesstoken, option)
      .cookie("refreshtoken", refreshtoken, option)
      .redirect("/address.html");
  }
});

    const logoutuser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshtoken: undefined
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accesstoken", options)
      .clearCookie("refreshtoken", options)
      .json(new ApiResponse(200, {}, "User logged out"));
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
});





const orderinfo = User.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "id",
      foreignField: "id",
      as: "orderinformation",
    },
  },
  {
    $addFields: {
      orderinformation: { $arrayElemAt: ["$orderinformation", 0] },
    },
  },
]);

export { registerUser, logoutuser, loginUser,  };

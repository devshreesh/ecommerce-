import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { Order } from "../models/order.modal.js";
import { ApiResponse } from "../utils/apiresponse.js";



  
const orderinfo = asyncHandler(async (req, res) => {
  const {  address,  state, city, postalcode,phonenumber } = req.body;
  console.log("address:", address)
  console.log("state", state)
  console.log("postalcode:", postalcode)
  console.log("city:", city)
  console.log("phonenumber",phonenumber)


  if (address === "") {
    throw new ApiError(404, "address is required")
  }
  if (state === "") {
    throw new ApiError(400, "state is required")
  }
  if (postalcode === "") {
    throw new ApiError(400, "postalcode is required")
  }
  if (city === "") {
    throw new ApiError(400, "city is required")
  }

  if (phonenumber === "") {
    throw new ApiError(400, "phonenumber is required")
  }


  const existinguser = await Order.findOne({
    $or: [ { address }],
  })

  if (existinguser) {
    throw new ApiError(409, "user with this userid or email alread exist");
  }

  const user = await Order.create({
    address,
    state,
    postalcode,
    city,
    phonenumber
  })

  const createduser = await Order.findById(user._id).select("-customer -orderprice")

  if (!createduser) {
    throw new ApiError(550, "user not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createduser, "user registered successfully"));
})


export { orderinfo }    

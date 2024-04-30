import mongoose, { Schema } from "mongoose";
import { User } from "../models/user.js";
import {  Product }  from "../models/cart.modal.js";
import { ObjectId } from "mongodb";

import {
  registerUser,
  loginUser,
  logoutuser,
} from "../controllers/user.controller.js";
 
const orderItemsschema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }, // reference to the productmodal.js
  quantity: { type: Number, required: true },
});

const orderschema = new mongoose.Schema(
  {
    orderprice: { type: Number },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // reference to the user.js
    orderItems: {
      type: [orderItemsschema],
    },
    phonenumber: { type: Number, required: true },
    address: { type: String, required: true  },
    state: { type: String, required: true },
    postalcode: { type: Number, length: 6 },
    city: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User    },
    status: {
      type: String,
      enum: ["Pending", "Delivered", "cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderschema);

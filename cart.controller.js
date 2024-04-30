import mongoose from "mongoose";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { Product } from "../models/cart.modal.js";
import { json } from "express";
import localstorage from "node-localstorage";


const productdata = asyncHandler(async (req, res) => {
    // Get values from localStorage
    const name = getlocalStorage('name');
    const price = getlocalStorage('price');
    const quantity = getlocalStorage('quantity');
    const category = getlocalStorage('tag');
  
    if (!name || !price || !quantity || !category) {
      throw new ApiError(401, "All fields are required");
    }
  
    const existingProduct = await Product.findOne({ name });
  
    if (existingProduct) {
      throw new ApiError(409, "Product with this name already exists");
    }
  
    const product = await Product.create({
      name,
      price,
      quantity,
      category,
    });
  
    const createdProduct = await Product.findById(product._id).select("-password -refreshtoken");
  
    if (!createdProduct) {
      throw new ApiError(550, "Product was not created");
    }
  
    return res.status(201).json({
      message: "Product added successfully",
      data: {
        status: 200,
        data: createdProduct,
        message: "Product added success",
      },
    });
  });
  
  function getlocalStorage(product) {
    const value = localStorage.getItem("cart items") ;
    return value ? JSON.parsestring(value) : null;
  }
export { productdata };

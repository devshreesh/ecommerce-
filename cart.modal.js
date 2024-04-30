import mongoose from "mongoose";


const productschema = new mongoose.Schema({

    name:{type: String ,required : true },
    price:{type:Number, required:true, default:0},
    quantity:{type: Number},


    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: true});



export const Product = mongoose.model("Product", productschema);

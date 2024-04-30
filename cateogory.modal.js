import mongoose from "mongoose";


const  categoryschema = new mongoose.schema({
    name: { type : String , required: true },
    color:{type:String , required: true},
}, { timestamps: true});


export const Category = mongoose.model(" Category ", categoryschema);
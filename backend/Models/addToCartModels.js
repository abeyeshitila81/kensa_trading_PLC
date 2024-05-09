import mongoose, { Types } from "mongoose";

const addToCartSchema=new mongoose.Schema({
    productId:{
        type:String,
        ref:"product"
    },
    userId:String,
    quantity:Number
})

export default mongoose.model("addToCart", addToCartSchema)
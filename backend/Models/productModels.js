import mongoose from "mongoose"

const productModels=new mongoose.Schema({
    productName:{type:String},
    brandName:String,
    category:{type:String},
    productImage:[{type:String}],
    description:String,
    price:Number,
    sellingPrice:Number

}, {timestamps:true})

export default mongoose.model("product", productModels);
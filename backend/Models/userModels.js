import mongoose from "mongoose";

const userModels=new mongoose.Schema({
 image :{type:String},
 name:{type:String, required:true},
 email:{type:String, required:true, unique:true},
 password:{type:String, required:true},
 role:{type:String, required:true}
}, {timestamps:true})

export default mongoose.model("user", userModels)
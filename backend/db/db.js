
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const mongodb_URL=process.env.MONGODB_URL ||"mongodb://localhost:27017/commerce"
const connect=async()=>{
    mongoose.connect(mongodb_URL)
    .then(()=>{
        console.log("connected DB successfully")
    })
    .catch((err=>{
        console.error(`error happen when Connect DB is ${err}`)
    }))
}
export default connect
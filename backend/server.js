import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs"
import { authToken } from "./middleware/authToken.js";
import connect from "./db/db.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import addToCartRoutes from "./routes/addToCartRoutes.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
connect()
const port=process.env.PORT || 4000
app.use(
    "/upload",
    express.static(path.join(__dirname, "upload"))
  );
app.use("/api/v1/user",  userRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/cart", addToCartRoutes)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/", (req, res)=>{
  res.status(200).json({msg:"hello E-commerce"})
})
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(port, ()=>{
    console.log(`server is running on  ${port}`)
})





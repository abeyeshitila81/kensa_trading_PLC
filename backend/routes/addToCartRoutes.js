import express from "express"
import { authToken } from "../middleware/authToken.js"
import { addToCart, countProduct ,getProductFromCart,updateFromCart, deleteFromCart} from "../controller/addToCartController.js"

const router=express.Router()

router.post("/add-to-cart",authToken, addToCart)
router.get("/count-product",authToken, countProduct)
router.get("/product-from-cart", authToken, getProductFromCart)
router.patch("/update-from-cart", authToken, updateFromCart)
router.delete("/delete-from-cart", authToken, deleteFromCart)




export default router;
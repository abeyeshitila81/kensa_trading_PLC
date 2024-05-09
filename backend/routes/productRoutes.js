import express from "express";
import { createProduct , getProduct, updateProduct, categoryProduct,
     categoryProductOne, productDetail, searchProduct, filterProduct, deleteProduct} from "../controller/productController.js";
import {authToken} from "../middleware/authToken.js"
const router=express.Router()
router.get("/",authToken, getProduct)
router.get("/category", categoryProduct)
router.get("/category-one/:category", categoryProductOne)
router.get("/product-detail/:id", productDetail)
router.get("/search", searchProduct)
router.post("/filter-product", filterProduct)

router.use(authToken)
router.post("/create",  createProduct)
router.put("/update", updateProduct)
router.delete("/:id", deleteProduct)

export default router;
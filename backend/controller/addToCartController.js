
import addToCartModels from "../Models/addToCartModels.js";


export const addToCart=async(req, res)=>{
    try {
        const {productId}=req.body
        const {id}=req.user
        const isProduct=await addToCartModels.findOne({productId, userId:id})
        console.log(isProduct?.userId, id)
        if(isProduct?.userId===id){
            return res.status(400).json({
                msg:"product is already add to cart",
                error:true,
                success:false
            })
        }
        const payload={
            userId:id,
            productId:productId,
            quantity:1
        }
        const product=new addToCartModels(payload)

        const data=product.save()
        return res.status(400).json({
            product:data,
            msg:"successfully add to cart",
            error:false,
            success:true
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            msg:error.message,
            error:true,
            success:false
        })
    }
}
export const countProduct=async(req, res)=>{
    try {
        const userId=req.user.id
        if(!userId){
           return res.status(204).json({msg:"", })
        }
        const count=await addToCartModels.countDocuments({userId})
        if(count){
            return res.status(200).json({
                msg:"success counted",
                count:count,
                error:false,
                success:true
            })
        }
        return res.status(200).json({
            msg:" ",
            count:0,
            error:false,
            success:true
        })

    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            msg:error.message,
            error:true,
            success:false
        })
    }
}

export const getProductFromCart=async(req, res)=>{
    try {
        const userId=req.user.id
      
            const data=await addToCartModels.find({userId}).populate("productId")
            if(data){
             res.status(200).json({product:data,
                   msg:"Successfully get product from cart ",
                  error:false, 
                  success:true})
            }else{
                res.status(200).json({product:data,
                    msg:"error is occur during fetch from cart ",
                     error:true, 
                     success:false
                    })
            }
        
        
    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            msg:error.message,
            error:true,
            success:false
        })
    }
}
export const updateFromCart=async(req, res)=>{
    try {
        const qty=req.body.quantity
        const id=req.body._id
        console.log(qty)
        const userId=req.user
        
        const updateProduct=await addToCartModels.updateOne({_id:id},
           {...(qty && {quantity:qty})}
        )

        res.status(200).json({
            product:updateProduct, 
            msg:"quantity is update",
            error:false, 
            success:true
        })
    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            msg:error.message,
            error:true,
            success:false
        })
    }
}

export const deleteFromCart=async(req,res)=>{
    try {
        const id=req.body._id

        const deleteProduct=await addToCartModels.deleteOne({_id:id})

        if(deleteProduct){
        res.status(204).json({
            product:deleteProduct,
            msg:"product is deleted",
            error:false,
            success:true
        })
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            msg:error.message,
            error:true,
            success:false
        })
    }
}
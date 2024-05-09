import productModels from "../Models/productModels.js";


export const createProduct=async(req, res)=>{
    try {
        const {role}=req.user;

        if(role==="ADMIN"){
            const product=await productModels.create(req.body);
             if(product){
                return res.status(200).json({msg:"New product is created", product})
             }else{
                return res.status(404).json({msg:"Error is Occur when  is not created"})
             }
        }else{
            return res.status(403).json({msg:"You haven't permission to create product"})
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

export const getProduct=async(req, res)=>{
try {
    const result=await productModels.find({})
    if(result){
        return res.status(200).json({msg:"fetch all product", products:result})
    }else{
  return res.status(400).json({msg:"Something happen error"})
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

export const updateProduct=async(req, res)=>{
    try {
        const { id, ...restBody}=req.body
        const {role}=req.user
      
        if(role==="ADMIN"){
           const product=await productModels.findByIdAndUpdate(id, restBody)
           if(product){
            return res.status(200).json({msg:"Product is successfully updated ", product})
           }else{
            return res.status(403).json({msg:"error is occur when update product"})
           }
        }else{
          return res.status(403).json({msg:"Your have not permission to update product"})
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

export const categoryProduct=async(req, res)=>{
   try {
    const categories=await productModels.distinct("category")
    const productCategory=[]
    for(const category of categories){
        const product=await productModels.findOne({category})
        productCategory.push(product)
    }
    return res.status(200).json({msg:"successfully category ", productCategory})
   } catch (error) {
    console.log(error.message)
        res.status(401).json({
            msg:error.message,
            error:true,
            success:false
        })
   }
}
export const categoryProductOne=async(req, res)=>{
    try {
        const {category}=req.params || req.query

        const products=await productModels.find({category})
        if(products){
            return res.status(200).json({msg:"product category  successfully ", products})
        }else{
            return res.status(404).json({msg:"product category not found  "})

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

export const productDetail=async(req,res)=>{
    try {
        const {id}=req.params
        
        const product=await productModels.findById(id)
        if(product){
            return res.status(200).json({product, msg:"successfully get details of product"})
        }else{
            return res.status(404).json({msg:"Detail of product not get please check it "})
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

export const searchProduct=async(req, res)=>{
    try {
        const query=req.query.q
        console.log(query)
        const regex=new RegExp(query, "i", "g");

        const products=await productModels.find({
            "$or": [
                {
                    productName:regex
                },
                {
                    category:regex
                }
            ]
        })
       if( products){
        res.status(201).json({
            products:products,
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
export const filterProduct=async(req,res)=>{
    try {
        const categoryList=req.body.category
        console.log(req.body)
        const product=await productModels.find({
            category:{
                "$in":categoryList
            }
        })
        res.status(200).json({
            products:product,
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

export const deleteProduct=async(req, res)=>{
    try {
        const {id}=req.body
     
        const product=await productModels.findByIdAndDelete({_id:id})
        if(product){
            res.status(201).json({
                msg:"Product is deleted",
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
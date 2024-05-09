import React, { useContext, useEffect, useState } from 'react'
import { MdEdit, MdDelete } from "react-icons/md";

import UploadProduct from './UploadProduct'
import EditProduct from './EditProduct';
import { baseURL } from '../helper/baseURL'
import { toast } from 'react-toastify'
import {useGlobalContent} from "../useContext/useContext"
import displayETBCurrency from '../helper/displayCurrency';
export default function AllProduct() {
  const [openUpLoadProduct, setOpenLoadProduct]=useState(false)
  const [openEditProduct, setOpenEditProduct]=useState(false)
  const [data, setData]=useState("")
  const [products, setProducts]=useState()
  const {token}=useContext(useGlobalContent)
  const fetchData=async()=>{
    try {
     const response=await fetch(`${baseURL}/product`,{
      headers:{Authorization:`Bearer ${token}`, "Content-Type":"application/json"},
     })
      const data=await response.json()
      if(data && data.products){
  
         setProducts(data.products)
      }
    } catch (error) {
      console.log("error", error.message)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
   fetchData()
  }, [token])
 const handleDelete=async(id)=>{
  try {
    const response=await fetch(`${baseURL}/product/${id}`,{
      method:"DELETE",
      headers:{Authorization:`Bearer ${token}`, "Content-Type":"application/json"},
      body:JSON.stringify({id:id})
    })
    const dataApi=await response.json()
    if(dataApi.success){
      toast.success(dataApi.msg)
      fetchData()
    }
  } catch (error) {
    toast.error(error.message)
    console.log(error)
  }
 }
  return (
    <div  className='w-full h-full relative overflow-y-scroll'>
      <div className='w-full my-2 p-3 bg-white flex justify-between items-center'>
        <h2>All Product </h2>
        <button className='rounded-full bg-sky-500 text-white px-3 py-2 hover:bg-sky-600'
         onClick={()=>setOpenLoadProduct(true)}>Upload product</button>
      </div>
     <div className='w-[100%] mx-auto flex px-2  py-2 
      gap-8 flex-wrap bg-red-300 h-auto '>
      { products && products?.length ? 
      products.map((item=>(
        <div key={item._id} className='bg-white h-[15rem] w-[13rem] flex flex-col justify-center 
        gap-3 items-center rounded-md relative'>
          <div className='flex'>
            <img  src={item.productImage[0]} alt="" width={120} height={100} className='object-contain h-40 overflow-hidden'/>
         </div>
          <p>{item.productName}</p>
          <p>{displayETBCurrency(item.sellingPrice)}</p>
          <div className='w-fit ml-auto  mx-12'>
          <button className=' rounded-full bg-red-200 hover:bg-red-500 p-2 hover:text-white absolute top-3 left-2 '
             onClick={()=>{
              handleDelete(item._id) }}><MdDelete/></button>
            <button className=' rounded-full bg-green-200 hover:bg-green-500 p-2 hover:text-white absolute top-3 right-2 '
             onClick={()=>{
              setData(item)
              setOpenEditProduct(true)
              }}><MdEdit/></button>
            
          </div>
        </div>
      ))):
      <div>
        <p> Product not exist </p>
      </div>
      }
     </div>
        {openEditProduct &&
         <EditProduct updateProduct={data} 
         onClose={()=>setOpenEditProduct(false)} 
         callFunction={()=>fetchData()}/>}
        {openUpLoadProduct && 
        <UploadProduct OnClose={()=>setOpenLoadProduct(false)}  
        callFunction={()=>fetchData()}/>}
      
    </div>
  )
}

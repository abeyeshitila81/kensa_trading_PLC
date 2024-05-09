import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"
import {baseURL} from "../helper/baseURL"
import { Link } from 'react-router-dom'

export default function CategoryList() {
const [category, setCategory]=useState("")
const [loading, setLoading]=useState(false)
const categoryLoading=new Array(6).fill(null)
  const fetchData=async()=>{
    setLoading(true)
    try {
      const response=await fetch(`${baseURL}/product/category`)
      const data=await response.json();
    if(data && data.productCategory){
       setCategory(data.productCategory)
       setLoading(false)
    }
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
    
  }
  useEffect(()=>{
  fetchData()
  },[])
  return (
    <div>
      <div className='container px-2 py-2 mx-auto  '>
       <div className='container w-[97%] p-2 mx-auto flex justify-center bg-white gap-4 overflow-x-scroll scrollbar-none '>
             {loading ?   
            categoryLoading.map((item, index)=>{
             return( <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden
               bg-slate-200 animate-pulse' key={index}>
               </div>)
            })
             :
             category && category.length ?
             category.map((item=>(
              <Link to={`/product-category?category=${item.category}`} key={item._id}>
                <img src={item.productImage[0]}  alt='...'
                 className=' w-16 h-16 md:w-20 md:h-20 hover:scale-110 rounded-full
                  bg-gray-200 p-2 mix-blend-multiply cursor-pointer' />
                  <p className='capitalize'>{item.productName}</p>
                  </Link>
             )))
              :
             <div>
              This category not exist
            </div>}
       </div>
      </div>
    </div>
  )
}
